import { grabarPedido
    , consultarPedido
    , consultarPedidos
    , createOrderModel
    , getOrdersAdminModel
    , getOrdersModel
    , UpdateOrderStatusByOrderIdModel
    , GetOrderHistoryStatusByOrderIdModel
    , SetOrderHistoryStatusByOrderIdModel
 } from '../models/pedido.js'; 

import { GetAdminProfile } from '../models/usuario.js';
import { checkUserByIdModel } from '../models/usuario.js';
import { sendMailClientChangeStatus } from './../helpers/mails/client/mailClientController.js';

const obtenerPedido = async (req , res) => {
    const { id } = req.params;
    const { usuario } = req;

    if(usuario.length === 0){
        const error = new Error("Es necesario volver a iniciar sesion");
        return res.status(400).json({error : error.message});
    }

    const resultado = await createOrderModel(id, usuario);

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(400).json({error : error.message});
    }
    
    return res.status(200).json({pedido : resultado});
};

const createOrder = async (req, res) => {
    const userId = req.usuario[0].UserId_New;
    const requestDate = req.body?.form || {};

    const response = {
        ok: false,
        message: 'Ocurrio un error al crear pedido. ',
        data: null
    }

    try{
                
    }
    catch(ex)
    {
        console.log("ERROR: al crear un pedido. ");
        response.ok = false;
        response.message = 'Ocurrio un error al crear el pedido ' + ex;
        response.data = null;
        return response;
    }
};

const obtenerPedidos = async (req , res) => {
    const [ usuario ] = req;
   
    if(usuario.length === 0){
        const error = new Error("Error : Es necesario volver a iniciar sesion");
        return res.status(404).json({error : error.message}); 
    }

    const resultado = await consultarPedidos(usuario);

    if(resultado.length == 0){
        const error = new Error("Error : Aun no tienes pedidos :(");
        return res.status(404).json({error : error.message});
    }
    
    return res.status(200).json({pedidos : resultado});
};

const getOrdersAdmin = async (req , res) => {
    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener los pedidos.',
        data: null
    };

    try{
        const userId = req.usuario[0].UserId_New;
        
        if(!userId || userId.length === 0){
            const error = new Error("Es necesario volver a iniciar sesion");
            response.message = error.message;
            return res.status(400).json({error : response}); 
        }
        
        const checkUser = await checkUserByIdModel(userId);

        if(!checkUser || checkUser.ok === false){
            // const error = new Error("No tienes permisos para realizar esta accion.");
            response.message = checkUser.message;
            return res.status(403).json({error : response}); 
        }

        const getOrders = await getOrdersAdminModel();

        if(getOrders.ok === false){
            response.message = getOrders.message;
            return res.status(400).json({error : response});
        }
        
        response.ok = getOrders.ok;
        response.message = getOrders.message;
        response.data = getOrders.data;
        return res.status(200).json({data : response});
    }catch(ex){
        response.ok = false;
        response.message = 'Error al obtener los pedidos ' + ex;
        response.data = null;
        return res.status(500).json({error : response}); 
    }
};

const getOrdersAdminById = async (req , res) => {
    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener los pedidos.',
        data: null
    };

    try{
        const [ usuario ] = req;
   
        if(usuario.length === 0){
            const error = new Error("Error : Es necesario volver a iniciar sesion");
            response.message = error.message;
            return res.status(400).json({error : response}); 
        }

        const getOrders = await getOrdersAdminModel();

        if(getOrders.ok === false){
            response.message = getOrders.message;
            return res.status(400).json({error : response});
        }
        
        response.ok = getOrders.ok;
        response.message = getOrders.message;
        response.data = getOrders.data;
        return res.status(200).json({data : response});
    }catch(ex){
        response.ok = false;
        response.message = 'Error al obtener los pedidos ' + ex;
        response.data = null;
        return response;
    }
};

