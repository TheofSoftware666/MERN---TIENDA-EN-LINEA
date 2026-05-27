import React, { useState, useEffect, useMemo } from "react";
import clientAxios from "../config/axios.jsx";
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';
import {
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaExchangeAlt,
  FaStar,
  FaCheck,
  FaGem,
  FaLeaf,
  FaHeart,
} from "react-icons/fa";

// Constantes para mejor mantenibilidad
const BENEFITS = [
  { icon: FaTruck, text: "Envío gratis", subtext: "En compras +$999" },
  { icon: FaShieldAlt, text: "Calidad garantizada", subtext: "Productos originales" },
  { icon: FaHeadset, text: "Asesoría personalizada", subtext: "Expertas en belleza" },
  { icon: FaExchangeAlt, text: "Devoluciones", subtext: "Hasta 30 días" },
];

/**
 * ProductoDetalle - Componente para mostrar detalles de producto con estilo cosmético
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
  const { toasts, toast, removeToast } = useToast();

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

  const handleAddToCart = async (productId) => {
    try{
      const token = localStorage.getItem("ape_token");
      const body = {
        quantity: 1,
        variantId: null
      };

      if(!token){
        return;
      }

      const response = await clientAxios.post(`/SetCartItem/${productId}`, body, {
        headers: {
          Authorization : `Bearer ${token}`
      }});

      toast.cart("Producto agregado al carrito");
    }catch(ex){
      console.error("Error al agregar producto al carrito:", ex.response?.data || ex);
      toast.error(ex.response.data.message || "Error al agregar el producto al carrito");
    }
  }

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
          <div className="h-8 bg-pink-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-pink-100 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  const productoPrincipal = producto.Producto;

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-white to-pink-50/30 ${className}`}>
      <ToastContainer toasts={toasts} removeToast={removeToast}/>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* GALERÍA DE IMÁGENES */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-4">
            {/* Imagen principal */}
            <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-lg border border-pink-100 mb-4 relative">
              <img
                src={imagenActual}
                alt={productoPrincipal.NombreProducto}
                className="w-full h-full object-contain transition-opacity duration-300 p-4"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x800?text=Sin+imagen";
                }}
              />
              {descuento > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  -{descuento}%
                </div>
              )}
              {productoPrincipal.EsNuevo && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Nuevo
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {imagenes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {imagenes.map((img, index) => {
                  const url = baseURL + img.URL;
                  const estaActiva = imagenActual === url;
                  return (
                    <button
                      key={index}
                      onClick={() => setImagenActual(url)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                        estaActiva 
                          ? "border-pink-500 ring-2 ring-pink-200" 
                          : "border-pink-100 hover:border-pink-300"
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
            <h1 className="text-3xl lg:text-4xl font-light text-gray-800 mb-3 tracking-tight">
              {productoPrincipal.NombreProducto}
            </h1>
            
            {/* Marca y rating */}
            <div className="flex items-center justify-between">
              {productoPrincipal.Marca && (
                <p className="text-sm text-pink-500 font-medium flex items-center gap-1">
                  <FaGem className="text-pink-300" /> {productoPrincipal.Marca}
                </p>
              )}
              
              {testimonios.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(ratingPromedio) 
                            ? "text-amber-400 fill-current" 
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {ratingPromedio} ({testimonios.length} reseñas)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Descripción breve */}
          {productoPrincipal.Descripcion && (
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {productoPrincipal.Descripcion}
            </p>
          )}

          {/* Precio y Stock */}
          <div className="mb-6 p-5 bg-white rounded-2xl border border-pink-100 shadow-sm">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-semibold text-gray-900">
                {formatoMoneda(precioFinal)}
              </span>
              {descuento > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatoMoneda(precioBase)}
                  </span>
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">
                    Ahorras {formatoMoneda(precioBase - precioFinal)}
                  </span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${estaAgotado ? 'bg-rose-400' : 'bg-green-400'}`}></div>
              <span className={`text-xs font-medium ${estaAgotado ? 'text-rose-600' : 'text-green-600'}`}>
                {estaAgotado ? 'Agotado temporalmente' : `En stock (${stockDisponible} disponibles)`}
              </span>
              {!estaAgotado && (
                <FaHeart className="text-pink-300 text-sm ml-auto" />
              )}
            </div>
          </div>

          {/* Selector de Variantes */}
          {variantes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Elige tu presentación
              </label>
              <div className="flex flex-wrap gap-2">
                {variantes.map((variante) => (
                  <button
                    key={variante.VarianteId}
                    onClick={() => manejarSeleccionVariante(variante)}
                    disabled={variante.Stock === 0}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      varianteSeleccionada?.VarianteId === variante.VarianteId
                        ? "bg-pink-500 text-white border-pink-500 shadow-md"
                        : variante.Stock === 0
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-pink-200 hover:border-pink-400 hover:shadow-sm"
                    }`}
                  >
                    {variante.Nombre}
                    {variante.Precio && variante.Precio !== productoPrincipal.Precio && (
                      <span className="ml-1 text-xs opacity-80">
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
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color / Tono
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
                          ? 'border-pink-500 ring-2 ring-pink-200' 
                          : 'border-white'
                      }`}
                      style={{ backgroundColor: v.ColorHex }}
                    >
                      {varianteSeleccionada?.VarianteId === v.VarianteId && (
                        <FaCheck className="absolute -top-1 -right-1 text-xs bg-white text-pink-600 rounded-full p-0.5 shadow" />
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Botones de Acción */}
          {stockDisponible > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => handleAddToCart(productoPrincipal.ProductoId)}
                disabled={estaAgotado || cargando}
                className="flex-1 px-6 py-4 border-2 border-pink-500 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none"
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
                className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                Comprar Ahora
              </button>
            </div>
          )}

          {/* Beneficios */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-pink-100">
                <benefit.icon className="text-pink-500 text-lg" />
                <div>
                  <div className="text-xs font-semibold text-gray-800">{benefit.text}</div>
                  <div className="text-[10px] text-gray-500">{benefit.subtext}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sello de calidad */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 border-t border-pink-100 pt-4">
            <span className="flex items-center gap-1">
              <FaLeaf className="text-green-500" /> Ingredientes naturales
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-pink-500" /> Cruelty Free
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPCIÓN DETALLADA */}
      {productoPrincipal.Descripcion && (
        <section className="mt-16 border-t border-pink-100 pt-12">
          <h2 className="text-2xl font-light text-gray-800 mb-6 tracking-tight">
            Descripción Detallada
          </h2>
          <div
            className="prose prose-pink max-w-none text-gray-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: productoPrincipal.Descripcion }}
          />
        </section>
      )}
    </section>
  );
};

export default ProductoDetalle;