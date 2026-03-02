import { response } from 'express';
import db from '../config/db.js';

const consultarDevolucion = async (idUsuario, idDevolucion) => {

    const conection = await db();

    const query = `
        SELECT 
            DV.DevolucionID
            , DV.PedidoID
            , US.nombre
            , PR.nombre
            , DV.Cantidad
            , DV.Motivo
            , DV.Estado
            , DV.MetodoResolucion
            , DV.FechaSolicitud
            , DV.FechaResolucion
            , DV.Observaciones
            , DV.MontoReembolso
        FROM Devouciones DV
        LEFT JOIN productos PR 
        ON DV.ProductoID = PR.productoId
        LEFT JOIN usuarios US
        ON DV.UsuarioID = US.usuarioId
        WHERE DV.UsuarioID = ${idUsuario}
        AND DV.DevolucionID = ${idDevolucion}
    `;

    const [ results, fields] = await conection.query(query);

    return results;
}

const getReturnsByUserIdModel = async (idUsuario) => {
  const response = {
    ok: false,
    code: 500,
    message: 'Unexpected error while fetching returns.',
    results: null
  };

  let connection;
  
  try{

    connection = await db();

    const query = `
      SELECT 
		    R.return_id AS id
        , R.order_id  AS pedidoId
        , R.created_date AS fecha
        , R.request_date AS fechaSolicitud
        , ifnull(U.nombre, 'NA') AS cliente
        , U.mail AS email
        , U.celular AS telefono
        , R.total_items AS productos
        , R.total_amount AS montoTotal
        , R.refund_amount AS montoReembolso
        , R.status AS estado
        , R.reason AS motivo
        , R.reason_detail AS motivoDetalle
        , R.refund_method AS metodoReembolso
        , JSON_ARRAYAGG(
			JSON_OBJECT(
        'product_id', RI.product_id,
				'nombre', RI.product_name,
				'cantidad', RI.quantity,
				'precio', RI.unit_price,
				'motivo', RI.reason,
				'estatusProducto', RI.item_status
			)
		) AS productosDetalle
        , R.return_tracking_number AS trackingDevolucion
        , R.replacement_tracking_number AS trackingReemplazo
        , R.estimated_refund_date AS fechaEstimadaReembolso
        , R.refund_date AS fechaReembolso
        , R.return_center AS centroDevolucion
        , R.instructions AS instrucciones
        , R.shipping_label_url AS etiquetaEnvio
        , R.return_invoice_url AS facturaDevolucion
      FROM returns R
	  INNER JOIN Orders AS O
	  ON R.order_id = O.OrderId
      INNER JOIN return_items AS RI
      ON RI.return_id = R.return_id
	  LEFT JOIN usuarios AS U 
      ON O.UserId = U.UserId_New
      WHERE O.UserId = ?
	  Group By R.return_id;
    `;

    const [ results, fields] = await connection.query(query, [idUsuario]);

    response.ok = results.length > 0 ? true : false;
    response.code = results.length > 0 ? 200 : 404;
    response.message = results.length > 0 ? 'Returns fetched successfully.' : 'No returns found for this user.';
    response.results = results;
    return response;

    }catch(error){
      response.ok = false;
      response.code = 500;
      response.message = "Error inesperado al intentar obtener las devoluciones. " + error.message;
      response.results = null;
      return response;
    }finally{
        if (connection) await connection.end();
    }
}

