import React from 'react';
import { Link } from 'react-router-dom';

function GestionUsuarios({ usuarios, onDelete }) {
    return (
        <div className="container-fluid pt-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestión de Usuarios</h1>
                <Link to="/admin/usuarios/crear" className="btn btn-success">
                    Crear Nuevo Usuario
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Lista de Usuarios Registrados</h5>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Iteramos sobre la lista de usuarios y mostramos cada uno en una fila */}
                                {usuarios.map((usuario, index) => (
                                    <tr key={usuario.email}>
                                        <td>{index +1}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <span className={`badge bg-${usuario.rol === 'admin' ? 'danger' : 'secondary'}`}>
                                            {usuario.rol}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/usuarios/editar/${usuario.email}`}
                                                className="btn btn-sm btn-primary me-2"
                                            >
                                                Editar
                                            </Link>
                                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(usuario.email)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GestionUsuarios;