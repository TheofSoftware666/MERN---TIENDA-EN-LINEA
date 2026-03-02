import { response } from 'express';
import db from '../config/db.js';

const checkPreviousPaymentModel = async (usuarioId) => {
    let conexion;
    const response = {
        ok: false,
        message: 'Ocurrio un error inesperado al procesar el pago. ',
        data: null
    }
    try{
        conexion = await db();
        const query = "CALL SP_CheckCartStock(?)";
        const [results] = await conexion.execute(query, [usuarioId]);

        response.data = results[0][0] || [];
        response.ok = true;
        response.message = 'Success'
        return response;
    }catch(ex){
        console.log("Error inesperado: " + ex);
        response.ok = false;
        response.message = ex;
        response.data = {};
        return response;
    }finally{
        if(conexion) conexion.end();
    }
};

const ProcessPaymentModel = async (idOrder, paymentMethod, typePaymentGateway, idTransaction, amount, currency, gatewayResponse, metaData) => {
    let conn;
    const response = {
        ok: false,
        message: 'Ocurrio un error inesperado al procesar el pago. ',
        data: null
    }

    try{
        conn = await db();
        const query = "CALL SP_ProcessPayment(?, ?, ?, ?, ?, ?, ?, ?);";
        const [results] = await conn.execute(query, [idOrder, paymentMethod, typePaymentGateway, idTransaction, amount, currency, JSON.stringify(gatewayResponse), JSON.stringify(metaData)]);

        response.ok = true;
        response.message = 'Pago registrado correctamente. ';
        response.data = results[0][0] || [];
        return response;
    }catch(ex){
        response.ok = false;
        response.message = 'Error:  ' + ex;
        console.log(response.message);
        response.data = [];
        return response;
    }
}

export { checkPreviousPaymentModel, ProcessPaymentModel };