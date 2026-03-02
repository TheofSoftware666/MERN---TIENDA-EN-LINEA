import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  RefreshCw,
  ArrowUpRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target
} from 'lucide-react';

const AdminKPIDashboard = () => {
  // KPI Cards Data
  const kpis = [
    { 
      title: 'Ingresos Totales', 
      value: '$89,450', 
      change: '+23.5%', 
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      title: 'Total Pedidos', 
      value: '4,820', 
      change: '+72%', 
      trend: 'up',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Tasa de Conversión', 
      value: '3.65%', 
      change: '+1.8%', 
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Valor Promedio Pedido', 
      value: '$148.75', 
      change: '+12.4%', 
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    { 
      title: 'Visitantes Únicos', 
      value: '32.5K', 
      change: '+18.2%', 
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    { 
      title: 'Tasa de Reembolso', 
      value: '2.3%', 
      change: '-0.8%', 
      trend: 'down',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
  ];

  // Product Performance Data
  const productsData = [
    { name: 'Shampoo Pro Biotina', value: 85000, sales: 420, growth: '+34%' },
    { name: 'Serum Facial Vit C', value: 62000, sales: 310, growth: '+28%' },
    { name: 'Gel Fijador Premium', value: 45000, sales: 280, growth: '+15%' },
    { name: 'Crema Hidratante 24h', value: 38000, sales: 190, growth: '+22%' },
    { name: 'Aceite Capilar', value: 29000, sales: 150, growth: '+12%' },
  ];

  // Revenue Data
  const revenueData = [
    { mes: 'Ene', total: 42000, target: 38000 },
    { mes: 'Feb', total: 45000, target: 40000 },
    { mes: 'Mar', total: 52000, target: 42000 },
    { mes: 'Abr', total: 48000, target: 44000 },
    { mes: 'May', total: 62000, target: 48000 },
    { mes: 'Jun', total: 58000, target: 50000 },
    { mes: 'Jul', total: 72000, target: 55000 },
    { mes: 'Ago', total: 68000, target: 58000 },
    { mes: 'Sep', total: 75000, target: 62000 },
    { mes: 'Oct', total: 82000, target: 65000 },
    { mes: 'Nov', total: 89000, target: 70000 },
    { mes: 'Dic', total: 114000, target: 80000 },
  ];

  // Visitors Data
  const visitorsData = [
    { name: 'Nuevos', value: 12000, color: '#3B82F6' },
    { name: 'Recurrentes', value: 8500, color: '#10B981' },
    { name: 'Abandonan', value: 4500, color: '#F59E0B' },
    { name: 'Conversión', value: 3200, color: '#8B5CF6' },
  ];

  // Orders Status Data
  const ordersStatus = [
    { name: 'Entregado', value: 3850, color: '#10B981' },
    { name: 'En Proceso', value: 620, color: '#3B82F6' },
    { name: 'Pendiente', value: 280, color: '#F59E0B' },
    { name: 'Cancelado', value: 70, color: '#EF4444' },
  ];

  // Traffic Sources Data
  const trafficData = [
    { name: 'Búsqueda Orgánica', value: 42, color: '#3B82F6' },
    { name: 'Redes Sociales', value: 28, color: '#EC4899' },
    { name: 'Email Marketing', value: 18, color: '#10B981' },
    { name: 'Directo', value: 12, color: '#F59E0B' },
  ];

  // Device Distribution
  const deviceData = [
    { name: 'Mobile', value: 65, color: '#8B5CF6' },
    { name: 'Desktop', value: 28, color: '#3B82F6' },
    { name: 'Tablet', value: 7, color: '#10B981' },
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('$') ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard de Métricas
          </h1>
          <p className="text-gray-600 text-sm mt-1">Rendimiento general de tu e-commerce</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm">
            <option>Últimos 30 días</option>
            <option>Últimos 7 días</option>
            <option>Este mes</option>
            <option>Este año</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
            <RefreshCw size={18} />
            Actualizar Datos
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 ${kpi.bgColor} rounded-xl`}>
                <div className={kpi.iconColor}>{kpi.icon}</div>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                kpi.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {kpi.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm text-gray-600">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2 xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity size={20} />
                Tendencia de Ingresos
              </h3>
              <p className="text-sm text-gray-600">Evolución mensual vs objetivo</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Objetivo</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="mes" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${(value/1000)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3B82F6" 
                fill="url(#colorTotal)" 
                strokeWidth={2}
                fillOpacity={0.2}
                name="Ingresos Real"
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#9ca3af" 
                fill="transparent" 
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Objetivo"
              />
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 size={20} />
                Productos Top
              </h3>
              <p className="text-sm text-gray-600">Por volumen de ventas</p>
            </div>
          </div>
          <div className="space-y-4">
            {productsData.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    i === 0 ? 'bg-blue-50 text-blue-600' :
                    i === 1 ? 'bg-emerald-50 text-emerald-600' :
                    i === 2 ? 'bg-amber-50 text-amber-600' :
                    i === 3 ? 'bg-purple-50 text-purple-600' :
                    'bg-pink-50 text-pink-600'
                  }`}>
                    <span className="font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} ventas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${product.value.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${
                    product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <PieChartIcon size={20} />
                Fuentes de Tráfico
              </h3>
              <p className="text-sm text-gray-600">Distribución por origen</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {trafficData.map((source, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                <span className="text-sm text-gray-700">{source.name}</span>
                <span className="text-sm font-semibold text-gray-900 ml-auto">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package size={20} />
                Estado de Pedidos
              </h3>
              <p className="text-sm text-gray-600">Distribución actual</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip formatter={(value) => [value, 'Pedidos']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {ordersStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {ordersStatus.map((status, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                  <span className="text-sm text-gray-700">{status.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{status.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visitors Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users size={20} />
                Comportamiento Visitantes
              </h3>
              <p className="text-sm text-gray-600">Análisis de audiencia</p>
            </div>
          </div>
          <div className="space-y-4">
            {visitorsData.map((visitor, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{visitor.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{visitor.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(visitor.value / 12000) * 100}%`,
                      backgroundColor: visitor.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Tasa de Conversión</p>
                <p className="text-2xl font-bold text-gray-900">3.65%</p>
              </div>
              <ArrowUpRight className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <ShoppingCart className="text-blue-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ventas Hoy</p>
              <p className="text-2xl font-bold text-gray-900">$8,450</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">+42% vs ayer</p>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Eye className="text-emerald-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Visitantes Activos</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">En tiempo real</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Target className="text-purple-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Objetivo Mensual</p>
              <p className="text-2xl font-bold text-gray-900">89%</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full" style={{ width: '89%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminKPIDashboard;