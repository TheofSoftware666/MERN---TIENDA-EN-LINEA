import { checkPreviousPaymentModel, ProcessPaymentModel }  from '../models/payments.js';
import { getUserById, GetShippingAddressByIdShippingAddressModel, GetAdminProfile } from '../models/usuario.js';
import { createOrderModel, GetOrderDetailByOrderId } from '../models/pedido.js';
import { getCartItemsByIdUserModel } from '../models/carrito.js';
import { sendMailAdmintNewOrderByUser } from "../helpers/mails/admin/mailAdminController.js";
import { sendMailClientNewOrderByUser } from "../helpers/mails/client/mailClientController.js";

const checkPreviousPayment = async (req, res) => {
    try{
        const userId = req.usuario[0].UserId_New;
        const requestDate = req.body?.form || {};

        const response = {
            ok: false,
            message: '',
            data: null
        }
        
        if(!userId || userId === ''){
            response.message = 'El usuario no está autenticado.';
            return res.status(301).json({ response });
        };

        if(!requestDate || Object.keys(requestDate).length === 0){
            response.message = 'Los datos del formulario son obligatorios.';
            return res.status(400).json({ response });
        };

        // Mapa de campos obligatorios y su mensaje
        const requiredFields = {
            nombre: 'El nombre es obligatorio.',
            email: 'El correo electrónico es obligatorio.',
            tel: 'El teléfono es obligatorio.',
            // cp: 'El código postal es obligatorio.',
            // calle: 'La calle es obligatoria.',
            // colonia: 'La colonia es obligatoria.',
            // ciudad: 'La ciudad es obligatoria.',
            // estado: 'El estado es obligatorio.'
        };

        if(requestDate.typePayment && requestDate.typePayment === 'tarjeta'){
            requiredFields.exp = 'La fecha de experiación es necesario completarla. ';
            requiredFields.tarjeta = 'Numero de tarjeta invalido.';
            requiredFields.cvv = 'CVV invalido';
            requiredFields.titular = 'No se encontro ningun nombre de titutlar. ';
        }

        for (const field in requiredFields) {
            if (!requestDate[field] || requestDate[field].toString().trim() === '') {
                response.message = requiredFields[field];
                return res.status(400).json({ response });
            }
        }

        const responseUser = await getUserById(userId);

        if(!responseUser || responseUser.length == 0){
            const error = new Error('No se encontro ningun usuario con este carrito. ');
            response.message = error.message;
            return res.status(400).json({ response });
        }

        if(responseUser[0]?.correoValidado == null || responseUser[0].correoValidado.length == 0 || responseUser[0].correoValidado != 'T'){
            const error = new Error('Para procesar el pago es necesario primero verificar tu cuenta. ');
            response.message = error.message;
            return res.status(400).json({ response });
        }
        
        if(!responseUser[0]?.nombre.includes(requestDate.nombre)){
            const error = new Error('Es invalido cambiar tu información de contacto (nombre). ');
            response.message = error.message;
            return res.status(400).json({ response });
        }
        
        const responseCheck = await checkPreviousPaymentModel(userId);

        if(!responseCheck || !responseCheck.ok || responseCheck.data.Status != "SUCCESS"){
            console.log(responseCheck);
            const error = new Error(responseCheck.data.Message || responseCheck.message || 'Error al procesar el pago. ');
            response.message = responseCheck.data.Message || error.message;
            return res.status(400).json({ response });
        }

        response.data = responseCheck.data;
        response.ok = true;
        response.message = 'Pago previo verificado correctamente.';
        res.status(200).json({ response });
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al verificar el pago previo:', error);
    }
};

