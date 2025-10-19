import React, { useState } from 'react';
//IMPORTAMOS LAS HERRAMIENTAS DE REACT ROUTER
//    - Routes: Envuelve todas las rutas de la aplicación.
//    - Route: Define una ruta individual (ej: "/login").
//    - useNavigate: Nos da una función para cambiar de URL desde el código.
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importamos nuestras páginas y componentes
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import HomePage from './pages/client/HomePage'; 
import ProductPage from './pages/client/ProductPage';

import AdminTemplate from './components/templates/AdminTemplate';
import AdminSidebar from './components/organisms/AdminSidebar';
import AdminDashboard from './pages/admin/AdminDashboard';
import GestionUsuarios from './pages/admin/GestionUsuarios';
import CrearUsuario from './pages/admin/CrearUsuario';
import EditarUsuario from './pages/admin/EditarUsuario';
import GestionProductos from './pages/admin/GestionProductos';
import CrearProducto from './pages/admin/CrearProducto';
import EditarProducto from './pages/admin/EditarProducto';

import Header from './components/organisms/Header';
import NosotrosPage from './pages/client/NosotrosPage';
import BlogsPage from './pages/client/BlogsPage';
import ContactoPage from './pages/client/ContactoPage';
import CarritoPage from './pages/client/CarritoPage';