const getOrdersByUserId = async (req, res) => {
    const userId = req.usuario[0].UserId_New;
    
    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener los pedidos.',
        data: null
    };

    try{

        if(!userId || userId.length === 0){
            const error = new Error("Es necesario volver a iniciar sesion. ");
            response.message = error.message;
            return res.status(303).json({error : response});
        }

        const getOrders = await getOrdersModel(userId);

        if(getOrders.ok === false){
            response.message = getOrders.message;

            return res.status(400).json({error : response});
        }

        response.ok = getOrders.ok;
        response.message = getOrders.message;
        response.data = getOrders.data;
        return res.status(200).json({data : response});
    }catch(ex){
        response.ok = false;
        response.message = 'Error al obtener los pedidos ' + ex;
        response.data = null;
        return res.status(500).json({error : response});
    }
};

const capturarPedido = async (req , res) => {
    const [ usuario ] = req;
    const [ cupon ] =  req.body;

    if(usuario.length === 0){
        const error = new Error("Error : Es necesario volver a iniciar sesion.");
        return res.status(404).json({error : error.message});
    }

    // Procesar pago
    const ProcesarPago = false;
    const resultado = await grabarPedido(usuario, ProcesarPago, cupon);
    return res.status(200).json({pedidos : resultado});
};

const SetChangeOrderStatus = async (req , res) => {
    const userId = req.usuario[0].UserId_New;
    const order = req.body;
    
    if(!userId || userId.length === 0){
        const error = new Error("Es necesario volver a iniciar sesion");
        return res.status(400).json({error : error.message}); 
    }
    
    if(!order || order.length === 0){
        const error = new Error("Es necesario seleccionar un pedido");
        return res.status(400).json({error : error.message}); 
    }

    if(order.Status === undefined || order.Status.length === 0){
        const error = new Error("Es necesario seleccionar un estado valido");
        return res.status(400).json({error : error.message}); 
    }

    const validStatuses = [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
    ];

    if (!validStatuses.includes(order.Status)) {
        const error = new Error("El estado proporcionado no es válido.");
        return res.status(400).json({error : error.message}); 
    }

    const getStatus = await GetOrderHistoryStatusByOrderIdModel(order.OrderId, order.Status);

    if(getStatus.data.length === 0){

        // Enviar correo
        let Notations;

        if (order.Status === 'shipped') {
            Notations = 'El estado del pedido ha sido actualizado a enviado. ';
        }
        else if (order.Status === 'delivered') {
            Notations = 'El estado del pedido ha sido actualizado a entregado. ';
        }
        else if (order.Status === 'pending') {
            Notations = 'El estado del pedido ha sido actualizado a pendiente. ';
        }
        else if (order.Status === 'processing') {
            Notations = 'El estado del pedido ha sido actualizado a procesando. ';
        }
        else if (order.Status === 'cancelled') {
            Notations = 'El estado del pedido ha sido actualizado a cancelado. ';
        }
        else if (order.Status === 'refunded') {
            Notations = 'El estado del pedido ha sido actualizado a reembolsado. ';
        }
        else {
            const error = new Error("El estado proporcionado no es válido.");
            return res.status(400).json({error : error.message}); 
        }

        const setHistoryStatus = await SetOrderHistoryStatusByOrderIdModel(order.OrderId, order.Status, Notations, userId);

        if(!setHistoryStatus.ok){
            return res.status(400).json({error : setHistoryStatus.message}); 
        }
        
        const detailResponse = await GetAdminProfile();
        const response = sendMailClientChangeStatus(detailResponse.data.nombre_tienda, detailResponse.data.emailAdmin, "altisyscorporacion@gmail.com", order.OrderId, order.Status, null);
        console.log("deberia de enviar correo. ");
    }

    const updateStatus = await UpdateOrderStatusByOrderIdModel(order.OrderId, order.Status);

    if(!updateStatus || !updateStatus.ok){
        return res.status(400).json({error : updateStatus.message || 'No se pudo actualizar el estado del pedido.'}); 
    }

    return res.status(200).json({message : 'Estado del pedido actualizado correctamente.'});
};

export { 
    obtenerPedido
    , obtenerPedidos
    , capturarPedido 
    , getOrdersAdmin
    , getOrdersAdminById
    , getOrdersByUserId
    , SetChangeOrderStatus
}
