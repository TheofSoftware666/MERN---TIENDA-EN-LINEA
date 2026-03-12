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

// const addresses = [
//   {
//     id: 1,
//     street: "Av. Insurgentes Sur",
//     exterior_number: "123",
//     neighborhood: "Nápoles",
//     city: "CDMX",
//     state: "Ciudad de México"
//   },
//   {
//     id: 2,
//     street: "Calle Reforma",
//     exterior_number: "456",
//     neighborhood: "Centro",
//     city: "Guadalajara",
//     state: "Jalisco"
//   }
// ];

const SideCheckOut = ({ onBack, onProcess }) => {

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true); // Estado para el spinner
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addresses, setAddress] = useState([]);

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const envio = 0; 
  const total = subtotal + envio;

  // Estados
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tel: "",
    // cp: "",
    // calle: "",
    // colonia: "",
    // ciudad: "",
    // estado: "",
    selectedAddressId: null,
    tarjeta: "",
    exp: "",
    cvv: "",
    titular: ""
  });

   const [formAddress, setFormAddress] = useState({
    id: null,
    postal_code: "",
    neighborhood: "",
    city: "",
    state: "",
    street: "",
    exterior_number: "",
    interior_number: "",
    cross_street_1: "",
    cross_street_2: "",
    references_customer: ""
  });

  const [errors, setErrors] = useState({});
  const [showInfoContact, SetShowInfoContact] = useState(true);
  const [pago, setPago] = useState("tarjeta");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reglas de validación mejoradas
  const rules = {
    nombre: (v) => v.trim().length >= 3 || "Ingresa tu nombre completo",
    email: (v) => /^\S+@\S+\.\S+$/.test(v) || "Correo electrónico inválido",
    tel: (v) => /^\d{10}$/.test(v.replace(/\D/g, "")) || "Teléfono a 10 dígitos",
    // selectedAddressId: (v) => /^\d{1}$/.test(v.replace(/\D/g, "")) || "Escoge una direccion de envio",
    // cp: (v) => /^\d{5}$/.test(v) || "Código Postal de 5 dígitos",
    // calle: (v) => v.trim().length >= 5 || "Calle y número requeridos",
    // colonia: (v) => v.trim().length >= 2 || "Colonia requerida",
    // ciudad: (v) => v.trim().length >= 2 || "Ciudad requerida",
    // estado: (v) => v.trim().length >= 2 || "Estado requerido",
    tarjeta: (v) => /^\d{16}$/.test(v.replace(/\s/g, "")) || "Tarjeta de 16 dígitos",
    exp: (v) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || "Formato MM/AA",
    cvv: (v) => /^\d{3,4}$/.test(v) || "CVV de 3 o 4 dígitos",
    titular: (v) => v.trim().length >= 3 || "Nombre del titular requerido",
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

  const GetCartItemsByUserId = async () => {
    setLoadingItems(true); 
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) {
        setLoadingItems(false);
        return;
      }

      const response = await clientAxios.get('/GetCartItemsByUserId', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.data) {
        const responseApi = response.data.data.map(item => ({ 
          id: item.ProductId,
          name: item.ProductName,
          qty: Number(item.Quantity),
          price: Number(item.FinalPrice),
          image: item.Image
        }));

        setItems(responseApi);
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.response.data) {
        const profile = response.data.response.data[0];

        if (profile.nombre == '' && profile.mail == '' && profile.celular == '') SetShowInfoContact(false);
        
        setForm((f) => ({
          ...f,
          nombre: profile.nombre + (profile.apellido || "") || "",
          email: profile.mail || "",
          tel: profile.celular || "",
          // cp: profile.cPostal || "",
          // calle: profile.direccion || "",
          // numero_exterior: profile.numero_exterior || "",
          // numero_interior: profile.numero_interior || "",
          // colonia: profile.colonia || "",
          // ciudad: profile.municipio || "",
          // estado: profile.estado || "",
          // calle_cruze_1: profile.estado || "",
          // calle_cruze_2: profile.estado || ""
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
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
      setForm(f => ({
        ...f,
        selectedAddressId: value ? Number(value) : null
      }));
      setShowNewAddressForm(false);
      return;
    }


    // Formateo automático para tarjeta (XXXX XXXX XXXX XXXX)
    if (name === "tarjeta") {
      const cleaned = value.replace(/\s/g, "").replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
      setForm((f) => ({ ...f, [name]: formatted }));
      validateField(name, cleaned);
      return;
    }
    
    // Formateo automático para fecha (MM/AA)
    if (name === "exp") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      let formatted = cleaned;
      if (cleaned.length >= 2) {
        formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
      }
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
    // setOrderSuccess(null);
    
    Object.entries(form).forEach(([k, v]) => validateField(k, v));
    if (Object.keys(errors).length !== 0) {
      setIsSubmitting(false);
      alert("¡Ocurrio un error al procesar el pago!.");
      return;
    }

    const token = localStorage.getItem('ape_token');
    if (!token) return;

    form.typePayment = pago;
    console.log("Formulario de pago enviado:", form);
    const body = {
      form
    }

    try {
      const response = await clientAxios.post('/CheckPaymentCart', body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      
      const responseCheckPrevius = response.data.response;
      if(!responseCheckPrevius.ok || responseCheckPrevius.data.Status !== 'SUCCESS'){
        console.warn("ERROR al procesar el pago: " + (responseCheckPrevius.data.message || 'Ourrio un error al intentar proceder al pago.'));
        return;
      }
      
      const responseOrder = await clientAxios.post('/Payment', body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if(!responseOrder.data.response.ok){
        // Motrar mensaje de error.
        alert("Error al procesar el pedido. Por favor, intenta nuevamente.");
        onBack();
        return;
      }

      if(onProcess){
        onProcess(responseOrder.data.response.data)
      }
      setItems([]);

    } catch (error) {
      if (!error.response && !error.response.data.response) {
        console.error("Error al procesar el pago: " + error.response.data.response);  
        return;
      }
      console.error(error.response.data.response.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    Object.entries(formAddress).forEach(([k, v]) => validateField(k, v));
    if (Object.keys(errors).length !== 0) {
      alert("¡Ocurrio un error al guardar la dirección!.");
      return;
    }
    try {
      const token = localStorage.getItem('ape_token');
      if (!token) return;
      const body = {
        formAddress
      }
      const response = await clientAxios.post('/SaveShippingAddress', body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.data.response.ok) {
        getShippingAddressByUserId();
        setShowNewAddressForm(false);
      }
    } catch (error) {
      console.log("Error saving shipping address:", error);
    }
  };

  const formatCardNumber = (num) => {
    return num.replace(/\d{4}(?=.)/g, "$& ");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Volver al carrito"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">Finalizar Compra</h1>
            <p className="text-xs text-gray-500">Completa tus datos para proceder</p>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Shield size={16} />
            <span className="text-xs font-medium">Seguro</span>
          </div>
        </div>
      </div>

      {/* Contenido Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Resumen del Pedido con Spinner */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Truck size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Tu Pedido</h3>
          </div>
          
          {loadingItems ? (
            // Spinner mientras se cargan los items
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 text-sm">Cargando tu carrito...</p>
              </div>
            </div>
          ) : items.length === 0 ? (
            // Mensaje cuando no hay items
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Truck size={48} className="mx-auto opacity-50" />
              </div>
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            // Lista de items cuando están cargados
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="relative">
                    <img 
                      src={import.meta.env.VITE_BACKEND_URL_IMAGENES + item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {Number(item.qty)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">${item.price} c/u</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">${(Number(item.price) * Number(item.qty)).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingItems && items.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle size={14} />
                  GRATIS
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-800">Total</span>
                <div>
                  <p className="text-xl font-bold text-blue-700">${total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">IVA incluido</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resto del código permanece igual... */}
        {/* Información de Contacto */}
        {showInfoContact && form.nombre.length === 0 || form.tel.length === 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-blue-600" />
              <h3 className="font-semibold text-gray-800">Información de Contacto</h3>
            </div>
            
            {form.nombre.length === 0 || form.tel.length === 0 && (
                <div className="space-y-3">
                <div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="nombre"
                        type="text"
                        placeholder="Juan Pérez"
                        className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.nombre ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        }`}
                        value={form.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.nombre}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pointer-events-none opacity-70 ${
                          errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        }`}
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="tel"
                      type="tel"
                      placeholder="55 1234 5678"
                      className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.tel ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      }`}
                      value={form.tel}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.tel && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.tel}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Shipping Address Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Direcciones de Envio</h3>
          </div>

          <div className="space-y-3">
            {addresses.map(address => (
              <label
                key={address.id}
                className={`block p-3 border rounded-xl cursor-pointer transition-all
                  ${Number(form.selectedAddressId) === address.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400'
                  }`}
              >
                <input
                  type="radio"
                  name="selectedAddressId"
                  className="hidden"
                  value={address.id}
                  checked={Number(form.selectedAddressId) === address.id}
                  onChange={handleChange}
                />

                <p className="text-sm font-medium">
                  {address.street} #{address.exterior_number}
                </p>
                <p className="text-xs text-gray-600">
                  {address.neighborhood}, {address.city}, {address.state}
                </p>
              </label>
            ))}

              {/* Add new address option */}
              <label
                className={`block p-3 border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${showNewAddressForm
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                  }`}
              >
                <input
                  type="radio"
                  value=""
                  name="selectedAddressId"
                  className="hidden"
                  checked={showNewAddressForm}
                  onChange={() => {
                    setShowNewAddressForm(true);
                    setForm(f => ({ ...f, selectedAddressId: null }));
                  }}
                />

              <p className="text-sm font-semibold text-blue-600">
                + Add new shipping address
              </p>
            </label>
          </div>
        </div>

        {/* Dirección de Envío */}
        { showNewAddressForm  && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Dirección de Envío</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Código Postal *
              </label>
              <input
                name="postal_code"
                type="text"
                placeholder="01000"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.postal_code ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.postal_code}
                onChange={handleChange}
              />
              {errors.postal_code && <p className="mt-1 text-xs text-red-600">{errors.postal_code}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Colonia *
              </label>
              <input
                name="neighborhood"
                type="text"
                placeholder="Centro"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.neighborhood ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.neighborhood}
                onChange={handleChange}
              />
              {errors.neighborhood && <p className="mt-1 text-xs text-red-600">{errors.neighborhood}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ciudad *
              </label>
              <input
                name="city"
                type="text"
                placeholder="CDMX"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.city ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.city}
                onChange={handleChange}
              />
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <input
                name="state"
                type="text"
                placeholder="Ciudad de México"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.state ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.state}
                onChange={handleChange}
              />
              {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Calle *
              </label>
              <input
                name="street"
                type="text"
                placeholder="Av. Principal"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.street ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.street}
                onChange={handleChange}
              />
              {errors.street && <p className="mt-1 text-xs text-red-600">{errors.street}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Numero Exterior *
              </label>
              <input
                name="exterior_number"
                type="text"
                placeholder="#287"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.exterior_number ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.exterior_number}
                onChange={handleChange}
              />
              {errors.exterior_number && <p className="mt-1 text-xs text-red-600">{errors.exterior_number}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Numero Interior (opcional)
              </label>
              <input
                name="interior_number"
                type="text"
                placeholder="#789"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.interior_number ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.interior_number}
                onChange={handleChange}
              />
              {errors.interior_number && <p className="mt-1 text-xs text-red-600">{errors.interior_number}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Calle Cruze 1*
              </label>
              <input
                name="cross_street_1"
                type="text"
                placeholder="Av. Principal"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.cross_street_1 ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.cross_street_1}
                onChange={handleChange}
              />
              {errors.cross_street_1 && <p className="mt-1 text-xs text-red-600">{errors.cross_street_1}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Calle Cruze 2*
              </label>
              <input
                name="cross_street_2"
                type="text"
                placeholder="Av. Principal"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.cross_street_2 ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.cross_street_2}
                onChange={handleChange}
              />
              {errors.cross_street_2 && <p className="mt-1 text-xs text-red-600">{errors.cross_street_2}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Referencias (opcional)
              </label>
              <input
                name="references_customer"
                type="text"
                placeholder="Casa de color azul"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.references_customer ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.references_customer}
                onChange={handleChange}
              />
              {errors.references_customer && <p className="mt-1 text-xs text-red-600">{errors.references_customer}</p>}
            </div>

            {/* <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Numero Exterior *
              </label>
              <input
                name="numero_exterior"
                type="text"
                placeholder="#287"
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.numero_exterior ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                value={formAddress.numero_exterior}
                onChange={handleChange}
              />
              {errors.numero_exterior && <p className="mt-1 text-xs text-red-600">{errors.numero_exterior}</p>}
            </div> */}

            <button
              type="button"
              onClick={handleSubmitAddress}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition"
            >
              Guardar Dirección
            </button>

          </div>
        </div>
        )}

        {/* Método de Pago */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800">Método de Pago</h3>
          </div>

          <div className="space-y-3">
            {[
              { 
                id: "tarjeta", 
                label: "Tarjeta de Crédito/Débito", 
                icon: <CreditCard size={18} className="text-blue-600" />,
                description: "Pago seguro con tarjeta"
              },
              { 
                id: "mp", 
                label: "Mercado Pago", 
                icon: <Smartphone size={18} className="text-blue-500" />,
                description: "Pago rápido y seguro"
              },
              { 
                id: "oxxo", 
                label: "Pago en OXXO", 
                icon: <Store size={18} className="text-orange-600" />,
                description: "Paga en efectivo"
              },
            ].map((op) => (
              <div 
                key={op.id}
                className={`border rounded-xl overflow-hidden cursor-pointer transition-all hover:border-blue-400 ${
                  pago === op.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPago(op.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        pago === op.id ? "bg-blue-100" : "bg-gray-100"
                      }`}>
                        {op.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{op.label}</h4>
                        <p className="text-xs text-gray-500">{op.description}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      pago === op.id 
                        ? "border-blue-600 bg-blue-600" 
                        : "border-gray-300"
                    }`}>
                      {pago === op.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </div>

                {pago === op.id && (
                  <div className="px-4 pb-4">
                    {op.id === "tarjeta" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Nombre del Titular *
                          </label>
                          <input
                            name="titular"
                            type="text"
                            placeholder="Como aparece en la tarjeta"
                            className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.titular ? "border-red-500" : "border-gray-300"
                            }`}
                            value={form.titular}
                            onChange={handleChange}
                          />
                          {errors.titular && <p className="mt-1 text-xs text-red-600">{errors.titular}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Número de Tarjeta *
                          </label>
                          <div className="relative">
                            <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              name="tarjeta"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.tarjeta ? "border-red-500" : "border-gray-300"
                              }`}
                              value={form.tarjeta}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.tarjeta && <p className="mt-1 text-xs text-red-600">{errors.tarjeta}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Fecha de Expiración *
                            </label>
                            <input
                              name="exp"
                              type="text"
                              placeholder="MM/AA"
                              className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.exp ? "border-red-500" : "border-gray-300"
                              }`}
                              value={form.exp}
                              onChange={handleChange}
                            />
                            {errors.exp && <p className="mt-1 text-xs text-red-600">{errors.exp}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              CVV *
                            </label>
                            <div className="relative">
                              <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                name="cvv"
                                type="password"
                                placeholder="123"
                                maxLength="4"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.cvv ? "border-red-500" : "border-gray-300"
                                }`}
                                value={form.cvv}
                                onChange={handleChange}
                              />
                            </div>
                            {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    ) : op.id === "mp" ? (
                      <div className="text-center py-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-gray-700 mb-3">
                            Serás redirigido a Mercado Pago para completar tu pago de forma segura.
                          </p>
                          <button 
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                            Pagar con Mercado Pago
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="bg-orange-50 rounded-lg p-4">
                          <p className="text-sm text-gray-700 mb-3">
                            Generaremos una ficha de pago para que puedas pagar en cualquier tienda OXXO.
                          </p>
                          <button 
                            type="button"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                            Generar Ficha OXXO
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Garantías y Seguridad */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Shield className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Compra 100% Segura</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" />
                  <span>Pago cifrado con SSL</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" />
                  <span>No almacenamos datos de tu tarjeta</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" />
                  <span>Garantía de devolución de 30 días</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Fijo */}
      {pago == "tarjeta" && (
        <div className="border-t border-gray-200 bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Total a pagar</p>
              <p className="text-2xl font-bold text-blue-700">${total.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-70" />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(errors).length > 0 || loadingItems}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting || Object.keys(errors).length > 0 || loadingItems
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Procesando pago...
              </>
            ) : loadingItems ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Cargando carrito...
              </>
            ) : (
              <>
                <Lock size={18} />
                Pagar de forma segura
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Al completar tu compra, aceptas nuestros{" "}
            <button className="text-blue-600 hover:text-blue-800">Términos y Condiciones</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SideCheckOut;