import React from 'react';

// Este atomo recibe las siguientes props:
// - children: El contenido que se mostrará dentro del título.
// - level: El nivel del título (1 para h1, 2 para h2, etc.). Por defecto es 2.
// - className: Clases CSS adicionales para personalizar el estilo (Con Bootstrap).

function Titulo({ children, level = 2, className = ''}) {
    // Creamos un tag dinámico basado en el nivel proporcionado (h1, h2, h3, etc.)
    const Tag = `h${level}`;
  
    // El return sirve para renderizar el componente en el DOM
    // el DOM es la estructura de elementos que el navegador muestra en pantalla
    return (

        // Usamos Bootstrap para márgenes y cualquier clase adicional pasada por props
        <Tag className={`my-3 ${className}`}>
            {children}
        </Tag>
    );
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Titulo;