import { existeUsuario, consultarUsuario, registrar, validarToken, validarCodigo, confirmarToken, confirmarCodigo, iniciarUsuario, actualizarToken, actualizarCodigo } from "../models/usuario.js"; 
import generarJWT from "../helpers/generarJWT.js";
import { sendMailVerificar, sendMailCuentaVerificada, sendMailTokenPassword } from "../helpers/enviarCorreo.js";

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

    if(obtenerUsuario.length <= 0){
        const error = new Error("No fue posible iniciar sesion intenta mas tarde.");
        return res.status(404).json({ msg : error.message });
    }

    if(obtenerUsuario[0].correoValidado === 'F'){
        
        // Colocar nuevo token 
        const response = await actualizarCodigo(email);
        
        // Enviar token para verificacion
        const mailResponse = await sendMailVerificar(email, obtenerUsuario[0].nombre, response[0].codigo);
        console.log(mailResponse);
        
        const error = new Error("Tu cuenta no ah sido verificada. Te enviamos un codigo de verificacion a tu correo electronico...");
        return res.status(203).json({ msg : error.message });
    }

    // Autentificar
    return res.status(200).json({ token : generarJWT( obtenerUsuario[0].usuarioId )});
}

const registrarUsuario = async (req, res) => {
    try{
        const { nombre, email, password, repetir } = req.body;

        if(email.length == 0 || password.length == 0){
            const error = new Error("Usuario o Contraseña invalido.");
            return res.status(404).json({ msg : error.message });
        }

        if(email.indexOf('@') == -1){
            const error = new Error("El email es invalido.");
            return res.status(404).json({ msg : error.message });
        }

        if(nombre.length == 0){
            const error = new Error("Es necesario agregar tu nombre.");
            return res.status(404).json({ msg : error.message });
        }

        if(password.length < 6){
            const error = new Error("Debes ingresar una contraseña minima de 6 caracteres.");
            return res.status(404).json({ msg : error.message });
        }

        if(repetir.length < 6){
            const error = new Error("Debes ingresar una contraseña minima de 6 caracteres.");
            return res.status(404).json({ msg : error.message });
        }

        if(password !== repetir){
            const error = new Error("Las contraseñas ingresadas no coinciden.");
            return res.status(404).json({ msg : error.message });
        }

        const existeEmail = await existeUsuario(email);

        if(existeEmail.length == 1){
            const error = new Error("EL usuario ya existe");
            return res.status(404).json({ msg : error.message });
        }
        
        const response = await registrar(nombre ,email, password);
        
        if(response.length == 0){
            const error = new Error("Ocurrio un error inesperado al intentar crear una cuenta");
            return res.status(404).json({ msg : error.message });
        }

        // Enviar token para verificacion
        const mailResponse = await sendMailVerificar(email, nombre, response[0].codigo);
        console.log(mailResponse)

        return res.status(200).json({ msg : "Bienvenido ", });
        
    }catch(error){
        console.log(error);
        return res.status(200).json({ error : "Ocurrio un error al intentar registrar el nuevo usuario" });
    }
}

const ActualizarPassword = async (req, res) => {
    const [ password, repetirPassword ] = req.body;

    console.log(password);
    console.log(repetirPassword);

    return res.status(200).json({ error : "Se actualizo correctamente tu password" });
}

const ComprobarTokenPassword = async (req, res) => {
    const token = req.params.id;
    const today = new Date();

    const responseTokenValidado = await validarToken(token);

    if(responseTokenValidado.length <= 0){
        const error = new Error("Ocurrio un error inesperado");
        console.log("No se encontro ningun token");
        return res.status(400).json({ error : error.message });     
    }

    // Comprobar que la cuenta este verificada correctamente
    if(responseTokenValidado[0].correoValidado != "T"){
        const error = new Error("Ocurrio un error inesperado intentalo mas tarde.");
        console.log("Correo no verificado");
        return res.status(400).json({ error : error.message });     
    }

    // Comprobar tiempo
    if(((today - responseTokenValidado[0].time_codigo) / 1000 / 60) > 9){
        const error = new Error("El token ya caduco.");
        console.log("El token ya caduco");
        return res.status(400).json({ error : error.message });     
    }

    // Comprobar que el token no sea distinto
    if(token !== responseTokenValidado[0].token){
        const error = new Error("Ocurrio un error inesperado .");
        console.log("El token ingresado es distinto al original");
        return res.status(400).json({ error : error.message });     
    }

    return res.status(200).json({ error : "Este token va ah caducar en una lapso de 10 minutos" });
}

