import { pedidoDetalle, pedidos, actualizarPedido, eliminarPedido, hacerPedido } from "../models/pedidoAdmin.js";

const obtenerPedidoAdmin = async (req, res) => {
    const { id } = req.params;

    const resultado = await pedidoDetalle(id);

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(404).json({error : error.message});
    }
    
    return res.status(200).json({pedido : resultado});
    
};

const obtenerPedidosAdmin = async (req, res) => {
    
    const resultado = await pedidos();

    console.log(resultado);

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(404).json({error : error.message});
    }
    
    return res.status(200).json({pedidos : resultado});
};

const registrarPedidoAdmin = (req, res) => {
    const data = req.body;

    console.log(data);
};

const actualizarPedidoAdmin = (req, res) => {
    const postData = req.body;

    console.log(postData);
};

const borrarPedidoAdmin = (req, res) => {

};


export {obtenerPedidoAdmin, obtenerPedidosAdmin, registrarPedidoAdmin, actualizarPedidoAdmin};