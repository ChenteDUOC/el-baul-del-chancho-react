import React, { useState } from 'react';
import Footer from '../../components/organisms/Footer';

import CampoFormulario from '../../components/molecules/CampoFormulario'; 
import AreaDeTexto from '../../components/molecules/AreaDeTexto';

function ContactoPage() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [comentario, setComentario] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario (por ahora solo una alerta)
    console.log({ nombre, correo, comentario });
    alert('Mensaje enviado (simulación). ¡Gracias por contactarnos!');
    // Limpiamos el formulario
    setNombre('');
    setCorreo('');
    setComentario('');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container my-5 flex-grow-1">
        <section className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="text-center mb-4 display-5 fw-bold">Formulario de Contacto</h1>
            <p className="text-center lead mb-4">
              ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar? 
              ¡Estamos aquí para escucharte! 
              Completa el siguiente formulario y nos pondremos en contacto contigo a la brevedad posible.
            </p>
            
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
              <CampoFormulario 
                label="Nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                isRequired={true}
              />
              <CampoFormulario 
                label="Correo Electrónico"
                type="email"
                name="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                isRequired={true} 
              />
              <AreaDeTexto 
                label="Mensaje"
                name="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu mensaje aquí"
              />

              <div className="d-grid gap-2 mt-4">
                <button type="submit" className="btn btn-primary btn-lg">Enviar Mensaje</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactoPage;