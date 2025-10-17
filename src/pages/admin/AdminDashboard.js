import React from 'react';

function AdminDashboard() {
    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Panel de Administración</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">¡Bienvenido al Panel de Administración!</h5>
                    <p className="card-text">Hola, Administrador. ¿Qué vamos a hacer esta vez?</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;