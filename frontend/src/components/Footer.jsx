import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/axios.jsx";

import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
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
    } , []);

   const GetCostShipping = async () => {
    try{
      const token = localStorage.getItem('ape_token');
      if(!token || token === null || token === '') return;
      const response = await clientAxios.get('/Admin/GetConfigEcoPublic', {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
      }});

      setConfigEco(response.data.tienda.config || null);
      setConfigSocial(response.data.tienda.socialMedia || null);
      setConfigMetodos(response.data.tienda.metodosPago || null);
    }catch(ex){
      console.warn(ex.data || ex || "Ocurrio un error inesperado al intentar consultar el costo de envio");
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white px-6 sm:px-12 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* 1. Logo y descripción */}
          <div>
            <Link to="/">
              <img src={import.meta.env.VITE_BACKEND_URL_IMAGENES + configEco?.logo_url} alt={configEco?.nombre || "Logo"} className="w-32 mb-4" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {configEco?.descripcion || "Tu tienda en línea de confianza. Encuentra los mejores productos con envío rápido y seguro. ¡Compra ahora y disfruta de una experiencia de compra única!"}
            </p>
          </div>

          {/* 2. Contacto */}
          <div className="flex flex-col">
            <h4 className="font-bold mb-2">📞 Contacto</h4>
            <div className="h-1 w-10 bg-blue-500 mb-3 rounded"></div>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href={`tel:${configEco?.telefono || "+52 332 052 5516"}`}
            >
              {configEco?.telefono || "+52 332 052 5516"}
            </a>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href={`mailto:${configEco?.correo_contacto || "ventas@tuecommerce.com"}`}
            >
              {configEco?.correo_contacto || "ventas@tuecommerce.com"}
            </a>
            {/* <a
              className="text-gray-400 hover:text-white hover:underline"
              href="mailto:contacto@tuecommerce.com"
            >
              contacto@tuecommerce.com
            </a> */}
            <a
              className="text-gray-400 hover:text-white hover:underline"
              target="_blank"
              href={`https://wa.me/${configEco?.telefono || "5215512345678"}?text=${encodeURIComponent(`Hola 👋
              Estoy visitando ${configEco?.nombre_tienda || "su tienda online"} y me gustaría recibir asesoría para realizar mi compra.

              ¿Podrían ayudarme con disponibilidad y tiempos de envío? 🚚

              Gracias 😊`)}`}
            >
              WhatsApp
            </a>
          </div>

          {/* 3. Métodos de pago */}
          <div className="flex flex-col">
            <h4 className="font-bold mb-2">💳 Métodos de Pago</h4>
            <div className="h-1 w-10 bg-indigo-400 mb-3 rounded"></div>
            <div className="flex flex-wrap gap-4 text-3xl text-gray-400">
              {configMetodos
                ?.filter((metodo) => metodo.activo === 1)
                .map((metodo, index) => {
                  const key = metodo.nombre_metodo.toLowerCase();
                  const IconComponent = paymentIcons[key];

                  if (!IconComponent) return null;

                  return (
                    <IconComponent
                      key={index}
                      className={`transition ${paymentStyles[key] || "hover:text-white"}`}
                    />
                  );
                })}
            </div>
            <p className="text-sm text-gray-400 mt-3">
              Pagos 100% seguros 🔒 | Encriptados con SSL
            </p>
          </div>

          {/* 4. Categorías */}
          <div className="flex flex-col">
            <h4 className="font-bold mb-2">🛍️ Categorías</h4>
            <div className="h-1 w-10 bg-pink-400 mb-3 rounded"></div>
            <a className="text-gray-400 hover:text-white hover:underline" href="#">
              Productos
            </a>
            <a className="text-gray-400 hover:text-white hover:underline" href="#">
              Promociones
            </a>
            <a className="text-gray-400 hover:text-white hover:underline" href="#">
              Lo más vendido
            </a>
            <a className="text-gray-400 hover:text-white hover:underline" href="#">
              Marcas
            </a>
          </div>

          {/* 5. Redes sociales */}
          <div className="flex flex-col">
            <h4 className="font-bold mb-2">🌐 Síguenos</h4>
            <div className="h-1 w-10 bg-green-400 mb-3 rounded"></div>
            {/* <div className="flex gap-4 mt-2 text-gray-400">
              <a href="#" className="hover:text-blue-500 transition">
                <Facebook size={26} />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <Instagram size={26} />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <Youtube size={26} />
              </a>
              <a href="#" className="hover:text-sky-400 transition">
                <Twitter size={26} />
              </a>
              <a href="#" className="hover:text-blue-700 transition">
                <Linkedin size={26} />
              </a>
            </div> */}
            <div className="flex gap-4 mt-2 text-gray-400">
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
                    className="hover:scale-110 transition"
                  >
                    <IconComponent size={26} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Franja secundaria con íconos de pago */}
        <div className="bg-gray-800 mt-10 py-4">
          <div className="flex justify-center items-center flex-wrap gap-8 text-3xl text-gray-400">
            {configMetodos
              ?.filter((metodo) => metodo.activo === 1)
              .map((metodo, index) => {
                const key = metodo.nombre_metodo.toLowerCase();
                const IconComponent = paymentIcons[key];

                if (!IconComponent) return null;

                return (
                  <IconComponent
                    key={index}
                    className={`transition ${paymentStyles[key] || "hover:text-white"}`}
                  />
                );
              })}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 pb-4 text-center">
          <p className="text-gray-500 text-sm">
            Sitio Web elaborado por{" "}
            <a
              className="font-bold hover:text-white hover:underline"
              href="#"
            >
              © Building Technology
            </a>{" "}
            para la empresa{" "}
            <a
              className="font-bold hover:text-white hover:underline"
              href="#"
            >
              tuEcommerce.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
