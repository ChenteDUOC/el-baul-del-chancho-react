import React from 'react';
import FormularioRegistro from '../components/organisms/FormularioRegistro';
import './RegisterPage.css';

// La pagina recibe 'onRegister' como un prop que es una función para manejar el registro.
function RegisterPage({ onRegister}) {
    return (
        // Contenedor de la página de registro
        <main className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card p-4 p-md-5 shadow-sm">
                        <FormularioRegistro onRegister={onRegister} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;