import { useState } from "react";
import { Star } from "lucide-react";
import clientAxios from "../config/axios";

const FormularioComentario = ({ close, productId }) => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Debes seleccionar una calificación");
      return;
    }

    if (!comment.trim()) {
      alert("Debes escribir un comentario");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("ape_token");
      
      if (!token) {
        alert("Debes iniciar sesión para dejar un comentario");
        return;
      }

      const response = await clientAxios.post(`/SetTestimonialsByProduct/${productId}`, {
          comment,
          rating
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      close();

    } catch (error) {

      const message =
        error?.response?.data?.message ||
        "No se pudo enviar el comentario";

      console.log(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">

        <h2 className="text-xl font-bold text-gray-800 text-center">
          Deja tu opinión ✍️
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-3"
        >

          {/* estrellas */}
          <div className="flex justify-center gap-2 my-2">
            {[1,2,3,4,5].map((num) => (
              <Star
                key={num}
                onClick={() => setRating(num)}
                className={`w-6 h-6 cursor-pointer transition
                ${
                  num <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* comentario */}
          <textarea
            placeholder="Escribe tu experiencia..."
            className="border border-gray-300 rounded px-3 py-2"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            disabled={loading}
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Enviando..." : "Enviar comentario"}
          </button>

        </form>

        <button
          onClick={close}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
        >
          Cancelar
        </button>

      </div>

    </div>
  );
};

export default FormularioComentario;