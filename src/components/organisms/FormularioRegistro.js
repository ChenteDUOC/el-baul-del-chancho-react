import React, { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import SelectorFormulario from '../molecules/SelectorFormulario';

// --------------------------------------------------------------------------------------
// En una aplicación real, estas listas vendrían de una base de datos o API.
// Creamos una lista con regiones de ejemplo
const regionesDeChile = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Región Metropolitana",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibáñez del Campo",
    "Magallanes y de la Antártica Chilena",
];

// Creamos una lista con comunas de ejemplo
const comunasDeEjemplo = [
    "Santiago",
    "Puente Alto",
    "Maipú",
    "La Florida",
    "Las Condes",
    "Ñuñoa",
    "La Reina",
    "Providencia",
    "Vitacura",
    "Lo Barnechea",
    "San Bernardo",
    "Pudahuel",
    "Quilicura",
    "Renca",
    "Independencia",
    "Recoleta",
    "Cerrillos",
    "Cerro Navia",
    "Lo Prado",
    "Estación Central",
    "Pedro Aguirre Cerda",
    "San Miguel",
    "Macul",
    "Peñalolén",
    "La Granja",
    "San Joaquín",
    "El Bosque",
    "La Cisterna",
    "San Ramón",
    "Puerto Montt",
    "Osorno",
    "Coyhaique",
    "Punta Arenas",
    "Puerto Varas",
    "Ensenada"
];
// --------------------------------------------------------------------------------------


// Este es un ORGANISMO. Es una combinación de moléculas y/o átomos que forman una sección completa.
function FormularioRegistro({ onRegister }) {
  // 1. Creamos un 'estado' para cada campo del formulario
  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validacion simple: Verificar tipo de Dominio del correo
    // Primero crear lista con dominios admitidos
    const dominiosPermitidos = ['@gmail.com', '@profesor.duoc.cl', '@duoc.cl'];

    // Verificar si el correo termina con alguno de los dominios permitidos
    const esEmailValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));

    if (!esEmailValido) {
      alert("El correo electrónico no es válido. Debe terminar con @gmail.com, @profesor.duoc.cl o @duoc.cl");
      return; // Detener el envío del formulario
    }

    // Validación simple: Verificar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    
    const formData = { run, nombre, apellidos, email, fechaNacimiento, region, comuna, direccion, password };
    
    // Mostramos todos los datos en la consola para verificar
    // y enviamos los datos al componente padre
    onRegister(formData);

    alert(`¡Gracias por registrarte, ${nombre}!`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-center fw-bold">Registrarse</h3>

      <CampoFormulario label="RUN" type="text" name="run" value={run} onChange={(e) => setRun(e.target.value)} placeholder="Sin puntos ni guion" />

      {/* Usamos el sistema de grilla de Bootstrap para poner Nombre y Apellidos en la misma fila */}
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario label="Nombre" type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="col-md-6">
          <CampoFormulario label="Apellidos" type="text" name="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
        </div>
      </div>
      
      <CampoFormulario label="Correo Electrónico" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      {/* Reutilizamos CampoFormulario para el tipo 'date' */}
      <CampoFormulario label="Fecha de Nacimiento (Opcional)" type="date" name="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
      
      <div className="row">
        <div className="col-md-6">
          <SelectorFormulario label="Región" name="region" value={region} onChange={(e) => setRegion(e.target.value)} options={regionesDeChile} />
        </div>
        <div className="col-md-6">
          <SelectorFormulario label="Comuna" name="comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} options={comunasDeEjemplo}/>
        </div>
      </div>

      <CampoFormulario label="Dirección" type="text" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

      <CampoFormulario label="Contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <CampoFormulario label="Confirmar Contraseña" type="password" name="confirmarPassword" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} />
      
      <div className="d-grid mt-3">
          <button className="btn btn-primary btn-lg" type="submit">
              Registrarse
          </button>
      </div>
    </form>
  );
}

export default FormularioRegistro;