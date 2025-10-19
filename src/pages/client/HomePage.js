import React from 'react';
import HeroSection from '../../components/organisms/HeroSection';
import ProductList from '../../components/organisms/ProductList';



function HomePage({ productos, usuario, onAddToCart }) {

    console.log('HomePage - Productos recibidos:', productos);
    return (
        <main className="container mt-5">
            <HeroSection />

        <hr className="my-5" />

        <ProductList productos={productos} onAddToCart={onAddToCart}/>
        </main>
    );
}

export default HomePage;