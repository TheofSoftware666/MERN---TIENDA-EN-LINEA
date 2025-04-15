import express from "express";
import { actualizarInfoTienda, infoTienda, ingresarInfoTienda } from "../controllers/tiendaController.js";
import { obtenerProductos, obtenerProducto, obtenerProductosAdmin, obtenerProductoAdmin,registrarProducto, actualizarProducto } from "../controllers/productosController.js";
import { iniciarSesion, registrarUsuario, confirmarCuenta, mostrarPerfil } from "../controllers/usuarioController.js";
import { obtenerCategoria, obtenerCategorias, subirCategoria, editarCategoria } from "../controllers/categoriaController.js";
import { obtenerMarca, obtenerMarcas, subirMarca, editarMarca } from "../controllers/marcaController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas de Administrador
router.get('/Admin/MiTienda', checkAuth, infoTienda)
        .post('/Admin/MiTienda', checkAuth, ingresarInfoTienda)
        .patch('/Admin/MiTienda', checkAuth, actualizarInfoTienda)

router.get('/Admin/Producto/:id', checkAuth, obtenerProductoAdmin)
      .get('/Admin/Productos', checkAuth, obtenerProductosAdmin)
      .post('/Admin/AgregarProducto', checkAuth, registrarProducto)
      .patch('/Admin/EditarProducto/:id', checkAuth, actualizarProducto);

router.get('/Admin/Categoria/:id', obtenerCategoria)
        .get('/Admin/Categorias/:limit', obtenerCategorias)
        .post('/Admin/AgregarCategoria', checkAuth, subirCategoria)
        .patch('/Admin/ActualizarCategoria', checkAuth, editarCategoria);

router.get('/Admin/Marca/:id', obtenerMarca)
        .get('/Admin/Marcas/:limit', obtenerMarcas)
        .post('/Admin/AgregarMarcas', checkAuth, subirMarca)
        .patch('/Admin/ActualizarMarcas', checkAuth, editarMarca);

// router.get('/Admin/Pedido/:id', obtenerPedido)
//         .get('/Admin/Pedidos', obtenerPedidos)
//         .post('/Admin/Pedido', hacerPedido)
//         .patch('/Admin/Pedido', actualizarPedido);

// Rutas de Usuario Publicas
router.get('/Productos', obtenerProductos);
router.get('/Productos/:id', obtenerProducto);
router.get('/ConfirmarCuenta/:token', confirmarCuenta);
router.post('/Login', iniciarSesion);
router.post('/Registrar', registrarUsuario);

// Ruta de Usuario publica /privada
// router.get('/MiCarrito/:id', obtenerCarrito)
//         .post('/MiCarrito', añadirCarrito)
//         .patch('/Micarrito', modificarCarrito)
//         .delete('/Micarrito', elimarItemsCarrito);

// Rutas de Usuario Privadas
// router.get('/Perfil/:id', mostrarPerfil)
//         .post('/Perfil/Configuracion/' , completarPerfil)
//         .patch('/Perfil/Configuracion/', actualizarPerfil);

// router.get('/Pedidos/:id', checkAuth, obtenerCarrito)
//         .get('/Pedidos', checkAuth, obtenerCarrito)   
//         .post('/Pedidos', checkAuth, añadirCarrito)
//         .patch('/Pedidos', checkAuth, modificarCarrito)

// router.get('/Devoluciones/:id', checkAuth, obtenerCarrito)
//         .get('/Devoluciones', checkAuth, obtenerCarrito)   
//         .post('/Devoluciones', checkAuth, añadirCarrito)
//         .patch('/Devoluciones', checkAuth, modificarCarrito)      

export default router;