const ProcessPayment = async (req, res) => {
    const userId = req.usuario[0].UserId_New;
    const requestDate = req.body?.form || {};

    const response = {
        ok: false,
        message: '',
        data: null
    }

    if(!userId || userId === ''){
        const error = new Error('Error al procesar el pago. ');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    if(!requestDate || requestDate.length === 0){
        const error = new Error('Error al procesar el pago. ');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    if(requestDate.typePayment == null || requestDate.typePayment !== 'tarjeta'){
        const error = new Error('Ocurrio un error inesperado al intentar procesar el pago. ');
        response.message = error.message;
        return res.status(400).json({ response });
    }    

    if(requestDate.tarjeta === null || requestDate.tarjeta.length === 0){
        const error = new Error('Numero de tarjeta invalido.');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    if(requestDate.cvv === null || requestDate.cvv === ''){
        const error = new Error('Es necesario completar el campo CVV.');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    if(requestDate.exp === null || requestDate.exp === ''){
        const error = new Error('Es necesario completar el campo de fecha de expiración . ');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    if(requestDate.titular === null || requestDate.titular === ''){
        const error = new Error('Es necesario completar el campo del titular de la tarjeta. ');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    const getShippingAddress = await GetShippingAddressByIdShippingAddressModel(userId, requestDate.selectedAddressId);
    getShippingAddress.data.phone = requestDate.tel;

    const shippingAddress = {
        fullName: getShippingAddress.data.NameContact,
        email: getShippingAddress.data.email,
        phone: requestDate.tel,
        street: getShippingAddress.data.street  ,
        streetNumber: getShippingAddress.data.exteriorNumber,
        interiorNumber: getShippingAddress.data.interiorNumber || "",
        neighborhood: getShippingAddress.data.neighborhood,
        city: getShippingAddress.data.city,
        state: getShippingAddress.data.state,
        postalCode: getShippingAddress.data.postalCode,
        country: getShippingAddress.data.country || "Mexico",
        instructions: getShippingAddress.data.instructions || ""
    };

    const responseGetCartItems = await getCartItemsByIdUserModel(userId);
    const CartId = responseGetCartItems[0].CartId;

    if(!responseGetCartItems){
        const error = new Error('No se encontro ningun carrito para procesar. ');
        response.message = error.message;
        return res.status(400).json({ response });
    }

    const responseOrder = await createOrderModel(userId, CartId, shippingAddress, null, 'estandar', 0, 'tarjeta', shippingAddress.instructions || "Sin notas del cliente", null);

    if(!responseOrder.ok){
        console.log(responseOrder);
        const error = new Error('Ocurrio un error inesperado el intentar crear la orden. ');
        response.message = error.message + responseOrder.message;
        return res.status(400).json({ response });
    }
    // Procesar el Pago (Inyectar) real 

    const responseApiPay = {
        id: "ch_1J8X9Z2eZvKYlo2C3qJqWZ1g", status: "succeeded"
    }

    const emailJson = {
        customer_email: req.usuario[0].mail
    }

    // ! Es necesario reemplazar el monto del grandtotal por el monto que se cobro en stripe
    const responsePay = await ProcessPaymentModel(responseOrder.data.OrderId, 'tarjeta', 'stripe', 'ch_1J8X9Z2eZvKYlo2C3qJqWZ1g', responseOrder.data.GrandTotal, 'MXN', responseApiPay, emailJson);

    if(!responsePay.ok){
        console.log(responsePay);
        const error = new Error('Ocurrio un error al registrar el pago. ');
        response.message = error.message + responsePay.message;
        return res.status(400).json({ response });
    }

    // Obtener los detalles del pedido
    const detailResponse = await GetAdminProfile();
    const orderDetailsQuery = await GetOrderDetailByOrderId(responseOrder.data.OrderId, shippingAddress);

    if(orderDetailsQuery.ok){
        // enviar correo del pedido
        const responseEmailAdmin = sendMailAdmintNewOrderByUser(detailResponse.data.nombre_tienda, detailResponse.data.emailAdmin, detailResponse.data.emailAdmin, orderDetailsQuery.data);
        const responseEmailPedido = sendMailClientNewOrderByUser(detailResponse.data.nombre_tienda, detailResponse.data.emailAdmin, emailJson.customer_email, orderDetailsQuery.data);
    }

    response.data = responseOrder.data.OrderId;
    response.ok = true;
    response.message = 'Pago previo verificado correctamente.';
    res.status(200).json({ response });    
};

export { checkPreviousPayment, ProcessPayment };



