import nodemailer from 'nodemailer';
import { sendMailNewOrder } from './../../../utils/mails/client/mailAdminPedidos.js';
import { sendMailDeliverySuccess } from './../../../utils/mails/client/mailClientStatusEntregado.js'; // OK
import { sendMailPending } from './../../../utils/mails/client/mailClientStatusPendiente.js';         // OK 
import { sendMailEnviado } from './../../../utils/mails/client/mailClientStatusEnviado.js';           // OK
import { sendMailCancelado } from './../../../utils/mails/client/mailClientStatusCancelado.js';       // 
import { sendMailReembolsado } from './../../../utils/mails/client/mailClientStatusReembolsado.js';       // 


function conexionEmail() {
  return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'marcoricovaladez172@gmail.com',
                pass: 'jhor vwbv qbwi rjwk ', 
            },
        });
}

const sendMailClientNewOrderByUser = async (Company, EmailFrom, EmailDestiny, data) => {
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
        subject: '¡Tu pedido está confirmado!',
        html: sendMailNewOrder(),
      };

      const info = await transporter.sendMail(mailOptions);
      response.ok = true;
      response.message = 'Enviado correctamente' + info.response;
      response.data = info.response;
      return response;
    } catch (error) {
        console.warn('sendMailNewOrder: Error al enviar el correo. ' + error);
        response.ok = false;
        response.message += error.message;
        response.data = null;
        return response;
    }
}

const sendMailClientChangeStatus = async (Company, EmailFrom, EmailDestiny, orderId, status,data) => {
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
        subject: '¡Tu pedido está confirmado!',
        html: sendMailReembolsado(),
      };

      const info = await transporter.sendMail(mailOptions);
      response.ok = true;
      response.message = 'Enviado correctamente' + info.response;
      response.data = info.response;
      return response;
    } catch (error) {
        console.warn('sendMailNewOrder: Error al enviar el correo. ' + error);
        response.ok = false;
        response.message += error.message;
        response.data = null;
        return response;
    }
}

export { 
    sendMailClientNewOrderByUser
    , sendMailClientChangeStatus
 }

