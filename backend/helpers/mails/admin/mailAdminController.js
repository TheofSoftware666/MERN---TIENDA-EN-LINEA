import { Resend } from 'resend';
import dotenv from 'dotenv/config';

import { sendMailNewOrderAdminNotification } from './../../../utils/mails/Admin/mailAdminPedidos.js';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

const sendMailAdmintNewOrderByUser = async (
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
            subject: '¡🔔 Nueva venta recibida!',
            html: sendMailNewOrderAdminNotification(data),
        });

        console.log('sendMailAdmintNewOrderByUser: Correo enviado con éxito.', info);

        response.ok = true;
        response.message = 'Enviado correctamente';
        response.data = info;

        return response;

    } catch (error) {

        console.warn(
            'sendMailAdmintNewOrderByUser: Error al enviar el correo.',
            error
        );

        response.ok = false;
        response.message += error.message;
        response.data = error;

        return response;
    }
};

export {
    sendMailAdmintNewOrderByUser
};