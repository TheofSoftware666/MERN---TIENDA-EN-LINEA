import db from "../config/db.js";

const Productos = async (limit = "50") => {

    const conection = await db();

    const query = limit.length > 1 ? "LIMIT " + limit : "LIMIT 50";

    const [ results, fields ] = await conection.query(` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                                                        FROM productos PD
                                                        LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                                                        LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId WHERE PD.estatusProducto != false ${query}`);

    return results; 
};

const Producto = async (idProducto) => {
    
    const conection = await db();

    const query = ` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                    FROM productos PD
                    LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                    LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId WHERE productoId = ${idProducto} AND PD.estatusProducto != false`;

    const [ results, fields ] = await conection.query(query);

    return results;
}

const ProductosAdmin = async (limit = "50") => {

    const conection = await db();

    const query = limit.length > 1 ? "LIMIT " + limit : "LIMIT 50";

    const [ results, fields ] = await conection.query(` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                                                        FROM productos PD
                                                        LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                                                        LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId ${query}`);

    return results; 
};

const ProductoAdmin = async (idProducto) => {
    
    const conection = await db();

    const query = ` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.estatusProducto , PD.estatusPromo ,PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                    FROM productos PD
                    LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                    LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId WHERE productoId = ${idProducto}`;

    const [ results, fields ] = await conection.query(query);

    return results;
}

const subirProductoAdmin = async (data) => {
    
    const conection = await db();

    const query = ` INSERT INTO productos (nombre, descripcion, marcaId, categoriaId, stock, imagen1, imagen2, imagen3, imagen4, imagen5, estatusProducto, estatusPromo, promocion, monto, descuento1, descuento2, iva) 
                    VALUES ('${data.nombre}', '${data.descripcion}', ${data.MARCA}, ${data.CATEGORIA}, ${data.stock}, '${data.imagen1}', '${data.imagen2}', '${data.imagen3}', '${data.imagen4}', '${data.imagen5}', ${data.estatusProducto}, ${data.estatusPromo}, '${data.promocion}', ${data.monto}, ${data.descuento1}, ${data.descuento2}, ${data.iva});`;

    const [ results, fields ] = await conection.query(query);

    return results;
}

const comprobarExistencias = async (nombre) => {
    
    const conection = await db();

    const query = ` SELECT PD.productoId, PD.nombre, PD.descripcion, MC.nombre AS MARCA, CT.nombre AS CATEGORIA, PD.stock, PD.imagen1, PD.imagen2, PD.imagen3, PD.imagen4, PD.imagen5, PD.estatusProducto , PD.estatusPromo ,PD.promocion, PD.monto, PD.descuento1, PD.descuento2, PD.iva, PD.vendidos
                    FROM productos PD
                    LEFT JOIN marca MC ON MC.marcaId = PD.marcaId 
                    LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId WHERE PD.nombre = '${nombre}' OR PD.productoId = '${nombre}'`;

    const [ results, fields ] = await conection.query(query);

    return results;
}


const actualizarProductoAdmin = async (data) => {
    
    const conection = await db();

    const query = ` UPDATE productos SET nombre = '${data.nombre}', descripcion = '${data.descripcion}', marcaId = '${data.marcaId}', categoriaId = '${data.categoriaId}', 
    stock = '${data.stock}', imagen1 = '${data.imagen1}', imagen2 = '${data.imagen2}', imagen3 = '${data.imagen3}', imagen4 = '${data.imagen4}', imagen5 = '${data.imagen5}', 
    estatusProducto = ${data.estatusProducto}, estatusPromo = ${data.estatusPromo}, promocion = '${data.promocion}', monto = ${data.monto}, descuento1 = ${data.descuento1}, 
    descuento2 = ${data.descuento2}, iva = ${data.iva} 
    WHERE productoId = ${data.productoId}`;

    const [ results, fields ] = await conection.query(query);

    return results;
    
}


export { Productos, Producto, ProductosAdmin, ProductoAdmin, subirProductoAdmin, actualizarProductoAdmin, comprobarExistencias };