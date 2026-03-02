import { comprobarUsuario } from "../models/correo.js";
import { sendMailEstatusPedidos, sendMailVerificar } from "../helpers/enviarCorreo.js";
// import {  } from "../helpers/mails/admin/mailAdminController.js"; 
// import {  } from "../helpers/mails/client/mailClientController.js"; 

// Admin 
const sendNewOrderAdmin = async (req, res) => {

    let resultado = await sendMailVerificar("oswaldobautistaacosta@gmail.com");

    console.log(resultado);

    return res.status(200).json({ success : "Se envio correo exitosamente."});
}

// Client
const enviarVerificacion = async (req, res) => {

    let resultado = await sendMailVerificar("oswaldobautistaacosta@gmail.com");

    console.log(resultado);

    return res.status(200).json({ success : "Se envio correo exitosamente."});
}

export { enviarVerificacion }

