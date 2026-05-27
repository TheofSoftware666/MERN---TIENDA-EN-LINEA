import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';

import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  RefreshCw,
  Eye,
  Search,
  Calendar,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  ShoppingBag,
  ChevronRight,
  Star,
  AlertCircle,
  DollarSign
} from 'lucide-react';

const UserPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter(pedido => {
    const coincideBusqueda =
      pedido.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(busqueda.toLowerCase());

    if (filtroEstado === 'todos') return coincideBusqueda;
    return coincideBusqueda && pedido.estado === filtroEstado;
  });

  useEffect(() => {
    getOrderByUserId();
  }, []);

  const getOrderByUserId = async () => {
    try {
      const token = localStorage.getItem('ape_token');

      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }

      const response = await clientAxios.get(`/Pedidos`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.data.data.ok) {
        console.log('Error al obtener los pedidos: ', response.data.data.message);
        return [];
      }

      if (!response.data.data.data || response.data.data.data.length === 0) {
        console.log('No se encontraron pedidos para el usuario.');
        return [];
      }

      const pedidosNormalizados = response.data.data.data.map(p => ({
        ...p,
        total: Number(p.total),
        productos: Number(p.productos),
        estado:
          p.estado === 'processing' ? 'procesando' :
          p.estado === 'shipped' ? 'en_camino' :
          p.estado === 'delivered' ? 'entregado' :
          p.estado,
        direccionTexto: p.direccion
          ? `${p.direccion.street ?? ''}, ${p.direccion.city ?? ''}, ${p.direccion.state ?? ''}, ${p.direccion.postalCode ?? 'CP: N/D'}`
          : 'No disponible',
        telefono: p.telefono ?? p.direccion?.phone ?? 'No disponible',
        productosDetalle: Array.isArray(p.productosDetalle) ? p.productosDetalle : []
      }));

      setPedidos(pedidosNormalizados);
      return response.data.data.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Función para obtener detalles del estado (adaptado a colores cosméticos)
  const getEstadoInfo = (estado) => {
    switch (estado) {
      case 'entregado':
        return {
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: <CheckCircle size={16} />,
          texto: 'Entregado',
          bgIcon: 'bg-emerald-50'
        };
      case 'en_camino':
        return {
          color: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: <Truck size={16} />,
          texto: 'En camino',
          bgIcon: 'bg-rose-50'
        };
      case 'procesando':
        return {
          color: 'bg-pink-100 text-pink-800 border-pink-200',
          icon: <RefreshCw size={16} />,
          texto: 'Procesando',
          bgIcon: 'bg-pink-50'
        };
      case 'pendiente':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: <Clock size={16} />,
          texto: 'Pendiente',
          bgIcon: 'bg-amber-50'
        };
      case 'cancelado':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle size={16} />,
          texto: 'Cancelado',
          bgIcon: 'bg-red-50'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Package size={16} />,
          texto: 'Desconocido',
          bgIcon: 'bg-gray-50'
        };
    }
  };

  // Calcular estadísticas (opcional, podríamos mostrarlas)
  const estadisticas = {
    totalPedidos: pedidos.length,
    entregados: pedidos.filter(p => p.estado === 'entregado').length,
    enProceso: pedidos.filter(p => ['en_camino', 'procesando'].includes(p.estado)).length,
    gastoTotal: pedidos.reduce((sum, p) => sum + p.total, 0)
  };

  // Manejar clic en pedido
  const handleVerDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
    setMostrarModal(true);
  };

  // Generar estrellas para calificación
  const renderEstrellas = (calificacion) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= calificacion ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-rose-50 to-white p-4 lg:p-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header con gradiente rosa */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Mis Pedidos
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Revisa el historial y estado de todos tus pedidos
              </p>
            </div>
          </div>

          {/* Filtros y búsqueda con estilo rosa */}
          <div className="bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Barra de búsqueda */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-rose-400" />
                  </div>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por ID o nombre del cliente..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Filtros por estado */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroEstado('todos')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filtroEstado === 'todos'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFiltroEstado('entregado')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filtroEstado === 'entregado'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  Entregados
                </button>
                <button
                  onClick={() => setFiltroEstado('en_camino')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filtroEstado === 'en_camino'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  En camino
                </button>
                <button
                  onClick={() => setFiltroEstado('pendiente')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filtroEstado === 'pendiente'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  Pendientes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-4">
          {pedidosFiltrados.map((pedido) => {
            const estadoInfo = getEstadoInfo(pedido.estado);

            return (
              <div
                key={pedido.id}
                className="bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleVerDetalle(pedido)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Información principal */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{pedido.id}</h3>
                        <p className="text-sm text-gray-500">{formatearFecha(pedido.fecha)}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${estadoInfo.color}`}>
                        <span className={estadoInfo.bgIcon + " p-1 rounded-full"}>
                          {estadoInfo.icon}
                        </span>
                        {estadoInfo.texto}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-rose-400" />
                        <span className="text-sm text-gray-600">{pedido.cliente}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-rose-400" />
                        <span className="text-sm text-gray-600">
                          {pedido.productos} producto{pedido.productos !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-rose-400" />
                        <span className="text-sm font-bold text-gray-800">
                          ${pedido.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-rose-500 hover:text-rose-700 text-sm font-medium transition">
                      <Eye size={16} />
                      Ver detalles
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {pedidosFiltrados.length === 0 && (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl">
              <Package className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No hay pedidos</h3>
              <p className="text-gray-500 mb-6">
                {busqueda ? 'No se encontraron pedidos con esa búsqueda' : 'Aún no has realizado ningún pedido'}
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl font-medium transition-all shadow-md">
                Ir a comprar
              </button>
            </div>
          )}
        </div>

        {/* Modal de detalle del pedido */}
        {mostrarModal && pedidoSeleccionado && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-rose-100">

              {/* Header del Modal */}
              <div className="sticky top-0 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-rose-100 px-6 py-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Detalle del Pedido</h2>
                    <p className="text-sm text-rose-500">{pedidoSeleccionado.id}</p>
                  </div>
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="p-2 hover:bg-white/50 rounded-full transition-colors"
                  >
                    <XCircle className="text-rose-400 hover:text-rose-600" size={24} />
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                {/* Estado del pedido */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const estadoInfo = getEstadoInfo(pedidoSeleccionado.estado);
                        return (
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${estadoInfo.color}`}>
                            {estadoInfo.icon}
                            {estadoInfo.texto}
                          </span>
                        );
                      })()}

                      {pedidoSeleccionado.tracking && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-xl">
                          <Truck size={16} />
                          <span className="text-sm font-medium">Tracking: {pedidoSeleccionado.tracking}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">
                        ${pedidoSeleccionado.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-gray-500">Total del pedido</p>
                    </div>
                  </div>

                  {/* Información del cliente */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-rose-50/50 p-4 rounded-xl">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <User size={18} className="text-rose-500" />
                        Información del cliente
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-rose-400" />
                          <span className="text-sm text-gray-600">{pedidoSeleccionado.cliente}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-rose-400" />
                          <span className="text-sm text-gray-600">{pedidoSeleccionado.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-rose-400" />
                          <span className="text-sm text-gray-600">{pedidoSeleccionado.telefono}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-rose-50/50 p-4 rounded-xl">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <MapPin size={18} className="text-rose-500" />
                        Dirección de entrega
                      </h3>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-rose-400 mt-0.5" />
                        <span className="text-sm text-gray-600">
                          {pedidoSeleccionado.direccionTexto}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <CreditCard size={16} className="text-rose-500" />
                          Método de pago
                        </h4>
                        <p className="text-sm text-gray-600">{pedidoSeleccionado.metodoPago}</p>
                      </div>
                    </div>
                  </div>

                  {/* Productos del pedido */}
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <ShoppingBag size={18} className="text-rose-500" />
                      Productos ({pedidoSeleccionado.productos})
                    </h3>

                    <div className="bg-white border border-rose-200 rounded-xl overflow-hidden">
                      <div className="divide-y divide-rose-100">
                        {pedidoSeleccionado.productosDetalle.map((producto, index) => (
                          <div key={index} className="p-4 hover:bg-rose-50/30 transition-colors">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-gray-800">{producto.nombre}</h4>
                                <p className="text-sm text-gray-500">Cantidad: {producto.cantidad}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800">
                                  ${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Total: ${(producto.cantidad * producto.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Resumen */}
                      <div className="bg-rose-50/50 p-4 border-t border-rose-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">Total del pedido</span>
                          <span className="text-xl font-bold text-gray-800">
                            ${pedidoSeleccionado.total.toLocaleString('es-MX', {
                              minimumFractionDigits: 2
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fechas importantes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pedidoSeleccionado.fecha && (
                      <div className="bg-rose-100/50 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Calendar size={20} className="text-rose-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Fecha del pedido</p>
                            <p className="text-sm text-gray-600">{formatearFecha(pedidoSeleccionado.fecha)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {pedidoSeleccionado.fechaEntrega && (
                      <div className="bg-emerald-100/50 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-emerald-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Fecha de entrega</p>
                            <p className="text-sm text-gray-600">{formatearFecha(pedidoSeleccionado.fechaEntrega)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones del Modal */}
              <div className="sticky bottom-0 bg-white border-t border-rose-100 px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md"
                  >
                    Descargar factura
                  </button>

                  <button
                    onClick={() => setMostrarModal(false)}
                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPedidos;