// src/App.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Spies y silencios de consola para no ensuciar la salida
let alertSpy, confirmSpy, warnSpy, logSpy;

beforeAll(() => {
  if (!window.alert) window.alert = () => {};
  if (!window.confirm) window.confirm = () => true;
  alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
  warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  alertSpy.mockRestore();
  confirmSpy.mockRestore();
  warnSpy.mockRestore();
  logSpy.mockRestore();
});

beforeEach(() => {
  alertSpy.mockClear();
  confirmSpy.mockClear();
  warnSpy.mockClear();
  logSpy.mockClear();
  localStorage.clear();
});

// --- Test 5: Registro Exitoso ---
test('5. allows user to register and navigates to login', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/registro']}>
      <App />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/run/i), '11111111-1');
  await user.type(screen.getByLabelText(/^nombre$/i), 'Nuevo User');
  await user.type(screen.getByLabelText(/apellidos/i), 'Test');
  await user.type(screen.getByLabelText(/correo electrónico/i), 'nuevo@gmail.com'); // dominio permitido
  await user.selectOptions(screen.getByLabelText(/región/i), ['Los Lagos']);
  await user.selectOptions(screen.getByLabelText(/comuna/i), ['Puerto Varas']);
  await user.type(screen.getByLabelText(/dirección/i), 'Casa 1');
  await user.type(screen.getByLabelText(/^contraseña$/i), 'test1234');
  await user.type(screen.getByLabelText(/confirmar contraseña/i), 'test1234');

  await user.click(screen.getByRole('button', { name: /registrarse/i }));

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/gracias por registrarte/i));
  expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
});

// --- Test 6: Login Erróneo ---
test('6. shows error on failed login', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/correo electrónico/i), 'noexiste@mail.com');
  await user.type(screen.getByLabelText(/contraseña/i), 'fallida');
  await user.click(screen.getByRole('button', { name: /ingresar|iniciar sesión/i }));

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/incorrectas/i));
  expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
});

// --- Test 7: Login Exitoso Cliente ---
test('7. allows client user to login and navigates to home', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/correo electrónico/i), 'cliente@gmail.com');
  await user.type(screen.getByLabelText(/contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /ingresar|iniciar sesión/i }));

  expect(screen.queryByRole('heading', { name: /iniciar sesión/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /tienda online/i })).toBeInTheDocument();
  expect(screen.getByText(/hola, cliente/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ver carrito/i })).toBeInTheDocument();
});

// --- Test 8: Navegación Header Cliente ---
test('8. Header navigation works correctly for client', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  
  await user.type(screen.getByLabelText(/correo electrónico/i), 'cliente@gmail.com');
  await user.type(screen.getByLabelText(/contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /ingresar|iniciar sesión/i }));
  
  await user.click(screen.getByRole('link', { name: /productos/i }));
  expect(screen.getByRole('heading', { name: /^productos$/i })).toBeInTheDocument();

  await user.click(screen.getByRole('link', { name: /nosotros/i }));
  expect(screen.getByRole('heading', { name: /nuestra historia/i })).toBeInTheDocument();
});

// --- Test 9: Añadir al Carrito ---
test('9. Add to cart button adds item and appears in cart page', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/correo electrónico/i), 'cliente@gmail.com');
  await user.type(screen.getByLabelText(/contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /ingresar|iniciar sesión/i }));

  const addToCartButtons = await screen.findAllByRole('button', { name: /añadir al carrito/i });
  await user.click(addToCartButtons[0]);

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/catán \(juego base\) añadido al carrito/i));

  await user.click(screen.getByRole('button', { name: /ver carrito/i }));
  
  expect(screen.getByRole('heading', { name: /carrito de compras/i})).toBeInTheDocument();
  expect(screen.getByText(/catán \(juego base\)/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue('1')).toBeInTheDocument();
});

// --- Test 10: Vista Admin Usuarios ---
test('10. Admin can log in and view user list', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/correo electrónico/i), 'admin@profesor.duoc.cl');
  await user.type(screen.getByLabelText(/contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /ingresar|iniciar sesión/i }));

  expect(screen.getByRole('heading', { name: /panel de administración/i})).toBeInTheDocument();

  await user.click(screen.getByRole('link', { name: /gestión de usuarios/i }));

  expect(screen.getByRole('heading', { name: /gestión de usuarios/i })).toBeInTheDocument();
  expect(screen.getByText('admin@profesor.duoc.cl')).toBeInTheDocument();
  expect(screen.getByText('cliente@gmail.com')).toBeInTheDocument();
  expect(screen.getByText('vendedor@duoc.cl')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /editar/i })[0]).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /eliminar/i })[0]).toBeInTheDocument();
});
