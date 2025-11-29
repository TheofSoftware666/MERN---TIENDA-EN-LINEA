import db from "../config/db.js";
import mysql from "mysql2/promise";

const BuscarProductos = async (filters = {}) => {
  const connection = await db();

  try {
    let sql = `
        SELECT 
          PD.productoId AS id,
          PD.nombre AS Name,
          PD.descripcion AS Description,
          MC.nombre AS Brand,
          CT.nombre AS Categorie,
          PD.stock,
          PD.monto AS Price,
          PD.descuento1 AS Discount,
          PD.vendidos AS Sell,
          PD.SKU AS SKU,

          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT('name', PE2.Etiqueta))
            FROM productoetiquetas PE2
            WHERE PE2.ProductoId = PD.productoId
          ) AS KeyWords,

          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT('url', PI2.URL, 'orden', PI2.Orden))
            FROM productoimagenes PI2
            WHERE PI2.ProductoId = PD.productoId
            ORDER BY PI2.Orden
          ) AS Images

        FROM productos PD
        LEFT JOIN marca MC ON MC.marcaId = PD.marcaId
        LEFT JOIN categoria CT ON CT.categoriaId = PD.categoriaId
        WHERE PD.estatusProducto = 1
          AND PD.monto > 0
      `;

    const params = [];

    if (filters.keywords) {
      sql += `
        AND (
          PD.nombre LIKE ?
          OR PD.descripcion LIKE ?
          OR EXISTS (
              SELECT 1
              FROM productoetiquetas PE
              WHERE PE.ProductoId = PD.productoId
                AND PE.Etiqueta LIKE ?
          )
        )
      `;
      params.push(`%${filters.keywords}%`);
      params.push(`%${filters.keywords}%`);
      params.push(`%${filters.keywords}%`);
    }

    // ✅ categorías
    if (filters.categories?.length > 0) {
      sql += ` AND PD.categoriaId IN (${filters.categories.map(() => '?').join(',')})`;
      params.push(...filters.categories);
    }

    // ✅ marcas
    if (filters.brands?.length > 0) {
      sql += ` AND PD.marcaId IN (${filters.brands.map(() => '?').join(',')})`;
      params.push(...filters.brands);
    }

    // ✅ precio
    if (filters.priceMin) {
      sql += ` AND PD.monto >= ?`;
      params.push(filters.priceMin);
    }

    if (filters.priceMax) {
      sql += ` AND PD.monto <= ?`;
      params.push(filters.priceMax);
    }

    sql += "GROUP BY PD.productoId";
    // ✅ ordenamiento
    switch (filters.order) {
      case "price_asc":
        sql += ` ORDER BY PD.monto ASC`;
        break;
      case "price_desc":
        sql += ` ORDER BY PD.monto DESC`;
        break;
      case "popular":
        sql += ` ORDER BY PD.vendidos DESC`;
        break;
      default:
        sql += ` ORDER BY PD.productoId DESC`;
        break;
    }
    sql += ` LIMIT ?`;
    params.push(filters.limit || 50);
    const [results] = await connection.query(sql, params);
    return results;

  } finally {
    if (connection.end) await connection.end();
  }
};

const Producto = async (idProducto) => {
    const con = await db();

    try {
        const [results] = await con.query(
            "CALL SP_GetProductDetalleJSON(?)",
            [idProducto]
        );
        
        const rawJson = results[0][0]?.ProductoDetalle;

        if (!rawJson || rawJson === "{}") {
            return null;
        }
        
        const producto = typeof rawJson == "string" ? JSON.parse(rawJson) : rawJson;
        return producto;

    } catch (error) {
        console.error("Error obteniendo producto:", error);
        throw new Error("No se pudo obtener el producto");
    } finally {
        if (con) await con.end();
    }
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

export { BuscarProductos
  , Producto
  , ProductosAdmin
  , ProductoAdmin
  , SetAddProductAdmin
  , comprobarExistencias
  , comprobarExistenciasFiles
  , SetUpdateProductAdmin
 };