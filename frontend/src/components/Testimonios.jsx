import { useState } from "react";
import CardTestimonios from "./CardTestimonios.jsx";
import ModalAgregarComentario from "./ModalAgregarComentario.jsx";

const Testimonios = ({ producto }) => {

  const [showModal, setShowModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false); 

  if (!producto) return null;

  const genericTestimonios = [
    { Nombre: "Carlos M.", Comentario: "Excelente producto, justo lo que esperaba.", Calificacion: 5 },
    { Nombre: "Ana Gómez", Comentario: "Muy buena calidad y envío rápido.", Calificacion: 5 },
    { Nombre: "Luis Herrera", Comentario: "Me encantó, definitivamente volveré a comprar.", Calificacion: 4 }
  ];

  const testimoniosToShow =
    producto?.Testimonios?.length > 0
      ? producto.Testimonios
      : genericTestimonios;

  return (
    <>
    <div className="w-full max-w-6xl mx-auto mt-20 px-4">

      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Opiniones de nuestros clientes
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2 text-sm text-gray-600">
          <div className="flex gap-1 text-yellow-500 text-lg">
            ⭐⭐⭐⭐⭐
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
            <ModalAgregarComentario close={() => setShowModal(false)} />
          )
    )}

    </>
  );
};

export default Testimonios;
