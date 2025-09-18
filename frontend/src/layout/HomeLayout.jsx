import { Outlet } from 'react-router-dom';
import { X } from "lucide-react";
import Header from '../components/header.jsx';
import Footer from '../components/Footer.jsx';
import LighBox from '../components/LighBox.jsx';
import SideCarrito from '../components/SideCarrito.jsx';
import SideCheckOut from '../components/SideCheckOut.jsx';
import { useState, useEffect } from 'react';

const AuthLayout = () => {
  const [ ShowPromocion, setShowPromocion ] = useState(false);
  const [ ShowCart, setShowCart ] = useState(false);
  const [ ShowSide, setSide ] = useState(false);
  const [ ShowCheckout, setShowCheckout ] = useState(false);

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

  function HandleSide(  ){
    
    // if(cartOrCheckout){
      setShowCart(true);
    // }else {
    //   setShowCart(false);
    // }
    
    return setSide(true);
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
    return setShowCheckout(true);
  }

  return (
    <>
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
            {ShowCart && (<SideCarrito onOpenCheck={() => HandleCheckOut}/>)}
            {ShowCheckout &&  (<SideCheckOut/>)}
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