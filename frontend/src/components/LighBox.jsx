import React from 'react'

const LighBox  = () => {
  return (
    <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-2xl text-center w-full mx-auto">
  <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-gray-900">
    🎁 ¡Gana un 10% de descuento!
  </h2>

  <p className="mb-5 text-xs sm:text-sm text-gray-600">
    Suscríbete y recibe promociones exclusivas, lanzamientos anticipados y descuentos especiales en tu correo.
  </p>

  <input
    type="email"
    placeholder="Tu correo electrónico..."
    className="border border-gray-300 p-2 sm:p-3 rounded-lg w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
  />

  <div className="flex flex-col gap-3">
    <button className="bg-blue-600 text-white w-full px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 text-sm transition duration-200 shadow">
      Quiero mi descuento 🎉
    </button>
    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-xs transition duration-200">
      No gracias, prefiero pagar más y perderme ofertas 🔒
    </button>
  </div>

  <p className="mt-4 text-[10px] sm:text-[11px] text-gray-400">
    ✨ Sin spam. Cancela en cualquier momento.
  </p>
</div>

  )
}

export default LighBox
