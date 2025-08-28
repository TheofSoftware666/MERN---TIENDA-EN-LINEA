import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const OlvideMiPassword = () => {

  const [ email, SetEmail ] = useState('');

  const HandleSubmit = async e => {
    
    // Evitar enviar el formulario
    e.preventDefault();

    // Validaciones
    if(email == ''){
      console.log("El correo ingresado es invalido");
      return;
    }

    if(email.indexOf('@') == -1){
      console.log("El correo ingresado es invalido");
      return;
    }

    try{
      const url = "http://localhost:3001/tienda/api/TokenPassword";
      const response = await axios.post(url, { email });
      console.log(response);

    }catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded overflow-hidden max-w-4xl w-full">

      {/* Formulario de recuperación */}
      <div className="flex flex-col justify-center items-center w-full px-8 py-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🔒 ¿Olvidaste tu contraseña?</h2>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <form className="w-full max-w-md space-y-5" onSubmit={HandleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            onChange={e => SetEmail(e.target.value.toLowerCase().trim())}
            value={email}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
        >
          Enviar enlace de recuperación
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya recordaste tu contraseña?
          <Link to="/Auth/inicio-sesion" className="text-blue-500 hover:underline ml-1">Inicia sesión</Link>
        </p>
      </form>
      </div>

      {/* Sección visual */}
      <div className="hidden lg:flex flex-col justify-center bg-blue-600 p-10 w-full lg:max-w-sm">
      <h3 className="text-2xl font-bold text-white mb-6">📬 Recupera el acceso</h3>
      <p className="text-gray-100 text-base leading-relaxed">
        Recuerda usar un correo registrado para recibir tu enlace de recuperación.
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

export default OlvideMiPassword