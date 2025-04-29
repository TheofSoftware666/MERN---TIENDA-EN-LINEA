import { carrito, carritoDetalles, carritoEstado } from "../models/carrito.js";

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

const addProductoCarrito = (req, res) => {
    
};

const modificarCarrito = (req, res) => {
    
};

const elimarItemsCarrito = (req, res) => {
    
};

export {obtenerCarrito, obtenerDetallesCarrito, addProductoCarrito, modificarCarrito, elimarItemsCarrito};