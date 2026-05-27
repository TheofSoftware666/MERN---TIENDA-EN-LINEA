import db from '../config/db.js';

const consultarComentarios = async (productoID, limit = 5) => {

    const conection = await db();

    const query = `
            SELECT * FROM comentarios WHERE productoID = ${productoID}
    `;

    const [results, fields] = await conection.query(query);

    return results;
}

const insertarComentario = async (usuarioID, productoID) => {
    
    const conection = await db();

    const query = `
            INSERT INTO comentarios () VALUES ();
    `;

    const [results, fields] = await conection.query(query);

    return results;
}


export { consultarComentarios, insertarComentario } 