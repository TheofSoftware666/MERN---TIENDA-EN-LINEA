import React from 'react';
import { FaHeart, FaShieldHalved , FaClock } from 'react-icons/fa6';

const Devoluciones = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-pink-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">
          Devoluciones sin complicaciones
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full mb-6"></div>

        {/* Subtítulo */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
          Queremos que estés 100% satisfecha con tu compra. Si no es lo que esperabas, te lo cambiamos o te devolvemos tu dinero, sin hacer preguntas.
        </p>

        {/* Beneficios de devolución */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <FaHeart className="text-pink-500 text-xl" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Devoluciones 100% gratis</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              No pagas por la guía ni por el envío de regreso. Nosotros cubrimos todo.
            </p>
          </div>

          <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <FaClock className="text-pink-500 text-xl" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Tienes hasta 15 días</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Si el producto no cumplió con tus expectativas, puedes devolverlo dentro de los primeros 15 días.
            </p>
          </div>

          <div className="bg-white border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <FaClock className="text-pink-500 text-xl" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Sin explicaciones ni complicaciones</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Solo solicita la devolución desde tu cuenta. Es rápido, fácil y seguro.
            </p>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <FaShieldHalved  />
            Ver políticas de devolución completas
          </a>
        </div>
      </div>
    </section>
  );
};

export default Devoluciones;