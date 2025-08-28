import nodemailer from 'nodemailer';
import { verificarCuenta } from '../utils/mailVerificarCuenta.js';
import { cuentaValidada } from '../utils/mailCuentaValidada.js';
import { restablecerPassword } from '../utils/mailRestablecePassword.js'

function conexionEmail() {
  return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'marcoricovaladez172@gmail.com',
                pass: 'jhor vwbv qbwi rjwk ', // ⚠️ Usa una "App Password" si tienes 2FA activado
            },
        });
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

export { sendMailEstatusPedidos, sendMailVerificar, sendMailCuentaVerificada, sendMailTokenPassword};
