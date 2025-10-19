import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación

function Header({ usuario = null, onLogout }) {

  const renderUserActions = () => {
    // --- VISTA PARA USUARIO NO LOGUEADO ---
    if (!usuario) {
      return (
        <>
          <Link to="/login" className="btn btn-outline-primary me-2">
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="btn btn-primary">
            Registrarse
          </Link>
        </>
      );
    }

// --- VISTAS PARA USUARIOS LOGUEADOS ---
    switch (usuario.rol) {
      // --- VISTA VENDEDOR ---
      case 'vendedor':
        return (
          <>
            <Link className="nav-link me-3" to="/vendedor">Inicio</Link>
            <Link className="nav-link me-3" to="/vendedor/productos">Productos</Link>
            <Link className="nav-link me-3" to="/vendedor/ordenes">Órdenes</Link>
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
            <Link className="nav-link me-3" to="/home">Inicio</Link>
            <Link className="nav-link me-3" to="/productos">Productos</Link>
            <Link className="nav-link me-3" to="/nosotros">Nosotros</Link>
            <Link className="nav-link me-3" to="/blogs">Blogs</Link>
            <Link className="nav-link" to="/contacto">Contacto</Link>
            <div className="ms-4">
              <Link to="/carrito" className="btn btn-outline-primary me-2">
                Ver Carrito
                </Link>
              <button className="btn btn-danger" type="button" onClick={onLogout}>Cerrar Sesión</button>
            </div>
          </div>
        );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="/assets/images/logo.png" alt="El Baúl del Chancho Logo" width="80" />
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