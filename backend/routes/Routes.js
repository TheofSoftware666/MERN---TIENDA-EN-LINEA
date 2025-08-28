import express from "express";
import { actualizarInfoTienda, infoTienda, ingresarInfoTienda } from "../controllers/tiendaController.js";
import { obtenerProductos, obtenerProducto, obtenerProductosAdmin, obtenerProductoAdmin,registrarProducto, actualizarProducto } from "../controllers/productosController.js";
import { iniciarSesion, registrarUsuario, confirmarCuenta, mostrarPerfil, CambiarPasswordToken, ComprobarTokenPassword, ActualizarPassword } from "../controllers/usuarioController.js";
import { obtenerCategoria, obtenerCategorias, subirCategoria, editarCategoria } from "../controllers/categoriaController.js";
import { obtenerMarca, obtenerMarcas, subirMarca, editarMarca } from "../controllers/marcaController.js";
import { obtenerPedidoAdmin, obtenerPedidosAdmin } from "../controllers/pedidoAdminController.js";
import { obtenerCarrito, addProductoCarrito, modificarCarrito, elimarItemsCarrito } from "../controllers/carritoController.js";
import { obtenerPedido, obtenerPedidos, capturarPedido } from "../controllers/pedidoController.js";
import { obtenerDevolucion, obtenerDevoluciones, GenerarDevolucion} from '../controllers/devolucionController.js';
import { Enviar } from "../controllers/correoController.js";
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

router.get('/Admin/Pedido/:id', checkAuth, obtenerPedidoAdmin)
        .get('/Admin/Pedidos', checkAuth, obtenerPedidosAdmin)
        //.patch('/Admin/Pedido', checkAuth, ActualizarPedido);
        // .patch('/Admin/Pedido', checkAuth, actualizarPedidoAdmin);

// Rutas de Usuario Publicas
router.get('/Productos', obtenerProductos);
router.get('/Productos/:id', obtenerProducto);
router.get('/ConfirmarCuenta/:token', confirmarCuenta);
router.post('/Login', iniciarSesion);
router.post('/Registrar', registrarUsuario);
router.post('/TokenPassword', CambiarPasswordToken);
router.post('/ActualizarPassword', ActualizarPassword);
router.get('/ActualizarPassword/:id', ComprobarTokenPassword);

// Ruta de Usuario publica /privada
router.get('/MiCarrito', checkAuth, obtenerCarrito)
        .post('/agregarCarrito/:idProducto', checkAuth, addProductoCarrito)
        .patch('/ActualizarCarrito', checkAuth ,modificarCarrito)
        .delete('/EliminarItemCarrito/:id', checkAuth, elimarItemsCarrito);

// Rutas de Usuario Privadas
router.get('/Perfil', checkAuth, mostrarPerfil);
        // .post('/Perfil/Configuracion/' , completarPerfil)
        // .patch('/Perfil/Configuracion/', actualizarPerfil);

// Rutas de Realizacion de Pedidos
router.get('/Pedidos/:id', checkAuth, obtenerPedido)
        .get('/Pedidos', checkAuth, obtenerPedidos)   
        .post('/Pedidos', checkAuth, capturarPedido);
        // .patch('/Pedidos', checkAuth, actualizarPedido)

// Rutas de Devoluciones
router.get('/Devoluciones/:id', checkAuth, obtenerDevolucion)
        .get('/Devoluciones', checkAuth,   obtenerDevoluciones)   
        .post('/Devoluciones', checkAuth, GenerarDevolucion);

// Rutas de EnviarCorreos 
router.post('/Email', checkAuth, Enviar);

export default router;