import React from 'react';
import logo from '../../assets/images/logo.png'; // Asegúrate que la ruta a tu logo sea correcta

// 1. Recibimos la nueva función 'onNavigate' en los props
function Header({ usuario = null, onNavigate, onLogout }) {

  const renderUserActions = () => {
    // --- VISTA PARA USUARIO NO LOGUEADO ---
    if (!usuario) {
      return (
        <>
          {/* 2. Agregamos el evento onClick a los botones */}
          <button 
            className="btn btn-outline-primary me-2" 
            type="button" 
            onClick={() => onNavigate('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            className="btn btn-primary" 
            type="button"
            onClick={() => onNavigate('registro')}
          >
            Registrarse
          </button>
        </>
      );
    }

// --- VISTAS PARA USUARIOS LOGUEADOS ---
    switch (usuario.rol) {
      // --- VISTA VENDEDOR ---
      case 'vendedor':
        return (
          <>
            <a className="nav-link" href="#">Inicio</a>
            <a className="nav-link" href="#">Productos</a>
            <a className="nav-link" href="#">Órdenes</a>
            <button className="btn btn-danger ms-3" type="button" onClick={onLogout}>Cerrar Sesión</button>
          </>
        );
      
      // --- VISTA ADMINISTRADOR ---
      case 'admin':
        return (
          <>
            {/* El header del admin solo muestra el botón de cerrar sesión a la derecha */}
            <button className="btn btn-danger ms-3" type="button" onClick={onLogout}>Cerrar Sesión</button>
          </>
        );

      // --- VISTA CLIENTE (TIENDA ONLINE) ---
      case 'cliente':
      default:
        return (
          <div className="d-flex align-items-center">
            <a className="nav-link" href="#">Inicio</a>
            <a className="nav-link" href="#">Productos</a>
            <a className="nav-link" href="#">Nosotros</a>
            <a className="nav-link" href="#">Blogs</a>
            <a className="nav-link" href="#">Contacto</a>
            <div className="ms-4">
              <button className="btn btn-outline-primary me-2" type="button">Ver Carrito</button>
              <button className="btn btn-danger ms-3" type="button" onClick={onLogout}>Cerrar Sesión</button>
            </div>
          </div>
        );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="El Baúl del Chancho Logo" width="120" />
          <span className="ms-2 fw-bold">El Baúl del Chancho</span>
        </a>
        
        <div className="d-flex align-items-center">
          {usuario && <span className="navbar-text me-3">Hola, {usuario.nombre}</span>}
          {renderUserActions()}
        </div>
      </div>
    </nav>
  );
}

export default Header;