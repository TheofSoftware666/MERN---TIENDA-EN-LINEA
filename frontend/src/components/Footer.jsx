import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/axios.jsx";

import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Heart,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";

import {
  FaCcVisa,
  FaCcStripe,
  FaCcMastercard,
  FaApplePay,
  FaCcPaypal,
} from "react-icons/fa6";

const Footer = () => {
  const [configEco, setConfigEco] = useState(null);
  const [configSocial, setConfigSocial] = useState(null);
  const [configMetodos, setConfigMetodos] = useState(null);

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  const paymentIcons = {
    visa: FaCcVisa,
    mastercard: FaCcMastercard,
    paypal: FaCcPaypal,
    stripe: FaCcStripe,
    applepay: FaApplePay,
  };

  const paymentStyles = {
    visa: "hover:text-blue-500",
    mastercard: "hover:text-red-500",
    paypal: "hover:text-sky-500",
    stripe: "hover:text-indigo-500",
    applepay: "hover:text-gray-300",
  };

  useEffect(() => {
    GetCostShipping();
  }, []);

  const GetCostShipping = async () => {
    try {
      // const token = localStorage.getItem('ape_token');
      // if (!token || token === null || token === '') return;
      const response = await clientAxios.get('/Admin/GetConfigEcoPublic')
      //, {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        // }
      // });

      setConfigEco(response.data.tienda.config || null);
      setConfigSocial(response.data.tienda.socialMedia || null);
      setConfigMetodos(response.data.tienda.metodosPago || null);
    } catch (ex) {
      console.warn(ex.data || ex || "Ocurrio un error inesperado al intentar consultar el costo de envio");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-rose-50 text-gray-700 px-6 sm:px-12 pt-12 pb-4 border-t border-rose-100">
      <div className="max-w-7xl mx-auto">
        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* 1. Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              {configEco?.logo_url ? (
                <img
                  src={import.meta.env.VITE_BACKEND_URL_IMAGENES + configEco.logo_url}
                  alt={configEco?.nombre_tienda || "Logo"}
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : null}
              <h2
                className="text-2xl font-semibold text-gray-800"
                style={{ display: configEco?.logo_url ? "none" : "block" }}
              >
                {configEco?.nombre_tienda || "Cosmética Glam"}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              {configEco?.descripcion ||
                "Tu tienda de cosméticos de confianza. Productos de belleza de alta calidad para realzar tu glamour natural. Envíos rápidos y seguros."}
            </p>
            <div className="flex items-center gap-2 text-rose-400">
              <Heart size={16} fill="currentColor" />
              <span className="text-xs">Belleza que inspira</span>
            </div>
          </div>

          {/* 2. Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span>📞</span> Contacto
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mb-4"></div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${configEco?.telefono || "+52 332 052 5516"}`}
                  className="text-gray-600 hover:text-rose-500 transition flex items-center gap-2"
                >
                  <span className="text-rose-300">📱</span>
                  {configEco?.telefono || "+52 332 052 5516"}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${configEco?.correo_contacto || "ventas@tuecommerce.com"}`}
                  className="text-gray-600 hover:text-rose-500 transition flex items-center gap-2"
                >
                  <span className="text-rose-300">✉️</span>
                  {configEco?.correo_contacto || "ventas@tuecommerce.com"}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${configEco?.telefono || "5215512345678"}?text=${encodeURIComponent(
                    `Hola 👋 Estoy visitando ${configEco?.nombre_tienda || "su tienda online"} y me gustaría recibir asesoría para realizar mi compra. ¿Podrían ayudarme? 😊`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-rose-500 transition flex items-center gap-2"
                >
                  <span className="text-rose-300">💬</span>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Métodos de pago */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <CreditCard size={18} className="text-rose-400" /> Pago seguro
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mb-4"></div>
            <div className="flex flex-wrap gap-3 text-3xl text-gray-400">
              {configMetodos
                ?.filter((metodo) => metodo.activo === 1)
                .map((metodo, index) => {
                  const key = metodo.nombre_metodo.toLowerCase();
                  const IconComponent = paymentIcons[key];
                  if (!IconComponent) return null;
                  return (
                    <IconComponent
                      key={index}
                      className={`transition ${paymentStyles[key] || "hover:text-rose-400"}`}
                    />
                  );
                })}
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
              <Shield size={14} className="text-rose-300" /> Pagos 100% seguros · SSL
            </p>
          </div>

          {/* 4. Categorías */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span>🛍️</span> Categorías
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mb-4"></div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/Productos" className="text-gray-600 hover:text-rose-500 transition">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-gray-600 hover:text-rose-500 transition">
                  Promociones
                </Link>
              </li>
              <li>
                <Link to="/mas-vendidos" className="text-gray-600 hover:text-rose-500 transition">
                  Lo más vendido
                </Link>
              </li>
              <li>
                <Link to="/marcas" className="text-gray-600 hover:text-rose-500 transition">
                  Marcas
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. Redes sociales */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span>🌟</span> Síguenos
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mb-4"></div>
            <div className="flex gap-4 text-gray-500">
              {configSocial?.map((red, index) => {
                const key = red.nombre_red.toLowerCase();
                const IconComponent = socialIcons[key];
                if (!IconComponent) return null;
                return (
                  <a
                    key={index}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rose-500 transition-transform hover:scale-110"
                    aria-label={`Síguenos en ${red.nombre_red}`}
                  >
                    <IconComponent size={22} />
                  </a>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Truck size={16} className="text-rose-400" />
              <span>Envío gratis en compras $999</span>
            </div>
          </div>
        </div>

        {/* Franja inferior con métodos de pago (opcional, pero podemos simplificar) */}
        {configMetodos && configMetodos.length > 0 && (
          <div className="mt-10 pt-6 border-t border-rose-100">
            <div className="flex flex-wrap justify-center items-center gap-6 text-3xl text-gray-400">
              {configMetodos
                ?.filter((metodo) => metodo.activo === 1)
                .map((metodo, index) => {
                  const key = metodo.nombre_metodo.toLowerCase();
                  const IconComponent = paymentIcons[key];
                  if (!IconComponent) return null;
                  return (
                    <IconComponent
                      key={index}
                      className={`transition ${paymentStyles[key] || "hover:text-rose-400"}`}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="mt-8 pt-4 text-center border-t border-rose-100">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {configEco?.nombre_tienda || "Cosmética Glam"}. Todos los derechos reservados.
            <br />
            Sitio desarrollado con <Heart size={12} className="inline text-rose-300 mx-1" /> por{" "}
            <a
              href="https://altisyscorp.com/"
              className="font-medium text-gray-500 hover:text-rose-400 transition"
            >
              Altisys
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;