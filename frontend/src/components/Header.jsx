import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";
import {
  Home, Flame, Star, ShoppingCart, Laptop,
  Cog, Headphones, Monitor, Phone, Search,
  User, LogIn, UserPlus, Truck, Menu, X, Heart,
  RotateCcw, Package, LogOut
} from "lucide-react";

export default function Header({ onOpenCart }) {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [configEco, setConfigEco] = useState(null);

  useEffect(() => {
    GetCategories();
    GetCountCartItems();
    GetCostShipping();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      navigate("/Productos");
      return;
    }
    navigate(`/Productos?q=${encodeURIComponent(search.trim())}`);
  };

  const GetCategories = async () => {
    try {
      const data = await clientAxios.get('/Admin/Categorias/6');
      setCategories(data.data.categorias);
    } catch (ex) {
      console.warn(ex.data || ex || "Error al consultar categorías");
    }
  };

  const GetCostShipping = async () => {
    try {
      const response = await clientAxios.get('/Admin/GetConfigEcoPublic', {
        headers: { 'Content-Type': 'application/json' }
      });
      setConfigEco(response.data.tienda.config || null);
    } catch (ex) {
      console.warn(ex.data || ex || "Error al consultar configuración");
    }
  };

  const GetCountCartItems = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const data = await clientAxios.get('/getCountItemsByUserId', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setCartItemsCount(data.data.data);
    } catch (ex) {
      console.warn(ex.data || ex || "Error al consultar carrito");
    }
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const token = localStorage.getItem('ape_token');
  const isLoggedIn = !!token;

  return (
    <header className="w-full bg-[#0d0d0d] border-b border-[#2e2e2e]">

      {/* ── Barra de promoción ── */}
      <div className="w-full bg-[#c9a84c] text-[#0d0d0d] text-xs text-center py-2">
        <span className="inline-flex items-center gap-2 font-semibold tracking-widest uppercase">
          <Truck size={13} />
          Envío gratis en compras mayores a ${configEco?.costo_envio || 0} MXN
        </span>
      </div>

      {/* ── Header principal ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">

        {/* Mobile: Hamburguesa */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 border border-[#2e2e2e] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] transition-all"
          aria-label="Abrir menú"
        >
          <Menu size={18} />
        </button>

        {/* Logo / Nombre */}
        <Link to="/" className="flex-1 md:flex-none text-center md:text-left">
          {configEco?.logo_url ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL_IMAGENES}${configEco.logo_url}`}
              alt={configEco?.nombre_tienda || "Logo"}
              className="h-9 md:h-10 object-contain mx-auto md:mx-0 brightness-0 invert"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
          ) : null}
          <h1
            className="text-lg md:text-xl font-light text-white tracking-[0.2em] uppercase"
            style={{ display: configEco?.logo_url ? "none" : "block" }}
          >
            {configEco?.nombre_tienda || "Ecommerce"}
          </h1>
        </Link>

        {/* Búsqueda — solo desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 relative max-w-lg mx-6"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos, marcas o categorías..."
            className="w-full bg-[#1a1a1a] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#444] px-5 py-2.5 text-sm outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] transition-colors"
            aria-label="Buscar"
          >
            <Search size={15} />
          </button>
        </form>

        {/* Auth + carrito — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/Auth/inicio-sesion"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#888] border border-[#2e2e2e] hover:border-[#c9a84c] hover:text-[#c9a84c] tracking-widest uppercase transition-all"
              >
                <LogIn size={14} />
                Iniciar sesión
              </Link>
              <Link
                to="/Auth"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0d0d0d] bg-[#c9a84c] hover:bg-[#e0be6a] tracking-widest uppercase transition-all"
              >
                <UserPlus size={14} />
                Registrarse
              </Link>
            </>
          ) : (
            <Link
              to="/Pedidos"
              className="flex items-center gap-2 px-3 py-2 border border-[#2e2e2e] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] transition-all group"
            >
              <Package size={15} />
              <span className="text-xs font-semibold tracking-widest uppercase hidden lg:inline">
                Mis Pedidos
              </span>
            </Link>
          )}
        </div>

        {/* Carrito */}
        <div className="relative ml-1">
          <button
            onClick={onOpenCart}
            className="w-9 h-9 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] transition-all"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={17} />
          </button>
          {cartItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#c9a84c] text-[#0d0d0d] text-[10px] min-w-[18px] h-[18px] flex items-center justify-center px-1 font-bold rounded-full">
              {cartItemsCount}
            </span>
          )}
        </div>
      </div>

      {/* ── Navbar secundaria desktop — categorías ── */}
      <nav className="hidden md:flex justify-center bg-[#111] py-3 gap-10 border-t border-[#1e1e1e] text-xs">
        {categories.map(cat => (
          <Link
            key={cat.categoriaId}
            to={`/Productos?categoria=${cat.categoriaId}`}
            className="text-[#666] hover:text-[#c9a84c] font-semibold tracking-[0.2em] uppercase transition-colors"
            onClick={() => setSearch("")}
          >
            {formatName(cat.nombre)}
          </Link>
        ))}
      </nav>

      {/* ── Sidebar Mobile ── */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-72 h-full bg-[#111] border-r border-[#2e2e2e] shadow-2xl z-50 flex flex-col">

            {/* Header drawer */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#2e2e2e]">
              <div>
                <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold">Navegación</p>
                <h2 className="text-base font-light text-white mt-0.5">Menú</h2>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#666] hover:text-[#c9a84c] transition-all"
                aria-label="Cerrar menú"
              >
                <X size={15} />
              </button>
            </div>

            {/* Búsqueda mobile */}
            <div className="px-5 py-4 border-b border-[#2e2e2e]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!search.trim()) return;
                  setMenuOpen(false);
                  navigate(`/Productos?q=${encodeURIComponent(search.trim())}`);
                }}
                className="flex"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="flex-1 bg-[#1a1a1a] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#444] px-4 py-2 text-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] px-3 transition-colors"
                  aria-label="Buscar"
                >
                  <Search size={15} />
                </button>
              </form>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-1 text-sm">

              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-3 text-[#888] hover:text-white hover:bg-[#1a1a1a] border-l-2 border-transparent hover:border-[#c9a84c] transition-all"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={16} className="text-[#c9a84c]" />
                <span className="tracking-wider uppercase text-xs font-semibold">Inicio</span>
              </Link>

              {/* Categorías */}
              <div className="pt-4 pb-2">
                <p className="text-[10px] text-[#444] tracking-[0.3em] uppercase px-3 mb-2 font-semibold">
                  Categorías
                </p>
                {categories.map(cat => (
                  <Link
                    key={cat.categoriaId}
                    to={`/Productos?categoria=${cat.categoriaId}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-[#888] hover:text-white hover:bg-[#1a1a1a] border-l-2 border-transparent hover:border-[#c9a84c] transition-all"
                    onClick={() => {
                      setSearch("");
                      setMenuOpen(false);
                    }}
                  >
                    <span className="text-xs tracking-wider uppercase font-semibold">
                      {formatName(cat.nombre)}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-[#1e1e1e] space-y-1">
                <Link
                  to=""
                  className="flex items-center gap-3 px-3 py-3 text-[#888] hover:text-white hover:bg-[#1a1a1a] border-l-2 border-transparent hover:border-[#c9a84c] transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  <Phone size={16} className="text-[#c9a84c]" />
                  <span className="tracking-wider uppercase text-xs font-semibold">Contacto</span>
                </Link>

                <Link
                  to="/Pedidos"
                  className="flex items-center gap-3 px-3 py-3 text-[#888] hover:text-white hover:bg-[#1a1a1a] border-l-2 border-transparent hover:border-[#c9a84c] transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  <Package size={16} className="text-[#c9a84c]" />
                  <span className="tracking-wider uppercase text-xs font-semibold">Pedidos</span>
                </Link>

                <Link
                  to="/Devoluciones"
                  className="flex items-center gap-3 px-3 py-3 text-[#888] hover:text-white hover:bg-[#1a1a1a] border-l-2 border-transparent hover:border-[#c9a84c] transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  <RotateCcw size={16} className="text-[#c9a84c]" />
                  <span className="tracking-wider uppercase text-xs font-semibold">Devoluciones</span>
                </Link>
              </div>
            </nav>

            {/* Auth mobile */}
            <div className="px-5 py-5 border-t border-[#2e2e2e] bg-[#0d0d0d]">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <Link
                    to="/Auth/inicio-sesion"
                    className="w-full flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LogIn size={15} />
                    Iniciar sesión
                  </Link>
                  <p className="text-xs text-[#444] text-center tracking-wide">
                    ¿No tienes cuenta?{" "}
                    <Link
                      to="/Auth"
                      className="text-[#c9a84c] hover:underline underline-offset-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      Regístrate
                    </Link>
                  </p>
                </div>
              ) : (
                <Link
                  to="/"
                  className="w-full flex items-center justify-center gap-2 border border-[#2e2e2e] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all"
                  onClick={() => {
                    setMenuOpen(false);
                    localStorage.removeItem('ape_token');
                  }}
                >
                  <LogOut size={15} />
                  Cerrar sesión
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}