import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Home, Flame, Star, ShoppingCart, Laptop, Cog, Headphones, Monitor, Phone, Search  } from "lucide-react";

export default function Header({ onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow-md relative">
      {/* Barra de promoción */}
      <div className="w-full bg-blue-600 text-white text-xs md:text-sm text-center py-1.5">
        🚚 Envío gratis en compras mayores a $899 MXN
      </div>

      {/* Header principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        
        {/* Mobile: Hamburguesa */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10"
        >
          <img src="/img/icon-bars-white.png" alt="Menú" className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">Building Technology</h1>
        </div>

        {/* Búsqueda - solo desktop */}
        <form
          action="#"
          method="post"
          className="hidden md:flex flex-1 relative max-w-xl mx-6"
        >
          <input
            type="search"
            placeholder="Buscar productos, marcas o categorías..."
            className="w-full rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
          >
            {/* <img src="/img/icon-busqueda.png" alt="Buscar" className="w-4 h-4" /> */}
            <Search size={20}/>
          </button>
        </form>

        {/* Carrito */}
        <div className="relative ml-2">
          <button onClick={onOpenCart} className="w-10 h-10 flex items-center justify-center">
            <img src="/img/bolsa_white_01.png" alt="Carrito" className="w-6 h-6" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
            3
          </span>
        </div>
      </div>

      {/* Navbar secundaria desktop */}
      <nav className="hidden md:flex justify-center bg-gray-800 text-sm py-2 gap-6">
        <a href="#" className="hover:text-blue-400">Laptops</a>
        <a href="#" className="hover:text-blue-400">Componentes</a>
        <a href="#" className="hover:text-blue-400">Accesorios</a>
        <a href="#" className="hover:text-blue-400">Ofertas</a>
      </nav>

      {/* Sidebar Mobile */}
      {menuOpen && (
        <>
          {/* Fondo oscuro */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col">
          {/* Header del Drawer */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">Menú</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="px-4 py-3 border-b">
          <div className="flex items-center border rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 px-4 py-2 text-sm focus:outline-none text-gray-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
              <Search size={20}/>
            </button>
          </div>
        </div>

          {/* Menú lateral optimizado con Lucide */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6 text-gray-700 font-medium">

            {/* Sección destacada */}
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold text-blue-600">
                <Home size={20} /> Inicio
              </a>
              <a href="#" className="flex items-center gap-2 text-lg font-semibold text-red-600">
                <Flame size={20} /> Ofertas
              </a>
            </div>

            {/* Descubrimiento */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-2">Descubre</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 hover:text-blue-600">
                  <Star size={20} /> Novedades
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600">
                  <ShoppingCart size={20} /> Lo más vendido
                </a>
              </div>
            </div>

            {/* Categorías */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-2">Categorías</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50">
                  <Laptop size={22} /> 
                  <span className="mt-1 text-sm">Laptops</span>
                </a>
                <a href="#" className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50">
                  <Cog size={22} /> 
                  <span className="mt-1 text-sm">Componentes</span>
                </a>
                <a href="#" className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50">
                  <Headphones size={22} /> 
                  <span className="mt-1 text-sm">Accesorios</span>
                </a>
                <a href="#" className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50">
                  <Monitor size={22} /> 
                  <span className="mt-1 text-sm">Monitores</span>
                </a>
              </div>
            </div>

            {/* Ayuda */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-2">Soporte</h3>
              <a href="#" className="flex items-center gap-2 hover:text-blue-600">
                <Phone size={20} /> Contacto / Ayuda
              </a>
            </div>
          </nav>

            {/* Acciones abajo */}
            <div className="px-4 py-4 border-t">
              <Link
                to="/Auth/inicio-sesion"
                className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Iniciar sesión
              </Link>
              <p className="text-xs text-gray-500 mt-3 text-center">
                ¿Nuevo aquí? <Link to="/Auth" className="text-blue-600 font-semibold">Crear cuenta</Link>
              </p>
            </div>
          </div>

        </>
      )}
    </header>
  );
}
