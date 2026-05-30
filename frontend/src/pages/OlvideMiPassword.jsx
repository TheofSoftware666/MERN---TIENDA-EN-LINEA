import clientAxios from "../config/axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHeart, FaLock } from "react-icons/fa6";

const OlvideMiPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '') {
      console.log("El correo ingresado es inválido");
      return;
    }

    if (email.indexOf('@') === -1) {
      console.log("El correo ingresado es inválido");
      return;
    }

    try {
      const response = await clientAxios.post("/TokenPassword", { email });
      console.log(response);
      setSent(true);
    } catch (e) {
      console.warn(e);
    }
  };

  const inputBase = "w-full bg-[#0d0d0d] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#333] pl-10 pr-4 py-3 text-sm outline-none transition-colors";
  const labelBase = "block text-[10px] font-semibold text-[#555] mb-1.5 tracking-widest uppercase";

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d] px-4 py-12">
      <div className="flex flex-col lg:flex-row overflow-hidden max-w-4xl w-full border border-[#2e2e2e]">

        {/* ── Panel izquierdo — formulario ── */}
        <div className="flex flex-col justify-center items-center w-full px-8 py-14 lg:py-16 bg-[#111]">
          <div className="w-full max-w-md">

            {/* Encabezado */}
            <div className="mb-10">
              <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
                <FaLock className="text-[#c9a84c] text-sm" />
              </div>
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
                Recuperar acceso
              </p>
              <h2 className="text-3xl font-light text-white mb-4 leading-snug">
                ¿Olvidaste tu <span className="italic font-serif text-[#c9a84c]">contraseña?</span>
              </h2>
              <p className="text-[#444] text-xs tracking-wide leading-relaxed">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
              </p>
            </div>

            {/* Estado: enviado */}
            {sent ? (
              <div className="border border-[#7abf8a]/30 bg-[#7abf8a]/5 p-6 text-center">
                <div className="w-10 h-10 border border-[#7abf8a]/30 flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-[#7abf8a] text-sm" />
                </div>
                <p className="text-[#7abf8a] text-xs font-semibold tracking-widest uppercase mb-2">Correo enviado</p>
                <p className="text-[#555] text-xs leading-relaxed">
                  Revisa tu bandeja de entrada. Si no lo encuentras, revisa la carpeta de spam.
                </p>
                <Link
                  to="/Auth/inicio-sesion"
                  className="inline-block mt-5 text-[10px] text-[#c9a84c] hover:underline underline-offset-2 tracking-widest uppercase"
                >
                  Volver al inicio de sesión →
                </Link>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>

                <div>
                  <label className={labelBase}>Correo electrónico</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333] text-xs" />
                    <input
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      onChange={e => setEmail(e.target.value.toLowerCase().trim())}
                      value={email}
                      className={inputBase}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all mt-2"
                >
                  Enviar enlace de recuperación
                </button>

                <p className="text-center text-xs text-[#444] tracking-wide pt-1">
                  ¿Ya recordaste tu contraseña?{" "}
                  <Link
                    to="/Auth/inicio-sesion"
                    className="text-[#c9a84c] hover:underline underline-offset-2 font-semibold"
                  >
                    Inicia sesión
                  </Link>
                </p>

              </form>
            )}

          </div>
        </div>

        {/* ── Panel derecho — soporte ── */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0d0d0d] border-l border-[#2e2e2e] p-10 w-full lg:max-w-sm">

          <div>
            <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
              <FaHeart className="text-[#c9a84c] text-sm" />
            </div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
              Estamos aquí
            </p>
            <h3 className="text-2xl font-light text-white leading-snug mb-4">
              Recupera el<br />
              <span className="italic font-serif text-[#c9a84c]">acceso</span>
            </h3>
            <div className="w-8 h-px bg-[#c9a84c] mb-8" />

            <p className="text-[#555] text-xs leading-relaxed mb-6">
              Recuerda usar el correo con el que te registraste para recibir tu enlace.
              Si no aparece en tu bandeja principal, revisa la carpeta de spam.
            </p>

            {/* Card de soporte */}
            <div className="border border-[#2e2e2e] p-5 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-[#c9a84c]/5 pointer-events-none" />
              <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-2">¿Necesitas ayuda?</p>
              <p className="text-[#444] text-xs leading-relaxed">
                Contáctanos a{" "}
                <a
                  href="mailto:soporte@cosmetica.com"
                  className="text-[#c9a84c] hover:underline underline-offset-2"
                >
                  soporte@cosmetica.com
                </a>{" "}
                y te ayudaremos a recuperar tu cuenta.
              </p>
            </div>
          </div>

          {/* Links footer */}
          <div className="flex gap-6 text-[10px] text-[#333] mt-10 tracking-widest uppercase">
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Soporte</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Política</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">Contacto</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OlvideMiPassword;