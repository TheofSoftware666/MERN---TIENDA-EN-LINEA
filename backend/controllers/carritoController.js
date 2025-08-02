import { carrito, carritoDetalles, carritoEstado, addNewCarrito, agregarProductoCarrito, obtenerProductoCarrito, eliminarProductoCarrito } from "../models/carrito.js";

const obtenerCarrito = async (req, res) => {
    const { usuario } = req; 
    const { usuarioId} = usuario[0];

    const resultado = await carrito(usuarioId);

    if(resultado.length == 0){
        // const carritoVacio = {
        //     msg : "Aun no has agregado productos a tu carrito",
        //     img : "carrito-vacio"
        // };  
        const error = new Error("Aun no has agregado productos a tu carrito");
        return res.status(404).json({ error : error.message});
    }

    const { id } = resultado[0];

    const detallesCarrito =  await carritoDetalles(id);

    if(detallesCarrito.length == 0){
        // const carritoVacio = {
        //     msg : "Aun no has agregado productos a tu carrito",
        //     img : "carrito-vacio"
        // };  
        const resultado = await carritoEstado(id, "inactivo");
        const error = new Error("Aun no has agregado productos a tu carrito");
        return res.status(404).json({ error : error.message});
    }

    return res.status(200).json({ msg : detallesCarrito});
};

const obtenerDetallesCarrito = async (req, res) => {
    const { usuario } = req; 
    const { usuarioId} = usuario[0];

    const resultado = await carritoDetalles(usuarioId);

    if(resultado.length == 0){
        // const carritoVacio = {
        //     msg : "Aun no has agregado productos a tu carrito",
        //     img : "carrito-vacio"
        // };  
        const error = new Error("Aun no has agregado productos a tu carrito");
        return res.status(404).json({ error : error.message});
    }

    return res.status(200).json({ msg : resultado});
};

const addProductoCarrito = async (req, res) => {
    const { usuario } = req;
    const { idProducto } = req.params;
    const { usuarioId } = usuario[0];    

    if(!usuario){
        const e = new Error("USUARIO : no existe");
        return res.status(202).json({ error : e.message});
    }

    if(!idProducto){
        const e = new Error("PRODUCTO : no existe");
        return res.status(202).json({ error : e.message});
    }

    // Comprobar que exista carrito 
    const resultado = await carrito(usuarioId);

    if(resultado.length == 0){
        const carrito = await addNewCarrito(usuarioId);
        
        // Comprobar que exista carrito 
        const validarCarrito = await carrito(usuarioId);
    
        if(validarCarrito.length == 0){
            const e = new Error(" Error  : al crear el carrito ");
            return res.status(202).json({ error : e.message});
        }
    }

    const message = await agregarProductoCarrito(usuarioId, idProducto);
     
    return res.status(202).json({ success : message});
};

const modificarCarrito = async (req, res) => {
    
    const { usuario } = req;
    const { usuarioId } = usuario[0];    
    const { productoId, cantidad} = req.body;
    let message = "Se actualizo tu carrito exitosamente";

    const resultado = await carrito(usuarioId);

    if(resultado.length === 0){
        const error = new Error('El usuario no cuenta con un carrito');
        return res.status(404).json({ success : error});
    }

    const productoCarrito = await obtenerProductoCarrito(usuarioId, productoId, cantidad);

    if(productoCarrito.length === 0){
        const error = new Error('No se encontro ningun producto.');
        return res.status(404).json({ success : error});
    }

    if(productoCarrito[0].cantidad === cantidad){        
        return res.status(200).json({ success : message});
    }

    return res.status(200).json({ success : message});
    
};

const elimarItemsCarrito = async (req, res) => {
    
    const { usuario } = req;
    const { usuarioId } = usuario[0];   
    const id = req.params.id;

    const resultado = await eliminarProductoCarrito(usuarioId, id);

    console.log(resultado[0]);
    
    return res.status(200).json({ success : "Se elimino el producto correctamente"});

};

export {obtenerCarrito, obtenerDetallesCarrito, addProductoCarrito, modificarCarrito, elimarItemsCarrito};