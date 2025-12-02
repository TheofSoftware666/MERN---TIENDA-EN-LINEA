import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";
import { Search } from "lucide-react";

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
  // FaSearch 
} from "react-icons/fa6";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // NUEVO: Estado para el término de búsqueda móvil
  const [searchTermMobile, setSearchTermMobile] = useState("");
  
  const [categoriasAPI, setCategoriasAPI] = useState([]);
  const [marcasAPI, setMarcasAPI] = useState([]);

  // NUEVO: estados para colapsar secciones
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
    { value: "price_desc", label: "Precio: Mayor a Mayor" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // NUEVO: Función para manejar búsqueda móvil
  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (searchTermMobile.trim()) {
      // Actualizar URL con parámetro de búsqueda
      navigate(`?q=${encodeURIComponent(searchTermMobile.trim())}`);
    }
  };

  // NUEVO: Función para limpiar búsqueda móvil
  const clearMobileSearch = () => {
    setSearchTermMobile("");
    // Remover parámetro de búsqueda de la URL
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

  /* =====================================================
        GET PRODUCTS
  ====================================================== */
  const getProducts = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get("q");
      const categoriaURL = queryParams.get("categoria");

      // NUEVO: Sincronizar searchTermMobile con la URL
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

      console.log("Body enviado a la API:", body); // Para debugging

      const response = await clientAxios.post("/Productos", body);

      const adaptados = response.data.data.map((p) => ({
        id: p.id,
        nombre: p.Name,
        marca: p.Brand,
        precio: Number(p.Price),
        precioOriginal: Number(p.Price) + Number(p.Discount),
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

  /* =====================================================
        GET CATEGORIES
  ====================================================== */
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

  /* =====================================================
        GET BRANDS
  ====================================================== */
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

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
    // eslint-disable-next-line
  }, [location.search, selectedFilters]);

  // NUEVO: Efecto para sincronizar searchTermMobile con la URL al cargar
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    if (q) {
      setSearchTermMobile(q);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 lg:px-20 py-8 bg-gray-50 min-h-screen">
      
      <div className="lg:hidden mb-6">
  <form onSubmit={handleMobileSearch} className="relative">
    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl overflow-hidden">
      <div className="flex items-center">
        {/* Input con mejor espaciado y diseño */}
        <input
          type="text"
          value={searchTermMobile}
          onChange={(e) => setSearchTermMobile(e.target.value)}
          placeholder="Buscar productos, marcas o categorías..."
          className="flex-1 px-6 py-4 outline-none text-gray-800 placeholder-gray-500 text-base bg-transparent"
          autoComplete="off"
        />
        
        {/* Contenedor de botones con mejor diseño */}
        <div className="flex items-center pr-2">
          {searchTermMobile && (
            <button
              type="button"
              onClick={clearMobileSearch}
              className="p-3 mr-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
          
          <button
            type="submit"
            className="p-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
    
    {/* Indicador de búsqueda con mejor diseño */}
    {searchTermMobile && (
      <div className="mt-3 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm border border-blue-100">
              <Search className="text-blue-600" size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700 mb-0.5">
                Búsqueda activa
              </p>
              <p className="text-base font-bold text-gray-900">
                "{searchTermMobile}"
              </p>
            </div>
          </div>
          <button
            onClick={clearMobileSearch}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors px-3 py-1.5 hover:bg-blue-100 rounded-lg"
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
            SIDEBAR DESKTOP
        ====================================================== */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit sticky top-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-5">
            <FaFilter /> Filtros
          </h2>

          {/* CATEGORÍAS */}
          <div className="mb-6">
            <button
              onClick={() => setCollapseCategorias(!collapseCategorias)}
              className="flex justify-between items-center w-full text-gray-700 font-bold mb-3"
            >
              <span className="flex items-center gap-2">
                <FaBoxOpen /> Categorías
              </span>
              {collapseCategorias ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {collapseCategorias && (
              <div className="flex flex-col gap-2">
                {categoriasAPI.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange("categoria", cat.id)}
                    className={`px-4 py-2 rounded-xl border text-sm text-left ${
                      selectedFilters.categoria === cat.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
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
              className="flex justify-between items-center w-full text-gray-700 font-bold mb-3"
            >
              <span className="flex items-center gap-2">
                <FaTags /> Marcas
              </span>
              {collapseMarcas ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {collapseMarcas && (
              <div className="flex flex-col gap-2">
                {marcasAPI.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleFilterChange("marca", m.id)}
                    className={`px-4 py-2 rounded-xl border text-sm text-left ${
                      selectedFilters.marca === m.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
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
            <h3 className="flex items-center gap-2 text-gray-700 font-bold mb-3">
              <FaDollarSign /> Precio
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                className="border rounded-xl px-3 py-2 w-24"
                onChange={(e) =>
                  handleFilterChange("priceMin", e.target.value)
                }
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="border rounded-xl px-3 py-2 w-24"
                onChange={(e) =>
                  handleFilterChange("priceMax", e.target.value)
                }
              />
            </div>
          </div>

          {/* ORDEN */}
          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-bold mb-3">
              <FaSort /> Ordenar por
            </h3>
            <select
              className="border rounded-xl px-3 py-2 w-full"
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
            MOBILE FILTERS
        ====================================================================================== */}
        <div className="lg:hidden mb-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex justify-between items-center px-6 py-4 text-lg font-bold text-gray-800"
          >
            <span className="flex items-center gap-2">
              <FaFilter /> Filtros
            </span>
            <span className="text-blue-600">{showFilters ? "▲" : "▼"}</span>
          </button>

          {showFilters && (
            <div className="px-6 pb-6 pt-2 grid grid-cols-1 gap-6">
              {/* CATEGORÍAS MOBILE */}
              <div>
                <button
                  onClick={() =>
                    setCollapseCategoriasMobile(!collapseCategoriasMobile)
                  }
                  className="flex justify-between items-center w-full font-bold text-gray-700 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <FaBoxOpen /> Categorias
                  </span>
                  {collapseCategoriasMobile ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {collapseCategoriasMobile && (
                  <div className="flex flex-wrap gap-2">
                    {categoriasAPI.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          handleFilterChange("categoria", cat.id)
                        }
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          selectedFilters.categoria === cat.id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
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
                  className="flex justify-between items-center w-full font-bold text-gray-700 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <FaTags /> Marcas
                  </span>
                  {collapseMarcasMobile ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {collapseMarcasMobile && (
                  <div className="flex flex-wrap gap-2">
                    {marcasAPI.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleFilterChange("marca", m.id)}
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          selectedFilters.marca === m.id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
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
                <h3 className="font-bold text-gray-700 mb-2">Precio</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="border rounded-xl px-3 py-2 w-28"
                    onChange={(e) =>
                      handleFilterChange("priceMin", e.target.value)
                    }
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border rounded-xl px-3 py-2 w-28"
                    onChange={(e) =>
                      handleFilterChange("priceMax", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* ORDEN MOBILE */}
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Ordenar por</h3>
                <select
                  className="border rounded-xl px-3 py-2 w-full"
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
            PRODUCTOS LIST
        ====================================================== */}
        <div className="lg:col-span-3">
          {/* NUEVO: Indicador de búsqueda en móvil */}
          {searchTermMobile && (
            <div className="lg:hidden mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Búsqueda:</span> "{searchTermMobile}"
                </p>
                <button
                  onClick={clearMobileSearch}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Cargando productos...
              </p>
            </div>
          )}

          {!loading && notFound && (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-gray-700">
                No se encontraron resultados
              </p>
              <p className="text-gray-500 mt-2">
                {searchTermMobile ? (
                  <>Intenta con otro término de búsqueda diferente a "<strong>{searchTermMobile}</strong>"</>
                ) : (
                  "Intenta con otro término de búsqueda"
                )}
              </p>
              {searchTermMobile && (
                <button
                  onClick={clearMobileSearch}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}

          {!loading && !notFound && (
            <>
              {/* NUEVO: Resultados encontrados */}
              {searchTermMobile && (
                <p className="text-sm text-gray-600 mb-4">
                  {productos.length} resultado{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''} para "<span className="font-semibold">{searchTermMobile}</span>"
                </p>
              )}
              
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-gray-100 hover:border-blue-200 flex flex-col relative"
                  >
                    <Link to={`/Producto/${p.id}`}>
                      <img
                        src={import.meta.env.VITE_BACKEND_URL_IMAGENES + p.img}
                        alt={p.nombre}
                        className="w-full h-36 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {p.descuento > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1">
                          <FaFire /> -{p.descuento}% OFF
                        </span>
                      )}

                      {p.stock < 3 && (
                        <span className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1">
                          <FaBolt /> Solo {p.stock}
                        </span>
                      )}
                    </Link>

                    <div className="p-3 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-amber-500 text-xs" />
                          <span className="text-[11px] font-bold">{p.rating}</span>
                        </div>

                        <span className="text-[10px] text-gray-500">
                          {p.vendidos}+ vendidos
                        </span>
                      </div>

                      <h3 className="text-[13px] sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                        {p.nombre}
                      </h3>

                      <p className="text-[11px] text-gray-500 mt-1">{p.marca}</p>

                      <div className="mt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-bold text-gray-900">
                            ${p.precio}
                          </span>
                          <span className="text-[10px] sm:text-xs line-through text-gray-400">
                            ${p.precioOriginal}
                          </span>
                        </div>

                        <p className="text-[11px] font-bold text-green-600 flex items-center gap-1 mt-1">
                          <FaCheck className="text-[10px]" /> Ahorras ${p.descuento}
                        </p>
                      </div>

                      <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow hover:shadow-lg text-[12px] sm:text-sm">
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