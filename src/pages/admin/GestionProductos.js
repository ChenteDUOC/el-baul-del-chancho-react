import React from 'react';
import { Link } from 'react-router-dom';

function GestionProductos({ productos, onDelete }) {

    //placeholder por si producto no tiene imagen
    const placeholderImg = "https://via.placeholder.com/100?text=sin+Imagen"

    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Productos</h1>
                <Link to="/admin/productos/crear" className="btn btn-success">
                    Crear Nuevo Producto
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Lista de Productos</h5>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width:'10%' }}>Imagen</th>
                                    <th scope="col">Código</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Categoría</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No hay productos registrados</td>
                                    </tr>
                                ) : (
                                    productos.map((producto) => (
                                        <tr key={producto.codigo}>
                                            <td>
                                                <img
                                                    src={producto.urlImagen || placeholderImg}
                                                    alt={producto.nombre}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                                />
                                            </td>
                                            <td>{producto.codigo}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.categoria}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.stock}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/productos/editar/${producto.codigo}`}
                                                    className="btn btn-sm btn-primary me-2"
                                                >
                                                    Editar
                                                </Link>
                                                
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => onDelete(producto.codigo)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionProductos;