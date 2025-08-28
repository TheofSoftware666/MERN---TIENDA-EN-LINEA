import bcrypt from 'bcrypt';
import db from "../config/db.js";
import { generarCodigo, generarToken } from '../helpers/generarToken.js';

const existeUsuario = async (usuario) => {

    // Establece conexion con DB
    const conexion = await db();

    const query = `SELECT mail, nombre ,correoValidado FROM usuarios WHERE mail = '${usuario}'`;

    const  [ results, fields ] = await conexion.query(query);

    return results;

}

const iniciarUsuario = async (usuario, password) => {
      
    // Establece conexion con DB
    const conexion = await db();

    // Query
    const query = `SELECT mail, pass FROM usuarios WHERE mail = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    const [{ email , pass }] = results;

    const comprobarPassword = await bcrypt.compare(password, pass);

    return comprobarPassword;
};

const consultarUsuario = async (usuario) => {
      
    // Establece conexion con DB
    const conexion = await db();

    // Query
    const query =   `SELECT 
                        US.usuarioId
                        , US.mail
                        , US.nombre 
                        , US.apellido
                        , US.direccion
                        , US.numeroExterior
                        , US.numeroInterior
                        , US.cPostal
                        , US.calle1
                        , US.calle2
                        , US.municipio
                        , US.colonia
                        , US.estado
                        , US.pais
                        , US.lada
                        , US.celular
                        , US.rfc
                        , US.razonSocial
                        , US.token
                        , US.correoValidado
                    FROM usuarios US 
                    WHERE mail = '${usuario}' 
                    OR usuarioId = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
};

const comprobarUsuario = async (usuario) => {
      
    // Establece conexion con DB
    const conexion = await db();

    // Query
    const query =   `SELECT US.usuarioId 
                    FROM usuarios US WHERE mail = '${usuario}' OR usuarioId = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
};

const comprobarUsuarioAdmin = async (usuario) => {
      
    // Establece conexion con DB
    const conexion = await db();

    // Query
    const query =   `SELECT US.usuarioId, US.usuarioAdmin
                    FROM usuarios US WHERE mail = '${usuario}' OR usuarioId = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
};

const consultarUsuarioAdmin = async (usuario) => {
      
    // Establece conexion con DB
    const conexion = await db();

    // Query
    const query =   `SELECT US.usuarioId, US.mail, US.nombre , US.apellido, US.direccion, US.numeroExterior, US.numeroInterior, US.cPostal, US.calle1, US.calle2, US.municipio, US.colonia, US.estado, US.pais, US.lada, US.celular, US.rfc, US.razonSocial, US.usuarioAdmin
                    FROM usuarios US WHERE mail = '${usuario}' OR usuarioId = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
};

const registrar = async (nombre ,usuario , password) => {
    
    // Establecer conexion DB
    const conexion = await db();

    // Hashear Password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const codigo = await generarCodigo();

    // Query
    let query =  `INSERT INTO usuarios (nombre, mail, pass, correoValidado, codigo) VALUES ('${nombre}','${usuario}','${password}','F','${codigo}')`;
    await conexion.query(query);

    query = `SELECT nombre, mail, codigo, token FROM usuarios WHERE mail = '${usuario}'`;
    const [ results, fields ] = await conexion.query(query);

    return results;
}

const actualizarCodigo = async (email) => {

     // Establecer conexion DB
    const conexion = await db();

    // Renovar Token
    const codigo = generarCodigo();

    // Query
    let query =  `UPDATE usuarios SET codigo = '${codigo}' WHERE mail = '${email}';`;
    await conexion.query(query);

    query = `SELECT nombre, mail, codigo, token FROM usuarios WHERE mail = '${email}'`;
    const [ results, fields ] = await conexion.query(query);

    return results;
}


const validarCodigo = async (codigo) => {

    const conexion = await db();

    const query = `SELECT nombre, mail, token, codigo, time_codigo FROM usuarios WHERE codigo = '${codigo}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

const confirmarCodigo = async (codigo) => {

    const conexion = await db();

    const query = `UPDATE usuarios SET codigo = '', correoValidado = 'T' WHERE codigo = '${codigo}' `;

    const [ results, fields ] = await conexion.query(query);

    return results;
}


const actualizarToken = async (email) => {

     // Establecer conexion DB
    const conexion = await db();

    // Renovar Token
    const token = await generarToken();

    // Query
    let query =  `UPDATE usuarios SET token = '${token}' WHERE mail = '${email}';`;
    await conexion.query(query);

    query = `SELECT nombre, mail, codigo , token FROM usuarios WHERE mail = '${email}'`;
    const [ results, fields ] = await conexion.query(query);

    return results;
}

const validarToken = async (token) => {

    const conexion = await db();

    const query = `SELECT nombre, mail, codigo, token, correoValidado, time_codigo FROM usuarios WHERE token = '${token}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

const confirmarToken = async (token) => {

    const conexion = await db();

    const query = `UPDATE usuarios SET token = '', correoValidado = 'T' WHERE token = '${token}' `;

    const [ results, fields ] = await conexion.query(query);

    return results;
}


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
};