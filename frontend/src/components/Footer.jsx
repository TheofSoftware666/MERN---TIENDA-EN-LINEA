import React from "react";
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
  return (
    <>
      <footer className="bg-gray-900 text-white px-6 sm:px-12 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* 1. Logo y descripción */}
          <div>
            <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              TuEcommerce es una tienda en línea comprometida con ofrecer
              los mejores productos, atención personalizada y envíos rápidos
              y seguros a todo México.
            </p>
          </div>

          {/* 2. Contacto */}
          <div className="flex flex-col">
            <h4 className="font-bold mb-2">📞 Contacto</h4>
            <div className="h-1 w-10 bg-blue-500 mb-3 rounded"></div>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href="tel:+523320525516"
            >
              +52 33 2052 5516
            </a>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href="mailto:ventas@tuecommerce.com"
            >
              ventas@tuecommerce.com
            </a>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href="mailto:contacto@tuecommerce.com"
            >
              contacto@tuecommerce.com
            </a>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href="#"
            >
              ¿Tienes una duda?
            </a>
            <a
              className="text-gray-400 hover:text-white hover:underline"
              href="#"
            >
              WhatsApp
            </a>
          </div>

          {/* 3. Métodos de pago */}
          <div className="flex flex-col">
            <h4 className="font-bold mb-2">💳 Métodos de Pago</h4>
            <div className="h-1 w-10 bg-indigo-400 mb-3 rounded"></div>
            <div className="flex flex-wrap gap-4 text-3xl text-gray-400">
              <FaCcVisa className="hover:text-blue-500 transition" />
              <FaCcMastercard className="hover:text-red-500 transition" />
              <FaCcPaypal className="hover:text-sky-500 transition" />
              <FaCcStripe className="hover:text-indigo-500 transition" />
              <FaApplePay className="hover:text-gray-300 transition" />
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
            <div className="flex gap-4 mt-2 text-gray-400">
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
            </div>
          </div>
        </div>

        {/* Franja secundaria con íconos de pago */}
        <div className="bg-gray-800 mt-10 py-4">
          <div className="flex justify-center items-center flex-wrap gap-8 text-3xl text-gray-400">
            <FaCcVisa className="hover:text-blue-500 transition" />
            <FaCcMastercard className="hover:text-red-500 transition" />
            <FaCcPaypal className="hover:text-sky-500 transition" />
            <FaCcStripe className="hover:text-indigo-500 transition" />
            <FaApplePay className="hover:text-gray-300 transition" />
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