const getReturnsAdminModel = async () => {
  const response = {
    ok: false,
    code: 500,
    message: 'Unexpected error while fetching returns.',
    results: null
  };

  let connection;
  
  try{

    connection = await db();

    const query = `
       SELECT 
		    R.return_id AS id
        , R.order_id  AS pedidoId
        , R.created_date AS fecha
        , R.request_date AS fechaSolicitud
        , ifnull(U.nombre, 'NA') AS cliente
        , U.mail AS email
        , U.celular AS telefono
        , R.total_items AS productos
        , R.total_amount AS montoTotal
        , R.refund_amount AS montoReembolso
        , R.status AS estado
        , R.reason AS motivo
        , R.reason_detail AS motivoDetalle
        , R.refund_method AS metodoReembolso
        , JSON_ARRAYAGG(
			JSON_OBJECT(
        'product_id', RI.product_id,
				'nombre', RI.product_name,
				'cantidad', RI.quantity,
				'precio', RI.unit_price,
				'motivo', RI.reason,
				'estatusProducto', RI.item_status
			)
		) AS productosDetalle
        , R.return_tracking_number AS trackingDevolucion
        , R.replacement_tracking_number AS trackingReemplazo
        , R.estimated_refund_date AS fechaEstimadaReembolso
        , R.refund_date AS fechaReembolso
        , R.return_center AS centroDevolucion
        , R.instructions AS instrucciones
        , R.shipping_label_url AS etiquetaEnvio
        , R.return_invoice_url AS facturaDevolucion
      FROM returns R
	  INNER JOIN Orders AS O
	  ON R.order_id = O.OrderId
      INNER JOIN return_items AS RI
      ON RI.return_id = R.return_id
	  LEFT JOIN usuarios AS U 
      ON O.UserId = U.UserId_New
	  Group By R.return_id;
    `;

    const [ results, fields] = await connection.query(query);

    response.ok = results.length > 0 ? true : false;
    response.code = results.length > 0 ? 200 : 404;
    response.message = results.length > 0 ? 'Returns fetched successfully.' : 'No returns found for this user.';
    response.results = results;
    return response;

    }catch(error){
      response.ok = false;
      response.code = 500;
      response.message = "Error inesperado al intentar obtener las devoluciones. " + error.message;
      response.results = null;
      return response;
    }finally{
        if (connection) await connection.end();
    }
}

const setReturnModel = async (data) => {

  const response = {
    ok: false,
    code: 500,
    message: 'Unexpected error while creating return request.',
    results: null
  };

  let connection;

  try {
    connection = await db();

    const storedProcedureReturn = `
      CALL sp_create_return(?, ?, ?, ?, ?);
    `;

    console.log("OrderId: ", data.order_id);
    console.log("Refund Method: ", data.refund_method);
    console.log("Reason: ", data.reason);
    console.log("Reason Detail: ", data.reason_detail);
    console.log("Items: ", data.items ? JSON.stringify(data.items) : null);

    const [results] = await connection.query(storedProcedureReturn, [
      data.order_id,
      data.refund_method,
      data.reason,
      data.reason_detail,
      data.items ? JSON.stringify(data.items) : null
    ]);

    if (results.length === 0) {
      response.message += ' No response from stored procedure.';
      return response;
    }

    response.ok = results[0].length > 0 ? true : false;
    response.code = results[0].length > 0 ? 201 : 400;
    response.message = 'Return request created successfully.';
    response.results = {
      return_id: results[0]
    };

    return response;
  } catch (error) {
    response.ok = false;
    response.code = 500;
    response.message = error.message;
    response.results = null;

    return response;
  } finally {
    if (connection) await connection.end();
  }
};

const GetOrdersDeliveredByUserIdModel = async (idUser) => {
  const response = {
    ok: false,
    code: 500,
    message: 'Unexpected error while fetching delivered orders.',
    results: null
  }  
  let conection;

    try {
      conection = await db();

      const query = `
        SELECT 
          O.OrderId
            , OrderNumber 
            , O.CreatedAt AS Fecha
            , O.GrandTotal AS Total
            , (SELECT COUNT(*) FROM OrderItems WHERE OrderId = O.OrderId) AS Productos
            , DATE_ADD(O.CreatedAt, INTERVAL 1 MONTH) AS EligibleHasta
            , JSON_ARRAYAGG(
                JSON_OBJECT(
                    'ProductId', OI.ProductId,
                    'ProductName', OI.ProductName,
                    'Quantity', OI.Quantity,
                    'UnitPrice', OI.UnitPrice,
                    'LineTotal', OI.Total
                )
            ) AS Items
        FROM Orders O
        INNER JOIN OrderItems OI
        ON O.OrderId = OI.OrderId
        WHERE O.UserId = ?
        AND Status = 'delivered'
        GROUP BY 
            O.OrderId,
            O.CreatedAt,
            O.GrandTotal;
      `;

      const [ results, fields] = await conection.query(query, [idUser]);

      response.ok = results.length > 0 ? true : false;
      response.code = results.length > 0 ? 200 : 404;
      response.message = results.length > 0 ? 'Delivered orders fetched successfully.' : 'No delivered orders found.';
      response.results = results;
      return response;
    }catch (error) {
      response.ok = false;
      response.code = 400;
      response.message = error.message;
      response.results = null;
      return response;
    }finally {
        if (conection) await conection.end();
    }
}

export { consultarDevolucion
  , getReturnsByUserIdModel
  , setReturnModel
  , GetOrdersDeliveredByUserIdModel
  , getReturnsAdminModel
}
