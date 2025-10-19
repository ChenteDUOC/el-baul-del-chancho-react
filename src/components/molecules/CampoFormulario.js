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

function CampoFormulario({ label, type = 'text', name, value, onChange, placeholder = '', className = '', disabled = false , isRequired = true, variant = 'floating'}) {

    const finalClassName = `mb-3 ${className}`; // Usamos mb-3 para espaciado estándar
    const inputId = `form-${name || label.replace(/\s+/g, '-')}`; // Generamos un ID único

    if (variant === 'floating') {
        return (
            <div className={`form-floating ${finalClassName}`}>
                <input 
                    type={type}
                    id={inputId}
                    className="form-control" 
                    value={value}
                    onChange={onChange}
                    name={name}
                    placeholder={placeholder || ' '} 
                    disabled={disabled} 
                    required={isRequired && !disabled}
                />
                <label htmlFor={inputId}>{label}</label>
            </div>
        );
    } else {
        return (
            <div className={finalClassName}>
                <label htmlFor={inputId} className="form-label">{label}</label>
                <input 
                    type={type}
                    id={inputId}
                    className="form-control" 
                    value={value}
                    onChange={onChange}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled} 
                    required={isRequired && !disabled}
                />
            </div>
        );
    }
}

export default CampoFormulario;