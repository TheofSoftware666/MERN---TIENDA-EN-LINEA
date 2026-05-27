import jwt from "jsonwebtoken";
import { consultarUsuario } from "../models/usuario.js";

const checkAuth = async (req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, "q2K!9fZbP#xVwR7yL8@zMv3");
            req.usuario = await consultarUsuario(decoded.id);
             
            return next();
        }catch(e){

            if(e.name === 'TokenExpiredError'){
                const error = new Error('Token expirado');
                return res.status(401).json({ msg : error.message });
            }

            const error = new Error('Token no Válido');
            return res.status(404).json({ msg : error.message });
        }
    }

    if(!token){
        const error = new Error('Token no Válido o inexistente');
        res.status(404).json({ msg : error.message })
    }
    
    next();
}

export default checkAuth;