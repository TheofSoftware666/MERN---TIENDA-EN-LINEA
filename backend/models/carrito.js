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

const agregarProductoCarrito = async (idUsuario, producto) => {

    const conection = await db();

    const query = `SELECT agregarProductoCarrito(${idUsuario}, ${producto});`;

    const [results , fields ] = await conection.query(query);

    return results;
}

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

export { carrito, carritoDetalles, carritoEstado, addNewCarrito, agregarProductoCarrito, obtenerProductoCarrito, eliminarProductoCarrito }