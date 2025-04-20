import db from "../config/db.js";

const pedidoDetalle = (id) => {
    
    // Conexion DB
    const conection = db();

    const query = `SELECT * FROM pedido_detalles WHERE pedidoId = ${id}`;

    const [results, fields ] = conection.query(query);

    return results;
};

const pedidos = (limit) => {
    
    // Conexion DB
    const conection = db();

    if(typeof limit != 'number'){

        return "No es un numero";
    }
    
    const limite = limit > 0 ? limit : 50;    

    const query = `SELECT * FROM pedido_detalles LIMIT ${limite}`;

    const [results, fields ] = conection.query(query);

    return results;
};

const actualizarPedido = (data) => {
    
    // Conexion DB
    const conection = db();  

    const query = `UPDATE pedido_detalles SET pedidoId = 0,productoId = 0,cantidad = 0,precioUnitario = 0,montoXCantidad = 0,ivaUnitario = 0,descuentoUnitario = 0,totalUbitario ?= 0,totalPedido = 0,fechaEntrega = 0 WHERE pedidoDetallesId = 0`;

    const [results, fields ] = conection.query(query);

    return results;
};

const eliminarPedido = (id) => {
    
    // Conexion DB
    const conection = db();

    const query = `DELETE FROM pedido_detalles WHERE pedidoId = ${id}`;

    const [results, fields ] = conection.query(query);

    return results;
};

const hacerPedido = (id) => {
    
    // Conexion DB
    const conection = db();

    const query = `INSERT INTO PEDIDO_DETALLES (pedidoId,productoId,cantidad,precioUnitario,montoXCantidad,ivaUnitario,descuentoUnitario,totalUbitario,totalPedido,fechaEntrega)
                     VALUES (1, 3, 1, 2000, 2000, 320, 0, 2320, 10000,'2024-12-25');`;

    const [results, fields ] = conection.query(query);

    return results;
};



export { pedidoDetalle, pedidos, actualizarPedido, eliminarPedido, hacerPedido};