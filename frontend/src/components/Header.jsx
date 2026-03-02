import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";
import {
  Home, Flame, Star, ShoppingCart, Laptop,
  Cog, Headphones, Monitor, Phone, Search,
  User, LogIn, UserPlus, Truck, Menu, X
} from "lucide-react";

export default function Header({ onOpenCart }) {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [cartItemsCount, setCartItemsCount ] = useState(0);  
  const [configEco, setConfigEco] = useState(null); 

  useEffect(() => {
    GetCategories();
    GetCountCartItems();
    GetCostShipping();
  } , []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      navigate("/Productos");
      return;
    }

    navigate(`/Productos?q=${encodeURIComponent(search.trim())}`);
  };

  const GetCategories = async () => {
    try{
      const data = await clientAxios.get('/Admin/Categorias/6');
      setCategories(data.data.categorias);
    }catch(ex){
      console.warn(ex.data || ex || "Ocurrio un error inesperado al intentar consultar las.categorias");
    }
  };

  const GetCostShipping = async () => {
    try{
      const token = localStorage.getItem('ape_token');
      if(!token || token === null || token === '') return;
      const response = await clientAxios.get('/Admin/GetConfigEcoPublic', {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
      }});

      setConfigEco(response.data.tienda.config || null);
    }catch(ex){
      console.warn(ex.data || ex || "Ocurrio un error inesperado al intentar consultar el costo de envio");
    }
  };

  const GetCountCartItems = async () => {
    try{
      const token = localStorage.getItem('ape_token');
      if(!token || token === null || token === '') return;
      const data = await clientAxios.get('/getCountItemsByUserId', {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
      }});
      
      setCartItemsCount(data.data.data);
    }catch(ex){
      console.warn(ex.data || ex || "Ocurrio un error inesperado al intentar consultar el total de items en el carrito");
    }
  }

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const token = localStorage.getItem('ape_token');
  const isLoggedIn = !!token;

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm ">

      {/* Barra de promoción minimalista */}
      <div className="w-full bg-gray-100 text-gray-600 text-xs md:text-sm text-center py-2 border-b border-gray-200">
        <span className="inline-flex items-center gap-1">
          <Truck size={14} className="text-blue-500" />
          Envío gratis en compras mayores a ${configEco?.costo_envio || 0} MXN
        </span>
      </div>

      {/* Header principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">

        {/* Mobile: Hamburguesa */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu size={20} />
        </button>

        {/* Logo o Nombre */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          {configEco?.logo_url ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL_IMAGENES}${configEco.logo_url}`}
              alt={configEco?.nombre_tienda || "Logo"}
              className="h-9 md:h-11 object-contain mx-auto md:mx-0"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
          ) : null}

          <h1
            className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight"
            style={{ display: configEco?.logo_url ? "none" : "block" }}
          >
            {configEco?.nombre_tienda || "Ecommerce"}
          </h1>
        </div>

        {/* Búsqueda - SOLO DESKTOP */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 relative max-w-lg mx-4"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos, marcas o categorías..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />

          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md transition"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Botones de autenticación - solo desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/Auth/inicio-sesion"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition"
              >
                <LogIn size={16} />
                Iniciar sesión
              </Link>
              <Link
                to="/Auth"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-sm transition"
              >
                <UserPlus size={16} />
                Registrarse
              </Link>
            </>
          ) : (
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <User size={14} />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:inline">Mi cuenta</span>
            </button>
          )}
        </div>

        {/* Carrito */}
        <div className="relative ml-1">
          <button 
            onClick={onOpenCart} 
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <ShoppingCart size={20} />
          </button>
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full font-medium shadow">
              {cartItemsCount}
            </span>
          )}
        </div>
      </div>

      {/* Navbar secundaria desktop - minimalista */}
      <nav className="hidden md:flex justify-center bg-white py-2 gap-6 border-t border-gray-100 text-sm">
        {categories.map(cat => (
          <Link
            key={cat.categoriaId}
            to={`/Productos?categoria=${cat.categoriaId}`}
            className="text-gray-600 hover:text-blue-600 font-medium transition"
            onClick={() => setSearch("")}
          >
            {formatName(cat.nombre)}
          </Link>
        ))}
      </nav>

      {/* Sidebar Mobile - minimalista */}
      {menuOpen && (
        <>
          {/* Fondo oscuro */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-xl z-50 flex flex-col">

            {/* Header del Drawer */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Búsqueda Mobile */}
            <div className="px-4 py-3 border-b">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!search.trim()) return;
                  setMenuOpen(false);
                  navigate(`/Productos?q=${encodeURIComponent(search.trim())}`);
                }}
                className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="flex-1 px-3 py-2 text-sm focus:outline-none text-gray-700"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2">
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Menú lateral */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-gray-700">

              <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                <Home size={18} className="text-gray-500" /> Inicio
              </Link>
              <Link to="/ofertas" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                <Flame size={18} className="text-gray-500" /> Ofertas
              </Link>

              <div className="pt-2">
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-1">Categorías</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <Link
                      key={cat.categoriaId}
                      to={`/Productos?categoria=${cat.categoriaId}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                      onClick={() => {
                        setSearch("");
                        setMenuOpen(false);
                      }}
                    >
                      <span className="text-sm">{formatName(cat.nombre)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/contacto" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                <Phone size={18} className="text-gray-500" /> Contacto / Ayuda
              </Link>

            </nav>

            {/* Autenticación en móvil */}
            <div className="px-4 py-4 border-t bg-gray-50">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/Auth/inicio-sesion"
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    Iniciar sesión
                  </Link>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    ¿No tienes cuenta?{" "}
                    <Link to="/Auth" className="text-blue-600 font-medium hover:underline" onClick={() => setMenuOpen(false)}>
                      Regístrate
                    </Link>
                  </p>
                </>
              ) : (
                <Link
                  to="/perfil"
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={18} />
                  Mi cuenta
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}