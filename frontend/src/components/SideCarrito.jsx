import React, { useState, useEffect } from 'react';
import { Truck } from "lucide-react";
import clientAxios from '../config/axios';

const SideCarrito = ({ onOpenCheck }) => {
  const [cartData, setCartData] = useState({
    items: [],
    cartInfo: null,
    loading: true,
    error: null
  });

  const envioGratis = 1000; 

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      const response = await clientAxios.get('/GetCartItemsByUserId', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && response.data.data) {
        // Transformar los datos de la API
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

        // Calcular totales
        const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
        const subtotalOriginal = items.reduce((acc, item) => acc + item.subtotalOriginal, 0);
        const totalSavings = items.reduce((acc, item) => acc + item.itemSavings, 0);
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

        setCartData({
          items,
          cartInfo: {
            subtotal,
            subtotalOriginal,
            totalSavings,
            totalItems,
            grandTotal: subtotal,
            cartId: response.data.cartId || null
          },
          loading: false,
          error: null
        });
      }
    } catch (ex) {
      console.warn(ex.response?.data?.msg || ex || "Ocurrió un error inesperado al intentar consultar los items del carrito");
      setCartData(prev => ({
        ...prev,
        loading: false,
         error: null 
        //  ex.response?.data?.msg || "Error al cargar el carrito"
      }));
    }
  };

  const handleIncrementar = async (cartItemId, productId) => {
      try{
      const token = localStorage.getItem("ape_token");
      const body = {
        quantity: 1,
        variantId: null
      };

      if(!token) return;

      const response = await clientAxios.post(`/SetCartItem/${productId}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
      }});

      console.log("Producto agregado al carrito:", response.data);      
      // Por ahora, actualizamos localmente
      setCartData(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + 1, subtotal: item.finalPrice * (item.quantity + 1) }
            : item
        )
      }));
      
      // Recargar datos reales
      getCartItems();
      
    }catch(ex){
      console.error("Error al agregar producto al carrito:", ex.response.data.message);
    }
  };

  const handleDecrementar = async (cartItemId, productId, idVariant = null) => {
    try {
      const token = localStorage.getItem('ape_token');

      if(!token || token === null || token === '') return;

      const response = await clientAxios.post('/DeleteItemCart', { productId, idVariant , quantity: 1  }, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        }});

      setCartData(prev => {
        const updatedItems = prev.items.map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = Math.max(1, item.quantity - 1);
            return { 
              ...item, 
              quantity: newQty, 
              subtotal: item.finalPrice * newQty 
            };
          }
          return item;
        });
        
        // Eliminar item si cantidad llega a 0
        const filteredItems = updatedItems.filter(item => item.quantity > 0);
        
        return {
          ...prev,
          items: filteredItems
        };
      });
      
      getCartItems();
    } catch (error) {
      console.error('Error al decrementar cantidad:', error);
    }
  };

  const handleEliminar = async (cartItemId) => {
    try {
      const token = localStorage.getItem('ape_token');
      if(!token || token === null || token === '') return;
      
      const response = await clientAxios.post(`/DeleteCartByProducto`, { cartItemId }, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
      }});

      console.log('Producto eliminado del carrito:', response.data);
      
      setCartData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.cartItemId !== cartItemId)
      }));
      
      getCartItems();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // const handleVaciarCarrito = async () => {
  //   try {
  //     const token = localStorage.getItem('ape_token');
  //     // await clientAxios.post('/ClearCart');
      
  //     setCartData({
  //       items: [],
  //       cartInfo: null,
  //       loading: false,
  //       error: null
  //     });
  //   } catch (error) {
  //     console.error('Error al vaciar carrito:', error);
  //   }
  // };

  // Calcular valores basados en datos reales
  const subtotal = cartData.cartInfo?.subtotal || 0;
  const totalItems = cartData.cartInfo?.totalItems || 0;
  const totalSavings = cartData.cartInfo?.totalSavings || 0;
  const faltante = Math.max(0, envioGratis - subtotal);
  const porcentajeCompletado = Math.min((subtotal / envioGratis) * 100, 100);
  const tieneEnvioGratis = subtotal >= envioGratis;
  const costoEnvio = tieneEnvioGratis ? 0 : 150;
  const totalFinal = subtotal + costoEnvio;

  if (cartData.loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Cargando carrito...</p>
      </div>
    );
  }

  if (cartData.error) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8 text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-gray-700 mb-2">{cartData.error}</p>
        <button 
          onClick={getCartItems}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Barra de progreso para envío gratis */}
      {totalItems > 0 && (
        <div className="px-4 pt-4">
          <div className="bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${porcentajeCompletado}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <div className='flex align-middle'>
              <Truck className='text-gray-500' size={15}/>
              <span className="px-2 font-medium"> Envío gratis</span>
            </div>
            <span className="font-semibold">
              {tieneEnvioGratis ? '🎉 ¡Listo!' : `$${faltante} faltantes`}
            </span>
          </div>
          {faltante > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              Agrega <span className="font-bold text-green-600">${faltante.toFixed(2)}</span> más para envío gratis
            </p>
          )}
        </div>
      )}

      {/* Lista de productos */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartData.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 mb-4 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-2">Tu carrito está vacío</p>
            <p className="text-gray-400 text-xs">Agrega productos para comenzar tu compra</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartData.items.map((item) => (
              <div key={item.cartItemId} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm">
                {/* Imagen del producto */}
                <div className="relative">
                  <img 
                    src={import.meta.env.VITE_BACKEND_URL_IMAGENES + item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                  />
                  {item.discountPercent > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-10 h-5 rounded-full flex items-center justify-center">
                      -{item.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Detalles del producto */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                      
                      {/* Información de descuento */}
                      {item.discountPercent > 0 && (
                        <div className="mt-1 flex items-center gap-1">
                          <span className="text-xs line-through text-gray-400">
                            ${item.basePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 font-bold px-1 py-0.5 rounded">
                            ${item.finalPrice}
                          </span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => handleEliminar(item.cartItemId)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Controles de cantidad y precio */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDecrementar(item.cartItemId, item.productId)}
                        className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-xs">−</span>
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleIncrementar(item.cartItemId, item.productId)}
                        className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-xs">+</span>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        ${item.subtotal.toFixed(2)}
                      </p>
                      {item.discountPercent > 0 && (
                        <p className="text-xs text-green-600 font-medium">
                          Ahorro: ${item.itemSavings.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumen y checkout */}
      {totalItems > 0 && (
        <div className="p-4 bg-gradient-to-b from-white to-gray-50">
          {/* Resumen de precios */}
          <div className="space-y-2 mb-4">
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-base font-bold">
                <span>Total:</span>
                <span className="text-blue-700">
                  ${totalFinal.toFixed(2)}
                </span>
              </div>
              {!tieneEnvioGratis && (
                <p className="text-xs text-gray-500 mt-1">
                  * El envío se calcula al finalizar la compra
                </p>
              )}
            </div>
          </div>
              {totalSavings > 0 && (
            <div className="mb-3 p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-800 font-medium">¡Estás ahorrando!</span>
                <span className="text-sm font-bold text-green-700">${totalSavings.toFixed(2)}</span>
              </div>
            </div>
          )}
          {/* Botón de checkout */}
          <button 
            onClick={onOpenCheck}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Proceder al pago 
          </button>

          {/* Métodos de pago seguros */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Pago 100% seguro
            </p>
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-400">Aceptamos:</div>
              <div className="flex gap-1">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">VISA</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">MC</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">AMEX</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideCarrito;