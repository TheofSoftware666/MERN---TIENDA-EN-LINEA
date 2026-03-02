import { consultarDevolucion
    , getReturnsByUserIdModel
    , setReturnModel
    , GetOrdersDeliveredByUserIdModel
    , getReturnsAdminModel
 }  from '../models/devolucion.js'
import { GetOrderDetailByOrderId } from '../models/pedido.js';
import { getUserById } from '../models/usuario.js';

const obtenerDevolucion = async (req, res) => {
    const { Usuario } = req;
    const { id } = req;

    if(Usuario.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(404).json({ Error : error.message});
    }

    if(id.length == 0){
        const error = new Error("Es necesario ingresar un id para buscar.");
        return res.status(404).json({ Error : error.message});
    }

    // ! Consulta Base de datos
    const resultado = await consultarDevolucion(Usuario, id);

    if(resultado.length == 0){
        const error = new Error("NO se encontro ninguna devolucion.");
        return res.status(404).json({ Error : error.message});
    }

    return res.status(200).json({ SUccess : error.message});
}

const getReturnsByUserId = async (req, res) => {
    const userId = req.usuario[0].UserId_New;

    if(!userId || userId.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(400).json({ error : error.message});
    }

    const response = await getReturnsByUserIdModel(userId);

    if(!response.ok && response.code == 404 && response.results.length == 0){
        const error = new Error("No se encontraron devoluciones para este usuario.");
        return res.status(404).json({ Error : error.message});
    }

    if(!response.ok){
        const error = new Error(response.message || "Ocurrio un error al intentar obtener las devoluciones.");
        return res.status(400).json({ Error : error.message});
    }

    return res.status(200).json({ Success : response});
}

const getReturnsAdmin = async (req, res) => {
    const userId = req.usuario[0].UserId_New;

    if(!userId || userId.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(400).json({ error : error.message});
    }

    const responseUsuario = await getUserById(userId);

    if(!responseUsuario){
        const error = new Error("No se encontro el usuario.");
        return res.status(404).json({ Error : error.message});
    }
    
    const response = await getReturnsAdminModel();

    if(!response.ok && response.code == 404 && response.results.length == 0){
        const error = new Error("No se encontraron devoluciones para este usuario.");
        return res.status(404).json({ Error : error.message});
    }

    if(!response.ok){
        const error = new Error(response.message || "Ocurrio un error al intentar obtener las devoluciones.");
        return res.status(400).json({ Error : error.message});
    }

    return res.status(200).json({ Success : response});
}

const CreateReturn = async (req, res) => {
    const userId = req.usuario[0].UserId_New;
    const data = req.body;

    if(!userId || userId.length === 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(400).json({ Error : error.message});
    }

    if(!data || data.length == 0){
        const error = new Error("No se encontro ningun información. ");
        return res.status(400).json({ Error : error.message});
    }

    if(!data.order_id || data.order_id.length === 0){
        const error = new Error("El order id es invalido. ");
        return res.status(400).json({ Error : error.message});
    }

    if(!data.refund_method || data.refund_method.length === 0){
        const error = new Error("El metodo de envio es invalido. ");
        return res.status(400).json({ Error : error.message});
    }

    if(!data.reason || data.reason.length === 0){
        const error = new Error("La razon ingresas es invalida. ");
        return res.status(400).json({ Error : error.message});
    }

    if(!data.reason_detail || data.reason_detail.length === 0){
        const error = new Error("La razon detalla es invalida. ");
        return res.status(400).json({ Error : error.message});
    }

    if(!data.items || data.items.length <= 0){
        const error = new Error("Para crear una devolución es necesario selecionar por lo menos un producto. ");
        return res.status(400).json({ Error : error.message});
    }

    // ? Comprobar que existe y se encuntra en estatus de completed
    const shipping = {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        instructions: ''
    };

    const getOrder = await GetOrderDetailByOrderId(data.order_id, shipping);

    if(!getOrder || !getOrder.ok){
        const error = new Error("No se encontro ningun pedido. ");
        return res.status(404).json({ Error : error.message});
    }

    if(getOrder.data.orderStatus !== 'delivered'){
        const error = new Error("No se puede procesar esta devolución debido a que el pedido se encuentra en un status " + getOrder.data.orderStatus + ". ");
        return res.status(400).json({ Error : error.message});
    }

    // ! Consulta Base de datos
    const resultado = await setReturnModel(data);

    console.log("RESULTADO: ", resultado);

    if(!resultado || !resultado.ok){
        return res.status(resultado.code || 500).json({ Error : resultado.message || 'Ocurrio un error al intentar crear la devolución. '});
    }
    
    return res.status(200).json({ Success : resultado});
}

const GetOrdersDeliveredByUserId = async (req, res) => {
    const userId = req.usuario[0].UserId_New;

    if(!userId || userId.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(400).json({ Error : error.message});
    }

    const resultado = await GetOrdersDeliveredByUserIdModel(userId);

    if(!resultado || !resultado.ok || resultado.length == 0){
        const error = new Error(resultado.message || "No se encontraron pedidos elegibles para devolución.");
        return res.status(404).json({ Error : error.message});
    }

    return res.status(200).json({ Success : resultado});
};


export { obtenerDevolucion
    , getReturnsByUserId
    , CreateReturn
    , GetOrdersDeliveredByUserId
    , getReturnsAdmin
}   