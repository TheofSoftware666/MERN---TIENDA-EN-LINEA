import React, { useState } from "react";

const SideCheckOut = () => {
  // Datos simulados del pedido
  const items = [
    { id: 1, name: "Mochila Azul", qty: 2, price: 200 },
    { id: 2, name: "Lonchera Negra", qty: 1, price: 250 },
  ];
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0); // 650
  const envio = 0; // Gratis en este ejemplo
  const total = subtotal + envio;

  // Form y validación en tiempo real (Fase 1)
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tel: "",
    cp: "",
    calle: "",
    tarjeta: "",
    exp: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [pago, setPago] = useState("tarjeta");

  const rules = {
    nombre: (v) => v.trim().length >= 3 || "Ingresa tu nombre completo",
    email: (v) =>
      /^\S+@\S+\.\S+$/.test(v) || "Correo inválido",
    tel: (v) =>
      /^\d{10}$/.test(v.replace(/\D/g, "")) || "Teléfono a 10 dígitos",
    cp: (v) =>
      /^\d{5}$/.test(v) || "CP de 5 dígitos",
    calle: (v) => v.trim().length >= 5 || "Calle y número requeridos",
    tarjeta: (v) =>
      /^\d{16}$/.test(v.replace(/\s/g, "")) || "Tarjeta de 16 dígitos",
    exp: (v) =>
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || "Formato MM/AA",
    cvv: (v) =>
      /^\d{3,4}$/.test(v) || "CVV de 3 o 4 dígitos",
  };

  const validateField = (name, value) => {
    const rule = rules[name];
    if (!rule) return;
    const valid = rule(value);
    setErrors((prev) => {
      const next = { ...prev };
      if (valid !== true) next[name] = valid;
      else delete next[name];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // valida todo al enviar
    Object.entries(form).forEach(([k, v]) => validateField(k, v));
    if (Object.keys(errors).length === 0) {
      alert("✅ Pedido confirmado (simulado). ¡Gracias por tu compra!");
    }
  };

  // clase base para inputs (compactos y consistentes)
  const inputBase =
    "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header (puedes poner un botón de cerrar aquí si quieres) */}
      {/* <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">🧾 Finalizar compra</h2>
      </div> */}

      {/* CONTENIDO SCROLLEABLE */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Resumen siempre visible (lo colocamos arriba del formulario para escaneo rápido) */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">🛍️ Tu pedido</h3>
          <div className="space-y-2 text-sm">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between">
                <span>
                  {it.name} (x{it.qty})
                </span>
                <span>${(it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t text-gray-600">
              <span>Envío</span>
              <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between pt-2 border-t text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Sin costos ocultos ✨</p>
        </div>

        {/* Dirección de envío */}
        <div>
          <h3 className="font-semibold mb-3">📍 Dirección de envío</h3>
          <div className="space-y-3">
            <input
              name="nombre"
              placeholder="Nombre completo"
              className={`${inputBase} ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
              value={form.nombre}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.nombre && <p className="text-red-600 text-xs">{errors.nombre}</p>}

            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className={`${inputBase} ${errors.email ? "border-red-500" : "border-gray-300"}`}
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}

            <input
              name="tel"
              inputMode="numeric"
              placeholder="Teléfono (10 dígitos)"
              className={`${inputBase} ${errors.tel ? "border-red-500" : "border-gray-300"}`}
              value={form.tel}
              onChange={handleChange}
              autoComplete="tel"
            />
            {errors.tel && <p className="text-red-600 text-xs">{errors.tel}</p>}

            <div className="grid grid-cols-2 gap-3">
              <input
                name="cp"
                inputMode="numeric"
                placeholder="Código Postal"
                className={`${inputBase} ${errors.cp ? "border-red-500" : "border-gray-300"}`}
                value={form.cp}
                onChange={handleChange}
                autoComplete="postal-code"
              />
              <input
                name="calle"
                placeholder="Calle y número"
                className={`${inputBase} ${errors.calle ? "border-red-500" : "border-gray-300"}`}
                value={form.calle}
                onChange={handleChange}
                autoComplete="address-line1"
              />
            </div>
            {errors.cp && <p className="text-red-600 text-xs">{errors.cp}</p>}
            {errors.calle && <p className="text-red-600 text-xs">{errors.calle}</p>}
          </div>
        </div>

        {/* Método de pago */}
        <div>
          <h3 className="font-semibold mb-3">💳 Método de pago</h3>
          <div className="space-y-3">
            {[
              { id: "tarjeta", label: "Tarjeta de crédito/débito", icon: "💳" },
              { id: "mp", label: "Mercado Pago", icon: "💙" },
              { id: "oxxo", label: "OXXO", icon: "🧾" },
            ].map((op) => (
              <div key={op.id} className="border rounded-lg overflow-hidden">
                <div
                  className={`flex items-center justify-between p-3 cursor-pointer ${
                    pago === op.id ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setPago(op.id)}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pago"
                      checked={pago === op.id}
                      onChange={() => setPago(op.id)}
                      className="accent-black"
                    />
                    <span>{op.label}</span>
                  </label>
                  <span>{op.icon}</span>
                </div>

                {pago === op.id && (
                  <div className="px-3 pb-3 text-sm text-gray-600 space-y-2">
                    {op.id === "tarjeta" ? (
                      <>
                        <input
                          name="tarjeta"
                          placeholder="Número de tarjeta"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          className={`${inputBase} ${errors.tarjeta ? "border-red-500" : "border-gray-300"}`}
                          value={form.tarjeta}
                          onChange={handleChange}
                        />
                        {errors.tarjeta && <p className="text-red-600 text-xs">{errors.tarjeta}</p>}
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            name="exp"
                            placeholder="MM/AA"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            className={`${inputBase} ${errors.exp ? "border-red-500" : "border-gray-300"}`}
                            value={form.exp}
                            onChange={handleChange}
                          />
                          <input
                            name="cvv"
                            placeholder="CVV"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            className={`${inputBase} ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
                            value={form.cvv}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.exp && <p className="text-red-600 text-xs">{errors.exp}</p>}
                        {errors.cvv && <p className="text-red-600 text-xs">{errors.cvv}</p>}
                      </>
                    ) : op.id === "mp" ? (
                      <p>Serás redirigido a Mercado Pago para completar el pago.</p>
                    ) : (
                      <p>Generaremos una ficha para pagar en cualquier OXXO.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de confianza (Fase 2) */}
        <div className="text-xs text-gray-600">
          <p className="mb-2">🔒 Pago cifrado con SSL. Sin costos ocultos.</p>
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
        </div>
      </div>

      {/* FOOTER FIJO (fuera del scroll) */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Total a pagar</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition"
        >
          ✅ Pagar ${total.toFixed(2)} de forma segura
        </button>

        <button
          type="button"
          className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
        >
          Seguir comprando
        </button>

        <p className="text-[11px] text-center text-gray-500 mt-2">
          Sus pagos están protegidos por estándares bancarios.
        </p>
      </div>
    </div>
  );
};

export default SideCheckOut;
