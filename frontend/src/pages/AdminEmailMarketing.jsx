import React from 'react';

const campañasMock = [
  {
    id: 1,
    asunto: '¡Lanzamiento de nueva colección!',
    estado: 'Enviada',
    fecha: '2025-08-01',
    aperturas: 56,
    clics: 18
  },
  {
    id: 2,
    asunto: '20% de descuento solo por hoy',
    estado: 'Borrador',
    fecha: null,
    aperturas: null,
    clics: null
  },
];

const AdminEmailMarketing = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Campañas de Email Marketing</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
          + Nueva Campaña
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {campañasMock.map((campaña) => (
          <div key={campaña.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-lg font-semibold mb-2">{campaña.asunto}</h3>

            <div className="mb-4 text-sm text-gray-600">
              <p>
                <strong>Estado: </strong>
                <span
                  className={`font-medium ${
                    campaña.estado === 'Enviada'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {campaña.estado}
                </span>
              </p>
              <p>
                <strong>Fecha: </strong>
                {campaña.fecha ? campaña.fecha : <span className="text-gray-400">Sin enviar</span>}
              </p>
            </div>

            {campaña.estado === 'Enviada' ? (
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Aperturas:</strong> {campaña.aperturas}</p>
                <p><strong>Clics:</strong> {campaña.clics}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Estadísticas disponibles después de enviar</p>
            )}

            <div className="mt-5 flex justify-between items-center">
              <button className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
              <button className="text-gray-500 hover:underline text-sm font-medium">Duplicar</button>
            </div>
          </div>
        ))}
      </div>

      {campañasMock.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No hay campañas creadas aún.</div>
      )}
    </section>
  );
};

export default AdminEmailMarketing;
