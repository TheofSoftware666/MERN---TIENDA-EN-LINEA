import CardTestimonios from "./CardTestimonios.jsx";

const Testimonios = () => {
  return (
    <>
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">

          {/* Título y resumen */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Opiniones de nuestros clientes
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2 text-sm text-gray-600">
              <div className="flex gap-1 text-yellow-500 text-lg">
                ⭐⭐⭐⭐⭐
              </div>
              <span className="text-sm text-gray-500">(125 calificaciones)</span>
            </div>
          </div>

          {/* Botón agregar comentario */}
          <div className="flex justify-end mb-6">
            <a
              href="#"
              className="inline-block px-5 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Agregar comentario
            </a>
          </div>

          {/* Carrusel horizontal de testimonios */}
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 min-w-[700px] md:min-w-full">
              <CardTestimonios/>
            </div>
          </div>
        </div>

    </>
  )
}

export default Testimonios