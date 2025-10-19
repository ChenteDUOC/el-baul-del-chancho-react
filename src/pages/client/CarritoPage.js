import React from 'react';
import Footer from '../../components/organisms/Footer';

function CarritoPage({ carrito, onUpdateQuantity, onRemoveItem, onFinalizePurchase }) {

  // Función para calcular el subtotal de un item
  const calcularSubtotal = (item) => {
    return item.precio * item.cantidad;
  };

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
        <main className="container my-5 flex-grow-1">
            <div className="row">
                <div className="col-12 text-center mb-4">
                    <h1 className="display-4">CARRITO DE COMPRAS</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-12">

            {/* Tabla de productos en el carrito */}
                    {carrito.length === 0 ? (
                    // Mensaje si el carrito está vacío
                    <div className="alert alert-info">
                        Tu carrito está vacío.
                    </div>
                    ) : (

                    // Si hay items, mostramos la tabla
                    <table className="table align-middle"> {/* align-middle centra verticalmente */}
                        <thead>
                        <tr>
                            <th scope="col" style={{ width: '15%' }}>Producto</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col" style={{ width: '15%' }}>Cantidad</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col"></th> {/* Columna para el botón de eliminar */}
                        </tr>
                        </thead>
                        <tbody>
                        {carrito.map((item) => (
                            <tr key={item.codigo}>
                            <td>
                                <img 
                                src={item.urlImagen || "https://via.placeholder.com/100?text=Sin+Imagen"} 
                                alt={item.nombre} 
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </td>
                            <td>{item.nombre}</td>
                            <td>${item.precio}</td>
                            <td>
                                {/* Input para cambiar la cantidad */}
                                <input 
                                type="number" 
                                className="form-control form-control-sm w-50"
                                value={item.cantidad} 
                                min="1" // Cantidad mínima 1
                                onChange={(e) => onUpdateQuantity(item.codigo, parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                ${calcularSubtotal(item)}
                                </td>
                            <td>
                                {/* Botón para eliminar el item */}
                                <button 
                                  className="btn btn-danger btn-sm"
                                  onClick={() => onRemoveItem(item.codigo)}
                                >
                                Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    </div>

    {/* Solo mostramos el total si hay items en el carrito */}
    {carrito.length > 0 && (
        <div className="row justify-content-end mt-4">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total del Carrito</h5>
                        <h3 className="card-text text-end">${calcularTotal()}</h3>
                        <hr />
                        {/* Este botón lo conectaremos después */}
                        <button 
                        className="btn btn-success w-100"
                        onClick={onFinalizePurchase}
                        >
                            Finalizar Compra
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </main>
        <Footer />
    </div>
  );
}

export default CarritoPage;