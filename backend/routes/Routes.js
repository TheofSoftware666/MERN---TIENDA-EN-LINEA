import express from "express";
import { createMulter } from "./../helpers/upload.js";
import { subirArchivo } from "../helpers/uploadFile.js";
import { UpdateConfigEco, GetConfigEco, SetConfigEco } from "../controllers/tiendaController.js";
import { obtenerProductos, obtenerProducto, obtenerProductosAdmin, obtenerProductoAdmin,registrarProducto, actualizarProducto } from "../controllers/productosController.js";
import { iniciarSesion, registrarUsuario, confirmarCuenta, mostrarPerfil, CambiarPasswordToken, ComprobarTokenPassword, ActualizarPassword } from "../controllers/usuarioController.js";
import { obtenerCategoria, obtenerCategorias, CreateCategory, editarCategoria } from "../controllers/categoriaController.js";
import { obtenerMarca, obtenerMarcas, createBrand, editarMarca } from "../controllers/marcaController.js";
import { obtenerPedidoAdmin, obtenerPedidosAdmin } from "../controllers/pedidoAdminController.js";
import { obtenerCarrito, addProductoCarrito, modificarCarrito, elimarItemsCarrito } from "../controllers/carritoController.js";
import { obtenerPedido, obtenerPedidos, capturarPedido } from "../controllers/pedidoController.js";
import { obtenerDevolucion, obtenerDevoluciones, GenerarDevolucion} from '../controllers/devolucionController.js';
import { getFileImage, DeleteFileImage } from "../controllers/imageController.js";
import { GetCodePostal } from "../controllers/codigoPostalController.js";
import { Enviar } from "../controllers/correoController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Declaraciones de Archivos
const uploadCategorias = createMulter("categories");
const uploadProductos = createMulter("products");
const uploadConfigEco = createMulter("ecommerceLogo");

// Rutas de Administrador
router.get('/Admin/GetConfiguracion', checkAuth, GetConfigEco)
        .post('/Admin/SetConfiguracionEco', checkAuth, subirArchivo(uploadConfigEco, "logo"), SetConfigEco)
        .patch('/Admin/UpdateConfiguracionEco', checkAuth, subirArchivo(uploadConfigEco, "logo") , UpdateConfigEco);

router.get('/GetCodePostal/:cp', GetCodePostal);

router.get('/Admin/GetProducto/:id', checkAuth, obtenerProductoAdmin)
      .get('/Admin/GetProducts/:limit', checkAuth, obtenerProductosAdmin)
      .post('/Admin/AgregarProducto', checkAuth, subirArchivo(uploadProductos, "images"), registrarProducto)
      .patch('/Admin/EditarProducto/:id', checkAuth, subirArchivo(uploadProductos, "images"), actualizarProducto);

router.post('/Admin/GetImage', checkAuth, getFileImage)
router.post('/Admin/DeleteImage', checkAuth, DeleteFileImage);

router.get('/Admin/Categoria/:id', obtenerCategoria)
        .get('/Admin/Categorias/:limit', obtenerCategorias) 
        .post('/Admin/CreateCategory', checkAuth, subirArchivo(uploadCategorias, "image"), CreateCategory)
        .patch('/Admin/ActualizarCategoria', checkAuth, editarCategoria);

router.get('/Admin/Marca/:id', obtenerMarca)
        .get('/Admin/Marcas/:limit', obtenerMarcas)
        .post('/Admin/CreateBrand', checkAuth, createBrand)
        .patch('/Admin/ActualizarMarcas', checkAuth, editarMarca);

router.get('/Admin/Pedido/:id', checkAuth, obtenerPedidoAdmin)
        .get('/Admin/Pedidos', checkAuth, obtenerPedidosAdmin)
        //.patch('/Admin/Pedido', checkAuth, ActualizarPedido);
        // .patch('/Admin/Pedido', checkAuth, actualizarPedidoAdmin);

// Rutas de Usuario Publicas
router.get('/Productos/:id', obtenerProducto);
router.post('/Productos', obtenerProductos);
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