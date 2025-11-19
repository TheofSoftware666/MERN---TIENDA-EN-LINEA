import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs/promises';
import { Productos
  , Producto
  , ProductoAdmin
  , ProductosAdmin
  , SetAddProductAdmin
  , comprobarExistencias
  , comprobarExistenciasFiles
  , SetUpdateProductAdmin 
} from "../models/productos.js";

const obtenerProductos = async (req, res) => {

    try {
    //Consultar Productos
    const productos = await Productos();
    return res.status(200).json({ productos});

    }catch(e){
        console.log(e);

        const error = new Error("Error al consultar los productos");
        return res.status(404).json({ msg : error });
    }
}

const obtenerProducto = async (req, res) => {
   try {
    const idProducto = parseInt(req.params.id?.trim());

    if (!idProducto || isNaN(Number(idProducto))) {
      return res.status(400).json({
        status: "ERROR",
        message: "El ID de producto es inválido"
      });
    }

    const producto = await Producto(idProducto);

    if (!producto) {
      return res.status(404).json({
        status: "ERROR",
        message: `No se encontró el producto con ID ${idProducto}`
      });
    }

    return res.status(200).json({
      status: "OK",
      data: producto
    });

  } catch (e) {
    console.error("❌ Error al obtener producto:", e);
    return res.status(500).json({
      status: "ERROR",
      message: "Error interno del servidor"
    });
  }
}

const obtenerProductosAdmin = async (req, res) => {
    try {
        const limit = req.params.limit?.trim();

        if (!limit || limit === "" || isNaN(Number(limit)) || Number(limit) <= 0) {
            const error = new Error("Es necesario especificar un límite válido de productos (número mayor a 0)");
            return res.status(400).json({ msg: error.message });
        }

        const productos = await ProductosAdmin(limit);

        if (!productos || productos.length === 0) {
            const error = new Error("No se encontraron los productos. ");
            return res.status(404).json({ error: error.message });
        }

        return res.status(200).json({ productos: productos });

    } catch (e) {
        console.error("Error en obtenerProductosAdmin:", e);
        const error = new Error("Ocurrió un error inesperado: " + e.message);
        return res.status(500).json({ error: error.message });
    }
};

const obtenerProductoAdmin = async (req, res) => {
  try {
    const idProducto = req.params?.id?.trim();

    if (!idProducto || isNaN(Number(idProducto))) {
      return res.status(400).json({
        status: "ERROR",
        message: "El ID de producto es inválido"
      });
    }

    const producto = await ProductoAdmin(idProducto);

    if (!producto) {
      return res.status(404).json({
        status: "ERROR",
        message: `No se encontró el producto con ID ${idProducto}`
      });
    }

    return res.status(200).json({
      producto: producto
    });

  } catch (e) {
    console.error("❌ Error al obtener producto:", e);
    return res.status(500).json({
      status: "ERROR",
      message: "Error interno del servidor"
    });
  }
};

