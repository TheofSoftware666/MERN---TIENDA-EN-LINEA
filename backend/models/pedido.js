import db from "../config/db.js";

const createOrderModel = async (idUsuario, idCart, shippingAddress, billingAddress, shippingMethod, shippingAmount, paymentMethod, customerNotes, adminNotes) =>{
    let conn; 
    const response = {
        ok: false,
        message : 'Ocurrio un error al intentar al intentar crear el pedido',
        data : null
    };

    try{
        conn = await db();
        const query = 'CALL SP_CreateOrder(?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const [results] = await conn.query(query, [idUsuario, idCart, JSON.stringify(shippingAddress), JSON.stringify(billingAddress), shippingMethod, shippingAmount, paymentMethod, customerNotes, adminNotes]);

        response.data = results[0][0] || [];
        response.message = 'Success';
        response.ok = true;
        return response;
    }catch(ex){
        response.ok = false;
        response.message = 'Error al procesar el pedido ' + ex;
        response.data = null;
        return response;
    }finally{
        if(conn) await conn.end();
    }
};

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

const getOrdersAdminModel = async () => {

    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener los pedidos.',
        data: null
    };

    let conection;

    try{
        conection = await db();
        const query = `
                    SELECT 
                    O.OrderId
                    , O.UserId 
                    , O.CartId 
                    , O.OrderNumber AS id
                    , U.nombre AS customer
                    , U.mail AS email 
                    , O.CreatedAt AS date
                    , O.Status AS status
                    , O.Status AS statusText
                    , O.ShippingAmount AS shipping
                    , O.ShippingMethod AS method
                    , O.ShippingAddress AS address
                    , O.DiscountAmount AS discount
                    , O.Subtotal AS subtotal
                    , O.GrandTotal AS total
                    , O.TrackingNumber AS tracking
                    , O.CustomerNotes AS "references"
                    , O.AdminNotes AS comments
                    , O.PaymentMethod AS paymentMethod
                    , O.PaymentStatus AS paymentStatus
                    , O.PaymentTransactionId AS paymentId
                    , O.PaidAt AS paid
                    , O.EstimatedDeliveryDate
                    , (SELECT COUNT(*) FROM OrderItems WHERE OrderId = O.OrderId) AS items
                FROM Orders O 
                LEFT JOIN usuarios U 
                ON UserId = U.UserId_New ; `; 

    const [ results, fields ] = await conection.query(query);
    
    if(!results || results.length === 0){
        response.ok = false;
        response.message = 'No se encontraron pedidos.';
        response.data = null;
        return response;
    }

    response.ok = true;
    response.message = 'Pedidos obtenidos correctamente.';
    response.data = results;
    return response;
    }
    catch(ex)
    {
        response.ok = false;
        response.message = 'Error al obtener los pedidos ' + ex;
        response.data = null;
        return response;
    }finally{
        if(conection) await conection.end();
    }   
}

const getOrdersAdminByOrderIdModel = async (orderId) => {

    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener los pedidos.',
        data: null
    };

    let conection;

    try{
        conection = await db();
        const query = `
                    SELECT 
                    O.OrderId
                    , O.UserId 
                    , O.CartId 
                    , O.OrderNumber AS id
                    , U.nombre AS customer
                    , U.mail AS email 
                    , O.CreatedAt AS date
                    , O.Status AS status
                    , O.Status AS statusText
                    , O.ShippingAmount AS shipping
                    , O.ShippingMethod AS method
                    , O.ShippingAddress AS address
                    , O.DiscountAmount AS discount
                    , O.Subtotal AS subtotal
                    , O.GrandTotal AS total
                    , O.TrackingNumber AS tracking
                    , O.CustomerNotes AS "references"
                    , O.AdminNotes AS comments
                    , O.PaymentMethod AS paymentMethod
                    , O.PaymentStatus AS paymentStatus
                    , O.PaymentTransactionId AS paymentId
                    , O.PaidAt AS paid
                    , O.EstimatedDeliveryDate
                    , 0 AS items
                FROM Orders O 
                LEFT JOIN usuarios U 
                ON UserId = U.UserId_New ; 
                WHERE O.OrderId = ? ; `; 

    const [ results, fields ] = await conection.query(query, [orderId]);
    
    if(!results || results.length === 0){
        response.ok = false;
        response.message = 'No se encontraron pedidos.';
        response.data = null;
        return response;
    }

    response.ok = true;
    response.message = 'Pedidos obtenidos correctamente.';
    response.data = results;
    return response;
    }
    catch(ex)
    {
        response.ok = false;
        response.message = 'Error al obtener los pedidos ' + ex;
        response.data = null;
        return response;
    }finally{
        if(conection) await conection.end();
    }   
}

