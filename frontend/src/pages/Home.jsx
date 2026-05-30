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

// Componente de tarjeta de producto — estilo dark luxury
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
      whileHover={{ y: -6 }}
      className="bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#c9a84c] rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_8px_40px_rgba(201,168,76,0.15)] transition-all flex flex-col relative group"
    >
      <Link to={`/Producto/${id}`} aria-label={`Ver detalles de ${nombre}`}>
        <div className="overflow-hidden">
          <img
            src={import.meta.env.VITE_BACKEND_URL_IMAGENES + img}
            alt={nombre}
            className="w-full h-36 sm:h-44 md:h-52 object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Badges */}
      {descuento > 0 && (
        <span className="absolute top-3 left-3 bg-[#c9a84c] text-[#0d0d0d] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow">
          <FaFire className="text-[#0d0d0d]" /> -{descuento}%
        </span>
      )}
      {stock < 3 && stock > 0 && (
        <span className="absolute top-3 right-3 bg-[#2e2e2e] border border-[#c9a84c] text-[#c9a84c] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
          <FaBolt /> {stock} left
        </span>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <FaStar className="text-[#c9a84c] text-xs" />
            <span className="text-xs font-semibold text-[#c9a84c]">{rating}</span>
          </div>
          <span className="text-[10px] text-[#888] tracking-wider uppercase">
            {vendidos}+ vendidos
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 leading-snug tracking-tight">
          {nombre}
        </h3>
        <p className="text-xs text-[#888] mt-1 flex items-center gap-1 tracking-wider uppercase">
          <FaGem className="text-[#c9a84c] text-[10px]" /> {marca}
        </p>

        <div className="mt-4 pt-4 border-t border-[#2e2e2e]">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">
              ${precio}
            </span>
            <span className="text-xs line-through text-[#555]">
              ${precioOriginal}
            </span>
          </div>
          <p className="text-xs font-medium text-[#7abf8a] flex items-center gap-1 mt-1">
            <FaCheck className="text-[#7abf8a]" /> Ahorras ${ahorro}
          </p>
        </div>

        <button
          onClick={() => onAddToCart(id)}
          className="mt-4 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-bold tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed"
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

// Skeleton luxury
const ProductSkeleton = () => (
  <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-36 sm:h-44 md:h-52 bg-[#2a2a2a]" />
    <div className="p-5 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-10 bg-[#2e2e2e] rounded-full" />
        <div className="h-3 w-16 bg-[#2e2e2e] rounded-full" />
      </div>
      <div className="h-4 w-3/4 bg-[#2e2e2e] rounded" />
      <div className="h-3 w-1/2 bg-[#2e2e2e] rounded" />
      <div className="h-6 w-1/3 bg-[#2e2e2e] rounded" />
      <div className="h-10 w-full bg-[#2e2e2e] rounded-xl mt-2" />
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
    try {
      const token = localStorage.getItem("ape_token");
      const body = { quantity: 1, variantId: null };
      if (!token) return;
      const response = await clientAxios.post(`/SetCartItem/${productId}`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.cart("Producto agregado al carrito");
    } catch (ex) {
      console.error("Error al agregar producto al carrito:", ex.response.data.message);
      toast.error(ex.response.data.message || "Error al agregar el producto al carrito");
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/60 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop"
          alt="Banner cosméticos: productos de belleza"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Línea decorativa lateral */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-[#c9a84c]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
          <div className="w-px h-20 bg-[#c9a84c]/50" />
        </div>

        <div className="relative z-20 text-left px-8 md:px-24 max-w-4xl w-full">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-semibold mb-4"
          >
            Colección Premium
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight"
          >
            Descubre tu<br />
            <span className="text-[#c9a84c] italic font-serif">belleza natural</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg mb-10 text-[#aaa] max-w-md leading-relaxed"
          >
            Productos de alta calidad para el cuidado personal, seleccionados para ti.
          </motion.p>
          <Link
            to="/Productos"
            className="inline-flex items-center gap-3 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300"
            aria-label="Ir a comprar ahora"
          >
            Explorar colección
            <span className="text-base">→</span>
          </Link>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="py-16 bg-[#111]" aria-label="Beneficios">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2e2e2e] border border-[#2e2e2e] text-center overflow-hidden">
          {[
            { icon: "🚚", title: "Envío Gratis", desc: "En pedidos superiores a $999" },
            { icon: "💳", title: "Pagos Seguros", desc: "Compra protegida 100% garantizada" },
            { icon: "🔄", title: "Devoluciones Fáciles", desc: "30 días para cambios sin complicaciones" },
          ].map((b, i) => (
            <div key={i} className="bg-[#111] px-10 py-12 hover:bg-[#161616] transition-colors group">
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{b.icon}</div>
              <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-2">{b.title}</h3>
              <p className="text-[#666] text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="promos-heading">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-semibold mb-3">Lo más vendido</p>
            <h2 id="promos-heading" className="text-3xl md:text-4xl font-light text-white">
              Productos Destacados
            </h2>
          </div>
          <Link to="/Productos" className="hidden md:inline-flex items-center gap-2 text-xs text-[#666] hover:text-[#c9a84c] tracking-widest uppercase transition-colors">
            Ver todos <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : productos.length === 0 ? (
          <p className="text-center text-[#555]">No hay productos disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productos.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </section>

      {/* ── CATEGORÍAS ── */}
      <section className="py-20 bg-[#0d0d0d]" aria-labelledby="categorias-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-semibold mb-3">Navegar</p>
              <h2 id="categorias-heading" className="text-3xl md:text-4xl font-light text-white">
                Explora por Categorías
              </h2>
            </div>
          </div>

          {categorias.length === 0 ? (
            <p className="text-center text-[#555]">Cargando categorías...</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className="mySwiper"
            >
              {categorias.map((cat) => (
                <SwiperSlide key={cat.categoriaId}>
                  <Link
                    to={`/Productos?categoria=${cat.categoriaId}`}
                    className="relative block overflow-hidden shadow-lg hover:shadow-[0_4px_30px_rgba(201,168,76,0.2)] transition group"
                    aria-label={`Ver productos de ${cat.nombre}`}
                  >
                    <img
                      src={import.meta.env.VITE_BACKEND_URL_IMAGENES + cat.imagen || "/no-image.png"}
                      alt={cat.nombre}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-700 brightness-75"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent flex items-end justify-start p-4">
                      <span className="text-white text-sm font-semibold tracking-widest uppercase drop-shadow-lg group-hover:text-[#c9a84c] transition-colors">
                        {cat.nombre}
                      </span>
                    </div>
                    {/* Gold border bottom on hover */}
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#c9a84c] transition-all duration-500" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="testimonios-heading">
        <div className="mb-14">
          <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-semibold mb-3">Reseñas</p>
          <h2 id="testimonios-heading" className="text-3xl md:text-4xl font-light text-white">
            Lo que dicen nuestras clientas
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((t) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: t * 0.1 }}
              className="bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#c9a84c]/40 rounded-2xl p-8 transition-all"
            >
              {/* Estrellas */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#c9a84c] text-xs" />
                ))}
              </div>
              <p className="text-[#aaa] text-sm leading-relaxed mb-6 italic">
                "Excelente experiencia, productos de calidad y entrega rápida. Sin duda volveré a comprar."
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-[#2e2e2e]">
                <img
                  src={`https://randomuser.me/api/portraits/women/${t + 20}.jpg`}
                  alt={`Cliente ${t}`}
                  className="w-10 h-10 rounded-full object-cover border border-[#2e2e2e]"
                />
                <div>
                  <h4 className="text-white text-sm font-semibold tracking-wide">Cliente {t}</h4>
                  <span className="text-[#c9a84c] text-[10px] tracking-wider uppercase flex items-center gap-1">
                    <FaCheck className="text-[10px]" /> Compradora verificada
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      {!isAuth && (
        <section className="bg-[#0d0d0d] border-t border-[#2e2e2e] py-24 text-center relative overflow-hidden">
          {/* Decoración fondo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[20rem] font-bold text-white leading-none">✦</span>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-semibold mb-4">Exclusivo</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              No te pierdas nuestras ofertas
            </h2>
            <p className="mb-10 text-[#666] text-sm tracking-wide">
              Recibe promociones exclusivas directamente en tu correo.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="flex-1 px-6 py-4 bg-[#1a1a1a] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#444] outline-none text-sm transition-colors"
                required
                aria-label="Correo electrónico para suscripción"
              />
              <button
                type="submit"
                onClick={() => SetSuscriptionByUser(newsletterEmail)}
                disabled={newsletterStatus === 'loading'}
                className="bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] px-8 py-4 font-bold tracking-[0.2em] uppercase text-xs transition-all disabled:opacity-40 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {newsletterStatus === 'loading' ? (
                  <><FaSpinner className="animate-spin" /> Enviando...</>
                ) : (
                  'Suscribirme'
                )}
              </button>
            </form>
            {newsletterStatus === 'success' && (
              <p className="mt-6 text-[#7abf8a] text-sm tracking-wide">¡Suscripción exitosa! Revisa tu correo.</p>
            )}
            {newsletterStatus === 'error' && (
              <p className="mt-6 text-[#e07070] text-sm tracking-wide">Ocurrió un error. Intenta de nuevo.</p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;