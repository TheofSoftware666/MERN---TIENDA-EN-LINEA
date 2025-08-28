import React from 'react';

const productosMock = [
  {
    id: 1,
    nombre: 'Shampoo Orgánico',
    marca: 'Chenson',
    precio: 120.5,
    inventario: 3,
    categoria: 'Cabello',
    sku: 'SKU12345',
    promocion: true,
    descuento: 15,
    imagenes: [
      'https://via.placeholder.com/60x60?text=Img1',
      'https://via.placeholder.com/60x60?text=Img2'
    ]
  },
  {
    id: 2,
    nombre: 'Crema Facial Día & Noche',
    marca: 'Natura',
    precio: 89.9,
    inventario: 35,
    categoria: 'Cuidado de la piel',
    sku: 'SKU67890',
    promocion: false,
    descuento: 0,
    imagenes: []
  },
];

const AdminProductos = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 mt-10 min-h-screen bg-gray-50 pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Gestión de Productos</h2>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
          + Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosMock.map((producto) => (
          <div
            key={producto.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">{producto.marca} · {producto.categoria}</p>
              </div>

              {producto.promocion && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                  {producto.descuento}% OFF
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-4">
                {producto.imagenes.length > 0 ? (
                  producto.imagenes.slice(0, 2).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><strong>SKU:</strong> {producto.sku}</p>
              <p>
                <strong>Precio:</strong>{' '}
                <span className="text-blue-700 font-semibold">${producto.precio.toFixed(2)}</span>
              </p>
              <p>
                <strong>Inventario:</strong>{' '}
                <span className={producto.inventario < 5 ? 'text-red-600 font-semibold' : 'text-gray-800'}>
                  {producto.inventario} unidades
                </span>
              </p>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <button className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
              <button className="text-red-500 hover:underline text-sm font-medium">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {productosMock.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No hay productos disponibles.</div>
      )}
    </section>
  );
};

export default AdminProductos;
