import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';

const RestablecerPassword = () => {

  const { token } = useParams();

  useEffect( () => {
    const comprobarToken = async () => {

      try{
        const url = "http://localhost:3001/tienda/api/ActualizarPassword/" + token;
        const response = await axios.get(url);

        console.log(response.data);
      }catch(error){
        console.log(error);
      }
    }

    comprobarToken();
  }, []);

  

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
  <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded overflow-hidden max-w-4xl w-full">

    {/* Formulario nueva contraseña */}
    <div className="flex flex-col justify-center items-center w-full px-8 py-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🔑 Restablecer contraseña</h2>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Ingresa tu nueva contraseña y confírmala para recuperar el acceso.
      </p>

      <form action="#" className="w-full max-w-md space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Nueva contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Confirmar contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
        >
          Guardar nueva contraseña
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Recordaste tu contraseña?
          <Link to="/Auth/inicio-sesion" className="text-blue-500 hover:underline ml-1">Inicia sesión</Link>
        </p>
      </form>
    </div>

    {/* Sección visual */}
    <div className="hidden lg:flex flex-col justify-center bg-blue-600 p-10 w-full lg:max-w-sm">
      <h3 className="text-2xl font-bold text-white mb-6">🔐 Seguridad primero</h3>
      <p className="text-gray-100 text-base leading-relaxed">
        Usa una contraseña segura y única para proteger tu cuenta.
      </p>
      <div className="mt-8 flex justify-evenly text-sm text-gray-100">
        <a href="#" className="hover:underline">Soporte</a>
        <a href="#" className="hover:underline">Política</a>
        <a href="#" className="hover:underline">Contacto</a>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default RestablecerPassword