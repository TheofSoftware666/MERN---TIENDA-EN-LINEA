import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { X } from "lucide-react";
import { motion } from "framer-motion";
import clientAxios from '../config/axios.jsx';

// Components
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SideCarrito from '../components/SideCarrito.jsx';
import SideCheckOut from '../components/SideCheckOut.jsx';

// Extra
import { CheckCircle } from "lucide-react";

const AuthLayout = () => {
  const [ShowPromocion, setShowPromocion] = useState(false);
  const [ShowCart, setShowCart] = useState(false);
  const [ShowSide, setSide] = useState(false);
  const [ShowCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [emailSuscription, setEmailSuscription] = useState("");

  useEffect(() => {
    if (
      !localStorage.getItem('ecommerce_promo') ||
      (localStorage.getItem('ecommerce_promo') != new Date().toISOString().split('T')[0] &&
        !localStorage.getItem('ape_token'))
    ) {
      setTimeout(() => {
        HandlePromo();
      }, 30000);
    }
  }, []);

  function HandlePromo() {
    setShowPromocion(true);
    localStorage.setItem('ecommerce_promo', new Date().toISOString().split('T')[0]);
  }

  function HandleSide() {
    setShowCart(true);
    setSide(true);
  }

  const SetSuscriptionByUser = async (email) => {
    try {
      const payload = { email };
      await clientAxios.post('/SetMessageEcommercePromo', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setShowPromocion(false);
      setShowCart(false);
      setShowCheckout(false);
    } catch (ex) {
      console.warn(ex.data || ex || "Ocurrió un error inesperado");
    }
  };

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
      orderNumber,
    });
  };

  return (
    <>
      {/* ── Modal confirmación de pedido ── */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
          >
            {/* Ícono check */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#7abf8a]/10 border border-[#7abf8a]/30 mb-6">
              <CheckCircle className="h-8 w-8 text-[#7abf8a]" />
            </div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-semibold mb-3">
              Pedido procesado
            </p>
            <h3 className="text-xl font-light text-white mb-3">
              ¡Redireccionando a tu pago!
            </h3>
            <p className="text-[#666] text-sm leading-relaxed">
              {orderSuccess.message}
            </p>
          </motion.div>
        </div>
      )}

      {/* ── Modal promoción ── */}
      {ShowPromocion && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center h-screen px-3 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1a1a] border border-[#2e2e2e] p-8 sm:p-10 rounded-2xl shadow-2xl text-center w-full max-w-sm sm:max-w-md mx-auto relative overflow-hidden"
          >
            {/* Decoración fondo */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c9a84c]/5 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#c9a84c]/5 pointer-events-none" />

            {/* Ícono */}
            <div className="relative flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">✦</span>
              </div>
            </div>

            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-3">
              Oferta exclusiva
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-2 leading-tight">
              Tu primera compra con{' '}
              <span className="text-[#c9a84c] font-semibold">10% OFF</span>
            </h2>
            <p className="mb-8 text-sm text-[#888] leading-relaxed">
              Suscríbete y recibe promociones exclusivas, lanzamientos anticipados y consejos de belleza directamente en tu correo.
            </p>

            <input
              type="email"
              value={emailSuscription}
              onChange={(e) => setEmailSuscription(e.target.value)}
              placeholder="tu@correo.com"
              className="bg-[#111] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#444] p-3 w-full mb-4 text-sm outline-none transition-colors"
            />

            <div className="flex flex-col gap-3">
              <button
                onClick={() => SetSuscriptionByUser(emailSuscription)}
                className="bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] w-full px-5 py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200"
              >
                Quiero mi descuento
              </button>
              <button
                onClick={() => {
                  setShowPromocion(false);
                  setShowCart(false);
                  setShowCheckout(false);
                }}
                className="text-[#444] hover:text-[#888] text-xs transition-colors duration-200 underline underline-offset-4 tracking-wider"
              >
                No mostrar nuevamente
              </button>
            </div>

            <p className="mt-6 text-[10px] text-[#444] tracking-wider uppercase">
              Sin spam · Cancela en cualquier momento
            </p>
          </motion.div>
        </div>
      )}

      {/* ── Side panel carrito / checkout ── */}
      {ShowSide && (
        <div className="fixed inset-0 z-30 flex">
          <div className="fixed inset-0 bg-black/60 transition-opacity duration-300" />
          <div className="ml-auto w-full max-w-sm h-full shadow-lg z-20 overflow-y-auto">
            <div className="fixed right-0 top-0 h-full w-80 bg-[#111] border-l border-[#2e2e2e] shadow-2xl z-50 flex flex-col">

              {/* Header del panel */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-[#2e2e2e]">
                <div>
                  <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold">
                    {ShowCheckout ? 'Checkout' : 'Carrito'}
                  </p>
                  <h2 className="text-base font-light text-white mt-0.5">
                    {ShowCheckout ? 'Finalizar compra' : 'Tu selección'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    setSide(false);
                  }}
                  className="w-8 h-8 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#666] hover:text-[#c9a84c] transition-all"
                  aria-label="Cerrar panel"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Contenido */}
              <div className="flex-1 overflow-y-auto">
                {ShowCart && <SideCarrito onOpenCheck={() => HandleCheckOut()} />}
                {ShowCheckout && <SideCheckOut onBack={() => HandleCart()} onProcess={() => HandlePayment()} />}
              </div>
            </div>
          </div>
        </div>
      )}

      <Header onOpenCart={() => HandleSide()} />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;