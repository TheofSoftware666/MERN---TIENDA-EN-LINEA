import { comprobarUsuario } from "../models/correo.js";
import { enviarCorreo } from "../helpers/enviarCorreo.js";

const Enviar = async (req, res) => {
    // const [ usuario ] = req;
    // console.log(req.body);

    // if(usuario.length == 0){
    //     const error = new Error("Es necesario iniciar sesion para continuar.");
    //     return res.status(404).json({ error : error.message });
    // }

    let resultado = await enviarCorreo("oswaldobautistaacosta@gmail.com");

    console.log(resultado);

    return res.status(200).json({ success : "Se envio correo exitosamente."});
}

export { Enviar }

