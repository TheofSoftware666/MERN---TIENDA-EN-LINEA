import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth.jsx';

const FormLogin = () => {

    const [ email, SetEmail ] = useState('');
    const [ password, SetPassword ] = useState('');
    const Navigation = useNavigate();

    const HandleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')){
            console.log("Correo & password invalidos");
            return;
        }

        if(!email.includes('@')){
            console.log("Correo invalido.");
            return;
        }

        // if(password.length < 6){
        //     console.log("password invalido");
        //     return;
        // }

        try{
            // Petición
            const url = "http://localhost:3001/tienda/api/Login";
            const response = await axios.post(url, { email, password });
            console.log(response.data.token);

            localStorage.setItem('ape_token', response.data.token);

            setTimeout(() => {
                console.log("Bienvenido");
                Navigation('/');
            }, 1700);

        }catch(error){
            
            console.log(error.response.data.msg);

            if(error.response.data.msg.includes('verificada')){
                
                setTimeout(() => {

                    Navigation('/Auth/confirmar');

                }, 1500);

                return;
            }

            console.log(error.response.data.msg);
        }
    }

  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2 py-8">
        {/* Contenedor interior */}
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded overflow-hidden max-w-5xl w-full">
            {/* Formulario login */}
            <div className="flex flex-col justify-center items-center w-full px-8 py-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">👋 ¡Nos alegra verte de nuevo!</h2>

            <form className="w-full max-w-md space-y-5" onSubmit={HandleSubmit}>
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => SetEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => SetPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                />
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Recuérdame
                </label>
                <Link to="/Auth/olvide-password" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>

                <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
                >
                Inicar Sesion
                </button>

                <p className="text-center text-sm text-gray-600">
                ¿No tienes cuenta?
                <Link to="/Auth" className="text-blue-500 hover:underline"> Crea una cuenta aqui</Link>
                </p>
            </form>
            </div>

            {/* Sección Derecha */}
            <div className="flex flex-col justify-between bg-blue-600 p-8 lg:max-w-sm w-full">
            <h3 className='text-2xl font-bold text-gray-100'>¡Tienes la oportunidad!</h3>

            <div className="space-y-6">
                <div className="flex items-start">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl shadow-md text-center">
                <h2 className="text-xl font-bold text-white mb-2 animate-pulse">🎁 ¡Tus compras ahora valen más!</h2>
                <p className="text-gray-100 text-base font-medium leading-relaxed">
                    <span className="font-semibold text-yellow-300">Disfruta promociones exclusivas</span>, accede a <span className="underline text-white">descuentos especiales</span> y consigue <span className="text-green-300 font-semibold">cupones en cada compra</span>.
                </p>
                <button className="mt-4 bg-yellow-400 text-black font-bold py-2 px-6 rounded-full shadow hover:bg-yellow-300 transition-all">
                    ¡Quiero mis descuentos!
                </button>
                </div>
                </div>
            </div>

            <div className="flex justify-evenly text-sm text-gray-100 mt-8">
                <a href="#" className="hover:underline">Acerca de</a>
                <a href="#" className="hover:underline">Términos</a>
                <a href="#" className="hover:underline">Contacto</a>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default FormLogin