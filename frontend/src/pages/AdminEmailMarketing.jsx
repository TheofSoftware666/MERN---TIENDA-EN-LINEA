import { useState } from "react";
import {
  Mail,
  Target,
  Calendar,
  Users,
  DollarSign,
  Upload,
  FileText,
  Image as ImageIcon,
  Eye,
  MousePointer,
  Edit,
  Copy,
  Trash2,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Download,
  Plus
} from "lucide-react";

const campañasMock = [
  {
    id: 1,
    nombre: '¡Lanzamiento de nueva colección!',
    asunto: '¡Lanzamiento de nueva colección!',
    estado: 'Enviada',
    fechaInicio: '2025-08-01',
    fechaFin: '2025-08-31',
    aperturas: 156,
    clics: 42,
    tasaApertura: '38.4%',
    tasaClics: '10.2%',
    publico: 'todos',
    presupuesto: 5000,
    productos: 12
  },
  {
    id: 2,
    nombre: '20% de descuento solo por hoy',
    asunto: '20% de descuento solo por hoy',
    estado: 'Borrador',
    fechaInicio: null,
    fechaFin: null,
    aperturas: null,
    clics: null,
    tasaApertura: null,
    tasaClics: null,
    publico: 'recurrentes',
    presupuesto: 2500,
    productos: 8
  },
  {
    id: 3,
    nombre: 'Black Friday 2025',
    asunto: 'Black Friday 2025',
    estado: 'Programada',
    fechaInicio: '2025-11-29',
    fechaFin: '2025-11-29',
    aperturas: null,
    clics: null,
    tasaApertura: null,
    tasaClics: null,
    publico: 'todos',
    presupuesto: 10000,
    productos: 25
  },
];

