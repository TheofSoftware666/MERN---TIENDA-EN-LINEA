import React from 'react';

const cuponesMock = [
  {
    id: 1,
    codigo: 'BIENVENIDO10',
    descuento: '10%',
    tipo: 'Porcentaje',
    expiracion: '2025-09-01',
    estado: 'Activo'
  },
  {
    id: 2,
    codigo: 'ENVIOGRATIS',
    descuento: '100%',
    tipo: 'Envío',
    expiracion: '2025-07-30',
    estado: 'Expirado'
  },
];

const AdminCupones = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Gestión de Cupones</h2>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-medium">
          + Crear Cupón
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4">Código</th>
              <th className="text-left px-6 py-4">Descuento</th>
              <th className="text-left px-6 py-4">Tipo</th>
              <th className="text-left px-6 py-4">Expira</th>
              <th className="text-left px-6 py-4">Estado</th>
              <th className="text-left px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cuponesMock.map((cupon) => (
              <tr key={cupon.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{cupon.codigo}</td>
                <td className="px-6 py-4">{cupon.descuento}</td>
                <td className="px-6 py-4">{cupon.tipo}</td>
                <td className="px-6 py-4">{cupon.expiracion}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      cupon.estado === 'Activo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {cupon.estado}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">Editar</button>
                  <button className="text-red-600 hover:underline text-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cuponesMock.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No hay cupones creados aún.</div>
        )}
      </div>
    </section>
  );
};

export default AdminCupones;
