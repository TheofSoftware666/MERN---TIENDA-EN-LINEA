import db from "../config/db.js";

const comprobarUsuario = async (usuarioID) => {

    const conection = await db();

    // ! Crear campo en la tabla de usuarios para comprobar que sea el admin
    const query = `
        SELECT * FROM usuarios WHERE usuarioId = ${usuarioID} AND 
    `;

    const [results, fields ] = await conection.query(query);

    return results;
}

export { comprobarUsuario }
