import { Outlet, Navigate } from "react-router-dom"
import AdminHeader from "../components/AdminHeader.jsx"
import AdminSideBar from "../components/AdminSideBar.jsx"
import useAuth from "../hooks/useAuth.jsx"
import { useState } from "react"

const AdminLayout = () => {
  const { Auth, cargando } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if(cargando) return 'cargando...';

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar - mobile overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        {/* fondo oscuro */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50" 
          onClick={() => setSidebarOpen(false)}
        ></div>
        {/* sidebar móvil */}
        <div className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <AdminSideBar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-[15%] border-r border-gray-200 bg-white">
        <AdminSideBar/>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-gray-100 px-5 py-3">
          {Auth[0]?.usuarioId ? <Outlet/>  : <Navigate to="/" />}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
