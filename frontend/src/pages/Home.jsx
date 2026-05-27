import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/axios.jsx";
import { motion } from "framer-motion";
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
  FaStar,
  FaBolt,
  FaFire,
  FaCheck,
  FaCartShopping,
  FaSpinner,
  FaGem,
  FaLeaf,
  FaHeart
} from "react-icons/fa6";

// Componente de tarjeta de producto con estilo cosmético
const ProductCard = React.memo(({ product, onAddToCart }) => {
  const {
    id,
    nombre,
    marca,
    precio,
    precioOriginal,
    descuento,
    stock,
    vendidos,
    rating,
    img
  } = product;

  const ahorro = (precioOriginal - precio).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-pink-100 hover:border-pink-300 flex flex-col relative"
    >
      <Link to={`/Producto/${id}`} aria-label={`Ver detalles de ${nombre}`}>
        <img
          src={import.meta.env.VITE_BACKEND_URL_IMAGENES + img}
          alt={nombre}
          className="w-full h-36 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </Link>

      {/* Badges con estilo cosmético */}
      {descuento > 0 && (
        <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
          <FaFire /> -{descuento}% OFF
        </span>
      )}
      {stock < 3 && stock > 0 && (
        <span className="absolute top-2 right-2 bg-amber-400 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
          <FaBolt /> ¡Últimos {stock}!
        </span>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <FaStar className="text-amber-400 text-sm" />
            <span className="text-xs font-semibold text-gray-700">{rating}</span>
          </div>
          <span className="text-xs text-pink-400 bg-pink-50 px-2 py-0.5 rounded-full">
            {vendidos}+ vendidos
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
          {nombre}
        </h3>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaGem className="text-pink-300" /> {marca}
        </p>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ${precio}
            </span>
            <span className="text-xs line-through text-gray-400">
              ${precioOriginal}
            </span>
          </div>
          <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1">
            <FaCheck className="text-green-500" /> Ahorras ${ahorro}
          </p>
        </div>

        <button
          onClick={() => onAddToCart(id)}
          className="mt-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={stock === 0}
          aria-label={stock === 0 ? "Producto agotado" : "Agregar al carrito"}
        >
          <FaCartShopping />
          {stock === 0 ? "Agotado" : "Agregar"}
        </button>
      </div>
    </motion.div>
  );
});

// Skeleton con estilo acorde
const ProductSkeleton = () => (
  <div className="bg-white/80 rounded-3xl overflow-hidden shadow-lg border border-pink-100 animate-pulse">
    <div className="w-full h-36 sm:h-44 md:h-48 bg-pink-100" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-12 bg-pink-200 rounded-full" />
        <div className="h-3 w-16 bg-pink-200 rounded-full" />
      </div>
      <div className="h-4 w-3/4 bg-pink-200 rounded" />
      <div className="h-3 w-1/2 bg-pink-200 rounded" />
      <div className="h-6 w-1/3 bg-pink-200 rounded" />
      <div className="h-9 w-full bg-pink-200 rounded-xl mt-2" />
    </div>
  </div>
);

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const { toasts, toast, removeToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("ape_token");
    setIsAuth(!!token);

    const fetchData = async () => {
      try {
        await Promise.all([getProducts(), getCategorias()]);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const SetSuscriptionByUser = async (email) => {
  try {
    const payload = { email };

    await clientAxios.post('/SetMessageEcommercePromo', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    setNewsletterStatus('success');
  } catch (ex) {
    console.warn(ex?.response?.data || ex);
    setNewsletterStatus('error');
  }
};

  const getCategorias = async () => {
    try {
      const response = await clientAxios.get("/GetCategorysByTop");
      setCategorias(response.data.categorias.data || []);
    } catch (ex) {
      console.error("Error al obtener categorías:", ex);
    }
  };

  const getProducts = async () => {
    try {
      const response = await clientAxios.get("/ProductosTop");
      const adaptados = response.data.data.map((p) => ({
        id: p.id,
        nombre: p.Name,
        marca: p.Brand,
        precio: Number(p.Price) * (1 - Number(p.Discount) / 100),
        precioOriginal: Number(p.Price),
        descuento: Number(p.Discount),
        stock: p.stock,
        vendidos: p.Sell,
        rating: (Math.random() * 0.8 + 4.2).toFixed(1),
        img: p.Images?.length > 0 ? p.Images[0].url : "/no-image.png",
      }));
      setProductos(adaptados || []);
    } catch (ex) {
      console.error("Error al obtener productos:", ex);
    }
  };

  // const handleAddToCart = useCallback((productId) => {
  //   console.log(`Agregar producto ${productId} al carrito`);
  //   alert(`Producto ${productId} agregado (simulación)`);
  // }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(null), 3000);
    }, 1000);
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
      // console.log("Producto agregado al carrito:", response.data);      
      
    }catch(ex){
      console.error("Error al agregar producto al carrito:", ex.response.data.message);
      toast.error(ex.response.data.message || "Error al agregar el producto al carrito");
    }
  }

  return (
    <>
      {/* Hero con imagen de cosméticos y overlay suave */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <ToastContainer toasts={toasts} removeToast={removeToast}/>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/80 to-pink-200/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop"
          alt="Banner cosméticos: productos de belleza"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 drop-shadow-lg"
          >
            Descubre tu belleza natural ✨
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-gray-700 drop-shadow"
          >
            Productos de alta calidad para el cuidado personal. ¡Encuentra tu favorito!
          </motion.p>
          <Link
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            to="/Productos"
            className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white px-8 py-4 rounded-full font-semibold transition transform hover:scale-105 shadow-lg"
            aria-label="Ir a comprar ahora"
          >
            Comprar ahora
          </Link>
        </div>
      </section>

      {/* Beneficios clave con iconos y colores suaves */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50" aria-label="Beneficios">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
          <div className="p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition border border-pink-100">
            <div className="text-4xl mb-4 text-pink-500">🚚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Envío Gratis</h3>
            <p className="text-gray-600">En pedidos superiores a $999</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition border border-pink-100">
            <div className="text-4xl mb-4 text-pink-500">💳</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pagos Seguros</h3>
            <p className="text-gray-600">Compra protegida 100% garantizada</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition border border-pink-100">
            <div className="text-4xl mb-4 text-pink-500">🔄</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Devoluciones Fáciles</h3>
            <p className="text-gray-600">30 días para cambios sin complicaciones</p>
          </div>
        </div>
      </section>

      {/* Productos destacados con título elegante */}
      <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="promos-heading">
        <div className="text-center mb-12">
          <h2 id="promos-heading" className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
            Productos Destacados
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-4">Lo más vendido y con mejores reseñas</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : productos.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {productos.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </section>

      {/* Categorías con estilo glass y overlay rosa */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50" aria-labelledby="categorias-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="categorias-heading" className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
              Explora por Categorías
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
          </div>

          {categorias.length === 0 ? (
            <p className="text-center text-gray-500">Cargando categorías...</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 30 },
              }}
              className="mySwiper"
            >
              {categorias.map((cat) => (
                <SwiperSlide key={cat.categoriaId}>
                  <Link
                    to={`/Productos?categoria=${cat.categoriaId}`}
                    className="relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
                    aria-label={`Ver productos de ${cat.nombre}`} 
                  >
                    <img
                      src={import.meta.env.VITE_BACKEND_URL_IMAGENES + cat.imagen || "/no-image.png"}
                      alt={cat.nombre}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-transparent to-transparent flex items-end justify-center p-4">
                      <span className="text-white text-lg font-semibold drop-shadow-lg">
                        {cat.nombre}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Testimonios con fotos redondas y fondo suave */}
      <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="testimonios-heading">
        <div className="text-center mb-12">
          <h2 id="testimonios-heading" className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
            Lo que dicen nuestras clientas
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((t) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: t * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition border border-pink-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://randomuser.me/api/portraits/women/${t + 20}.jpg`}
                  alt={`Cliente ${t}`}
                  className="w-16 h-16 rounded-full border-2 border-pink-200"
                />
                <div>
                  <h4 className="text-gray-800 font-semibold">Cliente {t}</h4>
                  <span className="text-pink-400 text-sm flex items-center gap-1">
                    <FaHeart /> Compradora verificada
                  </span>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Excelente experiencia, productos de calidad y entrega rápida. Sin duda volveré a comprar."
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter con estilo rosa */}
      {!isAuth && (
        <section className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">No te pierdas nuestras ofertas</h2>
          <p className="mb-8 text-pink-100">Recibe promociones exclusivas directamente en tu correo.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto px-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
              required
              aria-label="Correo electrónico para suscripción"
            />
            <button
              type="submit"
              onClick={() => SetSuscriptionByUser(newsletterEmail)}
              disabled={newsletterStatus === 'loading'}
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {newsletterStatus === 'loading' ? (
                <>
                  <FaSpinner className="animate-spin" /> Enviando...
                </>
              ) : (
                'Suscribirme'
              )}
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="mt-6 text-white">¡Suscripción exitosa! Revisa tu correo.</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="mt-6 text-red-200">Ocurrió un error. Intenta de nuevo.</p>
          )}
        </section>
      )}
    </>
  );
};

export default Home;