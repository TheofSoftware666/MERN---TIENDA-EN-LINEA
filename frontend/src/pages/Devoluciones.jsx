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
  Download,
  Filter,
  Search,
  Calendar,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  ShoppingBag,
  ChevronRight,
  AlertCircle,
  DollarSign,
  ArrowLeft,
  RotateCcw,
  Shield,
  FileText,
  Check,
  X,
  HelpCircle,
  ArrowUpRight,
  Box,
  Tag,
  CalendarClock,
  Receipt,
  Heart,
  Sparkles
} from 'lucide-react';

const UserDevoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [devolucionSeleccionada, setDevolucionSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarFormSolicitud, setMostrarFormSolicitud] = useState(false);
  const [pedidosParaDevolver, setPedidosParaDevolver] = useState([]);
  const [form, setForm] = useState({
    orderId: "",
    generalComment: "",
    refundMethod: "original",
    items: []
  });

  const updateItem = (index, field, value) => {
    setForm(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const handleSubmit = async () => {
    const selectedItems = form.items.filter(i => i.selected);

    if (!form.orderId || selectedItems.length === 0) {
      alert("Selecciona un pedido y al menos un producto");
      return;
    }

    const payload = {
      order_id: form.orderId,
      refund_method: form.refundMethod,
      reason: "Customer return",
      reason_detail: form.generalComment,
      items: selectedItems.map(item => ({
        product_name: item.name,
        product_id: item.productId,
        quantity: item.quantity,
        reason: item.reason,
        detail: item.detail
      }))
    };

    try {
      const token = localStorage.getItem('ape_token');
      if (!token || token.length === 0) {
        alert("Token inválido.");
        return;
      }

      const response = await clientAxios.post(`/SetReturns`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.Success.ok) {
        setMostrarFormSolicitud(false);
        getDevolucionesByUserId();
      } else {
        alert("Ocurrió un error al crear la devolución. " + response.data.Success.message);
      }
    } catch (ex) {
      console.error("Ocurrió un error al intentar crear la devolución. ", ex.response?.data?.Error);
    }
  };

  const handleOrderChange = (orderId) => {
    const pedidoSeleccionado = pedidosParaDevolver.find(
      p => p.OrderId === orderId
    );

    if (!pedidoSeleccionado) {
      setForm({ ...form, orderId, items: [] });
      return;
    }

    const itemsFormateados = pedidoSeleccionado.Items.map(item => ({
      productId: item.ProductId,
      name: item.ProductName,
      sku: item.SKU,
      price: item.Price,
      maxQuantity: item.Quantity,
      quantity: 1,
      selected: false,
      reason: "",
      detail: ""
    }));

    setForm({
      ...form,
      orderId,
      items: itemsFormateados
    });
  };

  const devolucionesFiltradas = devoluciones.filter(devolucion => {
    const coincideBusqueda =
      devolucion.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      devolucion.pedidoId.toLowerCase().includes(busqueda.toLowerCase()) ||
      devolucion.cliente.toLowerCase().includes(busqueda.toLowerCase());

    if (filtroEstado === 'todos') return coincideBusqueda;
    return coincideBusqueda && devolucion.estado === filtroEstado;
  });

  useEffect(() => {
    getDevolucionesByUserId();
    getPedidosOptions();
  }, []);

  const getDevolucionesByUserId = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) throw new Error('No se encontró token de autenticación');

      const response = await clientAxios.get(`/Returns`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.Success.ok) {
        const devolucionesNormalizadas = response.data.Success.results.map(d => ({
          ...d,
          montoTotal: Number(d.montoTotal),
          montoReembolso: Number(d.montoReembolso),
          productos: Number(d.productos),
          estado: d.estado
        }));
        setDevoluciones(devolucionesNormalizadas);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setDevoluciones([]);
        console.warn('No se encontraron devoluciones para este usuario.');
        return;
      }
      console.error('Ocurrió un error al obtener las devoluciones: ', error);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Pendiente';
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEstadoInfo = (estado) => {
    switch (estado) {
      case 'completada':
        return {
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: <CheckCircle size={16} />,
          texto: 'Completada',
          bgIcon: 'bg-emerald-50',
          descripcion: 'Devolución procesada y reembolso completado'
        };
      case 'aprobada':
        return {
          color: 'bg-pink-100 text-pink-800 border-pink-200',
          icon: <Check size={16} />,
          texto: 'Aprobada',
          bgIcon: 'bg-pink-50',
          descripcion: 'Devolución aprobada, en espera de recepción'
        };
      case 'en_proceso':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: <RefreshCw size={16} />,
          texto: 'En proceso',
          bgIcon: 'bg-amber-50',
          descripcion: 'Producto en tránsito o en inspección'
        };
      case 'pendiente':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Clock size={16} />,
          texto: 'Pendiente',
          bgIcon: 'bg-gray-50',
          descripcion: 'Esperando aprobación'
        };
      case 'rechazada':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <X size={16} />,
          texto: 'Rechazada',
          bgIcon: 'bg-red-50',
          descripcion: 'Devolución no aprobada'
        };
      case 'cancelada':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <XCircle size={16} />,
          texto: 'Cancelada',
          bgIcon: 'bg-gray-50',
          descripcion: 'Devolución cancelada por el usuario'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Package size={16} />,
          texto: 'Desconocido',
          bgIcon: 'bg-gray-50',
          descripcion: 'Estado no definido'
        };
    }
  };

  const getEstadoProductoInfo = (estado) => {
    switch (estado) {
      case 'pending':
        return { texto: 'Pendiente', color: 'bg-gray-100 text-gray-800' };
      case 'recibido':
        return { texto: 'Recibido', color: 'bg-blue-100 text-blue-800' };
      case 'inspeccion':
        return { texto: 'En inspección', color: 'bg-amber-100 text-amber-800' };
      case 'transit':
        return { texto: 'En tránsito', color: 'bg-purple-100 text-purple-800' };
      case 'approved':
        return { texto: 'Aprobado', color: 'bg-emerald-100 text-emerald-800' };
      case 'rejected':
        return { texto: 'Rechazado', color: 'bg-red-100 text-red-800' };
      case 'replaced':
        return { texto: 'Reemplazado', color: 'bg-green-100 text-green-800' };
      default:
        return { texto: 'Desconocido', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const estadisticas = {
    totalDevoluciones: devoluciones.length,
    completadas: devoluciones.filter(d => d.estado === 'completada').length,
    enProceso: devoluciones.filter(d => ['en_proceso', 'aprobada'].includes(d.estado)).length,
    totalReembolsado: devoluciones
      .filter(d => d.estado === 'completada')
      .reduce((sum, d) => sum + d.montoReembolso, 0)
  };

  const handleVerDetalle = (devolucion) => {
    setDevolucionSeleccionada(devolucion);
    setMostrarModal(true);
  };

  const handleDescargarEtiqueta = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Etiqueta no disponible');
    }
  };

  const getPedidosOptions = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token || token.length === 0) {
        alert("Token inválido.");
        return;
      }

      const response = await clientAxios.get(`/GetOrdersDeliveredByUserId`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.Success.ok) {
        setPedidosParaDevolver(response.data.Success.results);
      }
    } catch (ex) {
      console.error(ex.response?.data?.Error);
      console.log(ex.response?.data);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-light bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="text-rose-400" size={28} />
                Mis Devoluciones
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Solicita y sigue el estado de tus devoluciones y reembolsos
              </p>
            </div>

            <button
              onClick={() => setMostrarFormSolicitud(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              <RotateCcw size={18} />
              Solicitar Devolución
            </button>
          </div>

          {/* Filtros y búsqueda */}
          <div className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-rose-300" />
                  </div>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por ID, pedido o cliente..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-rose-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 placeholder:text-rose-200"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroEstado('todos')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    filtroEstado === 'todos'
                      ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white'
                      : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFiltroEstado('completada')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    filtroEstado === 'completada'
                      ? 'bg-gradient-to-r from-emerald-400 to-green-400 text-white'
                      : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  Completadas
                </button>
                <button
                  onClick={() => setFiltroEstado('en_proceso')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    filtroEstado === 'en_proceso'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                      : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  En proceso
                </button>
                <button
                  onClick={() => setFiltroEstado('pendiente')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    filtroEstado === 'pendiente'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                      : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                  }`}
                >
                  Pendientes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de devoluciones */}
        <div className="space-y-4">
          {devolucionesFiltradas.map((devolucion) => {
            const estadoInfo = getEstadoInfo(devolucion.estado);

            return (
              <div
                key={devolucion.id}
                className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleVerDetalle(devolucion)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-rose-800">{devolucion.id}</h3>
                          <span className="text-sm text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                            Pedido: {devolucion.pedidoId}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{formatearFecha(devolucion.fechaSolicitud)}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${estadoInfo.color}`}>
                        <span className={estadoInfo.bgIcon + " p-1 rounded-full"}>
                          {estadoInfo.icon}
                        </span>
                        {estadoInfo.texto}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-rose-300" />
                        <div>
                          <p className="text-sm text-rose-400">Motivo</p>
                          <p className="text-sm font-medium text-gray-700">{devolucion.motivo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-rose-300" />
                        <div>
                          <p className="text-sm text-rose-400">Productos</p>
                          <p className="text-sm font-medium text-gray-700">
                            {devolucion.productos} producto{devolucion.productos !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-rose-300" />
                        <div>
                          <p className="text-sm text-rose-400">Reembolso</p>
                          <p className="text-sm font-bold text-gray-900">
                            ${devolucion.montoReembolso.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarClock size={16} className="text-rose-300" />
                        <div>
                          <p className="text-sm text-rose-400">Est. Reembolso</p>
                          <p className="text-sm font-medium text-gray-700">
                            {formatearFecha(devolucion.fechaEstimadaReembolso)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {devolucion.trackingDevolucion && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-rose-500">
                        <Truck size={14} />
                        <span>Tracking devolución: {devolucion.trackingDevolucion}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-rose-500 hover:text-rose-700 text-sm font-medium">
                      <Eye size={16} />
                      Ver detalles
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {devolucionesFiltradas.length === 0 && (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl">
              <Heart className="w-16 h-16 text-rose-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-rose-800 mb-2">No hay devoluciones</h3>
              <p className="text-gray-500 mb-6">
                {busqueda ? 'No se encontraron devoluciones con esa búsqueda' : 'Aún no has solicitado ninguna devolución'}
              </p>
              <button
                onClick={() => setMostrarFormSolicitud(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full font-medium transition-all"
              >
                <RotateCcw size={18} />
                Solicitar mi primera devolución
              </button>
            </div>
          )}
        </div>

        {/* Modal de detalle de devolución */}
        {mostrarModal && devolucionSeleccionada && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-rose-100">
              <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-rose-100 px-6 py-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-rose-800">Detalle de Devolución</h2>
                    <p className="text-sm text-rose-400">{devolucionSeleccionada.id}</p>
                  </div>
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="p-2 hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <XCircle className="text-rose-300 hover:text-rose-500" size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Estado de la devolución */}
                <div className="mb-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {(() => {
                          const estadoInfo = getEstadoInfo(devolucionSeleccionada.estado);
                          return (
                            <>
                              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${estadoInfo.color}`}>
                                {estadoInfo.icon}
                                {estadoInfo.texto}
                              </span>
                              <p className="text-sm text-gray-600">{estadoInfo.descripcion}</p>
                            </>
                          );
                        })()}
                      </div>
                      <p className="text-sm text-gray-600">
                        Pedido original: <span className="font-medium text-rose-600">{devolucionSeleccionada.pedidoId}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-rose-700">
                        ${devolucionSeleccionada.montoReembolso.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-rose-400">Monto a reembolsar</p>
                    </div>
                  </div>

                  {/* Información del cliente */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                      <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                        <User size={18} />
                        Información del cliente
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-rose-300" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.cliente}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-rose-300" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-rose-300" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.telefono}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                      <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                        <Receipt size={18} />
                        Información de reembolso
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Método:</span>
                          <span className="text-sm font-medium text-gray-700">{devolucionSeleccionada.metodoReembolso}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Fecha estimada:</span>
                          <span className="text-sm font-medium text-gray-700">
                            {formatearFecha(devolucionSeleccionada.fechaEstimadaReembolso)}
                          </span>
                        </div>
                        {devolucionSeleccionada.fechaReembolso && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Fecha real:</span>
                            <span className="text-sm font-medium text-gray-700">
                              {formatearFecha(devolucionSeleccionada.fechaReembolso)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Motivo de la devolución */}
                  <div className="mb-8">
                    <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                      <HelpCircle size={18} />
                      Motivo de la devolución
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-amber-500 mt-0.5" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{devolucionSeleccionada.motivo}</h4>
                          <p className="text-sm text-gray-700">{devolucionSeleccionada.motivoDetalle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Productos en devolución */}
                  <div className="mb-8">
                    <h3 className="font-medium text-rose-800 mb-4 flex items-center gap-2">
                      <ShoppingBag size={18} />
                      Productos en devolución ({devolucionSeleccionada.productos})
                    </h3>

                    <div className="bg-white border border-rose-100 rounded-xl overflow-hidden">
                      <div className="divide-y divide-rose-50">
                        {devolucionSeleccionada.productosDetalle.map((producto, index) => {
                          const productoEstado = getEstadoProductoInfo(producto.estadoProducto);
                          return (
                            <div key={index} className="p-4 hover:bg-rose-50/30 transition-colors">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                                  <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm text-gray-500">Cantidad: {producto.cantidad}</span>
                                    <span className="text-sm text-gray-500">Motivo: {producto.motivo}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${productoEstado.color}`}>
                                    {productoEstado.texto}
                                  </span>
                                  <p className="font-medium text-gray-900">
                                    ${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Información de envío y tracking */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {devolucionSeleccionada.trackingDevolucion && (
                      <div className="bg-rose-50 p-4 rounded-xl">
                        <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                          <Truck size={18} />
                          Tracking Devolución
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {devolucionSeleccionada.trackingDevolucion}
                          </span>
                          <button className="text-rose-500 hover:text-rose-700 text-sm font-medium">
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {devolucionSeleccionada.trackingReemplazo && (
                      <div className="bg-green-50 p-4 rounded-xl">
                        <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                          <Package size={18} />
                          Tracking Reemplazo
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {devolucionSeleccionada.trackingReemplazo}
                          </span>
                          <button className="text-green-500 hover:text-green-700 text-sm font-medium">
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Centro de devolución */}
                  {devolucionSeleccionada.centroDevolucion && (
                    <div className="mb-6">
                      <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                        <MapPin size={18} />
                        Centro de Devolución
                      </h3>
                      <div className="bg-rose-50 p-4 rounded-xl">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-rose-300 mt-0.5" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.centroDevolucion}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Instrucciones */}
                  {devolucionSeleccionada.instrucciones && (
                    <div className="mb-6">
                      <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                        <FileText size={18} />
                        Instrucciones de Envío
                      </h3>
                      <div className="bg-rose-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-700">{devolucionSeleccionada.instrucciones}</p>
                      </div>
                    </div>
                  )}

                  {/* Razón de rechazo */}
                  {devolucionSeleccionada.razonRechazo && (
                    <div className="mb-6">
                      <h3 className="font-medium text-rose-800 mb-3 flex items-center gap-2">
                        <AlertCircle size={18} />
                        Razón de Rechazo
                      </h3>
                      <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                        <p className="text-sm text-red-700">{devolucionSeleccionada.razonRechazo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones del Modal */}
              <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-rose-100 px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  {devolucionSeleccionada.etiquetaEnvio && (
                    <button
                      onClick={() => handleDescargarEtiqueta(devolucionSeleccionada.etiquetaEnvio)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      <Download size={18} />
                      Descargar Etiqueta
                    </button>
                  )}

                  {devolucionSeleccionada.facturaDevolucion && (
                    <button
                      onClick={() => window.open(devolucionSeleccionada.facturaDevolucion, '_blank')}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
                    >
                      <FileText size={18} />
                      Ver Factura
                    </button>
                  )}

                  <button
                    onClick={() => setMostrarModal(false)}
                    className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de solicitud de devolución */}
        {mostrarFormSolicitud && (
          <div className="fixed inset-0 bg-gradient-to-br from-rose-900/20 to-pink-900/20 backdrop-blur-md flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-rose-100">

              <div className="sticky top-0 z-10 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100 px-8 py-5 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-light bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      Solicitar Devolución
                    </h2>
                    <p className="text-sm text-rose-500 mt-1">Completa los detalles para procesar tu solicitud</p>
                  </div>
                  <button
                    onClick={() => setMostrarFormSolicitud(false)}
                    className="p-2 hover:bg-rose-100 rounded-full transition-all"
                  >
                    <XCircle className="text-rose-300 hover:text-rose-500" size={26} />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">

                {/* Sección: Pedido */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-rose-400 to-pink-400 rounded-full"></div>
                    <label className="block text-sm font-semibold text-rose-800">
                      Selecciona tu pedido
                    </label>
                  </div>
                  <select
                    className="w-full px-4 py-3.5 rounded-full border border-rose-200 bg-white focus:border-rose-400 focus:ring-3 focus:ring-rose-200 transition-all duration-200 shadow-sm hover:shadow-md"
                    value={form.orderId}
                    onChange={(e) => handleOrderChange(e.target.value)}
                  >
                    <option value="">Seleccionar pedido...</option>
                    {pedidosParaDevolver.map((pedido) => (
                      <option key={pedido.OrderId} value={pedido.OrderId} className="py-2">
                        {pedido.OrderNumber} — ${pedido.Total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} • {formatearFecha(pedido.Fecha)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sección: Productos */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
                    <label className="block text-sm font-semibold text-rose-800">
                      Productos a devolver
                    </label>
                  </div>

                  <div className="space-y-4">
                    {form.items.map((item, index) => (
                      <div
                        key={item.productId}
                        className="group bg-white rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            <input
                              type="checkbox"
                              checked={item.selected}
                              onChange={(e) => updateItem(index, "selected", e.target.checked)}
                              className="h-5 w-5 rounded-lg border-2 border-rose-300 checked:border-rose-500 checked:bg-rose-500 focus:ring-2 focus:ring-rose-300 transition-all duration-200 cursor-pointer"
                            />

                            <div className="flex-1 space-y-4">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-semibold text-gray-900 text-lg">{item.name}</p>
                                  <div className="text-sm text-rose-500">
                                    ${item.price} • SKU: {item.sku}
                                  </div>
                                </div>
                                <span className="text-xs bg-rose-50 text-rose-600 px-3 py-1 rounded-full">
                                  Disponible: {item.maxQuantity}
                                </span>
                              </div>

                              <select
                                value={item.reason}
                                onChange={(e) => updateItem(index, "reason", e.target.value)}
                                className="w-full px-4 py-3 rounded-full border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                              >
                                <option value="">Seleccionar motivo</option>
                                <option value="defective">🎯 Producto defectuoso</option>
                                <option value="wrong_item">📦 Producto incorrecto</option>
                                <option value="not_needed">💭 Ya no lo necesito</option>
                              </select>

                              <input
                                type="number"
                                min="1"
                                max={item.maxQuantity}
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(index, "quantity", Number(e.target.value))
                                }
                                className="w-full px-4 py-3 rounded-full border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                              />

                              <textarea
                                value={item.detail}
                                onChange={(e) => updateItem(index, "detail", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 resize-none"
                                placeholder="Detalles adicionales (opcional)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección: Comentarios generales */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full"></div>
                    <label className="block text-sm font-semibold text-rose-800">
                      Comentarios adicionales
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="¿Algo más que debamos saber sobre esta devolución? (Opcional)"
                      className="w-full px-4 py-4 rounded-xl border border-rose-200 bg-white focus:border-green-400 focus:ring-3 focus:ring-green-200 transition-all duration-200 resize-none shadow-sm"
                      value={form.generalComment}
                      onChange={(e) =>
                        setForm({ ...form, generalComment: e.target.value })
                      }
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-rose-300">
                      0/500 caracteres
                    </div>
                  </div>
                </div>

                {/* Sección: Método de reembolso */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                    <label className="block text-sm font-semibold text-rose-800">
                      Método de reembolso preferido
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative cursor-pointer">
                      <input type="radio" name="refund_method" className="sr-only peer" defaultChecked checked={form.refundMethod === "original"} onChange={() => setForm({ ...form, refundMethod: "original" })} />
                      <div className="p-4 rounded-2xl border-2 border-rose-200 peer-checked:border-rose-400 peer-checked:bg-rose-50 transition-all duration-200 hover:border-rose-300">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-rose-300 peer-checked:border-rose-500 peer-checked:bg-rose-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Método original</p>
                            <p className="text-sm text-rose-500">Reembolso a tu tarjeta/original</p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="relative cursor-pointer">
                      <input type="radio" name="refund_method" className="sr-only peer" checked={form.refundMethod === "store_credit"} onChange={() => setForm({ ...form, refundMethod: "store_credit" })} />
                      <div className="p-4 rounded-2xl border-2 border-rose-200 peer-checked:border-purple-400 peer-checked:bg-purple-50 transition-all duration-200 hover:border-purple-300">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-rose-300 peer-checked:border-purple-500 peer-checked:bg-purple-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Crédito en tienda</p>
                            <p className="text-sm text-rose-500">+10% bono adicional</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="pt-6 border-t border-rose-100">
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => setMostrarFormSolicitud(false)}
                      className="px-6 py-3.5 rounded-full border-2 border-rose-200 text-rose-700 font-medium hover:bg-rose-50 hover:border-rose-300 active:bg-rose-100 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Cancelar
                    </button>

                    <button
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={handleSubmit}
                    >
                      <span>Enviar solicitud</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-rose-300 text-center mt-4">
                    Al enviar esta solicitud, aceptas nuestras
                    <a href="#" className="text-rose-500 hover:text-rose-700 font-medium ml-1">políticas de devolución</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDevoluciones;