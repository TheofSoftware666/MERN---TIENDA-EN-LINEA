import { Outlet, Navigate } from "react-router-dom"
import AdminHeader from "../components/AdminHeader.jsx"
import AdminSideBar from "../components/AdminSideBar.jsx"
import useAuth from "../hooks/useAuth.jsx"

const AdminLayout = () => {

  const { Auth, cargando } = useAuth();
  
  if(cargando) return 'cargando...';
  
  return (
    <>
      <div className="flex align-top items-start w-full h-screen">
        <div className="flex flex-col justify-between w-[15%]">
          <AdminSideBar/>
        </div>
        <div className="flex flex-col justify-between w-[85%]">
          <AdminHeader/>
          <div className="bg-gray-100 px-5 py-3">
            {Auth[0]?.usuarioId ? <Outlet/>  : <Navigate to="/" />}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout