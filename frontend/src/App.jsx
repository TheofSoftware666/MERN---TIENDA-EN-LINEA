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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home/> }/>
          <Route path='Productos' element={<Productos/> }/>
          <Route path='Producto/:id' element={<Producto/> }/>
        </Route>
        
        <Route path="/Admin" element={<AdminLayout />}>
          <Route index element={<AdminDashBoard/> }/>
        </Route>

        <Route path="/Auth" element={<AuthLayout />}>
          <Route index element={<Registro/> }/>
          <Route path='inicio-sesion' element={<Login/> }/>
          <Route path='olvide-password' element={<OlvidePassword/> }/>
          <Route path='confirmar/:id' element={<ConfirmarCuenta/> }/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
