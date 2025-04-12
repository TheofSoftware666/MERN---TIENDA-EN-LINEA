import { Productos, Producto, ProductoAdmin, ProductosAdmin, subirProductoAdmin, actualizarProductoAdmin, comprobarExistencias } from "../models/productos.js";

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
    
   try{
    const idProducto = req.params.id;

    if(idProducto.trim().length == 0){
        const error = new Error("Error al buscar el producto");

        return res.status(404).json({ error : error }); 
    }

    const producto = await Producto(idProducto.trim());

    return res.status(200).json({ producto }); 

   }catch(e){
    const error = new Error("Error al buscar el producto");

    return res.status(404).json({ error : error }); 
   }

}

const obtenerProductosAdmin = async (req, res) => {

    try {
    //Consultar Productos
    const productos = await ProductosAdmin();

    return res.status(200).json({ productos});

    }catch(e){
        console.log(e);

        const error = new Error("Error al consultar los productos"); 
        return res.status(404).json({ msg : error });
    }
}

const obtenerProductoAdmin = async (req, res) => {
    
   try{
    const idProducto = req.params.id;

    if(idProducto.trim().length == 0){
        const error = new Error("Error al buscar el producto");

        return res.status(404).json({ error : error }); 
    }

    const producto = await ProductoAdmin(idProducto.trim());

    return res.status(200).json({ producto }); 

   }catch(e){
    const error = new Error("Error al buscar el producto");

    return res.status(404).json({ error : error }); 
   }

}

const registrarProducto = async (req, res) => {
    try{

        const data = req.body;
        const validaciones = [ data.nombre.trim(), data.descripcion.trim(), data.imagen1.trim() ];
        
        const result = validaciones.some(validar => validar.length < 3);

        if(result){
            const error = new Error("Los campos nombre o descripcion o imagen estan vacios");
    
            return res.status(404).json({ error : error.message }); 
        }

        if(!Number.isInteger(data.MARCA) || data.MARCA == 0){
            const error = new Error("No se ah seleccionado una MARCA existente");
    
            return res.status(404).json({ error : error.message }); 
        }

        if(!Number.isInteger(data.CATEGORIA) || data.CATEGORIA == 0){
            const error = new Error("No se ah seleccionado una CATEGORIA existente");
    
            return res.status(404).json({ error : error.message }); 
        }

        if((!Number.isInteger(data.stock) || data.stock == 0) || (!Number.isInteger(data.monto) || data.monto == 0)){
            const error = new Error("Los campos Monto o Stock no puedes estar vacios o en ceros");
    
            return res.status(404).json({ error : error.message }); 
        }
        
        const resultado = await comprobarExistencias(data.nombre);        


        if(resultado.length != 0){
            const error = new Error("Ya existe ese producto");
    
            return res.status(404).json({ error : error.message }); 
        }

        await subirProductoAdmin(data);

        return res.status(200).json({ msg : "Añadiste un nuevo producto" }); 
 
    }catch(e){
        const error = new Error("Ocurrio  un error al subir el nuevo producto");
        console.log(e);
        return res.status(404).json({ error : error.message }); 
    }
 }

 const actualizarProducto = async (req, res) => {
    
    try{
        const idProducto = req.params.id;        
        const data = req.body;
        let update = {};
        const validaciones = [ data.nombre.trim(), data.descripcion.trim(), data.imagen1.trim() ];
    
        if(idProducto.trim().length == 0){
            const error = new Error("Error al buscar el producto");
    
            return res.status(404).json({ error : error.message }); 
        }

        const result = validaciones.some(validar => validar.length < 3);

        if(result){
            const error = new Error("Los campos nombre o descripcion o imagen estan vacios");
    
            return res.status(404).json({ error : error.message }); 
        }

        if(!Number.isInteger(data.marcaId) || data.marcaId == 0){
            const error = new Error("No se ah seleccionado una MARCA existente");
    
            return res.status(404).json({ error : error.message }); 
        }

        if(!Number.isInteger(data.categoriaId) || data.categoriaId == 0){
            const error = new Error("No se ah seleccionado una CATEGORIA existente");
    
            return res.status(404).json({ error : error.message }); 
        }

        if((!Number.isInteger(data.stock) || data.stock == 0) || (!Number.isInteger(data.monto) || data.monto == 0)){
            const error = new Error("Los campos Monto o Stock no puedes estar vacios o en ceros");
    
            return res.status(404).json({ error : error.message }); 
        }

        const resultado = await comprobarExistencias(idProducto);        

        if(resultado.length == 0){
            const error = new Error("No existe el producto");
    
            return res.status(404).json({ error : error.message }); 
        }

        update.productoId = resultado[0].productoId;
        update.nombre = data.nombre != resultado[0].nombre ? data.nombre : resultado[0].nombre;  
        update.descripcion = data.descripcion != resultado[0].descripcion ? data.descripcion : resultado[0].descripcion;  
        update.marcaId = data.marcaId != resultado[0].MARCA ? data.marcaId : resultado[0].MARCA;  
        update.categoriaId = data.categoriaId != resultado[0].CATEGORIA ? data.categoriaId : resultado[0].CATEGORIA;  
        update.stock = data.stock != resultado[0].stock ? data.stock : resultado[0].stock;  
        update.imagen1 = data.imagen1 != resultado[0].imagen1 ? data.imagen1 : resultado[0].imagen1;  
        update.imagen2 = data.imagen2 != resultado[0].imagen2 ? data.imagen2 : resultado[0].imagen2;  
        update.imagen3 = data.imagen3 != resultado[0].imagen3 ? data.imagen3 : resultado[0].imagen3;  
        update.imagen4 = data.imagen4 != resultado[0].imagen4 ? data.imagen4 : resultado[0].imagen4;  
        update.imagen5 = data.imagen5 != resultado[0].imagen5 ? data.imagen5 : resultado[0].imagen5;  
        update.estatusProducto = data.estatusProducto != resultado[0].estatusProducto ? data.estatusProducto : resultado[0].estatusProducto;  
        update.estatusPromo = data.estatusPromo != resultado[0].estatusPromo ? data.estatusPromo : resultado[0].estatusPromo;  
        update.promocion = data.promocion != resultado[0].promocion ? data.promocion : resultado[0].promocion;  
        update.monto = data.monto != resultado[0].monto ? data.monto : resultado[0].monto;  
        update.descuento1 = data.descuento1 != resultado[0].descuento1 ? data.descuento1 : resultado[0].descuento1;  
        update.descuento2 = data.descuento2 != resultado[0].descuento2 ? data.descuento2 : resultado[0].descuento2;  
        update.iva = data.iva != resultado[0].iva ? data.iva : resultado[0].iva;  
        
        await actualizarProductoAdmin(update);

        return res.status(200).json({ msg : "Se actualizo el producto correctamente" }); 
    

    }catch(e){
        const error = new Error("Error inesperado al editar el producto");
        console.log(e);
        return res.status(404).json({ error : error.message }); 
    }
 
 }

export { obtenerProductos, obtenerProducto, obtenerProductosAdmin, obtenerProductoAdmin, registrarProducto, actualizarProducto };