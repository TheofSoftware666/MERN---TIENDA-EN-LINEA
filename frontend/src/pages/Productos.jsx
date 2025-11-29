import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";

import {
  FaFire,
  FaStar,
  FaCartShopping,
  FaBolt,
  FaCheck,
  FaTag
} from "react-icons/fa6";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);       
  const [notFound, setNotFound] = useState(false);   

  const [selectedFilters, setSelectedFilters] = useState({
    categoria: "Todos",
    precio: "Todos",
    orden: "Más relevantes"
  });

  const location = useLocation();

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get("q");
      const categoria = queryParams.get("categoria");

      const body = {
        keywords: (q && q.trim() !== "") ? q.trim() : "",
        categories: categoria ? [Number(categoria)] : [],
        brands: [],
        priceMin: null,
        priceMax: null,
        order: "default",
        limit: 20
      };

      const response = await clientAxios.post("/Productos", body);

      const adaptados = response.data.data.map(p => ({
        id: p.id,
        nombre: p.Name,
        marca: p.Brand,
        precio: Number(p.Price),
        precioOriginal: Number(p.Price) + Number(p.Discount),
        descuento: Number(p.Discount),
        stock: p.stock,
        vendidos: p.Sell,
        rating: (Math.random() * 0.8 + 4.2).toFixed(1),
        img: p.Images?.length > 0 ? p.Images[0].url : "/no-image.png"
      }));

      setProductos(adaptados);

      if (adaptados.length === 0) {
        setNotFound(true);
      }

    } catch (ex) {
      console.error("Error al cargar productos:", ex);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProducts();
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 lg:px-20 py-8 bg-gray-50 min-h-screen">

      {/* FILTROS */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-blue-100">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wide">
              <FaTag className="inline mr-2 text-blue-600" />
              Categorías
            </label>

            <div className="flex flex-wrap gap-2">
              {["Todos", "Mochilas", "Escolar", "Accesorios", "Ejecutiva", "Viaje"].map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange("categoria", cat)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all border
                    ${selectedFilters.categoria === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================
            SPINNER CARGANDO
      ============================ */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Cargando productos...</p>
        </div>
      )}

      {/* ============================
            SIN RESULTADOS
      ============================ */}
      {!loading && notFound && (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-gray-700">No se encontraron resultados</p>
          <p className="text-gray-500 mt-2">Intenta con otro término de búsqueda</p>
        </div>
      )}

      {/* ============================
            GRID DE PRODUCTOS
      ============================ */}
      {!loading && !notFound && (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productos.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-100 hover:border-blue-200 flex flex-col relative"
            >
              <Link to={`/Producto/${p.id}`}>
                <img
                  src={import.meta.env.VITE_BACKEND_URL_IMAGENES + p.img}
                  alt={p.nombre}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {p.descuento > 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                    <FaFire /> -{p.descuento}% OFF
                  </span>
                )}

                {p.stock < 3 && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                    <FaBolt /> Solo {p.stock}
                  </span>
                )}
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-amber-500" />
                    <span className="text-xs font-bold">{p.rating}</span>
                  </div>

                  <span className="text-xs text-gray-500 font-medium">
                    {p.vendidos}+ vendidos
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1">
                  {p.nombre}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{p.marca}</p>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">${p.precio}</span>
                    <span className="text-xs line-through text-gray-400">${p.precioOriginal}</span>
                  </div>

                  <p className="text-xs font-bold text-green-600 flex items-center gap-1 mt-1">
                    <FaCheck className="text-xs" /> Ahorras ${p.descuento}
                  </p>
                </div>

                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                  <FaCartShopping /> Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
