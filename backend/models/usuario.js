import bcrypt from 'bcrypt';
import db from "../config/db.js";
import { generarCodigo, generarToken } from '../helpers/generarToken.js';

const existeUsuario = async (usuario) => {
    // Establece conexion con DB
    let conexion ;

    try{
        conexion = await db();

        const query = `SELECT mail, nombre ,correoValidado FROM usuarios WHERE mail = ?`;

        const  [ results, fields ] = await conexion.query(query, [usuario]);

        return results;
    }catch(error){
        console.error('Error al verificar la existencia del usuario:', error);
        throw new Error('No se pudo verificar la existencia del usuario.');
    }finally{
        if(conexion) await conexion.end(); 
    }
}

const iniciarUsuario = async (usuario, password) => {
    // Establece conexion con DB
    let conexion;
    try{
        conexion = await db();
        // Query
        const query = `SELECT mail, pass FROM usuarios WHERE mail = ?`;

        const [ results, fields ] = await conexion.query(query, [usuario]);

        const [{ email , pass }] = results;

        const comprobarPassword = await bcrypt.compare(password, pass);

        return comprobarPassword;
    }catch(error){
        console.error('Error al iniciar sesión del usuario:', error);
        throw new Error('No se pudo iniciar sesión del usuario.');
    }finally{
        if(conexion) await conexion.end(); 
    }
};

const consultarUsuario = async (usuario) => {
    let conexion; 
    try {
        conexion = await db(); // asignar dentro del try

        const query = `
            SELECT 
                US.usuarioId,
                US.UserId_New,
                US.mail,
                US.nombre,
                US.apellido,
                US.direccion,
                US.numeroExterior,
                US.numeroInterior,
                US.cPostal,
                US.calle1,
                US.calle2,
                US.municipio,
                US.colonia,
                US.estado,
                US.pais,
                US.lada,
                US.celular,
                US.rfc,
                US.razonSocial,
                US.correoValidado
            FROM usuarios US
            WHERE US.mail = ? OR US.usuarioId = ?
            LIMIT 1
        `;

        const [results] = await conexion.execute(query, [usuario, usuario]);
        return results;
    } catch (error) {
        console.error('Error al consultar usuario:', error);
        throw new Error('No se pudo consultar el usuario.');
    } finally {
        if (conexion) await conexion.end();
    }
};

const getUserById = async (usuarioId) => {
    const conexion = await db();
    try{
        const query = `
            SELECT 
                US.usuarioId,
                US.UserId_New,
                US.mail,
                US.nombre,
                US.apellido,
                US.direccion,
                US.numeroExterior,
                US.numeroInterior,
                US.cPostal,
                US.calle1,
                US.calle2,
                US.municipio,
                US.colonia,
                US.estado,
                US.pais,
                US.lada,
                US.celular,
                US.rfc,
                US.razonSocial,
                US.correoValidado
            FROM usuarios US
            WHERE US.UserId_New = ?
            LIMIT 1`;

        const [results] = await conexion.execute(query, [usuarioId]);
        return results;
    }catch(error){
        console.error('Error al consultar usuario por ID:', error);
        throw new Error('No se pudo consultar el usuario por ID.');
    }finally{
        if(conexion) await conexion.end(); 
    }
};

const SetShippingAddressModel = async (usuarioId, addressData) => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    };
    const conexion = await db();
    try{
        const query = `
            INSERT INTO shipping_addresses 
            (user_id, contact_name, phone, street, exterior_number, interior_number, cross_street_1, cross_street_2, neighborhood, city, state, country, postal_code, references_customer, is_primary, is_active, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())
        `;
        const [results] = await conexion.execute(query, [
            usuarioId,
            addressData.contact_name,
            addressData.phone,
            addressData.street,
            addressData.exterior_number,
            addressData.interior_number,
            addressData.cross_street_1,
            addressData.cross_street_2,
            addressData.neighborhood,
            addressData.city,
            addressData.state,
            addressData.country,
            addressData.postal_code,
            addressData.references_customer,
            addressData.is_primary ? 1 : 0
        ]);

        console.log("Resultado de la inserción de dirección de envío:", results);   

        response.ok = true;
        response.message = 'Dirección de envío guardada correctamente.';
        response.data = { insertId: results.insertId };
        response.exception = null;
        return response;
    }catch(error){
        console.error('Error al guardar la dirección de envío:', error);
        response.ok = false;
        response.message = 'Error al guardar la dirección de envío.';
        response.data = null;
        response.exception = error;
        return response;
    }finally{
        if(conexion) await conexion.end(); 
    }   
};

