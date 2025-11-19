import fs from "fs";
import path from "path";
import { categoria, categorias, actualizarCategoria, CreateCategoryModel, SearchCategoryByName } from "../models/categoria.js";

const obtenerCategoria = async (req, res) => {
    try{
        const { id } = req.params;

        if(id.length == 0){
            const error = new Error("No se encontro ninguna categoria");    
            res.status(400).json({ error : error });       
            return;
        }

        const resultado = await categoria(id);

        res.status(200).json({ msg : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(400).json({ error : error });        
    }

}

const obtenerCategorias = async (req, res) => {
    try{
        const { limit } = req.params;

        if(limit == undefined){
            limit = 20;
        }

        const resultado = await categorias(parseInt(limit));

        // console.log(resultado)
        res.status(200).json({ categorias : resultado });

    }catch(e){
        const error = new Error("Ocurrio un error al consultar la informacion");
        console.log(e);

        res.status(400).json({ error : error });        
    }

}

const CreateCategory = async (req, res) => {
    try{
        if(!req.body || !req.body.name){
            const error = new Error("No hay datos para procesar.");    
            return res.status(400).json({ error: error.message });
        }

        if(!req.files){
            const error = new Error("Es necesario cargar alguna una imagen para subir una nueva categoría");    
            return res.status(400).json({ error: error.message });
        }

        if(!req.usuario){
            const error = new Error("Token Caducado.");
            return res.status(303).json({ error : error.message });
        }
        
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(req.files[0].mimetype)) {
            const error = new Error("Solo se permiten imágenes PNG o JPG");    
            return res.status(400).json({ error : error.message });
        }

        if(req.body.name.length < 4){
            const error = new Error("El nombre de la categoría debe contener por lo menos 5 caracteres. ");
            return res.status(400).json({ error : error.message });
        }   

        const nameCategory = req.body.name;
        const image = req.files[0];

        const responseExistCategory = await SearchCategoryByName(nameCategory, image.originalname);

        if(responseExistCategory){  
            const error = new Error("Actualmente ya existe una categoria llamada " + nameCategory + " o la imagen ya existe " + image.originalname);
            return res.status(400).json({ error : error.message });
        }
       
        const uploadPath = path.join(process.cwd(), "uploads/categories", image.originalname);        
        fs.writeFileSync(uploadPath, image.buffer);

        const response = await CreateCategoryModel(nameCategory.toUpperCase(), "/uploads/categories/" + image.originalname);
        if(response.success !== true){
            const error = new Error("Oucrrio un error al crear la categoría" + response.message + " " + response.sqlMessage);
            return res.status(400).json({ error : error.message });
        }

        return res.status(200).json({ success : "Se ah creado una nueva categoría." });
    }catch(e){
        console.log(e);
        const error = new Error("Ocurrio un error al consultar la informacíon");
        res.status(400).json({ error : error.message + e});        
    }

}

const editarCategoria = async (req, res) => {
    try{
        const postData = req.body;

        if(postData.nombre.length < 4){
            const error = new Error("El nombre de la categoria debe contener por lo menos 5 caracteres");

            return res.status(400).json({ error });
        }

        const resultado = await categoria(postData.id);

        if(resultado.length == 0){
            const error = new Error("La categoria " + postData.id + " no existe en la base de datos");

            return res.status(400).json({ error : error.message });
        }

        await actualizarCategoria(postData.id, postData.nombre.toUpperCase());

        const validar = await categoria(postData.id);

        if(validar[0].nombre === postData.nombre){
            const error = new Error("El nombre de la categoria es identico");

            return res.status(400).json({ error : error.message });
        }

        return res.status(200).json({ msg : "Exito: se actualizo la categoria" });

    }catch(e){
        const error = new Error("Ocurrio un error al actualizar la informacion");
        console.log(e);

        res.status(400).json({ error : error.message });        
    }

}

export { obtenerCategoria, obtenerCategorias, CreateCategory, editarCategoria};