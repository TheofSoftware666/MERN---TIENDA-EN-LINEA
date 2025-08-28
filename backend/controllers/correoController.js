import { comprobarUsuario } from "../models/correo.js";
import { sendMailEstatusPedidos, sendMailVerificar } from "../helpers/enviarCorreo.js";

const Enviar = async (req, res) => {

    let resultado = await sendMailVerificar("oswaldobautistaacosta@gmail.com");

    console.log(resultado);

    return res.status(200).json({ success : "Se envio correo exitosamente."});
}

export { Enviar }

