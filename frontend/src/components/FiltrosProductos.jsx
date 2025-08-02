import React from 'react'

const FiltrosProductos = () => {
  return (
    <>        
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

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Productos por página</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>8</option>
                <option>12</option>
                <option>16</option>
                <option>24</option>
                <option>Todos</option>
              </select>
            </div>
          </div>
        </details>
    </>
  )
}

export default FiltrosProductos