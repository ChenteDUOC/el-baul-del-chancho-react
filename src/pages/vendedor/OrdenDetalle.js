import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../../components/organisms/Footer'; // Ajusta la ruta

function OrdenDetalle({ ordenes }) {
  const { idOrden } = useParams(); // Obtenemos el ID de la orden desde la URL
  const navigate = useNavigate();

  // Buscamos la orden específica en la lista
  const orden = ordenes.find(o => o.id === idOrden);

  // Si la orden no se encuentra, podríamos mostrar un mensaje o redirigir
  if (!orden) {
    return (
      <div className="container my-5 text-center">
        <h2>Orden no encontrada</h2>
        <Link to="/vendedor/ordenes" className="btn btn-primary">Volver a Órdenes</Link>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container my-5 flex-grow-1">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Detalle de la Orden: {orden.id}</h1>
          <Link to="/vendedor/ordenes" className="btn btn-secondary">Volver a Órdenes</Link>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Información General</h5>
            <p><strong>Fecha:</strong> {orden.fecha}</p>
            <p><strong>Cliente:</strong> {orden.usuarioEmail}</p>
            <p><strong>Total:</strong> ${orden.total}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Productos en esta Orden</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '15%' }}>Imagen</th>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orden.items.map((item) => (
                    <tr key={item.codigo}>
                      <td>
                        <img 
                          src={item.urlImagen || "https://via.placeholder.com/100?text=Sin+Imagen"} 
                          alt={item.nombre} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </td>
                      <td>{item.codigo}</td>
                      <td>{item.nombre}</td>
                      <td>${item.precio}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.precio * item.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OrdenDetalle;