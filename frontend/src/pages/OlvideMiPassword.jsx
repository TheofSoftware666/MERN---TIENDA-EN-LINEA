import clientAxios from "../config/axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHeart, FaLock } from "react-icons/fa6";

const OlvideMiPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    // Validaciones
    if (email === '') {
      console.log("El correo ingresado es invalido");
      return;
    }

    if (email.indexOf('@') === -1) {
      console.log("El correo ingresado es invalido");
      return;
    }

    try {
      const response = await clientAxios.post("/TokenPassword", { email });
      console.log(response);
      // Aquí podrías mostrar una alerta de éxito
    } catch (e) {
      console.warn(e);
      // Aquí podrías mostrar mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full border border-pink-100">

        {/* Formulario de recuperación */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-12 lg:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <FaLock className="text-pink-500 text-2xl" />
            </div>
            <h2 className="text-3xl font-light text-gray-800 mb-2">🔒 ¿Olvidaste tu contraseña?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full mb-4"></div>
            <p className="text-sm text-gray-500 max-w-md">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Correo electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-pink-300 text-sm" />
                </div>
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  onChange={e => setEmail(e.target.value.toLowerCase().trim())}
                  value={email}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-rose-50/30 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
            >
              Enviar enlace de recuperación
            </button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya recordaste tu contraseña?
              <Link to="/Auth/inicio-sesion" className="text-pink-500 hover:text-pink-700 ml-1 font-medium">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>

        {/* Sección derecha - Inspiración */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-pink-500 to-rose-400 p-8 w-full lg:max-w-sm text-white">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FaHeart className="text-pink-200 text-2xl" />
              <h3 className="text-2xl font-light">📬 Recupera el acceso</h3>
            </div>
            <p className="text-pink-50 text-base leading-relaxed">
              Recuerda usar un correo registrado para recibir tu enlace de recuperación.
              Si no lo encuentras en tu bandeja principal, revisa la carpeta de spam.
            </p>
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <p className="text-sm text-pink-100">
                <span className="font-semibold">✨ ¿Problemas?</span> Contáctanos a soporte@cosmetica.com y te ayudaremos encantados.
              </p>
            </div>
          </div>

          <div className="flex justify-evenly text-sm text-pink-100 mt-8">
            <a href="#" className="hover:text-white transition">Soporte</a>
            <a href="#" className="hover:text-white transition">Política</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlvideMiPassword;