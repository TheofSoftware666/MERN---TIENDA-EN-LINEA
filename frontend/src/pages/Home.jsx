import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/axios.jsx";
import Carousel from "../components/Carousel.jsx"

import {
  FaStar,
  FaBolt,
  FaFire,
  FaCheck,
  FaCartShopping
} from "react-icons/fa6";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // const token = localStorage.getItem("ape_tokens")
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
      const response = await clientAxios.get("/ProductosTop");
      
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

      setProductos(adaptados || []);
    } catch (ex) {
      console.error("Error:", ex);
      
    } finally {
      //setLoading(false);
    }
  };

  return (
    <>
      {/* Hero con CTA principal */}
      <section className="relative w-full h-[500px] bg-gray-900 text-white flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1761839257661-c2392c65ea72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    {productos.map((p) => (
      <div
                    key={p.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-gray-100 hover:border-blue-200 flex flex-col relative"
                  >
                    <Link to={`/Producto/${p.id}`}>
                      <img
                        src={import.meta.env.VITE_BACKEND_URL_IMAGENES + p.img}
                        alt={p.Name}
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

                      <button onClick={() => handleAddToCart(p.id)} className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow hover:shadow-lg text-[12px] sm:text-sm">
                        <FaCartShopping /> Agregar
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
                  src="https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
