import React, { useState, useEffect, useMemo } from "react";
import {
  FaShoppingCart,
  FaTruck,
  FaCcVisa,
  FaCcStripe,
  FaCcMastercard,
  FaApplePay,
  FaCcPaypal,
  FaShieldAlt,
  FaHeadset,
  FaExchangeAlt,
  FaStar,
  FaCheck,
} from "react-icons/fa";

// Constantes para mejor mantenibilidad
const PAYMENT_METHODS = [
  { icon: FaCcVisa, color: "#1A1F71", name: "Visa" },
  { icon: FaCcStripe, color: "#635BFF", name: "Stripe" },
  { icon: FaCcMastercard, color: "#EB001B", name: "Mastercard" },
  { icon: FaApplePay, color: "#000000", name: "Apple Pay" },
  { icon: FaCcPaypal, color: "#003087", name: "PayPal" },
];

const BENEFITS = [
  { icon: FaTruck, text: "Llega mañana", subtext: "Envío gratis en pedidos > $900" },
  { icon: FaShieldAlt, text: "Garantía 30 días", subtext: "Satisfacción o reembolso" },
  { icon: FaHeadset, text: "Soporte 24/7", subtext: "Asistencia inmediata" },
  { icon: FaExchangeAlt, text: "Devoluciones", subtext: "Fáciles y rápidas" },
];

/**
 * ProductoDetalle - Componente mejorado para mostrar detalles de producto
 * @param {Object} props
 * @param {Object} props.producto - Objeto completo del producto
 * @param {Function} props.onAddToCart - Callback para agregar al carrito
 * @param {Function} props.onBuyNow - Callback para compra inmediata
 */
