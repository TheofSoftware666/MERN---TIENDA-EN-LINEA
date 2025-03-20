import { existeUsuario, consultarUsuario, registrar, validarToken, confirmarToken, iniciarUsuario } from "../models/usuario.js"; 
import generarJWT from "../helpers/generarJWT.js";

const iniciarSesion = async (req , res ) => {

    const { email, password } = req.body;

    if(email.length == 0 || password.length == 0){
        const error = new Error("EL usuario no existe");

        return res.status(404).json({ msg : error.message });
    }

    const existeEmail = await existeUsuario(email);

    if(existeEmail.length !== 1){
        const error = new Error("EL usuario no existe");

        return res.status(404).json({ msg : error.message });
    }

    const comprobarUser = await iniciarUsuario(email, password);

    if(!comprobarUser){
        const error = new Error("Usuario o contraseña incorrectos");

        return res.status(404).json({ msg : error.message });
    }
    
    const obtenerUsuario = await consultarUsuario(email);

    if(obtenerUsuario[0].correoValidado === 'F'){
        
        const error = new Error("La cuenta no ah sido verificada");

        return res.status(200).json({ msg : error.message });
    }

    // Autentificar
    return res.status(200).json({ token : generarJWT( obtenerUsuario[0].usuarioId )});
}

const registrarUsuario = async (req, res) => {

    const { email, password } = req.body;

    if(email.length == 0 || password.length == 0){
        const error = new Error("Usuario o Contraseña invalido");

        return res.status(404).json({ msg : error.message });
    }

    const existeEmail = await existeUsuario(email);

    if(existeEmail.length == 1){
        const error = new Error("EL usuario ya existe");

        return res.status(404).json({ msg : error.message });
    }

    await registrar(email, password);

    return res.status(200).json({ msg : "Usuario Registrado"});
}

const confirmarCuenta = async(req, res) => { 
    
    try{
        const token = await req.params?.token;
        
        const resultado = await validarToken(token);

        if(resultado.length === 0){
            const error = new Error("Error al comprobar el Token");

            console.log("No se encontro ningun token");

            return res.status(404).json({ msg : error.message});
        }

        if(resultado[0].token !== token){
            const error = new Error("Error al comprobar el Token");

            console.log("El token es distinto");

            return res.status(404).json({ msg : error.message});
        }

        // Actualizar datos
        await confirmarToken(token);

        return res.status(200).json({ msg : "Cuenta Verificada"});

    }catch(e){
        const error = new Error("Error al intentar comprobar el token");

        console.log(e);

        return res.status(500).json({ msg : error.message });
    }

}

const mostrarPerfil = async (req, res) => {

    const { usuario } = req; 

    res.status(200).json({ perfil : usuario});
}

export { iniciarSesion, registrarUsuario, confirmarCuenta, mostrarPerfil } 