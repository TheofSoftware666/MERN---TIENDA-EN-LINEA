import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import { GetConfigEcoModel
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
  } from '../models/tienda.js';
import { comprobarUsuarioAdmin, consultarUsuarioAdmin } from '../models/usuario.js';
import { error } from "console";

const GetConfigEco = async (req, res) => {
    try{
        const { usuario } = req;
        
        // validar usuario
        const usuarioAdmin = await comprobarUsuarioAdmin(usuario[0].usuarioId);
        
        if(usuarioAdmin[0].usuarioAdmin == 0){
            const error = new Error("El token caduco o no es valido. ");
            return res.status(404).json({ msg : error.message })
        }

        // Consultar la tienda
        const response = await GetConfigEcoModel();

        return res.json({ tienda : response});

    }catch(e){
        const error = new Error("Tienda no encontrada");
        return res.status(404).json({ msg : error.message })
    }   
}

const SetConfigEco = async (req, res) => {
  try {
    const { 
      nombreTienda, correoContacto, telefono, EstadoMexico, codigoPostal, colonia, direccion, municipio,
      colorPrimario, descripcion, telefono1, correo1,
      facebook, Instagram, youtube, Linkedin,
      Pregunta1, Respuesta1, Pregunta2, Respuesta2, Pregunta3, Respuesta3,
      politicaDevoluciones, tituloDevolucion1, descripcionDevolucion1,
      tituloDevolucion2, descripcionDevolucion2, tituloDevolucion3, descripcionDevolucion3,
      visa, mastercard, payPal, applePay, stripe,
      logo
    } = req.body;

    const file = req?.files || null;

    const camposObligatorios = [
      { campo: nombreTienda, nombre: "nombreTienda" },
      { campo: correoContacto, nombre: "correoContacto" },
      { campo: telefono, nombre: "telefono" },
      { campo: EstadoMexico, nombre: "EstadoMexico" },
      { campo: codigoPostal, nombre: "codigoPostal" },
      { campo: colonia, nombre: "colonia" },
      { campo: direccion, nombre: "direccion" },
      { campo: municipio, nombre: "municipio" },
      // { campo: colorPrimario, nombre: "colorPrimario" },
      { campo: descripcion, nombre: "descripcion" },
    ];

    const faltantes = camposObligatorios.filter(x => !x.campo || x.campo.trim() === "");

    if (faltantes.length > 0) {
      return res.status(400).json({
        msg: `Faltan los siguientes campos obligatorios: ${faltantes.map(f => f.nombre).join(", ")}`
      });
    }

    if (!file) {
      return res.status(400).json({ msg: "Debe subir un logotipo de la tienda." });
    }

    const FileName = file[0];

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(correoContacto)) {
      return res.status(400).json({ msg: "El correo de contacto no es válido." });
    }

    const datosRequeridos = {
      nombreTienda,
      correoContacto,
      telefono,
      EstadoMexico,
      codigoPostal,
      colonia,
      direccion,
      colorPrimario,
      descripcion,
      municipio,
      logo: file ? file.name : logo || null
    };

    const datosSocialMedia = {
      facebook,
      Instagram,
      youtube,
      Linkedin
    };

    const datosFaqs = {
      Pregunta1,
      Respuesta1,
      Pregunta2,
      Respuesta2,
      Pregunta3,
      Respuesta3
    };

    const datosDevolutionPolicy = {
      politicaDevoluciones,
      tituloDevolucion1,
      descripcionDevolucion1,
      tituloDevolucion2,
      descripcionDevolucion2,
      tituloDevolucion3,
      descripcionDevolucion3
    };

    const datosPaymentMethod = {
      visa,
      mastercard,
      payPal,
      applePay,
      stripe
    };

    const tieneFaqs = Pregunta1?.trim() && Respuesta1?.trim();

    const tienePoliticaDevolucion = 
      politicaDevoluciones?.trim() &&
      tituloDevolucion1?.trim() &&
      descripcionDevolucion1?.trim();

    const metodosActivos = Object.values(datosPaymentMethod).filter(v => v === true || v === "true" || v == 1);
    if (metodosActivos.length < 3) {
      return res.status(400).json({ error: "Debe activar al menos 3 métodos de pago." });
    }

    if (!tieneFaqs) {
      const error =  new Error("Es necesario registrar las preguntas frecuentes. ");
      return res.status(400).json({
        error: error.message
      });
    }
    
    if (!tienePoliticaDevolucion) {
      const error =  new Error("Es necesario registrar las politicas de Devolucion. ");
      return res.status(400).json({
        error: error.message
      });
    } 

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Crear carpeta si no existe
    const uploadDir = path.join(__dirname, "../uploads/ecommerceLogo");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Tomar el nombre original del archivo
    const fileName = FileName.originalname;

    // Ruta final completa
    const filePath = path.join(uploadDir, fileName);

    // Guardar el archivo en disco
    fs.writeFileSync(filePath, FileName.buffer);

    console.log(`✅ Archivo "${fileName}" guardado correctamente en: ${filePath}`);

    await SetConfigEcoModel(nombreTienda, correoContacto, telefono, EstadoMexico, codigoPostal, colonia, direccion, "/uploads/ecommerceLogo/" + fileName, descripcion, telefono1, correo1, municipio);

    const responseId = await GetConfigEcoModel();

    if(!responseId || responseId == undefined || responseId == null){ 
      const error =  new Error("No se pudo obtener el ID de configuración después de guardar.");
      return res.status(400).json({
        error: error.message
      });
    }

    if (Object.values(datosSocialMedia).some(v => v && v.trim() !== "")) {
      for (const [name, link] of Object.entries(datosSocialMedia)) {
        if (link && link.trim() !== "") {
          await SetSocialMediaModel(responseId.config.id_configuracion, name, link);
        }
      }
    }

    // FAQs
    for (let i = 1; i <= 3; i++) {
      const pregunta = datosFaqs[`Pregunta${i}`];
      const respuesta = datosFaqs[`Respuesta${i}`];
      if (pregunta && respuesta) {
        console.log(responseId.config.id_configuracion, pregunta, respuesta);
        await SetFaqsEcoModel(responseId.config.id_configuracion, pregunta, respuesta);
      }
    }

    // Políticas de devolución
    for (let i = 1; i <= 3; i++) {
      const titulo = datosDevolutionPolicy[`tituloDevolucion${i}`];
      const descripcion = datosDevolutionPolicy[`descripcionDevolucion${i}`];
      if (titulo && descripcion) {
        await SetDevolutionPolicyModel(responseId.config.id_configuracion, titulo, descripcion);
      }
    }

    // Métodos de pago
    for (const [methodName, isEnabled] of Object.entries(datosPaymentMethod)) {
      if (isEnabled === 'true') {
        await SetPaymentMethodModel(responseId.config.id_configuracion, methodName, true);
      }
    }
  
    res.status(200).json({ msg: "Configuración actualizada correctamente." });

  } catch (e) {
    console.error("❌ Error en SetConfigEco:", e);
    res.status(500).json({ error: "Ocurrió un error inesperado al actualizar la configuración." });
  }
};

