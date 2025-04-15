import { marca, marcas, actualizarMarca, adicionarMarca, marcaNombre } from "../models/marca.js";

const obtenerMarca = async (req, res) => {
    try{
        const { id } = req.params;

        if(id.length == 0){
            const error = new Error("No se encontro ninguna marca");    
            res.status(404).json({ error : error });       
            return;
        }

        const resultado = await marca(id);

        res.status(200).json({ msg : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(404).json({ error : error.message });        
    }

}

const obtenerMarcas = async (req, res) => {
    
    try{
        const { limit } = req.params;

        if(limit == undefined){
            limit = 20;
        }

        const resultado = await marcas(parseInt(limit));

        console.log(resultado)
        console.log(resultado.length)

        res.status(200).json({ marcas : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(404).json({ error : error.message });        
    }

}

const subirMarca = async (req, res) => {
    try{
        const postData = req.body;

        console.log(postData);

        if(postData.nombre.length < 4){
            const error = new Error("El nombre de la marca debe contener por lo menos 5 caracteres");

            return res.status(404).json({ error : error.message });
        }

        const resultado = await marcaNombre(postData.nombre);

        if(resultado.length != 0){
            const error = new Error("El nombre " + postData.nombre + " ya existe en la base de datos");

            return res.status(404).json({ error : error.message });
        }

        await adicionarMarca(postData.nombre.toUpperCase());

        const validar = await marcaNombre(postData.nombre);

        if(validar.length == 0){
            const error = new Error("Ocurrio un error al dar de alta la nueva marca");

            return res.status(404).json({ error : error.message });
        }

        return res.status(200).json({ msg : "Exito: se añadio una nueva marca" });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(404).json({ error : error.message });        
    }

}

const editarMarca = async (req, res) => {
    try{
        const postData = req.body;

        if(postData.nombre.length < 4){
            const error = new Error("El nombre de la marca debe contener por lo menos 5 caracteres");

            return res.status(404).json({ error });
        }

        const resultado = await marca(postData.id);

        if(resultado.length == 0){
            const error = new Error("La marca " + postData.id + " no existe en la base de datos");

            return res.status(404).json({ error : error.message });
        }

        await actualizarMarca(postData.id, postData.nombre.toUpperCase());

        const validar = await marca(postData.id);

        if(validar[0].nombre !== postData.nombre){
            const error = new Error("El nuevo nombre de la marca no se actualizo");

            return res.status(404).json({ error : error.message });
        }

        return res.status(200).json({ msg : "Exito: se actualizo la marca" });

    }catch(e){
        const error = new Error("Ocurrio un error al actualizar la informacion");
        console.log(e);

        res.status(404).json({ error : error.message });        
    }

}

export { obtenerMarca, obtenerMarcas, subirMarca, editarMarca};