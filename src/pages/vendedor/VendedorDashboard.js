import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/organisms/Footer';

function VendedorDashboard({ productos, ordenes, usuario }) {

    // Variable que lleva la cuenta de productos y ordenes
    const totalProductos = productos.length;
    const totalOrdenes = ordenes.length;

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container my-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="display-5">Panel de Vendedor - Inicio</h1>
                    <p className="lead">
                        Bienvenido de vuelta, {usuario ? usuario.nombre : 'Vendedor'}. Aquí tienes un resumen rápido de tus datos.
                    </p>
                </div>

                {/* Tarjetas de Resumen */}

                
                <div className="row justify-content-center g-4">

                    {/* Tarjeta de Productos */}
                    <div className="col-md-5">
                        <div className="card text-center shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-3">Productos Disponibles</h5>
                                <p className="display-4 fw-bold my-auto">{totalProductos}</p>
                                <Link to="/vendedor/productos" className="btn btn-outline-primary mt-3">
                                    Ver Productos
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Órdenes */}
                    <div className="col-md-5">
                        <div className="card text-center shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-3">Órdenes Recientes</h5>
                                <p className="display-4 fw-bold my-auto">{totalOrdenes}</p>
                                <Link to="/vendedor/ordenes" className="btn btn-outline-primary mt-3">
                                    Ver Órdenes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default VendedorDashboard;