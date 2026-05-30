import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clientAxios from '../config/axios.jsx';
import { FaLock, FaShield } from "react-icons/fa6";

const RestablecerPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        // const response = await clientAxios.post('/Login', { email, password });
        const url = "/ActualizarPassword/" + token;
        const response = await clientAxios.get(url);
      } catch (error) {
        console.log(error);
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmar) return;
    if (password !== confirmar) {
      console.warn("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 8) {
      console.warn("Mínimo 8 caracteres");
      return;
    }
    // Aquí iría la llamada al API para guardar la nueva contraseña
    setSaved(true);
  };

  const inputBase = "w-full bg-[#0d0d0d] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#333] px-4 py-3 text-sm outline-none transition-colors";
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
                Nueva contraseña
              </p>
              <h2 className="text-3xl font-light text-white mb-4 leading-snug">
                Restablecer <span className="italic font-serif text-[#c9a84c]">acceso</span>
              </h2>
              <p className="text-[#444] text-xs tracking-wide leading-relaxed">
                Ingresa tu nueva contraseña y confírmala para recuperar el acceso a tu cuenta.
              </p>
            </div>

            {/* Estado: guardado */}
            {saved ? (
              <div className="border border-[#7abf8a]/30 bg-[#7abf8a]/5 p-6 text-center">
                <div className="w-10 h-10 border border-[#7abf8a]/30 flex items-center justify-center mx-auto mb-4">
                  <FaLock className="text-[#7abf8a] text-sm" />
                </div>
                <p className="text-[#7abf8a] text-xs font-semibold tracking-widest uppercase mb-2">Contraseña actualizada</p>
                <p className="text-[#555] text-xs leading-relaxed mb-5">
                  Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión.
                </p>
                <Link
                  to="/Auth/inicio-sesion"
                  className="inline-block text-[10px] text-[#c9a84c] hover:underline underline-offset-2 tracking-widest uppercase"
                >
                  Ir al inicio de sesión →
                </Link>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>

                <div>
                  <label className={labelBase}>Nueva contraseña</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className={inputBase}
                    value={password}
                    onChange={e => setPassword(e.target.value.trim())}
                  />
                </div>

                <div>
                  <label className={labelBase}>Confirmar contraseña</label>
                  <input
                    type="password"
                    placeholder="Repite tu contraseña"
                    className={inputBase}
                    value={confirmar}
                    onChange={e => setConfirmar(e.target.value.trim())}
                  />
                  {confirmar && password !== confirmar && (
                    <p className="mt-1.5 text-[10px] text-red-500 tracking-wide">Las contraseñas no coinciden</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d] font-bold text-xs tracking-[0.2em] uppercase transition-all mt-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={!password || !confirmar || password !== confirmar}
                >
                  Guardar nueva contraseña
                </button>

                <p className="text-center text-xs text-[#444] tracking-wide pt-1">
                  ¿Recordaste tu contraseña?{" "}
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

        {/* ── Panel derecho — seguridad ── */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0d0d0d] border-l border-[#2e2e2e] p-10 w-full lg:max-w-sm">

          <div>
            <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center mb-6">
              <FaShield className="text-[#c9a84c] text-sm" />
            </div>
            <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[10px] font-semibold mb-2">
              Seguridad
            </p>
            <h3 className="text-2xl font-light text-white leading-snug mb-4">
              Tu cuenta,<br />
              <span className="italic font-serif text-[#c9a84c]">protegida</span>
            </h3>
            <div className="w-8 h-px bg-[#c9a84c] mb-8" />

            <p className="text-[#555] text-xs leading-relaxed mb-6">
              Usa una contraseña segura y única para proteger tu cuenta. Te recomendamos combinar letras, números y símbolos.
            </p>

            {/* Tips de seguridad */}
            <div className="border border-[#2e2e2e] p-5 space-y-3 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#c9a84c]/5 pointer-events-none" />
              <p className="text-[10px] text-[#c9a84c] tracking-widest uppercase font-semibold mb-3">Recomendaciones</p>
              {[
                "Mínimo 8 caracteres",
                "Incluye letras mayúsculas y minúsculas",
                "Agrega números y símbolos",
                "No uses contraseñas anteriores",
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#c9a84c] flex-shrink-0" />
                  <p className="text-[11px] text-[#444] tracking-wide">{tip}</p>
                </div>
              ))}
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

export default RestablecerPassword;