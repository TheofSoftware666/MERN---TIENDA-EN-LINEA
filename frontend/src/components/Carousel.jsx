import React from 'react'

const Carousel = () => {
  return (
    <>
      <div className="relative w-full h-80 md:h-[450px] overflow-hidden rounded-2xl shadow-lg">
        <img
          src="/img/banner-facebook-builtech.png"
          alt="Nueva colección de mochilas"
          title="Colección 2025"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
            🎒 Nueva colección 2025
          </h2>
          <p className="text-white text-lg md:text-xl mt-3 max-w-xl drop-shadow-md">
            Estilos exclusivos, materiales resistentes y envío gratis en compras desde $499 MXN.
          </p>

          {/* Urgencia */}
          <span className="text-sm md:text-base text-yellow-300 font-semibold mt-2">
            🔥 Oferta válida solo hasta el domingo
          </span>

          <button className="mt-6 bg-[#15B991] hover:bg-[#10906E] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300">
            Ver colección
          </button>
        </div>
      </div>
    </>
  )
}

export default Carousel