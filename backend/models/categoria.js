import db from "../config/db.js";

const categoria = async (id) => {

    const conexion = await db();

    const query = `SELECT * FROM categoria WHERE categoriaId = ${id}`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const categoriaNombre = async (id) => {

    const conexion = await db();

    const query = `SELECT * FROM categoria WHERE nombre = '${id}'`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const categorias = async (limit) => {

    const conexion = await db();

    if(typeof limit != 'number'){

        return "No es un numero";
    }
    
    const limite = limit > 0 ? limit : 50;         

    const query = `SELECT * FROM categoria LIMIT ${limite}`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const adicionarCategoria = async (nombre) => {

    const conexion = await db();

    const query = `INSERT INTO categoria (nombre) VALUES ('${nombre}');`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

const actualizarCategoria = async (id, nombre) => {

    const conexion = await db();

    const query = `UPDATE categoria SET nombre = '${nombre.toUpperCase()}' WHERE categoriaId = ${id}`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

export { categoria, categorias, adicionarCategoria, actualizarCategoria, categoriaNombre };