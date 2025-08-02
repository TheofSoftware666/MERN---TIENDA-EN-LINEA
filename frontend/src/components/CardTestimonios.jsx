
const CardTestimonios = () => {
  return (
    <>
        {/* Tarjeta de testimonio */}
      {[1, 2, 3, 4, 5].map((item, i) => (
        <div
          key={i}
          className="bg-white min-w-[280px] max-w-sm flex-shrink-0 border border-gray-200 rounded-lg shadow-sm p-5"
        >
          <div className="flex gap-2 text-yellow-500 text-sm mb-2">⭐⭐⭐⭐⭐</div>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Excelente producto, lo uso cada semana y he visto grandes resultados.
          </p>
          <img
            src={`https://source.unsplash.com/400x200/?user,face&sig=${i}`}
            alt="foto cliente"
            className="w-full h-36 object-cover rounded mb-3"
          />
          <div className="font-semibold text-gray-800">Cliente #{i + 1}</div>
          <div className="text-xs text-gray-500">Cliente verificado</div>
        </div>
      ))}
    </>
  )
}

export default CardTestimonios