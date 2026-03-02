import { useState } from "react";
import { 
  Menu, 
  Bell, 
  Search, 
  ChevronDown,
  Package,
  CheckCircle,
  AlertTriangle,
  Settings,
  User
} from "lucide-react";

const AdminHeader = ({ onToggleSidebar }) => {
  const [openNoti, setOpenNoti] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const user = {
    name: "Alexandra García",
    role: "Administrador",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  };

  const notifications = [
    { 
      id: 1, 
      icon: <Package className="w-5 h-5" />, 
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      title: "Nuevo pedido recibido", 
      description: "Pedido #12345 por $2,450.00", 
      time: "Hace 5 min",
      read: false 
    },
    { 
      id: 2, 
      icon: <CheckCircle className="w-5 h-5" />, 
      color: "text-green-500",
      bgColor: "bg-green-50",
      title: "Pago confirmado", 
      description: "Pedido #12342 marcado como pagado", 
      time: "Hace 30 min",
      read: true 
    },
    { 
      id: 3, 
      icon: <AlertTriangle className="w-5 h-5" />, 
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      title: "Stock bajo", 
      description: "Mochila CHB-001 - 5 unidades restantes", 
      time: "Hace 2 horas",
      read: false 
    },
    { 
      id: 4, 
      icon: <CheckCircle className="w-5 h-5" />, 
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      title: "Campaña activa", 
      description: '"Regreso a Clases" está generando ventas', 
      time: "Hace 5 horas",
      read: true 
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-white via-white to-white/95 backdrop-blur-sm border-b border-gray-200/70 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        
        {/* Left Side - Menu & Brand */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar} 
            className="lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition-all duration-200"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
              <span className="text-white font-bold text-lg">AE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Admin Ecommerce
              </h1>
              <p className="text-xs text-gray-500 font-medium">Panel de control</p>
            </div>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className={`relative transition-all duration-300 ${searchOpen ? 'w-full' : 'w-48 lg:w-64'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar pedidos, productos, clientes..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 placeholder-gray-500 text-sm transition-all duration-200"
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2">
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenNoti(!openNoti);
                setOpenProfile(false);
              }}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow transition-all duration-200"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {openNoti && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setOpenNoti(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden z-50 animate-in slide-in-from-top-5 duration-200">
                  <div className="px-4 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-sm">Notificaciones</h3>
                      <span className="text-xs text-gray-300">{unreadCount} sin leer</span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3.5 border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 ${notification.bgColor} ${notification.color} rounded-xl`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm text-gray-800">{notification.title}</h4>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            {!notification.read && (
                              <div className="inline-flex items-center gap-1 mt-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-blue-600">Nuevo</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/80 border-t border-gray-200">
                    <button className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors duration-200">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenProfile(!openProfile);
                setOpenNoti(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 shadow-sm hover:shadow transition-all duration-200 group"
            >
              <div className="relative">
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                  src={user.avatar}
                  alt={user.name}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-600">{user.role}</p>
              </div>
              <ChevronDown size={16} className="hidden lg:block text-gray-500 group-hover:text-gray-700 transition-transform duration-200" />
            </button>

            {/* Profile Dropdown */}
            {openProfile && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setOpenProfile(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden z-50 animate-in slide-in-from-top-5 duration-200">
                  <div className="px-4 py-4 bg-gradient-to-r from-gray-900 to-gray-800">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div>
                        <h3 className="text-white font-semibold text-sm">{user.name}</h3>
                        <p className="text-gray-300 text-xs">{user.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-150">
                      <User size={18} className="text-gray-500" />
                      <span>Mi perfil</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-150">
                      <Settings size={18} className="text-gray-500" />
                      <span>Configuración</span>
                    </a>
                    
                    <div className="border-t border-gray-200 my-2" />
                    
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/80 transition-colors duration-150">
                      <span>Cerrar sesión</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader;