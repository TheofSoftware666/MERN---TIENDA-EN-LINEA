import express from "express";
import { actualizarInfoTienda, eliminarInfoTienda, infoTienda, ingresarInfoTienda } from "../controllers/tiendaController.js";
import { obtenerProductos, obtenerProducto } from "../controllers/productosController.js";
import { iniciarSesion } from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/MiTienda', infoTienda)
        .post('/MiTienda', ingresarInfoTienda)
        .put('/MiTienda', actualizarInfoTienda)
        .delete('/MiTienda', eliminarInfoTienda);

router.get('/Productos', obtenerProductos);
router.get('/Productos/:id', obtenerProducto);

router.post('/login', iniciarSesion)

export default router;