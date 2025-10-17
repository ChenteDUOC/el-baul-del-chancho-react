import React, { useState } from 'react';
//IMPORTAMOS LAS HERRAMIENTAS DE REACT ROUTER
//    - Routes: Envuelve todas las rutas de la aplicación.
//    - Route: Define una ruta individual (ej: "/login").
//    - useNavigate: Nos da una función para cambiar de URL desde el código.
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importamos nuestras páginas y componentes
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; 

import AdminTemplate from './components/templates/AdminTemplate';
import AdminSidebar from './components/organisms/AdminSidebar';
import AdminDashboard from './pages/admin/AdminDashboard';
import GestionUsuarios from './pages/admin/GestionUsuarios';
import CrearUsuario from './pages/admin/CrearUsuario';
import EditarUsuario from './pages/admin/EditarUsuario';

import Header from './components/organisms/Header';

function App() {
  // Crearemos un 'estado' que guardará nuestra lista de usuarios.
  const [usuarios, setUsuarios] = useState([
    // Usuarios de prueba
    // USUARIO ADMINISTRADOR
    {
      nombre: "Admin",
      email: "admin@profesor.duoc.cl",
      password: "123",
      rol: "admin"
    },
    // USUARIO CLIENTE
    {
      nombre: "Cliente",
      email: "cliente@gmail.com",
      password: "123",
      rol: "cliente"
    },
    // USUARIO VENDEDOR
    {
      nombre: "Vendedor",
      email: "vendedor@duoc.cl",
      password: "123",
      rol: "vendedor"
    }
  ]);


  // Estado para el usuario logueado
  const [usuarioActual, setUsuarioActual] = useState(null); 

  //    useNavigate() es un "hook" de React Router que nos da la función 'navigate'.
  const navigate = useNavigate();




  // Funciones REGISTRO
    const handleRegister = (nuevoUsuario, redirectPath = '/login') => {
      // Agregamos el nuevo usuario a la lista.
      const usuarioConRol = {...nuevoUsuario, rol: nuevoUsuario.rol || 'cliente' } // Asignamos el rol de 'cliente' por defecto, esto por si el admin crea un usuario y olvida ponerle un rol.

      // Agregamos el nuevo usuario a la lista.
      setUsuarios([...usuarios, usuarioConRol]);

      // Mostramos la lista actualizada en la consola.
      console.log("Usuario Registrado:", usuarioConRol);
      console.log("Lista de usuarios actualizada:", [...usuarios, usuarioConRol]);
      alert(`¡Gracias por registrarte, ${nuevoUsuario.nombre}! Ahora puedes iniciar sesión.`);
      
      // Redirigimos al usuario a la página de login u otra ruta si se especifica.
      navigate(redirectPath);
  };





  // Función LOGIN
  const handleLogin = (credenciales) => {
    // Buscamos en la lista de usuarios si las credenciales coinciden
    const usuarioEncontrado = usuarios.find(
      user => user.email === credenciales.email && user.password === credenciales.password
    );

    // Si lo encontramos, actualizamos el estado del usuario actual
    if (usuarioEncontrado) {
      setUsuarioActual(usuarioEncontrado);
      // Aqui podríamos redirigir a otra página o cambiar la vista
      if (usuarioEncontrado.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');

      }
    } else {
      // en caso de no encontrarlo, mostramos un mensaje de error
      alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

  //Funcion CIERRE DE SESION
    const handleLogout = () => {
      // Limpiamos el estado del usuario actual
      setUsuarioActual(null);
      alert("¡Hasta luego!");
      // Llevamos al usuario a la pagina de login
      navigate('/login');
      console.log("Sesión cerrada.");
    };

  // Funcion ELIMINACION USUARIOS (ADMINISTRADOR)
  const handleDeleteUser = (emailUsuario) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {

      // Creamos una lista que excluye al usuario eliminado
      const usuariosActualizados = usuarios.filter(user => user.email !== emailUsuario);
      setUsuarios(usuariosActualizados);
      console.log("Usuario eliminado. Nueva lista:", usuariosActualizados);
    }
  };

  // Funcion EDICION USUARIOS (ADMINISTRADOR)
  const handleUpdateUser = (usuarioActualizado) => {
    // Creamos una nueva lista
    const usuariosActualizados = usuarios.map(user =>
      // si el email coincide enviamos el usuario actualizado, sino el original
      user.email === usuarioActualizado.email ? usuarioActualizado : user
    );
    setUsuarios(usuariosActualizados);
    alert("Usuario actualizado con éxito.");
    navigate('/admin/usuarios/'); // Volviendo a la lista de usuarios
  }

  return (
    <div>
      <Header 
      usuario={usuarioActual}
      onLogout={handleLogout}
      />

      {/* DEFINIMOS NUESTRAS RUTAS. Aquí le decimos a React qué componente mostrar para cada URL. */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/registro" element={<RegisterPage onRegister={handleRegister} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        
        {/* Rutas para Clientes/Vendedores */}
        {usuarioActual && usuarioActual.rol !== 'admin' && (
          <Route path="/home" element={<HomePage usuario={usuarioActual} />} />
        )}

        {/* Rutas para Administradores */}
        {usuarioActual && usuarioActual.rol === 'admin' && (
          <Route path="/admin" element={<AdminTemplate />}>

            <Route index element={<AdminDashboard />} />
            <Route 
              path="usuarios" 
              element={<GestionUsuarios 
              usuarios={usuarios} 
              onDelete={handleDeleteUser} />} 
            />
            <Route 
              path="usuarios/crear" 
              element={<CrearUsuario 
              onRegister={(user) => handleRegister(user, '/admin/usuarios')} />} 
            />
            <Route 
              path="usuarios/editar/:email"
              element={<EditarUsuario usuarios={usuarios} onUpdate={handleUpdateUser} />}
            />
          
          </Route>
        )}

        {/* Ruta por defecto */}
        <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;