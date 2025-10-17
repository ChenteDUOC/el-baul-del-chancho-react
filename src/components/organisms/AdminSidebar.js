import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Importamos Link y NavLink para navegación

function AdminSidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height: '100vh'}}>
            <span className="ffs-4">Administración</span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link text-white" end>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/products" className="nav-link text-white">
                        Gestión de Productos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/usuarios" className="nav-link text-white">
                        Gestión de Usuarios
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default AdminSidebar;