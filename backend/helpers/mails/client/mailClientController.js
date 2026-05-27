import { Resend } from 'resend';
import dotenv from 'dotenv/config';

import { sendMailNewOrder } from './../../../utils/mails/client/mailAdminPedidos.js';
import { sendMailDeliverySuccess } from './../../../utils/mails/client/mailClientStatusEntregado.js';
import { sendMailPending } from './../../../utils/mails/client/mailClientStatusPendiente.js';
import { sendMailEnviado } from './../../../utils/mails/client/mailClientStatusEnviado.js';
import { sendMailCancelado } from './../../../utils/mails/client/mailClientStatusCancelado.js';
import { sendMailReembolsado } from './../../../utils/mails/client/mailClientStatusReembolsado.js';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

const sendMailClientNewOrderByUser = async (
    Company,
    EmailFrom,
    EmailDestiny,
    data
) => {

    const response = {
        ok: false,
        message: 'Ocurrio un error al intentar enviar el correo.',
        data: null
    };

    try {

        const info = await getResend().emails.send({
            from: `${Company} <${EmailFrom}>`,
            to: EmailDestiny,
            subject: '¡Tu pedido está confirmado!',
            html: sendMailNewOrder(data),
        });

        console.log('sendMailClientNewOrderByUser: Correo enviado con éxito.', info);

        response.ok = true;
        response.message = 'Enviado correctamente';
        response.data = info;

        return response;

    } catch (error) {

        console.warn(
            'sendMailClientNewOrderByUser: Error al enviar el correo.',
            error
        );

        response.ok = false;
        response.message += error.message;
        response.data = error;

        return response;
    }
};

// ======================================================
// CAMBIO DE ESTATUS
// ======================================================

const sendMailClientChangeStatus = async (
    Company,
    EmailFrom,
    EmailDestiny,
    orderId,
    status,
    data
) => {

    const response = {
        ok: false,
        message: 'Ocurrio un error al intentar enviar el correo.',
        data: null
    };

    try {

        let htmlTemplate = '';

        switch (status) {

            case 'ENTREGADO':
                htmlTemplate = sendMailDeliverySuccess(data);
                break;

            case 'PENDIENTE':
                htmlTemplate = sendMailPending(data);
                break;

            case 'ENVIADO':
                htmlTemplate = sendMailEnviado(data);
                break;

            case 'CANCELADO':
                htmlTemplate = sendMailCancelado(data);
                break;

            case 'REEMBOLSADO':
                htmlTemplate = sendMailReembolsado(data);
                break;

            default:
                htmlTemplate = sendMailPending(data);
                break;
        }

        const info = await getResend().emails.send({
            from: `${Company} <${EmailFrom}>`,
            to: EmailDestiny,
            subject: `Actualización de tu pedido #${orderId}`,
            html: htmlTemplate,
        });

        console.log('sendMailClientChangeStatus: Correo enviado con éxito.', info);

        response.ok = true;
        response.message = 'Enviado correctamente';
        response.data = info;

        return response;

    } catch (error) {

        console.warn(
            'sendMailClientChangeStatus: Error al enviar el correo.',
            error
        );

        response.ok = false;
        response.message += error.message;
        response.data = error;

        return response;
    }
};

export {
    sendMailClientNewOrderByUser,
    sendMailClientChangeStatus
};