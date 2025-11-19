import { useEffect, useState } from 'react';
import axios from 'axios';
import {
//   FaShoppingCart,
  // FaCheckCircle,
  // FaHandsHelping,
  // FaChevronDown,
  FaCartShopping,
  FaTruckFast,
  FaCcVisa,
  FaCcStripe,
  FaCcMastercard,
  FaApplePay,
  FaCcPaypal,
} from 'react-icons/fa6';

const ProductoDetalle = ({ productoId }) => {
   const [producto, setProducto] = useState({});
  

   useEffect(() => {

    console.log("Producto ID:", productoId);
    if (!productoId) return;

    const fetchProducto = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/tienda/api/Productos/${productoId}`);
        setProducto(res.data.data);
        console.log(res.data.data)
      } catch (err) {
        console.log(err.response?.data?.error || err.message);
      } 
    };

    fetchProducto();
  }, [productoId]);
    
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-start gap-8">

      {/* Imagen del producto */}
      <div className="w-full md:w-1/2 aspect-[4/5] bg-white rounded-lg overflow-hidden shadow-md">
        <img
          src="https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/hds/hds94959/l/24.jpg"
          alt="Producto"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Detalles del producto */}
      <div className="w-full md:w-1/2 flex flex-col gap-5">

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900">{producto?.Producto?.NombreProducto}</h1>

      {/* Descripción */}
      <p className="text-lg text-gray-600 line-clamp-3">
        {producto?.Producto?.Descripcion || "Descripción breve del producto para captar la atención del cliente."}
      </p>

      {/* Stock y precio */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-green-600">
          Disponible: {producto?.Producto?.Disponible}
        </span>

        {/* Precio con descuento si aplica */}
        {producto?.Producto?.Descuento > 0 ? (
          <>
            {/* Precio final con descuento */}
            <span className="text-2xl font-bold text-gray-900">
              $ { (producto?.Producto?.Precio * (1 - producto?.Producto?.Descuento / 100)).toFixed(2) }
            </span>

            {/* Precio original tachado */}
            <span className="text-base line-through text-red-500">
              $ { (producto?.Producto?.Precio).toFixed(2) }
            </span>

            {/* Texto de ahorro */}
            <span className="text-sm text-red-600 font-semibold">
              ¡Ahorra {producto?.Producto?.Descuento}% en tu compra!
            </span>
          </>
        ) : (
          <>
            {/* Solo precio normal */}
            <span className="text-2xl font-bold text-gray-900">
              ${ producto?.Producto?.Precio }
            </span>
          </>
        )}
      </div>


      {/* Selección de tallas (ropa) */}
      {producto?.Variantes?.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-gray-800">Variantes:</label>
          <div className="flex gap-2 flex-wrap">
            {producto.Variantes.map((v) => (
              <button
                key={v.VarianteId}
                className="border border-gray-300 px-4 py-2 rounded hover:border-black text-sm"
              >
                {v.Nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selección de color (ropa) */}
      {producto?.Variantes?.some((v) => v.ColorHex && v.ColorHex.trim() !== "") && (
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-gray-800">Color:</label>
          <div className="flex gap-3">
            {producto.Variantes.filter((v) => v.ColorHex && v.ColorHex.trim() !== "").map((v) => (
              <span
                key={v.VarianteId}
                className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: v.ColorHex }}
                title={v.Nombre}
              ></span>
            ))}
          </div>
        </div>
)}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <a
          href="#"
          className="w-full sm:w-auto px-6 py-3 border bg-[#FCD34D] hover:bg-yellow-200 text-black rounded-md text-center transition flex items-center justify-center gap-2"
        >
          <FaCartShopping className="text-lg" /> Añadir al carrito
        </a>
        <a
          href="#"
          className="w-full sm:w-auto px-6 py-3 bg-[#1A73E8] hover:bg-[#1AA3E8] text-white rounded-md text-center  transition"
        >
          Comprar ahora
        </a>
      </div>

      {/* Beneficios / Envío */}
      <div className="flex flex-col gap-2 text-green-700 text-sm italic mt-4">
        <div className="flex items-center gap-2">
          <FaTruckFast className="text-base" /> Llega mañana
        </div>
        <div>Envío gratis en pedidos mayores a $900.00</div>
      </div>

      {/* Métodos de pago */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-center gap-4 p-2">
      <div className="bg-white text-[#1A1F71] text-3xl rounded-lg px-4 py-3 shadow-sm border border-gray-200">
        <FaCcVisa />
      </div>
      <div className="bg-white text-[#635BFF] text-3xl rounded-lg px-4 py-3 shadow-sm border border-gray-200">
        <FaCcStripe />
      </div>
      <div className="bg-white text-[#EB001B] text-3xl rounded-lg px-4 py-3 shadow-sm border border-gray-200">
        <FaCcMastercard />
      </div>
      <div className="bg-white text-black text-3xl rounded-lg px-4 py-3 shadow-sm border border-gray-200">
        <FaApplePay />
      </div>
      <div className="bg-white text-[#003087] text-3xl rounded-lg px-4 py-3 shadow-sm border border-gray-200">
        <FaCcPaypal />
      </div>
    </div>

      <p className="text-center text-sm text-gray-500 mt-2">
          Compra segura y protegida en todo momento
        </p>
      </div>

      {/* Garantía y confianza */}
      <div className="mt-4 text-sm text-gray-600">
        <ul className="list-disc list-inside">
          <li>Garantía de satisfacción o reembolso</li>
          <li>Soporte en línea 24/7</li>
          <li>Entrega rápida y segura</li>
        </ul>
      </div>
    </div>
  </div>

    {/* Sección de Descripción del producto */}
  <section className="w-full max-w-5xl mx-auto px-4 py-12 border-t border-gray-200 mt-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Descripción de {producto?.Producto?.NombreProducto}
    </h2>

    <div
      className="text-gray-700 space-y-5 leading-relaxed text-base"
      dangerouslySetInnerHTML={{ __html: producto?.Producto?.Descripcion || "Sin descripción disponible" }}
    />
  </section>

  {/* Preguntas & Respuestas */}
  {producto?.Faqs?.length > 0 && (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 border-t border-gray-200 mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Preguntas frecuentes
      </h2>

      <div className="space-y-4">
        {producto.Faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <h3 className="text-md font-semibold text-gray-800 flex justify-between items-center">
              {faq.Pregunta}
              <span className="text-gray-500">▼</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {faq.Respuesta}
            </p>
          </div>
        ))}
      </div>
    </section>
  )}



</section>
  )
}

export default ProductoDetalle