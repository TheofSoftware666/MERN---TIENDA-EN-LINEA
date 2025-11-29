import db from "../config/db.js";

const categoria = async (id) => {

    const conexion = await db();

    const query = `SELECT * FROM categoria WHERE categoriaId = ${id}`;

    const [ results , fields] = await conexion.query(query);

    return results;
}

const SearchCategoryByName = async (nameCategory, image) => {
  const conexion = await db();

  try {
    const query = `
      SELECT 1 
      FROM categoria 
      WHERE nombre = ? OR imagen = ?
      LIMIT 1
    `;
    
    const [results] = await conexion.query(query, [nameCategory, image]);

    // Devuelve true si existe al menos un resultado
    return results.length > 0;
  } catch (error) {
    console.error('Error al buscar la categoría:', error);
    throw error;
  } finally {
    await conexion.end(); // Cierra la conexión si no usas pool
  }
};

const categorias = async (limit) => {
    const conexion = await db();
    if (typeof limit !== "number" || Number.isNaN(limit)) {
        return "No es un numero";
    }

    const limite = limit > 0 ? limit : 50;
    const query = "SELECT * FROM categoria LIMIT ?";

    const [results] = await conexion.query(query, [limite]);
    return results;
};

const CreateCategoryModel = async (nombre, imagen) => {
  const conexion = await db();

  try {
    const query = `
      INSERT INTO categoria (nombre, imagen)
      VALUES (?, ?)
    `;

    const [result] = await conexion.query(query, [nombre, imagen]);

    return {
      success: true,
      message: 'Categoría creada correctamente',
      data: {
        insertId: result.insertId,
        affectedRows: result.affectedRows,
      },
    };
  } catch (error) {

    return {
      success: false,
      message: 'Error al crear la categoría',
      sqlMessage: error.sqlMessage || error.message,
      code: error.code || null,
    };
  } finally {
    await conexion.end(); 
  }
};

const actualizarCategoria = async (id, nombre) => {

    const conexion = await db();

    const query = `UPDATE categoria SET nombre = '${nombre.toUpperCase()}' WHERE categoriaId = ${id}`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

export { categoria, categorias, CreateCategoryModel, actualizarCategoria, SearchCategoryByName };