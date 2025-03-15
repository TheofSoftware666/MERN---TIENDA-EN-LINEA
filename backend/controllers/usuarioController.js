import { existeUsuario, consultarUsuario } from "../models/usuario.js"; 

const iniciarSesion = async (req , res ) => {

    const { email, password } = req.body;

    const existeEmail = await existeUsuario(email);

    if(existeEmail.length !== 1){
        const error = new Error("EL usuario no existe");

        return res.status(404).json({ msg : error.message });
    }

    const comprobarUser = await consultarUsuario(email);

    const [{ mail , pass }] = comprobarUser;

    if(mail != email || password != pass){
        const error = new Error("Usuario o Contraseña Incorrectos");

        console.log("Usuario o contraseña incorrectos");

        return res.status(404).json({ msg : error.message });    
    }
    
    return res.status(200).json({ msg : "Iniciando sesion"});
}

export { iniciarSesion } 