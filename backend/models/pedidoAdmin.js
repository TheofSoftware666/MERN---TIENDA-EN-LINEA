import db from "../config/db.js";

const pedidoDetalle = async (id) => {
    
    // Conexion DB
    const conection = await db();

    const query = `SELECT * FROM pedido_detalles WHERE pedidoId = ${id}`;

    const [results, fields ] = await conection.query(query);

    return results;
};

const pedidos = async (limit = 50) => {
    
    // Conexion DB
    const conection = await db();
    
    const limite = limit > 0 ? limit : 50;    

    const query = `SELECT * FROM pedido LIMIT ${limite}`;

    const [results, fields ] = await conection.query(query);

    return results;
};

const actualizarPedido = async (data) => {
    
    // Conexion DB
    const conection = await db();  

    const query = `UPDATE pedido_detalles SET productoId = 0,cantidad = 0,precioUnitario = 0,montoXCantidad = 0,ivaUnitario = 0,descuentoUnitario = 0,totalUbitario ?= 0,totalPedido = 0,fechaEntrega = 0 WHERE pedidoDetallesId = 0`;

    const [results, fields ] = await conection.query(query);

    return results;
};

const eliminarPedido = async (id) => {
    
    // Conexion DB
    const conection = await db();

    const query = `DELETE FROM pedido_detalles WHERE pedidoId = ${id}`;

    const [results, fields ] = await conection.query(query);

    return results;
};

const hacerPedido = async () => {
    
    // Conexion DB
    const conection = await db();

    const query = `INSERT INTO PEDIDO_DETALLES (pedidoId,productoId,cantidad,precioUnitario,montoXCantidad,ivaUnitario,descuentoUnitario,totalUbitario,totalPedido,fechaEntrega)
                     VALUES (1, 3, 1, 2000, 2000, 320, 0, 2320, 10000,'2024-12-25');`;

    const [results, fields ] = await conection.query(query);

    return results;
};



export { pedidoDetalle, pedidos, actualizarPedido, eliminarPedido, hacerPedido};