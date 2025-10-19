import React from 'react';
import Footer from '../../components/organisms/Footer';

function NosotrosPage() {
    const imageUrl = './assets/images/grupo-de-amigos-jugando.png';

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container my-5 flex-grow-1">
                <section className="row align-items-center mb-5">
                    <div className="col-lg-6">
                        <h1 className="display-4 mb-4">Nuestra Historia en los Juegos de Mesa</h1>
                        <p className="lead">
                            En el corazón de "El baul del Chancho" reside una pasión por el juego y la conexión humana. 
                            Todo comenzó hace cinco años, en una fría tarde de invierno, cuando un grupo de amigos desenterramos un viejo juego de mesa. 
                            Dejamos de lado las pantallas y nos sumergimos en la estrategia y las risas. Esa noche, redescubrimos la magia de los juegos de mesa.
                        </p>
                        <p>
                            Decidimos que queríamos compartir esa experiencia con el mundo. 
                            Creemos firmemente que los juegos de mesa son más que simple entretenimiento: 
                            son herramientas para crear recuerdos, fortalecer lazos y fomentar el aprendizaje. 
                            Así nació "El baul del Chancho", con el objetivo de ofrecer una cuidadosa selección de juegos que no solo divierten, 
                            sino que también educan e inspiran.
                        </p>
                    </div>
                    <div className="col-lg-6 text-center mt-4 mt-lg-0">
                        <img
                            src={imageUrl}
                            className="img-fluid rounded shadow-sm"
                            alt="Grupo de amigos jugando un juego de mesa."
                        />
                    </div>
                </section>

                <section className="row mb-5">
                    <div className="col-12">
                        <h2 className="text-center mb-4">Nuestro Propósito</h2>
                        <p className="text-center lead">
                            Nos dedicamos a curar una colección de juegos de mesa de alta calidad, 
                            desde clásicos atemporales hasta las últimas novedades. Nuestra misión es simple: 
                            llevar la alegría y el desafío de los juegos de mesa a cada hogar. 
                            Queremos que "El baul del Chancho" sea tu destino de confianza para encontrar ese juego 
                            perfecto que se convertirá en la nueva tradición familiar o en la pieza central de tu próxima reunión con amigos.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default NosotrosPage;