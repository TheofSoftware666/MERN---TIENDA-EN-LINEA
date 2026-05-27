import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";
import { Search } from "lucide-react";
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';

import {
  FaFilter,
  FaTags,
  FaBoxOpen,
  FaDollarSign,
  FaSort,
  FaStar,
  FaBolt,
  FaFire,
  FaCheck,
  FaCartShopping,
  FaChevronDown,
  FaChevronUp,
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
    categoria: 0,
    marca: 0,
    priceMin: null,
    priceMax: null,
    orden: "default",
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
    if (searchTermMobile.trim()) {
      navigate(`?q=${encodeURIComponent(searchTermMobile.trim())}`);
    }
  };

  const clearMobileSearch = () => {
    setSearchTermMobile("");
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("q");
    navigate(`?${queryParams.toString()}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? 0 : value,
    }));
  };

  const handleAddToCart = async (productId) => {
    try{
      const token = localStorage.getItem("ape_token");
      const body = {
        quantity: 1,
        variantId: null
      };

      if(!token){
        return;
      }

      const response = await clientAxios.post(`/SetCartItem/${productId}`, body, {
        headers: {
          Authorization : `Bearer ${token}`
      }});

      toast.cart("Producto agregado al carrito");
      // console.log("Producto agregado al carrito:", response.data);      
      
    }catch(ex){
      console.error("Error al agregar producto al carrito:", ex.response.data.message);
      toast.error(ex.response.data.message || "Error al agregar el producto al carrito");
    }
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get("q");
      const categoriaURL = queryParams.get("categoria");

      if (q) {
        setSearchTermMobile(q);
      }

      const body = {
        keywords: q && q.trim() !== "" ? q.trim() : "",
        categories:
          selectedFilters.categoria > 0
            ? [selectedFilters.categoria]
            : categoriaURL
            ? [Number(categoriaURL)]
            : [],

        brands: selectedFilters.marca > 0 ? [selectedFilters.marca] : [],

        priceMin: selectedFilters.priceMin || null,
        priceMax: selectedFilters.priceMax || null,
        order: selectedFilters.orden,
        limit: 20,
      };

      const response = await clientAxios.post("/Productos", body);

      const adaptados = response.data.data.map((p) => ({
        id: p.id,
        nombre: p.Name,
        marca: p.Brand,
        precio: Number(p.Price) * (1 - Number(p.Discount) / 100),
        precioOriginal: Number(p.Price),
        descuento: Number(p.Discount),
        stock: p.stock,
        vendidos: p.Sell,
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
      const categorias = data.data.categorias.map((c) => ({
        id: c.categoriaId,
        nombre:
          c.nombre.charAt(0).toUpperCase() + c.nombre.slice(1).toLowerCase(),
      }));

      setCategoriasAPI(categorias);
    } catch (ex) {
      console.warn("Error al obtener categorías.");
    }
  };

  const getBrands = async () => {
    try {
      const data = await clientAxios("/Admin/Marcas/10000");

      const marcas = data.data.marcas.map((m) => ({
        id: m.marcaId,
        nombre:
          m.nombre.charAt(0).toUpperCase() + m.nombre.slice(1).toLowerCase(),
      }));

      setMarcasAPI(marcas);
    } catch (ex) {
      console.warn("Error al obtener marcas.");
    }
  };

   const registerVisit = async (productId) => {
    try {
      await clientAxios.post(`/SetProductoVisit/${productId}`);
    } catch (error) {
      console.warn("No se pudo registrar la visita");
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
  }, [location.search, selectedFilters]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    if (q) {
      setSearchTermMobile(q);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 lg:px-20 py-8 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <ToastContainer toasts={toasts} removeToast={removeToast}/>
      
      {/* Barra de búsqueda móvil - estilo cosmético */}
      <div className="lg:hidden mb-6">
        <form onSubmit={handleMobileSearch} className="relative">
          <div className="relative bg-white rounded-3xl shadow-lg border border-pink-200 hover:border-pink-300 transition-all duration-300 hover:shadow-xl overflow-hidden">
            <div className="flex items-center">
              <input
                type="text"
                value={searchTermMobile}
                onChange={(e) => setSearchTermMobile(e.target.value)}
                placeholder="Buscar productos, marcas o categorías..."
                className="flex-1 px-6 py-4 outline-none text-gray-700 placeholder-gray-400 text-base bg-transparent"
                autoComplete="off"
              />
              
              <div className="flex items-center pr-2">
                {searchTermMobile && (
                  <button
                    type="button"
                    onClick={clearMobileSearch}
                    className="p-3 mr-1 text-gray-400 hover:text-gray-600 hover:bg-pink-50 rounded-full transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
                
                <button
                  type="submit"
                  className="p-3.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:from-pink-600 hover:to-rose-500 transition-all duration-300 shadow-md hover:shadow-lg rounded-xl"
                  aria-label="Buscar"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {searchTermMobile && (
            <div className="mt-3 bg-rose-50 rounded-xl p-4 border border-rose-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm border border-rose-100">
                    <Search className="text-rose-500" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-rose-600 mb-0.5">
                      Búsqueda activa
                    </p>
                    <p className="text-base font-bold text-gray-800">
                      "{searchTermMobile}"
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearMobileSearch}
                  className="text-sm font-medium text-rose-600 hover:text-rose-700 hover:underline transition-colors px-3 py-1.5 hover:bg-rose-100 rounded-lg"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-10">
        {/* =====================================================
            SIDEBAR DESKTOP - ESTILO COSMÉTICO
        ====================================================== */}
        <div className="hidden lg:block bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-pink-100 p-6 h-fit sticky top-10">
          <h2 className="flex items-center gap-2 text-xl font-light text-gray-800 mb-5">
            <FaFilter className="text-pink-400" /> Filtros
          </h2>

          {/* CATEGORÍAS */}
          <div className="mb-6">
            <button
              onClick={() => setCollapseCategorias(!collapseCategorias)}
              className="flex justify-between items-center w-full text-gray-700 font-medium mb-3"
            >
              <span className="flex items-center gap-2">
                <FaBoxOpen className="text-pink-300" /> Categorías
              </span>
              {collapseCategorias ? <FaChevronUp className="text-pink-300" /> : <FaChevronDown className="text-pink-300" />}
            </button>

            {collapseCategorias && (
              <div className="flex flex-col gap-2">
                {categoriasAPI.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange("categoria", cat.id)}
                    className={`px-4 py-2 rounded-xl border text-sm text-left transition-all ${
                      selectedFilters.categoria === cat.id
                        ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-md"
                        : "bg-white text-gray-600 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                    }`}
                  >
                    {cat.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MARCAS */}
          <div className="mb-6">
            <button
              onClick={() => setCollapseMarcas(!collapseMarcas)}
              className="flex justify-between items-center w-full text-gray-700 font-medium mb-3"
            >
              <span className="flex items-center gap-2">
                <FaTags className="text-pink-300" /> Marcas
              </span>
              {collapseMarcas ? <FaChevronUp className="text-pink-300" /> : <FaChevronDown className="text-pink-300" />}
            </button>

            {collapseMarcas && (
              <div className="flex flex-col gap-2">
                {marcasAPI.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleFilterChange("marca", m.id)}
                    className={`px-4 py-2 rounded-xl border text-sm text-left transition-all ${
                      selectedFilters.marca === m.id
                        ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-md"
                        : "bg-white text-gray-600 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                    }`}
                  >
                    {m.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRECIO */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaDollarSign className="text-pink-300" /> Precio
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                className="border border-pink-200 rounded-xl px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-pink-300"
                onChange={(e) =>
                  handleFilterChange("priceMin", e.target.value)
                }
              />
              <span className="text-pink-300">-</span>
              <input
                type="number"
                placeholder="Max"
                className="border border-pink-200 rounded-xl px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-pink-300"
                onChange={(e) =>
                  handleFilterChange("priceMax", e.target.value)
                }
              />
            </div>
          </div>

          {/* ORDEN */}
          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <FaSort className="text-pink-300" /> Ordenar por
            </h3>
            <select
              className="border border-pink-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              onChange={(e) => handleFilterChange("orden", e.target.value)}
            >
              {ordenOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ======================================================================================
            MOBILE FILTERS - ESTILO COSMÉTICO
        ====================================================================================== */}
        <div className="lg:hidden mb-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-pink-100">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium text-gray-800"
          >
            <span className="flex items-center gap-2">
              <FaFilter className="text-pink-400" /> Filtros
            </span>
            <span className="text-pink-500">{showFilters ? "▲" : "▼"}</span>
          </button>

          {showFilters && (
            <div className="px-6 pb-6 pt-2 grid grid-cols-1 gap-6">
              {/* CATEGORÍAS MOBILE */}
              <div>
                <button
                  onClick={() =>
                    setCollapseCategoriasMobile(!collapseCategoriasMobile)
                  }
                  className="flex justify-between items-center w-full font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <FaBoxOpen className="text-pink-300" /> Categorias
                  </span>
                  {collapseCategoriasMobile ? <FaChevronUp className="text-pink-300" /> : <FaChevronDown className="text-pink-300" />}
                </button>

                {collapseCategoriasMobile && (
                  <div className="flex flex-wrap gap-2">
                    {categoriasAPI.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          handleFilterChange("categoria", cat.id)
                        }
                        className={`px-3 py-2 rounded-xl border text-sm transition-all ${
                          selectedFilters.categoria === cat.id
                            ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400"
                            : "bg-white text-gray-600 border-pink-200 hover:bg-pink-50"
                        }`}
                      >
                        {cat.nombre}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* MARCAS MOBILE */}
              <div>
                <button
                  onClick={() =>
                    setCollapseMarcasMobile(!collapseMarcasMobile)
                  }
                  className="flex justify-between items-center w-full font-medium text-gray-700 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <FaTags className="text-pink-300" /> Marcas
                  </span>
                  {collapseMarcasMobile ? <FaChevronUp className="text-pink-300" /> : <FaChevronDown className="text-pink-300" />}
                </button>

                {collapseMarcasMobile && (
                  <div className="flex flex-wrap gap-2">
                    {marcasAPI.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleFilterChange("marca", m.id)}
                        className={`px-3 py-2 rounded-xl border text-sm transition-all ${
                          selectedFilters.marca === m.id
                            ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400"
                            : "bg-white text-gray-600 border-pink-200 hover:bg-pink-50"
                        }`}
                      >
                        {m.nombre}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PRECIO MOBILE */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Precio</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="border border-pink-200 rounded-xl px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    onChange={(e) =>
                      handleFilterChange("priceMin", e.target.value)
                    }
                  />
                  <span className="text-pink-300">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border border-pink-200 rounded-xl px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    onChange={(e) =>
                      handleFilterChange("priceMax", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* ORDEN MOBILE */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Ordenar por</h3>
                <select
                  className="border border-pink-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                  onChange={(e) => handleFilterChange("orden", e.target.value)}
                >
                  {ordenOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            PRODUCTOS LIST - CON TARJETAS COSMÉTICAS
        ====================================================== */}
        <div className="lg:col-span-3">
          {/* Indicador de búsqueda en móvil */}
          {searchTermMobile && (
            <div className="lg:hidden mb-4 p-3 bg-rose-50 rounded-xl border border-rose-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-rose-700">
                  <span className="font-semibold">Búsqueda:</span> "{searchTermMobile}"
                </p>
                <button
                  onClick={clearMobileSearch}
                  className="text-xs text-rose-600 hover:text-rose-700 underline"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Cargando productos...
              </p>
            </div>
          )}

          {!loading && notFound && (
            <div className="text-center py-20">
              <p className="text-2xl font-light text-gray-700">
                No se encontraron resultados
              </p>
              <p className="text-gray-500 mt-2">
                {searchTermMobile ? (
                  <>Intenta con otro término de búsqueda diferente a "<span className="font-semibold">{searchTermMobile}</span>"</>
                ) : (
                  "Intenta con otro término de búsqueda"
                )}
              </p>
              {searchTermMobile && (
                <button
                  onClick={clearMobileSearch}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl hover:from-pink-600 hover:to-rose-500 transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}

          {!loading && !notFound && (
            <>
              {searchTermMobile && (
                <p className="text-sm text-gray-600 mb-4">
                  {productos.length} resultado{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''} para "<span className="font-semibold">{searchTermMobile}</span>"
                </p>
              )}
              
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-pink-100 hover:border-pink-300 flex flex-col relative"
                  >
                    <Link to={`/Producto/${p.id}`}
                          onClick={() => registerVisit(p.id)}>
                      <img
                        src={import.meta.env.VITE_BACKEND_URL_IMAGENES + p.img}
                        alt={p.nombre}
                        className="w-full h-36 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {p.descuento > 0 && (
                        <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
                          <FaFire /> -{p.descuento}% OFF
                        </span>
                      )}

                      {p.stock < 3 && (
                        <span className="absolute top-2 right-2 bg-amber-400 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
                          <FaBolt /> Solo {p.stock}
                        </span>
                      )}
                    </Link>

                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-amber-400 text-sm" />
                          <span className="text-xs font-semibold text-gray-700">{p.rating}</span>
                        </div>

                        <span className="text-xs text-pink-400 bg-pink-50 px-2 py-0.5 rounded-full">
                          {p.vendidos}+ vendidos
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
                        {p.nombre}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">{p.marca}</p>

                      <div className="mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-xl font-bold text-gray-900">
                            ${p.precio}
                          </span>
                          <span className="text-xs line-through text-gray-400">
                            ${p.precioOriginal}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1">
                          <FaCheck className="text-green-500" /> Ahorras ${p.descuento}
                        </p>
                      </div>

                      <button onClick={() => handleAddToCart(p.id)} 
                              className="mt-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm">
                        <FaCartShopping /> Agregar
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