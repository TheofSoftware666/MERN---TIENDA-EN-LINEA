import db from "../config/db.js";

const carrito = async (id) => {

    const conection = await db();

    const query = `SELECT * FROM carrito WHERE usuarioId = ${id} AND estado != 'finalizado'`;

    const [results, fields] = await conection.query(query);

    return results;
}

const carritoDetalles = async (id) => {

    const conection = await db();

    const query = `SELECT productoId, nombre, descripcion, cantidad FROM carrito_items 
                    LEFT JOIN productos ON producto_id = productoId WHERE carrito_id = ${id}`;

    const [results, fields] = await conection.query(query);
    return results;
}

const carritoEstado = async (id, estado) => {

    const conection = await db();

    const query = `UPDATE carrito SET estado = '${estado}' WHERE id = ${id}`;

    const [results , fields] = await conection.query(query);

    return results;
};

const getCartItemsByIdUserModel = async (idUsuario) => {
    let conection;

    try{
        if (!idUsuario) throw new Error("El idUsuario es obligatorio.");

        conection = await db();
        const query = `SELECT 
            c.CartId,
            ci.CartItemId,
            ci.ProductId,
            p.nombre AS ProductName,
            (SELECT URL FROM productoimagenes WHERE ProductoId = ci.ProductId LIMIT 1) AS Image,
            ci.Quantity,
            ci.UnitPrice AS FinalPrice,
            ci.BasePrice,              
            ci.DiscountPercent,        
            ci.DiscountAmount,         
            ci.Subtotal,
            (ci.BasePrice * ci.Quantity) AS SubtotalOriginal,
            ((ci.BasePrice * ci.Quantity) - ci.Subtotal) AS ItemSavings
        FROM CartItem ci
        INNER JOIN productos p ON ci.ProductId = p.productoId
        INNER JOIN Cart c ON c.CartId = ci.CartId
        WHERE c.Status = 'ACTIVE'
        AND (ci.D_E_L_E_T_ IS NULL OR ci.D_E_L_E_T_ = '' ) 
        AND UserId = ?`;
        const [results, fields] = await conection.query(query, [idUsuario]);
        return results;

    }catch(error){
        console.error("Error en agregarProductoCarrito:", error.message);
        throw error; 
    } finally {
        if (conection) {
            await conection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const getCartTotalItemsByUserIdModel = async (idUsuario) => {
    let conection;
    
    try{
        conection = await db();

        const query = 
        `SELECT 
            COUNT(ci.CartItemId) AS TotalItems
        FROM CartItem ci
        INNER JOIN Cart c ON c.CartId = ci.CartId
        WHERE c.Status = 'ACTIVE' 
        AND (ci.D_E_L_E_T_ IS NULL OR ci.D_E_L_E_T_ = '' )
        AND UserId = ?`;

        const [results, fields] = await conection.query(query, [idUsuario]);
        return results[0]?.TotalItems || 0;

    }catch(error){
        console.error("Error en getCartTotalItemsByUserIdModel:", error.message);
        throw error; 
    }finally{
        if (conection) {
            await conection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const SetAddCartItemModel = async (idUsuario, idProducto, idVariante = null, quantity = 1) => {
    let connection;

    try {
        if (!idUsuario) throw new Error("El idUsuario es obligatorio.");
        if (!idProducto) throw new Error("El idProducto es obligatorio.");
        if (!quantity || quantity <= 0) throw new Error("La cantidad debe ser mayor a 0.");

        // Conexión
        connection = await db();

        const query = 'CALL SP_AddToCart(?, ?, ?, ?);';
        const [results] = await connection.query(query, [
            idUsuario,
            idProducto,
            idVariante,
            quantity
        ]);

        return results;

    } catch (error) {
        console.error("Error en agregarProductoCarrito:", error.message);
        throw error; 
    } finally {
        if (connection) {
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const DeleteCartItemByIdProductModel = async (idUsuario, idProducto, idVariant = null, quantity = 1) => {
    let connection;
    try {
        if (!idUsuario) throw new Error("El idUsuario es obligatorio.");
        if (!idProducto) throw new Error("El idProducto es obligatorio.");
        if (!quantity || quantity == 0) throw new Error("La cantidad es obligatoria.");
        // Conexión
        connection = await db();
        const query = 'CALL SP_RemoveFromCart(?, ?, ?, ?);';
        const [results] = await connection.query(query, [
            idUsuario,
            idProducto,
            idVariant,
            quantity
        ]);
        return results;
    } catch (error) {
        console.error("Error en DeleteCartItemByIdProduct:", error.message);
        throw error; 
    } finally {
        if (connection) {
            await connection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const RemoveCartItemByIdProductModel = async (idUsuario, cartItemId) => {
    let conection;

    try{
        conection = await db();
        const query = 'CALL SP_DeleteCartItem( ?, ? );';
        const [results, fields ] = await conection.query(query, [idUsuario, cartItemId]);

        if(!results || results.length === 0){
            throw new Error("No se pudo eliminar el item del carrito.");
        }

        return results;
    }catch(error){
        console.error("Error en RemoveCartItemByIdProduct:", error.message);
        throw error; 
    } finally {
        if (conection) {
            await conection.end().catch(err => console.error("Error cerrando conexión:", err));
        }
    }
};

const addNewCarrito = async (idUsuario) => {
    
    const conection = await db();

    const query = `INSERT INTO carrito (usuarioId) VALUES (${idUsuario}) `;

    const [results , fields] = await conection.query(query);

    return results;
}

const obtenerProductoCarrito = async (idUsuario,idProducto, cantidad) => {

    const conection = await db();

    const query = `SELECT ActualizarProductoCarrito(${idUsuario}, ${idProducto}, ${cantidad});;`;

    const [results, fields] = await conection.query(query);

    return results;
}

const eliminarProductoCarrito = async (idUsuario, idProducto) => {
    
    const conection = await db();

    const query = `SELECT EliminarItemCarrito(${idUsuario},${idProducto});`;
    
    const [results, fields ] = await conection.query(query);

    return fields;
} 

export {
     carrito
    , carritoDetalles
    , carritoEstado
    , addNewCarrito
    , obtenerProductoCarrito
    , eliminarProductoCarrito 
    , SetAddCartItemModel
    , getCartItemsByIdUserModel
    , getCartTotalItemsByUserIdModel
    , RemoveCartItemByIdProductModel
    , DeleteCartItemByIdProductModel
}