import React from 'react';

// Este atomo recibe las siguientes props:
// - src: La URL de la imagen que se va a mostrar.
// - alt: El texto alternativo para la imagen (opcional).
// - className: Clases CSS adicionales para personalizar el estilo (Con bootstrap).
function Imagen({ src, alt = '', className = '' }) {
    return (
        <img src={src} alt={alt} className={`img-fluid ${className}`} />
    );
}