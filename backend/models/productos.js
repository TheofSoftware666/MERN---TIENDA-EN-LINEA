import db from "../config/db.js";
import mysql from "mysql2/promise";

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
    const query = `CALL SP_GetProductDetalleJSON(${idProducto})`;
    const [results, fields] = await conection.query(query);

    // Extraer el JSON de la primera fila
    const rawJson = results[0][0]?.ProductoDetalle;
    
    if (!rawJson || rawJson === "{}") {
        return null; // o lanzar un error controlado
    }

    // Parsear a objeto JS
    const producto = JSON.parse(rawJson);

    return producto;
}

const ProductosAdmin = async (limit = 50) => {
  const conection = await db();

  // Validar y asegurar que el límite sea seguro
  const parsedLimit = parseInt(limit);
  const safeLimit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 50;

  const [results] = await conection.query(
    `
    SELECT 
    P.productoId AS productoid,
    P.nombre AS name,
    P.descripcion AS description,
    P.categoriaId AS categoryId,
    CT.nombre AS categotyName,
    P.marcaId AS brandId,
    MC.nombre AS brandName,
    P.monto AS price,
    P.stock AS stock,
    P.descuento1 AS discount,
    P.estatusProducto AS active,
    P.sku AS sku,
    P.vendidos AS sales,
    -- Etiquetas
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'idTag', PE.ProductoEtiquetaId,
                'idProduct', PE.ProductoId,
                'name', PE.Etiqueta
            )
        )
        FROM productoetiquetas PE
        WHERE PE.ProductoId = P.productoId
    ) AS Tags,

    -- Imágenes
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'idImage', PI.ImagenId,
                'url', PI.URL,
                'order', PI.Orden
            )
        )
        FROM productoimagenes PI
        WHERE PI.ProductoId = P.productoId
    ) AS Images
    FROM productos P
    LEFT JOIN marca MC ON MC.marcaId = P.marcaId
    LEFT JOIN categoria CT ON CT.categoriaId = P.categoriaId
    LIMIT ?;
    `,
    [safeLimit]
  );

  return results;
};

const ProductoAdmin = async (idProducto) => {
  const conexion = await db();

  try {
    const query = `CALL SP_GetProductAdmin(?);`;
    const [results] = await conexion.query(query, [idProducto]);

    if (!results || !results[0] || !results[0][0]) {
      console.warn(`⚠️ No se recibió resultado del SP para producto ID: ${idProducto}`);
      return null;
    }

    const { ProductoDetalle } = results[0][0];

    if (!ProductoDetalle || ProductoDetalle.trim() === '{}' || ProductoDetalle.trim() === '') {
      console.warn(`⚠️ ProductoDetalle vacío para ID: ${idProducto}`);
      return null;
    }

    try {
      const producto = JSON.parse(ProductoDetalle);
      return producto;
    } catch (parseError) {
      console.error("❌ Error al parsear ProductoDetalle:", parseError);
      console.debug("JSON recibido:", ProductoDetalle);
      return null;
    }

  } catch (error) {
    console.error("❌ Error en ProductoAdmin:", error);
    throw new Error("Error al obtener detalle del producto desde la base de datos.");

  } finally {
    await conexion.end();
  }
};

const SetAddProductAdmin = async (
  name,
  description,
  sku,
  price,
  stock,
  discount,
  category,
  brand,
  active,
  length,
  width,
  height,
  weight,
  tags,
  faqs,
  images
) => {
  const conexion = await db();

  try {
    const query = `
      CALL SP_AgregarProducto(
        ${mysql.escape(name)},
        ${mysql.escape(description)},
        ${mysql.escape(price)},
        ${mysql.escape(stock)},
        ${mysql.escape(discount)},
        ${mysql.escape(category)},
        ${mysql.escape(brand)},
        ${mysql.escape(sku)},
        ${mysql.escape(active ? 1 : 0)},
        ${mysql.escape(length)},
        ${mysql.escape(width)},
        ${mysql.escape(height)},
        ${mysql.escape(weight)},
        ${mysql.escape(JSON.stringify(tags || []))},
        ${mysql.escape(JSON.stringify(faqs || []))},
        ${mysql.escape(JSON.stringify(images || []))},
        @pStatus,
        @pMensaje,
        @pProductoID
      );
    `;
    
    const [results] = await conexion.query(query);
    return results;

  } catch (error) {
    console.error("Error al ejecutar SP_AgregarProducto:", error);
    return {
      success: false,
      message: error.sqlMessage || error.message,
    };
  } finally {
    await conexion.end();
  }
};

const comprobarExistencias = async (nombre, sku) => {
    
    const conection = await db();

    const query = ` SELECT 
                        PD.productoId, 
                        PD.nombre, 
                        PD.descripcion, 
                        MC.nombre AS MARCA, 
                        CT.nombre AS CATEGORIA, 
                        PD.stock, 
                        PD.estatusProducto , 
                        PD.estatusPromo ,
                        PD.promocion, 
                        PD.monto, 
                        PD.descuento1, 
                        PD.descuento2, 
                        PD.vendidos
                    FROM productos PD
                    LEFT JOIN marca MC 
                    ON MC.marcaId = PD.marcaId 
                    LEFT JOIN categoria CT 
                    ON CT.categoriaId = PD.categoriaId 
                    WHERE PD.nombre = '${nombre}' 
                    OR PD.productoId = '${nombre}'
                    OR PD.SKU = '${sku}'`;

    const [ results, fields ] = await conection.query(query);

    return results;
}

const comprobarExistenciasFiles = async (imagen) => {
    
    const conection = await db();

    const query = ` SELECT productoId, URL
                    FROM productoimagenes 
                    WHERE URL LIKE '%${imagen}%'`;

    const [ results, fields ] = await conection.query(query);

    return results;
}

const SetUpdateProductAdmin = async (data) => {
  const conexion = await db();
  console.log("Actualizando producto...");
  console.log(data);
  try {
    const query = `
      CALL SP_ActualizarProducto(
        ${mysql.escape(data.id)},
        ${mysql.escape(data.name)},
        ${mysql.escape(data.description)},
        ${mysql.escape(data.price)},
        ${mysql.escape(data.stock)},
        ${mysql.escape(data.discount)},
        ${mysql.escape(data.category)},
        ${mysql.escape(data.brand)},
        ${mysql.escape(data.sku)},
        ${mysql.escape(data.active ? 1 : 0)},
        ${mysql.escape(data.large)},
        ${mysql.escape(data.width)},
        ${mysql.escape(data.height)},
        ${mysql.escape(data.weight)},
        ${mysql.escape(JSON.stringify(data.tags || []))},
        ${mysql.escape(JSON.stringify(data.faqs || []))},
        ${mysql.escape(JSON.stringify(data.images || []))},
        @pStatus,
        @pMensaje
      );
    `;

    const [results] = await conexion.query(query);
    return { success: true, message: "Producto actualizado exitosamente." };

  } catch (error) {
    console.error("Error en SetUpdateProductAdmin:", error);
    return { success: false, message: error.sqlMessage || error.message };
  } finally {
    await conexion.end();
  }
};

export { Productos
  , Producto
  , ProductosAdmin
  , ProductoAdmin
  , SetAddProductAdmin
  , comprobarExistencias
  , comprobarExistenciasFiles
  , SetUpdateProductAdmin
 };