import { useState } from "react";
import CardTestimonios from "./CardTestimonios.jsx";
import ModalAgregarComentario from "./ModalAgregarComentario.jsx";
// import FormularioComentario from "./FormularioComentario.jsx"; // descomentar si existe
import clientAxios from "../config/axios.jsx";
import { FaStar, FaHeart } from "react-icons/fa";

const Testimonios = ({ producto }) => {

  const [showModal, setShowModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false); // Esto debería venir de algún contexto o localStorage

  const testimoniosToShow =
    producto?.Testimonios?.length > 0
      ? producto.Testimonios
      : [];

  // Calcular promedio de calificaciones
  const promedioRating = testimoniosToShow.length > 0
    ? (testimoniosToShow.reduce((acc, t) => acc + t.Rating, 0) / testimoniosToShow.length).toFixed(1)
    : 0;

  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-20 px-4 py-8 bg-gradient-to-b from-white to-rose-50/30 rounded-3xl">
        {/* Título decorativo */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
            {!producto || !producto.Testimonios || producto.Testimonios.length === 0
              ? "Comparte tu experiencia"
              : "Lo que opinan nuestras clientas"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full mb-6"></div>

          {testimoniosToShow.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(promedioRating)
                        ? "text-amber-400 fill-current"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {promedioRating} · {testimoniosToShow.length} calificaciones
              </span>
              <span className="text-pink-300">✨</span>
            </div>
          )}
        </div>

        {/* Botón agregar comentario */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg"
          >
            <FaHeart className="text-xs" />
            Agregar comentario
          </button>
        </div>

        {/* Carrusel / Lista de testimonios */}
        {testimoniosToShow.length > 0 ? (
          <div className="overflow-x-auto hide-scrollbar pb-4">
            <div className="flex gap-6 min-w-[700px] md:min-w-full">
              {testimoniosToShow.map((t, i) => (
                <CardTestimonios key={i} testimonio={t} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-white/50 rounded-2xl border border-pink-100">
            <p className="text-gray-500 mb-3">Aún no hay opiniones sobre este producto.</p>
            <p className="text-sm text-pink-400">¡Sé la primera en compartir tu experiencia!</p>
          </div>
        )}
      </section>

      {/* Modal para agregar comentario */}
      {showModal && (
        isLogged ? (
          // <FormularioComentario close={() => setShowModal(false)} />
          <div>FormularioComentario (pendiente de implementar)</div> // placeholder
        ) : (
          <ModalAgregarComentario close={() => setShowModal(false)} productId={producto?.Producto?.ProductoId} />
        )
      )}
    </>
  );
};

export default Testimonios;