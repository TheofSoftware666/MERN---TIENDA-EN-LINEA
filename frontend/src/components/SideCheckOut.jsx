import React from 'react'

const SideCheckOut = () => {
  return (
    <>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

  {/* Título */}
  <h1 className="text-2xl font-bold">🧾 Finalizar compra</h1>

  {/* Dirección de Envío */}
  <div className="bg-white p-4 sm:p-6 rounded shadow-sm border">
    <h2 className="text-lg font-semibold mb-4">📍 Dirección de envío</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input type="text" placeholder="Nombre completo" className="border px-4 py-2 rounded w-full" />
      <input type="text" placeholder="Teléfono" className="border px-4 py-2 rounded w-full" />
      <input type="email" placeholder="Correo electrónico" className="border px-4 py-2 rounded w-full" />
      <input type="text" placeholder="Código postal" className="border px-4 py-2 rounded w-full" />
      <input type="text" placeholder="Calle y número" className="border px-4 py-2 rounded w-full sm:col-span-2" />
      <input type="text" placeholder="Colonia" className="border px-4 py-2 rounded w-full" />
      <input type="text" placeholder="Ciudad" className="border px-4 py-2 rounded w-full" />
      <input type="text" placeholder="Estado" className="border px-4 py-2 rounded w-full" />
    </div>
  </div>

  {/* Método de Pago */}
  <div className="bg-white p-4 sm:p-6 rounded shadow-sm border">
  <h2 className="text-lg font-semibold mb-4">💳 Método de pago</h2>

  <div className="space-y-4">

    {/* Tarjeta de crédito / débito */}
    <div className="border rounded">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
        <label className="flex items-center gap-2">
          <input type="radio" name="pago" className="accent-black" />
          <span>Tarjeta de crédito / débito</span>
        </label>
        <span className="text-gray-500">💳</span>
      </div>
      <div className="hidden px-4 pb-4 space-y-4">
        <input type="text" placeholder="Nombre en la tarjeta" className="border px-4 py-2 rounded w-full" />
        <input type="text" placeholder="Número de tarjeta" className="border px-4 py-2 rounded w-full" />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="MM/AA" className="border px-4 py-2 rounded w-full" />
          <input type="text" placeholder="CVV" className="border px-4 py-2 rounded w-full" />
        </div>
      </div>
    </div>

    {/* Mercado Pago */}
    <div className="border rounded">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
        <label className="flex items-center gap-2">
          <input type="radio" name="pago" className="accent-black" />
          <span>Mercado Pago</span>
        </label>
        <span className="text-gray-500">💙</span>
      </div>
      <div className="hidden px-4 pb-4 text-sm text-gray-600">
        Serás redirigido a Mercado Pago para completar tu compra.
      </div>
    </div>

    {/* OXXO */}
    <div className="border rounded">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
        <label className="flex items-center gap-2">
          <input type="radio" name="pago" className="accent-black" />
          <span>OXXO</span>
        </label>
        <span className="text-gray-500">🧾</span>
      </div>
      <div className="hidden px-4 pb-4 text-sm text-gray-600">
        Recibirás una ficha de pago que puedes usar en cualquier tienda OXXO.
      </div>
    </div>

    {/* Apple Pay */}
    <div className="border rounded">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
        <label className="flex items-center gap-2">
          <input type="radio" name="pago" className="accent-black" />
          <span>Apple Pay</span>
        </label>
        <span className="text-gray-500">🍎</span>
      </div>
      <div className="hidden px-4 pb-4 text-sm text-gray-600">
        Solo disponible en dispositivos compatibles con Apple Pay.
      </div>
    </div>

    {/* Recoger en sucursal */}
    <div className="border rounded">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
        <label className="flex items-center gap-2">
          <input type="radio" name="pago" className="accent-black" />
          <span>Recoger en sucursal</span>
        </label>
        <span className="text-gray-500">🏬</span>
      </div>
      <div className="hidden px-4 pb-4 text-sm text-gray-600">
        Podrás recoger tu pedido en la sucursal seleccionada. Nos comunicaremos contigo cuando esté listo.
      </div>
    </div>

  </div>
</div>


  {/* Resumen del Pedido */}
  <div className="bg-white p-4 sm:p-6 rounded shadow-sm border">
    <h2 className="text-lg font-semibold mb-4">🛍️ Tu pedido</h2>

    <div className="space-y-3">
      <div className="flex justify-between items-center border-b pb-2">
        <p>Mochila Azul (x2)</p>
        <span>$400.00</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <p>Lonchera Negra (x1)</p>
        <span>$250.00</span>
      </div>
      <div className="flex justify-between text-sm pt-2">
        <span>Subtotal</span>
        <span>$650.00</span>
      </div>
      <div className="flex justify-between text-sm text-green-600">
        <span>Descuento</span>
        <span>− $50.00</span>
      </div>
      <div className="flex justify-between font-semibold text-base border-t pt-2">
        <span>Total</span>
        <span>$600.00</span>
      </div>
    </div>
  </div>

  {/* Confirmar Pedido */}
  <div className="text-center space-y-3">
    <p className="text-xs text-gray-500">🔒 Tus datos y pagos están protegidos y seguros.</p>
    <button className="bg-black hover:bg-gray-800 transition text-white font-semibold py-3 px-6 rounded text-lg w-full sm:w-auto">
      Confirmar pedido
    </button>
  </div>

</div>
    </>
  )
}

export default SideCheckOut