import { useState } from "react";
import CardTestimonios from "./CardTestimonios.jsx";
import ModalAgregarComentario from "./ModalAgregarComentario.jsx";
import clientAxios from "../config/axios.jsx";

const Testimonios = ({ producto }) => {

  const [showModal, setShowModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false); 

  const testimoniosToShow =
  producto?.Testimonios?.length > 0
  ? producto.Testimonios
  : [];
  
  // if(!producto || !producto.Testimonios || producto.Testimonios.length === 0){
  //   return null;
  // };

  return (
    <>
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">

      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {!producto || !producto.Testimonios || producto.Testimonios.length === 0 ? "Agrega tu opinión" : "Opiniones de nuestros clientes"}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2 text-sm text-gray-600">
          <div className="flex gap-1 text-yellow-500 text-lg">
            {producto?.Testimonios?.length > 0 ? Array.from({ length: Math.round(
                  producto.Testimonios.reduce((acc, t) => acc + t.Rating, 0) / producto.Testimonios.length
                ) }, (_, i) => (
                  <span>⭐</span>
                )) : (
                  <span>⭐</span>
                )}
          </div>
          <span className="text-sm text-gray-500">
            ({testimoniosToShow.length} calificaciones)
          </span>
        </div>
      </div>

      {/* Botón agregar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="inline-block px-5 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Agregar comentario
        </button>
      </div>

      {/* Carrusel */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 min-w-[700px] md:min-w-full">
          {testimoniosToShow.map((t, i) => (
            <CardTestimonios key={i} testimonio={t} />
          ))}
        </div>
      </div>
    </div>

    {/* 🔥 Modal */}
    {showModal && (
      isLogged
        ? (
            <FormularioComentario close={() => setShowModal(false)} />
          )
        : (
            <ModalAgregarComentario close={() => setShowModal(false)} productId={producto.Producto.ProductoId} />
          )
    )}

    </>
  );
};

export default Testimonios;
