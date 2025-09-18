import { useState } from "react";

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
  const [ ShowModalCamp, SetShowModalCamp ] = useState(false);

  function HandleNuevaCamp (){
    SetShowModalCamp(true);
  }

  function HandleCloseCamp () {
    SetShowModalCamp(false);
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Campañas de Email Marketing</h2>
        <button onClick={HandleNuevaCamp} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
          + Nueva Campaña
        </button>
      </div>

      {ShowModalCamp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            
            {/* Botón de cierre */}
            <button 
              onClick={HandleCloseCamp}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear nueva campaña</h2>
            <p className="text-gray-500 mb-6">
              Diseña y organiza campañas de marketing para aumentar tus ventas y atraer clientes.
            </p>

            {/* Formulario */}
            <form className="space-y-6">

              {/* Nombre de la campaña */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de la campaña</label>
                <input 
                  type="text"
                  placeholder="Ej. Regreso a clases 2025"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Objetivo de la campaña */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Objetivo</label>
                <textarea 
                  rows="2"
                  placeholder="Ej. Incrementar ventas de mochilas escolares..."
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                  <input 
                    type="date"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de fin</label>
                  <input 
                    type="date"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Público objetivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Público objetivo</label>
                <select 
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecciona el público...</option>
                  <option value="nuevos">Clientes nuevos</option>
                  <option value="recurrentes">Clientes recurrentes</option>
                  <option value="vip">Clientes VIP</option>
                  <option value="todos">Todos los clientes</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Define a quién quieres dirigir esta campaña. Una buena segmentación aumenta la efectividad.
                </p>
              </div>

              {/* Presupuesto */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Presupuesto estimado</label>
                <input 
                  type="number"
                  placeholder="Ej. 5000"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Opcional: establece cuánto planeas invertir en esta campaña.
                </p>
              </div>

              {/* Carga masiva CSV */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Productos incluidos (CSV)</label>
                <input 
                  type="file"
                  accept=".csv"
                  className="mt-1 w-full text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sube un archivo CSV con los SKUs de los productos que entran en esta campaña.
                </p>
                <button 
                  type="button"
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Descargar plantilla CSV
                </button>
              </div>

              {/* Banner principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Banner principal</label>
                <input 
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este banner se usará en la web o en correos promocionales.
                </p>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Crear campaña
                </button>
                <button 
                  type="button"
                  className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
                >
                  Guardar como borrador
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Podrás editar esta campaña en cualquier momento.
              </p>
            </form>
          </div>
        </div>

      )}

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
