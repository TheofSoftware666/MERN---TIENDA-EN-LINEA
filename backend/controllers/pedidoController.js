import { grabarPedido, consultarPedido, consultarPedidos } from '../models/pedido.js'; 

const obtenerPedido = async (req , res) => {
    const { id } = req.params;
    const { usuario } = req;

    if(usuario.length === 0){
        const error = new Error("Es necesario volver a iniciar sesion");
        return res.status(404).json({error : error.message});
    }

    const resultado = await consultarPedido(id, usuario);

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(404).json({error : error.message});
    }
    
    return res.status(200).json({pedido : resultado});
} ;

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
} ;

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
} ;



export { obtenerPedido, obtenerPedidos, capturarPedido }
