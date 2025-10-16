import React, { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';

function FormularioLogin({ onLogin}) { // Recibimos 'onLogin' como prop desde App.js
    // Estados que almacenaran los valores de los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

        onLogin({ email, password }); // Llamamos a la función onLogin con los datos del formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="mb-4 text-center fw-bold">Iniciar Sesión</h3>

            <CampoFormulario
            label="Correo Electrónico"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <CampoFormulario
                label="Contraseña"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-grid mt-3">
                <button className="btn btn-primary btn-lg" type="submit">
                    Ingresar
                </button>
            </div>
        </form>
    );
}

export default FormularioLogin;