// src/pages/RegisterPage.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

// Mock global de window.alert para espiarlo
const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeEach(() => {
  alertSpy.mockClear();
});

test('2. renders registration page correctly', () => {
  const mockRegister = jest.fn();
  render(
    <MemoryRouter>
      <RegisterPage onRegister={mockRegister} />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /registrarse/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/run/i)).toBeInTheDocument();
  // Busca por placeholder ya que el label es genérico
  expect(screen.getByPlaceholderText(/sin puntos ni guion/i)).toBeInTheDocument(); 
  expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument(); 
  expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument(); // Label exacto
  expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/región/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/comuna/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
});

test('3. shows alert for invalid email domain on submit', async () => {
  const user = userEvent.setup();
  const mockRegister = jest.fn();
  render(
    <MemoryRouter>
      <RegisterPage onRegister={mockRegister} />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/correo electrónico/i), 'test@invalid.com');
  // ... (rellenar otros campos requeridos si es necesario)
  await user.click(screen.getByRole('button', { name: /registrarse/i }));

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/correo electrónico no es válido/i));
  expect(mockRegister).not.toHaveBeenCalled();
});

test('4. shows alert if passwords do not match on submit', async () => {
  const user = userEvent.setup();
  const mockRegister = jest.fn();
  render(
    <MemoryRouter>
      <RegisterPage onRegister={mockRegister} />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/correo electrónico/i), 'test@gmail.com');
  await user.type(screen.getByLabelText(/^contraseña$/i), 'pass1');
  await user.type(screen.getByLabelText(/confirmar contraseña/i), 'pass2');
  // ... (rellenar otros campos requeridos)
  
  await user.click(screen.getByRole('button', { name: /registrarse/i }));

  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/contraseñas no coinciden/i));
  expect(mockRegister).not.toHaveBeenCalled();
});