const AdminEmailMarketing = () => {
  const [showModalCamp, setShowModalCamp] = useState(false);
  const [campañas, setCampañas] = useState(campañasMock);
  const [activeFilter, setActiveFilter] = useState('todas');

  const handleNuevaCamp = () => {
    setShowModalCamp(true);
  };

  const handleCloseCamp = () => {
    setShowModalCamp(false);
  };

  const handleSubmitCamp = (e) => {
    e.preventDefault();
    // Lógica para crear nueva campaña
    handleCloseCamp();
  };

  const handleDeleteCamp = (id) => {
    setCampañas(campañas.filter(camp => camp.id !== id));
  };

  const handleDuplicateCamp = (id) => {
    const original = campañas.find(camp => camp.id === id);
    const nuevaCamp = {
      ...original,
      id: Math.max(...campañas.map(c => c.id)) + 1,
      nombre: `${original.nombre} (Copia)`,
      estado: 'Borrador',
      aperturas: null,
      clics: null,
      tasaApertura: null,
      tasaClics: null
    };
    setCampañas([...campañas, nuevaCamp]);
  };

  const filteredCampañas = campañas.filter(camp => {
    if (activeFilter === 'todas') return true;
    if (activeFilter === 'enviadas') return camp.estado === 'Enviada';
    if (activeFilter === 'borradores') return camp.estado === 'Borrador';
    if (activeFilter === 'programadas') return camp.estado === 'Programada';
    return true;
  });

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Enviada': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Borrador': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Programada': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEstadoIcon = (estado) => {
    switch(estado) {
      case 'Enviada': return <CheckCircle size={16} />;
      case 'Borrador': return <Clock size={16} />;
      case 'Programada': return <Calendar size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Email Marketing
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Crea y gestiona campañas de email para tu ecommerce
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleNuevaCamp}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Nueva Campaña
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Campañas</p>
                <p className="text-2xl font-bold text-gray-900">{campañas.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tasa Apertura</p>
                <p className="text-2xl font-bold text-gray-900">38.4%</p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Eye className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tasa Clics</p>
                <p className="text-2xl font-bold text-gray-900">10.2%</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <MousePointer className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Enviadas</p>
                <p className="text-2xl font-bold text-gray-900">{campañas.filter(c => c.estado === 'Enviada').length}</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Send className="text-amber-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter('todas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'todas'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveFilter('enviadas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'enviadas'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Enviadas
          </button>
          <button
            onClick={() => setActiveFilter('borradores')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'borradores'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Borradores
          </button>
          <button
            onClick={() => setActiveFilter('programadas')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'programadas'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Programadas
          </button>
        </div>
      </div>

      {/* Grid de Campañas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampañas.map((campaña) => (
          <div key={campaña.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaña.nombre}</h3>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(campaña.estado)}`}>
                  {getEstadoIcon(campaña.estado)}
                  {campaña.estado}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDuplicateCamp(campaña.id)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Duplicar"
                >
                  <Copy size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteCamp(campaña.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target size={16} />
                <span>Asunto: <strong className="text-gray-900">{campaña.asunto}</strong></span>
              </div>
              
              {campaña.fechaInicio && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{campaña.fechaInicio} → {campaña.fechaFin}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>Público: {campaña.publico === 'todos' ? 'Todos los clientes' : 'Clientes recurrentes'}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign size={16} />
                <span>Presupuesto: ${campaña.presupuesto.toLocaleString()}</span>
              </div>
            </div>

            {campaña.estado === 'Enviada' ? (
              <div className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{campaña.aperturas}</div>
                    <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <Eye size={12} />
                      Aperturas
                    </div>
                    <div className="text-xs font-medium text-emerald-600 mt-1">{campaña.tasaApertura}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{campaña.clics}</div>
                    <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <MousePointer size={12} />
                      Clics
                    </div>
                    <div className="text-xs font-medium text-purple-600 mt-1">{campaña.tasaClics}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-lg border border-gray-200 text-center">
                <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Estadísticas disponibles después de enviar</p>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <Edit size={16} />
                  Editar
                </button>
                {campaña.estado === 'Borrador' && (
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg text-sm font-medium transition-all">
                    <Send size={16} className="inline mr-2" />
                    Programar envío
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCampañas.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay campañas</h3>
          <p className="text-gray-500 mb-6">Crea tu primera campaña de email marketing</p>
          <button 
            onClick={handleNuevaCamp}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all"
          >
            <Plus size={18} />
            Crear primera campaña
          </button>
        </div>
      )}

      {/* Modal Nueva Campaña */}
      {showModalCamp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Header del Modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Crear nueva campaña</h2>
                  <p className="text-sm text-gray-500">Diseña y organiza campañas de marketing para aumentar tus ventas</p>
                </div>
                <button 
                  onClick={handleCloseCamp}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="text-gray-400 hover:text-gray-600" size={24} />
                </button>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmitCamp} className="p-6">
              <div className="space-y-6">
                {/* Nombre de la campaña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      Nombre de la campaña
                    </span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Ej. Regreso a clases 2025"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Asunto del email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asunto del email</label>
                  <input 
                    type="text"
                    placeholder="Ej. ¡Oferta especial solo para ti!"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Objetivo de la campaña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Target size={16} />
                      Objetivo
                    </span>
                  </label>
                  <textarea 
                    rows="3"
                    placeholder="Describe el objetivo principal de esta campaña..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        Fecha de inicio
                      </span>
                    </label>
                    <input 
                      type="date"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        Fecha de fin
                      </span>
                    </label>
                    <input 
                      type="date"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Público objetivo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Users size={16} />
                      Público objetivo
                    </span>
                  </label>
                  <select 
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue=""
                  >
                    <option value="">Selecciona el público...</option>
                    <option value="nuevos">Clientes nuevos</option>
                    <option value="recurrentes">Clientes recurrentes</option>
                    <option value="vip">Clientes VIP</option>
                    <option value="todos">Todos los clientes</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Define a quién quieres dirigir esta campaña. Una buena segmentación aumenta la efectividad.
                  </p>
                </div>

                {/* Presupuesto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <DollarSign size={16} />
                      Presupuesto estimado
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number"
                      placeholder="5000"
                      className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Opcional: establece cuánto planeas invertir en esta campaña.
                  </p>
                </div>

                {/* Carga masiva CSV */}
                <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl border border-blue-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <FileText size={16} />
                      Productos incluidos (CSV)
                    </span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Arrastra tu archivo CSV o haz clic para seleccionar</p>
                    <input 
                      type="file"
                      accept=".csv"
                      id="csv-upload"
                      className="hidden"
                    />
                    <label
                      htmlFor="csv-upload"
                      className="inline-block bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    >
                      Seleccionar archivo
                    </label>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-500">
                      Sube un archivo CSV con los SKUs de los productos que entran en esta campaña.
                    </p>
                    <button 
                      type="button"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Download size={14} />
                      Plantilla CSV
                    </button>
                  </div>
                </div>

                {/* Banner principal */}
                <div className="bg-gradient-to-r from-purple-50 to-transparent p-4 rounded-xl border border-purple-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <ImageIcon size={16} />
                      Banner principal
                    </span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Arrastra tu imagen o haz clic para seleccionar</p>
                    <input 
                      type="file"
                      accept="image/*"
                      id="banner-upload"
                      className="hidden"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="inline-block bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    >
                      Seleccionar imagen
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Este banner se usará en la web o en correos promocionales. Recomendado: 1200x400px
                  </p>
                </div>
              </div>

              {/* Botones del Modal */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-6 px-6 py-4 mt-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Crear y programar campaña
                  </button>
                  
                  <button 
                    type="button"
                    onClick={handleCloseCamp}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Podrás editar esta campaña en cualquier momento desde el panel.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminEmailMarketing;