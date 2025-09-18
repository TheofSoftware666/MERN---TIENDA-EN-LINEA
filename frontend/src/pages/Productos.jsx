import { Link } from "react-router-dom";
import { useState } from "react";

const Productos = () => {
  const [quickView, setQuickView] = useState(null);

  const productos = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    nombre: `Producto destacado ${i + 1}`,
    marca: "MarcaX",
    precio: 899,
    precioOriginal: 1099,
    descuento: 200,
    stock: 4 - (i % 4),
    variaciones: ["Rojo", "Azul", "Negro"],
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=704&auto=format&fit=crop",
  }));

  return (
    <>
      <div className="container mx-auto px-4 md:px-20 py-10 bg-gray-50">
        {/* Filtros */}
        <details className="group mb-8 bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300">
          <summary className="cursor-pointer px-6 py-4 text-lg font-semibold text-gray-800 flex items-center justify-between hover:bg-gray-100 transition-colors">
            <span>🔍 Filtros</span>
            <svg
              className="w-5 h-5 ml-2 transform transition-transform duration-300 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div className="p-6 space-y-6 animate-fade-in-down">
            <div>
              <p className="text-gray-700 font-semibold mb-2">Categoría</p>
              <div className="flex flex-wrap gap-2">
                {["Todos", "Mochilas", "Escolar", "Accesorios"].map((cat) => (
                  <button
                    key={cat}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-blue-100 hover:text-blue-700 text-sm transition-all duration-200"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Rango de Precio</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Todos</option>
                  <option>Menos de $500</option>
                  <option>$500 - $1000</option>
                  <option>Más de $1000</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Ordenar por</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Relevancia</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Novedades</option>
                </select>
              </div>
            </div>
          </div>
        </details>

        {/* Cards de productos */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {productos.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group relative flex flex-col"
            >
              {/* Imagen */}
              <Link to="/Producto/sd" className="relative">
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="w-full h-40 md:h-56 object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                {/* Etiqueta de descuento */}
                <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded-md text-xs md:text-sm font-bold shadow">
                  -20% OFF
                </span>
                {/* Vista rápida */}
                <button
                  onClick={() => setQuickView(p)}
                  className="hidden md:block absolute bottom-2 right-2 bg-white text-gray-800 px-2 py-1 rounded-md text-xs font-semibold shadow hover:bg-gray-100"
                >
                  👁 Vista rápida
                </button>
              </Link>

              {/* Contenido */}
              <div className="p-3 md:p-4 flex flex-col flex-grow justify-between">
                {/* Nombre y marca */}
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1">
                    {p.nombre}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">{p.marca}</p>
                </div>

                {/* Precios */}
                <div className="mt-2">
                  <span className="text-base md:text-xl font-bold text-gray-900">
                    ${p.precio}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400 line-through ml-2">
                    ${p.precioOriginal}
                  </span>
                  <p className="hidden md:block text-xs text-green-600 font-medium">
                    Ahorras ${p.descuento}
                  </p>
                </div>

                {/* Variaciones (solo mobile) */}
                <div className="mt-2 md:hidden">
                  <select className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    {p.variaciones.map((v, i) => (
                      <option key={i} selected={i === 0}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Microcopy confianza (solo desktop) */}
                <div className="hidden md:flex flex-wrap text-xs text-gray-500 gap-3 mt-3">
                  <span>🚚 Entrega en 24h</span>
                  <span>💳 3 meses sin interés</span>
                </div>

                {/* CTA */}
                <button className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 md:py-3 mt-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm md:text-base">
                  🛒 Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <img
              src={quickView.img}
              alt={quickView.nombre}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 mb-1">{quickView.nombre}</h3>
            <p className="text-sm text-gray-500 mb-4">{quickView.marca}</p>
            <div className="mb-4">
              <span className="text-xl font-bold text-gray-900">${quickView.precio}</span>
              <span className="text-sm text-gray-400 line-through ml-2">
                ${quickView.precioOriginal}
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Productos;
