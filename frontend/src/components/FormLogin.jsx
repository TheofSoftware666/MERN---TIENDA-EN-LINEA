import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clientAxios from '../config/axios.jsx';
import { FaHeart, FaGem, FaGift } from 'react-icons/fa6';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      console.log("Correo & password invalidos");
      return;
    }

    if (!email.includes('@')) {
      console.log("Correo invalido.");
      return;
    }

    try {
      const response = await clientAxios.post('/Login', { email, password });
      localStorage.setItem('ape_token', response.data.token);

      setTimeout(() => {
        console.log("Bienvenido");
        navigate('/Productos');
      }, 1700);

    } catch (error) {
      console.warn(error.response?.data?.msg);
      if (error.response?.data?.msg?.includes('verificada')) {
        setTimeout(() => {
          navigate('/Auth/confirmar');
        }, 1500);
        return;
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full border border-pink-100">
        
        {/* Formulario login */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-12 lg:py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-800 mb-2">✨ Bienvenida de nuevo</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
          </div>

          <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-500">
                <input type="checkbox" className="mr-2 rounded border-pink-300 text-pink-500 focus:ring-pink-400" />
                Recuérdame
              </label>
              <Link to="/Auth/olvide-password" className="text-pink-500 hover:text-pink-700 transition">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
            >
              Iniciar Sesión
            </button>

            <p className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?
              <Link to="/Auth" className="text-pink-500 hover:text-pink-700 ml-1 font-medium">
                Crea una cuenta aquí
              </Link>
            </p>
          </form>
        </div>

        {/* Sección derecha - Beneficios cosméticos */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-pink-500 to-rose-400 p-8 lg:max-w-sm w-full text-white">
          <div>
            <h3 className="text-2xl font-light mb-4 flex items-center gap-2">
              <FaHeart className="text-pink-200" /> ¡Tienes la oportunidad!
            </h3>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaGift className="text-3xl text-yellow-300" />
                  <h2 className="text-xl font-semibold">🎁 ¡Tus compras ahora valen más!</h2>
                </div>
                <p className="text-pink-50 text-base font-light leading-relaxed">
                  Disfruta promociones exclusivas, accede a descuentos especiales y consigue cupones en cada compra. 
                  <span className="block mt-2 font-medium text-white">¡Sé la primera en enterarte!</span>
                </p>
                <button className="mt-6 w-full bg-white text-pink-600 font-semibold py-3 rounded-xl hover:bg-pink-50 transition-all shadow-md flex items-center justify-center gap-2">
                  <FaGem /> Quiero mis descuentos
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-evenly text-sm text-pink-100 mt-8">
            <a href="#" className="hover:text-white transition">Acerca de</a>
            <a href="#" className="hover:text-white transition">Términos</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;