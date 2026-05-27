import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { X } from "lucide-react";
import { motion } from "framer-motion";
import clientAxios from '../config/axios.jsx';

// Compoenents
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SideCarrito from '../components/SideCarrito.jsx';
import SideCheckOut from '../components/SideCheckOut.jsx';

// Extra
import { CheckCircle } from "lucide-react";  

const AuthLayout = () => {
  const [ ShowPromocion, setShowPromocion ] = useState(false);
  const [ ShowCart, setShowCart ] = useState(false);
  const [ ShowSide, setSide ] = useState(false);
  const [ ShowCheckout, setShowCheckout ] = useState(false);
  const [ orderSuccess, setOrderSuccess] = useState(null); 
  const [ emailSuscription, setEmailSuscription ] = useState(""); 

  useEffect(() => {
    
    if(!localStorage.getItem('ecommerce_promo') || localStorage.getItem('ecommerce_promo') != new Date().toISOString().split('T')[0] && !localStorage.getItem('ape_token')){
      setTimeout(() => {
        HandlePromo();
      }, 30000);
    }

  }, []);

  function HandlePromo () {
    setShowPromocion(true);
    localStorage.setItem('ecommerce_promo', new Date().toISOString().split('T')[0]);
  }

  function HandleSide(){
    setShowCart(true);    
    setSide(true);
  }

  const SetSuscriptionByUser = async (email) => {
    try{
      const payload = {
        email: email
      }

      const response = await clientAxios.post('/SetMessageEcommercePromo', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setShowPromocion(false);
      setShowCart(false);
      setShowCheckout(false);
    }catch(ex){
      console.warn(ex.data || ex || "Ocurrio un error inesperado al intentar consultar el costo de envio");
    }
  }

  // function HandleClosePromo () {
  //   setShowPromocion(false);
  //   setShowCart(false);
  //   setShowCheckout(false);
  // }

  // function HandleCloseSide() {
  //   setShowCheckout(false);
  //   setSide(false);
  // }

  function HandleCheckOut() {
    setShowCart(false);
    setShowCheckout(true);
  }

  function HandleCart() {
    setShowCart(true);
    setShowCheckout(false);
    setOrderSuccess(null);
  }

  const HandlePayment = (orderNumber) => {
    setSide(false);
    setShowCart(false);
    setShowCheckout(false);
    setOrderSuccess({
      message: "¡Se completó tu pedido!",
      orderNumber: orderNumber
    });
  };

  return (
    <>
        {/* Modal de confirmación de pedido */}
        {orderSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¡Pedido Completado!
                </h3>
                <p className="text-gray-600 mb-4">
                  {orderSuccess.message}
                </p>
                {/* <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-500 mb-1">Número de pedido:</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {orderSuccess.orderNumber}
                  </p>
                </div> */}
                <p className="text-sm text-gray-500 mb-6">
                  Te hemos enviado un correo con los detalles de tu compra.
                </p>
                <div className="space-y-3">
                  <Link to="/Pedidos"
                    onClick={() => {
                      setOrderSuccess(null);
                      // Opcional: Redirigir a la página de inicio o pedidos
                      // window.location.href = "/mis-pedidos";
                    }}
                    
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Ver mis pedidos
                  </Link>
                  <button
                    onClick={() => setOrderSuccess(null)}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    Continuar comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {ShowPromocion && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center h-screen px-3 sm:px-6">
            <div className="w-full max-w-sm sm:max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-2xl text-center w-full mx-auto border border-rose-100"
              >
                {/* Ícono decorativo */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🎁</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">
                  ¡Tu primera compra con <span className="font-semibold text-rose-500">10% OFF</span>!
                </h2>

                <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                  Suscríbete y recibe promociones exclusivas, lanzamientos anticipados y consejos de belleza directamente en tu correo.
                </p>

                <input
                  type="email"
                  value={emailSuscription}
                  onChange={(e) => setEmailSuscription(e.target.value)}
                  placeholder="Tu correo electrónico..."
                  className="border border-rose-200 p-3 rounded-xl w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent shadow-sm"
                />

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => SetSuscriptionByUser(emailSuscription)}
                    className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white w-full px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Quiero mi descuento 🎉
                  </button>
                  <button
                    onClick={() => {
                      setShowPromocion(false);
                      setShowCart(false);
                      setShowCheckout(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-xs transition-col duration-200 underline underline-offset-2"
                  >
                    No mostrar nuevamente
                  </button>
                </div>

                <p className="mt-4 text-[10px] text-gray-400 flex items-center justify-center gap-1">
                  <span>✨</span> Sin spam, cancela en cualquier momento
                </p>
              </motion.div>
            </div>
          </div>
        )}
        
       {ShowSide && (<div className="fixed inset-0 z-30 flex">      
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
        <div className="ml-auto w-full max-w-sm h-full shadow-lg z-20 overflow-y-auto transition-transform transform translate-x-0">
          

          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Tu Carrito</h2>
              <button onClick={() => {
                setShowCheckout(false);
                setSide(false);
              }}>
                <X size={20} />
              </button>
            </div>
            {ShowCart && (<SideCarrito onOpenCheck={() => HandleCheckOut()}/>)}
            {ShowCheckout &&  (<SideCheckOut onBack={() => HandleCart()} onProcess={() => HandlePayment()}/>)}
          </div>
        </div>
      </div>)}
        
        <Header onOpenCart={() => HandleSide()} />

        <Outlet />

        <Footer /> 
    </>
  )
}

export default AuthLayout