const CambiarPasswordToken = async (req, res) => {

    const email = req.body.email;

    if(email == null){
        const error = new Error("Es necesario ingresar tu correo electronico para restablecer tu contraseña");
        return res.status(404).json({ msg : error.message});
    }

    if(email.indexOf('@') == -1){
        const error = new Error("El correo que ingresaste es invalido");
        return res.status(404).json({ msg : error.message});
    }

    // Comprobar si existe en la BD
    const existeEmail = await existeUsuario(email);

    if(existeEmail.length <= 0){
        const error = new Error("Correo ingresado invalido");
        return res.status(404).json({ msg : error.message});
    }

    // Validar si el token ah sido comprobado anteriormente
    if(existeEmail[0].correoValidado == 'F'){

        const response = await actualizarCodigo(email);
        if(response.length <= 0){
            const error = new Error("No es posible reestablecer tu contraseña en este momento. Intentalo mas tarde.");
            return res.status(404).json({ msg : error.message});    
        }

        // Enviar token para verificacion
        const mailResponse = await sendMailVerificar(email, nombre, response[0].codigo);
        console.log(mailResponse);

        const error = new Error("Tu cuenta aun no ah sido verificada. Te enviamos un codigo de verificacion tu correo electronico.");
        return res.status(404).json({ msg : error.message});
    }

    // Token URL
    const responseToken = await actualizarToken(email);
    
    if(responseToken.length <= 0){
        const error = new Error("Ocurrio un error al intentar restablecer constraseña intentalo mas tarde...");
        return res.status(404).json({ msg : error.message});
    }

    // Enviar correo de bienvenido
    const mailResponse = await sendMailTokenPassword(email, responseToken[0].nombre.trim(), responseToken[0].token);
    console.log(mailResponse);

    return res.status(200).json({ msg : "te enviamos un mensaje a tu correo electronico para reestablecer tu contraseña"});    
}

const confirmarCuenta = async(req, res) => { 
    
    try{
        const token = await req.params.token;
        const today = new Date();

        if(token.length < 6){
            const error = new Error("Codigo de Verificacion invalido");
            return res.status(404).json({ msg : error.message});
        }

        const resultado = await validarCodigo(token);

        if(resultado.length === 0){
            const error = new Error("Codigo de Verificacion invalido");
            console.log("No se encontro ningun codigo de verificacion...");
            return res.status(404).json({ msg : error.message});
        }

        if(resultado[0].codigo !== token){
            const error = new Error("Codigo de Verificacion invalido");
            console.log("El token es distinto");
            return res.status(404).json({ msg : error.message});
        }

        if(((today - resultado[0].time_codigo) / 1000 / 60) > 9){
            const error = new Error("El token ya caduco");
            console.log("Token caducada");
            return res.status(404).json({ msg : error.message});
        }

        // Actualizar datos
        await confirmarCodigo(token);

        // Enviar correo de bienvenido
        const mailResponse = await sendMailCuentaVerificada(resultado[0].mail.trim(), resultado[0].nombre.trim());
        console.log(mailResponse);

        return res.status(200).json({ msg : "Cuenta Verificada"});

    }catch(e){
        const error = new Error("Error al intentar comprobar el token");
        console.log(e);
        return res.status(500).json({ msg : error.message });
    }
}

const mostrarPerfil = async (req, res) => {

    try{
        const { usuario } = req; 
    
        res.status(200).json({ msg : usuario});
    }catch(error){
        res.status(200).json({ error : error});
    }

}

export { iniciarSesion, registrarUsuario, confirmarCuenta, mostrarPerfil, CambiarPasswordToken , ComprobarTokenPassword, ActualizarPassword} 