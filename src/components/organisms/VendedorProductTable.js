import React from 'react';

// Recibe la lista de productos
function VendedorProductTable({ productos }) {
  const placeholderImg = "https://via.placeholder.com/100?text=Sin+Imagen";

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Lista de Productos</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col" style={{ width: '10%' }}>Imagen</th>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No hay productos registrados.</td>
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
                    <td>${producto.precio}</td>
                    <td>{producto.stock}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendedorProductTable;