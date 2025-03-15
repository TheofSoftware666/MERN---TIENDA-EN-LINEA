import db from "../config/db.js";

const Productos = async (limit = "50") => {

    const conection = await db();

    const query = limit.length > 1 ? "LIMIT " + limit : "LIMIT 50";

    const [ results, fields ] = await conection.query("SELECT * FROM productos " + query);

    return results; 
};

const Producto = async (idProducto) => {
    
    const conection = await db();

    const query = `SELECT * FROM productos WHERE productoId = ${idProducto}`;

    const [ results, fields ] = await conection.query(query);

    return results;
    
}


export { Productos, Producto };