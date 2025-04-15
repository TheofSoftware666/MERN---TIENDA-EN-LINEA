import { categoria, categorias, actualizarCategoria, adicionarCategoria, categoriaNombre } from "../models/categoria.js";

const obtenerCategoria = async (req, res) => {
    try{
        const { id } = req.params;

        if(id.length == 0){
            const error = new Error("No se encontro ninguna categoria");    
            res.status(404).json({ error : error });       
            return;
        }

        const resultado = await categoria(id);

        res.status(200).json({ msg : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(404).json({ error : error });        
    }

}

const obtenerCategorias = async (req, res) => {
    
    try{
        const { limit } = req.params;

        if(limit == undefined){
            limit = 20;
        }

        const resultado = await categorias(parseInt(limit));

        console.log(resultado)
        console.log(resultado.length)

        res.status(200).json({ categorias : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(404).json({ error : error });        
    }

}

const subirCategoria = async (req, res) => {
    try{
        const postData = req.body;

        if(postData.nombre.length < 4){
            const error = new Error("El nombre de la categoria debe contener por lo menos 5 caracteres");

            return res.status(404).json({ error });
        }

        const resultado = await categoriaNombre(postData.nombre);

        if(resultado.length != 0){
            const error = new Error("El nombre " + postData.nombre + " ya existe en la base de datos");

            return res.status(404).json({ error : error.message });
        }

        await adicionarCategoria(postData.nombre.toUpperCase());

        const validar = await categoriaNombre(postData.nombre);

        if(validar.length == 0){
            const error = new Error("Ocurrio un error al dar de alta la nueva categoria");

            return res.status(404).json({ error : error.message });
        }

        return res.status(200).json({ msg : "Exito: se añadio una nueva categoria" });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(404).json({ error : error.message });        
    }

}

const editarCategoria = async (req, res) => {
    try{
        const postData = req.body;

        if(postData.nombre.length < 4){
            const error = new Error("El nombre de la categoria debe contener por lo menos 5 caracteres");

            return res.status(404).json({ error });
        }

        const resultado = await categoria(postData.id);

        if(resultado.length == 0){
            const error = new Error("La categoria " + postData.id + " no existe en la base de datos");

            return res.status(404).json({ error : error.message });
        }

        await actualizarCategoria(postData.id, postData.nombre.toUpperCase());

        const validar = await categoria(postData.id);

        if(validar[0].nombre === postData.nombre){
            const error = new Error("El nombre de la categoria es identico");

            return res.status(404).json({ error : error.message });
        }

        return res.status(200).json({ msg : "Exito: se actualizo la categoria" });

    }catch(e){
        const error = new Error("Ocurrio un error al actualizar la informacion");
        console.log(e);

        res.status(404).json({ error : error.message });        
    }

}

export { obtenerCategoria, obtenerCategorias, subirCategoria, editarCategoria};