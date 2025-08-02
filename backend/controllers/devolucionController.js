import { consultarDevolucion, consultarDevoluciones, crearDevolucion }  from '../models/devolucion.js'

const obtenerDevolucion = async (req, res) => {
    const { Usuario } = req;
    const { id } = req;

    if(Usuario.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(404).json({ Error : error.message});
    }

    if(id.length == 0){
        const error = new Error("Es necesario ingresar un id para buscar.");
        return res.status(404).json({ Error : error.message});
    }

    // ! Consulta Base de datos
    const resultado = await consultarDevolucion(Usuario, id);

    if(resultado.length == 0){
        const error = new Error("NO se encontro ninguna devolucion.");
        return res.status(404).json({ Error : error.message});
    }

    return res.status(200).json({ SUccess : error.message});
}

const obtenerDevoluciones = async (req, res) => {
    const { Usuario } = req;

    if(Usuario.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(404).json({ Error : error.message});
    }

    // ! Consulta Base de datos
    const resultado = await consultarDevoluciones(Usuario);

    if(resultado.length == 0){
        const error = new Error("NO se encontro ninguna devolucion.");
        return res.status(404).json({ Error : error.message});
    }

    return res.status(200).json({ SUccess : error.message});
}

const GenerarDevolucion = async (req, res) => {
    const { Usuario } = req.body;
    const jsonData = req.bo

    if(Usuario.length == 0){
        const error = new Error("Es necesario volver a iniciar sesion.");
        return res.status(404).json({ Error : error.message});
    }

    if(jsonData.length == 0){
        const error = new Error("Ocurrio un error inesperado. ");
        return res.status(404).json({ Error : error.message});
    }

    // ! Consulta Base de datos
    const resultado = await crearDevolucion(Usuario, jsonData);

    if(resultado.length == 0){
        const error = new Error("NO se encontro ninguna devolucion.");
        return res.status(404).json({ Error : error.message});
    }

    return res.status(200).json({ Success : error.message});
}


export { obtenerDevolucion, obtenerDevoluciones, GenerarDevolucion}