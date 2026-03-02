import nodemailer from 'nodemailer';
import { sendMailNewOrderAdminNotification } from './../../../utils/mails/Admin/mailAdminPedidos.js';

function conexionEmail() {
  return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'marcoricovaladez172@gmail.com',
                pass: 'jhor vwbv qbwi rjwk ', 
            },
        });
}

const sendMailAdmintNewOrderByUser = async (Company, EmailFrom, EmailDestiny, data) => {
    const response = {
        ok: false,
        message: 'Ocurrio un error al intentar enviar el correo. ',
        data: null
    }

    try {
      const transporter = conexionEmail();
      const mailOptions = {
        from: '"' + Company + '" <' + EmailFrom + '>',
        to: EmailDestiny,
        subject: '¡🔔 Nueva venta recibida!',
        html: sendMailNewOrderAdminNotification(data),
      };

      const info = await transporter.sendMail(mailOptions);
      response.ok = true;
      response.message = 'Enviado correctamente' + info.response;
      response.data = info.response;
      return res.status(200).json({ response });
    } catch (error) {
        console.warn('sendMailClientNewOrderByUser: Error al enviar el correo. ' + error);
        response.ok = false;
        response.message += error.message;
        response.data = null;
        return response;
    }
}

export { sendMailAdmintNewOrderByUser };
