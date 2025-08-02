import db from "../config/db.js";

const grabarPedido = async (idUsuarioCarrito, Pagado, CuponDescuento) => {
    
    const conection = await db();
    
    const query = `
                    SELECT GenerarPedido(${idUsuarioCarrito},${Pagado},'${CuponDescuento}');
    `;

    const [results, fields] = await conection.query(query);

    return results;
}

const consultarPedido = async (IdPedido, idUsuario) => {
    
    const conection = await db();

    const query = `
                    SELECT 
                        pedidoId AS Numero_Pedido
                        , usuarioId AS Codigo_Cliente
                        , nombre AS Nombre_Cliente 
                        , Estatus AS Estatus_Pedido
                        , subtotal AS SubTotal
                        , descuento_total AS Descuento
                        , montoTotal AS Total
                        , fechaCompra AS Feccha_Compra
                        , fechaEntrega AS Fecha_Entrega  
                    FROM pedido
                    INNER JOIN usuarios ON usuarioId = userId 
                    WHERE usuarioId = ${idUsuario} pedidoId = ${IdPedido}
                `; 

    const [ results, fields ] = await conection.query(query);
    
    return results;

}

const consultarPedidos = async (req, res) => {

     const conection = await db();

    const query = `
                    SELECT 
                        pedidoId AS Numero_Pedido
                        , usuarioId AS Codigo_Cliente
                        , nombre AS Nombre_Cliente 
                        , Estatus AS Estatus_Pedido
                        , subtotal AS SubTotal
                        , descuento_total AS Descuento
                        , montoTotal AS Total
                        , fechaCompra AS Feccha_Compra
                        , fechaEntrega AS Fecha_Entrega  
                    FROM pedido
                    INNER JOIN usuarios ON usuarioId = userId 
                    WHERE usuarioId = ${idUsuario}
    `; 

    const [ results, fields ] = await conection.query(query);
    
    return results;
}

export {
    grabarPedido,
    consultarPedido,
    consultarPedidos,
}

