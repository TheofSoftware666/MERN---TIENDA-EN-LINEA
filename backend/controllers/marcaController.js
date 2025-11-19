import { marca, marcas, actualizarMarca, createBrandModel, SearchBrandByName } from "../models/marca.js";

const obtenerMarca = async (req, res) => {
    try{
        const { id } = req.params;

        if(id.length == 0){
            const error = new Error("No se encontro ninguna marca");    
            res.status(400).json({ error : error });       
            return;
        }

        const resultado = await marca(id);

        res.status(200).json({ msg : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(400).json({ error : error.message });        
    }

}

const obtenerMarcas = async (req, res) => {
    
    try{
        const { limit } = req.params;

        if(limit == undefined){
            limit = 20;
        }

        const resultado = await marcas(parseInt(limit));
        res.status(200).json({ marcas : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(400).json({ error : error.message });        
    }
}

const createBrand = async (req, res) => {
    try{
        
        if(!req.usuario){
            const error = new Error("Token Caducado.");
            return res.status(303).json({ error : error.message });
        }

        if(!req.body){
            const error = new Error("No hay datos para procesar.");
            return res.status(400).json({ error : error.message });
        }

        const usuario = req.usuario;
        const { id, name } = req.body;

        console.log(usuario[0].usuarioId);

        if(!id && id != 0){
            const error = new Error("Para crear una nueva marca el ID debe de ser 0.");
            return res.status(400).json({ error : error.message });
        }

        if(!name || name.length == 0){
            const error = new Error("El nombre de la marca es obligatorio.");
            return res.status(400).json({ error : error.message });
        }

        if(name.length < 4){
            const error = new Error("El nombre de la marca debe contener por lo menos 5 caracteres");
            return res.status(400).json({ error : error.message });
        }

        const resultado = await SearchBrandByName(name.toUpperCase());

        if(resultado){
            const error = new Error("El nombre " + name + " ya existe en la base de datos");
            return res.status(400).json({ error : error.message });
        }

        await createBrandModel(name.toUpperCase());
        return res.status(200).json({ success : `Marca "${name.toUpperCase()}" creada correctamente.` });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(400).json({ error : error.message });        
    }

}

const editarMarca = async (req, res) => {
    try{
        const postData = req.body;

        if(postData.nombre.length < 4){
            const error = new Error("El nombre de la marca debe contener por lo menos 5 caracteres");

            return res.status(400).json({ error });
        }

        const resultado = await marca(postData.id);

        if(resultado.length == 0){
            const error = new Error("La marca " + postData.id + " no existe en la base de datos");

            return res.status(400).json({ error : error.message });
        }

        await actualizarMarca(postData.id, postData.nombre.toUpperCase());

        const validar = await marca(postData.id);

        if(validar[0].nombre !== postData.nombre){
            const error = new Error("El nuevo nombre de la marca no se actualizo");

            return res.status(400).json({ error : error.message });
        }

        return res.status(200).json({ msg : "Exito: se actualizo la marca" });

    }catch(e){
        const error = new Error("Ocurrio un error al actualizar la informacion");
        console.log(e);

        res.status(400).json({ error : error.message });        
    }

}

export { obtenerMarca, obtenerMarcas, createBrand, editarMarca};