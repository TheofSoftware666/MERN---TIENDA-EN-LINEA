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

const COLORS = ['#60A5FA', '#F87171', '#34D399', '#FBBF24', '#A78BFA', '#F472B6'];

const productosMasVendidos = [
  { name: 'Shampoo A', value: 120 },
  { name: 'Suero B', value: 98 },
  { name: 'Gel C', value: 80 },
  { name: 'Crema D', value: 60 },
];

const visitasPorProducto = [
  { name: 'ID 101', visitas: 1500 },
  { name: 'ID 102', visitas: 1200 },
  { name: 'ID 103', visitas: 900 },
  { name: 'ID 104', visitas: 750 },
];

const pedidosPorEstatus = [
  { name: 'Entregado', cantidad: 140 },
  { name: 'En camino', cantidad: 60 },
  { name: 'Pendiente', cantidad: 30 },
  { name: 'Cancelado', cantidad: 10 },
];

const comprasUsuarios = [
  { name: 'Clientes con cuenta', compras: 180 },
  { name: 'Usuarios sin cuenta', compras: 95 },
];

const ventasPorMes = [
  { mes: 'Ene', total: 45000 },
  { mes: 'Feb', total: 52000 },
  { mes: 'Mar', total: 61000 },
  { mes: 'Abr', total: 48000 },
  { mes: 'May', total: 70000 },
  { mes: 'Jun', total: 67500 },
];


const AdminDashBoard = () => {
  return (
    <>
      <section className="w-full mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Análisis del Ecommerce</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {/* Total ventas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-start">
          <span className="text-sm text-gray-500">Ventas totales del mes</span>
          <h3 className="text-3xl font-bold text-green-600 mt-2">$67,500.00</h3>
        </div>

        {/* Total pedidos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-start">
          <span className="text-sm text-gray-500">Pedidos procesados</span>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">240</h3>
        </div>

        {/* Total devoluciones */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-start">
          <span className="text-sm text-gray-500">Total devoluciones</span>
          <h3 className="text-3xl font-bold text-red-500 mt-2">15</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Productos más vendidos */}
        <div className="bg-white p-5 shadow-sm rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top productos más vendidos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productosMasVendidos}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {productosMasVendidos.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Visitas por producto */}
        <div className="bg-white p-5 shadow-sm rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Visitas por producto</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visitasPorProducto}>
              <Bar dataKey="visitas" fill="#60A5FA" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pedidos por estatus */}
        <div className="bg-white p-5 shadow-sm rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Pedidos por estatus</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pedidosPorEstatus}>
              <Bar dataKey="cantidad" fill="#34D399" />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compras por tipo de usuario */}
        <div className="bg-white p-5 shadow-sm rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tipo de comprador</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={comprasUsuarios}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="compras"
                label
              >
                {comprasUsuarios.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Ventas por mes */}
        <div className="bg-white p-5 shadow-sm rounded-lg border border-gray-200 md:col-span-2 xl:col-span-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Historial de ventas por mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ventasPorMes}>
              <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={3} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
    </>
  )
}

export default AdminDashBoard