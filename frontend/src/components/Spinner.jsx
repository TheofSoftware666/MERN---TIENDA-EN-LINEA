import React from 'react'
import { FaSpinner } from "react-icons/fa";

const Spinner = ({ message }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {/* Usando el icono de React Icons con estilo mejorado */}
      <div className="relative">
        <FaSpinner className="text-6xl text-blue-500 animate-spin" />
        <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-20 animate-ping"></div>
      </div>

      {/* Mensaje con contenedor */}
      <div className="mt-6 text-center">
        <p className="text-gray-800 font-semibold text-xl mb-2">
          {message}
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default Spinner