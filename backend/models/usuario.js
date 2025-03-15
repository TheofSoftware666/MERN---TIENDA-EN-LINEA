import db from "../config/db.js";

const existeUsuario = async (usuario) => {

    // Establece conexion con DB
    const conexion = await db();

    const query = `SELECT mail FROM usuarios WHERE mail = '${usuario}'`;

    const  [ results, fields ] = await conexion.query(query);

    return results;

}

const consultarUsuario = async (usuario) => {
      
    // Establece conexion con DB
    const conexion = await db();

    // Query
    const query = `SELECT mail, pass FROM usuarios WHERE mail = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
};



export { existeUsuario, consultarUsuario };