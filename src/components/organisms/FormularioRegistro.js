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
function FormularioRegistro({ onRegister, showRoleSelector = false, initialData = null }) {
  // Creamos un 'estado' para cada campo del formulario
  const [run, setRun] = useState(initialData?.run || '');
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [apellidos, setApellidos] = useState(initialData?.apellidos || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(initialData?.fechaNacimiento || '');
  const [region, setRegion] = useState(initialData?.region || '');
  const [comuna, setComuna] = useState(initialData?.comuna || '');
  const [direccion, setDireccion] = useState(initialData?.direccion || '');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [rol, setRol] = useState(initialData?.roll || 'cliente');

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
    if (password !== confirmarPassword && !initialData) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    
    const formData = { run, nombre, apellidos, email, fechaNacimiento, region, comuna, direccion, password, rol};
    
    // Mostramos todos los datos en la consola para verificar
    // y enviamos los datos al componente padre
    onRegister(formData);

    // mensaje de alerta al editar
    if (initialData) {
      //la alerta ya esta en App.js
    } else {
      alert(`!Gracias por registrate, ${nombre}!`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-center fw-bold">
        {/* Titulo dinámico */}
        {initialData ? 'Editar Usuario' : (showRoleSelector ? 'Crear Usuario' : 'Registrarse')}
      </h3>

      {/* RUN */}
      <CampoFormulario 
        label="RUN" 
        type="text" 
        name="run" 
        value={run} 
        onChange={(e) => setRun(e.target.value)} 
        placeholder="Sin puntos ni guion" 
      />

      {/* NOMBRE Y APELLIDO*/}
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario 
            label="Nombre" 
            type="text" 
            name="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="col-md-6">
          <CampoFormulario 
            label="Apellidos" 
            type="text" 
            name="apellidos" 
            value={apellidos} 
            onChange={(e) => setApellidos(e.target.value)} 
          />
        </div>
      </div>
      
      {/* CORREO */}
      <CampoFormulario 
        label="Correo Electrónico" 
        type="email" 
        name="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        disabled={!!initialData} // Este campo no se puede editar en el modo edición
      />
      
      {/* FECHA NACIMIENTO */}
      <CampoFormulario 
        label="Fecha de Nacimiento (Opcional)" 
        type="date" 
        name="fechaNacimiento" 
        value={fechaNacimiento} 
        onChange={(e) => setFechaNacimiento(e.target.value)} 
      />
      
      {/* REGION Y COMUNA*/}
      <div className="row">
        <div className="col-md-6">
          <SelectorFormulario 
            label="Región" 
            name="region" 
            value={region} 
            onChange={(e) => setRegion(e.target.value)} 
            options={regionesDeChile} 
          />
        </div>
        <div className="col-md-6">
          <SelectorFormulario 
            label="Comuna" 
            name="comuna" 
            value={comuna} 
            onChange={(e) => setComuna(e.target.value)} 
            options={comunasDeEjemplo}
          />
        </div>
      </div>

      {/* DIRECCION */}
      <CampoFormulario 
        label="Dirección" 
        type="text" 
        name="direccion" 
        value={direccion} 
        onChange={(e) => setDireccion(e.target.value)} 
      />

      {/* CONTRASEÑA Y CONFIRMAR CONTRASEÑA*/}
      <CampoFormulario 
        label="Contraseña" 
        type="password" 
        name="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <CampoFormulario 
        label="Confirmar Contraseña" 
        type="password" 
        name="confirmarPassword" 
        value={confirmarPassword} 
        onChange={(e) => setConfirmarPassword(e.target.value)} 
      />
      
      {/* Este campo solo se muestra si showRoleSelector es TRUE */}
      {/* ROL USUARIO */}
      {showRoleSelector && (
        <SelectorFormulario
          label="Rol de Usuario"
          name="rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          options={['cliente', 'vendedor', 'admin']}
          />
      )}

      {/* BOTON CONFIRMACIÓN (tambien dinamico)*/}
      <div className="d-grid mt-3">
          <button className="btn btn-primary btn-lg" type="submit">
              {initialData ? 'Guardar Cambios' : (showRoleSelector ? 'Crear Usuario' : 'Registrarse')}
          </button>
      </div>
    </form>
  );
}

export default FormularioRegistro;