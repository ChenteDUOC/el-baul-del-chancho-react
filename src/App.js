import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; // <-- 1. IMPORTAMOS LA NUEVA PÁGINA
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

  // Estado para manejar la página actual
  const [paginaActual, setPaginaActual] = useState('registro');





  // Funciones para manejar el registro
  const handleRegister = (nuevoUsuario) => {
    // Agregamos el nuevo usuario a la lista.
    const usuarioConRol = {...nuevoUsuario, rol: 'cliente'} // Asignamos el rol de 'cliente' por defecto
    // Agregamos el nuevo usuario a la lista.
    setUsuarios([...usuarios, usuarioConRol]);
    // Mostramos la lista actualizada en la consola.
    console.log("Usuario Registrado:", usuarioConRol);
    console.log("Lista de usuarios actualizada:", [...usuarios, usuarioConRol]);
    alert(`¡Gracias por registrarte, ${nuevoUsuario.nombre}! Ahora puedes iniciar sesión.`);
    setPaginaActual('login'); // Cambiamos a la página de login después del registro
  };





  // Función para manejar el login
  const handleLogin = (credenciales) => { // <-- Corregí un pequeño error aquí, quité las llaves {}
    // Buscamos en la lista de usuarios si las credenciales coinciden
    const usuarioEncontrado = usuarios.find(
      user => user.email === credenciales.email && user.password === credenciales.password
    );

    // Si lo encontramos, actualizamos el estado del usuario actual
    if (usuarioEncontrado) {
      setUsuarioActual(usuarioEncontrado);
      // Aqui podríamos redirigir a otra página o cambiar la vista
      setPaginaActual('home'); // <-- 2. CAMBIAMOS A LA PÁGINA 'home'
      console.log("Usuario logueado:", usuarioEncontrado);
    } else {
      // en caso de no encontrarlo, mostramos un mensaje de error
      alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

  //Funcion que maneja el cierre de sesión
    const handleLogout = () => {
      // Limpiamos el estado del usuario actual
      setUsuarioActual(null);
      alert("¡Hasta luego!");
      // Llevamos al usuario a la pagina de login
      setPaginaActual('login');
      console.log("Sesión cerrada.");
    };





  // Función para cambiar de página
  const navegarA = (pagina) => {
    setPaginaActual(pagina);
  };



  return (
    <div>
      <Header 
      usuario={usuarioActual}
      onNavigate={navegarA} 
      onLogout={handleLogout}
      />

      {paginaActual === 'registro' && <RegisterPage onRegister={handleRegister} />}
      {paginaActual === 'login' && <LoginPage onLogin={handleLogin} />}
      {paginaActual === 'home' && <HomePage usuario={usuarioActual} />}
    </div>
  );
}

export default App;