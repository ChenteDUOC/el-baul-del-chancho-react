import React from 'react';

function HomePage({ usuario }) {
    return (
        <main className="container text-center my-5">
            <div className="card p-5">
                <h1>¡Bienvenido de vuelta, {usuario.nombre}!</h1>
                <p className="lead">Has iniciado sesión como: <strong>{usuario.rol}</strong></p>
            </div>
        </main>
    );
}

export default HomePage;