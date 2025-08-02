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
    const [ usuario ] = req;

    if(usuario.length === 0){
        const error = new Error("Es necesario volver a iniciar sesion");
        return res.status(404).json({error : error.message});
    }

    const resultado = await pedidos();

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(404).json({error : error.message});
    }
    
    return res.status(200).json({pedidos : resultado});
};

const actualizarPedidoAdmin = (req, res) => {
    const postData = req.body;
    const [ usuario ] =  req;

    if(usuario.length === 0){
        const error = new Error("Error : Es necesario iniciar nuevamente sesión");
        return res.status(404).json({error : error.message});
    }

    // ! Falta actualizar pedido desde usuario admin

    return res.status(200).json({pedidos : resultado});
};

// comprobarUsuario
export {obtenerPedidoAdmin, obtenerPedidosAdmin, actualizarPedidoAdmin};