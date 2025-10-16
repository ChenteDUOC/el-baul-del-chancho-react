import React from 'react';

// Este es un ÁTOMO. Es la unidad más pequeña y reutilizable.
// No tiene lógica de negocio, solo recibe propiedades (props).

// Lista de props:
// - children: El contenido que se mostrará dentro del botón.
// - onClick: Función que se ejecuta al hacer clic en el botón.
// - className: Clases CSS adicionales para personalizar el estilo.

const Boton = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`} style={{ cursor: 'pointer' }}>
      {children}
    </button>
  );
};

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Boton;
