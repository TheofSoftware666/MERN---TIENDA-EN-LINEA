

const CardProducto = () => {
  return (
    <>
        <div class="max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 group">
            <div class="relative">
                <img src="http://localhost:3001/uploads/JavaScript.png" alt="iPhone 15 Pro Max" class="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div class="absolute top-2 left-2 bg-red-500 text-gray-100 text-xs font-semibold px-2 py-1 rounded-md">🔥 Hasta 15% OFF • ¡Quedan 3!</div>
                <div class="absolute top-2 right-2 flex space-x-2">
                </div>
            </div>
            <div class="p-4 space-y-2">
                <h3 class="text-base font-medium text-gray-800">Apple iPhone 15 Pro Max, 256GB, Blue Titanium</h3>
                <div class="flex items-center space-x-1 text-yellow-500 text-sm">
                <span>★ ★ ★ ★ ★</span>
                <span class="text-gray-500 text-xs">(1,233)</span>
                </div>
                <div class="flex gap-2 text-xs text-gray-600">
                <span class="bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-md">⭐ Best Seller</span>
                <span class="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-md">💰 Mejor Precio</span>
                <span class="bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-md">🚚 Envío Gratis</span>
                </div>
                <div class="flex items-end justify-between mt-2">
                <div>
                    <div class="text-2xl font-bold text-gray-800">$1,199</div>
                    <div class="text-sm text-gray-400 line-through">$1,399</div>
                </div>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                    <div className="flex flex-col align-middle items-center">
                        <img src="" alt="" />    
                    </div> Agregar a la bolsa </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CardProducto