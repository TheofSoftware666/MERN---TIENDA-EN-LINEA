import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../config/axios.jsx";
import Alerta from "./Alerta.jsx";

const FormRegistrarte = () => {
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetir , setRepetir ] = useState('');

    const [ alerta, setAlerta ] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email.trim(), password.trim(), repetir.trim()].includes('')){
            setAlerta({ msg: 'Es necesario completar todos los campos.', tipo : 'Error'});
            return;
        }

        if(password !== repetir){
            setAlerta({ msg: 'No coincide el ingreso de contraseña con la repetida', tipo : 'Error'});
            return;
        }

        if(password.length < 8){
            setAlerta({msg: 'La contraseña debera de contener minimo 8 caracteres', tipo : 'Error'});
            return;
        }

        setAlerta({msg: 'Estamos preparando todo para ti...', tipo: 'Info'});

        try{
            const respuesta = await clientAxios.post('/Registrar', {nombre ,email, password, repetir });
            setTimeout(() => {
                setAlerta({msg : respuesta.data.msg + nombre, tipo: 'Exito'});
            navigate('/Auth/confirmar');
            }, 1000);
            
        }catch(error){
            setAlerta({ msg: error.response.data.msg, tipo: 'Error'});
        }
    }

  return (
    <>
       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
        {/* Contenedor interior */}
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
            
            {/* Sección izquierda */}
            <div className="flex flex-col justify-between bg-gray-50 p-8 lg:max-w-sm w-full">
            <img
                src="./../public/img/banner-facebook-builtech.png"
                alt="Banner Promocional"
                title="Mantente informado de nuestras promociones"
                className="w-full h-auto rounded-lg mb-6"
            />

            <div className="space-y-6">
                <div className="flex items-start">
                <img src="./../public/img/icons8-verificado-96.png" alt="Verificado" className="w-6 h-6 mt-1" />
                <div className="ml-3">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">🎁 Ahorra más cada vez que compras  </h3>
                    <p className="text-sm text-gray-500">Te damos acceso a precios preferenciales solo por iniciar sesión.</p>
                </div>
                </div>
                <div className="flex items-start">
                <img src="./../public/img/icons8-verificado-96.png" alt="Verificado" className="w-6 h-6 mt-1" />
                <div className="ml-3">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">🚀 Accede antes que nadie</h3>
                    <p className="text-sm text-gray-500">Sé el primero en conocer y comprar nuestras nuevas colecciones</p>
                </div>
                </div>
                <div className="flex items-start">
                <img src="./../public/img/icons8-verificado-96.png" alt="Verificado" className="w-6 h-6 mt-1" />
                <div className="ml-3">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">🎉 Bonos y regalos sorpresa </h3>
                    <p className="text-sm text-gray-500">Tenemos detalles solo para nuestros clientes frecuentes.</p>
                </div>
                </div>
            </div>

            <div className="flex justify-evenly text-sm text-gray-500 mt-8">
                <a href="#" className="hover:underline">Acerca de</a>
                <a href="#" className="hover:underline">Términos</a>
                <a href="#" className="hover:underline">Contacto</a>
            </div>
            </div>

            {/* Formulario login */}
            <div className="flex flex-col justify-center items-center w-full px-8 py-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">¡Crea tu cuenta y empieza a disfrutar!</h2>

            <Alerta alerta={alerta}/>
            <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                <input
                    type="text"
                    placeholder="ingresa tu nombre y apellido"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    value={email}
                    onChange={e => setEmail(e.target.value.trim().toLowerCase())}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Crea una contraseña</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    value={password}
                    onChange={e => setPassword(e.target.value.trim())}
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Repite la contraseña</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    value={repetir}
                    onChange={e => setRepetir(e.target.value.trim())}
                />
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">

                </div>

                <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
                >
                Crear Cuenta
                </button>

                <p className="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?
                <Link to="/Auth/inicio-sesion" className="text-blue-500 hover:underline"> Inicia sesion aqui</Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    </>
  )
}

export default FormRegistrarte