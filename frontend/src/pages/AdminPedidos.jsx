import React from 'react';

const AdminPedidos = () => {
  return (
    <section className="w-full mt-12 text-gray-900 bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Gestión de Pedidos</h2>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold mb-3">Filtros rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="border border-gray-300 rounded p-2 w-full">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En camino</option>
            <option>Entregado</option>
            <option>Cancelado</option>
          </select>
          <input type="date" className="border border-gray-300 rounded p-2 w-full" />
          <input type="text" placeholder="Buscar por ID de pedido o cliente" className="border border-gray-300 rounded p-2 w-full" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left py-3 px-4 border-b"># Pedido</th>
              <th className="text-left py-3 px-4 border-b">Cliente</th>
              <th className="text-left py-3 px-4 border-b">Fecha</th>
              <th className="text-left py-3 px-4 border-b">Estado</th>
              <th className="text-left py-3 px-4 border-b">Total</th>
              <th className="text-left py-3 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((pedido) => (
              <tr key={pedido} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">#000{pedido}</td>
                <td className="py-3 px-4 border-b">Juan Pérez</td>
                <td className="py-3 px-4 border-b">2025-08-04</td>
                <td className="py-3 px-4 border-b">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Entregado</span>
                </td>
                <td className="py-3 px-4 border-b">$1,250.00</td>
                <td className="py-3 px-4 border-b">
                  <button className="text-blue-600 hover:underline mr-2">Ver</button>
                  <button className="text-red-600 hover:underline">Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminPedidos;
