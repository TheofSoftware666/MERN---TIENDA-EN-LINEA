import { Outlet } from 'react-router-dom';
import Header from '../components/header.jsx';
import Footer from '../components/Footer.jsx';
import LighBox from '../components/LighBox.jsx';
import SideCarrito from '../components/SideCarrito.jsx';
import SideCheckOut from '../components/SideCheckOut.jsx';

const AuthLayout = () => {
  return (
    <>
        {/* <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-md">
            <LighBox />
          </div>
        </div> */}
        
      {/* <div className="fixed inset-0 z-50 flex">      
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
        <div className="ml-auto w-full max-w-sm bg-white h-full shadow-lg z-50 overflow-y-auto transition-transform transform translate-x-0">
          {/* Recien contendio del sidebar *\/}
          <SideCarrito/>
          {/* <SideCheckOut/> */}            
          {/* Fin del contenido del SideBar *\/}
        </div>
      </div> */}
        
        <Header />

        <Outlet />

        <Footer /> 
    </>
  )
}

export default AuthLayout