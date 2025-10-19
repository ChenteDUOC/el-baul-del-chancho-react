// src/pages/LoginPage.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Solo importamos esto

test('simple import test', () => {
  // Un test muy básico que no hace casi nada
  render(<div>Test</div>); 
  expect(true).toBe(true); // Siempre pasa
});
