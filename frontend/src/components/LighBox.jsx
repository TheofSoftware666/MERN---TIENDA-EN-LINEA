import React from 'react'

const LighBox  = () => {
  return (
    <>
        <div className="bg-white p-6 rounded shadow-lg text-center w-full max-w-sm mx-4 sm:mx-auto">
        <h2 className="text-xl font-bold mb-2">¡Suscríbete!</h2>
        <p className="mb-4 text-sm text-gray-700">
          🔥 Recibe un 10% de descuento directo en tu correo 🔥
        </p>

        <input
          type="email"
          placeholder="Tu correo electrónico"
          className="border border-gray-300 p-2 rounded w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col gap-2">
          <button className="bg-blue-600 text-white w-full px-4 py-2 rounded hover:bg-blue-700 text-sm transition duration-200">
            Suscribirme
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2 text-sm transition duration-200">
            No, prefiero pagar precios completos y no recibir promociones exclusivas
          </button>
        </div>
      </div>
    </>
  )
}

export default LighBox 