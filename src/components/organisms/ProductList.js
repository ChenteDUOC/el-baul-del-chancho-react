import React from 'react';
import ProductCard from '../molecules/ProductCard';

function ProductList({ productos = [], onAddToCart }) {

    console.log('ProductList - Productos recibidos:', productos);

    return (
        <section>
            <h2 className="text-center mb-4">Nuestros Productos</h2>
            <div id="product-list" className="row row-cols-1 row-cols-sm-2 row-cols-ms-3 row-cols-lg-4 g-4">
                {productos.length === 0 ? (
                    <div className="col-12">
                        <p className="text-center">Aún no hay productos disponibles.</p>
                    </div>
                ) : (
                    productos.map(producto => (
                        <div className="col" key={producto.codigo}>
                            <ProductCard producto={producto} onAddToCart={onAddToCart}/>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default ProductList;