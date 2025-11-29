import { BrowserRouter, Routes , Route} from 'react-router-dom';

// Layout 
import AuthLayout from './layout/AuthLayout.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import HomeLayout from './layout/HomeLayout.jsx';

// Pages
import Home from './pages/Home.jsx';
import Registro from './pages/Registro.jsx';
import Login from './pages/Login.jsx';
import OlvidePassword from './pages/OlvideMiPassword.jsx';
import ConfirmarCuenta from './pages/ConfirmarCuenta.jsx'
import AdminDashBoard from './pages/AdminDashBoard.jsx';
import Productos from './pages/Productos.jsx';
import Producto from './pages/Producto.jsx';
import AdminPedidos from './pages/AdminPedidos.jsx';
import AdminDevoluciones from './pages/AdminDevoluciones.jsx';
// import AdminAddProducto from './pages/AdminAddProducto.jsx';
import AdminProductos from './pages/AdminProductos.jsx';
import AdminEmailMarketing from './pages/AdminEmailMarketing.jsx';
import AdminCupones from './pages/AdminCupones.jsx';
import AdminLogistica from './pages/AdminLogistica.jsx';
import AdminConfiguracion from './pages/AdminConfiguracion.jsx';
import RestablecerPassword from './pages/RestablecerPasswrod.jsx';
import Error from './pages/Error.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home/> }/>
          <Route path='Productos' element={<Productos/> }/>
          <Route path='Producto/:id' element={<Producto/> }/>
        </Route>
        
        <Route path="/Admin" element={<AdminLayout />}>
            <Route index element={<AdminDashBoard/> }/> 
            <Route path='Pedidos' element={<AdminPedidos/> }/>
            <Route path='Devoluciones' element={<AdminDevoluciones/> }/>
            <Route path='Productos' element={<AdminProductos/> }/>
            <Route path='EmailMarketing' element={<AdminEmailMarketing/> }/>
            <Route path='Cupones' element={<AdminCupones/> }/>
            <Route path='PaqueteriasYEnvios' element={<AdminLogistica/> }/> 
            <Route path='Configuracion' element={<AdminConfiguracion/> }/> 
        </Route>

        <Route path="/Auth" element={<AuthLayout />}>
          <Route index element={<Registro/> }/>
          <Route path='inicio-sesion' element={<Login/> }/>
          <Route path='olvide-password' element={<OlvidePassword/> }/>
          <Route path='olvide-password/:token' element={<RestablecerPassword/> }/>
          <Route path='confirmar' element={<ConfirmarCuenta/> }/>
        </Route>
        
        <Route path='*' element={<Error/> }/>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
