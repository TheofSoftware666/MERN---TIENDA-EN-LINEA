import nodemailer from 'nodemailer';
import { verificarCuenta } from '../utils/mailVerificarCuenta.js';
import { cuentaValidada } from '../utils/mailCuentaValidada.js';
import { restablecerPassword } from '../utils/mailRestablecePassword.js'
import { suscriptionMail } from '../utils/mails/mailSuscripcion.js';
import { response } from 'express';

function conexionEmail() {
  return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'marcoricovaladez172@gmail.com',
                pass: 'jhor vwbv qbwi rjwk ', // ⚠️ Usa una "App Password" si tienes 2FA activado
            },
        });
}

const sendMailClientNewOrderByUser = async (nameAdmin, subject, nameClient, correoDestino ) => {
  try {
      const transporter = conexionEmail();
      const mailOptions = {
        from: '"Building Technology" <marcoricovaladez172@gmail.com>',
        to: correoDestino,
        subject: '¡Nuevo Pedido!',
        html: verificarCuenta(nombre, pedido),
      };

      const info = await transporter.sendMail(mailOptions);
      
      return 'Correo enviado: ' + info.response;
    } catch (error) {
      return 'Error al enviar: ' + error.message;
    }
}

const sendMailAdminNewOrderByUser = async (nameAdmin, subject, nameClient, correoDestino ) => {
  try {
      const transporter = conexionEmail();
      const mailOptions = {
        from: '"Building Technology" <marcoricovaladez172@gmail.com>',
        to: correoDestino,
        subject: '¡Nuevo Pedido!',
        html: verificarCuenta(nombre, pedido),
      };

      const info = await transporter.sendMail(mailOptions);
      
      return 'Correo enviado: ' + info.response;
    } catch (error) {
      return 'Error al enviar: ' + error.message;
    }
}

const sendMailEstatusPedidos = async (correoDestino, nombre, pedido, estatus, direccion) => {
    try {
        const transporter = conexionEmail();
        const mailOptions = {
          from: '"Building Technology" <marcoricovaladez172@gmail.com>',
          to: correoDestino,
          subject: '¡Nuevo Pedido!',
          html: verificarCuenta(nombre, pedido),
        };

        const info = await transporter.sendMail(mailOptions);
        
        return 'Correo enviado: ' + info.response;
    } catch (error) {
        return 'Error al enviar: ' + error.message;
    }
};

const sendMailVerificar = async (correoDestino, nombre, token) => {
    try {

      // From, Subject - Base de datos 
      const subject = "Verifica tu cuenta";

      const transporter = conexionEmail();
      const mailOptions = {
        from: '"Building Technology" <marcoricovaladez172@gmail.com>',
        to: correoDestino,
        subject: subject,
        html: verificarCuenta(nombre, token),
      };

      const info = await transporter.sendMail(mailOptions);
      return 'Correo enviado: ' + info.response;

    } catch (error) {
        return 'Error al enviar: Ocurrio un error al inesperado al enviar el correo' + error;
    }
};

const sendMailCuentaVerificada = async (correoDestino, nombre) => {
    try {

      // From, Subject - Base de datos 
      const subject = `${nombre} - Cuenta Verificada`;

      const transporter = conexionEmail();
      const mailOptions = {
        from: '"Building Technology" <marcoricovaladez172@gmail.com>',
        to: correoDestino,
        subject: subject,
        html: cuentaValidada(nombre),
      };

      const info = await transporter.sendMail(mailOptions);
      return 'Correo enviado: ' + info.response;

    } catch (error) {
        return 'Error al enviar: Ocurrio un error al inesperado al enviar el correo' + error;
    }
};

const sendMailTokenPassword = async (correoDestino, nombre, token) => {
  try {

      // From, Subject - Base de datos 
      const subject = `${nombre} - Reestablece tu contraseña`;

      const transporter = conexionEmail();
      const mailOptions = {
        from: '"Building Technology" <marcoricovaladez172@gmail.com>',
        to: correoDestino,
        subject: subject,
        html: restablecerPassword(nombre, token),
      };

      const info = await transporter.sendMail(mailOptions);
      return 'Correo enviado: ' + info.response;

    } catch (error) {
        return 'Error al enviar: Ocurrio un error al inesperado al enviar el correo' + error;
    }
}

const sendMailEcommerceSuscription = async (correoDestino) => {
  const response = {
    ok: true,
    message: "Correo de promoción enviado correctamente"
  };
  
  try {
      // From, Subject - Base de datos 
      const subject = `Bienvenid@ 🙌 Ya formas parte de nuestra comunidad`;
      const transporter = conexionEmail();
      const mailOptions = {
        from: '"Altisys" <marcoricovaladez172@gmail.com>',
        to: correoDestino,
        subject: subject,
        html: suscriptionMail(),
      };

      const info = await transporter.sendMail(mailOptions);
      response.ok = true;
      response.message = 'Correo enviado: ' + info.response;
      return response;

    } catch (error) {
        response.ok = false;
        response.message = 'Error al enviar: Ocurrio un error al inesperado al enviar el correo' + error;
        return response;
    }
}


export { sendMailEstatusPedidos, sendMailVerificar, sendMailCuentaVerificada, sendMailTokenPassword, sendMailEcommerceSuscription};
