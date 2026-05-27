import { response } from "express";
import db from "../config/db.js";

const GetImageByUrlModel = async (url) => {
    try{
        const conexion = await db();
    
        const query = `
            SELECT ImagenId, URL, Orden
            FROM productoimagenes 
            WHERE URL = ?
        `;

        const [ results ] = await conexion.query(query, [url]);
        
        const responseObject = {
            ok: true,
            message: 'Success',
            image : results[0]

        };

        return responseObject;
    }
    catch(ex){
        return {
            ok: false,
            message: "Ocurrio un error al encontrar la imagen ==> " + ex
        };
    }
};

const GetExistsImageById = async (idImage) => {
    try{
        const conexion = await db();
    
        const query = `
            SELECT ImagenId, URL, Orden
            FROM productoimagenes 
            WHERE ImagenId = ?
        `;

        const [ results ] = await conexion.query(query, [idImage]);
        
        const responseObject = {
            ok: true,
            message: 'Success',
            response: results[0]
        };

        return responseObject;

    }catch(ex){
        console.log("Model: GetExistsImageById " + ex);
        return {
            ok : false,
            message : "Error " + ex
        }
    }
};

const DeleteFileImageModel = async (id) => {
    const response = {
        ok: false,
        message: 'Ocurrio un error la intentar eliminar la imagen. ',
        response: null
    }
    
    try{
        const conexion = await db();
    
        const query = `
            DELETE 
            FROM productoimagenes 
            WHERE ImagenId = ?
        `;

        const [ results ] = await conexion.query(query, [id]);

        response.ok = true;
        response.message = 'Se elimino la imagen correctamente. ';
        response.response = results[0] || [];

        return response;
    }
    catch(ex){
        response.message = "Error Model DeleteFileImage: " + ex
        return response;
    }
}

export {
    GetImageByUrlModel
    , GetExistsImageById
    , DeleteFileImageModel
}