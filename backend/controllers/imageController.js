import fs from 'fs';
import path from 'path';

import { GetImageByUrlModel
    , GetExistsImageById
    , DeleteFileImageModel
 } from "../models/files.js";

const getFileImage = async (req, res) => {
    try{
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Para obtener una imagen es necesario añadir la url." });
        }

        const { url } = req.body;   

        if (!url || url.trim() === '') {
            return res.status(400).json({ error: "Para obtener una imagen es necesario añadir la url." });
        } 

        const response = await GetImageByUrlModel(url);
        if (!response || !response.ok) {
            return res.status(400).json({ error: "No se encontró una imagen con esa URL." });
        }
        
        return res.status(200).json({ ok : response });
        
    }catch(ex){
        console.log("Ocurrio un error inesperado: ", ex);
        return res.status(500).json({ error: "Error al actualizar el producto." });
    }
};

const DeleteFileImage = async (req, res) => {
    try{
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Para eliminar una imagen es necesario especificar su id." });
        }

        const { idImage } = req.body ?? 0;

        if(idImage == 0){
            return res.status(400).json({ error: "Para eliminar una imagen es necesario especificar su id." });
        }

        const response = await GetExistsImageById(idImage);
        
        if(!response.ok){
            return res.status(400).json({ error: "No se encontro ninguna imagen." });    
        }
        
        const imageId = response.response.ImagenId;
        const url = response.response.URL;
        const filePath = path.join(process.cwd(), url);
        console.log("llego aqui");

        if(!fs.existsSync(filePath)){
            console.log("No existe el archivo. ");
            return res.status(400).json({ error: "No se encontro ningun archivo." });    
        } 
        
        fs.unlinkSync(filePath); 
        
        const responseDelete = await DeleteFileImageModel(imageId);
        console.log(responseDelete);

        return res.status(200).json({ ok: true, message : "Se elimino la imagen correctamente. " });
    }
    catch(ex){
        return res.status(500).json({ error: "Ocurrio un error inesperado. " + ex });
    }
}

export {
    getFileImage
    , DeleteFileImage
}