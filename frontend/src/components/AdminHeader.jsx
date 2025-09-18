import { useState } from "react";
import { Menu } from "lucide-react";

const AdminHeader = ({ onToggleSidebar }) => {

    const [openNoti, setOpenNoti] = useState(false);

  return (
    <header className="flex justify-between items-center bg-gray-50 text-gray-700 w-full px-4 lg:px-20 py-4 border-b">
      <button 
        onClick={onToggleSidebar} 
        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200"
      >
        <Menu size={24} />
      </button>
      <div className="text-gray-800 text-xl font-bold">🚀 Admin Ecommerce</div>

      <nav className="flex items-center">
        {/* Campanita de notificaciones */}
        <div className="relative">
          <button
            onClick={() => setOpenNoti(!openNoti)}
            className="flex justify-center items-center bg-gray-200 rounded-md p-2 w-10 h-10 relative"
          >
            <img
              className="w-6 h-6 object-contain"
              src="./../public/img/icon_notificar.png"
              alt="Notificaciones"
              title="Notificaciones"
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 text-xs rounded-full font-bold">
              1
            </span>
          </button>

          {/* Ventana de notificaciones */}
          {openNoti && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
              <div className="px-4 py-2 border-b bg-gray-100 text-gray-700 font-semibold">
                Notificaciones
              </div>
              <ul className="max-h-64 overflow-y-auto">
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-2">
                  <span className="text-blue-500">📦</span>
                  <p className="text-sm text-gray-600">
                    Nuevo pedido recibido #12345
                  </p>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <p className="text-sm text-gray-600">
                    Tu campaña "Regreso a Clases" está activa
                  </p>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-sm text-gray-600">
                    Stock bajo en producto: Mochila CHB-001
                  </p>
                </li>
              </ul>
              <div className="px-4 py-2 text-center border-t bg-gray-50">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver todas
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default AdminHeader