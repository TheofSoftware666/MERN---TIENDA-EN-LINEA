import { consultarComentarios, insertarComentario } from './../models/comentarios.js';

const obtenerComentarios = async (req, res) => {
    const [ id ] = req.params;

    if(id <= 0){
        const error = new Error("Es necesario el producto para mostrar los comentarios");
        return res.status(404).json({Error: error.message });
    }

    const resultado = consultarComentarios(id);

    if(resultado.length == 0){
        const error = new Error("Este producto no contiene comentarios aun.");
        return res.status(404).json({Error: error.message });
    }

    return res.status(200).json({Success : resultado});
}

const agregarComentario = async (req, res) => {
    const [ usuario ] = req; 
    const [ producto ] = req.body;

    if(usuario.length == 0){
        const error = new Error("Es necesario iniciar sesion para agregar un comentario.");
        return res.status(404).json({Error: error.message });
    }

    if(producto.length == 0){
        const error = new Error("Ocurrio un error inesperado.");
        return res.status(404).json({Error: error.message });
    }

    const resultado = insertarComentario(usuario, producto);

    if(resultado.length == 0){
        const error = new Error("No se puede agregar un nuevo comentario.");
        return res.status(404).json({Error: error.message });
    }

    return res.status(200).json({Success : resultado });
}

export { obtenerComentarios, agregarComentario }