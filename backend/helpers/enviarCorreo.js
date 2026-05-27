import 'dotenv/config'; 
import { Resend } from 'resend';

import { verificarCuenta } from '../utils/mailVerificarCuenta.js';
import { cuentaValidada } from '../utils/mailCuentaValidada.js';
import { restablecerPassword } from '../utils/mailRestablecePassword.js';
import { suscriptionMail } from '../utils/mails/mailSuscripcion.js';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

const FROM = 'Altisys <marco.rico@altisyscorp.com>'; 

const sendMailClientNewOrderByUser = async (nameAdmin, emailAdmin, correoDestino, pedido) => {
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: '¡Tu pedido ha sido recibido!',
      html: verificarCuenta(nameAdmin, pedido), // reemplaza por tu template de orden cliente
    });
    if (error) throw error;
    return 'Correo enviado correctamente';
  } catch (error) {
    return 'Error al enviar: ' + error.message;
  }
};

const sendMailAdmintNewOrderByUser = async (nameAdmin, emailAdmin, correoDestino, pedido) => {
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: '¡Nuevo Pedido recibido!',
      html: verificarCuenta(nameAdmin, pedido), // reemplaza por tu template de orden admin
    });
    if (error) throw error;
    return 'Correo enviado correctamente';
  } catch (error) {
    return 'Error al enviar: ' + error.message;
  }
};

const sendMailEstatusPedidos = async (correoDestino, nombre, pedido, estatus, direccion) => {
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: `Actualización de tu pedido - ${estatus}`,
      html: verificarCuenta(nombre, pedido),
    });
    if (error) throw error;
    return 'Correo enviado correctamente';
  } catch (error) {
    return 'Error al enviar: ' + error.message;
  }
};

const sendMailVerificar = async (correoDestino, nombre, token) => {
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: 'Verifica tu cuenta',
      html: verificarCuenta(nombre, token),
    });
    if (error) throw error;
    return 'Correo enviado correctamente';
  } catch (error) {
    return 'Error al enviar: ' + error.message;
  }
};

const sendMailCuentaVerificada = async (correoDestino, nombre) => {
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: `${nombre} - Cuenta Verificada`,
      html: cuentaValidada(nombre),
    });
    if (error) throw error;
    return 'Correo enviado correctamente';
  } catch (error) {
    return 'Error al enviar: ' + error.message;
  }
};

const sendMailTokenPassword = async (correoDestino, nombre, token) => {
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: `${nombre} - Reestablece tu contraseña`,
      html: restablecerPassword(nombre, token),
    });
    if (error) throw error;
    return 'Correo enviado correctamente';
  } catch (error) {
    return 'Error al enviar: ' + error.message;
  }
};

const sendMailEcommerceSuscription = async (correoDestino) => {
  const response = { ok: false, message: '' };
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: correoDestino,
      subject: 'Bienvenid@ 🙌 Ya formas parte de nuestra comunidad',
      html: suscriptionMail(),
    });
    if (error) throw error;
    response.ok = true;
    response.message = 'Correo enviado correctamente';
    return response;
  } catch (error) {
    response.ok = false;
    response.message = 'Error al enviar: ' + error.message;
    return response;
  }
};

export {
  sendMailClientNewOrderByUser,
  sendMailAdmintNewOrderByUser,
  sendMailEstatusPedidos,
  sendMailVerificar,
  sendMailCuentaVerificada,
  sendMailTokenPassword,
  sendMailEcommerceSuscription
};