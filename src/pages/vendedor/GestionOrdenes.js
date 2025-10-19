import React from 'react';
import Footer from '../../components/organisms/Footer';
import { Link } from 'react-router-dom';

function GestionOrdenes({ ordenes }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container my-5 flex-grow-1">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Órdenes Recientes</h1>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Historial de Órdenes</h5>
                        <div className="table-responsive">
                            <table className="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">ID Orden</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Cliente (Email)</th>
                                        <th scope="col">N° Items</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordenes.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay órdenes registradas.</td>
                                        </tr>
                                    ): (
                                        ordenes.map((orden) => (
                                            <tr key={orden.id}>
                                                <td>{orden.id}</td>
                                                <td>{orden.fecha}</td>
                                                <td>{orden.usuarioEmail}</td>
                                                <td>{orden.items.length}</td>
                                                <td>${orden.total}</td>
                                                <td>
                                                    <Link
                                                        to={`/vendedor/ordenes/${orden.id}`}
                                                        className="btn btn-sm btn-info"
                                                    >
                                                        Ver Detalle
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default GestionOrdenes;