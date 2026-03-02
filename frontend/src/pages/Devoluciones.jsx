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
  Receipt
} from 'lucide-react';

// Datos simulados de devoluciones
const devolucionesSimuladas = [
  {
    id: 'RET-001',
    pedidoId: 'ORD-001',
    fecha: '2024-01-20',
    fechaSolicitud: '2024-01-19',
    cliente: 'Ana García',
    email: 'ana.garcia@email.com',
    telefono: '+52 33 1234 5678',
    productos: 2,
    montoTotal: 450.50,
    montoReembolso: 450.50,
    estado: 'aprobada',
    motivo: 'Producto defectuoso',
    motivoDetalle: 'El smartphone presenta fallas en la pantalla táctil',
    metodoReembolso: 'Tarjeta Visa',
    productosDetalle: [
      { nombre: 'Smartphone X', cantidad: 1, precio: 1999.99, motivo: 'Defectuoso', estadoProducto: 'inspeccion' },
      { nombre: 'Funda protectora', cantidad: 1, precio: 225.50, motivo: 'Innecesario', estadoProducto: 'recibido' }
    ],
    trackingDevolucion: 'DEV789456123',
    trackingReemplazo: null,
    fechaEstimadaReembolso: '2024-01-25',
    fechaReembolso: '2024-01-24',
    centroDevolucion: 'Centro de Servicio Guadalajara, Av. Principal #500',
    instrucciones: 'Empacar en la caja original con todos los accesorios',
    etiquetaEnvio: 'https://example.com/etiqueta-envio-ret-001',
    facturaDevolucion: 'https://example.com/factura-ret-001'
  },
  {
    id: 'RET-002',
    pedidoId: 'ORD-002',
    fecha: '2024-01-18',
    fechaSolicitud: '2024-01-17',
    cliente: 'Carlos Rodríguez',
    email: 'carlos.rod@email.com',
    telefono: '+52 33 8765 4321',
    productos: 1,
    montoTotal: 599.99,
    montoReembolso: 599.99,
    estado: 'en_proceso',
    motivo: 'Producto incorrecto',
    motivoDetalle: 'Recibí audífonos diferentes a los solicitados',
    metodoReembolso: 'PayPal',
    productosDetalle: [
      { nombre: 'Audífonos Bluetooth', cantidad: 1, precio: 599.99, motivo: 'Producto incorrecto', estadoProducto: 'transit' }
    ],
    trackingDevolucion: 'DEV123456789',
    trackingReemplazo: 'REP987654321',
    fechaEstimadaReembolso: '2024-01-30',
    fechaReembolso: null,
    centroDevolucion: 'Centro de Servicio Zapopan, Calle Secundaria #300',
    instrucciones: 'Incluir todos los cables y manuales',
    etiquetaEnvio: 'https://example.com/etiqueta-envio-ret-002',
    facturaDevolucion: null
  },
  {
    id: 'RET-003',
    pedidoId: 'ORD-003',
    fecha: '2024-01-16',
    fechaSolicitud: '2024-01-15',
    cliente: 'María López',
    email: 'maria.lopez@email.com',
    telefono: '+52 33 5555 8888',
    productos: 1,
    montoTotal: 799.00,
    montoReembolso: 799.00,
    estado: 'pendiente',
    motivo: 'Cambio de opinión',
    motivoDetalle: 'El producto no cumple con mis expectativas',
    metodoReembolso: 'Transferencia bancaria',
    productosDetalle: [
      { nombre: 'Tablet Pro', cantidad: 1, precio: 799.00, motivo: 'Insatisfacción', estadoProducto: 'pending' }
    ],
    trackingDevolucion: null,
    trackingReemplazo: null,
    fechaEstimadaReembolso: '2024-02-05',
    fechaReembolso: null,
    centroDevolucion: 'Centro de Servicio Tlaquepaque, Privada Jardín #100',
    instrucciones: 'Asegurar producto contra golpes',
    etiquetaEnvio: 'https://example.com/etiqueta-envio-ret-003',
    facturaDevolucion: null
  },
  {
    id: 'RET-004',
    pedidoId: 'ORD-004',
    fecha: '2024-01-14',
    fechaSolicitud: '2024-01-13',
    cliente: 'Roberto Sánchez',
    email: 'roberto.s@email.com',
    telefono: '+52 33 2222 3333',
    productos: 1,
    montoTotal: 459.99,
    montoReembolso: 459.99,
    estado: 'rechazada',
    motivo: 'Daño por usuario',
    motivoDetalle: 'Producto presenta daños físicos evidentes',
    metodoReembolso: 'Tarjeta Mastercard',
    productosDetalle: [
      { nombre: 'Smartwatch', cantidad: 1, precio: 459.99, motivo: 'Daño físico', estadoProducto: 'rejected' }
    ],
    trackingDevolucion: 'DEV555555555',
    trackingReemplazo: null,
    fechaEstimadaReembolso: null,
    fechaReembolso: null,
    centroDevolucion: 'Centro de Servicio Tonalá, Boulevard Norte #200',
    instrucciones: null,
    etiquetaEnvio: null,
    facturaDevolucion: null,
    razonRechazo: 'El producto presenta daños físicos no cubiertos por la garantía'
  },
  {
    id: 'RET-005',
    pedidoId: 'ORD-005',
    fecha: '2024-01-12',
    fechaSolicitud: '2024-01-10',
    cliente: 'Laura Martínez',
    email: 'laura.mtz@email.com',
    telefono: '+52 33 4444 6666',
    productos: 2,
    montoTotal: 1599.99,
    montoReembolso: 1599.99,
    estado: 'completada',
    motivo: 'Garantía',
    motivoDetalle: 'Laptop con falla de fabricación',
    metodoReembolso: 'Tarjeta Visa',
    productosDetalle: [
      { nombre: 'Laptop Gamer', cantidad: 1, precio: 1599.99, motivo: 'Garantía', estadoProducto: 'replaced' },
      { nombre: 'Mouse gaming', cantidad: 1, precio: 189.76, motivo: 'Garantía', estadoProducto: 'replaced' }
    ],
    trackingDevolucion: 'DEV111222333',
    trackingReemplazo: 'REP444555666',
    fechaEstimadaReembolso: '2024-01-20',
    fechaReembolso: '2024-01-19',
    centroDevolucion: 'Centro de Servicio Guadalajara, Av. Tecnológico #800',
    instrucciones: 'Incluir cargador y documentos',
    etiquetaEnvio: 'https://example.com/etiqueta-envio-ret-005',
    facturaDevolucion: 'https://example.com/factura-ret-005'
  },
];

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

      console.log("Form data:", form);
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

    try{

      const token = localStorage.getItem('ape_token');
  
      if(!token || token.length === 0){
        alert("Token invalido. ");
        return;
      }

      const response = await clientAxios.post(`/SetReturns`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if(response.data.Success.ok){
        setMostrarFormSolicitud(false);
        getDevolucionesByUserId();
      }else{
        alert("Ocurrio un error al crear la devolución. " + response.data.Success.message);
      }
    }catch(ex){
      console.error("Ocurrio un error al intentar crear la devolucion. ", ex.response.data.Error);
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


  // Filtrar devoluciones
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
          estado: d.estado // Ajustar según tu API
        }));
        setDevoluciones(devolucionesNormalizadas);
      }
      
    } catch (error) {

      if(error.response.status === 404){
        setDevoluciones([]);
        console.warn('No se encontraron devoluciones para este usuario.');
        return;
      }

      console.error('Ocurrio un error al obtener las devoluciones: ', error);
    }
  };

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return 'Pendiente';
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Función para obtener detalles del estado
  const getEstadoInfo = (estado) => {
    switch(estado) {
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
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Check size={16} />,
          texto: 'Aprobada',
          bgIcon: 'bg-blue-50',
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

  // Función para obtener estado del producto
  const getEstadoProductoInfo = (estado) => {
    switch(estado) {
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

  // Calcular estadísticas
  const estadisticas = {
    totalDevoluciones: devoluciones.length,
    completadas: devoluciones.filter(d => d.estado === 'completada').length,
    enProceso: devoluciones.filter(d => ['en_proceso', 'aprobada'].includes(d.estado)).length,
    totalReembolsado: devoluciones
      .filter(d => d.estado === 'completada')
      .reduce((sum, d) => sum + d.montoReembolso, 0)
  };

  // Manejar clic en devolución
  const handleVerDetalle = (devolucion) => {
    setDevolucionSeleccionada(devolucion);
    setMostrarModal(true);
  };

  // Descargar etiqueta de envío
  const handleDescargarEtiqueta = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Etiqueta no disponible');
    }
  };

  const getPedidosOptions = async () => {
    try{
      const token = localStorage.getItem('ape_token');
  
      if(!token || token.length === 0){
        alert("Token invalido. ");
        return;
      }

      const response = await clientAxios.get(`/GetOrdersDeliveredByUserId`, {         
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if(response.data.Success.ok){
        setPedidosParaDevolver(response.data.Success.results);
      }

    }catch(ex){
      console.error(ex.response.data.Error);
      console.log(ex.response.data);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Mis Devoluciones
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Solicita y sigue el estado de tus devoluciones y reembolsos
              </p>
            </div>

            <button
              onClick={() => setMostrarFormSolicitud(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            >
              <RotateCcw size={18} />
              Solicitar Devolución
            </button>
          </div>

          {/* Filtros y búsqueda */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Barra de búsqueda */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por ID, pedido o cliente..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Filtros por estado */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroEstado('todos')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filtroEstado === 'todos'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFiltroEstado('completada')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filtroEstado === 'completada'
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Completadas
                </button>
                <button
                  onClick={() => setFiltroEstado('en_proceso')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filtroEstado === 'en_proceso'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  En proceso
                </button>
                <button
                  onClick={() => setFiltroEstado('pendiente')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filtroEstado === 'pendiente'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
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
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => handleVerDetalle(devolucion)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Información principal */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{devolucion.id}</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Pedido: {devolucion.pedidoId}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{formatearFecha(devolucion.fechaSolicitud)}</p>
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
                        <Tag size={16} className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Motivo</p>
                          <p className="text-sm font-medium text-gray-700">{devolucion.motivo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Productos</p>
                          <p className="text-sm font-medium text-gray-700">
                            {devolucion.productos} producto{devolucion.productos !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Reembolso</p>
                          <p className="text-sm font-bold text-gray-900">
                            ${devolucion.montoReembolso.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarClock size={16} className="text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Est. Reembolso</p>
                          <p className="text-sm font-medium text-gray-700">
                            {formatearFecha(devolucion.fechaEstimadaReembolso)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {devolucion.trackingDevolucion && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                        <Truck size={14} />
                        <span>Tracking devolución: {devolucion.trackingDevolucion}</span>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
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
            <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
              <RotateCcw className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay devoluciones</h3>
              <p className="text-gray-500 mb-6">
                {busqueda ? 'No se encontraron devoluciones con esa búsqueda' : 'Aún no has solicitado ninguna devolución'}
              </p>
              <button
                onClick={() => setMostrarFormSolicitud(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all"
              >
                <RotateCcw size={18} />
                Solicitar mi primera devolución
              </button>
            </div>
          )}
        </div>

        {/* Modal de detalle de devolución */}
        {mostrarModal && devolucionSeleccionada && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Header del Modal */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Detalle de Devolución</h2>
                    <p className="text-sm text-gray-500">{devolucionSeleccionada.id}</p>
                  </div>
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle className="text-gray-400 hover:text-gray-600" size={24} />
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
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
                        Pedido original: <span className="font-medium">{devolucionSeleccionada.pedidoId}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${devolucionSeleccionada.montoReembolso.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-gray-500">Monto a reembolsar</p>
                    </div>
                  </div>

                  {/* Información del cliente */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <User size={18} />
                        Información del cliente
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.cliente}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.telefono}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
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
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <HelpCircle size={18} />
                      Motivo de la devolución
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-amber-600 mt-0.5" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{devolucionSeleccionada.motivo}</h4>
                          <p className="text-sm text-gray-700">{devolucionSeleccionada.motivoDetalle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Productos en devolución */}
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <ShoppingBag size={18} />
                      Productos en devolución ({devolucionSeleccionada.productos})
                    </h3>

                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="divide-y divide-gray-100">
                        {devolucionSeleccionada.productosDetalle.map((producto, index) => {
                          const productoEstado = getEstadoProductoInfo(producto.estadoProducto);
                          return (
                            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
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
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Truck size={18} />
                          Tracking Devolución
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {devolucionSeleccionada.trackingDevolucion}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {devolucionSeleccionada.trackingReemplazo && (
                      <div className="bg-green-50 p-4 rounded-xl">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Package size={18} />
                          Tracking Reemplazo
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {devolucionSeleccionada.trackingReemplazo}
                          </span>
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Centro de devolución */}
                  {devolucionSeleccionada.centroDevolucion && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin size={18} />
                        Centro de Devolución
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-700">{devolucionSeleccionada.centroDevolucion}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Instrucciones */}
                  {devolucionSeleccionada.instrucciones && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <FileText size={18} />
                        Instrucciones de Envío
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-700">{devolucionSeleccionada.instrucciones}</p>
                      </div>
                    </div>
                  )}

                  {/* Razón de rechazo */}
                  {devolucionSeleccionada.razonRechazo && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
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
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  {devolucionSeleccionada.etiquetaEnvio && (
                    <button
                      onClick={() => handleDescargarEtiqueta(devolucionSeleccionada.etiquetaEnvio)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      <Download size={18} />
                      Descargar Etiqueta
                    </button>
                  )}

                  {devolucionSeleccionada.facturaDevolucion && (
                    <button
                      onClick={() => window.open(devolucionSeleccionada.facturaDevolucion, '_blank')}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      <FileText size={18} />
                      Ver Factura
                    </button>
                  )}

                  <button
                    onClick={() => setMostrarModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {mostrarFormSolicitud && (
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-md flex justify-center items-center z-50 px-4 py-6 animate-fadeIn">
            <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl shadow-gray-900/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200/80">
              
              {/* Encabezado con gradiente */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/60 px-8 py-5 rounded-t-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
                      Solicitar Devolución
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Completa los detalles para procesar tu solicitud</p>
                  </div>
                  <button
                    onClick={() => setMostrarFormSolicitud(false)}
                    className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <XCircle className="text-gray-500 hover:text-gray-700" size={26} />
                  </button>
                </div>
              </div>

              {/* Contenido del formulario */}
              <div className="p-8 space-y-8">
                
                {/* Sección: Pedido */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    <label className="block text-sm font-semibold text-gray-800">
                      Selecciona tu pedido
                    </label>
                  </div>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300/80 bg-white 
                            focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 
                            transition-all duration-200 shadow-sm hover:shadow-md"
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
                    <div className="w-1.5 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                    <label className="block text-sm font-semibold text-gray-800">
                      Productos a devolver
                    </label>
                  </div>

                  <div className="space-y-4">
                    
                    {form.items.map((item, index) => (
                      <div
                        key={item.productId}
                        className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl border 
                                  border-gray-200/80 hover:border-blue-300/50 hover:shadow-lg 
                                  transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            
                            <input
                              type="checkbox"
                              checked={item.selected}
                              onChange={(e) => updateItem(index, "selected", e.target.checked)}
                              className="h-5 w-5"
                            />

                            <div className="flex-1 space-y-4">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                                  <div className="text-sm text-gray-600">
                                    ${item.price} • SKU: {item.sku}
                                  </div>
                                </div>
                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                                  Disponible: {item.maxQuantity}
                                </span>
                              </div>

                              <select
                                value={item.reason}
                                onChange={(e) => updateItem(index, "reason", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border"
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
                                className="w-full px-4 py-3 rounded-xl border"
                              />

                              <textarea
                                value={item.detail}
                                onChange={(e) => updateItem(index, "detail", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/80 
                                  hover:border-blue-300/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex items-start pt-1">
                            <input
                              type="checkbox"
                              checked={form.items[0].selected}
                              onChange={(e) => updateItem(0, "selected", e.target.checked)}
                              className="h-5 w-5 rounded-lg border-2 border-gray-300 checked:border-blue-500 
                                      checked:bg-blue-500 focus:ring-2 focus:ring-blue-500/30 
                                      transition-all duration-200 cursor-pointer"
                            />
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-gray-900 text-lg">Smartphone X</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-semibold text-blue-700">$1,999.99</span>
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">SKU: SMX-2024</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                                Disponible: 2 unidades
                              </div>
                            </div> 

                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-600">Motivo de devolución</label>
                                <select 
                                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
                                          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                          transition-all duration-200"
                                          value={form.items[0].reason}
                                          onChange={(e) => updateItem(0, "reason", e.target.value)}
                                >
                                  <option value="">Seleccionar motivo</option>
                                  <option value="defective" className="text-red-600">🎯 Producto defectuoso</option>
                                  <option value="wrong_item">📦 Producto incorrecto</option>
                                  <option value="not_needed">💭 Ya no lo necesito</option>
                                  <option value="size">📏 Talla/medida incorrecta</option>
                                </select>
                              </div> 

                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-600">Cantidad a devolver</label>
                                <div className="flex items-center gap-2">
                                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 
                                                  hover:bg-gray-200 active:bg-gray-300 transition-colors"
                                                   onClick={() =>
                                                    updateItem(
                                                      0,
                                                      "quantity",
                                                      Math.max(1, form.items[0].quantity - 1)
                                                    )
                                                  }>
                                    <span className="text-gray-700 font-bold">-</span>
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    max={form.items[0].maxQuantity}
                                    value={form.items[0].quantity}
                                    onChange={(e) =>
                                      updateItem(0, "quantity", Number(e.target.value))
                                    }
                                    defaultValue="1"
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white text-center 
                                            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                  />
                                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 
                                                  hover:bg-gray-200 active:bg-gray-300 transition-colors">
                                    <span className="text-gray-700 font-bold">+</span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            
                            <div className="space-y-2">
                              <label className="text-xs font-medium text-gray-600">
                                Detalles adicionales <span className="text-gray-400">(Opcional)</span>
                              </label>
                              <textarea
                                rows={2}
                                placeholder="Describe el problema con más detalle..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
                                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                        transition-all duration-200 resize-none"
                                value={form.items[0].detail}
                                onChange={(e) => updateItem(0, "detail", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Sección: Comentarios generales */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                    <label className="block text-sm font-semibold text-gray-800">
                      Comentarios adicionales
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="¿Algo más que debamos saber sobre esta devolución? (Opcional)"
                      className="w-full px-4 py-4 rounded-xl border border-gray-300/80 bg-white 
                              focus:border-green-500 focus:ring-3 focus:ring-green-500/20 
                              transition-all duration-200 resize-none shadow-sm"
                      value={form.generalComment}
                      onChange={(e) =>
                        setForm({ ...form, generalComment: e.target.value })
                      }
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      0/500 caracteres
                    </div>
                  </div>
                </div>

                {/* Sección: Método de reembolso */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                    <label className="block text-sm font-semibold text-gray-800">
                      Método de reembolso preferido
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative cursor-pointer">
                      <input type="radio" name="refund_method" className="sr-only peer" defaultChecked checked={form.refundMethod === "original"} onChange={() => setForm({ ...form, refundMethod: "original" })} />
                      <div className="p-4 rounded-xl border-2 border-gray-300 peer-checked:border-blue-500 
                                  peer-checked:bg-blue-50 transition-all duration-200 hover:border-blue-300">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 
                                      peer-checked:bg-blue-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Método original</p>
                            <p className="text-sm text-gray-600">Reembolso a tu tarjeta/original</p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="relative cursor-pointer">
                      <input type="radio" name="refund_method" className="sr-only peer" checked={form.refundMethod === "store_credit"} onChange={() => setForm({ ...form, refundMethod: "store_credit" })} />
                      <div className="p-4 rounded-xl border-2 border-gray-300 peer-checked:border-purple-500 
                                  peer-checked:bg-purple-50 transition-all duration-200 hover:border-purple-300">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-400 peer-checked:border-purple-500 
                                      peer-checked:bg-purple-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Crédito en tienda</p>
                            <p className="text-sm text-gray-600">+10% bono adicional</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="pt-6 border-t border-gray-200/60">
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => setMostrarFormSolicitud(false)}
                      className="px-6 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 font-medium
                              hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 
                              transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Cancelar
                    </button>
                    
                    <button
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 
                              text-white font-semibold shadow-lg shadow-blue-500/30
                              hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]
                              active:scale-95 transition-all duration-300
                              flex items-center justify-center gap-2"
                              onClick={handleSubmit}
                    >
                      <span>Enviar solicitud</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Al enviar esta solicitud, aceptas nuestras 
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium ml-1">políticas de devolución</a>
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