const checkUserByIdModel = async (usuario) => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    }  
    let conexion;

    try{
        conexion = await db();

        const query = `
            SELECT 
                * 
            FROM usuarios
            WHERE UserId_New = ?
            AND usuarioAdmin = 1;     
        `;

        const [ results, fields ] = await conexion.query(query, [usuario]);

        if(!results || results.length === 0){
            response.ok = false;
            response.message = 'El usuario no tiene permisos de administrador.';
            response.data = null;
            return response;
        }

        response.ok = true;
        response.message = 'Usuario administrador verificado correctamente.';
        response.data = results[0];
        return response;
    }catch(ex){
        response.ok = false;
        response.message = 'Error al comprobar usuario.';
        response.data = null;
        response.exception = ex;
        return response;
    }
};

const checkUserBuyByIdModel = async (idUsuario, status, productId) => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    }  
    let conexion;

    try{
        conexion = await db();

        const query = `
            SELECT 	
                *
            FROM Orders O
            INNER JOIN OrderItems OI
            ON O.OrderId = OI.OrderId
            WHERE O.UserId = ?
            AND O.Status = ?
            AND OI.ProductId = ?     
            LIMIT 1;
        `;

        const [ results, fields ] = await conexion.query(query, [idUsuario, status, productId]);

        if(!results || results.length === 0){
            response.ok = false;
            response.message = 'No se encontró una compra válida para este producto.';
            response.data = null;
            return response;
        }

        response.ok = true;
        response.message = 'Se encontro una compra válida para este producto.';
        response.data = results[0];
        return response;
    }catch(ex){
        response.ok = false;
        response.message = 'Error al comprobar la compra del producto.';
        response.data = null;
        response.exception = ex;
        return response;
    }
};

const comprobarUsuario = async (usuario) => {
    // Establece conexion con DB
    let conexion;
    try{
        conexion = await db();

        // Query
        const query =   `SELECT US.usuarioId 
                        FROM usuarios US WHERE mail = ? OR usuarioId = ?`;

        const [ results, fields ] = await conexion.query(query, [usuario, usuario]);

        return results;
    }catch(error){
        console.error('Error al comprobar el usuario:', error);
        throw error;
    }finally{
        if(conexion) await conexion.end(); 
    }
};

const comprobarUsuarioAdmin = async (usuario) => {
    // Establece conexion con DB
    let conexion;
    try{
        conexion = await db();

        // Query
        const query =   `SELECT US.usuarioId, US.usuarioAdmin
                        FROM usuarios US WHERE mail = ? OR usuarioId = ?`;

        const [ results, fields ] = await conexion.query(query, [usuario, usuario]);

        return results;
    }catch(error){
        console.error('Error al verificar si el usuario es administrador:', error);
        throw new Error('No se pudo verificar si el usuario es administrador.');
    }finally{
        if(conexion) await conexion.end(); 
    }
};

const consultarUsuarioAdmin = async (usuario) => {
        // Establece conexion con DB
        let conexion;
    try{
        conexion = await db();

        // Query
        const query =   `SELECT US.usuarioId, US.mail, US.nombre , US.apellido, US.direccion, US.numeroExterior, US.numeroInterior, US.cPostal, US.calle1, US.calle2, US.municipio, US.colonia, US.estado, US.pais, US.lada, US.celular, US.rfc, US.razonSocial, US.usuarioAdmin
                        FROM usuarios US WHERE mail = ? OR usuarioId = ?`;

        const [ results, fields ] = await conexion.query(query, [usuario, usuario]);

        return results;
    }catch(error){
        console.error('Error al consultar el usuario administrador:', error);
        throw new Error('No se pudo consultar el usuario administrador.');
    }finally{
        if(conexion) await conexion.end(); 
    }
};

const registrar = async (nombre ,usuario , password) => {
    // Establecer conexion DB
    let conexion;
    try{
        conexion = await db();

        // Hashear Password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const codigo = await generarCodigo();

        // Query
        let query =  `INSERT INTO usuarios (nombre, mail, pass, correoValidado, codigo, UserId_New) VALUES (?, ?, ?, 'F', ?, ?)`;
        await conexion.query(query, [nombre, usuario, password, codigo, crypto.randomUUID()]);

        query = `SELECT nombre, mail, codigo, token FROM usuarios WHERE mail = ?`;
        const [ results, fields ] = await conexion.query(query, [usuario]);

        return results;
    }catch(error){
        console.error('Error al registrar el usuario:', error);
        throw new Error('No se pudo registrar el usuario.');
    }finally{
        if(conexion) await conexion.end(); 
    }
}

