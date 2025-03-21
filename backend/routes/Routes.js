import express from "express";
import { actualizarInfoTienda, eliminarInfoTienda, infoTienda, ingresarInfoTienda } from "../controllers/tiendaController.js";
import { obtenerProductos, obtenerProducto } from "../controllers/productosController.js";
import { iniciarSesion, registrarUsuario, confirmarCuenta, mostrarPerfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/MiTienda', infoTienda)
        .post('/MiTienda', ingresarInfoTienda)
        .put('/MiTienda', actualizarInfoTienda)
        .delete('/MiTienda', eliminarInfoTienda);

router.get('/Productos', obtenerProductos);
router.get('/Productos/:id', obtenerProducto);

router.get('/ConfirmarCuenta/:token', confirmarCuenta);
router.post('/Login', iniciarSesion);
router.post('/Registrar', registrarUsuario);

router.get('/Perfil', checkAuth , mostrarPerfil);

export default router;