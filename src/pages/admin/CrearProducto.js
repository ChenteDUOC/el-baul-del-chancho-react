import React from 'react';
import FormularioProducto from '../../components/organisms/FormularioProducto';

function CrearProducto({ onCreate }) {
    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowgrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Añadir Nuevo Producto</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <FormularioProducto onCreate={onCreate} />
                </div>
            </div>
        </div>
    );
}

export default CrearProducto;