import CardProducto from "../components/CardProducto.jsx";
import FiltrosProductos from "../components/FiltrosProductos.jsx";

const Productos = () => {
  return (
    <>
      <div className="container mx-auto px-4 md:px-20 py-10 bg-gray-50">

        {/* Filtros */}
        <FiltrosProductos/>

        {/* Productos */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 18 }).map((_, idx) => (
            <CardProducto key={idx} />
          ))}
        </div>

        {/* Paginación minimalista */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
            <button className="px-3 py-1.5 text-gray-500 hover:text-blue-600 rounded-full transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition duration-200 ${
                  page === 1
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <span className="px-2 text-gray-400">...</span>

            <button className="px-4 py-1.5 text-sm text-gray-700 rounded-full hover:bg-gray-100 transition duration-200">
              10
            </button>

            <button className="px-3 py-1.5 text-gray-500 hover:text-blue-600 rounded-full transition duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Productos;
