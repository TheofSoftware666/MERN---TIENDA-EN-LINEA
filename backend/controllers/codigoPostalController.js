import { GetCodePostalModel } from "../models/CodePostal.js";

const GetCodePostal = async (req, res) => {
    try{
        if(!req.params.cp){
            const error = new Error("El codigo postal es un campo obligatorio");
            return res.status(404).json({ msg : error.message })
        }
        
        const IdCodePostal = req.params.cp;
        const ResponseCode = await GetCodePostalModel(IdCodePostal);

        if(ResponseCode.length <= 0){
            const error = new Error("No se encontro ningun codigo postal");
            return res.status(404).json({ msg : error.message })
        }

        // console.log(ResponseCode);

        return res.json({ CodigoPostal : ResponseCode});
    }catch(e){
        const error = new Error("Tienda no encontrada");
        return res.status(404).json({ msg : error.message })
    }   
}

export { GetCodePostal } ;