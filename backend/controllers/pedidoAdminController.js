import { pedidoDetalle, pedidos, actualizarPedido, eliminarPedido, hacerPedido } from "../models/pedidoAdmin.js";

const obtenerPedidoAdmin = (req, res) => {
    const { id } = req.params;

    console.log(id);
};

const obtenerPedidosAdmin = (req, res) => {

};

const registrarPedidoAdmin = (req, res) => {

};

const actualizarPedidoAdmin = (req, res) => {
    const postData = req.body;

    console.log(postData);
};

const borrarPedidoAdmin = (req, res) => {

};


export {obtenerPedidoAdmin, obtenerPedidosAdmin, registrarPedidoAdmin, actualizarPedidoAdmin};