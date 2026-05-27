import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12 text-center">
      {/* Ilustración / Ícono */}
      <div className="mb-6">
        <img
          src="https://illustrations.popsy.co/gray/cart-not-found.svg"
          alt="Página no encontrada"
          className="w-64 h-auto mx-auto"
        />
      </div>

      {/* Título */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops... No encontramos la página que buscas.  
        Pero no te preocupes, tenemos muchas cosas que sí pueden interesarte 😉
      </p>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition font-medium"
        >
          Ir al inicio
        </Link>
        <Link
          to="/productos"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl hover:bg-gray-300 transition font-medium"
        >
          Ver productos
        </Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Busca tu producto aquí..."
          className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Error;
