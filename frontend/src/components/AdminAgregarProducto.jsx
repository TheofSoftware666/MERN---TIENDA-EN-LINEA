import React from 'react';

const AdminAddProducto = () => {
  return (
    <>
      {/* Encabezado del modal */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800">Agregar Nuevo Producto</h2>
        <p className="text-gray-500 mt-2 text-base">
          Completa la información del producto para mostrarlo en tu tienda y aumentar tus ventas.
        </p>
      </div>

      {/* Formulario de Producto */}
      <form className="bg-gray-50 p-6 md:p-10 rounded-xl shadow-lg border border-gray-200 max-w-5xl mx-auto space-y-8 mb-16">

        {/* Datos principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre del Producto <span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Ej: Shampoo Orgánico" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Marca</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Ej: Chenson" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Precio <span className="text-red-500">*</span></label>
            <input type="number" step="0.01" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="$0.00" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Inventario</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Cantidad disponible" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Categoría</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500">
              <option>Selecciona una categoría</option>
              <option>Cabello</option>
              <option>Cuidado de la piel</option>
              <option>Accesorios</option>
              <option>Otros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">SKU</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="SKU12345" />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-1">Descripción del Producto</label>
          <textarea className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500" placeholder="Describe el producto detalladamente..." />
          <p className="text-xs text-gray-500 mt-1">Tip: usa beneficios y diferenciales, no solo características.</p>
        </div>

        {/* Promoción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">¿Producto en Promoción?</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500">
              <option>No</option>
              <option>Sí</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Descuento (%)</label>
            <input type="number" step="0.01" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Ej: 10" />
          </div>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-semibold mb-1">Imágenes del Producto</label>
          <input type="file" multiple className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500" />
          <p className="text-xs text-gray-500 mt-1">Puedes subir varias imágenes (JPG, PNG, WEBP). Las imágenes de buena calidad aumentan la conversión.</p>
        </div>

        {/* FAQs */}
        <div>
          <label className="block text-sm font-semibold mb-1">Preguntas Frecuentes (FAQs)</label>
          <textarea className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-blue-500" placeholder="Ej: ¿Es apto para todo tipo de piel? ¿Es vegano?..." />
          <p className="text-xs text-gray-500 mt-1">Agregar FAQs reduce dudas y genera más confianza en la compra.</p>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors duration-300"
          >
            Guardar Producto
          </button>
        </div>
      </form>

      {/* Extras: Agregar Categoría y Marca */}
      <div className="bg-white max-w-3xl mx-auto border border-gray-200 shadow-md rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la Categoría</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500" placeholder="Ej: Cuidado Facial" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Guardar Categoría
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white max-w-3xl mx-auto border border-gray-200 shadow-md rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Agregar Nueva Marca</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la Marca</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500" placeholder="Ej: L'Oréal, Natura, etc." />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Guardar Marca
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAddProducto;
