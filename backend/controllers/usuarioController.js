import generarJWT from "../helpers/generarJWT.js";
import { existeUsuario
    , consultarUsuario
    , registrar
    , validarToken
    , validarCodigo
    , getUserById
    , confirmarToken
    , confirmarCodigo
    , iniciarUsuario
    , actualizarToken
    , actualizarCodigo
    , GetShippingAddressByUserIdModel
    , SetShippingAddressModel 
    , GetSuscripcionByUser
    , SetSuscripcionByUser
} from "../models/usuario.js"; 
import { sendMailVerificar, sendMailCuentaVerificada, sendMailTokenPassword, sendMailEcommerceSuscription } from "../helpers/enviarCorreo.js";

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

const GetProfileByUserId = async (req, res) => {
    try{
        const userId = req.usuario[0].UserId_New || null;
        const response = {
                ok: false,
                message: '',
                data: null 
        };
        
        if(!userId || userId === null || userId.trim() === ''){
            const error = new Error("ID de usuario invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        const data = await getUserById(userId);

        if(!data || data.length <= 0){
            const error = new Error("No fue posible obtener el perfil del usuario.");
            return res.status(400).json({ ok: false, error : error.message});
        }   

        response.ok = true;
        response.message = 'Perfil obtenido correctamente';
        response.data = req.usuario;
        res.status(200).json({ response });
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al obtener el perfil del usuario:', error);
    }

}

const GetShippingAddressByUserId = async (req, res) => {
    try{
        const userId = req.usuario[0].UserId_New || null;
        const response = {
                ok: false,
                message: '',
                data: null 
        };
        
        if(!userId || userId === null || userId.trim() === ''){
            const error = new Error("ID de usuario invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        const data = await getUserById(userId);

        if(!data || data.length <= 0){
            const error = new Error("No fue posible obtener el perfil del usuario.");
            return res.status(400).json({ ok: false, error : error.message});
        }   

        const dataShippingAddress = await GetShippingAddressByUserIdModel(userId);

        if(!dataShippingAddress){
            const error = new Error("No fue posible obtener las direcciones de envío del usuario.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(dataShippingAddress.length <= 0){
            const error = new Error("Es necesario registrar una dirección de envío.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        response.ok = dataShippingAddress.ok || false;
        response.message = dataShippingAddress.message || 'Direcciones de envío obtenidas correctamente';
        response.data = dataShippingAddress.data || null;
        res.status(200).json({ response });
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al obtener el perfil del usuario:', error);
    }
}

const GetShippingAddressByShippingAddress = async (req, res) => {
    try{
        const userId = req.usuario[0].UserId_New || null;
        const response = {
                ok: false,
                message: '',
                data: null 
        };
        
        if(!userId || userId === null || userId.trim() === ''){
            const error = new Error("ID de usuario invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        const data = await getUserById(userId);

        if(!data || data.length <= 0){
            const error = new Error("No fue posible obtener el perfil del usuario.");
            return res.status(400).json({ ok: false, error : error.message});
        }   

        response.ok = true;
        response.message = 'Perfil obtenido correctamente';
        response.data = req.usuario;
        res.status(200).json({ response });
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al obtener el perfil del usuario:', error);
    }
}

const SetShippingAddress = async (req, res) => {
    try{
        const userId = req.usuario[0].UserId_New || null;
        const response = {
                ok: false,
                message: '',
                data: null 
        };

        if(!userId || userId === null || userId.trim() === ''){
            const error = new Error("ID de usuario invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!req.body){
            const error = new Error("Los datos de la dirección son invalidos.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!req.body.formAddress){
            const error = new Error("Los datos de la dirección son invalidos.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        const addressData = req.body.formAddress;

        // if(!addressData.contact_name || addressData.contact_name.length <= 0){
        //     const error = new Error("El nombre del contacto es obligatorio.");
        //     return res.status(400).json({ ok: false, error : error.message});
        // }

        // if(!addressData.phone || addressData.phone.length <= 0){
        //     const error = new Error("El telefono de contacto es obligatorio.");
        //     return res.status(400).json({ ok: false, error : error.message});
        // }

        // if(!addressData.country || addressData.country.length <= 0){
        //     const error = new Error("El pais es obligatorio.");
        //     return res.status(400).json({ ok: false, error : error.message});
        // }

        if(!addressData.street || addressData.street.length <= 0){
            const error = new Error("La calle es obligatoria.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!addressData.exterior_number || addressData.exterior_number.length <= 0){
            const error = new Error("El numero exterior es obligatorio.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!addressData.city || addressData.city.length <= 0){
            const error = new Error("La ciudad es obligatoria.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!addressData.state || addressData.state.length <= 0){
            const error = new Error("El estado es obligatorio.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!addressData.postal_code || addressData.postal_code.length <= 0){
            const error = new Error("El codigo postal es obligatorio.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!addressData.cross_street_1 || addressData.cross_street_1.length <= 0){
            const error = new Error("La calle cruze 1 es obligatoria.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        if(!addressData.cross_street_2 || addressData.cross_street_2.length <= 0){
            const error = new Error("La calle cruze 2 es obligatoria.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        // if(typeof addressData.is_primary !== 'boolean'){
        //     const error = new Error("Es necesario especificar si la direccion es primaria u opcional.");
        //     return res.status(400).json({ ok: false, error : error.message});
        // }

        addressData.contact_name = req.usuario[0].nombre + (req.usuario[0].apellido || '') || '';
        addressData.phone = req.usuario[0].celular || '';
        addressData.country = addressData.country || 'Mexico';
        addressData.is_primary = addressData.is_primary || false;

        const data = await SetShippingAddressModel(userId, addressData);

        if(!data || data.length <= 0 || data.ok === false){
            const error = new Error("No fue posible obtener el perfil del usuario.");
            return res.status(400).json({ ok: false, error : data.message || error.message});
        }   

        response.ok = true;
        response.message = 'Perfil obtenido correctamente';
        response.data = data.data || null;
        res.status(200).json({ response });
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al obtener el perfil del usuario:', error);
    }
}

const SetEcommercePromo = async (req, res) => {
    try{
        const email = req.body.email || null;

        if(!email || email === null || email.trim() === ''){
            const error = new Error("Correo electronico invalido.");
            return res.status(400).json({ ok: false, error : error.message});
        }

        const response = await GetSuscripcionByUser(email);

        if(!response || response.data >= 0){
            const error = new Error("No fue posible obtener la suscripción del usuario.");
            return res.status(400).json({ ok: false, error : response.message || error.message});
        }

        // Enviar correo de promocion
        const mailResponse = await sendMailEcommerceSuscription(email);

        if(!mailResponse || mailResponse.ok === false){
            const error = new Error("Ocurrio un error inesperado al enviar el correo de suscripción.");
            return res.status(400).json({ ok: false, error : mailResponse.message || error.message});
        }

        // Setear en base de datos que se envio la promocion al usuario
        const setResponse = await SetSuscripcionByUser(email);
        if(!setResponse || setResponse.length <= 0 || setResponse.ok === false){
            const error = new Error("No fue posible actualizar la suscripción del usuario.");
            return res.status(400).json({ ok: false, error : setResponse.message || error.message});
        }

        return res.status(200).json({ msg : "Te enviamos un mensaje a tu correo electronico con nuestras promociones del dia."});
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al obtener el perfil del usuario:', error);
    }
}

export { iniciarSesion
    , registrarUsuario
    , confirmarCuenta
    , GetProfileByUserId
    , CambiarPasswordToken 
    , ComprobarTokenPassword
    , ActualizarPassword
    , GetShippingAddressByUserId
    , GetShippingAddressByShippingAddress
    , SetShippingAddress
    , SetEcommercePromo
}; 