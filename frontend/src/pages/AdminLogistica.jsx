import React from 'react';
import { MapPin } from 'lucide-react';

const enviosMock = [
  {
    id: 1,
    pedido: '#A12345',
    destinatario: 'Luis Pérez',
    direccion: 'Guadalajara, Jalisco',
    paqueteria: 'FedEx',
    sucursal: 'FedEx Guadalajara Centro',
    caja: 'Caja M - 30x30x30 cm',
    estatus: 'Pendiente de envío'
  },
  {
    id: 2,
    pedido: '#A12346',
    destinatario: 'Ana Ruiz',
    direccion: 'Monterrey, Nuevo León',
    paqueteria: 'DHL',
    sucursal: 'DHL Monterrey Av. Constitución',
    caja: 'Caja S - 20x20x20 cm',
    estatus: 'En tránsito'
  }
];

const AdminLogistica = () => {
  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gray-50">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Panel de Logística</h2>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all">
          Actualizar desde Skydropx
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-4">Pedido</th>
              <th className="text-left px-6 py-4">Destinatario</th>
              <th className="text-left px-6 py-4">Dirección</th>
              <th className="text-left px-6 py-4">Paquetería</th>
              <th className="text-left px-6 py-4">Sucursal Local</th>
              <th className="text-left px-6 py-4">Caja Sugerida</th>
              <th className="text-left px-6 py-4">Estatus</th>
              <th className="text-left px-6 py-4">Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {enviosMock.map((envio) => (
              <tr key={envio.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{envio.pedido}</td>
                <td className="px-6 py-4">{envio.destinatario}</td>
                <td className="px-6 py-4">{envio.direccion}</td>
                <td className="px-6 py-4">{envio.paqueteria}</td>
                <td className="px-6 py-4">{envio.sucursal}</td>
                <td className="px-6 py-4">{envio.caja}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      envio.estatus === 'Pendiente de envío'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {envio.estatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(envio.sucursal)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-100 text-green-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-green-200 transition-all"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Ver en mapa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enviosMock.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No hay envíos asignados aún.
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminLogistica;
