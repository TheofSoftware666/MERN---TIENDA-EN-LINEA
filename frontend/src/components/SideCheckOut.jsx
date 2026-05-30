import React, { useState, useEffect } from "react";
import clientAxios from "../config/axios";
import {
  CreditCard,
  Shield,
  Truck,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Store,
  Mail,
  User,
  MapPin,
  Phone,
  Loader2
} from "lucide-react";

import { SiVisa, SiMastercard, SiStripe } from "react-icons/si";

const SideCheckOut = ({ onBack, onProcess }) => {

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addresses, setAddress] = useState([]);

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const envio = 0;
  const total = subtotal + envio;

  const [form, setForm] = useState({
    nombre: "", email: "", tel: "",
    selectedAddressId: null,
    tarjeta: "", exp: "", cvv: "", titular: ""
  });

  const [formAddress, setFormAddress] = useState({
    id: null, postal_code: "", neighborhood: "", city: "", state: "",
    street: "", exterior_number: "", interior_number: "",
    cross_street_1: "", cross_street_2: "", references_customer: ""
  });

  const [errors, setErrors] = useState({});
  const [showInfoContact, SetShowInfoContact] = useState(true);
  const [pago, setPago] = useState("tarjeta");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rules = {
    nombre: (v) => v.trim().length >= 3 || "Ingresa tu nombre completo",
    email: (v) => /^\S+@\S+\.\S+$/.test(v) || "Correo electrónico inválido",
    tel: (v) => /^\d{10}$/.test(v.replace(/\D/g, "")) || "Teléfono a 10 dígitos",
  };

  useEffect(() => {
    GetCartItemsByUserId();
    GetProfileByUserId();
    getShippingAddressByUserId();
  }, []);

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

  const isFormValid = () => {
    const requiredFields = ["nombre", "email", "tel"];
    const allFilled = requiredFields.every(field => {
      const value = form[field];
      return value && value.toString().trim() !== "";
    });
    const addressValid =
      form.selectedAddressId !== null ||
      (showNewAddressForm &&
        formAddress.postal_code && formAddress.neighborhood &&
        formAddress.city && formAddress.state &&
        formAddress.street && formAddress.exterior_number);
    const noErrors = Object.keys(errors).length === 0;
    return allFilled && addressValid && noErrors;
  };

  const GetCartItemsByUserId = async () => {
    setLoadingItems(true);
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) { setLoadingItems(false); return; }
      const response = await clientAxios.get('/GetCartItemsByUserId', {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.data) {
        setItems(response.data.data.map(item => ({
          id: item.ProductId, name: item.ProductName,
          qty: Number(item.Quantity), price: Number(item.FinalPrice), image: item.Image
        })));
      }
    } catch (error) {
      console.log("Error fetching cart items:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  const GetProfileByUserId = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const response = await clientAxios.get('/GetProfileByUserId', {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.response.data) {
        const profile = response.data.response.data[0];
        if (profile.nombre == '' && profile.mail == '' && profile.celular == '') SetShowInfoContact(false);
        setForm((f) => ({
          ...f,
          nombre: profile.nombre + (profile.apellido || "") || "",
          email: profile.mail || "",
          tel: profile.celular || "",
        }));
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  const getShippingAddressByUserId = async () => {
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const response = await clientAxios.get('/GetShippingAddress', {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.response.data) {
        setAddress(response.data.response.data);
      }
    } catch (error) {
      console.log("Error fetching shipping address:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "selectedAddressId") {
      setForm(f => ({ ...f, selectedAddressId: value ? Number(value) : null }));
      setShowNewAddressForm(false);
      return;
    }
    if (name === "tarjeta") {
      const cleaned = value.replace(/\s/g, "").replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
      setForm((f) => ({ ...f, [name]: formatted }));
      validateField(name, cleaned);
      return;
    }
    if (name === "exp") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      let formatted = cleaned;
      if (cleaned.length >= 2) formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
      setForm((f) => ({ ...f, [name]: formatted }));
      validateField(name, formatted);
      return;
    }
    setFormAddress((f) => ({ ...f, [name]: value }));
    setForm((f) => ({ ...f, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Object.entries(form).forEach(([k, v]) => validateField(k, v));
    if (Object.keys(errors).length !== 0) {
      setIsSubmitting(false);
      alert("¡Ocurrió un error al procesar el pago!");
      return;
    }
    const token = localStorage.getItem('ape_token');
    if (!token) return;
    form.typePayment = pago;
    try {
      const response = await clientAxios.post('/CheckPaymentCart', { form }, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      const responseCheckPrevius = response.data.response;
      if (!responseCheckPrevius.ok) {
        console.warn("ERROR al procesar el pago: " + (responseCheckPrevius.data.message || 'Error al proceder al pago.'));
        return;
      }
      if (onProcess) onProcess('1233213123123');
      setItems([]);
      window.location.href = responseCheckPrevius.url;
    } catch (error) {
      console.error("Error al procesar el pago: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    Object.entries(formAddress).forEach(([k, v]) => validateField(k, v));
    if (Object.keys(errors).length !== 0) {
      alert("¡Ocurrió un error al guardar la dirección!");
      return;
    }
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const response = await clientAxios.post('/SaveShippingAddress', { formAddress }, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.response.ok) {
        getShippingAddressByUserId();
        setShowNewAddressForm(false);
      }
    } catch (error) {
      console.log("Error saving shipping address:", error);
    }
  };

  // ── Clases reutilizables ──
  const inputBase = "w-full bg-[#0d0d0d] border border-[#2e2e2e] focus:border-[#c9a84c] text-white placeholder-[#333] px-3 py-2.5 text-xs outline-none transition-colors";
  const inputError = "border-red-800 focus:border-red-600";
  const labelBase = "block text-[10px] font-semibold text-[#555] mb-1.5 tracking-widest uppercase";
  const sectionCard = "bg-[#1a1a1a] border border-[#2e2e2e] p-4";

  return (
    <div className="flex flex-col h-full bg-[#111]">

      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-[#2e2e2e] bg-[#0d0d0d] flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center border border-[#2e2e2e] hover:border-[#c9a84c] text-[#555] hover:text-[#c9a84c] transition-all flex-shrink-0"
          aria-label="Volver al carrito"
        >
          <ArrowLeft size={15} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-[9px] font-semibold">Paso final</p>
          <h1 className="text-sm font-light text-white mt-0.5">Finalizar Compra</h1>
        </div>
        <div className="flex items-center gap-1 text-[#7abf8a] flex-shrink-0">
          <Shield size={13} />
          <span className="text-[9px] tracking-widest uppercase font-semibold">Seguro</span>
        </div>
      </div>

      {/* ── Contenido scrollable ── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

        {/* Resumen del pedido */}
        <div className={sectionCard}>
          <div className="flex items-center gap-2 mb-4">
            <Truck size={14} className="text-[#c9a84c]" />
            <p className="text-[10px] font-semibold text-[#c9a84c] tracking-widest uppercase">Tu Pedido</p>
          </div>

          {loadingItems ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-7 h-7 border border-[#2e2e2e] border-t-[#c9a84c] rounded-full animate-spin mb-3" />
              <p className="text-[#444] text-[10px] tracking-widest uppercase">Cargando carrito</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <Truck size={32} className="mx-auto text-[#2e2e2e] mb-3" />
              <p className="text-[#444] text-xs tracking-wide">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-[#1e1e1e] last:border-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={import.meta.env.VITE_BACKEND_URL_IMAGENES + item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover brightness-90"
                    />
                    <span className="absolute -top-1 -right-1 bg-[#c9a84c] text-[#0d0d0d] text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                      {Number(item.qty)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate tracking-wide">{item.name}</p>
                    <p className="text-[10px] text-[#444]">${item.price} c/u</p>
                  </div>
                  <p className="text-xs font-bold text-white flex-shrink-0">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          {!loadingItems && items.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#2e2e2e] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#444] tracking-wider uppercase text-[10px]">Subtotal</span>
                <span className="text-[#888]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs items-center">
                <span className="text-[#444] tracking-wider uppercase text-[10px]">Envío</span>
                <span className="text-[#7abf8a] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <CheckCircle size={11} /> Gratis
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#2e2e2e] items-baseline">
                <span className="text-xs font-semibold text-white tracking-widest uppercase">Total</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#c9a84c]">${total.toFixed(2)}</p>
                  <p className="text-[9px] text-[#444] tracking-wider">IVA incluido</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seguridad */}
        <div className="bg-[#7abf8a]/5 border border-[#7abf8a]/20 p-4">
          <div className="flex items-start gap-3">
            <Shield size={14} className="text-[#7abf8a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold text-[#7abf8a] tracking-widest uppercase mb-2">Compra 100% Segura</p>
              <ul className="space-y-1.5">
                {[
                  "Pago cifrado con SSL",
                  "No almacenamos datos de tu tarjeta",
                  "Garantía de devolución de 30 días"
                ].map((txt) => (
                  <li key={txt} className="flex items-center gap-2 text-[10px] text-[#555] tracking-wide">
                    <CheckCircle size={11} className="text-[#7abf8a] flex-shrink-0" />
                    {txt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        {showInfoContact && (
          <div className={sectionCard}>
            <div className="flex items-center gap-2 mb-4">
              <User size={14} className="text-[#c9a84c]" />
              <p className="text-[10px] font-semibold text-[#c9a84c] tracking-widest uppercase">Información de Contacto</p>
            </div>
            <div className="space-y-3">

              {/* Nombre */}
              <div>
                <label className={labelBase}>Nombre completo *</label>
                <div className="relative">
                  <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333]" />
                  <input
                    name="nombre" type="text" placeholder="Juan Pérez"
                    className={`${inputBase} pl-9 ${errors.nombre ? inputError : ""}`}
                    value={form.nombre} onChange={handleChange}
                  />
                </div>
                {errors.nombre && (
                  <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1 tracking-wide">
                    <AlertCircle size={10} /> {errors.nombre}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelBase}>Email *</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333]" />
                  <input
                    name="email" type="email" placeholder="juan@ejemplo.com"
                    className={`${inputBase} pl-9 pointer-events-none opacity-50 ${errors.email ? inputError : ""}`}
                    value={form.email} onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1 tracking-wide">
                    <AlertCircle size={10} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className={labelBase}>Teléfono *</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333]" />
                  <input
                    name="tel" type="tel" placeholder="55 1234 5678"
                    className={`${inputBase} pl-9 ${errors.tel ? inputError : ""}`}
                    value={form.tel} onChange={handleChange}
                  />
                </div>
                {errors.tel && (
                  <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1 tracking-wide">
                    <AlertCircle size={10} /> {errors.tel}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Selección de dirección */}
        <div className={sectionCard}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-[#c9a84c]" />
            <p className="text-[10px] font-semibold text-[#c9a84c] tracking-widest uppercase">Dirección de Envío</p>
          </div>

          <div className="space-y-2">
            {addresses.map(address => (
              <label
                key={address.id}
                className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                  Number(form.selectedAddressId) === address.id
                    ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                    : 'border-[#2e2e2e] hover:border-[#c9a84c]/40'
                }`}
              >
                <input
                  type="radio" name="selectedAddressId" className="hidden"
                  value={address.id}
                  checked={Number(form.selectedAddressId) === address.id}
                  onChange={handleChange}
                />
                <div className={`w-3.5 h-3.5 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  Number(form.selectedAddressId) === address.id
                    ? 'border-[#c9a84c]' : 'border-[#333]'
                }`}>
                  {Number(form.selectedAddressId) === address.id && (
                    <div className="w-1.5 h-1.5 bg-[#c9a84c]" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-white font-medium">{address.street} #{address.exterior_number}</p>
                  <p className="text-[10px] text-[#555] mt-0.5">{address.neighborhood}, {address.city}, {address.state}</p>
                </div>
              </label>
            ))}

            {/* Nueva dirección */}
            <label
              className={`flex items-center gap-3 p-3 border border-dashed cursor-pointer transition-all ${
                showNewAddressForm
                  ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                  : 'border-[#2e2e2e] hover:border-[#c9a84c]/40'
              }`}
            >
              <input
                type="radio" value="" name="selectedAddressId" className="hidden"
                checked={showNewAddressForm}
                onChange={() => {
                  setShowNewAddressForm(true);
                  setForm(f => ({ ...f, selectedAddressId: null }));
                }}
              />
              <div className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-all ${
                showNewAddressForm ? 'border-[#c9a84c]' : 'border-[#333]'
              }`}>
                {showNewAddressForm && <div className="w-1.5 h-1.5 bg-[#c9a84c]" />}
              </div>
              <p className="text-xs text-[#c9a84c] font-semibold tracking-wide">+ Nueva dirección de envío</p>
            </label>
          </div>
        </div>

        {/* Formulario nueva dirección */}
        {showNewAddressForm && (
          <div className={sectionCard}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-[#c9a84c]" />
              <p className="text-[10px] font-semibold text-[#c9a84c] tracking-widest uppercase">Nueva Dirección</p>
            </div>
            <div className="space-y-3">
              {[
                { name: "postal_code", label: "Código Postal *", placeholder: "01000" },
                { name: "neighborhood", label: "Colonia *", placeholder: "Centro" },
                { name: "city", label: "Ciudad *", placeholder: "CDMX" },
                { name: "state", label: "Estado *", placeholder: "Ciudad de México" },
                { name: "street", label: "Calle *", placeholder: "Av. Principal" },
                { name: "exterior_number", label: "Núm. Exterior *", placeholder: "#287" },
                { name: "interior_number", label: "Núm. Interior (opcional)", placeholder: "#789" },
                { name: "cross_street_1", label: "Calle Cruce 1 *", placeholder: "Av. Secundaria" },
                { name: "cross_street_2", label: "Calle Cruce 2 *", placeholder: "Calle Lateral" },
                { name: "references_customer", label: "Referencias (opcional)", placeholder: "Casa de color azul" },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className={labelBase}>{label}</label>
                  <input
                    name={name} type="text" placeholder={placeholder}
                    className={`${inputBase} ${errors[name] ? inputError : ""}`}
                    value={formAddress[name]} onChange={handleChange}
                  />
                  {errors[name] && (
                    <p className="mt-1 text-[10px] text-red-500 tracking-wide">{errors[name]}</p>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={handleSubmitAddress}
                className="w-full mt-2 bg-[#1e1e1e] hover:bg-[#2e2e2e] border border-[#2e2e2e] hover:border-[#c9a84c] text-[#c9a84c] font-bold py-2.5 text-xs tracking-[0.2em] uppercase transition-all"
              >
                Guardar Dirección
              </button>
            </div>
          </div>
        )}

        {/* Aviso Stripe */}
        <div className="flex items-start gap-3 bg-[#635BFF]/5 border border-[#635BFF]/20 p-4">
          <SiStripe className="flex-shrink-0 mt-0.5" size={18} color="#635BFF" />
          <div>
            <p className="text-xs font-semibold text-white mb-1">Redireccionando a Stripe</p>
            <p className="text-[10px] text-[#555] leading-relaxed tracking-wide">
              Stripe es una plataforma certificada PCI DSS. Tu información financiera nunca pasa por nuestros servidores.
            </p>
          </div>
        </div>

      </div>

      {/* ── Footer fijo — botón de pago ── */}
      {pago === "tarjeta" && (
        <div className="border-t border-[#2e2e2e] bg-[#0d0d0d] px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-[#444] tracking-widest uppercase mb-0.5">Total a pagar</p>
              <p className="text-xl font-bold text-[#c9a84c]">${total.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <SiVisa size={30} color="#fff" />
              <SiMastercard size={30} color="#fff" />
              <SiStripe size={22} color="#635BFF" />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid() || loadingItems}
            className={`w-full py-3 font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all ${
              isSubmitting || !isFormValid() || loadingItems
                ? "bg-[#1a1a1a] border border-[#2e2e2e] text-[#333] cursor-not-allowed"
                : "bg-[#c9a84c] hover:bg-[#e0be6a] text-[#0d0d0d]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border border-[#0d0d0d]/30 border-t-[#0d0d0d] rounded-full animate-spin" />
                Procesando pago...
              </>
            ) : loadingItems ? (
              <>
                <div className="w-4 h-4 border border-[#333] border-t-[#555] rounded-full animate-spin" />
                Cargando carrito...
              </>
            ) : (
              <>
                <Lock size={13} />
                Pagar de forma segura
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[#333] mt-3 tracking-wide">
            Al completar tu compra aceptas nuestros{" "}
            <button className="text-[#c9a84c] hover:underline underline-offset-2">Términos y Condiciones</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SideCheckOut;