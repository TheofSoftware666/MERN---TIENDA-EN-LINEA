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


const actualizarTienda = async (idTienda, datos) => {

    try{
    // Establecemos conexion
    const connection = await db();

    //obtener informacion de la tienda
    const [ results, fields] = await connection.query(`UPDATE tienda SET name = '${datos.name}', RFC = '${datos.RFC}', telefono = '${datos.telefono}', logo = '${datos.logo}', mail = '${datos.mail}'  WHERE tiendaID = '${idTienda}' `);

    // Devolver la informacion de la tienda
    return results;
        
    }catch(e){
        console.log(e);
    }

}

export { informacionTienda, actualizarTienda }