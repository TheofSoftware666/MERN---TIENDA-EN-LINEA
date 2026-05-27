import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import clientAxios from "../config/axios";

const FormularioComentario = ({ close, productId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Por favor, selecciona una calificación");
      return;
    }

    if (!comment.trim()) {
      alert("Por favor, escribe tu opinión");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("ape_token");

      if (!token) {
        alert("Debes iniciar sesión para dejar un comentario");
        return;
      }

      await clientAxios.post(
        `/SetTestimonialsByProduct/${productId}`,
        { comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      close();
      // Opcional: mostrar un toast de éxito
    } catch (error) {
      const message = error?.response?.data?.message || "No se pudo enviar el comentario";
      console.log(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FaStar className="text-yellow-300" />
            Tu opinión cuenta
          </h2>
          <button
            onClick={close}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Estrellas interactivas */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo calificas este producto?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <FaStar
                    className={`w-8 h-8 cursor-pointer ${
                      num <= (hoverRating || rating)
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-pink-600 mt-1">
                {rating === 1 && "😞 Muy malo"}
                {rating === 2 && "😐 Regular"}
                {rating === 3 && "🙂 Bueno"}
                {rating === 4 && "😊 Muy bueno"}
                {rating === 5 && "🤩 Excelente"}
              </p>
            )}
          </div>

          {/* Área de texto */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Tu experiencia
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos qué te pareció el producto..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Publicar opinión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioComentario;