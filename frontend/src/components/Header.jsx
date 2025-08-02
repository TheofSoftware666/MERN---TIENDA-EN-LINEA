import React from 'react'
import HeaderAnuncio from './HeaderAnuncio'

const Header = () => {
  return (
    <>
        {/* <HeaderAnuncio/> */}
        <header className="w-full bg-gray-900 text-white">

  {/* Barra superior de promoción */}
  <div className="w-full bg-blue-600 text-white text-sm text-center py-2 px-4">
    🚚 Envío gratis en compras mayores a $899 MXN
  </div>

  {/* Contenedor principal */}
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

    {/* Menú hamburguesa en mobile */}
    <button className="md:hidden flex items-center justify-center w-10 h-10">
      <img
        src="/img/icon-bars-white.png"
        alt="Menú"
        className="w-6 h-6 object-contain"
      />
    </button>

    {/* Logo centrado en mobile */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-lg md:text-2xl font-bold text-white">
        Building Technology
      </h1>
    </div>

    {/* Carrito */}
    <div className="relative">
      <button className="w-10 h-10 flex items-center justify-center">
        <img
          src="/img/bolsa_white_01.png"
          alt="Carrito"
          className="w-6 h-6 object-contain"
        />
      </button>
      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
        3
      </span>
    </div>
  </div>

  {/* Búsqueda + Código Postal - solo visible en escritorio */}
  <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-3 gap-4 border-t border-white/20">

    {/* Formulario de búsqueda */}
    <form action="#" method="post" className="relative w-full max-w-xl">
      <input
        type="search"
        placeholder="¿Qué estás buscando hoy?"
        className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-1 right-1 bg-white hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-full transition"
      >
        <img
          src="/img/icon-busqueda.png"
          alt="Buscar"
          className="w-4 h-4 object-contain"
        />
      </button>
    </form>

    {/* Código Postal */}
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="cp" className="text-white whitespace-nowrap">
        Código Postal:
      </label>
      <input
        id="cp"
        type="text"
        maxLength={5}
        placeholder="Ej. 01000"
        className="w-24 px-3 py-1.5 rounded-full text-gray-800 placeholder:text-gray-500 text-sm focus:outline-none"
      />
    </div>
  </div>
</header>




        
    </>
  )
}

export default Header