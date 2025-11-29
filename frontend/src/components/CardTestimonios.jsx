import { FaStar } from "react-icons/fa";

const CardTestimonios = ({ testimonio }) => {
  return (
    <div className="min-w-[260px] bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-gray-800">{testimonio.Nombre}</h3>

      {/* Estrellas */}
      <div className="flex text-yellow-500 text-sm mt-1">
        {[...Array(testimonio.Calificacion)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      <p className="text-gray-600 text-sm mt-2">
        {testimonio.Comentario}
      </p>
    </div>
  );
};

export default CardTestimonios;