const ProductoDetalle = ({ 
  producto, 
  onAddToCart, 
  onBuyNow,
  className = "" 
}) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL_IMAGENES || "";
  const [imagenActual, setImagenActual] = useState("");
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(false);

  // Extraer datos de forma segura
  const imagenes = producto?.Producto?.Imagenes || [];
  const variantes = producto?.Variantes || [];
  const testimonios = producto?.Testimonios || [];
  const faqs = producto?.Faqs || [];

  // Calcular rating promedio de testimonios
  const ratingPromedio = useMemo(() => {
    if (!testimonios.length) return 0;
    const suma = testimonios.reduce((acc, t) => acc + (t.Rating || 0), 0);
    return (suma / testimonios.length).toFixed(1);
  }, [testimonios]);

  // Inicializar estados cuando cambie el producto
  useEffect(() => {
    if (imagenes.length > 0) {
      setImagenActual(baseURL + imagenes[0].URL);
    } else {
      setImagenActual("https://via.placeholder.com/600x800?text=Sin+imagen");
    }
    
    setVarianteSeleccionada(null);
    setCantidad(1);
  }, [producto, imagenes, baseURL]);

  // Helpers
  const formatoMoneda = (valor) => {
    if (valor === null || valor === undefined || isNaN(Number(valor))) 
      return "$0.00";
    return new Intl.NumberFormat("es-MX", { 
      style: "currency", 
      currency: "MXN" 
    }).format(Number(valor));
  };

  // Cálculos de precio
  const { precioBase, descuento, precioFinal, stockDisponible } = useMemo(() => {
    const base = varianteSeleccionada?.Precio ?? producto?.Producto?.Precio ?? 0;
    const desc = varianteSeleccionada?.Descuento ?? producto?.Producto?.Descuento ?? 0;
    const final = Number(base) * (1 - Number(desc) / 100);
    const stock = varianteSeleccionada?.Stock ?? producto?.Producto?.Disponible ?? 0;
    
    return {
      precioBase: base,
      descuento: desc,
      precioFinal: final,
      stockDisponible: stock
    };
  }, [varianteSeleccionada, producto]);

  const manejarSeleccionVariante = (variante) => {
    setVarianteSeleccionada(variante);
    // Si la variante tiene imagen específica, actualizar
    if (variante.ImagenURL) {
      setImagenActual(baseURL + variante.ImagenURL);
    }
  };

  const manejarAgregarCarrito = async () => {
    if (stockDisponible === 0) return;
    
    setCargando(true);
    try {
      const payload = {
        productoId: producto.Producto.ProductoId,
        nombre: producto.Producto.NombreProducto,
        varianteId: varianteSeleccionada?.VarianteId ?? null,
        nombreVariante: varianteSeleccionada?.Nombre ?? null,
        precio: precioFinal,
        imagen: imagenActual,
        cantidad: cantidad,
        stock: stockDisponible,
      };

      if (onAddToCart) {
        await onAddToCart(payload);
      } else {
        console.log("Agregar al carrito:", payload);
        // TODO: Implementar lógica por defecto
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    } finally {
      setCargando(false);
    }
  };

  const manejarCompraInmediata = async () => {
    await manejarAgregarCarrito();
    if (onBuyNow) {
      onBuyNow();
    } else {
      console.log("Redirigiendo a checkout...");
      // TODO: Implementar redirección por defecto
    }
  };

  const estaAgotado = stockDisponible === 0;
  const maxCantidad = Math.min(stockDisponible, 10);

  // Estado de carga
  if (!producto?.Producto) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  const productoPrincipal = producto.Producto;

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-8 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* GALERÍA DE IMÁGENES */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-4">
            {/* Imagen principal */}
            <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-4">
              <img
                src={imagenActual}
                alt={productoPrincipal.NombreProducto}
                className="w-full h-full object-contain transition-opacity duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x800?text=Error+imagen";
                }}
              />
              {descuento > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{descuento}%
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {imagenes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imagenes.map((img, index) => {
                  const url = baseURL + img.URL;
                  const estaActiva = imagenActual === url;
                  return (
                    <button
                      key={index}
                      onClick={() => setImagenActual(url)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                        estaActiva 
                          ? "border-blue-500 ring-2 ring-blue-200" 
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      aria-label={`Ver imagen ${index + 1} de ${productoPrincipal.NombreProducto}`}
                    >
                      <img 
                        src={url} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* INFORMACIÓN DEL PRODUCTO */}
        <div className="w-full lg:w-1/2">
          {/* Encabezado */}
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {productoPrincipal.NombreProducto}
            </h1>
            
            {/* Rating */}
            {testimonios.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(ratingPromedio) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {ratingPromedio} ({testimonios.length} reseñas)
                </span>
              </div>
            )}
          </div>

          {/* Descripción breve */}
          {productoPrincipal.Descripcion && (
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {productoPrincipal.Descripcion}
            </p>
          )}

          {/* Precio y Stock */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {formatoMoneda(precioFinal)}
              </span>
              {descuento > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatoMoneda(precioBase)}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                    {descuento}% OFF
                  </span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${estaAgotado ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className={`text-sm font-medium ${estaAgotado ? 'text-red-600' : 'text-green-600'}`}>
                {estaAgotado ? 'Agotado' : `En stock (${stockDisponible} disponibles)`}
              </span>
            </div>
          </div>

          {/* Selector de Variantes */}
          {variantes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Variantes disponibles
              </label>
              <div className="flex flex-wrap gap-2">
                {variantes.map((variante) => (
                  <button
                    key={variante.VarianteId}
                    onClick={() => manejarSeleccionVariante(variante)}
                    disabled={variante.Stock === 0}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      varianteSeleccionada?.VarianteId === variante.VarianteId
                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                        : variante.Stock === 0
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:shadow-sm"
                    }`}
                  >
                    {variante.Nombre}
                    {variante.Precio && variante.Precio !== productoPrincipal.Precio && (
                      <span className="ml-1 text-xs">
                        ({formatoMoneda(variante.Precio)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de Color */}
          {variantes.some(v => v.ColorHex) && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Color
              </label>
              <div className="flex gap-3">
                {variantes
                  .filter(v => v.ColorHex)
                  .map((v) => (
                    <button
                      key={v.VarianteId}
                      onClick={() => manejarSeleccionVariante(v)}
                      disabled={v.Stock === 0}
                      title={`${v.Nombre}${v.Stock === 0 ? ' - Agotado' : ''}`}
                      className={`relative w-10 h-10 rounded-full border-3 transition-transform ${
                        v.Stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                      } ${
                        varianteSeleccionada?.VarianteId === v.VarianteId 
                          ? 'border-gray-900 ring-2 ring-gray-300' 
                          : 'border-white'
                      }`}
                      style={{ backgroundColor: v.ColorHex }}
                    >
                      {varianteSeleccionada?.VarianteId === v.VarianteId && (
                        <FaCheck className="absolute -top-1 -right-1 text-xs bg-white text-gray-900 rounded-full p-0.5" />
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Selector de Cantidad */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Cantidad
            </label>
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                  disabled={cantidad <= 1}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(prev => Math.min(maxCantidad, prev + 1))}
                  disabled={cantidad >= maxCantidad}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                Máximo {maxCantidad} por pedido
              </span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={manejarAgregarCarrito}
              disabled={estaAgotado || cargando}
              className="flex-1 px-8 py-4 border-2 border-yellow-500 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {cargando ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaShoppingCart className="text-xl" />
              )}
              {estaAgotado ? 'Agotado' : cargando ? 'Agregando...' : 'Añadir al Carrito'}
            </button>

            <button
              onClick={manejarCompraInmediata}
              disabled={estaAgotado || cargando}
              className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              Comprar Ahora
            </button>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <benefit.icon className="text-blue-600 text-xl" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{benefit.text}</div>
                  <div className="text-xs text-gray-500">{benefit.subtext}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Métodos de Pago */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm font-semibold text-gray-900 mb-4 text-center">
              Métodos de pago aceptados
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {PAYMENT_METHODS.map((method, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-700 text-2xl rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  title={method.name}
                >
                  <method.icon style={{ color: method.color }} />
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              Compra 100% segura y protegida
            </p>
          </div>
        </div>
      </div>

      {/* DESCRIPCIÓN DETALLADA */}
      {productoPrincipal.Descripcion && (
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Descripción Detallada
          </h2>
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: productoPrincipal.Descripcion }}
          />
        </section>
      )}
    </section>
  );
};

export default ProductoDetalle;