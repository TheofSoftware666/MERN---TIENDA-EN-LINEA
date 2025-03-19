import bcrypt from 'bcrypt';
import db from "../config/db.js";
import { generarToken } from '../helpers/generarToken.js';

const existeUsuario = async (usuario) => {

    // Establece conexion con DB
    const conexion = await db();

    const query = `SELECT mail FROM usuarios WHERE mail = '${usuario}'`;

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
    const query = `SELECT * FROM usuarios WHERE mail = '${usuario}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
};

const registrar = async (usuario , password) => {
    
    // Establecer conexion DB
    const conexion = await db();

    // Hashear Password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const token = await generarToken();

    // Query
    let query =  `INSERT INTO usuarios (mail, pass, correoValidado, token) VALUES ('${usuario}','${password}','F','${token}')`;

    await conexion.query(query);
}

const validarToken = async (token) => {

    const conexion = await db();

    const query = `SELECT token FROM usuarios WHERE token = '${token}'`;

    const [ results, fields ] = await conexion.query(query);

    return results;
}

const confirmarToken = async (token) => {

    const conexion = await db();

    const query = `UPDATE usuarios SET token = '', correoValidado = 'T' WHERE token = '${token}' `;

    const [ results, fields ] = await conexion.query(query);

    return results;
}


export { existeUsuario, consultarUsuario, registrar, validarToken, confirmarToken, iniciarUsuario };