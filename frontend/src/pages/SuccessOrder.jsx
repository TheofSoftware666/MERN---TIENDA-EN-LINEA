import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#1D9E75" fillOpacity="0.12" />
    <circle cx="24" cy="24" r="18" fill="#1D9E75" fillOpacity="0.2" />
    <circle cx="24" cy="24" r="12" fill="#1D9E75" />
    <polyline points="17,24 22,29 31,19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ConfettiPiece = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: style.size,
      height: style.size * 0.4,
      background: style.color,
      borderRadius: 2,
      top: style.top,
      left: style.left,
      animation: `confettiFall ${style.duration}s ease-in forwards`,
      animationDelay: `${style.delay}s`,
      transform: `rotate(${style.rotate}deg)`,
      opacity: 0,
    }}
  />
);

const confettiColors = ["#1D9E75", "#5DCAA5", "#378ADD", "#D4537E", "#EF9F27", "#E24B4A", "#7F77DD"];

function generateConfetti(count = 30) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 6,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: `${Math.random() * -20}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 1.5,
    rotate: Math.random() * 360,
  }));
}

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [confetti] = useState(() => generateConfetti(35));

  const sessionId = searchParams.get("session_id");
  const orderNumber = sessionId ? sessionId.slice(-8).toUpperCase() : "ABCD1234";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const items = [
    { label: "Estado", value: "Confirmado", highlight: true },
    { label: "Número de orden", value: `#${orderNumber}` },
    { label: "Método de pago", value: "Tarjeta de crédito" },
    { label: "Fecha", value: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" }) },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(var(--r, 0deg)); }
          100% { opacity: 0; transform: translateY(600px) rotate(calc(var(--r, 0deg) + 720deg)); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(29,158,117,0.3); }
          50% { box-shadow: 0 0 0 14px rgba(29,158,117,0); }
        }
        .success-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .success-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f7f9f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }
        .success-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(29,158,117,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(29,158,117,0.15);
          padding: 3rem 2.5rem;
          max-width: 440px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
          opacity: ${visible ? 1 : 0};
          transform: ${visible ? "translateY(0)" : "translateY(32px)"};
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .icon-wrap {
          display: inline-flex;
          margin-bottom: 1.75rem;
          animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
        }
        .icon-wrap svg circle:last-of-type {
          animation: pulse 2s ease-in-out 0.8s infinite;
        }
        .eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1D9E75;
          margin-bottom: 0.75rem;
          animation: fadeUp 0.5s ease 0.35s both;
        }
        .heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 2.1rem;
          color: #0b2d1e;
          line-height: 1.15;
          margin-bottom: 0.75rem;
          animation: fadeUp 0.5s ease 0.4s both;
        }
        .subtext {
          font-size: 0.95rem;
          color: #6b7c74;
          line-height: 1.6;
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease 0.45s both;
        }
        .divider {
          height: 1px;
          background: rgba(29,158,117,0.1);
          margin: 0 0 1.5rem;
          animation: fadeUp 0.5s ease 0.5s both;
        }
        .detail-list {
          list-style: none;
          margin-bottom: 2rem;
          animation: fadeUp 0.5s ease 0.55s both;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f0f5f3;
          font-size: 0.875rem;
        }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #8fa89e; }
        .detail-value { font-weight: 500; color: #1a2e26; }
        .detail-value.green {
          color: #0f6e56;
          background: #e1f5ee;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .btn-primary {
          display: block;
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: #1D9E75;
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
        .btn-primary:hover { background: #0f6e56; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-secondary {
          display: block;
          width: 100%;
          padding: 0.85rem 1.5rem;
          background: transparent;
          color: #1D9E75;
          border: 1.5px solid rgba(29,158,117,0.35);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          animation: fadeUp 0.5s ease 0.65s both;
          text-decoration: none;
          text-align: center;
        }
        .btn-secondary:hover {
          background: rgba(29,158,117,0.06);
          border-color: #1D9E75;
        }
        .confetti-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
      `}</style>

      <div className="success-page">
        <div className="confetti-container">
          {confetti.map((c) => (
            <ConfettiPiece key={c.id} style={c} />
          ))}
        </div>

        <div className="card">
          <div className="icon-wrap">
            <CheckIcon />
          </div>

          <p className="eyebrow">Pago completado</p>
          <h1 className="heading">¡Todo listo!</h1>
          <p className="subtext">
            Tu pago fue procesado exitosamente. Recibirás un correo de confirmación en breve.
          </p>

          <div className="divider" />

          <ul className="detail-list">
            {items.map((item) => (
              <li key={item.label} className="detail-row">
                <span className="detail-label">{item.label}</span>
                <span className={`detail-value${item.highlight ? " green" : ""}`}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <button className="btn-primary" onClick={() => navigate("/")}>
            Ir al inicio
          </button>
          <button className="btn-secondary" onClick={() => navigate("/Pedidos")}>
            Ver mis órdenes
          </button>
        </div>
      </div>
    </>
  );
}