const actualizarCodigo = async (email) => {
    // Establecer conexion DB
   let conexion;
    try{
        conexion = await db();

        // Renovar Token
        const codigo = generarCodigo();

        // Query
        let query =  `UPDATE usuarios SET codigo = ? WHERE mail = ?`;
        await conexion.query(query, [codigo, email]);

        query = `SELECT nombre, mail, codigo, token FROM usuarios WHERE mail = ?`;
        const [ results, fields ] = await conexion.query(query, [email]);

        return results;
    }catch(error){
        console.error('Error al actualizar el código del usuario:', error);
        throw new Error('No se pudo actualizar el código del usuario.');
    }finally{
        if(conexion) await conexion.end(); 
    }
}


const validarCodigo = async (codigo) => {
    let conexion;
    try{
        conexion = await db();

        const query = `SELECT nombre, mail, token, codigo, time_codigo FROM usuarios WHERE codigo = ?`;

        const [ results, fields ] = await conexion.query(query, [codigo]);

        return results;
    }catch(error){
        console.error('Error al validar el código:', error);
        throw new Error('No se pudo validar el código.');
    }finally{
        if(conexion) await conexion.end(); 
    } 
}

const confirmarCodigo = async (codigo) => {
    let conexion;
    try{
        conexion = await db();

        const query = `UPDATE usuarios SET codigo = '', correoValidado = 'T' WHERE codigo = ?`;

        const [ results, fields ] = await conexion.query(query, [codigo]);

        return results;
    }catch(error){
        console.error('Error al confirmar el código:', error);
        throw new Error('No se pudo confirmar el código.');
    }finally{
        if(conexion) await conexion.end(); 
    }
}


const actualizarToken = async (email) => {
    // Establecer conexion DB
   let conexion;
    try{
        conexion = await db();

        // Renovar Token
        const token = await generarToken();

        // Query
        let query =  `UPDATE usuarios SET token = ? WHERE mail = ?`;
        await conexion.query(query, [token, email]);

        query = `SELECT nombre, mail, codigo , token FROM usuarios WHERE mail = ?`;
        const [ results, fields ] = await conexion.query(query, [email]);

        return results;
    }catch(error){
        console.error('Error al actualizar el token del usuario:', error);
        throw new Error('No se pudo actualizar el token del usuario.');
    }finally{
        if(conexion) await conexion.end(); 
    }
}
    
const validarToken = async (token) => {
    // Establecer conexion DB
   let conexion;
    try{
        conexion = await db();

        const query = `SELECT nombre, mail, codigo, token, correoValidado, time_codigo FROM usuarios WHERE token = ?`;

        const [ results, fields ] = await conexion.query(query, [token]);

        return results;
    }catch(error){
        console.error('Error al validar el token:', error);
        throw new Error('No se pudo validar el token.');
    }finally{
        if(conexion) await conexion.end(); 
    } 
}

const confirmarToken = async (token) => {
    // Establecer conexion DB
   let conexion;
    try{
        conexion = await db();

        const query = `UPDATE usuarios SET token = '', correoValidado = 'T' WHERE token = ?`;
        await conexion.query(query, [token]);

        const [ results, fields ] = await conexion.query(query, [token]);

        return results;
    }catch(error){
        console.error('Error al confirmar el token:', error);
        throw new Error('No se pudo confirmar el token.');
    }finally{
        if(conexion) await conexion.end(); 
    }
}

const GetShippingAddressByUserIdModel = async (usuarioId) => {

    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    };

    let conexion;

    try {
        conexion = await db();

        const query = `
            SELECT 
                id,
                user_id,
                contact_name,
                phone,
                street,
                exterior_number,
                interior_number,
                cross_street_1,
                cross_street_2,
                neighborhood,
                city,
                state,
                country,
                postal_code,
                references_customer,
                is_primary,
                is_active,
                created_at,
                updated_at
            FROM shipping_addresses
            WHERE user_id = ?
              AND is_active = 1
            ORDER BY is_primary DESC, created_at DESC
        `;

        const [results] = await conexion.execute(query, [usuarioId]);
        // console.log("Este es el results de direciones de envío:");
        // console.log(results);

        const addresses = results.map(row => ({
            id: row.id,
            user_id: row.user_id,
            contact_name: row.contact_name,
            phone: row.phone,
            street: row.street,
            exterior_number: row.exterior_number,
            interior_number: row.interior_number,
            cross_street_1: row.cross_street_1,
            cross_street_2: row.cross_street_2,
            neighborhood: row.neighborhood,
            city: row.city,
            state: row.state,
            country: row.country,
            postal_code: row.postal_code,
            references_customer: row.references_customer,
            is_primary: row.is_primary,
            is_active: row.is_active,
            created_at: row.created_at,
            updated_at: row.updated_at
        }));

        response.ok = true;
        response.message = addresses.length > 0
            ? 'Direcciones de envío obtenidas correctamente.'
            : 'El usuario no tiene direcciones de envío registradas.';
        response.data = addresses;

    } catch (error) {
        response.ok = false;
        response.message = 'Error al obtener las direcciones de envío.';
        response.exception = error;
    } finally {
        if (conexion) await conexion.end();
    }

    return response;
};