import VendedorDashboard from './pages/vendedor/VendedorDashboard';
import GestionOrdenes from './pages/vendedor/GestionOrdenes';
import OrdenDetalle from './pages/vendedor/OrdenDetalle';
import VendedorProductos from './pages/vendedor/VendedorProductos';

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

  // Estado que almacena los productos en una lista.
  const [productos, setProductos] = useState([
    // productos de prueba
    {
      codigo: "001",
      nombre: "Catán (Juego Base)",
      precio: 20000,
      stock: 10,
      categoria: "Estrategia",
      urlImagen: "https://www.cafe2d6.cl/cdn/shop/files/catan_-_cafe2d6_imagen_con_derechos_de_autor_grande.jpg?v=1751057237"
    },{
      codigo: "002",
      nombre: "Monopoly",
      precio: 16000,
      stock: 5,
      categoria: "Estrategia",
      urlImagen: "https://upload.wikimedia.org/wikipedia/commons/d/df/German_Monopoly_board_in_the_middle_of_a_game.jpg"
    }

  ]);

  // Estado para el usuario logueado
  const [usuarioActual, setUsuarioActual] = useState(null); 

  // Estado para Carrito
  const [carrito, setCarrito] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

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
      } else if (usuarioEncontrado.rol === 'vendedor') {
        navigate('/vendedor');
      } else {
        navigate('/home'); // El cliente va a /home 

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
  };


 // Funcion CREACION PRODUCTO
  const handleCreateProduct = (nuevoProducto) => {

    // Verificamos si codigo del producto ya existe
    const existe = productos.find(p => p.codigo === nuevoProducto.codigo);
    if (existe) {
      alert("Error: El código de producto ya existe.");
      return;
    }

    // SI NO EXISTE, SE AGREGA A LA LISTA
    const nuevaLista = [...productos, nuevoProducto];
    setProductos(nuevaLista);
    console.log("Producto creado:", nuevoProducto);
    console.log("Lista de productos:", nuevaLista);
    alert("¡Producto guardado con éxito!");

    // Navegamos de vuetal a la lista de productos
    navigate('/admin/productos');
  };  

  // Funcion ELIMINAR PRODUCTO (ADMINISTRADOR)
  const handleDeleteProduct = (codigoProducto) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      const productosActualizados = productos.filter(p => p.codigo !== codigoProducto);
      setProductos(productosActualizados);
      console.log("Producto eliminado.")
    }
  };

  // Funcion ACTUALIZAR PRODUCTO (ADMINISTRADOR)
  const handleUpdateProduct = (productoActualizado) => {
    const productosActualizados = productos.map(p =>
      p.codigo === productoActualizado.codigo ? productoActualizado : p
    );
    setProductos(productosActualizados);
    alert("¡Producto actualizado con éxito!");
    navigate('/admin/productos')
  };

  // Funcion AÑADIR PRODUCTO A CARRITO
  const handleAddToCart = (productoToAdd) => {

    // Revisamos si el producto ya existe en el carro
    const itemExistente = carrito.find(item => item.codigo === productoToAdd.codigo);

    if (itemExistente){
      // Si ya existe, aumentamos la cantidad
      setCarrito(carrito.map(item =>
        item.codigo === productoToAdd.codigo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Si es nuevo en el carrito lo agregamos con cantidad 1
      setCarrito([ ...carrito, { ...productoToAdd, cantidad: 1}]);
    }
    console.log("Carrito actualizado:", carrito);
    alert(`${productoToAdd.nombre} añadido al carrito.`);
  };

  // Función ACTUALIZAR CANTIDAD EN CARRITO
  const handleUpdateCartQuantity = (codigoProducto, nuevaCantidad) => {
    const cantidad = Math.max(1, nuevaCantidad);
    setCarrito(carrito.map(item =>
      item.codigo === codigoProducto
        ? { ...item, cantidad: cantidad }
        : item
    ));
  };

  // Funcion ELIMINAR ITEM CARRITO
  const handleRemoveFromCart = (codigoProducto) => {
    setCarrito(carrito.filter(item => item.codigo !== codigoProducto));
  };

  // Funcion FINALIZAR COMPRA
  const handleFinalizePurchase = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Calculamos el total
    const totalCompra = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

    // Creamos un objeto para la nueva orden
    const nuevaOrden = {
      id: `ORD-${Date.now()}`,
      fecha: new Date().toLocaleDateString(),
      usuarioEmail: usuarioActual.email,
      items: [...carrito],
      total: totalCompra
    };

    // Añadimos la nueva orden a la lista de órdenes
    setOrdenes([...ordenes, nuevaOrden]);

    // Vaciamos el carrito
    setCarrito([]);

    console.log("Compra finalizada. Nueva orden:", nuevaOrden);
    console.log("Lista de órdenes:", [...ordenes, nuevaOrden]);
    alert("¡Compra realizada con éxito! Gracias por tu pedido.");

    // Regresamos al usuario a la pagina de inicio
    navigate('/home');
  };

  console.log('App,js - Estado actual de productos:', productos);
  return (
    <div>
      <Header 
      usuario={usuarioActual}
      onLogout={handleLogout}
      />

      {/* DEFINIMOS NUESTRAS RUTAS. Aquí le decimos a React qué componente mostrar para cada URL. */}
<Routes>
        {/* --- RUTAS PÚBLICAS (Siempre disponibles) --- */}
        <Route path="/registro" element={<RegisterPage onRegister={handleRegister} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* --- RUTAS PROTEGIDAS (Requieren iniciar sesión) --- */}
        
        {/* --- RUTAS PARA CLIENTES --- */}
        {usuarioActual && usuarioActual.rol === 'cliente' && (
          <>
            <Route 
              path="/home" 
              element={<HomePage 
                usuario={usuarioActual} 
                productos={productos} 
                onAddToCart={handleAddToCart}
                />} 
            />
            <Route
              path="/productos"
              element={<ProductPage 
              productos={productos}
              onAddToCart={handleAddToCart}
                />}
            />
            <Route
              path="/nosotros"
              element={<NosotrosPage />}
            />
            <Route 
            path="/blogs" 
            element={<BlogsPage />} 
            /> 
            <Route 
            path="/contacto" 
            element={<ContactoPage />} 
            />
            <Route
            path="/carrito"
            element={<CarritoPage
              carrito={carrito}
              onUpdateQuantity={handleUpdateCartQuantity} // Corregido typo
              onRemoveItem={handleRemoveFromCart}
              onFinalizePurchase={handleFinalizePurchase}
              />}
            />
          </>
        )}

        {/* --- RUTAS PARA VENDEDORES --- */}
        {usuarioActual && usuarioActual.rol === 'vendedor' && (
          <>
            <Route
              path="/vendedor"
              element={<VendedorDashboard
              productos={productos}
              ordenes={ordenes}
              usuario={usuarioActual}
              />}
            />
            <Route
              path="/vendedor/ordenes"
              element={<GestionOrdenes ordenes={ordenes} />}
            />
            <Route
              path="/vendedor/ordenes/:idOrden"
              element={<OrdenDetalle ordenes={ordenes} />}
            />
            <Route
              path="/vendedor/productos"
              element={<VendedorProductos productos={productos} />}
            />
          </>
        )}

        {/* --- RUTAS PARA ADMINISTRADORES --- */}
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
            <Route
              path="productos"
              element={<GestionProductos productos={productos} onDelete={handleDeleteProduct} />}
            />
            <Route
              path="productos/crear"
              element={<CrearProducto onCreate={handleCreateProduct} />}
            />
            <Route
              path="productos/editar/:codigo"
              element={<EditarProducto productos={productos} onUpdate={handleUpdateProduct} />}
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