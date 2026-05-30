import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios';

import {
  Package, Clock, CheckCircle, XCircle, Truck,
  RefreshCw, Eye, Search, Calendar, CreditCard,
  MapPin, User, Phone, Mail, ShoppingBag,
  ChevronRight, Star, AlertCircle, DollarSign
} from 'lucide-react';

const UserPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

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
      if (!token) throw new Error('No se encontró token de autenticación');

      const response = await clientAxios.get(`/Pedidos`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });

      if (!response.data.data.ok) { console.log('Error:', response.data.data.message); return []; }
      if (!response.data.data.data || response.data.data.data.length === 0) return [];

      const pedidosNormalizados = response.data.data.data.map(p => ({
        ...p,
        total: Number(p.total),
        productos: Number(p.productos),
        estado:
          p.estado === 'processing' ? 'procesando' :
          p.estado === 'shipped' ? 'en_camino' :
          p.estado === 'delivered' ? 'entregado' : p.estado,
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

  const formatearFecha = (fecha) => new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const getEstadoInfo = (estado) => {
    switch (estado) {
      case 'entregado':   return { color: 'border-[#7abf8a]/40 text-[#7abf8a] bg-[#7abf8a]/5', icon: <CheckCircle size={13} />, texto: 'Entregado' };
      case 'en_camino':   return { color: 'border-[#c9a84c]/40 text-[#c9a84c] bg-[#c9a84c]/5', icon: <Truck size={13} />, texto: 'En camino' };
      case 'procesando':  return { color: 'border-blue-500/30 text-blue-400 bg-blue-500/5', icon: <RefreshCw size={13} />, texto: 'Procesando' };
      case 'pendiente':   return { color: 'border-amber-500/30 text-amber-400 bg-amber-500/5', icon: <Clock size={13} />, texto: 'Pendiente' };
      case 'cancelado':   return { color: 'border-red-500/30 text-red-400 bg-red-500/5', icon: <XCircle size={13} />, texto: 'Cancelado' };
      default:            return { color: 'border-[#e8e8e8] text-[#888] bg-white', icon: <Package size={13} />, texto: 'Desconocido' };
    }
  };

  const handleVerDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
    setMostrarModal(true);
  };

  // ── Filtros config ──
  const filtros = [
    { id: 'todos',      label: 'Todos' },
    { id: 'entregado',  label: 'Entregados' },
    { id: 'en_camino',  label: 'En camino' },
    { id: 'pendiente',  label: 'Pendientes' },
  ];

  return (
    <section className="w-full min-h-screen bg-white p-4 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
            Mi cuenta
          </p>
          <h1 className="text-3xl font-light text-[#1a1a1a] mb-1">Mis Pedidos</h1>
          <p className="text-[#aaa] text-xs tracking-wide">
            Revisa el historial y estado de todos tus pedidos
          </p>
        </div>

        {/* ── Filtros y búsqueda ── */}
        <div className="bg-white border border-[#e8e8e8] p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">

            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por ID o nombre..."
                className="w-full bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] placeholder-[#bbb] pl-9 pr-4 py-2.5 text-sm outline-none transition-colors"
              />
            </div>

            {/* Botones de filtro */}
            <div className="flex flex-wrap gap-2">
              {filtros.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFiltroEstado(f.id)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                    filtroEstado === f.id
                      ? 'bg-[#c9a84c] text-[#0d0d0d]'
                      : 'border border-[#e8e8e8] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Lista de pedidos ── */}
        <div className="space-y-3">
          {pedidosFiltrados.map((pedido) => {
            const estadoInfo = getEstadoInfo(pedido.estado);
            return (
              <div
                key={pedido.id}
                className="bg-white border border-[#e8e8e8] hover:border-[#c9a84c]/40 p-5 transition-all duration-200 cursor-pointer group"
                onClick={() => handleVerDetalle(pedido)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1a1a1a] tracking-wide mb-0.5">{pedido.id}</h3>
                        <p className="text-[11px] text-[#aaa] tracking-wide">{formatearFecha(pedido.fecha)}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] font-bold tracking-widest uppercase ${estadoInfo.color}`}>
                        {estadoInfo.icon}
                        {estadoInfo.texto}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2">
                        <User size={13} className="text-[#c9a84c]" />
                        <span className="text-xs text-[#888]">{pedido.cliente}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={13} className="text-[#c9a84c]" />
                        <span className="text-xs text-[#888]">
                          {pedido.productos} producto{pedido.productos !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={13} className="text-[#c9a84c]" />
                        <span className="text-xs font-bold text-[#1a1a1a]">
                          ${pedido.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
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

          {/* Estado vacío */}
          {pedidosFiltrados.length === 0 && (
            <div className="text-center py-16 bg-white border border-[#e8e8e8]">
              <div className="w-14 h-14 border border-[#e8e8e8] flex items-center justify-center mx-auto mb-5">
                <Package size={22} className="text-[#bbb]" />
              </div>
              <p className="text-[#aaa] text-xs tracking-widest uppercase mb-1">Sin resultados</p>
              <p className="text-[#bbb] text-xs mb-6">
                {busqueda ? 'No se encontraron pedidos con esa búsqueda' : 'Aún no has realizado ningún pedido'}
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all">
                Ir a comprar
              </button>
            </div>
          )}
        </div>

        {/* ── Modal detalle ── */}
        {mostrarModal && pedidoSeleccionado && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 py-6">
            <div className="relative bg-white border border-[#e8e8e8] w-full max-w-4xl max-h-[90vh] overflow-y-auto">

              {/* Header modal */}
              <div className="sticky top-0 bg-white border-b border-[#e8e8e8] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-0.5">
                    Detalle del pedido
                  </p>
                  <h2 className="text-sm font-semibold text-[#1a1a1a] tracking-wide">
                    {pedidoSeleccionado.id}
                  </h2>
                </div>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[#e8e8e8] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] transition-all"
                  aria-label="Cerrar"
                >
                  <XCircle size={15} />
                </button>
              </div>

              {/* Contenido modal */}
              <div className="p-6 space-y-6">

                {/* Estado + total */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const estadoInfo = getEstadoInfo(pedidoSeleccionado.estado);
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-bold tracking-widest uppercase ${estadoInfo.color}`}>
                          {estadoInfo.icon}
                          {estadoInfo.texto}
                        </span>
                      );
                    })()}
                    {pedidoSeleccionado.tracking && (
                      <div className="flex items-center gap-2 border border-[#e8e8e8] px-3 py-1.5">
                        <Truck size={13} className="text-[#c9a84c]" />
                        <span className="text-[10px] text-[#999] tracking-wide">
                          Tracking: {pedidoSeleccionado.tracking}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#c9a84c]">
                      ${pedidoSeleccionado.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-[#aaa] tracking-wider uppercase">Total del pedido</p>
                  </div>
                </div>

                {/* Info cliente + dirección */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#e8e8e8] p-5">
                    <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-4">
                      Información del cliente
                    </p>
                    <div className="space-y-2.5">
                      {[
                        { icon: <User size={13} />, value: pedidoSeleccionado.cliente },
                        { icon: <Mail size={13} />, value: pedidoSeleccionado.email },
                        { icon: <Phone size={13} />, value: pedidoSeleccionado.telefono },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <span className="text-[#c9a84c]">{item.icon}</span>
                          <span className="text-xs text-[#888]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-[#e8e8e8] p-5">
                    <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-4">
                      Dirección de entrega
                    </p>
                    <div className="flex items-start gap-2.5 mb-4">
                      <MapPin size={13} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#888] leading-relaxed">
                        {pedidoSeleccionado.direccionTexto}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-[#e8e8e8] flex items-center gap-2.5">
                      <CreditCard size={13} className="text-[#c9a84c]" />
                      <span className="text-xs text-[#888]">{pedidoSeleccionado.metodoPago}</span>
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div>
                  <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-4 flex items-center gap-2">
                    <ShoppingBag size={13} />
                    Productos ({pedidoSeleccionado.productos})
                  </p>
                  <div className="border border-[#e8e8e8] overflow-hidden">
                    <div className="divide-y divide-[#f0f0f0]">
                      {pedidoSeleccionado.productosDetalle.map((producto, index) => (
                        <div key={index} className="flex justify-between items-center px-5 py-4 hover:bg-white transition-colors">
                          <div>
                            <p className="text-xs font-semibold text-[#1a1a1a]">{producto.nombre}</p>
                            <p className="text-[10px] text-[#aaa] tracking-wide mt-0.5">Cantidad: {producto.cantidad}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-[#1a1a1a]">
                              ${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-[10px] text-[#aaa]">
                              Total: ${(producto.cantidad * producto.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center px-5 py-4 bg-white border-t border-[#e8e8e8]">
                      <span className="text-xs font-semibold text-[#1a1a1a] tracking-widest uppercase">Total del pedido</span>
                      <span className="text-lg font-bold text-[#c9a84c]">
                        ${pedidoSeleccionado.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pedidoSeleccionado.fecha && (
                    <div className="bg-white border border-[#e8e8e8] p-4 flex items-center gap-3">
                      <Calendar size={16} className="text-[#c9a84c] flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold">Fecha del pedido</p>
                        <p className="text-xs text-[#888] mt-0.5">{formatearFecha(pedidoSeleccionado.fecha)}</p>
                      </div>
                    </div>
                  )}
                  {pedidoSeleccionado.fechaEntrega && (
                    <div className="bg-white border border-[#7abf8a]/20 p-4 flex items-center gap-3">
                      <CheckCircle size={16} className="text-[#7abf8a] flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#7abf8a] tracking-widest uppercase font-semibold">Fecha de entrega</p>
                        <p className="text-xs text-[#888] mt-0.5">{formatearFecha(pedidoSeleccionado.fechaEntrega)}</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Footer modal */}
              <div className="sticky bottom-0 bg-white border-t border-[#e8e8e8] px-6 py-4 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all">
                  Descargar factura
                </button>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 border border-[#e8e8e8] hover:border-[#c9a84c] text-[#888] hover:text-[#c9a84c] py-3 font-bold text-xs tracking-[0.2em] uppercase transition-all"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default UserPedidos;