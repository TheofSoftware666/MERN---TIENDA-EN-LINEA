import React from 'react'

const ConfirmarCuenta = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded overflow-hidden max-w-4xl w-full">
          
          {/* Confirmación */}
          <div className="flex flex-col justify-center items-center w-full px-8 py-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">✅ Verifica tu cuenta</h2>
            <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
              Te hemos enviado un código de verificación a tu correo electrónico. Ingresa el código a continuación para activar tu cuenta.
            </p>

            <form action="#" className="w-full max-w-md space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Código de verificación</label>
                <input
                  type="text"
                  placeholder="Ej: 123456"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 tracking-widest text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
              >
                Confirmar cuenta
              </button>

              <div className="text-center text-sm text-gray-600 space-y-1">
                <p>¿No recibiste el código?</p>
                <a href="#" className="text-blue-500 hover:underline">Reenviar código</a>
              </div>
            </form>
          </div>

          {/* Lado visual */}
          <div className="hidden lg:flex flex-col justify-center bg-blue-600 p-10 w-full lg:max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-6">📨 Casi terminamos</h3>
            <p className="text-gray-100 text-base leading-relaxed">
              Verifica tu correo electrónico para activar tu cuenta y empezar a disfrutar nuestros beneficios.
            </p>
            <div className="mt-8 flex justify-evenly text-sm text-gray-100">
              <a href="#" className="hover:underline">Soporte</a>
              <a href="#" className="hover:underline">Términos</a>
              <a href="#" className="hover:underline">Política</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmarCuenta