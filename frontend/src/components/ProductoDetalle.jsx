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

const ProductoDetalle = () => {
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
      <h1 className="text-3xl font-bold text-gray-900">Shampoo Anticaída</h1>

      {/* Descripción */}
      <p className="text-lg text-gray-600">
        Kit de limpieza personal para dama. Incluye un shampoo anticaída y un suero reconstructor de regalo.
      </p>

      {/* Stock y precio */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-green-600">Disponible: 15 piezas</span>
        <span className="text-2xl font-bold text-gray-900">$999.00</span>
        <span className="text-base line-through text-red-500">$1,299.00</span>
        <span className="text-sm text-red-600 font-semibold">¡Ahorra 23% en tu compra!</span>
      </div>

      {/* Selección de tallas (ropa) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-800">Talla:</label>
        <div className="flex gap-2">
          <button className="border border-gray-300 px-4 py-2 rounded hover:border-black text-sm">S</button>
          <button className="border border-gray-300 px-4 py-2 rounded hover:border-black text-sm">M</button>
          <button className="border border-gray-300 px-4 py-2 rounded hover:border-black text-sm">L</button>
          <button className="border border-gray-300 px-4 py-2 rounded hover:border-black text-sm">XL</button>
        </div>
      </div>

      {/* Selección de color (ropa) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-800">Color:</label>
        <div className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-black border-2 border-gray-300"></span>
          <span className="w-6 h-6 rounded-full bg-blue-600 border-2 border-gray-300"></span>
          <span className="w-6 h-6 rounded-full bg-pink-500 border-2 border-gray-300"></span>
          <span className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-300"></span>
        </div>
      </div>

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

  {/* Seccion de Descripcion del producto */}  
    <section className="w-full max-w-5xl mx-auto px-4 py-12 border-t border-gray-200 mt-8">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
    Descripción del producto
  </h2>

  <div className="text-gray-700 space-y-5 leading-relaxed text-base">
    <p>
      El <strong>Shampoo Anticaída con Suero Reconstructor</strong> ha sido diseñado para quienes buscan un tratamiento efectivo y diario contra la caída del cabello. Su fórmula especializada actúa directamente en la raíz, fortaleciendo el folículo y estimulando el crecimiento natural.
    </p>

    <p>
      Gracias a su combinación de ingredientes activos como la biotina, cafeína y extractos botánicos, este shampoo no solo detiene la caída, sino que también mejora el brillo, la textura y el volumen del cabello desde las primeras aplicaciones.
    </p>

    <p>
      El suero incluido como regalo complementa el tratamiento, nutriendo profundamente el cuero cabelludo y reparando zonas debilitadas. Este kit es ideal para uso en mujeres y hombres, libre de sulfatos y formulado para todo tipo de cabello, incluso el teñido.
    </p>

    <p>
      Dermatológicamente probado. Producto vegano. No probado en animales.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <ul className="list-disc pl-5 space-y-2">
        <li>Contenido: 1 Shampoo (350 ml) + 1 Suero Reconstructor (100 ml)</li>
        <li>Aroma suave, textura ligera, fácil enjuague</li>
        <li>Ideal para uso diario</li>
        <li>Conserva el color en cabellos teñidos</li>
      </ul>

      <ul className="list-disc pl-5 space-y-2">
        <li>Origen: Hecho en México 🇲🇽</li>
        <li>100% libre de parabenos y siliconas</li>
        <li>Con activos de origen natural</li>
        <li>Incluye instructivo de uso</li>
      </ul>
    </div>
  </div>
</section>

{/* Preguntas & Respuestas */}

<section className="w-full max-w-5xl mx-auto px-4 py-12 border-t border-gray-200 mt-8">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
    Preguntas frecuentes
  </h2>

  <div className="space-y-4">

    {/* Pregunta 1 */}
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-800 flex justify-between items-center">
        ¿Cuánto tiempo tarda en llegar mi pedido?
        <span className="text-gray-500">▼</span>
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        El tiempo estimado de entrega es de 1 a 3 días hábiles. Si estás en una zona metropolitana, podrías recibirlo incluso al día siguiente.
      </p>
    </div>

    {/* Pregunta 2 */}
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-800 flex justify-between items-center">
        ¿Qué pasa si no me gusta el producto?
        <span className="text-gray-500">▼</span>
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        No te preocupes, ofrecemos devoluciones 100% gratuitas en un plazo de 15 días. Queremos que compres sin riesgo.
      </p>
    </div>

    {/* Pregunta 3 */}
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-800 flex justify-between items-center">
        ¿El producto es original?
        <span className="text-gray-500">▼</span>
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        Sí, todos nuestros productos son originales y adquiridos directamente de fabricantes autorizados.
      </p>
    </div>

    {/* Pregunta 4 */}
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-md font-semibold text-gray-800 flex justify-between items-center">
        ¿Puedo pagar contra entrega?
        <span className="text-gray-500">▼</span>
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        Actualmente no ofrecemos pago contra entrega, pero puedes pagar con tarjetas, transferencias o PayPal de forma segura.
      </p>
    </div>

  </div>
</section>


</section>
  )
}

export default ProductoDetalle