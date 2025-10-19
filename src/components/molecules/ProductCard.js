import React from 'react';
import './ProductCard.css';

function ProductCard({ producto, onAddToCart }) {
    const { nombre, precio, urlImagen } = producto;

    return (
        <div className="product-card">
            <img
                src={urlImagen || "https://via.placeholder.com/300?text=Producto"}
                alt={nombre}
                className="product-card_img"
            />
            <div className="product-card_info">
                <h3 className="product-card_name">{nombre}</h3>
                <p className="product-card_price">${precio}</p>
                <button 
                    className="btn btn-primary w-100"
                    onClick={() => onAddToCart(producto)}
                    >
                        Añadir al carrito
                </button>
            </div>
        </div>
    );
}

export default ProductCard;