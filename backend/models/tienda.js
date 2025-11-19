import db from '../config/db.js'
import mysql from 'mysql2/promise';

const GetIdConfigModel = async () => {
  try {
    const connection = await db();

    const [config] = await connection.query(
      `SELECT id_configuracion
       FROM ecommerce_configuracion
       ORDER BY id_configuracion DESC
       LIMIT 1`
    );

    if (!config.length) return null; // No hay configuración aún
    return config[0].id_configuracion;

  } catch (e) {
    console.error("❌ Error al obtener el ID de configuración:", e);
    throw e;
  }
};  

const GetConfigEcoModel = async () => {
  try {
    const connection = await db();

    // Obtener la configuración principal de la tienda
    const [config] = await connection.query(
      `SELECT *
       FROM ecommerce_configuracion
       ORDER BY id_configuracion DESC
       LIMIT 1`
    );

    if (!config.length) return null; // No hay configuración aún

    const idConfiguracion = config[0].id_configuracion;

    // Obtener redes sociales
    const [socialMedia] = await connection.query(
      `SELECT nombre_red, url 
       FROM ecommerce_redes_sociales 
       WHERE id_configuracion = ?`, 
      [idConfiguracion]
    );

    // Obtener FAQs
    const [faqs] = await connection.query(
      `SELECT pregunta, respuesta 
       FROM ecommerce_faqs 
       WHERE id_configuracion = ?`, 
      [idConfiguracion]
    );

    // Obtener políticas de devoluciones
    const [devoluciones] = await connection.query(
      `SELECT titulo, descripcion 
       FROM ecommerce_devoluciones 
       WHERE id_configuracion = ?`, 
      [idConfiguracion]
    );

    // Obtener métodos de pago
    const [metodosPago] = await connection.query(
      `SELECT nombre_metodo, activo, clave_publica, clave_secreta, credenciales_json 
       FROM ecommerce_metodos_pago 
       WHERE id_configuracion = ?`, 
      [idConfiguracion]
    );

    // Armar objeto completo para frontend
    const result = {
      config: config[0],
      socialMedia,
      faqs,
      devoluciones,
      metodosPago
    };

    return result;

  } catch (e) {
    console.error("❌ Error al obtener la configuración del ecommerce:", e);
    throw e;
  }
};

const SetConfigEcoModel = async (
  nombreTienda,
  correoContacto,
  telefono,
  EstadoMexico,
  codigoPostal,
  colonia,
  direccion,
  logo,
  descripcion,
  telefonoAdicional,
  correoAdicional,
  municipio
) => {
  try {
    const connection = await db();

    const [results] = await connection.query(`
      INSERT INTO ecommerce_configuracion (
          nombre_tienda,
          correo_contacto,
          correo_contacto_adicional,
          telefono,
          telefono_adicional,
          direccion,
          colonia,
          codigo_postal,
          municipio,
          estado,
          descripcion,
          logo_url,
          fecha_creacion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      nombreTienda,
      correoContacto,
      correoAdicional,
      telefono,
      telefonoAdicional,
      direccion,
      colonia,
      codigoPostal,
      municipio,
      EstadoMexico,
      descripcion,
      logo
    ]);

    return results;

  } catch (e) {
    console.log("❌ Error al guardar configuración:", e);
    throw e;
  }
};

// const UpdateConfigEcoModel = async (
//   idConfiguracion,
//   nombreTienda,
//   correoContacto,
//   telefono,
//   EstadoMexico,
//   codigoPostal,
//   colonia,
//   direccion,
//   logo,
//   descripcion,
//   telefonoAdicional,
//   correoAdicional,
//   municipio
// ) => {
//   try {
//     const connection = await db();

//     const [results] = await connection.query(`
//       UPDATE ecommerce_configuracion
//       SET 
//         nombre_tienda = ?,
//         correo_contacto = ?,
//         correo_contacto_adicional = ?,
//         telefono = ?,
//         telefono_adicional = ?,
//         direccion = ?,
//         colonia = ?,
//         codigo_postal = ?,
//         municipio = ?,
//         estado = ?,
//         descripcion = ?,
//         logo_url = ?,
//         fecha_actualizacion = NOW()
//       WHERE id_configuracion = ?
//     `, [
//       nombreTienda,
//       correoContacto,
//       correoAdicional,
//       telefono,
//       telefonoAdicional,
//       direccion,
//       colonia,
//       codigoPostal,
//       municipio,
//       EstadoMexico,
//       descripcion,
//       logo,
//       idConfiguracion
//     ]);

//     return results;

//   } catch (e) {
//     console.error("❌ Error al actualizar configuración:", e);
//     throw e;
//   }
// };

const SetSocialMediaModel = async (idConfiguracion , nameSocialM, link) => {
  try {

    const connection = await db();

    const [results] = await connection.query(
      `
      INSERT INTO ecommerce_redes_sociales 
        (id_configuracion, nombre_red, url, fecha_creacion)
      VALUES (?, ?, ?, NOW())
      `,
      [idConfiguracion, nameSocialM, link]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al registrar red social:", e);
    throw e;
  }
};

const UpdateSocialMediaModel = async (idConfiguracion, nameSocialM, newLink) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      UPDATE ecommerce_redes_sociales
      SET url = ?, fecha_actualizacion = NOW()
      WHERE id_configuracion = ? AND nombre_red = ?
      `,
      [newLink, idConfiguracion, nameSocialM]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al actualizar red social:", e);
    throw e;
  }
};

const SetFaqsEcoModel = async (idConfiguracion, question, answer) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      INSERT INTO ecommerce_faqs 
        (id_configuracion, pregunta, respuesta, fecha_creacion)
      VALUES (?, ?, ?, NOW())
      `,
      [idConfiguracion, question, answer]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al registrar FAQ:", e);
    throw e;
  }
};

const UpdateFaqsEcoModel = async (idConfiguracion, question, newAnswer) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      UPDATE ecommerce_faqs
      SET respuesta = ?, fecha_actualizacion = NOW()
      WHERE id_configuracion = ? AND pregunta = ?
      `,
      [newAnswer, idConfiguracion, question]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al actualizar FAQ:", e);
    throw e;
  }
};

const SetDevolutionPolicyModel = async (idConfiguracion, title, description) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      INSERT INTO ecommerce_devoluciones 
        (id_configuracion, titulo, descripcion, fecha_creacion)
      VALUES (?, ?, ?, NOW())
      `,
      [idConfiguracion, title, description]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al registrar política de devolución:", e);
    throw e;
  }
};

