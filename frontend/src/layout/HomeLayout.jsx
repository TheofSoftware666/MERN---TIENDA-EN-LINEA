import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { X } from "lucide-react";
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
  const [orderSuccess, setOrderSuccess] = useState(null); 

  useEffect(() => {
    
    if(!localStorage.getItem('eco_promo')){
      setTimeout(() => {
        HandlePromo();
      }, 30000);
    }

  }, []);

  function HandlePromo () {
    setShowPromocion(true);
    localStorage.setItem('eco_promo', '333');
  }

  function HandleSide(){
    setShowCart(true);    
    setSide(true);
  }

  function HandleClosePromo () {
    setShowPromocion(false);
    setShowCart(false);
    setShowCheckout(false);
  }

  function HandleCloseSide() {
    setShowCheckout(false);
    setSide(false);
  }

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
    console.log(orderNumber)
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
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      // Opcional: Redirigir a la página de inicio o pedidos
                      // window.location.href = "/mis-pedidos";
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Ver mis pedidos
                  </button>
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
            <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-2xl text-center w-full mx-auto">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-gray-900">
                🎁 ¡Gana un 10% de descuento!
              </h2>

              <p className="mb-5 text-xs sm:text-sm text-gray-600">
                Suscríbete y recibe promociones exclusivas, lanzamientos anticipados y descuentos especiales en tu correo.
              </p>

              <input
                type="email"
                placeholder="Tu correo electrónico..."
                className="border border-gray-300 p-2 sm:p-3 rounded-lg w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />

              <div className="flex flex-col gap-3">
                <button className="bg-blue-600 text-white w-full px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 text-sm transition duration-200 shadow">
                  Quiero mi descuento 🎉
                </button>
                <button onClick={HandleClosePromo} className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-xs transition duration-200">
                  No gracias, prefiero pagar más y perderme ofertas 🔒
                </button>
              </div>

              <p className="mt-4 text-[10px] sm:text-[11px] text-gray-400">
                ✨ Sin spam. Cancela en cualquier momento.
              </p>
            </div>
          </div>
        </div>
        )}
        
       {ShowSide && (<div className="fixed inset-0 z-20 flex">      
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
        <div className="ml-auto w-full max-w-sm h-full shadow-lg z-20 overflow-y-auto transition-transform transform translate-x-0">
          

          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Tu Carrito</h2>
              <button onClick={HandleCloseSide}>
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