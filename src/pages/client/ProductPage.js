import React from 'react';
import ProductList from '../../components/organisms/ProductList';
import Footer from '../../components/organisms/Footer';

function ProductPage({ productos, onAddToCart }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container my-5 flex-grow-1">
                <div className="row">
                    <div className="col-12 text-center mb-4">
                        <h1 className="display-4">PRODUCTOS</h1>
                    </div>
                </div>
                <ProductList productos={productos} onAddToCart={onAddToCart} />
            </main>
            <Footer />
        </div>
    );
}

export default ProductPage;