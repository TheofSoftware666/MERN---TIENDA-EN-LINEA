import React, { useState, useEffect } from 'react';
import { Truck } from "lucide-react";
import clientAxios from '../config/axios';

const SideCarrito = ({ onOpenCheck }) => {
  const [configEco, setConfigEco] = useState(null);
  const [cartData, setCartData] = useState({
    items: [],
    cartInfo: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getCartItems(), GetCostShipping()]);
    };
    loadData();
  }, []);

  const GetCostShipping = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const response = await clientAxios.get('/Admin/GetConfigEcoPublic', {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      setConfigEco(response.data.tienda.config || null);
    } catch (ex) {
      console.warn(ex.data || ex);
    }
  };

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      const response = await clientAxios.get('/GetCartItemsByUserId', {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });

      if (response.data && response.data.data) {
        const items = response.data.data.map(item => ({
          cartItemId: item.CartItemId,
          productId: item.ProductId,
          name: item.ProductName,
          basePrice: parseFloat(item.BasePrice),
          finalPrice: parseFloat(item.FinalPrice),
          discountPercent: parseFloat(item.DiscountPercent),
          discountAmount: parseFloat(item.DiscountAmount),
          quantity: item.Quantity,
          subtotal: parseFloat(item.Subtotal),
          subtotalOriginal: parseFloat(item.SubtotalOriginal),
          itemSavings: parseFloat(item.ItemSavings),
          image: item.Image || 'https://fm.chenson.com.mx/1500X1500/1861105-3/1861105-3_01.jpg',
          sku: `SKU-${item.ProductId}`
        }));

        const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
        const subtotalOriginal = items.reduce((acc, item) => acc + item.subtotalOriginal, 0);
        const totalSavings = items.reduce((acc, item) => acc + item.itemSavings, 0);
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

        setCartData({
          items,
          cartInfo: { subtotal, subtotalOriginal, totalSavings, totalItems, grandTotal: subtotal, cartId: response.data.cartId || null },
          loading: false,
          error: null
        });
      }
    } catch (ex) {
      console.warn(ex.response?.data?.msg || ex);
      setCartData(prev => ({ ...prev, loading: false, error: null }));
    }
  };

  const handleIncrementar = async (cartItemId, productId) => {
    try {
      const token = localStorage.getItem("ape_token");
      if (!token) return;
      await clientAxios.post(`/SetCartItem/${productId}`, { quantity: 1, variantId: null }, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      setCartData(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1, subtotal: item.finalPrice * (item.quantity + 1) }
            : item
        )
      }));
      getCartItems();
    } catch (ex) {
      console.error("Error al incrementar:", ex.response?.data?.message);
    }
  };

  const handleDecrementar = async (cartItemId, productId, idVariant = null) => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      await clientAxios.post('/DeleteItemCart', { productId, idVariant, quantity: 1 }, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      setCartData(prev => {
        const updatedItems = prev.items.map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = Math.max(1, item.quantity - 1);
            return { ...item, quantity: newQty, subtotal: item.finalPrice * newQty };
          }
          return item;
        });
        return { ...prev, items: updatedItems.filter(item => item.quantity > 0) };
      });
      getCartItems();
    } catch (error) {
      console.error('Error al decrementar:', error);
    }
  };

  const handleEliminar = async (cartItemId) => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      await clientAxios.post(`/DeleteCartByProducto`, { cartItemId }, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      setCartData(prev => ({ ...prev, items: prev.items.filter(item => item.cartItemId !== cartItemId) }));
      getCartItems();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const subtotal = cartData.cartInfo?.subtotal || 0;
  const totalItems = cartData.cartInfo?.totalItems || 0;
  const totalSavings = cartData.cartInfo?.totalSavings || 0;
  const costoEnvioGratis = Number(configEco?.costo_envio);
  const faltante = Math.max(0, costoEnvioGratis - subtotal);
  const porcentajeCompletado = costoEnvioGratis > 0 ? Math.min((subtotal / costoEnvioGratis) * 100, 100) : 0;
  const tieneEnvioGratis = subtotal >= costoEnvioGratis;
  const costoEnvio = tieneEnvioGratis ? 0 : Number(configEco?.costo_envio);
  const totalFinal = subtotal + costoEnvio;

  // ── Loading ──
  if (cartData.loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8 bg-[#111]">
        <div className="w-8 h-8 border border-[#2e2e2e] border-t-[#c9a84c] rounded-full animate-spin mb-4" />
        <p className="text-[#555] text-xs tracking-widest uppercase">Cargando carrito</p>
      </div>
    );
  }

  // ── Error ──
  if (cartData.error) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8 text-center bg-[#111]">
        <div className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-[#666] text-sm mb-3">{cartData.error}</p>
        <button onClick={getCartItems} className="text-[#c9a84c] text-xs tracking-widest uppercase hover:underline underline-offset-2">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#111]">

      {/* ── Barra de progreso envío gratis ── */}
      {configEco?.costo_envio && totalItems > 0 && (
        <div className="px-5 pt-5 pb-4 border-b border-[#1e1e1e]">
          <div className="bg-[#1e1e1e] h-1 mb-3 overflow-hidden">
            <div
              className="bg-[#c9a84c] h-full transition-all duration-500"
              style={{ width: `${porcentajeCompletado}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 text-[#555]">
              <Truck size={13} className="text-[#c9a84c]" />
              <span className="tracking-wider uppercase">Envío gratis</span>
            </span>
            <span className="font-semibold text-[#c9a84c] tracking-wide">
              {tieneEnvioGratis ? '¡Listo!' : `$${faltante.toFixed(2)} faltantes`}
            </span>
          </div>
          {faltante > 0 && (
            <p className="text-[10px] text-[#444] mt-1.5 tracking-wide">
              Agrega <span className="text-[#c9a84c] font-semibold">${faltante.toFixed(2)}</span> más para envío gratis
            </p>
          )}
        </div>
      )}

      {/* ── Lista de productos ── */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {cartData.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-14 h-14 border border-[#2e2e2e] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-[#555] text-sm tracking-wide mb-1">Tu carrito está vacío</p>
            <p className="text-[#333] text-xs tracking-wider">Agrega productos para comenzar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartData.items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-start gap-3 p-3 bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#c9a84c]/30 transition-all duration-200"
              >
                {/* Imagen */}
                <div className="relative flex-shrink-0">
                  <img
                    src={import.meta.env.VITE_BACKEND_URL_IMAGENES + item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover brightness-90"
                  />
                  {item.discountPercent > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#c9a84c] text-[#0d0d0d] text-[9px] font-bold px-1.5 py-0.5">
                      -{item.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Detalles */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white line-clamp-1 tracking-wide">{item.name}</p>
                      {item.discountPercent > 0 && (
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-[10px] line-through text-[#444]">${item.basePrice.toFixed(2)}</span>
                          <span className="text-xs text-[#c9a84c] font-semibold">${item.finalPrice}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleEliminar(item.cartItemId)}
                      className="text-[#333] hover:text-[#c9a84c] transition-colors flex-shrink-0"
                      aria-label="Eliminar producto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Cantidad + precio */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-0">
                      <button
                        onClick={() => handleDecrementar(item.cartItemId, item.productId)}
                        className="w-6 h-6 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#666] hover:text-[#c9a84c] transition-all text-xs"
                        aria-label="Decrementar"
                      >
                        −
                      </button>
                      <span className="text-xs font-semibold text-white w-7 text-center border-y border-[#2e2e2e] h-6 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrementar(item.cartItemId, item.productId)}
                        className="w-6 h-6 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#666] hover:text-[#c9a84c] transition-all text-xs"
                        aria-label="Incrementar"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">${item.subtotal.toFixed(2)}</p>
                      {item.discountPercent > 0 && (
                        <p className="text-[10px] text-[#7abf8a]">−${item.itemSavings.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Resumen y checkout ── */}
      {totalItems > 0 && (
        <div className="border-t border-[#2e2e2e] bg-[#0d0d0d] px-5 py-5">

          {/* Ahorro */}
          {totalSavings > 0 && (
            <div className="flex items-center justify-between mb-4 px-3 py-2 bg-[#7abf8a]/10 border border-[#7abf8a]/20">
              <span className="text-[10px] text-[#7abf8a] tracking-widest uppercase font-semibold">Estás ahorrando</span>
              <span className="text-sm font-bold text-[#7abf8a]">${totalSavings.toFixed(2)}</span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[10px] text-[#444] tracking-widest uppercase">Subtotal</span>
            <span className="text-sm text-[#888]">${subtotal.toFixed(2)}</span>
          </div>
          {!tieneEnvioGratis && costoEnvioGratis > 0 && (
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] text-[#444] tracking-widest uppercase">Envío</span>
              <span className="text-sm text-[#888]">${costoEnvio.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline pt-3 mt-3 border-t border-[#2e2e2e] mb-5">
            <span className="text-xs text-white font-semibold tracking-widest uppercase">Total</span>
            <span className="text-lg font-bold text-[#c9a84c]">${totalFinal.toFixed(2)}</span>
          </div>

          {/* CTA checkout */}
          <button
            onClick={onOpenCheck}
            className="w-full bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Proceder al pago
          </button>

          {/* Métodos aceptados */}
          <div className="mt-4 pt-4 border-t border-[#1e1e1e] flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#7abf8a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] text-[#444] tracking-wider uppercase">Pago seguro ·</span>
            <div className="flex gap-1.5">
              {['VISA', 'MC', 'AMEX', 'PayPal'].map(m => (
                <span key={m} className="text-[9px] bg-[#1a1a1a] border border-[#2e2e2e] text-[#555] px-1.5 py-0.5 tracking-wider">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideCarrito;