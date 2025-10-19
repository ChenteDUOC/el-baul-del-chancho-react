// src/App.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App'; // Ruta correcta a tu componente App

// Mock global de window.alert y window.confirm
const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true); // Asume que siempre confirmamos

beforeEach(() => {
  alertSpy.mockClear();
  confirmSpy.mockClear();
  // Limpiar localStorage si lo usas para persistir algo entre tests
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

  // Rellenar formulario (ajusta selectores si es necesario)
  await user.type(screen.getByLabelText(/run/i), '11111111-1');
  await user.type(screen.getByLabelText(/^nombre$/i), 'Nuevo User'); // Usa label exacto si hay conflicto
  await user.type(screen.getByLabelText(/apellidos/i), 'Test');
  await user.type(screen.getByLabelText(/correo electrónico/i), 'nuevo@cliente.com');
  await user.selectOptions(screen.getByLabelText(/región/i), ['Los Lagos']); // Usa una opción válida
  await user.selectOptions(screen.getByLabelText(/comuna/i), ['Puerto Varas']); // Usa una opción válida
  await user.type(screen.getByLabelText(/dirección/i), 'Casa 1');
  await user.type(screen.getByLabelText(/^contraseña$/i), 'test1234');
  await user.type(screen.getByLabelText(/confirmar contraseña/i), 'test1234');

  await user.click(screen.getByRole('button', { name: /registrarse/i }));

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/gracias por registrarte/i));
  // Verifica que ahora está en la página de login
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

  await user.type(screen.getByPlaceholderText(/ingrese su correo electrónico/i), 'noexiste@mail.com');
  await user.type(screen.getByPlaceholderText(/ingrese su contraseña/i), 'fallida');
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

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

  await user.type(screen.getByPlaceholderText(/ingrese su correo electrónico/i), 'cliente@gmail.com');
  await user.type(screen.getByPlaceholderText(/ingrese su contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

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
  
  // Login como cliente
  await user.type(screen.getByPlaceholderText(/ingrese su correo electrónico/i), 'cliente@gmail.com');
  await user.type(screen.getByPlaceholderText(/ingrese su contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
  
  // Probar links
  await user.click(screen.getByRole('link', { name: /productos/i }));
  expect(screen.getByRole('heading', { name: /^productos$/i })).toBeInTheDocument(); // Título exacto

  await user.click(screen.getByRole('link', { name: /nosotros/i }));
  expect(screen.getByRole('heading', { name: /nuestra historia/i })).toBeInTheDocument();

  // ... (puedes añadir clics y verificaciones para Blogs, Contacto, Carrito)
});

// --- Test 9: Añadir al Carrito ---
test('9. Add to cart button adds item and appears in cart page', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  // Login como cliente
  await user.type(screen.getByPlaceholderText(/ingrese su correo electrónico/i), 'cliente@gmail.com');
  await user.type(screen.getByPlaceholderText(/ingrese su contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  // Añadir Catan al carrito (asume que Catan es el primero)
  const addToCartButtons = await screen.findAllByRole('button', { name: /añadir al carrito/i });
  await user.click(addToCartButtons[0]);

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/catán \(juego base\) añadido al carrito/i));

  // Ir al carrito
  await user.click(screen.getByRole('button', { name: /ver carrito/i }));
  
  // Verificar que Catan está en el carrito
  expect(screen.getByRole('heading', { name: /carrito de compras/i})).toBeInTheDocument();
  expect(screen.getByText(/catán \(juego base\)/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue('1')).toBeInTheDocument(); // Input con cantidad 1
});

// --- Test 10: Vista Admin Usuarios ---
test('10. Admin can log in and view user list', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  // Login como admin
  await user.type(screen.getByPlaceholderText(/ingrese su correo electrónico/i), 'admin@profesor.duoc.cl');
  await user.type(screen.getByPlaceholderText(/ingrese su contraseña/i), '123');
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  // Verificar panel admin
  expect(screen.getByRole('heading', { name: /panel de administración/i})).toBeInTheDocument();

  // Ir a gestión de usuarios (asume link existe en sidebar)
  await user.click(screen.getByRole('link', { name: /gestión de usuarios/i }));

  // Verificar página y tabla
  expect(screen.getByRole('heading', { name: /gestión de usuarios/i })).toBeInTheDocument();
  expect(screen.getByText('admin@profesor.duoc.cl')).toBeInTheDocument();
  expect(screen.getByText('cliente@gmail.com')).toBeInTheDocument();
  expect(screen.getByText('vendedor@duoc.cl')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /editar/i })[0]).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /eliminar/i })[0]).toBeInTheDocument();
});