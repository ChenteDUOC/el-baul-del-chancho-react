import React from 'react';

// Este es una molecula. Es una combinación de átomos que forman una unidad funcional.
// Recibe los siguientes props:
// - label: El texto que se mostrará como etiqueta del campo.
// - type: El tipo de campo (text, password, email, etc.). Por defecto es 'text'.
// - name: El nombre del campo (útil para formularios).
// - value: El valor actual del campo.
// - onChange: Función que se ejecuta cuando el valor del campo cambia.
// - placeholder: Texto que se muestra cuando el campo está vacío (opcional).
// - className: Clases CSS adicionales para personalizar el estilo (opcional).

function CampoFormulario({ label, type = 'text', name, value, onChange, placeholder = '', className = '', disabled = false }) {

    // Esto es lo que se va a mostrar en pantalla
    return (
        <div className = "user-box">
            <input 
                type={type}
                required 
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                disabled={disabled} 
            />
            <label>{label}</label>
        </div>
    );
}

export default CampoFormulario;