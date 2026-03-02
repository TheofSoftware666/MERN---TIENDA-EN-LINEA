import react, { Fragment, useState, useEffect} from "react";
import Spinner from '../components/Spinner.jsx';
import clientAxios from '../config/axios';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Truck,
  Package,
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  CreditCard,
  MapPin,
  ArrowUpRight,
  Percent
} from "lucide-react";

const AdminDevoluciones = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const returns = [
  //   {
  //     id: "DEV-001234",
  //     customer: "María González",
  //     email: "maria.g@email.com",
  //     orderId: "ORD-001234",
  //     date: "2024-03-15",
  //     status: "completada",
  //     statusText: "Completada",
  //     reason: "Producto dañado",
  //     total: 1250.00,
  //     refunded: 1250.00,
  //     method: "Transferencia bancaria",
  //     tracking: "GUIA-RET123456",
  //     address: "Av. Reforma #456, CDMX",
  //     items: [
  //       { name: "Shampoo Pro Biotina", qty: 1, price: 450.00 },
  //       { name: "Serum Facial Vit C", qty: 1, price: 800.00 }
  //     ],
  //     notes: "Cliente reportó producto dañado al recibir",
  //     agent: "Carlos López",
  //     responseTime: "24 horas"
  //   },
  //   {
  //     id: "DEV-001235",
  //     customer: "Roberto Díaz",
  //     email: "roberto.d@email.com",
  //     orderId: "ORD-001237",
  //     date: "2024-03-14",
  //     status: "en-proceso",
  //     statusText: "En proceso",
  //     reason: "Talla incorrecta",
  //     total: 850.00,
  //     refunded: 850.00,
  //     method: "Tarjeta de crédito",
  //     tracking: "GUIA-RET789012",
  //     address: "Calle Central #321, PUE",
  //     items: [
  //       { name: "Camiseta Premium", qty: 1, price: 450.00 },
  //       { name: "Pantalón Clásico", qty: 1, price: 400.00 }
  //     ],
  //     notes: "Cliente solicitó cambio de talla",
  //     agent: "Ana Martínez",
  //     responseTime: "12 horas"
  //   },
  //   {
  //     id: "DEV-001236",
  //     customer: "Carlos Ruiz",
  //     email: "carlos.r@email.com",
  //     orderId: "ORD-001235",
  //     date: "2024-03-13",
  //     status: "pendiente",
  //     statusText: "Pendiente",
  //     reason: "Producto no recibido",
  //     total: 1380.00,
  //     refunded: 0.00,
  //     method: "Por definir",
  //     tracking: "GUIA-RET456789",
  //     address: "Calle Primavera #123, GDL",
  //     items: [
  //       { name: "Audífonos Bluetooth", qty: 1, price: 1200.00 },
  //       { name: "Cargador Inalámbrico", qty: 1, price: 180.00 }
  //     ],
  //     notes: "En espera de recepción del producto",
  //     agent: "Pedro Sánchez",
  //     responseTime: "48 horas"
  //   },
  //   {
  //     id: "DEV-001237",
  //     customer: "Ana Martínez",
  //     email: "ana.m@email.com",
  //     orderId: "ORD-001236",
  //     date: "2024-03-12",
  //     status: "rechazada",
  //     statusText: "Rechazada",
  //     reason: "Fuera de plazo",
  //     total: 950.00,
  //     refunded: 0.00,
  //     method: "N/A",
  //     tracking: "N/A",
  //     address: "Blvd. Universitario #789, MTY",
  //     items: [
  //       { name: "Libro - Marketing Digital", qty: 1, price: 950.00 }
  //     ],
  //     notes: "Devolución solicitada fuera del plazo de 30 días",
  //     agent: "Laura García",
  //     responseTime: "72 horas"
  //   },
  //   {
  //     id: "DEV-001238",
  //     customer: "Luis Fernández",
  //     email: "luis.f@email.com",
  //     orderId: "ORD-001238",
  //     date: "2024-03-11",
  //     status: "inspeccion",
  //     statusText: "En inspección",
  //     reason: "Producto diferente",
  //     total: 2200.00,
  //     refunded: 0.00,
  //     method: "Por definir",
  //     tracking: "GUIA-RET012345",
  //     address: "Av. Juárez #567, QRO",
  //     items: [
  //       { name: "Smartphone Pro", qty: 1, price: 2200.00 }
  //     ],
  //     notes: "Verificando estado del producto recibido",
  //     agent: "Miguel Ángel",
  //     responseTime: "36 horas"
  //   }
  // ];

    useEffect(() => {
    fetchReturns();
  }, []);

  const statusConfig = {
    completada: { 
      color: "bg-green-500", 
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      icon: <CheckCircle size={16} />
    },
    "en-proceso": { 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      icon: <Clock size={16} />
    },
    pendiente: { 
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      icon: <AlertCircle size={16} />
    },
    inspeccion: { 
      color: "bg-purple-500", 
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      icon: <Package size={16} />
    },
    rechazada: { 
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      icon: <XCircle size={16} />
    }
  };

  const statusMap = {
    PENDING: "pendiente",
    APPROVED: "en-proceso",
    COMPLETED: "completada",
    REJECTED: "rechazada",
    INSPECTION: "inspeccion"
  };

  const getStatusText = (status) => {
    const map = {
      PENDING: "Pendiente",
      APPROVED: "En proceso",
      COMPLETED: "Completada",
      REJECTED: "Rechazada",
      INSPECTION: "En inspección"
    };
    return map[status] || status;
  };

  const mapReturnFromApi = (r) => ({
    id: r.id,
    orderId: r.pedidoId,
    date: r.fecha,
    customer: r.cliente,
    email: r.email,
    status: statusMap[r.estado] || "pendiente",
    statusText: getStatusText(r.estado),
    reason: r.motivo,
    total: Number(r.montoTotal || 0),
    refunded: Number(r.montoReembolso || 0),
    method: r.metodoReembolso || "N/A",
    tracking: r.trackingDevolucion || "N/A",
    address: r.centroDevolucion || "N/A",
    notes: r.instrucciones || "",
    agent: "N/A",
    responseTime: "N/A",
    items: (
  typeof r.productosDetalle === "string"
    ? JSON.parse(r.productosDetalle)
    : r.productosDetalle || []
).map(item => ({
  name: item.name || item.nombre || "Producto",
  qty: Number(item.qty || item.cantidad || 0),
  price: Number(item.price || item.precio || item.precioUnitario || 0)
}))
  });


  const fetchReturns = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("ape_token");

      if (!token || token.length === 0) {
        setError("Token inválido");
        return;
      }

      const response = await clientAxios.get("/Admin/Returns", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = response.data.Success.results;
      // console.log("Respuesta del servidor:", data);
      const mappedData = data.map(mapReturnFromApi);

      setReturns(mappedData);

    } catch (error) {
      console.error("Error obteniendo devoluciones:", error);
      setError("No se pudieron cargar las devoluciones");
    } finally {
      setLoading(false);
    }
  };


  const stats = {
    total: returns.length,
    completadas: returns.filter(r => r.status === 'completada').length,
    enProceso: returns.filter(r => r.status === 'en-proceso').length,
    pendientes: returns.filter(r => r.status === 'pendiente').length,
    totalRefunded: returns.reduce((sum, ret) => sum + ret.refunded, 0),
    tasaDevolucion: "2.3%"
  };

  const filteredReturns = returns.filter(ret => {
    if (selectedStatus !== "all" && ret.status !== selectedStatus) return false;
    if (searchTerm && !ret.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !ret.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !ret.orderId.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <Spinner message="Consultando tus devoluciones..."/>
    );
  }

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestión de Devoluciones
          </h1>
          <p className="text-gray-600 text-sm mt-1">Administra solicitudes de devolución y reembolsos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
            + Nueva Devolución
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Devoluciones</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <RefreshCw className="text-blue-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reembolsado</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRefunded.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="text-green-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completadas}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CheckCircle className="text-emerald-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Proceso</p>
              <p className="text-2xl font-bold text-gray-900">{stats.enProceso}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <Clock className="text-amber-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasa Devolución</p>
              <p className="text-2xl font-bold text-gray-900">{stats.tasaDevolucion}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <Percent className="text-red-600" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por ID, cliente o pedido..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="completada">Completada</option>
              <option value="en-proceso">En proceso</option>
              <option value="pendiente">Pendiente</option>
              <option value="inspeccion">En inspección</option>
              <option value="rechazada">Rechazada</option>
            </select>
            
            <input 
              type="date" 
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
              <Filter size={18} />
              Más filtros
            </button>
          </div>
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Devolución</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Cliente</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Estado</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReturns.map((ret) => (
                <Fragment key={ret.id}>
                  <tr 
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === ret.id ? null : ret.id)}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-gray-900">{ret.id}</div>
                        <div className="text-sm text-gray-600">Pedido: {ret.orderId}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Package size={14} />
                          {ret.items.length} producto{ret.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{ret.customer}</div>
                        <div className="text-sm text-gray-600">{ret.email}</div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} />
                        {ret.date}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusConfig[ret.status].color}`}></div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[ret.status].bgColor} ${statusConfig[ret.status].textColor}`}>
                          {statusConfig[ret.status].icon}
                          {ret.statusText}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                          <AlertCircle size={12} />
                          {ret.reason}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className={`font-bold text-lg ${ret.refunded > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                          ${ret.total.toLocaleString()}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Reembolsado: </span>
                          <span className={`font-medium ${ret.refunded > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            ${ret.refunded.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Ver detalles
                          }}
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-colors">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors">
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Details */}
                  {expandedRow === ret.id && (
                    <tr>
                      <td colSpan="6" className="bg-gray-50/50">
                        <div className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Productos */}
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Package size={18} />
                                Productos Devueltos
                              </h4>
                              <div className="space-y-3">
                                {ret.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                                    <div>
                                      <p className="font-medium text-gray-900">{item.name}</p>
                                      <p className="text-sm text-gray-500">Cantidad: {item.qty}</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">${item.price.toLocaleString()}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Información */}
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <MessageSquare size={18} />
                                Información de Devolución
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm text-gray-600">Motivo</p>
                                  <p className="font-medium text-gray-900">{ret.reason}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Método de Reembolso</p>
                                  <p className="font-medium text-gray-900 flex items-center gap-2">
                                    <CreditCard size={16} />
                                    {ret.method}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Guía de Retorno</p>
                                  <p className="font-medium text-gray-900 font-mono text-sm">{ret.tracking}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Agente y Notas */}
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <User size={18} />
                                Seguimiento
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm text-gray-600">Agente Asignado</p>
                                  <p className="font-medium text-gray-900">{ret.agent}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Tiempo de Respuesta</p>
                                  <p className="font-medium text-gray-900">{ret.responseTime}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Dirección de Envío</p>
                                  <p className="font-medium text-gray-900 flex items-center gap-2">
                                    <MapPin size={16} />
                                    {ret.address}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Notas</p>
                                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{ret.notes}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Mostrando {filteredReturns.length} de {returns.length} devoluciones
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-medium">1</button>
              <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">2</button>
              <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">3</button>
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <ArrowUpRight className="text-blue-600" size={20} />
                Devoluciones Pendientes
              </h4>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendientes}</p>
              <p className="text-sm text-gray-600">Requieren atención inmediata</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Tiempo Promedio Resolución
              </h4>
              <p className="text-2xl font-bold text-gray-900 mt-2">2.4 días</p>
              <p className="text-sm text-gray-600">Desde solicitud a reembolso</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center gap=2">
                <AlertCircle className="text-amber-600" size={20} />
                Tasa de Devolución
              </h4>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.tasaDevolucion}</p>
              <p className="text-sm text-gray-600">Por debajo del promedio del sector (3.5%)</p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default AdminDevoluciones;