const getOrdersModel = async (idUser) => {

    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener los pedidos.',
        data: null
    };

    let conection;

    try{
        conection = await db();
        const query = `
        SELECT 
            O.OrderId,
            O.UserId,
            O.CartId,
            O.OrderNumber AS id,
            O.CreatedAt AS fecha,
            U.nombre AS cliente,
            U.mail AS email,
            U.celular AS telefono,
            (
                SELECT IFNULL(SUM(OI2.Quantity), 0)
                FROM OrderItems OI2
                WHERE OI2.OrderId = O.OrderId
            ) AS productos,

            O.GrandTotal AS total,
            O.Status AS estado,
            O.Status AS statusText,
            O.PaymentMethod AS metodoPago,
            O.ShippingAddress AS direccion,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'nombre', P.nombre,
                        'cantidad', OI.Quantity,
                        'precio', OI.Total
                    )
                )
                FROM OrderItems OI
                INNER JOIN productos P 
                    ON P.productoId = OI.ProductId
                WHERE OI.OrderId = O.OrderId
            ) AS productosDetalle,
            O.TrackingNumber AS tracking,
            O.EstimatedDeliveryDate AS fechaEntrega,
            0 AS calificacion
        FROM Orders O
        LEFT JOIN usuarios U 
            ON U.UserId_New = O.UserId
            WHERE O.UserId = ?; `; 

    const [ results, fields ] = await conection.query(query, [idUser]);
    
    if(!results || results.length === 0){
        response.ok = true;
        response.message = 'No se encontraron pedidos.';
        response.data = null;
        return response;
    }

    response.ok = true;
    response.message = 'Pedidos obtenidos correctamente.';
    response.data = results;
    return response;
    }
    catch(ex)
    {
        response.ok = false;
        response.message = 'Error al obtener los pedidos ' + ex;
        response.data = null;
        return response;
    }finally{
        if(conection) await conection.end();
    }
    
}

const GetOrderDetailByOrderId = async (orderId, shipping) => {
    let conection;

    const response = {
        ok: false,
        message: "Ocurrió un error al intentar obtener los detalles del pedido.",
        data: null
    };

    try {
        conection = await db();

        const query = `
            SELECT 
                O.OrderNumber AS orderNumber,
                U.nombre AS customerName,
                O.GrandTotal AS totalAmount,
                (SELECT logo_url FROM ecommerce_configuracion LIMIT 1) AS logoUrl,
                (SELECT nombre_tienda FROM ecommerce_configuracion LIMIT 1) AS storeName,
                O.CreatedAt AS orderDate,
                O.Status AS orderStatus,
                CONCAT(
                    COALESCE(U.nombre, ''),
                    ' ',
                    COALESCE(U.apellido, '')
                ) AS customerFullName,
                U.mail AS customerEmail,
                U.celular AS customerPhone,

                /* PRODUCTS COMO JSON */
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', OI.ProductName,
                        'details', '',
                        'quantity', OI.Quantity,
                        'unitPrice', OI.UnitPrice,
                        'subtotal', OI.Subtotal
                    )
                ) AS products,

                O.Subtotal AS subtotal,
                O.ShippingAmount AS shippingCost,
                NULL AS discountCode,
                O.DiscountAmount AS discount,
                O.GrandTotal AS totalAmount,
                O.PaymentMethod AS paymentMethod,
                NULL AS adminOrderLink,
                O.CustomerNotes AS customerNotes,
                JSON_OBJECT(
                    'helpCenter', '',
                    'tutorials', ''
                ) AS supportLinks,
                '' AS supportEmail,
                (SELECT direccion FROM ecommerce_configuracion LIMIT 1) AS storeAddress
            FROM Orders O
            INNER JOIN OrderItems OI ON OI.OrderId = O.OrderId
            LEFT JOIN usuarios U ON U.UserId_New = O.UserId
            WHERE O.OrderId = ?
            GROUP BY O.OrderId;
        `;

        const [results] = await conection.query(query, [orderId]);

        if (!results.length) {
            response.message = "Pedido no encontrado.";
            return response;
        }

        const order = results[0];

        const responseDetailOrder = {
            ...order,
            shippingAddress: `${shipping.street}, ${shipping.city}, ${shipping.state}, ${shipping.postalCode}, ${shipping.instructions}`
        };

        response.ok = true;
        response.message = "Detalles del pedido obtenidos correctamente.";
        response.data = responseDetailOrder;

        return response;

    } catch (error) {
        response.message += " " + error.message;
        return response;
    } finally {
        if (conection) await conection.end();
    }
};

