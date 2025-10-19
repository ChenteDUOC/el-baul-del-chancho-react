import React from 'react';
import Footer from '../../components/organisms/Footer';

function BlogsPage() {
  const monopolyImg = '/assets/images/monopoly.png';
  const cluedoImg = '/assets/images/cluedo.png';

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container my-5 flex-grow-1">
        <h2 className="text-center mb-5 display-5 fw-bold">NOTICIAS IMPORTANTES</h2>

        {/* Sección Caso 1 */}
        <section className="row align-items-center mb-5">
          <div className="col-md-7">
            <h3>CASO CURIOSO #1</h3>
            <p className="lead"> {/* Párrafo principal destacado */}
              El Origen "Robado" de Monopoly: La Verdadera Inventora Olvidada
            </p>
            <a 
              href="https://historia.nationalgeographic.com.es/a/historia-monopoly_15181" 
              className="btn btn-primary" 
              target="_blank" 
              rel="noopener noreferrer" 
            >
              VER CASO
            </a>
          </div>
          <div className="col-md-5 mt-3 mt-md-0 text-center">
            <img 
              src={monopolyImg} 
              className="img-fluid rounded shadow-sm" /* Sombra suave */
              alt="Imagen representativa del caso 1" 
            />
          </div>
        </section>

        <hr className="my-5"/> {/* Separador */}

        {/* Sección Caso 2*/}
        <section className="row align-items-center flex-row-reverse mb-5">
          <div className="col-md-7">
            <h3>CASO CURIOSO #2</h3>
            <p className="lead">
              Cluedo: El Juego de Misterio Nacido en la Oscuridad de la Guerra
            </p>
            <a 
              href="https://kids.jotdown.es/2020/07/12/una-llave-al-misterio/" 
              className="btn btn-primary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              VER CASO
            </a>
          </div>
          <div className="col-md-5 mt-3 mt-md-0 text-center">
            <img 
              src={cluedoImg} 
              className="img-fluid rounded shadow-sm" 
              alt="Imagen representativa del caso 2" 
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogsPage;