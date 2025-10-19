import React from 'react';
import VendedorProductTable from '../../components/organisms/VendedorProductTable'; 
import Footer from '../../components/organisms/Footer';

function VendedorProductos({ productos }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container my-5 flex-grow-1">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h1 className="display-4">Productos Disponibles</h1>
          </div>
        </div>
        <VendedorProductTable productos={productos} /> 
      </main>
      <Footer />
    </div>
  );
}

export default VendedorProductos;