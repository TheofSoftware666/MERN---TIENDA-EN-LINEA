import { useEffect } from "react"
import Carousel from "../components/Carousel.jsx"

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("ape_tokens")
    console.log(token)
  }, [])

  return (
    <>
      {/* Hero con CTA principal */}
      <section className="relative w-full h-[500px] bg-gray-900 text-white flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342f25d7e"
          alt="Banner Principal"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tu próximo producto favorito está aquí 🚀
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Descubre ofertas exclusivas por tiempo limitado. ¡No dejes pasar la oportunidad!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            Comprar ahora
          </button>
        </div>
      </section>

      {/* Carousel */}
      {/* <div className="max-w-7xl mx-auto my-12">
        <Carousel />
      </div> */}

      {/* Beneficios clave */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-2">🚚 Envío Gratis</h3>
            <p className="text-gray-600">En pedidos superiores a $999</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-2">💳 Pagos Seguros</h3>
            <p className="text-gray-600">Compra protegida 100% garantizada</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-2">🔄 Devoluciones Fáciles</h3>
            <p className="text-gray-600">30 días para cambios sin complicaciones</p>
          </div>
        </div>
      </section>

      {/* Promociones con urgencia */}
<section className="max-w-7xl mx-auto px-6 py-12">
  <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
    🔥 Promociones Exclusivas 🔥
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group relative flex flex-col"
      >
        {/* Imagen */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1585386959984-a4155223f9f3"
            alt="Producto en Promoción"
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
          {/* Etiqueta de descuento */}
          <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow">
            -20% OFF
          </span>
          {/* Etiqueta de marketing */}
          <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-md text-xs font-semibold shadow">
            ⭐ Más vendido
          </span>
          {/* Vista rápida */}
          <button className="absolute bottom-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-semibold shadow hover:bg-gray-100">
            👁 Vista rápida
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Producto destacado {item}
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              🔥 Solo quedan {4 - item} en stock
            </p>
          </div>

          {/* Precios */}
          <div className="mt-2">
            <span className="text-xl font-bold text-gray-900">$899</span>
            <span className="text-sm text-gray-400 line-through ml-2">
              $1,099
            </span>
            <p className="text-xs text-green-600 font-medium">Ahorras $200</p>
          </div>

          {/* Microcopy de confianza */}
          <div className="flex flex-wrap text-xs text-gray-500 gap-3 mt-3">
            <span>🚚 Entrega en 24h</span>
            <span>💳 3 meses sin interés</span>
          </div>

          {/* CTA */}
          <button className="bg-blue-600 hover:bg-blue-700 w-full text-white py-3 mt-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Categorías visuales */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explora por Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Tecnología", "Moda", "Hogar", "Libros"].map((cat) => (
              <a
                key={cat}
                href="#"
                className="relative block rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src="https://source.unsplash.com/random/400x300/?product"
                  alt={cat}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{cat}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((t) => (
            <div
              key={t}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-600 mb-4">
                "Excelente experiencia, productos de calidad y entrega rápida.
                Sin duda volveré a comprar."
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={`https://randomuser.me/api/portraits/men/${t + 30}.jpg`}
                  alt="Cliente"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="text-gray-900 font-semibold">Cliente {t}</h4>
                  <span className="text-gray-500 text-sm">Comprador verificado</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-action final */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">No te pierdas nuestras ofertas</h2>
        <p className="mb-6">Recibe promociones exclusivas directamente en tu correo.</p>
        <form className="flex justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Ingresa tu correo"
            className="w-full px-4 py-3 rounded-lg text-gray-800"
          />
          <button className="bg-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-black transition">
            Suscribirme
          </button>
        </form>
      </section>
    </>
  )
}

export default Home
