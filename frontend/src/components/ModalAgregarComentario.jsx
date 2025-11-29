import { useState } from "react";
import { Star } from "lucide-react";

const FormularioComentario = ({ close }) => {

  const [rating, setRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">

        <h2 className="text-xl font-bold text-gray-800 text-center">
          Deja tu opinión ✍️
        </h2>

        <form className="mt-4 flex flex-col gap-3">

          <input
            type="text"
            placeholder="Titulo del Comentario"
            className="border border-gray-300 rounded px-3 py-2"
          />

          <div className="flex justify-center gap-2 my-2">
            {[1,2,3,4,5].map((num) => (
              <Star
                key={num}
                onClick={() => setRating(num)}
                className={`w-6 h-6 cursor-pointer transition
                  ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                `}
              />
            ))}
          </div>

          <textarea
            placeholder="Escribe tu experiencia..."
            className="border border-gray-300 rounded px-3 py-2"
            rows="4"
          ></textarea>

          <button
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Enviar comentario
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
