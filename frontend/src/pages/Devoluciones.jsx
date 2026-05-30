import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';

import {
  Package, Clock, CheckCircle, XCircle, Truck,
  RefreshCw, Eye, Download, Search, Calendar,
  CreditCard, MapPin, User, Phone, Mail, ShoppingBag,
  ChevronRight, AlertCircle, DollarSign, ArrowLeft,
  RotateCcw, Shield, FileText, Check, X, HelpCircle,
  ArrowUpRight, Box, Tag, CalendarClock, Receipt,
  Heart, Sparkles
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
    orderId: "", generalComment: "", refundMethod: "original", items: []
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
      order_id: form.orderId, refund_method: form.refundMethod,
      reason: "Customer return", reason_detail: form.generalComment,
      items: selectedItems.map(item => ({
        product_name: item.name, product_id: item.productId,
        quantity: item.quantity, reason: item.reason, detail: item.detail
      }))
    };
    try {
      const token = localStorage.getItem('ape_token');
      if (!token || token.length === 0) { alert("Token inválido."); return; }
      const response = await clientAxios.post(`/SetReturns`, payload, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (response.data.Success.ok) { setMostrarFormSolicitud(false); getDevolucionesByUserId(); }
      else alert("Ocurrió un error al crear la devolución. " + response.data.Success.message);
    } catch (ex) {
      console.error("Error al crear la devolución. ", ex.response?.data?.Error);
    }
  };

  const handleOrderChange = (orderId) => {
    const pedidoSel = pedidosParaDevolver.find(p => p.OrderId === orderId);
    if (!pedidoSel) { setForm({ ...form, orderId, items: [] }); return; }
    setForm({
      ...form, orderId,
      items: pedidoSel.Items.map(item => ({
        productId: item.ProductId, name: item.ProductName, sku: item.SKU,
        price: item.Price, maxQuantity: item.Quantity, quantity: 1,
        selected: false, reason: "", detail: ""
      }))
    });
  };

  const devolucionesFiltradas = devoluciones.filter(d => {
    const coincide = d.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.pedidoId.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.cliente.toLowerCase().includes(busqueda.toLowerCase());
    if (filtroEstado === 'todos') return coincide;
    return coincide && d.estado === filtroEstado;
  });

  useEffect(() => { getDevolucionesByUserId(); getPedidosOptions(); }, []);

  const getDevolucionesByUserId = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) throw new Error('No token');
      const response = await clientAxios.get(`/Returns`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.Success.ok) {
        setDevoluciones(response.data.Success.results.map(d => ({
          ...d, montoTotal: Number(d.montoTotal),
          montoReembolso: Number(d.montoReembolso), productos: Number(d.productos)
        })));
      }
    } catch (error) {
      if (error.response?.status === 404) { setDevoluciones([]); return; }
      console.error('Error obteniendo devoluciones:', error);
    }
  };

  const getPedidosOptions = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const response = await clientAxios.get(`/GetOrdersDeliveredByUserId`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (response.data.Success.ok) setPedidosParaDevolver(response.data.Success.results);
    } catch (ex) { console.error(ex.response?.data?.Error); }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Pendiente';
    return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getEstadoInfo = (estado) => {
    switch (estado) {
      case 'completada':  return { color: 'border-[#7abf8a]/40 text-[#7abf8a] bg-[#7abf8a]/5', icon: <CheckCircle size={13} />, texto: 'Completada', descripcion: 'Devolución procesada y reembolso completado' };
      case 'aprobada':    return { color: 'border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/5', icon: <Check size={13} />, texto: 'Aprobada', descripcion: 'Aprobada, en espera de recepción' };
      case 'en_proceso':  return { color: 'border-blue-500/30 text-blue-400 bg-blue-500/5', icon: <RefreshCw size={13} />, texto: 'En proceso', descripcion: 'Producto en tránsito o en inspección' };
      case 'pendiente':   return { color: 'border-[#e8e8e8] text-[#888] bg-white', icon: <Clock size={13} />, texto: 'Pendiente', descripcion: 'Esperando aprobación' };
      case 'rechazada':   return { color: 'border-red-500/30 text-red-400 bg-red-500/5', icon: <X size={13} />, texto: 'Rechazada', descripcion: 'Devolución no aprobada' };
      case 'cancelada':   return { color: 'border-[#e8e8e8] text-[#aaa] bg-white', icon: <XCircle size={13} />, texto: 'Cancelada', descripcion: 'Cancelada por el usuario' };
      default:            return { color: 'border-[#e8e8e8] text-[#888] bg-white', icon: <Package size={13} />, texto: 'Desconocido', descripcion: '' };
    }
  };

  const getEstadoProductoInfo = (estado) => {
    switch (estado) {
      case 'pending':     return { texto: 'Pendiente',      color: 'border-[#e8e8e8] text-[#aaa]' };
      case 'recibido':    return { texto: 'Recibido',        color: 'border-blue-500/30 text-blue-400' };
      case 'inspeccion':  return { texto: 'En inspección',  color: 'border-amber-500/30 text-amber-400' };
      case 'transit':     return { texto: 'En tránsito',    color: 'border-purple-500/30 text-purple-400' };
      case 'approved':    return { texto: 'Aprobado',        color: 'border-[#7abf8a]/40 text-[#7abf8a]' };
      case 'rejected':    return { texto: 'Rechazado',       color: 'border-red-500/30 text-red-400' };
      case 'replaced':    return { texto: 'Reemplazado',     color: 'border-[#c9a84c]/40 text-[#c9a84c]' };
      default:            return { texto: 'Desconocido',     color: 'border-[#e8e8e8] text-[#aaa]' };
    }
  };

  const filtros = [
    { id: 'todos', label: 'Todos' },
    { id: 'completada', label: 'Completadas' },
    { id: 'en_proceso', label: 'En proceso' },
    { id: 'pendiente', label: 'Pendientes' },
  ];

  // ── Clases reutilizables ──
  const inputBase = "w-full bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] placeholder-[#bbb] px-4 py-3 text-sm outline-none transition-colors";
  const selectBase = "w-full bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] px-4 py-3 text-sm outline-none transition-colors appearance-none";
  const labelBase = "block text-[10px] font-semibold text-[#888] mb-1.5 tracking-widest uppercase";
  const sectionLabel = "text-[10px] font-semibold text-[#c9a84c] tracking-widest uppercase mb-4 flex items-center gap-2";

  return (
    <section className="w-full min-h-screen bg-white p-4 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">Mi cuenta</p>
            <h1 className="text-3xl font-light text-[#1a1a1a] mb-1">Mis Devoluciones</h1>
            <p className="text-[#aaa] text-xs tracking-wide">Solicita y sigue el estado de tus devoluciones y reembolsos</p>
          </div>
          <button
            onClick={() => setMostrarFormSolicitud(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all self-start lg:self-auto"
          >
            <RotateCcw size={14} />
            Solicitar Devolución
          </button>
        </div>

        {/* ── Filtros ── */}
        <div className="bg-white border border-[#e8e8e8] p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" />
              <input
                type="text" value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por ID, pedido o cliente..."
                className="w-full bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] placeholder-[#bbb] pl-9 pr-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filtros.map(f => (
                <button key={f.id} onClick={() => setFiltroEstado(f.id)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                    filtroEstado === f.id
                      ? 'bg-[#c9a84c] text-[#0d0d0d]'
                      : 'border border-[#e8e8e8] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                  }`}
                >{f.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Lista ── */}
        <div className="space-y-3">
          {devolucionesFiltradas.map((devolucion) => {
            const estadoInfo = getEstadoInfo(devolucion.estado);
            return (
              <div key={devolucion.id}
                className="bg-white border border-[#e8e8e8] hover:border-[#c9a84c]/40 p-5 transition-all cursor-pointer group"
                onClick={() => { setDevolucionSeleccionada(devolucion); setMostrarModal(true); }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-sm font-semibold text-[#1a1a1a] tracking-wide">{devolucion.id}</h3>
                          <span className="text-[10px] text-[#c9a84c] border border-[#c9a84c]/30 px-2 py-0.5 tracking-wider">
                            Pedido: {devolucion.pedidoId}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#aaa] tracking-wide">{formatearFecha(devolucion.fechaSolicitud)}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] font-bold tracking-widest uppercase ${estadoInfo.color}`}>
                        {estadoInfo.icon} {estadoInfo.texto}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: <Tag size={13} />, label: 'Motivo', value: devolucion.motivo },
                        { icon: <ShoppingBag size={13} />, label: 'Productos', value: `${devolucion.productos} producto${devolucion.productos !== 1 ? 's' : ''}` },
                        { icon: <DollarSign size={13} />, label: 'Reembolso', value: `$${devolucion.montoReembolso.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, bold: true },
                        { icon: <CalendarClock size={13} />, label: 'Est. Reembolso', value: formatearFecha(devolucion.fechaEstimadaReembolso) },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-0.5">{item.icon}</span>
                          <div>
                            <p className="text-[10px] text-[#aaa] tracking-wider uppercase">{item.label}</p>
                            <p className={`text-xs mt-0.5 ${item.bold ? 'font-bold text-[#1a1a1a]' : 'text-[#888]'}`}>{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {devolucion.trackingDevolucion && (
                      <div className="mt-3 flex items-center gap-2 text-[10px] text-[#aaa] tracking-wide">
                        <Truck size={11} className="text-[#c9a84c]" />
                        <span>Tracking: {devolucion.trackingDevolucion}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#aaa] group-hover:text-[#c9a84c] transition-colors">
                    <Eye size={14} />
                    <span className="text-[10px] tracking-widest uppercase font-semibold">Ver detalles</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}

          {devolucionesFiltradas.length === 0 && (
            <div className="text-center py-16 bg-white border border-[#e8e8e8]">
              <div className="w-14 h-14 border border-[#e8e8e8] flex items-center justify-center mx-auto mb-5">
                <RotateCcw size={20} className="text-[#bbb]" />
              </div>
              <p className="text-[#aaa] text-xs tracking-widest uppercase mb-1">Sin resultados</p>
              <p className="text-[#bbb] text-xs mb-6">
                {busqueda ? 'No se encontraron devoluciones con esa búsqueda' : 'Aún no has solicitado ninguna devolución'}
              </p>
              <button onClick={() => setMostrarFormSolicitud(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all"
              >
                <RotateCcw size={13} /> Solicitar devolución
              </button>
            </div>
          )}
        </div>

        {/* ── Modal detalle ── */}
        {mostrarModal && devolucionSeleccionada && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white border border-[#e8e8e8] w-full max-w-4xl max-h-[90vh] overflow-y-auto">

              <div className="sticky top-0 bg-white border-b border-[#e8e8e8] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[9px] font-semibold mb-0.5">Detalle de devolución</p>
                  <h2 className="text-sm font-semibold text-[#1a1a1a] tracking-wide">{devolucionSeleccionada.id}</h2>
                </div>
                <button onClick={() => setMostrarModal(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[#e8e8e8] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] transition-all"
                ><XCircle size={15} /></button>
              </div>

              <div className="p-6 space-y-6">

                {/* Estado + reembolso */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    {(() => {
                      const ei = getEstadoInfo(devolucionSeleccionada.estado);
                      return (
                        <>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-bold tracking-widest uppercase ${ei.color}`}>
                            {ei.icon} {ei.texto}
                          </span>
                          <p className="text-xs text-[#aaa] tracking-wide">{ei.descripcion}</p>
                        </>
                      );
                    })()}
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xl font-bold text-[#c9a84c]">
                      ${devolucionSeleccionada.montoReembolso.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-[#aaa] tracking-wider uppercase">Monto a reembolsar</p>
                  </div>
                </div>

                {/* Info cliente + reembolso */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#e8e8e8] p-5">
                    <p className={sectionLabel}><User size={13} /> Información del cliente</p>
                    <div className="space-y-2.5">
                      {[
                        { icon: <User size={13} />, value: devolucionSeleccionada.cliente },
                        { icon: <Mail size={13} />, value: devolucionSeleccionada.email },
                        { icon: <Phone size={13} />, value: devolucionSeleccionada.telefono },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <span className="text-[#c9a84c]">{item.icon}</span>
                          <span className="text-xs text-[#888]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-[#e8e8e8] p-5">
                    <p className={sectionLabel}><Receipt size={13} /> Información de reembolso</p>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Método', value: devolucionSeleccionada.metodoReembolso },
                        { label: 'Fecha estimada', value: formatearFecha(devolucionSeleccionada.fechaEstimadaReembolso) },
                        ...(devolucionSeleccionada.fechaReembolso ? [{ label: 'Fecha real', value: formatearFecha(devolucionSeleccionada.fechaReembolso) }] : [])
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-[10px] text-[#aaa] tracking-wider uppercase">{item.label}</span>
                          <span className="text-xs text-[#999]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Motivo */}
                <div className="bg-amber-500/5 border border-amber-500/20 p-5">
                  <p className="text-[10px] text-amber-400 tracking-widest uppercase font-semibold mb-3 flex items-center gap-2">
                    <HelpCircle size={13} /> Motivo de la devolución
                  </p>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#1a1a1a] mb-1">{devolucionSeleccionada.motivo}</p>
                      <p className="text-xs text-[#888] leading-relaxed">{devolucionSeleccionada.motivoDetalle}</p>
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div>
                  <p className={sectionLabel}><ShoppingBag size={13} /> Productos en devolución ({devolucionSeleccionada.productos})</p>
                  <div className="border border-[#e8e8e8] overflow-hidden">
                    <div className="divide-y divide-[#f0f0f0]">
                      {devolucionSeleccionada.productosDetalle.map((producto, index) => {
                        const ps = getEstadoProductoInfo(producto.estadoProducto);
                        return (
                          <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-5 py-4 hover:bg-white transition-colors">
                            <div>
                              <p className="text-xs font-semibold text-[#1a1a1a]">{producto.nombre}</p>
                              <p className="text-[10px] text-[#aaa] mt-0.5 tracking-wide">
                                Cantidad: {producto.cantidad} · Motivo: {producto.motivo}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`inline-flex px-2 py-0.5 border text-[10px] font-bold tracking-widest uppercase ${ps.color}`}>
                                {ps.texto}
                              </span>
                              <p className="text-xs font-bold text-[#1a1a1a] whitespace-nowrap">
                                ${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Tracking */}
                {(devolucionSeleccionada.trackingDevolucion || devolucionSeleccionada.trackingReemplazo) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {devolucionSeleccionada.trackingDevolucion && (
                      <div className="bg-white border border-[#e8e8e8] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Truck size={14} className="text-[#c9a84c]" />
                          <div>
                            <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold">Tracking devolución</p>
                            <p className="text-xs text-[#888] mt-0.5">{devolucionSeleccionada.trackingDevolucion}</p>
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="text-[#888]" />
                      </div>
                    )}
                    {devolucionSeleccionada.trackingReemplazo && (
                      <div className="bg-white border border-[#7abf8a]/20 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Package size={14} className="text-[#7abf8a]" />
                          <div>
                            <p className="text-[10px] text-[#7abf8a] tracking-widest uppercase font-semibold">Tracking reemplazo</p>
                            <p className="text-xs text-[#888] mt-0.5">{devolucionSeleccionada.trackingReemplazo}</p>
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="text-[#888]" />
                      </div>
                    )}
                  </div>
                )}

                {/* Centro de devolución */}
                {devolucionSeleccionada.centroDevolucion && (
                  <div className="bg-white border border-[#e8e8e8] p-4 flex items-start gap-2.5">
                    <MapPin size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-1">Centro de devolución</p>
                      <p className="text-xs text-[#888]">{devolucionSeleccionada.centroDevolucion}</p>
                    </div>
                  </div>
                )}

                {/* Instrucciones */}
                {devolucionSeleccionada.instrucciones && (
                  <div className="bg-white border border-[#e8e8e8] p-4">
                    <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-2 flex items-center gap-2">
                      <FileText size={13} /> Instrucciones de envío
                    </p>
                    <p className="text-xs text-[#888] leading-relaxed">{devolucionSeleccionada.instrucciones}</p>
                  </div>
                )}

                {/* Razón de rechazo */}
                {devolucionSeleccionada.razonRechazo && (
                  <div className="bg-red-500/5 border border-red-500/20 p-4">
                    <p className="text-[10px] text-red-400 tracking-widest uppercase font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle size={13} /> Razón de rechazo
                    </p>
                    <p className="text-xs text-[#888] leading-relaxed">{devolucionSeleccionada.razonRechazo}</p>
                  </div>
                )}

              </div>

              {/* Footer modal */}
              <div className="sticky bottom-0 bg-white border-t border-[#e8e8e8] px-6 py-4 flex flex-col sm:flex-row gap-3">
                {devolucionSeleccionada.etiquetaEnvio && (
                  <button onClick={() => window.open(devolucionSeleccionada.etiquetaEnvio, '_blank')}
                    className="flex-1 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
                  ><Download size={14} /> Descargar Etiqueta</button>
                )}
                {devolucionSeleccionada.facturaDevolucion && (
                  <button onClick={() => window.open(devolucionSeleccionada.facturaDevolucion, '_blank')}
                    className="flex-1 border border-[#7abf8a]/40 text-[#7abf8a] hover:bg-[#7abf8a]/5 py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
                  ><FileText size={14} /> Ver Factura</button>
                )}
                <button onClick={() => setMostrarModal(false)}
                  className="flex-1 border border-[#e8e8e8] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all"
                >Cerrar</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Modal solicitud ── */}
        {mostrarFormSolicitud && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white border border-[#e8e8e8] w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              <div className="sticky top-0 z-10 bg-white border-b border-[#e8e8e8] px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[9px] font-semibold mb-0.5">Nueva solicitud</p>
                  <h2 className="text-base font-light text-[#1a1a1a]">Solicitar Devolución</h2>
                </div>
                <button onClick={() => setMostrarFormSolicitud(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[#e8e8e8] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] transition-all"
                ><XCircle size={15} /></button>
              </div>

              <div className="p-6 space-y-6">

                {/* Pedido */}
                <div>
                  <label className={labelBase}>Selecciona tu pedido</label>
                  <select className={selectBase} value={form.orderId} onChange={(e) => handleOrderChange(e.target.value)}>
                    <option value="">Seleccionar pedido...</option>
                    {pedidosParaDevolver.map((pedido) => (
                      <option key={pedido.OrderId} value={pedido.OrderId}>
                        {pedido.OrderNumber} — ${pedido.Total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} · {formatearFecha(pedido.Fecha)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Productos */}
                {form.items.length > 0 && (
                  <div>
                    <label className={labelBase}>Productos a devolver</label>
                    <div className="space-y-3">
                      {form.items.map((item, index) => (
                        <div key={item.productId}
                          className={`border transition-all ${item.selected ? 'border-[#c9a84c]/40 bg-[#c9a84c]/5' : 'border-[#e8e8e8]'} p-4`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Checkbox custom */}
                            <button
                              type="button"
                              onClick={() => updateItem(index, "selected", !item.selected)}
                              className={`w-4 h-4 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                                item.selected ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#333]'
                              }`}
                            >
                              {item.selected && <Check size={10} className="text-[#0d0d0d]" />}
                            </button>

                            <div className="flex-1 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-semibold text-[#1a1a1a]">{item.name}</p>
                                  <p className="text-[10px] text-[#aaa] tracking-wide">${item.price} · SKU: {item.sku}</p>
                                </div>
                                <span className="text-[10px] border border-[#e8e8e8] text-[#aaa] px-2 py-0.5 tracking-wider">
                                  Máx: {item.maxQuantity}
                                </span>
                              </div>

                              {item.selected && (
                                <div className="space-y-3 pt-2 border-t border-[#e8e8e8]">
                                  <select value={item.reason} onChange={(e) => updateItem(index, "reason", e.target.value)} className={selectBase}>
                                    <option value="">Seleccionar motivo</option>
                                    <option value="defective">Producto defectuoso</option>
                                    <option value="wrong_item">Producto incorrecto</option>
                                    <option value="not_needed">Ya no lo necesito</option>
                                  </select>

                                  <input type="number" min="1" max={item.maxQuantity} value={item.quantity}
                                    onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                                    className={inputBase}
                                    placeholder="Cantidad"
                                  />

                                  <textarea value={item.detail} onChange={(e) => updateItem(index, "detail", e.target.value)}
                                    rows={2} placeholder="Detalles adicionales (opcional)"
                                    className={`${inputBase} resize-none`}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comentarios */}
                <div>
                  <label className={labelBase}>Comentarios adicionales</label>
                  <textarea rows={3} placeholder="¿Algo más que debamos saber? (Opcional)"
                    className={`${inputBase} resize-none`}
                    value={form.generalComment}
                    onChange={(e) => setForm({ ...form, generalComment: e.target.value })}
                  />
                </div>

                {/* Método de reembolso */}
                <div>
                  <label className={labelBase}>Método de reembolso</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'original', title: 'Método original', desc: 'Reembolso a tu tarjeta / método original' },
                      { id: 'store_credit', title: 'Crédito en tienda', desc: '+10% bono adicional sobre el monto' },
                    ].map((opt) => (
                      <label key={opt.id}
                        className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                          form.refundMethod === opt.id ? 'border-[#c9a84c] bg-[#c9a84c]/5' : 'border-[#e8e8e8] hover:border-[#c9a84c]/40'
                        }`}
                      >
                        <input type="radio" name="refund_method" className="sr-only"
                          checked={form.refundMethod === opt.id}
                          onChange={() => setForm({ ...form, refundMethod: opt.id })}
                        />
                        <div className={`w-3.5 h-3.5 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                          form.refundMethod === opt.id ? 'border-[#c9a84c]' : 'border-[#333]'
                        }`}>
                          {form.refundMethod === opt.id && <div className="w-1.5 h-1.5 bg-[#c9a84c]" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#1a1a1a] tracking-wide">{opt.title}</p>
                          <p className="text-[10px] text-[#aaa] mt-0.5">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer form */}
              <div className="sticky bottom-0 bg-white border-t border-[#e8e8e8] px-6 py-4 flex flex-col sm:flex-row gap-3">
                <button onClick={handleSubmit}
                  className="flex-1 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
                >
                  Enviar solicitud
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button onClick={() => setMostrarFormSolicitud(false)}
                  className="flex-1 border border-[#e8e8e8] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all"
                >Cancelar</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default UserDevoluciones;