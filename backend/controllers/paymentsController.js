import Stripe from 'stripe';
import 'dotenv/config'; 

import { checkPreviousPaymentModel, ProcessPaymentModel, GetLineItems }  from '../models/payments.js';
import { getUserById, GetShippingAddressByIdShippingAddressModel, GetAdminProfile } from '../models/usuario.js';
import { createOrderModel, GetOrderDetailByOrderId } from '../models/pedido.js';
import { getCartItemsByIdUserModel } from '../models/carrito.js';
import { sendMailAdmintNewOrderByUser } from "../helpers/mails/admin/mailAdminController.js";
import { sendMailClientNewOrderByUser } from "../helpers/mails/client/mailClientController.js";


const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

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

        // if(requestDate.typePayment && requestDate.typePayment === 'tarjeta'){
        //     requiredFields.exp = 'La fecha de experiación es necesario completarla. ';
        //     requiredFields.tarjeta = 'Numero de tarjeta invalido.';
        //     requiredFields.cvv = 'CVV invalido';
        //     requiredFields.titular = 'No se encontro ningun nombre de titutlar. ';
        // }

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

        // console.log(responseCheck.data);

        const costShipping = responseCheck.data.CostShipment;
        const GrandTotal = responseCheck.data.CartTotal;
        const cartId = responseCheck.data.CartId;

        const lineItemsResponse = await GetLineItems(cartId);
        // console.log(lineItemsResponse);

        if (!lineItemsResponse.ok || lineItemsResponse.data.length === 0) {
        response.message = lineItemsResponse.message || 'Error al obtener los detalles del carrito.';
        return res.status(400).json({ response });
        }

        // Mapear a formato Stripe
        const line_items = lineItemsResponse.data.map(item => ({
        price_data: {
            currency: 'mxn',
            product_data: {
            name: item.nombre,
            ...(item.imagen_url && { images: [ process.env.DOMAIN + item.imagen_url ] }),
            },
            unit_amount: Math.round(item.Subtotal / item.Quantity * 100), 
        },
        quantity: item.Quantity,
        }));

        // Agregar envío si aplica
        if (responseCheck.data.CostShipment > 0) {
        line_items.push({
            price_data: {
            currency: 'mxn',
            product_data: { name: 'Envío' },
            unit_amount: Math.round(responseCheck.data.CostShipment * 100),
            },
            quantity: 1,
        });
        }

        const session = await getStripe().checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.DOMAIN_FRONTEND}/Payment/Success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN_FRONTEND}/Payment/Failure`,
        metadata: {
            userId,
            cartId,
            selectedAddressId: requestDate.selectedAddressId, 
            phone: requestDate.tel,
        },
        });

        // console.log(session);
        response.ok = true;
        response.message = 'Checkout Session creada.';
        response.url = session.url; 
        res.status(200).json({ response });
    }catch(error){
        res.status(500).json({ error : error});
        console.error('Error al verificar el pago previo:', error);
    }
};

// const ProcessPayment = async (req, res) => {
//     const userId = req.usuario[0].UserId_New;
//     const requestDate = req.body?.form || {};

//     const response = {
//         ok: false,
//         message: '',
//         data: null
//     }

//     if(!userId || userId === ''){
//         const error = new Error('Error al procesar el pago. ');
//         response.message = error.message;
//         return res.status(400).json({ response });
//     }

//     if(!requestDate || requestDate.length === 0){
//         const error = new Error('Error al procesar el pago. ');
//         response.message = error.message;
//         return res.status(400).json({ response });
//     }

//     // if(requestDate.typePayment == null || requestDate.typePayment !== 'tarjeta'){
//     //     const error = new Error('Ocurrio un error inesperado al intentar procesar el pago. ');
//     //     response.message = error.message;
//     //     return res.status(400).json({ response });
//     // }    

//     // if(requestDate.tarjeta === null || requestDate.tarjeta.length === 0){
//     //     const error = new Error('Numero de tarjeta invalido.');
//     //     response.message = error.message;
//     //     return res.status(400).json({ response });
//     // }

//     // if(requestDate.cvv === null || requestDate.cvv === ''){
//     //     const error = new Error('Es necesario completar el campo CVV.');
//     //     response.message = error.message;
//     //     return res.status(400).json({ response });
//     // }

//     // if(requestDate.exp === null || requestDate.exp === ''){
//     //     const error = new Error('Es necesario completar el campo de fecha de expiración . ');
//     //     response.message = error.message;
//     //     return res.status(400).json({ response });
//     // }

//     // if(requestDate.titular === null || requestDate.titular === ''){
//     //     const error = new Error('Es necesario completar el campo del titular de la tarjeta. ');
//     //     response.message = error.message;
//     //     return res.status(400).json({ response });
//     // }

//     const getShippingAddress = await GetShippingAddressByIdShippingAddressModel(userId, requestDate.selectedAddressId);
//     getShippingAddress.data.phone = requestDate.tel;

//     const shippingAddress = {
//         fullName: getShippingAddress.data.NameContact,
//         email: getShippingAddress.data.email,
//         phone: requestDate.tel,
//         street: getShippingAddress.data.street  ,
//         streetNumber: getShippingAddress.data.exteriorNumber,
//         interiorNumber: getShippingAddress.data.interiorNumber || "",
//         neighborhood: getShippingAddress.data.neighborhood,
//         city: getShippingAddress.data.city,
//         state: getShippingAddress.data.state,
//         postalCode: getShippingAddress.data.postalCode,
//         country: getShippingAddress.data.country || "Mexico",
//         instructions: getShippingAddress.data.instructions || ""
//     };

//     const responseGetCartItems = await getCartItemsByIdUserModel(userId);
//     const CartId = responseGetCartItems[0].CartId;

//     if(!responseGetCartItems){
//         const error = new Error('No se encontro ningun carrito para procesar. ');
//         response.message = error.message;
//         return res.status(400).json({ response });
//     }

//     const responseOrder = await createOrderModel(userId, CartId, shippingAddress, null, 'estandar', 0, 'tarjeta', shippingAddress.instructions || "Sin notas del cliente", null);

//     if(!responseOrder.ok){
//         console.log(responseOrder);
//         const error = new Error('Ocurrio un error inesperado el intentar crear la orden. ');
//         response.message = error.message + responseOrder.message;
//         return res.status(400).json({ response });
//     }

//     const responseApiPay = {
//         id: "ch_1J8X9Z2eZvKYlo2C3qJqWZ1g", status: "succeeded"
//     }

//     const emailJson = {
//         customer_email: req.usuario[0].mail
//     }

//     // ! Es necesario reemplazar el monto del grandtotal por el monto que se cobro en stripe
//     const responsePay = await ProcessPaymentModel(responseOrder.data.OrderId, 'tarjeta', 'stripe', 'ch_1J8X9Z2eZvKYlo2C3qJqWZ1g', responseOrder.data.GrandTotal, 'MXN', responseApiPay, emailJson);

//     if(!responsePay.ok){
//         console.log(responsePay);
//         const error = new Error('Ocurrio un error al registrar el pago. ');
//         response.message = error.message + responsePay.message;
//         return res.status(400).json({ response });
//     }

//     // Obtener los detalles del pedido
//     const detailResponse = await GetAdminProfile();
//     const orderDetailsQuery = await GetOrderDetailByOrderId(responseOrder.data.OrderId, shippingAddress);

//     if(orderDetailsQuery.ok){
//         // enviar correo del pedido
//         const responseEmailAdmin = sendMailAdmintNewOrderByUser(detailResponse.data.nombre_tienda, detailResponse.data.emailAdmin, detailResponse.data.emailAdmin, orderDetailsQuery.data);
//         const responseEmailPedido = sendMailClientNewOrderByUser(detailResponse.data.nombre_tienda, detailResponse.data.emailAdmin, emailJson.customer_email, orderDetailsQuery.data);
//     }

//     response.data = responseOrder.data.OrderId;
//     response.ok = true;
//     response.message = 'Pago previo verificado correctamente.';
//     res.status(200).json({ response });    
// };

const ProcessPayment = async (req, res) => {

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature inválida:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Solo nos interesa este evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const userId        = session.metadata.userId;
      const cartId        = session.metadata.cartId;
      const selectedAddressId = session.metadata.selectedAddressId; 
      const stripeEmail   = session.customer_details?.email;
      const amountPaid    = session.amount_total / 100; 
      const chargeId      = session.payment_intent;

      // 1. Obtener dirección de envío
      const getShippingAddress = await GetShippingAddressByIdShippingAddressModel(userId, selectedAddressId);

      // ✅ Validar que exista antes de acceder
      if (!getShippingAddress || !getShippingAddress.data) {
        console.error('No se encontró la dirección de envío para userId:', userId, 'addressId:', selectedAddressId);
        return res.status(500).end();
      }

      const shippingAddress = {
        fullName:       getShippingAddress.data.NameContact,
        email:          getShippingAddress.data.email,
        phone:          getShippingAddress.data.phone || '',
        street:         getShippingAddress.data.street,
        streetNumber:   getShippingAddress.data.exteriorNumber,
        interiorNumber: getShippingAddress.data.interiorNumber || '',
        neighborhood:   getShippingAddress.data.neighborhood,
        city:           getShippingAddress.data.city,
        state:          getShippingAddress.data.state,
        postalCode:     getShippingAddress.data.postalCode,
        country:        getShippingAddress.data.country || 'Mexico',
        instructions:   getShippingAddress.data.instructions || ''
      };

      // 2. Crear la orden
      const responseOrder = await createOrderModel(
        userId, cartId, shippingAddress,
        null, 'estandar', 0, 'tarjeta',
        shippingAddress.instructions || 'Sin notas del cliente', null
      );

      if (!responseOrder.ok) {
        console.error('Error al crear orden desde webhook:', responseOrder.message);
        return res.status(500).end();
      }

      console.log('amountPaid Stripe:', amountPaid);
      console.log('GrandTotal orden:', responseOrder.data.GrandTotal);
      console.log('amount_total raw Stripe (centavos):', session.amount_total);

      // 3. Registrar el pago — ahora con datos reales de Stripe
      const stripeRaw = { id: chargeId, status: 'succeeded' };
      const responsePay = await ProcessPaymentModel(
        responseOrder.data.OrderId,
        'tarjeta', 'stripe',
        chargeId,          
        amountPaid,        
        'MXN',
        stripeRaw,
        { customer_email: stripeEmail }
      );

      if (!responsePay.ok) {
        console.error('Error al registrar pago:', responsePay.message);
        return res.status(500).end();
      }

      // 4. Enviar emails
      const detailResponse   = await GetAdminProfile();
      const orderDetailsQuery = await GetOrderDetailByOrderId(responseOrder.data.OrderId, shippingAddress);

      if (orderDetailsQuery.ok) {
        sendMailAdmintNewOrderByUser(
          detailResponse.data.nombre_tienda,
          detailResponse.data.emailAdmin,
          detailResponse.data.emailAdmin,
          orderDetailsQuery.data
        );
        sendMailClientNewOrderByUser(
          detailResponse.data.nombre_tienda,
          detailResponse.data.emailAdmin,
          stripeEmail,
          orderDetailsQuery.data
        );
      }

      console.log(`✅ Orden creada desde webhook: ${responseOrder.data.OrderId}`);

    } catch (err) {
      console.error('Error procesando webhook:', err);
      return res.status(500).end();
    }
  }

  res.status(200).json({ received: true });
};

export { checkPreviousPayment, ProcessPayment };



