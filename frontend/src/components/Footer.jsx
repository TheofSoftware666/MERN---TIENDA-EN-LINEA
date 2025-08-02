import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="bg-gray-900 text-white px-6 sm:px-12 py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

    {/* 1. Logo y descripción */}
    <div>
      <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
      <p className="text-gray-400 text-sm">
        TuEcommerce es una tienda en línea comprometida con brindar los mejores productos, atención al cliente y envíos seguros a todo México.
      </p>
    </div>

    {/* 2. Contacto */}
    <div className="flex flex-col">
      <h4 className="font-bold mb-2">📞 Contacto</h4>
      <div className="h-1 w-10 bg-blue-500 mb-3 rounded"></div>
      <a className="text-gray-400 hover:text-white hover:underline" href="tel:+523320525516">+52 33 2052 5516</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="mailto:ventas@tuecommerce.com">ventas@tuecommerce.com</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="mailto:contacto@tuecommerce.com">contacto@tuecommerce.com</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">¿Tienes una duda?</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">WhatsApp</a>
    </div>

    {/* 3. Métodos de pago */}
    <div className="flex flex-col">
      <h4 className="font-bold mb-2">💳 Métodos de Pago</h4>
      <div className="h-1 w-10 bg-indigo-400 mb-3 rounded"></div>
      <div className="flex flex-wrap gap-3">
        <img src="/icons/visa.png" alt="Visa" className="h-6" />
        <img src="/icons/mastercard.png" alt="MasterCard" className="h-6" />
        <img src="/icons/paypal.png" alt="PayPal" className="h-6" />
        <img src="/icons/oxxo.png" alt="Oxxo" className="h-6" />
        <img src="/icons/mercadopago.png" alt="MercadoPago" className="h-6" />
      </div>
      <p className="text-sm text-gray-400 mt-2">Pagos 100% seguros</p>
    </div>

    {/* 4. Categorías */}
    <div className="flex flex-col">
      <h4 className="font-bold mb-2">🛍️ Categorías</h4>
      <div className="h-1 w-10 bg-pink-400 mb-3 rounded"></div>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">Productos</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">Promociones</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">Lo más vendido</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">Marcas</a>
    </div>

    {/* 5. Redes sociales */}
    <div className="flex flex-col">
      <h4 className="font-bold mb-2">🌐 Redes Sociales</h4>
      <div className="h-1 w-10 bg-green-400 mb-3 rounded"></div>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">Facebook</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">Instagram</a>
      <a className="text-gray-400 hover:text-white hover:underline" href="#">YouTube</a>
    </div>
  </div>

  <div className="mt-10 border-t border-gray-700 pt-6 text-center">
    <p className="text-gray-500 text-sm">
      Sitio Web elaborado por <a className="font-bold hover:text-white hover:underline" href="#">© Building Technology</a> para la empresa <a className="font-bold hover:text-white hover:underline" href="#">tuEcommerce.com</a>
    </p>
  </div>
</footer>




    </>
  )
}

export default Footer;