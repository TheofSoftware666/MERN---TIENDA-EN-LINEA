import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  RefreshCw,
  Box,
  Mail,
  Tag,
  Truck,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';

const AdminSideBar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/Admin",
      icon: <LayoutDashboard size={20} />,
      description: "Ventas, pedidos, clientes y análisis",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Pedidos",
      path: "/Admin/Pedidos",
      icon: <Package size={20} />,
      description: "Gestión de pedidos y seguimiento",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Devoluciones",
      path: "/Admin/Devoluciones",
      icon: <RefreshCw size={20} />,
      description: "Procesar y gestionar devoluciones",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      title: "Productos",
      path: "/Admin/Productos",
      icon: <Box size={20} />,
      description: "Catálogo, categorías y stock",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    // {
    //   title: "Email Marketing",
    //   path: "/Admin/EmailMarketing",
    //   icon: <Mail size={20} />,
    //   description: "Campañas y comunicación",
    //   color: "from-pink-500 to-rose-500",
    //   bgColor: "bg-pink-50",
    //   iconColor: "text-pink-600"
    // },
    // {
    //   title: "Cupones",
    //   path: "/Admin/Cupones",
    //   icon: <Tag size={20} />,
    //   description: "Descuentos y promociones",
    //   color: "from-red-500 to-pink-500",
    //   bgColor: "bg-red-50",
    //   iconColor: "text-red-600"
    // },
    {
      title: "Paqueterías & Envíos",
      path: "/Admin/PaqueteriasYEnvios",
      icon: <Truck size={20} />,
      description: "Logística y seguimiento",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    }
  ];

  const bottomItems = [
    {
      title: "Configuración",
      path: "/Admin/Configuracion",
      icon: <Settings size={20} />,
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600"
    },
    {
      title: "Salir del Panel",
      path: "/",
      icon: <LogOut size={20} />,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    }
  ];

  const isActive = (path) => {
    if (path === "/Admin" && location.pathname === "/Admin") return true;
    if (path !== "/Admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className={`flex flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      
      {/* Header del Sidebar */}
      <div className="p-5 border-b border-gray-700/50">
        <div className={`flex items-center gap-3 transition-all duration-300 ${!expanded && 'justify-center'}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield size={22} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          
          {expanded && (
            <div className="flex-1 overflow-hidden">
              <h2 className="text-lg font-bold text-white truncate">Admin Panel</h2>
              <p className="text-xs text-gray-400 font-medium truncate">Ecommerce Pro</p>
            </div>
          )}
          
          {/* <button 
            onClick={() => setExpanded(!expanded)}
            className={`p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors ${!expanded && 'absolute -right-3 top-6 bg-gray-800 shadow-lg'}`}
          >
            <ChevronRight size={18} className={`transition-transform duration-300 ${!expanded ? 'rotate-180' : ''}`} />
          </button> */}
        </div>
      </div>

      {/* Menú Principal */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                active 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg border border-gray-700' 
                  : 'hover:bg-gray-800/50 hover:border-gray-700/50'
              } border border-transparent`}
              title={expanded ? '' : `${item.title}: ${item.description}`}
            >
              <div className={`relative flex-shrink-0 p-2.5 rounded-lg ${active ? item.bgColor : 'bg-gray-800/80 group-hover:bg-gray-700/80'} transition-colors`}>
                <div className={`${active ? item.iconColor : 'text-gray-400 group-hover:text-gray-300'}`}>
                  {item.icon}
                </div>
                {active && (
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                )}
              </div>
              
              {expanded && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium text-sm ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.title}
                    </span>
                    {active && (
                      <ChevronRight size={14} className="text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Información de Store */}
      {/* {expanded && (
        <div className="mx-3 mb-4 p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-300">Estado Store</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Ventas hoy</p>
              <p className="text-sm font-semibold text-white">$2,450.00</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Pedidos</p>
              <p className="text-sm font-semibold text-white">12</p>
            </div>
          </div>
        </div>
      )} */}

      {/* Menú Inferior */}
      <div className="px-3 py-4 border-t border-gray-700/50 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50`}
          >
            <div className={`flex-shrink-0 p-2.5 rounded-lg ${item.bgColor}`}>
              <div className={item.iconColor}>
                {item.icon}
              </div>
            </div>
            
            {expanded && (
              <span className="font-medium text-sm text-gray-300 group-hover:text-white">
                {item.title}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Perfil Mini */}
      <div className={`p-4 border-t border-gray-700/50 ${!expanded && 'flex justify-center'}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-700"
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
              alt="Usuario"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          
          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Alexandra G.</p>
              <p className="text-xs text-gray-400 truncate">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;