import { ok } from "assert";
import { carrito
    , getCartItemsByIdUserModel
    , getCartTotalItemsByUserIdModel
    , carritoEstado
    , DeleteCartItemByIdProductModel
    , SetAddCartItemModel
    , obtenerProductoCarrito
    , RemoveCartItemByIdProductModel
    } from "../models/carrito.js";


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

const getCountItemsByUserId = async (req, res) => {
   try {
        const userId = req.usuario?.[0]?.UserId_New || null;

        if (!userId) {
            return res.status(400).json({
                ok: false,
                message: "No se pudo identificar al usuario."
            });
        }

        const response = await getCartTotalItemsByUserIdModel(userId);

        if (!response || response.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "Aún no has agregado productos a tu carrito.",
                data: []
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Carrito obtenido correctamente.",
            data: response
        });

    } catch (error) {
        console.error("Error en getCartItemsByUserId:", error);

        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor.",
            error: error.message
        });
    }
};

const getCartItemsByUserId = async (req, res) => {
    try {
        const userId = req.usuario?.[0]?.UserId_New || null;

        if (!userId) {
            return res.status(400).json({
                ok: false,
                message: "No se pudo identificar al usuario."
            });
        }

        const response = await getCartItemsByIdUserModel(userId);

        if (!response || response.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "Aún no has agregado productos a tu carrito.",
                data: []
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Carrito obtenido correctamente.",
            data: response
        });

    } catch (error) {
        console.error("Error en getCartItemsByUserId:", error);

        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor.",
            error: error.message
        });
    }
};

const addProductoCarrito = async (req, res) => {
    try {
        const userId = req.usuario?.[0]?.UserId_New || null;
        const idProducto = Number(req.params?.id) || 0;
        const idVariante = null; 
        const quantity = Number(req.body?.quantity) || 1;

        if (!userId) {
            return res.status(400).json({
                ok: false,
                message: "No se pudo identificar al usuario."
            });
        }

        if (!idProducto || idProducto <= 0) {
            return res.status(400).json({
                ok: false,
                message: "ID de producto inválido."
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                ok: false,
                message: "La cantidad debe ser mayor a 0."
            });
        }

        const data = await SetAddCartItemModel(userId, idProducto, idVariante, quantity);

        if (!data) {
            return res.status(500).json({
                ok: false,
                message: "No se pudo agregar el producto al carrito.",
                data: []
            });
        }

        return res.status(201).json({
            ok: true,
            message: "Producto agregado correctamente al carrito.",
            data
        });
    } catch (error) {
        console.error("Error en addProductoCarrito:", error);
        return res.status(500).json({
            ok: false,
            message: "Error interno al agregar producto al carrito.",
            error: error.message
        });
    }
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
    try{
        const userId = req.usuario?.[0]?.UserId_New || null;
        const { productId, idVariant, quantity } = req.body;

        if(!userId || userId === null || userId.trim() === ''){
            const error = new Error("ID de producto invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        // if(!idVariant || idVariant <= 0){
        //     const error = new Error("ID de variante invalido.");
        //     return res.status(400).json({ ok: false, error : error.message});
        // }

        if(!productId || productId <= 0){
            const error = new Error("ID de producto invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!quantity || quantity <= 0){
            const error = new Error("La cantidad debe ser mayor a 0.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        const response = await DeleteCartItemByIdProductModel(userId, productId, idVariant, quantity);

        if(!response || response.length === 0){
            const error = new Error("No se pudo eliminar el producto del carrito.");
            return res.status(403).json({ ok: false, error : error.message});
        }
        
        return res.status(200).json({ ok: true, message : "Se elimino el producto correctamente"});
    }catch(error){
        console.error("Error en elimarItemsCarrito:", error);
        return res.status(500).json({
            ok: false,
            message: "Error interno al eliminar el producto del carrito.",
            error: error.message
        });
    }
};

const RemoveCartItemByProducto = async (req, res) => {
    try{
        const userId = req.usuario?.[0]?.UserId_New || null;
        const { cartItemId } = req.body;

        if(!userId || userId === null || userId.trim() === ''){
            const error = new Error("ID de producto invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!cartItemId || cartItemId <= 0){
            const error = new Error("ID de producto invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        console.log("Usuario y cartItemId para eliminar:");
        console.log(userId, cartItemId);
        const error = new Error("ID de producto invalido.");
        return res.status(400).json({ ok: false, error : error.message});

        const response = await RemoveCartItemByIdProductModel(userId, cartItemId);

        if(response == null || response.length === 0){
            const error = new Error("No se pudo eliminar el producto del carrito.");
            return res.status(403).json({ ok: false, error : error.message});
        }

        return res.status(200).json({ ok: true, message : "Se elimino el producto correctamente"});

    }catch(error){
        console.error("Error en DeleteCartByProducto:", error);
        return res.status(500).json({
            ok: false,
            message: "Error interno al eliminar el producto del carrito.",
            error: error.message
        });
    }
}

export {obtenerCarrito, getCartItemsByUserId, getCountItemsByUserId , addProductoCarrito, modificarCarrito, elimarItemsCarrito, RemoveCartItemByProducto};