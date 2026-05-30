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
    visa: "hover:text-blue-400",
    mastercard: "hover:text-red-400",
    paypal: "hover:text-sky-400",
    stripe: "hover:text-indigo-400",
    applepay: "hover:text-white",
  };

  useEffect(() => {
    GetCostShipping();
  }, []);

  const GetCostShipping = async () => {
    try {
      const response = await clientAxios.get('/Admin/GetConfigEcoPublic');
      setConfigEco(response.data.tienda.config || null);
      setConfigSocial(response.data.tienda.socialMedia || null);
      setConfigMetodos(response.data.tienda.metodosPago || null);
    } catch (ex) {
      console.warn(ex.data || ex || "Error al consultar configuración");
    }
  };

  return (
    <footer className="bg-[#0d0d0d] border-t border-[#2e2e2e] text-[#666] px-6 sm:px-12 pt-16 pb-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Grid principal ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* 1. Logo y descripción */}
          <div className="space-y-5 lg:col-span-1">
            <Link to="/" className="inline-block">
              {configEco?.logo_url ? (
                <img
                  src={import.meta.env.VITE_BACKEND_URL_IMAGENES + configEco.logo_url}
                  alt={configEco?.nombre_tienda || "Logo"}
                  className="h-10 object-contain brightness-0 invert"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : null}
              <h2
                className="text-lg font-light text-white tracking-[0.2em] uppercase"
                style={{ display: configEco?.logo_url ? "none" : "block" }}
              >
                {configEco?.nombre_tienda || "Cosmética Glam"}
              </h2>
            </Link>

            <p className="text-[#555] text-sm leading-relaxed">
              {configEco?.descripcion ||
                "Tu tienda de cosméticos de confianza. Productos de belleza de alta calidad para realzar tu glamour natural."}
            </p>

            <div className="flex items-center gap-2 text-[#c9a84c]">
              <div className="w-4 h-px bg-[#c9a84c]" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Belleza que inspira</span>
            </div>
          </div>

          {/* 2. Contacto */}
          <div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-1">Soporte</p>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${configEco?.telefono || "+52 332 052 5516"}`}
                  className="text-[#555] hover:text-[#c9a84c] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#c9a84c] group-hover:scale-150 transition-transform" />
                  {configEco?.telefono || "+52 332 052 5516"}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${configEco?.correo_contacto || "ventas@tuecommerce.com"}`}
                  className="text-[#555] hover:text-[#c9a84c] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#c9a84c] group-hover:scale-150 transition-transform" />
                  {configEco?.correo_contacto || "ventas@tuecommerce.com"}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${configEco?.telefono || "5215512345678"}?text=${encodeURIComponent(
                    `Hola 👋 Estoy visitando ${configEco?.nombre_tienda || "su tienda online"} y me gustaría recibir asesoría.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555] hover:text-[#c9a84c] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#c9a84c] group-hover:scale-150 transition-transform" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Métodos de pago */}
          <div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-1">Seguridad</p>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">Pago seguro</h4>
            <div className="flex flex-wrap gap-3 text-[#444] text-3xl">
              {configMetodos
                ?.filter((m) => m.activo === 1)
                .map((metodo, index) => {
                  const key = metodo.nombre_metodo.toLowerCase();
                  const IconComponent = paymentIcons[key];
                  if (!IconComponent) return null;
                  return (
                    <IconComponent
                      key={index}
                      className={`transition-colors cursor-default ${paymentStyles[key] || "hover:text-[#c9a84c]"}`}
                    />
                  );
                })}
            </div>
            <p className="text-xs text-[#444] mt-4 flex items-center gap-1.5">
              <Shield size={13} className="text-[#c9a84c]" />
              Pagos 100% seguros · SSL
            </p>
          </div>

          {/* 4. Categorías */}
          <div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-1">Tienda</p>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">Categorías</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Todos los productos", to: "/Productos" },
                { label: "Promociones", to: "/ofertas" },
                { label: "Lo más vendido", to: "/mas-vendidos" },
                { label: "Marcas", to: "/marcas" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#555] hover:text-[#c9a84c] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#c9a84c] group-hover:scale-150 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Redes sociales */}
          <div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-1">Comunidad</p>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">Síguenos</h4>
            <div className="flex gap-3">
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
                    className="w-9 h-9 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#555] hover:text-[#c9a84c] transition-all"
                    aria-label={`Síguenos en ${red.nombre_red}`}
                  >
                    <IconComponent size={17} />
                  </a>
                );
              })}
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-[#444]">
              <Truck size={13} className="text-[#c9a84c]" />
              <span>Envío gratis en compras $999+</span>
            </div>
          </div>
        </div>

        {/* ── Franja métodos de pago ── */}
        {configMetodos && configMetodos.filter((m) => m.activo === 1).length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#1e1e1e] flex flex-wrap justify-center items-center gap-6 text-3xl text-[#333]">
            {configMetodos
              .filter((m) => m.activo === 1)
              .map((metodo, index) => {
                const key = metodo.nombre_metodo.toLowerCase();
                const IconComponent = paymentIcons[key];
                if (!IconComponent) return null;
                return (
                  <IconComponent
                    key={index}
                    className={`transition-colors cursor-default ${paymentStyles[key] || "hover:text-[#c9a84c]"}`}
                  />
                );
              })}
          </div>
        )}

        {/* ── Copyright ── */}
        <div className="mt-10 pt-6 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] tracking-wider uppercase text-[#333]">
          <p>
            © {new Date().getFullYear()} {configEco?.nombre_tienda || "Cosmética Glam"}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            Desarrollado con
            <Heart size={11} className="text-[#c9a84c] mx-0.5" fill="currentColor" />
            por{" "}
            <a
              href="https://altisyscorp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[#c9a84c] transition-colors ml-0.5"
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