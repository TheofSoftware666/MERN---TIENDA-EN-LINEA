
const SideCarrito = () => {
  return (
    <>
       <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">🛒 Tu carrito</h2>
        <button className="text-gray-500 hover:text-black text-xl font-bold">×</button>
      </div>

      <div className="p-4 space-y-6 flex flex-col h-[calc(100%-64px)] justify-between">

        {/* Lista de productos */}
        <div className="space-y-4 overflow-y-auto max-h-[55vh] pr-2">
          
          {/* Producto 1 */}
          <div className="flex items-start gap-3 border-b pb-3">
            <img src="https://cdn.prod.website-files.com/60aec0444be46a4ded9aecb0/61a04ffaa7771e7453fd6279_portada-napoleon-hill-1.jpg" alt="Producto" className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Mochila Azul</p>
                  <p className="text-sm text-gray-500">Cantidad: 2</p>
                </div>
                <button className="text-sm text-red-500 hover:underline">Eliminar</button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-2 py-1 text-sm border rounded">−</button>
                <button className="px-2 py-1 text-sm border rounded">+</button>
              </div>
            </div>
            <span className="text-sm font-semibold">$400.00</span>
          </div>

          {/* Producto 2 */}
          <div className="flex items-start gap-3 border-b pb-3">
            <img src="https://cdn.prod.website-files.com/60aec0444be46a4ded9aecb0/61a04ffaa7771e7453fd6279_portada-napoleon-hill-1.jpg" alt="Producto" className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Lonchera Negra</p>
                  <p className="text-sm text-gray-500">Cantidad: 1</p>
                </div>
                <button className="text-sm text-red-500 hover:underline">Eliminar</button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-2 py-1 text-sm border rounded">−</button>
                <button className="px-2 py-1 text-sm border rounded">+</button>
              </div>
            </div>
            <span className="text-sm font-semibold">$250.00</span>
          </div>

          {/* Producto 3 */}
          <div className="flex items-start gap-3 border-b pb-3">
            <img src="https://cdn.prod.website-files.com/60aec0444be46a4ded9aecb0/61a04ffaa7771e7453fd6279_portada-napoleon-hill-1.jpg" alt="Producto" className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Lonchera Negra</p>
                  <p className="text-sm text-gray-500">Cantidad: 1</p>
                </div>
                <button className="text-sm text-red-500 hover:underline">Eliminar</button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-2 py-1 text-sm border rounded">−</button>
                <button className="px-2 py-1 text-sm border rounded">+</button>
              </div>
            </div>
            <span className="text-sm font-semibold">$250.00</span>
          </div>

          {/* Producto 4 */}
          <div className="flex items-start gap-3 border-b pb-3">
            <img src="https://cdn.prod.website-files.com/60aec0444be46a4ded9aecb0/61a04ffaa7771e7453fd6279_portada-napoleon-hill-1.jpg" alt="Producto" className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Lonchera Negra</p>
                  <p className="text-sm text-gray-500">Cantidad: 1</p>
                </div>
                <button className="text-sm text-red-500 hover:underline">Eliminar</button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-2 py-1 text-sm border rounded">−</button>
                <button className="px-2 py-1 text-sm border rounded">+</button>
              </div>
            </div>
            <span className="text-sm font-semibold">$250.00</span>
          </div>

          {/* Producto 5 */}
          <div className="flex items-start gap-3 border-b pb-3">
            <img src="https://cdn.prod.website-files.com/60aec0444be46a4ded9aecb0/61a04ffaa7771e7453fd6279_portada-napoleon-hill-1.jpg" alt="Producto" className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Lonchera Negra</p>
                  <p className="text-sm text-gray-500">Cantidad: 1</p>
                </div>
                <button className="text-sm text-red-500 hover:underline">Eliminar</button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-2 py-1 text-sm border rounded">−</button>
                <button className="px-2 py-1 text-sm border rounded">+</button>
              </div>
            </div>
            <span className="text-sm font-semibold">$250.00</span>
          </div>
        </div>

        {/* Resumen, cupón y acciones */}
        <div className="space-y-4 pt-4 border-t">

          {/* Cupón de descuento */}
          <div>
            <label className="text-sm font-medium block mb-1">Cupón de descuento</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ingresa tu cupón"
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-black transition">
                Aplicar
              </button>
            </div>
          </div>

          {/* Totales */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$650.00</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Descuento</span>
              <span>− $50.00</span>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>$600.00</span>
            </div>
          </div>

          {/* Botón de pago */}
          <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-semibold">
            Ir a pagar
          </button>

          {/* Mensaje de confianza */}
          <div className="text-xs text-gray-600 text-center">
            🔒 Pagos 100% seguros y protegidos
          </div>
        </div>
      </div>
        
    </>
  )
}

export default SideCarrito