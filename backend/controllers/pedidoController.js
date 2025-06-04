
const obtenerPedido = async (req , res) => {
    const { id } = req.params;

    const resultado = await pedidoDetalle(id);

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(404).json({error : error.message});
    }

    
    
    return res.status(200).json({pedido : resultado});
} ;

const obtenerPedidos = async (req , res) => {
    const resultado = await pedidos();

    console.log(resultado);

    if(resultado.length == 0){
        const error = new Error("No se encontro ningun Pedido");
        return res.status(404).json({error : error.message});
    }
    
    return res.status(200).json({pedidos : resultado});
} ;

const capturarPedido = async (req , res) => {
    const data = req.body;

    console.log(data);
} ;

const actualizarPedido = async (req , res) => {
    const postData = req.body;

    console.log(postData);
} ;

export { obtenerPedido, obtenerPedidos, capturarPedido, actualizarPedido }
