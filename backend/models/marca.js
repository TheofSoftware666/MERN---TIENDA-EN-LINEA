import db from "../config/db.js";

const marca = async (id) => {

    const conexion = await db();

    const query = `SELECT * FROM marca WHERE marcaId = ${id}`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const SearchBrandByName = async (nameBrand) => {
  let conexion;
  try 
  {
    conexion = await db();
    const query = `SELECT * FROM marca WHERE nombre = ?`;
    const [results] = await conexion.query(query, [nameBrand]);

    return results.length > 0;
  } catch (e)
  {
    console.error("Error al buscar marca por nombre:", e);
    return false; 
  } finally {
    if (conexion) await conexion.end();
  }
};


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

const createBrandModel = async (nombre) => {
  let conexion;
  try {
    conexion = await db();

    const query = `INSERT INTO marca (nombre) VALUES (?)`;
    const [results] = await conexion.query(query, [nombre]);

    return results.insertId; 
  } catch (e) {
    console.error("Error al crear la marca:", e);
    throw e;
  } finally {
    if (conexion) await conexion.end();
  }
};

const actualizarMarca = async (id, nombre) => {

    const conexion = await db();

    const query = `UPDATE marca SET nombre = '${nombre.toUpperCase()}' WHERE marcaId = ${id}`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

export { marca, marcas, createBrandModel, actualizarMarca, SearchBrandByName };