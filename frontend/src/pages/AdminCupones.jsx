import { useState } from "react";
import {
  Tag,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Copy,
  Eye,
  BarChart3,
  Calendar,
  Users,
  Percent,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Shield
} from "lucide-react";

const AdminCupones = () => {
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // "cards" o "table"

  const coupons = [
    {
      id: "CUP-001234",
      code: "BIENVENIDO20",
      description: "Descuento de bienvenida para nuevos clientes",
      discount: 20,
      type: "percent",
      typeText: "Porcentaje",
      minPurchase: 500,
      maxUses: 1000,
      usedCount: 342,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      statusText: "Activo",
      totalSavings: 12500,
      lastUsed: "2024-03-15",
      createdBy: "Admin Principal"
    },
    {
      id: "CUP-001235",
      code: "ENVIOGRATIS",
      description: "Envío gratis en compras mayores a $800",
      discount: 100,
      type: "shipping",
      typeText: "Envío Gratis",
      minPurchase: 800,
      maxUses: 500,
      usedCount: 189,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      status: "active",
      statusText: "Activo",
      totalSavings: 9450,
      lastUsed: "2024-03-14",
      createdBy: "Marketing Team"
    },
    {
      id: "CUP-001236",
      code: "SUMMER25",
      description: "Promoción de verano 25% de descuento",
      discount: 25,
      type: "percent",
      typeText: "Porcentaje",
      minPurchase: 1000,
      maxUses: 200,
      usedCount: 198,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "scheduled",
      statusText: "Programado",
      totalSavings: 0,
      lastUsed: "-",
      createdBy: "Marketing Team"
    },
    {
      id: "CUP-001237",
      code: "BLACK50",
      description: "Black Friday 50% de descuento",
      discount: 50,
      type: "percent",
      typeText: "Porcentaje",
      minPurchase: 0,
      maxUses: 100,
      usedCount: 100,
      startDate: "2023-11-24",
      endDate: "2023-11-24",
      status: "expired",
      statusText: "Expirado",
      totalSavings: 25000,
      lastUsed: "2023-11-24",
      createdBy: "Admin Principal"
    },
    {
      id: "CUP-001238",
      code: "REFERIDO15",
      description: "Cupón para clientes referidos",
      discount: 15,
      type: "percent",
      typeText: "Porcentaje",
      minPurchase: 300,
      maxUses: 999,
      usedCount: 45,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "active",
      statusText: "Activo",
      totalSavings: 1350,
      lastUsed: "2024-03-10",
      createdBy: "Sistema"
    },
    {
      id: "CUP-001239",
      code: "FLASH100",
      description: "$100 de descuento flash sale",
      discount: 100,
      type: "fixed",
      typeText: "Monto Fijo",
      minPurchase: 500,
      maxUses: 50,
      usedCount: 50,
      startDate: "2024-02-15",
      endDate: "2024-02-16",
      status: "exhausted",
      statusText: "Agotado",
      totalSavings: 5000,
      lastUsed: "2024-02-16",
      createdBy: "Promociones"
    },
    {
      id: "CUP-001240",
      code: "LOYALTY10",
      description: "Cupón lealtad clientes frecuentes",
      discount: 10,
      type: "percent",
      typeText: "Porcentaje",
      minPurchase: 200,
      maxUses: 9999,
      usedCount: 678,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      statusText: "Activo",
      totalSavings: 6780,
      lastUsed: "2024-03-15",
      createdBy: "CRM"
    },
    {
      id: "CUP-001241",
      code: "ERROR500",
      description: "Cupón de compensación por errores",
      discount: 500,
      type: "fixed",
      typeText: "Monto Fijo",
      minPurchase: 1000,
      maxUses: 10,
      usedCount: 3,
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      status: "inactive",
      statusText: "Inactivo",
      totalSavings: 1500,
      lastUsed: "2024-03-05",
      createdBy: "Soporte"
    }
  ];

  const statusConfig = {
    active: {
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      icon: <CheckCircle size={16} />
    },
    scheduled: {
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      icon: <Clock size={16} />
    },
    expired: {
      color: "bg-gray-500",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      icon: <Calendar size={16} />
    },
    exhausted: {
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      icon: <AlertCircle size={16} />
    },
    inactive: {
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      icon: <Shield size={16} />
    }
  };

  const typeConfig = {
    percent: { icon: <Percent size={16} />, color: "text-purple-600", bgColor: "bg-purple-100" },
    fixed: { icon: <DollarSign size={16} />, color: "text-emerald-600", bgColor: "bg-emerald-100" },
    shipping: { icon: <Tag size={16} />, color: "text-blue-600", bgColor: "bg-blue-100" }
  };

  const stats = {
    total: coupons.length,
    active: coupons.filter(c => c.status === 'active').length,
    totalSavings: coupons.reduce((sum, c) => sum + c.totalSavings, 0),
    totalUses: coupons.reduce((sum, c) => sum + c.usedCount, 0),
    redemptionRate: "12.5%",
    avgDiscount: coupons.reduce((sum, c) => sum + c.discount, 0) / coupons.length
  };

  const filteredCoupons = coupons.filter(coupon => {
    if (selectedStatus !== "all" && coupon.status !== selectedStatus) return false;
    if (selectedType !== "all" && coupon.type !== selectedType) return false;
    if (searchTerm && !coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !coupon.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // Aquí podrías agregar un toast de confirmación
  };

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestión de Cupones
          </h1>
          <p className="text-gray-600 text-sm mt-1">Crea y administra promociones para tus clientes</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button 
            onClick={() => setShowAddCoupon(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            Nuevo Cupón
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cupones</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Tag className="text-blue-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle className="text-green-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Ahorrado</p>
              <p className="text-2xl font-bold text-gray-900">${(stats.totalSavings / 1000).toFixed(1)}k</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <DollarSign className="text-purple-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usos Totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUses}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <Users className="text-amber-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasa Redención</p>
              <p className="text-2xl font-bold text-gray-900">{stats.redemptionRate}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <TrendingUp className="text-red-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Desc. Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgDiscount.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-cyan-50 rounded-xl">
              <Percent className="text-cyan-600" size={22} />
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
                placeholder="Buscar por código o descripción..."
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
              <option value="active">Activo</option>
              <option value="scheduled">Programado</option>
              <option value="expired">Expirado</option>
              <option value="exhausted">Agotado</option>
              <option value="inactive">Inactivo</option>
            </select>
            
            <select 
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="percent">Porcentaje</option>
              <option value="fixed">Monto fijo</option>
              <option value="shipping">Envío gratis</option>
            </select>
            
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
              <button 
                onClick={() => setViewMode("cards")}
                className={`p-2 rounded-lg ${viewMode === "cards" ? "bg-white shadow-sm" : "hover:bg-gray-100"}`}
              >
                <Tag size={20} />
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
      {filteredCoupons.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-6">
            <Tag className="text-emerald-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No hay cupones</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
            No se encontraron cupones con los filtros aplicados. Crea tu primer cupón para comenzar.
          </p>
          <button 
            onClick={() => setShowAddCoupon(true)}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            Crear Primer Cupón
          </button>
        </div>
      ) : viewMode === "cards" ? (
        // Vista Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              {/* Header con código y descuento */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 ${typeConfig[coupon.type].bgColor} rounded-lg`}>
                    <div className={typeConfig[coupon.type].color}>
                      {typeConfig[coupon.type].icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Usos</div>
                    <div className="font-bold text-gray-900">
                      {coupon.usedCount}/{coupon.maxUses}
                    </div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">{coupon.code}</h3>
                    <div className="text-xl font-bold text-emerald-600">
                      {coupon.type === 'percent' ? `${coupon.discount}%` : `$${coupon.discount}`}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{coupon.description}</p>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Estado y tipo */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[coupon.status].bgColor} ${statusConfig[coupon.status].textColor}`}>
                    {statusConfig[coupon.status].icon}
                    {coupon.statusText}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{coupon.typeText}</span>
                </div>

                {/* Fechas */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Inicio:</span>
                    <span className="font-medium text-gray-900">{coupon.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Fin:</span>
                    <span className="font-medium text-gray-900">{coupon.endDate}</span>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="space-y-3 mb-4">
                  {coupon.minPurchase > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-600">Mínimo compra: </span>
                      <span className="font-medium text-gray-900">${coupon.minPurchase}</span>
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="text-gray-600">Ahorro total: </span>
                    <span className="font-medium text-emerald-600">${coupon.totalSavings}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Último uso: </span>
                    <span className="font-medium text-gray-900">{coupon.lastUsed}</span>
                  </div>
                </div>

                {/* Barra de uso */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Uso del cupón</span>
                    <span>{Math.round((coupon.usedCount / coupon.maxUses) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        (coupon.usedCount / coupon.maxUses) > 0.9 ? "bg-red-500" :
                        (coupon.usedCount / coupon.maxUses) > 0.7 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min((coupon.usedCount / coupon.maxUses) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleCopyCode(coupon.code)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Copy size={16} />
                    Copiar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Eye size={16} />
                    Ver
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
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
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Código</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Descripción</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Descuento</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Tipo</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Vigencia</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Estado</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Uso</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-bold text-gray-900">{coupon.code}</div>
                        <div className="text-xs text-gray-600">ID: {coupon.id}</div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="max-w-[200px]">
                        <p className="text-sm text-gray-700 line-clamp-2">{coupon.description}</p>
                        {coupon.minPurchase > 0 && (
                          <p className="text-xs text-gray-500 mt-1">Mínimo: ${coupon.minPurchase}</p>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {coupon.type === 'percent' ? (
                          <Percent size={16} className="text-purple-600" />
                        ) : (
                          <DollarSign size={16} className="text-emerald-600" />
                        )}
                        <span className="font-bold text-gray-900">
                          {coupon.type === 'percent' ? `${coupon.discount}%` : `$${coupon.discount}`}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                        coupon.type === 'percent' ? 'bg-purple-100 text-purple-800' :
                        coupon.type === 'fixed' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {coupon.typeText}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{coupon.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{coupon.endDate}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusConfig[coupon.status].color}`}></div>
                        <span className={`font-medium ${statusConfig[coupon.status].textColor}`}>
                          {coupon.statusText}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-bold text-gray-900">
                          {coupon.usedCount}/{coupon.maxUses}
                        </div>
                        <div className="text-xs text-gray-600">
                          {Math.round((coupon.usedCount / coupon.maxUses) * 100)}% utilizado
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className={`h-1.5 rounded-full ${
                              (coupon.usedCount / coupon.maxUses) > 0.9 ? "bg-red-500" :
                              (coupon.usedCount / coupon.maxUses) > 0.7 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min((coupon.usedCount / coupon.maxUses) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleCopyCode(coupon.code)}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
                          title="Copiar código"
                        >
                          <Copy size={18} />
                        </button>
                        <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors" title="Ver detalles">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors" title="Eliminar">
                          <Trash2 size={18} />
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
      {filteredCoupons.length > 0 && (
        <div className="mt-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{filteredCoupons.length}</span> de{' '}
              <span className="font-semibold text-gray-900">{coupons.length}</span> cupones
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Ahorro total filtrado: </span>
              <span className="font-bold text-gray-900">
                ${filteredCoupons.reduce((sum, c) => sum + c.totalSavings, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Cupón - Mejorado */}
      {showAddCoupon && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Cupón</h2>
                  <p className="text-sm text-gray-600">Configura una nueva promoción para tus clientes</p>
                </div>
                <button 
                  onClick={() => setShowAddCoupon(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={24} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna izquierda - Información básica */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Código del cupón *</label>
                    <input 
                      type="text"
                      placeholder="BIENVENIDO25"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Los clientes usarán este código en el checkout
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea 
                      placeholder="Describe el propósito de este cupón..."
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de descuento *</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button type="button" className="p-4 border-2 border-purple-300 bg-purple-50 rounded-xl text-center hover:border-purple-500 transition-colors">
                        <Percent className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Porcentaje</span>
                      </button>
                      <button type="button" className="p-4 border-2 border-emerald-300 bg-emerald-50 rounded-xl text-center hover:border-emerald-500 transition-colors">
                        <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Monto fijo</span>
                      </button>
                      <button type="button" className="p-4 border-2 border-blue-300 bg-blue-50 rounded-xl text-center hover:border-blue-500 transition-colors">
                        <Tag className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-900">Envío gratis</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Columna derecha - Configuración */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valor del descuento *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Percent className="text-gray-400" size={20} />
                      </div>
                      <input 
                        type="number"
                        placeholder="25"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha inicio</label>
                      <input 
                        type="date"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha fin</label>
                      <input 
                        type="date"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Límite de usos</label>
                    <input 
                      type="number"
                      placeholder="1000"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monto mínimo de compra</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="text-gray-400" size={20} />
                      </div>
                      <input 
                        type="number"
                        placeholder="500"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  Crear Cupón
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddCoupon(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminCupones;