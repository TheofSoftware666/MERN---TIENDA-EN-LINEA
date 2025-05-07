import db from "../config/db.js";

const carrito = async (id) => {

    const conection = await db();

    const query = `SELECT * FROM carrito WHERE usuarioId = ${id} AND estado != 'finalizado'`;

    const [results, fields] = await conection.query(query);

    return results;
}

const carritoDetalles = async (id) => {

    const conection = await db();

    const query = `SELECT * FROM carrito_items WHERE carrito_id = ${id}`;

    const [results, fields] = await conection.query(query);

    return results;
}

const carritoEstado = async (id, estado) => {

    const conection = await db();

    const query = `UPDATE carrito SET estado = '${estado}' WHERE id = ${id}`;

    const [results , fields] = await conection.query(query);

    return results;
};

const agregarProductoCarrito = async (idUsuario, producto, cantidad) => {

}

const addNewCarrito = async (idUsuario) => {
    
    const conection = await db();

    const query = `INSERT INTO carrito (usuarioId) VALUES (${idUsuario}) `;

    const [results , fields] = await conection.query(query);

    return results;
}

export { carrito, carritoDetalles, carritoEstado, addNewCarrito, agregarProductoCarrito }