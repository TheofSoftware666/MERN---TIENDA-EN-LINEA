import express from "express";
import { createMulter } from "./../helpers/upload.js";
import { subirArchivo } from "../helpers/uploadFile.js";
import { UpdateConfigEco, GetConfigEco, GetConfigEcoPublic, SetConfigEco } from "../controllers/tiendaController.js";
import { obtenerProductos, obtenerProducto, obtenerProductosAdmin, obtenerProductoAdmin,registrarProducto, actualizarProducto, getTopPRoduct, SetProductoVisit, SetTestimonialsByProduct } from "../controllers/productosController.js";
import { iniciarSesion, registrarUsuario, confirmarCuenta, GetProfileByUserId, CambiarPasswordToken, ComprobarTokenPassword, ActualizarPassword, GetShippingAddressByUserId, SetShippingAddress, SetEcommercePromo } from "../controllers/usuarioController.js";
import { obtenerCategoria, obtenerCategorias, CreateCategory, editarCategoria, GetCategorysByTop } from "../controllers/categoriaController.js";
import { obtenerMarca, obtenerMarcas, createBrand, editarMarca } from "../controllers/marcaController.js";
import { obtenerPedidoAdmin, obtenerPedidosAdmin } from "../controllers/pedidoAdminController.js";
import { obtenerCarrito, addProductoCarrito, getCartItemsByUserId , getCountItemsByUserId, RemoveCartItemByProducto , modificarCarrito, elimarItemsCarrito } from "../controllers/carritoController.js";
import { obtenerPedido, obtenerPedidos, capturarPedido, getOrdersAdmin, getOrdersByUserId, SetChangeOrderStatus } from "../controllers/pedidoController.js";
import { obtenerDevolucion, getReturnsByUserId, CreateReturn, GetOrdersDeliveredByUserId, getReturnsAdmin} from '../controllers/devolucionController.js';
import { getFileImage, DeleteFileImage } from "../controllers/imageController.js";
import { GetCodePostal } from "../controllers/codigoPostalController.js";
import { checkPreviousPayment, ProcessPayment } from "../controllers/paymentsController.js";
import { enviarVerificacion } from "../controllers/correoController.js";
// import { sendMailAdmintNewOrderByUser } from "../helpers/mails/admin/mailAdminController.js";
// import { sendMailClientNewOrderByUser } from "../helpers/mails/client/mailClientController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Declaraciones de Archivos
const uploadCategorias = createMulter("categories");
const uploadProductos = createMulter("products");
const uploadConfigEco = createMulter("ecommerceLogo");

// Rutas de Administrador
router.get('/Admin/GetConfiguracion', checkAuth, GetConfigEco)
        .get('/Admin/GetConfigEcoPublic', GetConfigEcoPublic)
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
        //.patch('/Admin/Pedido', checkAuth, ActualizarPedido)
        // .patch('/Admin/Pedido', checkAuth, actualizarPedidoAdmin);

// ! Rutas de Realizacion de Pedidos Admin
router.get('/GetOrder/:id', checkAuth, obtenerPedido)
        .get('/Admin/GetOrders', checkAuth, getOrdersAdmin)   
        .post('/CreateOrder', checkAuth, capturarPedido)
        .post('/ChangeOrderStatus', checkAuth, SetChangeOrderStatus);
        // .patch('/Pedidos', checkAuth, actualizarPedido)

router.get('/Admin/Returns', checkAuth, getReturnsAdmin)
        //.patch('/Admin/Pedido', checkAuth, ActualizarPedido)
        // .patch('/Admin/Pedido', checkAuth, actualizarPedidoAdmin);

// Rutas de Usuario Publicas
router.get('/Productos/:id', obtenerProducto);
router.get('/ProductosTop', getTopPRoduct);
router.post('/Productos', obtenerProductos);
router.get('/ConfirmarCuenta/:token', confirmarCuenta);
router.post('/Login', iniciarSesion);
router.post('/Registrar', registrarUsuario);
router.post('/TokenPassword', CambiarPasswordToken);
router.post('/ActualizarPassword', ActualizarPassword);
router.get('/ActualizarPassword/:id', ComprobarTokenPassword);
router.get('/GetCategorysByTop', GetCategorysByTop);
router.post('/SetMessageEcommercePromo', SetEcommercePromo);
router.post('/SetProductoVisit/:id', SetProductoVisit);
// router.get('/GetTestimonialsByProduct/:id', SetProductoVisit);
router.post('/SetTestimonialsByProduct/:id', checkAuth, SetTestimonialsByProduct);

// Ruta de Usuario publica /privada
router.get('/GetCart', checkAuth, obtenerCarrito)
        .get('/GetCartItemsByUserId', checkAuth, getCartItemsByUserId)
        .get('/getCountItemsByUserId', checkAuth, getCountItemsByUserId)
        .post('/SetCartItem/:id', checkAuth, addProductoCarrito)
        .patch('/UpdateCart', checkAuth ,modificarCarrito)
        .post('/DeleteItemCart', checkAuth, elimarItemsCarrito)
        .post('/DeleteCartByProducto', checkAuth, RemoveCartItemByProducto);

// Rutas de Usuario Privadas
router.get('/GetProfileByUserId', checkAuth, GetProfileByUserId)
      .get('/GetShippingAddress', checkAuth, GetShippingAddressByUserId)
      .post('/SaveShippingAddress', checkAuth, SetShippingAddress);
        // .post('/Perfil/Configuracion/' , completarPerfil)
        // .patch('/Perfil/Configuracion/', actualizarPerfil);

// Rutas de Devoluciones
router.get('/Devoluciones/:id', checkAuth, obtenerDevolucion)
        .get('/Returns', checkAuth, getReturnsByUserId)   
        .get('/GetOptionsOrderDeliveredByUserId', checkAuth, GetOrdersDeliveredByUserId)
        .get('/GetOrdersDeliveredByUserId', checkAuth, GetOrdersDeliveredByUserId)
        .post('/SetReturns', checkAuth, CreateReturn);

// ? Rutas de Pedidos Usuario
router.get('/Pedido/:id', checkAuth, obtenerPedidoAdmin)
        .get('/Pedidos', checkAuth, getOrdersByUserId)
        //.patch('/Admin/Pedido', checkAuth, ActualizarPedido);
        // .patch('/Admin/Pedido', checkAuth, actualizarPedidoAdmin);

// Rutas de Procesar Pago
router.post('/CheckPaymentCart', checkAuth, checkPreviousPayment)
        .post('/Payment', checkAuth, ProcessPayment)

// Rutas de EnviarCorreos Client
router.post('/Email', enviarVerificacion);

// Rutas de EnviarCorreo Admin
// router.get('/EmailAdmin', sendMailAdmintNewOrderByUser);

export default router;