const GetShippingAddressByIdShippingAddressModel = async (usuarioId, IdShippingAddress) => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    }
    const conexion = await db();
    try{
        const query = `
            SELECT 
                id AS IdShippingAddress
                , user_id AS UserName
                , contact_name AS NameContact
                , phone 
                , street
                , exterior_number
                , interior_number
                , cross_street_1
                , cross_street_2
                , neighborhood
                , city
                , state
                , country
                , postal_code
                , references_customer
                , is_primary
                , is_active
                , created_at
                , updated_at
            FROM shipping_addresses
            WHERE user_id = ?
            AND id = ?
            LIMIT 1
        `;

        const [results] = await conexion.execute(query, [usuarioId, IdShippingAddress]);

        response.ok = true;
        response.message = 'Dirección de envío obtenida correctamente.';
        response.data = results[0];
        response.exception= null;

        return response;
    }catch(error)
    {
        response.ok = false;
        response.message = 'Error al obtener la dirección de envío.';
        response.data = null;
        response.exception= error;
        return response;
    }
    finally{
        if(conexion) await conexion.end(); 
    }
};           

const GetAdminProfile = async () => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    }
    const conexion = await db();
    try{
        const query = `
            SELECT 
            id_configuracion
            , nombre_tienda
            , correo_contacto AS emailAdmin
            , telefono 
            , codigo_postal
            , estado
            , municipio 
            , colonia
            , direccion 
            , logo_url
        FROM ecommerce_configuracion
        LIMIT 1;
        `;

        const [results] = await conexion.execute(query);

        response.ok = true;
        response.message = 'Detalles de la configuración obtenidos correctamente.';
        response.data = results[0];
        response.exception= null;

        return response;
    }catch(error)
    {
        response.ok = false;
        response.message = 'Error al obtener la configuración.' + error.message;
        response.data = null;
        response.exception= error;
        return response;
    }
    finally{
        if(conexion) await conexion.end(); 
    }
};      

const GetSuscripcionByUser = async (email) => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    }
    const conexion = await db();
    try{
        const query = `
            SELECT 
                * 
            FROM ecommerce_suscriptores
            WHERE email = ?
            LIMIT 1;
        `;

        const [results] = await conexion.execute(query, [email]);

        response.ok = true;
        response.message = 'Detalles de la suscripción obtenidos correctamente.';
        response.data = results[0];
        response.exception= null;

        return response;
    }catch(error)
    {
        response.ok = false;
        response.message = 'Error al obtener la suscripción.' + error.message;
        response.data = null;
        response.exception= error;
        return response;
    }
    finally{
        if(conexion) await conexion.end(); 
    }
};

const SetSuscripcionByUser = async (email, ip) => {
    const response = {
        ok: false,
        message: '',
        data: null,
        exception: null
    }
    const conexion = await db();
    try{
        const query = `
            INSERT INTO ecommerce_suscriptores (email, ip_registro)
            VALUES (?, ?);
        `;

        const [results] = await conexion.execute(query, [email, ip]);
        response.ok = true;
        response.message = 'Suscripción registrada correctamente.';
        response.data = {
            id: results.insertId
        };
        return response;
    }catch(error){
        if(error.code === 'ER_DUP_ENTRY'){
            response.message = 'Este correo ya está suscrito.';
        }else{
            response.message = 'Error al registrar la suscripción: ' + error.message;
        }
        response.exception = error;
        return response;
    }finally{
        if(conexion) await conexion.end();
    }
};

export { existeUsuario
    , comprobarUsuario 
    ,consultarUsuario
    , registrar
    , validarToken
    , confirmarToken
    , iniciarUsuario
    , consultarUsuarioAdmin 
    , comprobarUsuarioAdmin
    , actualizarToken
    , actualizarCodigo
    , validarCodigo
    , confirmarCodigo
    , getUserById
    , GetShippingAddressByUserIdModel
    , GetShippingAddressByIdShippingAddressModel
    , SetShippingAddressModel
    , GetAdminProfile
    , checkUserByIdModel
    , GetSuscripcionByUser
    , SetSuscripcionByUser
    , checkUserBuyByIdModel
};