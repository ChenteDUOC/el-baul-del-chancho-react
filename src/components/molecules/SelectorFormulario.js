// src/components/molecules/SelectorFormulario.js
import React from 'react';

// Esta molecula representa un selector desplegable (dropdown).
// props:
// - label: El texto del selector.
// - name: El nombre del campo.
// - value: La opción seleccionada.
// - onChange: La función que se ejecuta al cambiar la selección.
// - options: Un array con las opciones a mostrar. Ej: ["Arica", "Tarapacá", ...]

function SelectorFormulario({ label, name, value, onChange, options = [] }) {
  const selectId = `form-${name}`;

  return (
    // Usamos el mismo estilo de 'form-floating' de Bootstrap
    <div className="form-floating mb-4">
      <select
        id={selectId}
        className="form-select" // Clase de Bootstrap para selectores
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        <option value="" disabled>Seleccione una opción...</option>
        {options.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
      <label htmlFor={selectId}>{label}</label>
    </div>
  );
}

export default SelectorFormulario;