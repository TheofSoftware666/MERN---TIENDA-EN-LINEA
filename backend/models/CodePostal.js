import db from '../config/db.js'
import mysql from 'mysql2/promise';

const GetCodePostalModel = async (cp) => {

    try{
    // Establecemos conexion
    const connection = await db();

    //obtener informacion de la tienda
    //const [ results, fields] = await connection.query(`SELECT * FROM codigos_postales WHERE d_codigo LIKE '%${cp}%' LIMIT 10`);
    const [ results, fields] = await connection.query(`
        SELECT 
            d_codigo AS codigo_postal,
            d_estado AS estado,
            D_mnpio AS municipio,
            GROUP_CONCAT(DISTINCT d_asenta ORDER BY d_asenta SEPARATOR ', ') AS colonias
        FROM codigos_postales
        WHERE d_codigo LIKE '${cp}%'
        GROUP BY d_codigo, d_estado, D_mnpio;
        `);

    // Devolver la informacion de la tienda
    return results;
        
    }catch(e){
        console.log(e);
    }
}

const ValidateCodePostalModel = async (cp) => {

    try{
    // Establecemos conexion
    const connection = await db();

    //obtener informacion de la tienda
    const [ results, fields] = await connection.query("SELECT TOP 1 * FROM codigos_postales WHERE d_codigo = '%${cp}%'");

    // Devolver la informacion de la tienda
    return results;
        
    }catch(e){
        console.log(e);
    }
}

export { GetCodePostalModel , ValidateCodePostalModel }