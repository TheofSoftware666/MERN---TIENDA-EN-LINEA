import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";
import { Search } from "lucide-react";
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';

import {
  FaFilter, FaTags, FaBoxOpen, FaDollarSign, FaSort,
  FaStar, FaBolt, FaFire, FaCheck, FaCartShopping,
  FaChevronDown, FaChevronUp,
} from "react-icons/fa6";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { toasts, toast, removeToast } = useToast();

  const [searchTermMobile, setSearchTermMobile] = useState("");
  const [categoriasAPI, setCategoriasAPI] = useState([]);
  const [marcasAPI, setMarcasAPI] = useState([]);

  const [collapseCategorias, setCollapseCategorias] = useState(true);
  const [collapseMarcas, setCollapseMarcas] = useState(true);
  const [collapseCategoriasMobile, setCollapseCategoriasMobile] = useState(true);
  const [collapseMarcasMobile, setCollapseMarcasMobile] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    categoria: 0, marca: 0, priceMin: null, priceMax: null, orden: "default",
  });

  const ordenOptions = [
    { value: "default", label: "Más recientes" },
    { value: "popular", label: "Más vendidos" },
    { value: "price_asc", label: "Precio: Menor a Mayor" },
    { value: "price_desc", label: "Precio: Mayor a Menor" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (searchTermMobile.trim()) navigate(`?q=${encodeURIComponent(searchTermMobile.trim())}`);
  };

  const clearMobileSearch = () => {
    setSearchTermMobile("");
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("q");
    navigate(`?${queryParams.toString()}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filterType]: prev[filterType] === value ? 0 : value }));
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("ape_token");
      if (!token) return;
      await clientAxios.post(`/SetCartItem/${productId}`, { quantity: 1, variantId: null }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.cart("Producto agregado al carrito");
    } catch (ex) {
      console.error("Error al agregar producto al carrito:", ex.response.data.message);
      toast.error(ex.response.data.message || "Error al agregar el producto al carrito");
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get("q");
      const categoriaURL = queryParams.get("categoria");
      if (q) setSearchTermMobile(q);

      const body = {
        keywords: q && q.trim() !== "" ? q.trim() : "",
        categories: selectedFilters.categoria > 0 ? [selectedFilters.categoria] : categoriaURL ? [Number(categoriaURL)] : [],
        brands: selectedFilters.marca > 0 ? [selectedFilters.marca] : [],
        priceMin: selectedFilters.priceMin || null,
        priceMax: selectedFilters.priceMax || null,
        order: selectedFilters.orden, limit: 20,
      };

      const response = await clientAxios.post("/Productos", body);
      const adaptados = response.data.data.map((p) => ({
        id: p.id, nombre: p.Name, marca: p.Brand,
        precio: Number(p.Price) * (1 - Number(p.Discount) / 100),
        precioOriginal: Number(p.Price), descuento: Number(p.Discount),
        stock: p.stock, vendidos: p.Sell,
        rating: (Math.random() * 0.8 + 4.2).toFixed(1),
        img: p.Images?.length > 0 ? p.Images[0].url : "/no-image.png",
      }));

      setProductos(adaptados);
      if (adaptados.length === 0) setNotFound(true);
    } catch (ex) {
      console.error("Error:", ex);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const data = await clientAxios("/Admin/Categorias/10000");
      setCategoriasAPI(data.data.categorias.map((c) => ({
        id: c.categoriaId,
        nombre: c.nombre.charAt(0).toUpperCase() + c.nombre.slice(1).toLowerCase(),
      })));
    } catch (ex) { console.warn("Error al obtener categorías."); }
  };

  const getBrands = async () => {
    try {
      const data = await clientAxios("/Admin/Marcas/10000");
      setMarcasAPI(data.data.marcas.map((m) => ({
        id: m.marcaId,
        nombre: m.nombre.charAt(0).toUpperCase() + m.nombre.slice(1).toLowerCase(),
      })));
    } catch (ex) { console.warn("Error al obtener marcas."); }
  };

  const registerVisit = async (productId) => {
    try { await clientAxios.post(`/SetProductoVisit/${productId}`); }
    catch (error) { console.warn("No se pudo registrar la visita"); }
  };

  useEffect(() => { getProducts(); getCategories(); getBrands(); }, [location.search, selectedFilters]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    if (q) setSearchTermMobile(q);
  }, [location.search]);

  // ── Clases reutilizables ──
  const inputBase = "bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] placeholder-[#bbb] outline-none transition-colors text-sm";
  const filterBtn = (active) => `px-3 py-2 border text-xs text-left transition-all tracking-wide ${
    active ? 'bg-[#c9a84c] text-[#0d0d0d] border-[#c9a84c] font-bold' : 'bg-white text-[#888] border-[#e8e8e8] hover:border-[#c9a84c] hover:text-[#c9a84c]'
  }`;
  const sectionToggle = "flex justify-between items-center w-full text-[#999] font-semibold text-xs tracking-widest uppercase mb-3 hover:text-[#c9a84c] transition-colors";

  return (
    <div className="min-h-screen bg-white px-4 lg:px-12 py-10">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* ── Búsqueda mobile ── */}
      <div className="lg:hidden mb-6">
        <form onSubmit={handleMobileSearch} className="relative">
          <div className="flex border border-[#e8e8e8] focus-within:border-[#c9a84c] transition-colors overflow-hidden">
            <input
              type="text" value={searchTermMobile}
              onChange={(e) => setSearchTermMobile(e.target.value)}
              placeholder="Buscar productos, marcas o categorías..."
              className={`flex-1 ${inputBase} px-5 py-3.5`}
              autoComplete="off"
            />
            {searchTermMobile && (
              <button type="button" onClick={clearMobileSearch}
                className="px-3 text-[#bbb] hover:text-[#c9a84c] transition-colors text-sm"
              >✕</button>
            )}
            <button type="submit"
              className="px-4 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] transition-colors"
              aria-label="Buscar"
            ><Search size={17} /></button>
          </div>

          {searchTermMobile && (
            <div className="mt-2 bg-white border border-[#e8e8e8] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search size={13} className="text-[#c9a84c]" />
                <p className="text-xs text-[#999] tracking-wide">
                  Búsqueda: <span className="text-[#1a1a1a] font-semibold">"{searchTermMobile}"</span>
                </p>
              </div>
              <button onClick={clearMobileSearch} className="text-[10px] text-[#c9a84c] hover:underline underline-offset-2 tracking-widest uppercase">
                Limpiar
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">

        {/* ── Sidebar desktop ── */}
        <div className="hidden lg:block bg-white border border-[#e8e8e8] p-6 h-fit sticky top-10">
          <h2 className="flex items-center gap-2 text-[10px] font-semibold text-[#c9a84c] tracking-[0.3em] uppercase mb-6">
            <FaFilter className="text-xs" /> Filtros
          </h2>

          {/* Categorías */}
          <div className="mb-6 pb-6 border-b border-[#f0f0f0]">
            <button onClick={() => setCollapseCategorias(!collapseCategorias)} className={sectionToggle}>
              <span className="flex items-center gap-2"><FaBoxOpen className="text-[10px]" /> Categorías</span>
              {collapseCategorias ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
            </button>
            {collapseCategorias && (
              <div className="flex flex-col gap-1.5">
                {categoriasAPI.map((cat) => (
                  <button key={cat.id} onClick={() => handleFilterChange("categoria", cat.id)}
                    className={filterBtn(selectedFilters.categoria === cat.id)}
                  >{cat.nombre}</button>
                ))}
              </div>
            )}
          </div>

          {/* Marcas */}
          <div className="mb-6 pb-6 border-b border-[#f0f0f0]">
            <button onClick={() => setCollapseMarcas(!collapseMarcas)} className={sectionToggle}>
              <span className="flex items-center gap-2"><FaTags className="text-[10px]" /> Marcas</span>
              {collapseMarcas ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
            </button>
            {collapseMarcas && (
              <div className="flex flex-col gap-1.5">
                {marcasAPI.map((m) => (
                  <button key={m.id} onClick={() => handleFilterChange("marca", m.id)}
                    className={filterBtn(selectedFilters.marca === m.id)}
                  >{m.nombre}</button>
                ))}
              </div>
            )}
          </div>

          {/* Precio */}
          <div className="mb-6 pb-6 border-b border-[#f0f0f0]">
            <h3 className="flex items-center gap-2 text-[10px] font-semibold text-[#999] tracking-widest uppercase mb-3">
              <FaDollarSign className="text-[10px]" /> Precio
            </h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min"
                className={`${inputBase} px-3 py-2 w-full`}
                onChange={(e) => handleFilterChange("priceMin", e.target.value)}
              />
              <span className="text-[#bbb] flex-shrink-0">—</span>
              <input type="number" placeholder="Max"
                className={`${inputBase} px-3 py-2 w-full`}
                onChange={(e) => handleFilterChange("priceMax", e.target.value)}
              />
            </div>
          </div>

          {/* Orden */}
          <div>
            <h3 className="flex items-center gap-2 text-[10px] font-semibold text-[#999] tracking-widest uppercase mb-3">
              <FaSort className="text-[10px]" /> Ordenar por
            </h3>
            <select
              className={`${inputBase} px-3 py-2.5 w-full appearance-none cursor-pointer`}
              onChange={(e) => handleFilterChange("orden", e.target.value)}
            >
              {ordenOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Filtros mobile ── */}
        <div className="lg:hidden mb-6 bg-white border border-[#e8e8e8]">
          <button onClick={() => setShowFilters(!showFilters)}
            className="w-full flex justify-between items-center px-5 py-4 text-xs font-bold text-[#999] tracking-widest uppercase"
          >
            <span className="flex items-center gap-2"><FaFilter className="text-[#c9a84c]" /> Filtros</span>
            <span className="text-[#c9a84c] text-[10px]">{showFilters ? "▲" : "▼"}</span>
          </button>

          {showFilters && (
            <div className="px-5 pb-5 pt-1 space-y-5 border-t border-[#f0f0f0]">
              {/* Categorías mobile */}
              <div>
                <button onClick={() => setCollapseCategoriasMobile(!collapseCategoriasMobile)} className={sectionToggle}>
                  <span className="flex items-center gap-2"><FaBoxOpen className="text-[10px]" /> Categorías</span>
                  {collapseCategoriasMobile ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                </button>
                {collapseCategoriasMobile && (
                  <div className="flex flex-wrap gap-1.5">
                    {categoriasAPI.map((cat) => (
                      <button key={cat.id} onClick={() => handleFilterChange("categoria", cat.id)}
                        className={filterBtn(selectedFilters.categoria === cat.id)}
                      >{cat.nombre}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Marcas mobile */}
              <div>
                <button onClick={() => setCollapseMarcasMobile(!collapseMarcasMobile)} className={sectionToggle}>
                  <span className="flex items-center gap-2"><FaTags className="text-[10px]" /> Marcas</span>
                  {collapseMarcasMobile ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                </button>
                {collapseMarcasMobile && (
                  <div className="flex flex-wrap gap-1.5">
                    {marcasAPI.map((m) => (
                      <button key={m.id} onClick={() => handleFilterChange("marca", m.id)}
                        className={filterBtn(selectedFilters.marca === m.id)}
                      >{m.nombre}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Precio mobile */}
              <div>
                <h3 className="text-[10px] font-semibold text-[#999] tracking-widest uppercase mb-2">Precio</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className={`${inputBase} px-3 py-2 w-full`}
                    onChange={(e) => handleFilterChange("priceMin", e.target.value)} />
                  <span className="text-[#bbb]">—</span>
                  <input type="number" placeholder="Max" className={`${inputBase} px-3 py-2 w-full`}
                    onChange={(e) => handleFilterChange("priceMax", e.target.value)} />
                </div>
              </div>

              {/* Orden mobile */}
              <div>
                <h3 className="text-[10px] font-semibold text-[#999] tracking-widest uppercase mb-2">Ordenar por</h3>
                <select className={`${inputBase} px-3 py-2.5 w-full appearance-none`}
                  onChange={(e) => handleFilterChange("orden", e.target.value)}
                >
                  {ordenOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ── Grid de productos ── */}
        <div className="lg:col-span-3">

          {/* Indicador búsqueda desktop */}
          {searchTermMobile && (
            <div className="hidden lg:flex items-center justify-between mb-6 px-4 py-3 bg-white border border-[#e8e8e8]">
              <p className="text-xs text-[#999] tracking-wide">
                <span className="text-[#c9a84c] font-semibold">{productos.length}</span> resultado{productos.length !== 1 ? 's' : ''} para{" "}
                "<span className="text-[#1a1a1a]">{searchTermMobile}</span>"
              </p>
              <button onClick={clearMobileSearch}
                className="text-[10px] text-[#c9a84c] hover:underline underline-offset-2 tracking-widest uppercase"
              >Limpiar</button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-8 h-8 border border-[#e8e8e8] border-t-[#c9a84c] rounded-full animate-spin mb-4" />
              <p className="text-[#aaa] text-xs tracking-widest uppercase">Cargando productos</p>
            </div>
          )}

          {/* Not found */}
          {!loading && notFound && (
            <div className="text-center py-24 bg-white border border-[#e8e8e8]">
              <div className="w-14 h-14 border border-[#e8e8e8] flex items-center justify-center mx-auto mb-5">
                <FaBoxOpen className="text-[#bbb] text-lg" />
              </div>
              <p className="text-[#1a1a1a] text-lg font-light mb-2">No se encontraron resultados</p>
              <p className="text-[#aaa] text-xs tracking-wide mb-6">
                {searchTermMobile
                  ? <>Intenta con otro término diferente a "<span className="text-[#999]">{searchTermMobile}</span>"</>
                  : "Intenta con otro término de búsqueda"}
              </p>
              {searchTermMobile && (
                <button onClick={clearMobileSearch}
                  className="px-6 py-2.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all"
                >Limpiar búsqueda</button>
              )}
            </div>
          )}

          {/* Grid */}
          {!loading && !notFound && (
            <>
              {searchTermMobile && (
                <p className="text-xs text-[#aaa] tracking-wide mb-4 lg:hidden">
                  <span className="text-[#c9a84c] font-semibold">{productos.length}</span> resultado{productos.length !== 1 ? 's' : ''} para{" "}
                  "<span className="text-[#1a1a1a]">{searchTermMobile}</span>"
                </p>
              )}

              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                {productos.map((p) => (
                  <div key={p.id}
                    className="bg-white border border-[#e8e8e8] hover:border-[#c9a84c]/40 overflow-hidden hover:shadow-[0_4px_30px_rgba(201,168,76,0.1)] transition-all flex flex-col relative group"
                  >
                    <Link to={`/Producto/${p.id}`} onClick={() => registerVisit(p.id)}>
                      <div className="overflow-hidden">
                        <img
                          src={import.meta.env.VITE_BACKEND_URL_IMAGENES + p.img}
                          alt={p.nombre}
                          className="w-full h-36 sm:h-44 md:h-48 object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                          loading="lazy"
                        />
                      </div>

                      {p.descuento > 0 && (
                        <span className="absolute top-2 left-2 bg-[#c9a84c] text-[#0d0d0d] px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                          <FaFire className="text-[10px]" /> -{p.descuento}%
                        </span>
                      )}
                      {p.stock < 3 && p.stock > 0 && (
                        <span className="absolute top-2 right-2 border border-[#c9a84c]/50 bg-white text-[#c9a84c] px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                          <FaBolt className="text-[10px]" /> {p.stock} left
                        </span>
                      )}
                    </Link>

                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-[#c9a84c] text-xs" />
                          <span className="text-xs font-semibold text-[#c9a84c]">{p.rating}</span>
                        </div>
                        <span className="text-[10px] text-[#888] tracking-wider">{p.vendidos}+ vendidos</span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug tracking-tight">
                        {p.nombre}
                      </h3>
                      <p className="text-[10px] text-[#aaa] mt-1 tracking-wider uppercase">{p.marca}</p>

                      <div className="mt-3 pt-3 border-t border-[#e8e8e8]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-bold text-[#1a1a1a]">${p.precio}</span>
                          <span className="text-xs line-through text-[#aaa]">${p.precioOriginal}</span>
                        </div>
                        <p className="text-[10px] font-medium text-[#7abf8a] flex items-center gap-1 mt-1">
                          <FaCheck className="text-[10px]" /> Ahorras ${p.descuento}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(p.id)}
                        className="mt-3 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-2.5 flex items-center justify-center gap-2 transition-all text-xs font-bold tracking-[0.15em] uppercase"
                      >
                        <FaCartShopping className="text-xs" /> Agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productos;