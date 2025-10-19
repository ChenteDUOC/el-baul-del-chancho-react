import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormularioProducto from '../../components/organisms/FormularioProducto';

function EditarProducto({ productos, onUpdate }) {
    const { codigo } = useParams();
    const navigate = useNavigate();

    const productoAEditar = productos.find(p => p.codigo === codigo);
    if (!productoAEditar) {
        navigate('/admin/productos');
        return null;
    }

    const handleUpdate = (productoActualizado) => {
        onUpdate(productoActualizado);
    };

    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Editando Producto: {productoAEditar.nombre}</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <FormularioProducto
                        onCreate={handleUpdate}
                        initialData={productoAEditar}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;