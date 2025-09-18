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
} from 'recharts';

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#6366F1', '#EC4899'];

const kpis = [
  { title: 'Top Selling Products', value: '$69,120', change: '+23%', color: 'text-green-600' },
  { title: 'Orders', value: '4,820', change: '+72%', color: 'text-green-600' },
  { title: 'Conversion Rate', value: '1.23%', change: '+02%', color: 'text-orange-500' },
  { title: 'Avg. Order Value', value: '$89.21', change: '+4.6%', color: 'text-green-600' },
];

const productsData = [
  { name: 'Shampoo A', value: 40 },
  { name: 'Seruth B', value: 10 },
  { name: 'Gel C', value: 80 },
  { name: 'Cream D', value: 10 },
];

const revenueData = [
  { mes: 'Jan', total: 300 },
  { mes: 'Feb', total: 350 },
  { mes: 'Mar', total: 480 },
  { mes: 'Apr', total: 400 },
  { mes: 'May', total: 420 },
  { mes: 'Jun', total: 260 },
  { mes: 'Jul', total: 500 },
  { mes: 'Aug', total: 450 },
  { mes: 'Sep', total: 460 },
  { mes: 'Oct', total: 470 },
  { mes: 'Nov', total: 550 },
  { mes: 'Dec', total: 620 },
];

const visitorsData = [
  { name: 'New Visitors', value: 400 },
  { name: 'Returning', value: 450 },
  { name: 'Ted Visitors', value: 150 },
  { name: 'Refunded', value: 220 },
];

const ordersStatus = [
  { name: 'Delivered', value: 600 },
  { name: 'Pending', value: 150 },
  { name: 'Cancelled', value: 60 },
];

const trafficData = [
  { name: 'Direct', value: 60 },
  { name: 'Search', value: 30 },
  { name: 'Other', value: 10 },
];

const AdminKPIDashboard = () => {
  return (
    <section className="w-full  text-gray-900 bg-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Altisys - Results</h2>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-gray-100 p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-1"
          >
            <span className="text-sm text-gray-500">{kpi.title}</span>
            <h3 className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</h3>
            <span className="text-xs text-green-600">{kpi.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Top Selling Products */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie dataKey="value" data={productsData} cx="50%" cy="50%" outerRadius={80} label>
                {productsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Graph */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Visitors */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Visitors</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visitorsData}>
              <Bar dataKey="value" fill="#6366F1" />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Status */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersStatus}>
              <Bar dataKey="value" fill="#10B981" />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Source */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Source</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie dataKey="value" data={trafficData} cx="50%" cy="50%" outerRadius={80} label>
                {trafficData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminKPIDashboard;
