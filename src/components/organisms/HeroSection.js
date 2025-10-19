import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

// Imagenes que estarán en el carrusel
const carouselImages = [
    "/assets/images/catan.png",
    "/assets/images/monopoly.png",
    "/assets/images/grupo-de-amigos-jugando.png",
    "/assets/images/dixit.png",
    "/assets/images/cluedo.png",
    "/assets/images/zombicide.png"
];

function HeroSection() {
    return (
        <section className="row align-items-center my-5">
            <div className="col-lg-6">
                <h1 className="display-4 fw-bold">TIENDA ONLINE</h1>
                <p className="lead my-4">
                   Bienvenido a nuestra tienda. Aquí encontrarás los mejores juegos de mesa
                    para compartir con amigos y familia. ¡Explora nuestro catálogo y comienza
                    la diversión! 
                </p>
                <Link to="/productos" className="btn btn-primary btn-lg">
                    Ver productos
                </Link>
            </div>

            {/* Carrusel */}
            <div className="col-lg-6 mt-4 mt-lg-0">
                <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#heroCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    {/* Contenido del carrusel */}
                    <div className="carousel-inner">
                        {carouselImages.map((imageUrl, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                data-bs-interval="2000" // La imagen cambia cada 4 segundos
                            >
                                <img
                                    src={imageUrl} className="d-block w-100 carousel-img" alt={`Juego de mesa ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Controles (flechas) */}

                    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;