const UpdateConfigEco = async (req, res) => {
  try {
    const { 
      idConfiguracion,
      nombreTienda, correoContacto, telefono, EstadoMexico, codigoPostal, colonia, direccion, municipio,
      colorPrimario, descripcion, telefono1, correo1,
      facebook, Instagram, youtube, Linkedin,
      Pregunta1, Respuesta1, Pregunta2, Respuesta2, Pregunta3, Respuesta3,
      politicaDevoluciones, tituloDevolucion1, descripcionDevolucion1,
      tituloDevolucion2, descripcionDevolucion2, tituloDevolucion3, descripcionDevolucion3,
      visa, mastercard, payPal, applePay, stripe,
      logo
    } = req.body;

    const file = req?.files[0] || null;

    if (!idConfiguracion) {
      return res.status(400).json({ error: "id de Configuracion no valido. " });
    }

    const configActual = await GetConfigEcoModelById(idConfiguracion);

    if (!configActual) {
      return res.status(404).json({ msg: "No se encontró la configuración especificada." });
    }

    const nuevosDatos = {
      nombreTienda: nombreTienda ?? configActual.nombre_tienda,
      correoContacto: correoContacto ?? configActual.correo_contacto,
      telefono: telefono ?? configActual.telefono,
      EstadoMexico: EstadoMexico ?? configActual.estado,
      codigoPostal: codigoPostal ?? configActual.codigo_postal,
      colonia: colonia ?? configActual.colonia,
      direccion: direccion ?? configActual.direccion,
      municipio: municipio ?? configActual.municipio,
      colorPrimario: colorPrimario ?? configActual.color_primario,
      descripcion: descripcion ?? configActual.descripcion,
      logo: file && file != null ? file[0].originalname : configActual.logo_url,
      telefono1: telefono1 ?? configActual.telefono_adicional,
      correo1: correo1 ?? configActual.correo_contacto_adicional
    };

    await UpdateConfigEcoModel(idConfiguracion, nuevosDatos);

    const redes = { facebook, Instagram, youtube, Linkedin };
    if (Object.values(redes).some(v => v && v.trim() !== "")) {
      await DeleteSocialMediaModel(idConfiguracion); // Eliminamos las actuales
      for (const [name, link] of Object.entries(redes)) {
        if (link && link.trim() !== "") {
          await SetSocialMediaModel(idConfiguracion, name, link);
        }
      }
    }

    await DeleteFaqsEcoModel(idConfiguracion);
    for (let i = 1; i <= 3; i++) {
      const pregunta = req.body[`Pregunta${i}`];
      const respuesta = req.body[`Respuesta${i}`];
      if (pregunta && respuesta) {
        await SetFaqsEcoModel(idConfiguracion, pregunta, respuesta);
      }
    }

    await DeleteDevolutionPolicyModel(idConfiguracion);
    for (let i = 1; i <= 3; i++) {
      const titulo = req.body[`tituloDevolucion${i}`];
      const descripcion = req.body[`descripcionDevolucion${i}`];
      if (titulo && descripcion) {
        await SetDevolutionPolicyModel(idConfiguracion, titulo, descripcion);
      }
    }

    const metodosPago = { visa, mastercard, payPal, applePay, stripe };
    await DeletePaymentMethodModel(idConfiguracion);
    for (const [methodName, isEnabled] of Object.entries(metodosPago)) {
      await SetPaymentMethodModel(idConfiguracion, methodName, isEnabled === 'true' ? true : false);
    }

    console.log("se actualizo correctamente");
    return res.status(200).json({ msg: "Configuración actualizada correctamente." });

  } catch (e) {
    console.error("❌ Error en UpdateConfigEco:", e);
    res.status(500).json({ msg: "Ocurrió un error inesperado al actualizar la configuración." });
  }
};

export { GetConfigEco, SetConfigEco, UpdateConfigEco };