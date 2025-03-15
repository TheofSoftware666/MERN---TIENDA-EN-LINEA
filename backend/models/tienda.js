import db from '../config/db.js'
import mysql from 'mysql2/promise';

const informacionTienda = async () => {

    try{

    // Establecemos conexion
    const connection = await db();

    //obtener informacion de la tienda
    const [ results, fields] = await connection.query("SELECT * FROM tienda");

    // Devolver la informacion de la tienda
    return results;
        
    }catch(e){
        console.log(e);
    }

}

export { informacionTienda }