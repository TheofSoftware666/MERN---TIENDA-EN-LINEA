import { useState } from "react";

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
  const [ AgregarCupon, setAgregarCupon ] = useState(false);

  function HandleAgregarCupon () {
    setAgregarCupon(true);
  }

  function HandleCloseCupon() {
    setAgregarCupon(false);
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Gestión de Cupones</h2>
        <button onClick={HandleAgregarCupon} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all font-medium">
          + Crear Cupón
        </button>
      </div>

      {AgregarCupon && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            
            {/* Botón de cierre */}
            <button 
              onClick={HandleCloseCupon}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear nuevo cupón</h2>
            <p className="text-gray-500 mb-6">
              Diseña y administra cupones de descuento para tus clientes.
            </p>

            {/* Formulario */}
            <form className="space-y-6">

              {/* Código del cupón */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Código del cupón</label>
                <input 
                  type="text"
                  placeholder="Ej. REGRESO10"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Este es el código que el cliente deberá ingresar en su compra.
                </p>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <input 
                  type="text"
                  placeholder="Ej. Descuento de regreso a clases"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Tipo de descuento */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de descuento</label>
                <select 
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Selecciona tipo...</option>
                  <option value="percent">Porcentaje (%)</option>
                  <option value="fixed">Monto fijo ($)</option>
                </select>
              </div>

              {/* Valor del descuento */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor del descuento</label>
                <input 
                  type="number"
                  placeholder="Ej. 10"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
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

              {/* Uso máximo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Uso máximo</label>
                <input 
                  type="number"
                  placeholder="Ej. 100"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Número máximo de veces que este cupón puede ser utilizado.
                </p>
              </div>

              {/* Monto mínimo opcional */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Monto mínimo de compra (opcional)</label>
                <input 
                  type="number"
                  placeholder="Ej. 500"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Crear cupón
                </button>
                <button 
                  type="button"
                  className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
                >
                  Guardar como borrador
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Podrás editar este cupón en cualquier momento.
              </p>
            </form>
          </div>
        </div>

      )}

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
