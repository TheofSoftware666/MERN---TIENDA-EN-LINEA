import db from "../config/db.js";

const Productos = async (limit = "50") => {

    const conection = await db();

    const query = limit.length > 1 ? "LIMIT " + limit : "LIMIT 50";

    const [ results, fields ] = await conection.query(` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                                                        FROM productos PD
                                                        LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                                                        LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId ${query}`);

    return results; 
};

const Producto = async (idProducto) => {
    
    const conection = await db();

    const query = ` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                    FROM productos PD
                    LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                    LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId WHERE productoId = ${idProducto}`;

    const [ results, fields ] = await conection.query(query);

    return results;
    
}


export { Productos, Producto };