import { Productos, Producto } from "../models/productos.js";

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

export { obtenerProductos, obtenerProducto };