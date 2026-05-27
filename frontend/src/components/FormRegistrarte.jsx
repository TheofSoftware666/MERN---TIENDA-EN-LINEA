import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../config/axios.jsx";
import Alerta from "./Alerta.jsx";
import { FaHeart, FaGift, FaRocket, FaGem } from "react-icons/fa6";

const FormRegistrarte = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetir, setRepetir] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email.trim(), password.trim(), repetir.trim()].includes('')) {
      setAlerta({ msg: 'Es necesario completar todos los campos.', tipo: 'Error' });
      return;
    }

    if (password !== repetir) {
      setAlerta({ msg: 'No coincide el ingreso de contraseña con la repetida', tipo: 'Error' });
      return;
    }

    if (password.length < 8) {
      setAlerta({ msg: 'La contraseña deberá contener mínimo 8 caracteres', tipo: 'Error' });
      return;
    }

    setAlerta({ msg: 'Estamos preparando todo para ti...', tipo: 'Info' });

    try {
      const respuesta = await clientAxios.post('/Registrar', { nombre, email, password, repetir });
      setTimeout(() => {
        setAlerta({ msg: respuesta.data.msg + nombre, tipo: 'Exito' });
        navigate('/Auth/confirmar');
      }, 1000);
    } catch (error) {
      setAlerta({ msg: error.response?.data?.msg || 'Error al registrar', tipo: 'Error' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full border border-pink-100">
        
        {/* Sección izquierda - Beneficios cosméticos */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-pink-50 to-rose-50 p-8 lg:max-w-sm w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <FaGem className="text-pink-500 text-2xl" />
            </div>
            <h3 className="text-xl font-light text-gray-800 mb-2">✨ ¡Bienvenida a la belleza!</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <FaGift className="text-pink-500 text-sm" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">🎁 Ahorra más cada vez que compras</h3>
                <p className="text-sm text-gray-500">Te damos acceso a precios preferenciales solo por iniciar sesión.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <FaRocket className="text-pink-500 text-sm" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">🚀 Accede antes que nadie</h3>
                <p className="text-sm text-gray-500">Sé la primera en conocer y comprar nuestras nuevas colecciones.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                <FaHeart className="text-pink-500 text-sm" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">🎉 Bonos y regalos sorpresa</h3>
                <p className="text-sm text-gray-500">Tenemos detalles solo para nuestras clientas frecuentes.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-evenly text-sm text-gray-400 mt-8">
            <a href="#" className="hover:text-pink-500 transition">Acerca de</a>
            <a href="#" className="hover:text-pink-500 transition">Términos</a>
            <a href="#" className="hover:text-pink-500 transition">Contacto</a>
          </div>
        </div>

        {/* Formulario de registro */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-12 lg:py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-800 mb-2">✨ Crea tu cuenta</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm mt-3">y empieza a disfrutar de beneficios exclusivos</p>
          </div>

          <Alerta alerta={alerta} />

          <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Nombre completo</label>
              <input
                type="text"
                placeholder="Tu nombre y apellido"
                className="w-full px-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
                value={email}
                onChange={e => setEmail(e.target.value.trim().toLowerCase())}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Contraseña</label>
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
                value={password}
                onChange={e => setPassword(e.target.value.trim())}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Repite la contraseña</label>
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
                value={repetir}
                onChange={e => setRepetir(e.target.value.trim())}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
            >
              Crear Cuenta
            </button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya tienes una cuenta?
              <Link to="/Auth/inicio-sesion" className="text-pink-500 hover:text-pink-700 ml-1 font-medium">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegistrarte;