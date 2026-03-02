import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  RefreshCw, 
  Search, 
  Filter,
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  ChevronRight,
  Eye,
  Edit,
  MoreVertical,
  Home,
  Building,
  Navigation,
  ExternalLink
} from 'lucide-react';

const AdminLogistica = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // "cards" o "table"

  const shipments = [
    {
      id: "LOG-001234",
      orderId: "ORD-001234",
      customer: "María González",
      email: "maria.g@email.com",
      destination: "Av. Reforma #456, Col. Centro, CDMX, CP 06000",
      carrier: "FedEx",
      branch: "FedEx Guadalajara Centro",
      branchAddress: "Av. Juárez 123, Centro, GDL",
      branchPhone: "33 1234 5678",
      suggestedBox: "Caja M - 30x30x30 cm",
      weight: "2.5 kg",
      dimensions: "30x30x30 cm",
      status: "pendiente",
      statusText: "Pendiente de envío",
      tracking: "GUIA123456789",
      estimatedDelivery: "2024-03-20",
      shippingCost: 250.00,
      insurance: 50.00,
      totalCost: 300.00,
      items: [
        { name: "Shampoo Pro Biotina", qty: 2 },
        { name: "Serum Facial", qty: 1 }
      ]
    },
    {
      id: "LOG-001235",
      orderId: "ORD-001235",
      customer: "Carlos Ruiz",
      email: "carlos.r@email.com",
      destination: "Calle Primavera #123, Col. Moderna, GDL, CP 44100",
      carrier: "DHL",
      branch: "DHL Monterrey Av. Constitución",
      branchAddress: "Av. Constitución 456, Monterrey",
      branchPhone: "81 2345 6789",
      suggestedBox: "Caja S - 20x20x20 cm",
      weight: "1.2 kg",
      dimensions: "20x20x20 cm",
      status: "en-transito",
      statusText: "En tránsito",
      tracking: "GUIA987654321",
      estimatedDelivery: "2024-03-18",
      shippingCost: 180.00,
      insurance: 30.00,
      totalCost: 210.00,
      items: [
        { name: "Audífonos Bluetooth", qty: 1 }
      ]
    },
    {
      id: "LOG-001236",
      orderId: "ORD-001236",
      customer: "Ana Martínez",
      email: "ana.m@email.com",
      destination: "Blvd. Universitario #789, San Pedro, MTY, CP 66260",
      carrier: "Estafeta",
      branch: "Estafeta Polanco",
      branchAddress: "Av. Moliere 321, Polanco, CDMX",
      branchPhone: "55 3456 7890",
      suggestedBox: "Caja L - 40x40x40 cm",
      weight: "4.0 kg",
      dimensions: "40x40x40 cm",
      status: "entregado",
      statusText: "Entregado",
      tracking: "GUIA456123789",
      estimatedDelivery: "2024-03-15",
      shippingCost: 320.00,
      insurance: 80.00,
      totalCost: 400.00,
      items: [
        { name: "Laptop Pro", qty: 1 },
        { name: "Mouse Inalámbrico", qty: 1 }
      ]
    },
    {
      id: "LOG-001237",
      orderId: "ORD-001237",
      customer: "Roberto Díaz",
      email: "roberto.d@email.com",
      destination: "Calle Central #321, Centro, PUE, CP 72000",
      carrier: "UPS",
      branch: "UPS Puebla Centro",
      branchAddress: "5 de Mayo 234, Puebla",
      branchPhone: "222 4567 8901",
      suggestedBox: "Caja M - 30x30x30 cm",
      weight: "2.8 kg",
      dimensions: "30x30x30 cm",
      status: "retrasado",
      statusText: "Retrasado",
      tracking: "GUIA789012345",
      estimatedDelivery: "2024-03-22",
      shippingCost: 210.00,
      insurance: 40.00,
      totalCost: 250.00,
      items: [
        { name: "Zapatos Deportivos", qty: 1 },
        { name: "Calcetines", qty: 2 }
      ]
    },
    {
      id: "LOG-001238",
      orderId: "ORD-001238",
      customer: "Laura Sánchez",
      email: "laura.s@email.com",
      destination: "Av. Insurgentes #567, Roma, CDMX, CP 06700",
      carrier: "Redpack",
      branch: "Redpack Condesa",
      branchAddress: "Av. Michoacán 890, Condesa",
      branchPhone: "55 5678 9012",
      suggestedBox: "Caja S - 20x20x20 cm",
      weight: "0.8 kg",
      dimensions: "20x20x20 cm",
      status: "cancelado",
      statusText: "Cancelado",
      tracking: "GUIA234567890",
      estimatedDelivery: "-",
      shippingCost: 150.00,
      insurance: 20.00,
      totalCost: 170.00,
      items: [
        { name: "Libros", qty: 3 }
      ]
    }
  ];

  const statusConfig = {
    pendiente: { 
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      icon: <Clock size={16} />
    },
    "en-transito": { 
      color: "bg-blue-500", 
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      icon: <Truck size={16} />
    },
    entregado: { 
      color: "bg-green-500", 
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      icon: <CheckCircle size={16} />
    },
    retrasado: { 
      color: "bg-red-500", 
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      icon: <AlertCircle size={16} />
    },
    cancelado: { 
      color: "bg-gray-500", 
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      icon: <AlertCircle size={16} />
    }
  };

  const carriers = [...new Set(shipments.map(s => s.carrier))];
  
  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pendiente').length,
    inTransit: shipments.filter(s => s.status === 'en-transito').length,
    delivered: shipments.filter(s => s.status === 'entregado').length,
    delayed: shipments.filter(s => s.status === 'retrasado').length,
    totalCost: shipments.reduce((sum, s) => sum + s.totalCost, 0)
  };

  const filteredShipments = shipments.filter(shipment => {
    if (selectedStatus !== "all" && shipment.status !== selectedStatus) return false;
    if (selectedCarrier !== "all" && shipment.carrier !== selectedCarrier) return false;
    if (searchTerm && !shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !shipment.tracking.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Panel de Logística
          </h1>
          <p className="text-gray-600 text-sm mt-1">Gestión de envíos y seguimiento</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
            <RefreshCw size={18} />
            Actualizar Skydropx
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Envíos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Truck className="text-blue-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl">
              <Clock className="text-yellow-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Tránsito</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className="text-green-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Entregados</p>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <CheckCircle className="text-emerald-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retrasados</p>
              <p className="text-2xl font-bold text-gray-900">{stats.delayed}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <AlertCircle className="text-red-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Costo Total</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalCost}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <DollarSign className="text-purple-600" size={22} />
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
                placeholder="Buscar por pedido, cliente o tracking..."
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
              <option value="pendiente">Pendiente</option>
              <option value="en-transito">En tránsito</option>
              <option value="entregado">Entregado</option>
              <option value="retrasado">Retrasado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            
            <select 
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
            >
              <option value="all">Todas las paqueterías</option>
              {carriers.map(carrier => (
                <option key={carrier} value={carrier}>{carrier}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
              <button 
                onClick={() => setViewMode("cards")}
                className={`p-2 rounded-lg ${viewMode === "cards" ? "bg-white shadow-sm" : "hover:bg-gray-100"}`}
              >
                <Package size={20} />
              </button>
              <button 
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg ${viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-gray-100"}`}
              >
                <BarChart3 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      {filteredShipments.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
            <Truck className="text-blue-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No hay envíos</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
            No se encontraron envíos con los filtros aplicados. Intenta con otros criterios de búsqueda.
          </p>
        </div>
      ) : viewMode === "cards" ? (
        // Vista Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              {/* Header con estado */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusConfig[shipment.status].color}`}></div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[shipment.status].bgColor} ${statusConfig[shipment.status].textColor}`}>
                      {statusConfig[shipment.status].icon}
                      {shipment.statusText}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Costo</div>
                    <div className="font-bold text-gray-900">${shipment.totalCost}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{shipment.orderId}</h3>
                    <p className="text-sm text-gray-600">{shipment.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Tracking</div>
                    <code className="text-sm font-mono text-blue-600">{shipment.tracking}</code>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Cliente */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Cliente</span>
                  </div>
                  <p className="font-medium text-gray-900">{shipment.customer}</p>
                  <p className="text-sm text-gray-600 truncate">{shipment.email}</p>
                </div>

                {/* Dirección */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Destino</span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{shipment.destination}</p>
                </div>

                {/* Información de envío */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Paquetería</div>
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{shipment.carrier}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Sucursal</div>
                    <p className="text-sm text-gray-700 truncate">{shipment.branch}</p>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Entrega Estimada</div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{shipment.estimatedDelivery}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Peso/Dimensión</div>
                    <p className="text-sm text-gray-700">{shipment.weight} / {shipment.dimensions}</p>
                  </div>
                </div>

                {/* Productos */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Productos ({shipment.items.length})</div>
                  <div className="space-y-1">
                    {shipment.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-gray-900 font-medium">x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(shipment.branchAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Navigation size={16} />
                    Mapa
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Eye size={16} />
                    Detalles
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Edit size={16} />
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Vista Tabla
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Pedido</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Cliente</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Destino</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Paquetería</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Sucursal</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Estado</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Costo</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-gray-900">{shipment.orderId}</div>
                        <div className="text-sm text-gray-600">Log: {shipment.id}</div>
                        <code className="text-xs font-mono text-blue-600">{shipment.tracking}</code>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{shipment.customer}</div>
                        <div className="text-sm text-gray-600 truncate max-w-[150px]">{shipment.email}</div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="max-w-[200px]">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 line-clamp-2">{shipment.destination}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-gray-500" />
                        <span className="font-medium text-gray-900">{shipment.carrier}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {shipment.weight} / {shipment.dimensions}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{shipment.branch}</div>
                        <div className="text-sm text-gray-600 truncate max-w-[150px]">{shipment.branchAddress}</div>
                        <div className="text-xs text-gray-500">{shipment.branchPhone}</div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusConfig[shipment.status].color}`}></div>
                        <span className="font-medium text-gray-900">{shipment.statusText}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {shipment.estimatedDelivery}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-bold text-gray-900">${shipment.totalCost}</div>
                        <div className="text-sm text-gray-600">
                          Envío: ${shipment.shippingCost}
                        </div>
                        <div className="text-xs text-gray-500">
                          Seguro: ${shipment.insurance}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(shipment.branchAddress)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
                          title="Ver en mapa"
                        >
                          <Navigation size={18} />
                        </a>
                        <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors" title="Detalles">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-colors" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors" title="Cancelar">
                          <AlertCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer con estadísticas */}
      {filteredShipments.length > 0 && (
        <div className="mt-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{filteredShipments.length}</span> de{' '}
              <span className="font-semibold text-gray-900">{shipments.length}</span> envíos
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Costo total filtrado: </span>
              <span className="font-bold text-gray-900">
                ${filteredShipments.reduce((sum, s) => sum + s.totalCost, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Home className="text-blue-600" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Sucursales Activas</h4>
              <p className="text-sm text-gray-600 mt-1">
                Tienes envíos distribuidos en <span className="font-bold text-gray-900">{carriers.length}</span> diferentes paqueterías
                y <span className="font-bold text-gray-900">{[...new Set(shipments.map(s => s.branch))].length}</span> sucursales.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Building className="text-emerald-600" size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Próximos Envíos</h4>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-bold text-gray-900">{stats.pending}</span> envíos pendientes de recolectar.
                Tiempo promedio de entrega: <span className="font-bold text-gray-900">3.2 días</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogistica;