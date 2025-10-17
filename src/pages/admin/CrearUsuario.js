import React from 'react';
import FormularioRegistro from '../../components/organisms/FormularioRegistro';

function CrearUsuario({ onRegister}) {
    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowgrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Crear Nuevo Usuario</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <FormularioRegistro onRegister={onRegister} showRoleSelector={true} />
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;