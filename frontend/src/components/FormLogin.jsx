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

  const inputBase = "w-full bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] placeholder-[#bbb] px-4 py-3 text-sm outline-none transition-colors";
  const labelBase = "block text-[10px] font-semibold text-[#888] mb-1.5 tracking-widest uppercase";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 py-12">
      <div className="flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full border border-[#e8e8e8]">

        {/* ── Panel izquierdo — formulario ── */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-14 lg:py-16 bg-white">
          <div className="w-full max-w-md">

            {/* Encabezado */}
            <div className="mb-10">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
                Acceso exclusivo
              </p>
              <h2 className="text-3xl font-light text-[#1a1a1a] mb-4 leading-snug">
                Bienvenida <span className="italic font-serif text-[#c9a84c]">de nuevo</span>
              </h2>
              <p className="text-[#aaa] text-xs tracking-wide leading-relaxed">
                Inicia sesión para acceder a tus pedidos, favoritos y beneficios exclusivos.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className={labelBase}>Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={inputBase}
                />
              </div>

              <div>
                <label className={labelBase}>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputBase}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-4 h-4 border border-[#e8e8e8] peer-checked:border-[#c9a84c] peer-checked:bg-[#c9a84c] transition-all" />
                  </div>
                  <span className="text-[10px] text-[#aaa] tracking-widest uppercase group-hover:text-[#999] transition-colors">
                    Recuérdame
                  </span>
                </label>
                <Link
                  to="/Auth/olvide-password"
                  className="text-[10px] text-[#888] hover:text-[#c9a84c] tracking-widest uppercase transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all mt-2"
              >
                Iniciar Sesión
              </button>

              <p className="text-center text-xs text-[#aaa] tracking-wide pt-1">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/Auth"
                  className="text-[#c9a84c] hover:underline underline-offset-2 font-semibold"
                >
                  Crea una cuenta aquí
                </Link>
              </p>

            </form>
          </div>
        </div>

        {/* ── Panel derecho — beneficio destacado ── */}
        <div className="flex flex-col justify-between bg-white border-l border-[#e8e8e8] p-10 lg:max-w-sm w-full">

          {/* Claim superior */}
          <div>
            <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
              <FaGem className="text-[#c9a84c] text-base" />
            </div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
              Solo para miembros
            </p>
            <h3 className="text-2xl font-light text-[#1a1a1a] leading-snug mb-4">
              Tus compras<br />
              <span className="italic font-serif text-[#c9a84c]">valen más</span>
            </h3>
            <div className="w-8 h-px bg-[#c9a84c] mb-8" />

            {/* Card de beneficio */}
            <div className="border border-[#e8e8e8] p-6 relative overflow-hidden">
              {/* Decoración fondo */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#c9a84c]/5 pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                  <FaGift className="text-[#c9a84c] text-sm" />
                </div>
                <p className="text-xs font-semibold text-[#1a1a1a] tracking-wide">¡Tus compras ahora valen más!</p>
              </div>

              <p className="text-[#888] text-xs leading-relaxed mb-6">
                Disfruta promociones exclusivas, descuentos especiales y cupones en cada compra.
                <span className="block mt-2 text-[#999]">¡Sé la primera en enterarte!</span>
              </p>

              <Link
                to="/Auth"
                className="flex items-center justify-center gap-2 w-full border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0d0d0d] py-2.5 font-bold text-[10px] tracking-[0.2em] uppercase transition-all"
              >
                <FaGem className="text-xs" />
                Quiero mis descuentos
              </Link>
            </div>
          </div>

          {/* Links footer */}
          <div className="flex gap-6 text-[10px] text-[#bbb] mt-10 tracking-widest uppercase">
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Acerca de</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Contacto</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FormLogin;