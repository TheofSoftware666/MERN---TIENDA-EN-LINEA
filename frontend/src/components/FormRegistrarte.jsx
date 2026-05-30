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

  const inputBase = "w-full bg-white border border-[#e8e8e8] focus:border-[#c9a84c] text-[#1a1a1a] placeholder-[#bbb] px-4 py-3 text-sm outline-none transition-colors";
  const labelBase = "block text-[10px] font-semibold text-[#888] mb-1.5 tracking-widest uppercase";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 py-12">
      <div className="flex flex-col lg:flex-row overflow-hidden max-w-5xl w-full border border-[#e8e8e8]">

        {/* ── Panel izquierdo — beneficios ── */}
        <div className="flex flex-col justify-between bg-white border-r border-[#e8e8e8] p-10 lg:max-w-sm w-full">

          {/* Logo / claim */}
          <div className="mb-10">
            <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
              <FaGem className="text-[#c9a84c] text-base" />
            </div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
              Membresía exclusiva
            </p>
            <h3 className="text-2xl font-light text-[#1a1a1a] leading-snug">
              Bienvenida a<br />
              <span className="text-[#c9a84c] italic font-serif">la belleza</span>
            </h3>
            <div className="w-8 h-px bg-[#c9a84c] mt-4" />
          </div>

          {/* Beneficios */}
          <div className="space-y-7 flex-1">
            {[
              {
                icon: <FaGift className="text-[#c9a84c] text-xs" />,
                title: "Precios preferenciales",
                desc: "Accede a descuentos exclusivos solo por tener cuenta con nosotros."
              },
              {
                icon: <FaRocket className="text-[#c9a84c] text-xs" />,
                title: "Acceso anticipado",
                desc: "Sé la primera en conocer y comprar nuestras nuevas colecciones."
              },
              {
                icon: <FaHeart className="text-[#c9a84c] text-xs" />,
                title: "Bonos y regalos",
                desc: "Tenemos detalles especiales solo para nuestras clientas frecuentes."
              },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-7 h-7 border border-[#e8e8e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {b.icon}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1a1a1a] mb-1 tracking-wide">{b.title}</h4>
                  <p className="text-[11px] text-[#888] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Links footer */}
          <div className="flex gap-6 text-[10px] text-[#bbb] mt-10 tracking-widest uppercase">
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Acerca de</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Contacto</a>
          </div>
        </div>

        {/* ── Panel derecho — formulario ── */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-14 lg:py-16 bg-white">

          <div className="w-full max-w-md">

            {/* Encabezado */}
            <div className="mb-10">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
                Nueva cuenta
              </p>
              <h2 className="text-3xl font-light text-[#1a1a1a] mb-4 leading-snug">
                Crea tu <span className="italic font-serif text-[#c9a84c]">perfil</span>
              </h2>
              <p className="text-[#aaa] text-xs tracking-wide leading-relaxed">
                Empieza a disfrutar de beneficios exclusivos y una experiencia personalizada.
              </p>
            </div>

            <Alerta alerta={alerta} />

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className={labelBase}>Nombre completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre y apellido"
                  className={inputBase}
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>

              <div>
                <label className={labelBase}>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className={inputBase}
                  value={email}
                  onChange={e => setEmail(e.target.value.trim().toLowerCase())}
                />
              </div>

              <div>
                <label className={labelBase}>Contraseña</label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className={inputBase}
                  value={password}
                  onChange={e => setPassword(e.target.value.trim())}
                />
              </div>

              <div>
                <label className={labelBase}>Repite la contraseña</label>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  className={inputBase}
                  value={repetir}
                  onChange={e => setRepetir(e.target.value.trim())}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all mt-2"
              >
                Crear Cuenta
              </button>

              <p className="text-center text-xs text-[#aaa] tracking-wide pt-1">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/Auth/inicio-sesion"
                  className="text-[#c9a84c] hover:underline underline-offset-2 font-semibold"
                >
                  Inicia sesión aquí
                </Link>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FormRegistrarte;