const UpdateDevolutionPolicyModel = async (idConfiguracion, title, description) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      UPDATE ecommerce_devoluciones
      SET descripcion = ?, fecha_actualizacion = NOW()
      WHERE id_configuracion = ? AND titulo = ?
      `,
      [description, idConfiguracion, title]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al actualizar política de devolución:", e);
    throw e;
  }
};

const SetPaymentMethodModel = async (idConfiguracion, methodName, isEnabled, publicKey = null, secretKey = null, credentials = null) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      INSERT INTO ecommerce_metodos_pago
        (id_configuracion, nombre_metodo, activo, clave_publica, clave_secreta, credenciales_json, fecha_actualizacion)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
      `,
      [idConfiguracion, methodName, isEnabled ? 1 : 0, publicKey, secretKey, credentials ? JSON.stringify(credentials) : null]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al registrar método de pago:", e);
    throw e;
  }
};

const UpdatePaymentMethodModel = async (idConfiguracion, methodName, isEnabled, publicKey = null, secretKey = null, credentials = null) => {
  try {
    const connection = await db();

    const [results] = await connection.query(
      `
      UPDATE ecommerce_metodos_pago
      SET activo = ?,
          clave_publica = ?,
          clave_secreta = ?,
          credenciales_json = ?,
          fecha_actualizacion = NOW()
      WHERE id_configuracion = ? AND nombre_metodo = ?
      `,
      [isEnabled, publicKey, secretKey, credentials ? JSON.stringify(credentials) : null, idConfiguracion, methodName]
    );

    return results;

  } catch (e) {
    console.error("❌ Error al actualizar método de pago:", e);
    throw e;
  }
};

const GetConfigEcoModelById = async (idConfiguracion) => {
  const connection = await db();
  const [rows] = await connection.query(
    "SELECT * FROM ecommerce_configuracion WHERE id_configuracion = ?",
    [idConfiguracion]
  );
  return rows[0];
};

const UpdateConfigEcoModel = async (idConfiguracion, datos) => {
  try{
    const connection = await db();
    await connection.query(
    `
    UPDATE ecommerce_configuracion 
    SET 
      nombre_tienda = ?, correo_contacto = ?, telefono = ?, estado = ?, codigo_postal = ?, 
      colonia = ?, direccion = ?, municipio = ?, color_primario = ?, descripcion = ?, 
      logo_url = ?, telefono_adicional = ?, correo_contacto_adicional = ?, fecha_actualizacion = NOW()
    WHERE id_configuracion = ?
    `,
    [
      datos.nombreTienda, datos.correoContacto, datos.telefono, datos.EstadoMexico, datos.codigoPostal,
      datos.colonia, datos.direccion, datos.municipio, datos.colorPrimario, datos.descripcion,
      datos.logo, datos.telefono1, datos.correo1, idConfiguracion
    ]
  );
  }catch(ex){

  }
};

const DeleteSocialMediaModel = async (idConfiguracion) => {
  const connection = await db();
  await connection.query("DELETE FROM ecommerce_redes_sociales WHERE id_configuracion = ?", [idConfiguracion]);
};

const DeleteFaqsEcoModel = async (idConfiguracion) => {
  const connection = await db();
  await connection.query("DELETE FROM ecommerce_faqs WHERE id_configuracion = ?", [idConfiguracion]);
};

const DeleteDevolutionPolicyModel = async (idConfiguracion) => {
  const connection = await db();
  await connection.query("DELETE FROM ecommerce_devoluciones WHERE id_configuracion = ?", [idConfiguracion]);
};

const DeletePaymentMethodModel = async (idConfiguracion) => {
  const connection = await db();
  await connection.query("DELETE FROM ecommerce_metodos_pago WHERE id_configuracion = ?", [idConfiguracion]);
};


export { GetIdConfigModel
  , GetConfigEcoModel
  , SetConfigEcoModel
  , UpdateConfigEcoModel
  , SetSocialMediaModel
  , UpdateSocialMediaModel
  , SetFaqsEcoModel
  , UpdateFaqsEcoModel
  , SetDevolutionPolicyModel
  , UpdateDevolutionPolicyModel
  , SetPaymentMethodModel
  , UpdatePaymentMethodModel
  , GetConfigEcoModelById
  , DeleteSocialMediaModel
  , DeleteFaqsEcoModel
  , DeleteDevolutionPolicyModel
  , DeletePaymentMethodModel
};