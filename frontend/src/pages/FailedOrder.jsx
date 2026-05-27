import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ErrorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#E24B4A" fillOpacity="0.10" />
    <circle cx="24" cy="24" r="18" fill="#E24B4A" fillOpacity="0.15" />
    <circle cx="24" cy="24" r="12" fill="#E24B4A" />
    <line x1="19" y1="19" x2="29" y2="29" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="29" y1="19" x2="19" y2="29" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const tips = [
  { icon: "💳", text: "Verifica que el número de tarjeta sea correcto" },
  { icon: "📅", text: "Revisa la fecha de vencimiento de tu tarjeta" },
  { icon: "🔒", text: "Asegúrate de que el CVC sea el de los 3 dígitos al reverso" },
  { icon: "💰", text: "Confirma que tienes fondos suficientes disponibles" },
];

const errorMessages = {
  card_declined: "Tu tarjeta fue declinada por el banco emisor.",
  insufficient_funds: "Fondos insuficientes en tu tarjeta.",
  expired_card: "Tu tarjeta ha expirado.",
  incorrect_cvc: "El código de seguridad (CVC) es incorrecto.",
  processing_error: "Ocurrió un error al procesar tu pago.",
  default: "No fue posible completar el pago en este momento.",
};

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  const errorCode = searchParams.get("error") || "default";
  const errorMsg = errorMessages[errorCode] || errorMessages.default;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0) scale(1); }
          15% { transform: translateX(-6px) scale(1.04); }
          30% { transform: translateX(6px) scale(1.04); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          90% { transform: translateX(2px); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes errorPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(226,75,74,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(226,75,74,0); }
        }
        .failed-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .failed-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #fdf7f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }
        .failed-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 55% at 50% -10%, rgba(226,75,74,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(226,75,74,0.14);
          padding: 3rem 2.5rem;
          max-width: 460px;
          width: 100%;
          position: relative;
          z-index: 1;
          opacity: ${visible ? 1 : 0};
          transform: ${visible ? "translateY(0)" : "translateY(32px)"};
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .icon-area {
          text-align: center;
          margin-bottom: 1.75rem;
        }
        .icon-wrap {
          display: inline-flex;
          animation: scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.2s both,
                     shake 0.6s ease 0.7s both;
        }
        .eyebrow {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #A32D2D;
          margin-bottom: 0.7rem;
          animation: fadeUp 0.5s ease 0.35s both;
        }
        .heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 2rem;
          color: #2a1010;
          line-height: 1.15;
          margin-bottom: 0.7rem;
          text-align: center;
          animation: fadeUp 0.5s ease 0.4s both;
        }
        .error-banner {
          background: #fcebeb;
          border: 1px solid rgba(226,75,74,0.2);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          font-size: 0.875rem;
          color: #791F1F;
          margin-bottom: 1.75rem;
          text-align: center;
          line-height: 1.5;
          animation: fadeUp 0.5s ease 0.45s both;
        }
        .divider {
          height: 1px;
          background: #f3eded;
          margin: 0 0 1.5rem;
        }
        .tips-heading {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #b09090;
          margin-bottom: 0.9rem;
          animation: fadeUp 0.5s ease 0.5s both;
        }
        .tips-list {
          list-style: none;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: fadeUp 0.5s ease 0.55s both;
        }
        .tip-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: #fdf7f7;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #4a2020;
          border: 1px solid #f5e5e5;
        }
        .tip-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .btn-primary {
          display: block;
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: #E24B4A;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin-bottom: 0.75rem;
          animation: fadeUp 0.5s ease 0.6s both;
          text-decoration: none;
          text-align: center;
        }
        .btn-primary:hover { background: #A32D2D; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-secondary {
          display: block;
          width: 100%;
          padding: 0.85rem 1.5rem;
          background: transparent;
          color: #A32D2D;
          border: 1.5px solid rgba(226,75,74,0.3);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          margin-bottom: 0.75rem;
          animation: fadeUp 0.5s ease 0.65s both;
          text-decoration: none;
          text-align: center;
        }
        .btn-secondary:hover {
          background: rgba(226,75,74,0.06);
          border-color: #E24B4A;
        }
        .help-text {
          text-align: center;
          font-size: 0.82rem;
          color: #c0a8a8;
          animation: fadeUp 0.5s ease 0.7s both;
        }
        .help-text a {
          color: #A32D2D;
          text-decoration: none;
          font-weight: 500;
        }
        .help-text a:hover { text-decoration: underline; }
      `}</style>

      <div className="failed-page">
        <div className="card">
          <div className="icon-area">
            <div className="icon-wrap">
              <ErrorIcon />
            </div>
          </div>

          <p className="eyebrow">Pago rechazado</p>
          <h1 className="heading">No pudimos procesar tu pago</h1>

          <div className="error-banner">
            {errorMsg}
          </div>

          <div className="divider" />

          <p className="tips-heading">¿Qué puedes hacer?</p>
          <ul className="tips-list">
            {tips.map((tip, i) => (
              <li key={i} className="tip-row">
                <span className="tip-icon">{tip.icon}</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>

          <button className="btn-primary" onClick={() => navigate("/checkout")}>
            Intentar de nuevo
          </button>
          <button className="btn-secondary" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
          <p className="help-text">
            ¿Sigues teniendo problemas?{" "}
            <a href="mailto:soporte@tuapp.com">Contáctanos</a>
          </p>
        </div>
      </div>
    </>
  );
}
