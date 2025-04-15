import db from "../config/db.js";

const marca = async (id) => {

    const conexion = await db();

    const query = `SELECT * FROM marca WHERE marcaId = ${id}`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const marcaNombre = async (id) => {

    const conexion = await db();

    const query = `SELECT * FROM marca WHERE nombre = '${id}'`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const marcas = async (limit) => {

    const conexion = await db();

    if(typeof limit != 'number'){

        return "No es un numero";
    }
    
    const limite = limit > 0 ? limit : 50;         

    const query = `SELECT * FROM marca LIMIT ${limite}`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const adicionarMarca = async (nombre) => {

    const conexion = await db();

    const query = `INSERT INTO marca (nombre) VALUES ('${nombre}');`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

const actualizarMarca = async (id, nombre) => {

    const conexion = await db();

    const query = `UPDATE marca SET nombre = '${nombre.toUpperCase()}' WHERE marcaId = ${id}`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

export { marca, marcas, adicionarMarca, actualizarMarca, marcaNombre };