const registrarProducto = async (req, res) => {
    try{
        if(!req.body){
            const error = new Error("EL campo de nombre del producto esta vacio. ");
            return res.status(404).json({ error : error.message });
        }

        if(!req.files){
            const error = new Error("Es necesario agregar imagenes para la visualizacion del producto. ");
            return res.status(404).json({ error : error.message });
        }

        if(req.files.length <= 3){
            const error = new Error("Minimo debes de agregar 4 imagenes para aumentar la probabilidad de confianza a tus clientes. ");
            return res.status(404).json({ error : error.message });
        }

        let {id,
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
        } = req.body;
        const files = req.files;
        console.log(req.body);

        if(name === '' || name.length <= 4){
            const error = new Error("EL campo de nombre del producto esta vacio. ");
            return res.status(404).json({ error : error.message });
        }

        if(description === '' || description.length <= 49){
            const error = new Error("EL campo de descripcion del producto esta vacio o no hay lo minimo de 50 caracteres. ");
            return res.status(404).json({ error : error.message });
        }

        if(sku === '' || sku.length <= 4){
            const error = new Error("EL campo sku es requerido. ");
            return res.status(404).json({ error : error.message });
        }

        if(sku.includes(' ')){
            const error = new Error("El campo sku contiene espacios, lo cual es invalido. ");
            return res.status(404).json({ error : error.message });
        }

        category  = parseInt(category);
        brand  = parseInt(brand);

        if((isNaN(category) || isNaN(brand)) && (category <= 0 || brand <= 0)){
            const error = new Error("Es necesario seleccionar una categoria y una marca valida. ");
            return res.status(404).json({ error : error.message });
        }

        // Validaciones
        price = parseFloat(price).toFixed(2);
        stock  = parseInt(stock);
        discount = parseFloat(discount).toFixed(2);
        active = parseInt(active);

        // Dimensiones
        length = isNaN(parseFloat(length)) ? 0 : parseFloat(length).toFixed(2);
        width  = isNaN(parseFloat(width))  ? 0 : parseFloat(width).toFixed(2);
        height = isNaN(parseFloat(height)) ? 0 : parseFloat(height).toFixed(2);
        weight = isNaN(parseFloat(weight)) ? 0 : parseFloat(weight).toFixed(2);

        if((isNaN(price) || isNaN(stock) || isNaN(discount) || isNaN(active)) && (price <= 0 || stock < 0 || discount < 0 || active < 0)){
            const error = new Error("Precio, stock o descuento deben ser números válidos. ");
            return res.status(404).json({ error : error.message });
        }

        if((isNaN(length) || isNaN(width) || isNaN(height) || isNaN(weight)) && (length <= 0 || width <= 0 || height <= 0 || weight <= 0)){
            const error = new Error("Un valor de las dimensiones es invalido. ");
            return res.status(404).json({ error : error.message });
        }

        if(tags.length <= 3){
            const error = new Error("Es necesario ingresar 3 etiquetas para una mejor experiencia de busqueda para tus clientes. ");
            return res.status(404).json({ error : error.message });
        }

        if(faqs.length <= 3 ){
            const error = new Error("Es necesario colocar por lo menos 3 Faqs. Este destruye las barreras del no comprar y aumenta la posibilidad de compra de tus clientes. ");
            return res.status(404).json({ error : error.message });
        }
        
        const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        await Promise.all(
          files.map(async (file, index) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if (!validExtensions.includes(ext)) throw new Error(`Archivo no permitido: ${file.originalname}`);
            const fileName = `${sku}-${index + 1}${ext}`;
            const filePath = path.join(__dirname, "../uploads/products", fileName);
            await fs.writeFile(filePath, file.buffer);
          })
        );

        const imageUrls = files.map((file, index) => {
          const ext = path.extname(file.originalname).toLowerCase();
          const fileName = `${sku}-${index + 1}${ext}`;
          return { url: `/uploads/products/${fileName}` }; 
        });

        if (typeof tags === 'string') tags = JSON.parse(tags);
        if (typeof faqs === 'string') faqs = JSON.parse(faqs);

        const resultado = await SetAddProductAdmin(
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
            imageUrls
        );

        if(resultado.success === false){
            const error = new Error(resultado.message);
            return res.status(404).json({ error : error.message });
        }

        console.log("Se agrego un nuevo producto");
        return res.status(200).json({ success : "Añadiste un nuevo producto" });

    }catch(e){
        const error = new Error("Ocurrio un error al subir el nuevo producto");
        console.log(e);
        return res.status(404).json({ error : error.message });
    }
 }

 const actualizarProducto = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No se recibieron datos del producto." });
    }

    const {
      id,
      name,
      description,
      sku,
      price,
      stock,
      discount,
      category,
      brand,
      active,
      large,
      width,
      height,
      weight,
      tags,
      faqs
    } = req.body;
    const files = req.files || [];
    
    // === VALIDACIONES ===
    if (!id || isNaN(id)) return res.status(400).json({ error: "El ID del producto es inválido." });
    if (!name || name.length < 4) return res.status(400).json({ error: "El nombre del producto es inválido." });
    if (!description || description.length < 50) return res.status(400).json({ error: "La descripción debe tener al menos 50 caracteres." });
    if (!sku || sku.includes(" ")) return res.status(400).json({ error: "El SKU es inválido o contiene espacios." });
    if (isNaN(price) || price <= 0) return res.status(400).json({ error: "El precio es inválido." });
    if (isNaN(stock) || stock < 0) return res.status(400).json({ error: "El stock es inválido." });
    if (isNaN(discount) || discount < 0) return res.status(400).json({ error: "El descuento es inválido." });
    if (isNaN(category) || category <= 0) return res.status(400).json({ error: "La categoría es inválida." });
    if (isNaN(brand) || brand <= 0) return res.status(400).json({ error: "La marca es inválida." });
    if (isNaN(large) || large <= 0) return res.status(400).json({ error: " es inválida." });

    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    const parsedFaqs = typeof faqs === "string" ? JSON.parse(faqs) : faqs;

    if (!parsedTags || parsedTags.length < 3) {
      return res.status(400).json({ error: "Debes agregar al menos 3 etiquetas (tags)." });
    }

    if (!parsedFaqs || parsedFaqs.length < 3) {
      return res.status(400).json({ error: "Debes agregar al menos 3 preguntas frecuentes (FAQs)." });
    }

    // Validación imágenes
    // if (files.length < 4) {
    //   return res.status(400).json({ error: "Debes subir al menos 4 imágenes del producto." });
    // }

    // Guardar imágenes
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    await Promise.all(
      files.map(async (file, index) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!validExtensions.includes(ext)) throw new Error(`Archivo no permitido: ${file.originalname}`);
        const fileName = `${sku}-${index + 1}${ext}`;
        const filePath = path.join(__dirname, "../uploads/products", fileName);
        await fs.writeFile(filePath, file.buffer);
      })
    );

    const imageUrls = files.map((file, index) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const fileName = `${sku}-${index + 1}${ext}`;
      return { url: `/uploads/products/${fileName}` };
    });
    
    const resultado = await SetUpdateProductAdmin({
      id,
      name,
      description,
      sku,
      price,
      stock,
      discount,
      category,
      brand,
      active,
      large,
      width,
      height,
      weight,
      tags: parsedTags,
      faqs: parsedFaqs,
      images: imageUrls
    });

    if (!resultado.success) {
      return res.status(400).json({ error: resultado.message });
    }

    return res.status(200).json({ success: "Producto actualizado correctamente." });

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ error: "Error al actualizar el producto." });
  }
};

export { 
  obtenerProductos
  , obtenerProducto
  , obtenerProductosAdmin
  , obtenerProductoAdmin
  , registrarProducto
  , actualizarProducto 
};