import { useState, useEffect } from "react";
import clientAxios from "../config/axios";
import Spinner from "../components/Spinner";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  XCircle, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  CreditCard,
  MapPin,
  User,
  Calendar,
  DollarSign,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const AdminPedidos = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [openMenuOrderId, setOpenMenuOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrdersFromAPI = async () => {
    try{
      setLoading(true);
      const token = localStorage.getItem('ape_token');
      const response = await clientAxios.get('/Admin/GetOrders', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if(!response.data.data.ok) {
        console.error("Error fetching orders:", response.data.data.message);
      }

      // console.log("Fetched orders:", response.data.data.data);
      setOrders(response.data.data.data);

    }catch(error){
      console.error("Error fetching orders:", error);
    }finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    getOrdersFromAPI();
  }, []);


  const changeOrderStatus = async (orderId, newStatus) => {
    try {
      
      const order = {
        OrderId: orderId,
        Status : newStatus
      };

      const token = localStorage.getItem('ape_token');
      const response = await clientAxios.post('/ChangeOrderStatus', order,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setOrders(prev =>
        prev.map(order =>
          order.OrderId === orderId
            ? { ...order, status: newStatus, statusText: newStatus }
            : order
        )
      );

      setOpenMenuOrderId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const statusConfig = {
    entregado: { color: "bg-green-500", icon: <CheckCircle size={14} /> },
    delivered: { color: "bg-green-500", icon: <CheckCircle size={14} /> },
    "en-camino": { color: "bg-blue-500", icon: <Truck size={14} /> },
    shipped: { color: "bg-blue-500", icon: <Truck size={14} /> },
    processing: { color: "bg-blue-500", icon: <Package size={14} /> },
    procesando: { color: "bg-blue-500", icon: <Package size={14} /> },
    pendiente: { color: "bg-yellow-500", icon: <Clock size={14} /> },
    pending: { color: "bg-yellow-500", icon: <Clock size={14} /> },
    cancelado: { color: "bg-red-500", icon: <XCircle size={14} /> },
    cancelled: { color: "bg-red-500", icon: <XCircle size={14} /> },
    refunded: { color: "bg-red-500", icon: <DollarSign size={14} /> }
  };

  const paymentStatusConfig = {
    pagado: { color: "bg-green-100 text-green-800", text: "Pagado" },
    paid: { color: "bg-green-100 text-green-800", text: "paid" },
    pendiente: { color: "bg-yellow-100 text-yellow-800", text: "Pendiente" },
    reembolsado: { color: "bg-red-100 text-red-800", text: "Reembolsado" }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedStatus !== "all" && order.status !== selectedStatus) return false;
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.customer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: orders.length,
    entregados: orders.filter(o => o.status === 'entregado').length,
    enCamino: orders.filter(o => o.status === 'en-camino').length,
    pendientes: orders.filter(o => o.status === 'pendiente').length,
    ingresos: orders.reduce((sum, order) => sum + Number(order.total || 0),0)
  };

  if (loading) {
    return (
      <Spinner message="Consultando tus pedidos..."/>
    );
  }

  return (
    <section className="w-full text-gray-900 min-h-screen p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestión de Pedidos
          </h1>
          <p className="text-gray-600 text-sm mt-1">Administra y sigue todos los pedidos de tu tienda</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
            + Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="text-blue-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">${stats.ingresos.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <DollarSign className="text-green-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Entregados</p>
              <p className="text-2xl font-bold text-gray-900">{stats.entregados}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CheckCircle className="text-emerald-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Camino</p>
              <p className="text-2xl font-bold text-gray-900">{stats.enCamino}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <Truck className="text-amber-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendientes}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <Clock className="text-red-600" size={22} />
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
                placeholder="Buscar por ID de pedido, cliente o correo..."
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
              <option value="delivered">Entregado</option>
              <option value="shipped">En camino</option>
              <option value="pending">Pendiente</option>
              <option value="cancelled">Cancelado</option>
              <option value="processing">Procensando</option>
              <option value="refunded">Reembolsado</option>
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

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Pedido</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Cliente</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Estado</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Pago</th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Package size={14} />
                        {order.items} producto{order.items > 1 ? 's' : ''}
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-600">{order.email}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {order.address
                          ? `${order.address.street} ${order.address.streetNumber}, ${order.address.neighborhood}`.substring(0, 25)
                          : ''
                        }...
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} />
                      {order.date}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    {/* <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${statusConfig[order.status].color}`}></div>
                      <span className="font-medium text-gray-900">{order.statusText}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${statusConfig[order.status]?.color}`}></div>

                      <span className="flex items-center gap-1 text-gray-900 font-medium">
                        {statusConfig[order.status]?.icon}
                        {order.statusText}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Truck size={12} />
                        {order.method}
                      </div>
                      {order.tracking !== '-' && (
                        <div className="text-xs text-blue-600 font-mono mt-1">{order.tracking}</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">${order.total.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        <span>Envío: ${order.shipping.toLocaleString()}</span>
                        {order.discount > 0 && (
                          <span className="text-red-600 ml-2">Desc: -${order.discount.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{order.paymentMethod}</span>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2`}>
                      {paymentStatusConfig[order.paymentStatus].text}
                    </span>
                    {order.paid && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-700">Confirmado</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors" title="Ver detalles">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => changeOrderStatus(order.OrderId, "shipped")} className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-colors" title="Actualizar estado">
                        <Truck size={18} />
                      </button>
                      <button onClick={() => changeOrderStatus(order.OrderId, "cancelled")} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors" title="Cancelar pedido">
                        <XCircle size={18} />
                      </button>
                      {/* <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors">
                        <MoreVertical size={18} />
                      </button> */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuOrderId(
                              openMenuOrderId === order.id ? null : order.id
                            )
                          }
                          className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openMenuOrderId === order.id && (
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                            <button
                              onClick={() => changeOrderStatus(order.OrderId, "pending")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                            >
                              <Clock size={16} className="text-gray-500" />
                              Pendiente
                            </button>

                            <button
                              onClick={() => changeOrderStatus(order.OrderId, "processing")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                            >
                              <Package size={16} className="text-blue-500" />
                              Procesando
                            </button>

                            <button
                              onClick={() => changeOrderStatus(order.OrderId, "shipped")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                            >
                              <Truck size={16} className="text-indigo-500" />
                              En camino
                            </button>

                            <button
                              onClick={() => changeOrderStatus(order.OrderId, "delivered")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-green-50 text-green-700"
                            >
                              <CheckCircle size={16} className="text-green-600" />
                              Entregado
                            </button>

                            <button
                              onClick={() => changeOrderStatus(order.OrderId, "cancelled")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              <XCircle size={16} className="text-red-600" />
                              Cancelado
                            </button>

                            <button
                              onClick={() => changeOrderStatus(order.OrderId, "refunded")}
                              className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm hover:bg-yellow-50 text-yellow-700"
                            >
                              <DollarSign size={16} className="text-yellow-600" />
                              Reembolsado
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Mostrando {filteredOrders.length} de {orders.length} pedidos
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-medium">1</button>
              <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">2</button>
              <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">3</button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">8</button>
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <AlertCircle className="text-blue-600" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Pedidos pendientes</h4>
              <p className="text-sm text-gray-600">{stats.pendientes} requieren atención</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <Truck className="text-green-600" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Envíos hoy</h4>
              <p className="text-sm text-gray-600">{stats.enCamino} pedidos en tránsito</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-2xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="text-purple-600" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Ingresos del día</h4>
              <p className="text-sm text-gray-600">${(stats.ingresos * 0.3).toLocaleString()} estimado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPedidos;