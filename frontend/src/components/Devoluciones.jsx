import React from 'react'

const Devoluciones = () => {
  return (
    <>
    <div className="w-full bg-gray-50 mt-20 py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">

            {/* Título */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Devoluciones sin complicaciones
            </h2>

            {/* Subtítulo */}
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Queremos que estés 100% satisfecho con tu compra. Si no es lo que esperabas, te lo cambiamos o te devolvemos tu dinero, sin hacer preguntas.
            </p>

            {/* Beneficios de devolución */}
            <div className="grid md:grid-cols-3 gap-6 text-left text-gray-700 max-w-4xl mx-auto">

              <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-2">Devoluciones 100% gratis</h4>
                <p className="text-sm leading-relaxed">
                  No pagas por la guía ni por el envío de regreso. Nosotros cubrimos todo.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-2">Tienes hasta 15 días</h4>
                <p className="text-sm leading-relaxed">
                  Si el producto no cumplió con tus expectativas, puedes devolverlo dentro de los primeros 15 días.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-2">Sin explicaciones ni complicaciones</h4>
                <p className="text-sm leading-relaxed">
                  Solo solicita la devolución desde tu cuenta. Es rápido, fácil y seguro.
                </p>
              </div>

            </div>

            {/* CTA Final */}
            <div className="mt-10">
              <a
                href="#"
                className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition text-sm"
              >
                Ver políticas de devolución completas
              </a>
            </div>

          </div>
        </div>
    </>
  )
}

export default Devoluciones