const UpdateOrderStatusByOrderIdModel = async (orderId, status) => {
    let conection;
    const response = {
        ok: false,
        message: 'Ocurrió un error al actualizar el estado del pedido.',
        data: null
    }

    try {
        conection = await db();
        const query = `
            UPDATE Orders
            SET Status = ?
            WHERE OrderId = ?;
        `;
        
        const results = await conection.query(query, [status, orderId]);

        if(results.affectedRows === 0){
            response.ok = false;
            response.message = 'No se encontró el pedido para actualizar.';
            response.data = null;
            return response;
        }

        response.ok = true;
        response.message = 'Estado del pedido actualizado correctamente.';
        response.data = results;
        return response;
    }
    catch (ex) {
        response.ok = false;
        response.message += " " + ex.message;
        return response;
    }finally {
        if (conection) await conection.end();
    }
};

const GetOrderHistoryStatusByOrderIdModel = async (orderId, status) => {
    let conection;
    const response = {
        ok: false,
        message: 'Ocurrió un error al obtener el historial del estado del pedido.',
        data: null
    }

    try {
        conection = await db();
        const query = `
            SELECT 
                HistoryId
                , OrderId
                , Status
                , Notes
                , CreatedBy
                , CreatedAt
            FROM OrderStatusHistory 
            WHERE OrderId = ?
            AND Status = ?;    
        `;

        const [results] = await conection.query(query, [orderId, status]);
        response.ok = true;
        response.message = 'Historial del estado del pedido obtenido correctamente.';
        response.data = results;
        return response;
    }
    catch (ex) {
        response.ok = false;
        response.message += " " + ex.message;
        return response;
    }finally {
        if (conection) await conection.end();
    }
};

const SetOrderHistoryStatusByOrderIdModel = async (orderId, status, notes, createdBy = "system") => {
    let conection;
    const response = {
        ok: false,
        message: 'Ocurrió un error al actualizar el estado del pedido.',
        data: null
    }

    try {
        conection = await db();
        const query = `
            INSERT INTO OrderStatusHistory (
                OrderId
                , Status
                , Notes
                , CreatedBy
            ) VALUES (
            ?
            , ?
            , ?
            , ?);
        `;

        const [results] = await conection.query(query, [orderId, status, notes, createdBy]);
        response.ok = true;
        response.message = 'Estado del pedido actualizado correctamente.';
        response.data = results[0];
        return response;
    }
    catch (ex) {
        response.ok = false;
        response.message += " " + ex.message;
        return response;
    }finally {
        if (conection) await conection.end();
    }
};

export {
    grabarPedido,
    consultarPedido,
    consultarPedidos,
    createOrderModel,
    GetOrderDetailByOrderId,
    getOrdersAdminModel,
    getOrdersModel,
    getOrdersAdminByOrderIdModel,
    UpdateOrderStatusByOrderIdModel,
    GetOrderHistoryStatusByOrderIdModel, 
    SetOrderHistoryStatusByOrderIdModel
}

