import clientAxios from '../config/axios.jsx';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import { FaEnvelope } from "react-icons/fa6";

const ConfirmarCuenta = () => {
  const [Codigo, SetCodigo] = useState('');
  const [Message, setMessage] = useState({});
  const Navigate = useNavigate();

  const HandleSubmit = async e => {
    e.preventDefault();

    if (Codigo.length < 6) {
      setMessage({ msg: 'Código de verificación inválido', tipo: 'Error' });
      return;
    }

    setMessage({ msg: "Verificando código...", tipo: 'Info' });

    try {
      const url = "/ConfirmarCuenta/" + Codigo;
      const response = await clientAxios.get(url);
      setTimeout(() => {
        setMessage({ msg: response.data.msg, tipo: 'Exito' });
        Navigate('/Auth/inicio-sesion');
      }, 1000);
    } catch (error) {
      setMessage({ msg: error.response.data.msg, tipo: 'Error' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] px-4 py-12">
      <div className="flex flex-col lg:flex-row overflow-hidden max-w-4xl w-full border border-[#2e2e2e]">

        {/* ── Panel izquierdo — formulario ── */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-14 lg:py-16 bg-[#111]">
          <div className="w-full max-w-md">

            {/* Encabezado */}
            <div className="mb-10">
              <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
                <FaEnvelope className="text-[#c9a84c] text-sm" />
              </div>
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
                Activación de cuenta
              </p>
              <h2 className="text-3xl font-light text-white mb-4 leading-snug">
                Verifica tu <span className="italic font-serif text-[#c9a84c]">cuenta</span>
              </h2>
              <p className="text-[#444] text-xs tracking-wide leading-relaxed">
                Te hemos enviado un código de verificación a tu correo electrónico. Ingrésalo a continuación para activar tu cuenta.
              </p>
            </div>

            <form className="space-y-5" onSubmit={HandleSubmit}>

              <div>
                <label className="block text-[10px] font-semibold text-[#555] mb-1.5 tracking-widest uppercase">
                  Código de verificación
                </label>
                <input
                  value={Codigo}
                  onChange={e => SetCodigo(e.target.value.trim().toUpperCase())}
                  type="text"
                  placeholder="Ej: 123456"
                  maxLength={8}
                  className="w-full bg-[#0d0d0d] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#333] px-4 py-3.5 text-base outline-none transition-colors tracking-[0.5em] text-center font-semibold"
                />
              </div>

              <Alerta alerta={Message} />

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all"
              >
                Confirmar cuenta
              </button>

              <div className="text-center space-y-1 pt-1">
                <p className="text-xs text-[#444] tracking-wide">¿No recibiste el código?</p>
                <a
                  href="#"
                  className="text-[10px] text-[#c9a84c] hover:underline underline-offset-2 tracking-widest uppercase font-semibold"
                >
                  Reenviar código
                </a>
              </div>

            </form>
          </div>
        </div>

        {/* ── Panel derecho — info ── */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0d0d0d] border-l border-[#2e2e2e] p-10 w-full lg:max-w-sm">

          <div>
            <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
              {/* <FaCheckCircle className="text-[#c9a84c] text-sm" /> */}
            </div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
              Último paso
            </p>
            <h3 className="text-2xl font-light text-white leading-snug mb-4">
              Casi<br />
              <span className="italic font-serif text-[#c9a84c]">terminamos</span>
            </h3>
            <div className="w-8 h-px bg-[#c9a84c] mb-8" />

            <p className="text-[#555] text-xs leading-relaxed mb-6">
              Verifica tu correo para activar tu cuenta y empezar a disfrutar de todos nuestros beneficios exclusivos.
            </p>

            {/* Pasos */}
            <div className="border border-[#2e2e2e] p-5 space-y-4 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-[#c9a84c]/5 pointer-events-none" />
              <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-1">¿Qué hacer?</p>
              {[
                "Revisa tu bandeja de entrada",
                "Busca el correo de activación",
                "Copia el código de 6 dígitos",
                "Ingrésalo en el campo de la izquierda",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="text-[10px] font-bold text-[#c9a84c] w-4 flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-[11px] text-[#444] tracking-wide leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Links footer */}
          <div className="flex gap-6 text-[10px] text-[#333] mt-10 tracking-widest uppercase">
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Soporte</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Política</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmarCuenta;