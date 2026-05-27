import React, { useState, useEffect } from 'react';
import clientAxios from '../config/axios.jsx';
import Spinner from '../components/Spinner.jsx';
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';

import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Settings,
  Store,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
  FileText,
  Users,
  MessageSquare,
  RefreshCw,
  Shield,
  CreditCard,
  Globe,
  Building,
  Home,
  Plus,
  Save,
  Edit2,
  Palette,
  Info,
  Upload,
  X,
  CheckCircle
} from "lucide-react";

import {
  FaCcVisa,
  FaCcStripe,
  FaCcMastercard,
  FaApplePay,
  FaCcPaypal,
} from "react-icons/fa6";

const AdminConfiguracion = () => {
  
  const [config, setConfig] = useState({
    idConfiguracion: 0,
    nombreTienda: "",
    correoContacto: "",
    telefono: "",
    EstadoMexico: "",
    codigoPostal: "",
    colonia : "",
    municipio: "",
    direccion: "",
    colorPrimario: "",
    logo: "", 
    descripcion: "",
    telefono1: "",
    correo1: "",
    facebook : "",
    Instagram : "",
    youtube : "",
    Linkedin : "",
    Pregunta1 : "",
    Respuesta1 : "",
    Pregunta2 : "",
    Respuesta2 : "",
    Pregunta3 : "",
    Respuesta3 : "",
    politicaDevoluciones : "",
    tituloDevolucion1 : "",
    descripcionDevolucion1 : "",
    tituloDevolucion2 : "",
    descripcionDevolucion2 : "",
    tituloDevolucion3 : "",
    descripcionDevolucion3 : "",
    visa : false,
    mastercard : false,
    payPal : false,
    applePay : false,
    stripe : false,
  });

  const [colonias, setColonias] = useState([]); 
  const [btnUpdateSave, setBtnUpdateSave] = useState(false);
  const { toasts, toast, removeToast } = useToast();
  const [loading, SetLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleGetConfig();
  }, []);

  const handleGetConfig = async () => {
    try{
      const token = localStorage.getItem('ape_token');

      if(!token){
        toast.error("Se acabo el tiempo de sesion.", "error");
        return
      }

      const { data } = await clientAxios.get("/Admin/GetConfiguracion", {
        headers : {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        }
      });

      if(data.tienda == null){
        toast.info("Aún no cuenta con una configuración.", "info");
        return;
      }

      setBtnUpdateSave(true);
      const { config, devoluciones, faqs, metodosPago, socialMedia } = data.tienda; 

      // Mapear las redes sociales
      const redesMap = {};
      socialMedia?.forEach(r => {
        redesMap[r.nombre_red.toLowerCase()] = r.url;
      });

      // Mapear métodos de pago
      const metodosMap = {};
      metodosPago?.forEach(m => {
        metodosMap[m.nombre_metodo.toLowerCase()] = m.activo === 1;
      });

      // Actualizar estado con todos los valores
      setConfig(prev => ({
        ...prev,
        idConfiguracion : config.id_configuracion || 0,
        nombreTienda: config.nombre_tienda || "",
        correoContacto: config.correo_contacto || "",
        telefono: config.telefono || "",
        EstadoMexico: config.estado || "",
        codigoPostal: config.codigo_postal || "",
        colonia: config.colonia || "",
        municipio: config.municipio || "",
        direccion: config.direccion || "",
        colorPrimario: config.color_primario || "",
        descripcion: config.descripcion || "",
        logo: config.logo_url || "",
        telefono1: config.telefono1 || "",
        correo1: config.correo1 || "",

        facebook: redesMap.facebook || "",
        Instagram: redesMap.instagram || "",
        youtube: redesMap.youtube || "",
        Linkedin: redesMap.linkedin || "",

        Pregunta1: faqs?.[0]?.pregunta || "",
        Respuesta1: faqs?.[0]?.respuesta || "",
        Pregunta2: faqs?.[1]?.pregunta || "",
        Respuesta2: faqs?.[1]?.respuesta || "",
        Pregunta3: faqs?.[2]?.pregunta || "",
        Respuesta3: faqs?.[2]?.respuesta || "",

        politicaDevoluciones: devoluciones?.length > 0 ? "true" : "",
        tituloDevolucion1: devoluciones?.[0]?.titulo || "",
        descripcionDevolucion1: devoluciones?.[0]?.descripcion || "",
        tituloDevolucion2: devoluciones?.[1]?.titulo || "",
        descripcionDevolucion2: devoluciones?.[1]?.descripcion || "",
        tituloDevolucion3: devoluciones?.[2]?.titulo || "",
        descripcionDevolucion3: devoluciones?.[2]?.descripcion || "",

        visa: metodosMap.visa || false,
        mastercard: metodosMap.mastercard || false,
        payPal: metodosMap.paypal || false,
        applePay: metodosMap.applepay || false,
        stripe: metodosMap.stripe || false,
      }));

      toast.success("Se cargó tu configuración correctamente.", "success");

    }catch(e){
      toast.error("Ocurrió un error inesperado: " + e, "error");
    }
    finally{
      SetLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "codigoPostal" && value.length === 5) {
      try {
        const { data } = await clientAxios.get(`/GetCodePostal/${value}`);

        if (data.CodigoPostal?.length > 0) {
          const info = data.CodigoPostal[0];

          setConfig((prev) => ({
            ...prev,
            EstadoMexico: info.estado,
            municipio: info.municipio,
            colonia: "",
          }));

          const listaColonias = info.colonias.split(",").map((c) => c.trim());
          setColonias(listaColonias);
        } else {
          setConfig((prev) => ({
            ...prev,
            EstadoMexico: "",
            municipio: "",
            colonia: "",
          }));
          setColonias([]);
        }
      } catch (error) {
        console.error("Error al consultar el código postal:", error);
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig({ ...config, logo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();

      formData.append('idConfiguracion', config.idConfiguracion);
      formData.append('nombreTienda', config.nombreTienda);
      formData.append('correoContacto', config.correoContacto);
      formData.append('telefono', config.telefono);
      formData.append('EstadoMexico', config.EstadoMexico);
      formData.append('codigoPostal', config.codigoPostal);
      formData.append('colonia', config.colonia);
      formData.append('municipio', config.municipio);
      formData.append('direccion', config.direccion);
      formData.append('colorPrimario', config.colorPrimario);
      formData.append('logo', config.logo);
      formData.append('descripcion', config.descripcion);
      formData.append('telefono1', config.telefono1);
      formData.append('correo1', config.correo1);
      formData.append('facebook', config.facebook);
      formData.append('Instagram', config.Instagram);
      formData.append('youtube', config.youtube);
      formData.append('Linkedin', config.Linkedin);
      formData.append('Pregunta1', config.Pregunta1);
      formData.append('Respuesta1', config.Respuesta1);
      formData.append('Pregunta2', config.Pregunta2);
      formData.append('Respuesta2', config.Respuesta2);
      formData.append('Pregunta3', config.Pregunta3);
      formData.append('Respuesta3', config.Respuesta3);
      formData.append('politicaDevoluciones', config.politicaDevoluciones);
      formData.append('tituloDevolucion1', config.tituloDevolucion1);
      formData.append('descripcionDevolucion1', config.descripcionDevolucion1);
      formData.append('tituloDevolucion2', config.tituloDevolucion2);
      formData.append('descripcionDevolucion2', config.descripcionDevolucion2);
      formData.append('tituloDevolucion3', config.tituloDevolucion3);
      formData.append('descripcionDevolucion3', config.descripcionDevolucion3);
      formData.append('visa', config.visa);
      formData.append('mastercard', config.mastercard);
      formData.append('payPal', config.payPal);
      formData.append('applePay', config.applePay);
      formData.append('stripe', config.stripe);

      const token = localStorage.getItem('ape_token');

      if(!token){
        toast.error("Ocurrió un error inesperado.");
        return;
      }

      const { data } = await clientAxios.post("/Admin/SetConfiguracionEco", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization : `Bearer ${token}`
        },
      });

      toast.success("Configuración guardada exitosamente.");

    } catch(e) {
      toast.error("Ocurrió un error: " + (e.response?.data?.msg || e.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("ape_token");
      if (!token) {
        toast.error("El tiempo de sesión caducó.");
        return;
      }

      const formData = new FormData();
      const campos = {
        idConfiguracion: config.idConfiguracion,
        nombreTienda: config.nombreTienda,
        correoContacto: config.correoContacto,
        telefono: config.telefono,
        EstadoMexico: config.EstadoMexico,
        codigoPostal: config.codigoPostal,
        colonia: config.colonia,
        municipio: config.municipio,
        direccion: config.direccion,
        colorPrimario: config.colorPrimario,
        logo: config.logo,
        descripcion: config.descripcion,
        telefono1: config.telefono1,
        correo1: config.correo1,
        facebook: config.facebook,
        Instagram: config.Instagram,
        youtube: config.youtube,
        Linkedin: config.Linkedin,
        Pregunta1: config.Pregunta1,
        Respuesta1: config.Respuesta1,
        Pregunta2: config.Pregunta2,
        Respuesta2: config.Respuesta2,
        Pregunta3: config.Pregunta3,
        Respuesta3: config.Respuesta3,
        politicaDevoluciones: config.politicaDevoluciones,
        tituloDevolucion1: config.tituloDevolucion1,
        descripcionDevolucion1: config.descripcionDevolucion1,
        tituloDevolucion2: config.tituloDevolucion2,
        descripcionDevolucion2: config.descripcionDevolucion2,
        tituloDevolucion3: config.tituloDevolucion3,
        descripcionDevolucion3: config.descripcionDevolucion3,
        visa: config.visa,
        mastercard: config.mastercard,
        payPal: config.payPal,
        applePay: config.applePay,
        stripe: config.stripe,
      };

      for (const [key, value] of Object.entries(campos)) {
        if (value !== undefined && value !== null) formData.append(key, value);
      }

      if (config.idConfiguracion) {
        formData.append("id_configuracion", config.idConfiguracion);
      }

      const { data } = await clientAxios.patch(
        "/Admin/UpdateConfiguracionEco",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Configuración actualizada correctamente");
      
    } catch (error) {
      toast.error("Error al actualizar configuración: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if(loading){
    return(
      <Spinner message={"Cargando tu configuración..."}/>
    )
  }

  const sections = [
    { id: 'general', name: 'General', icon: <Settings size={20} /> },
    { id: 'ubicacion', name: 'Ubicación', icon: <MapPin size={20} /> },
    { id: 'contacto', name: 'Contacto', icon: <Phone size={20} /> },
    { id: 'redes', name: 'Redes Sociales', icon: <Globe size={20} /> },
    { id: 'faqs', name: 'Preguntas Frecuentes', icon: <MessageSquare size={20} /> },
    { id: 'devoluciones', name: 'Devoluciones', icon: <RefreshCw size={20} /> },
    { id: 'pagos', name: 'Métodos de Pago', icon: <CreditCard size={20} /> },
  ];

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      <ToastContainer toasts={toasts} removeToast={removeToast}/>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Configuración del Ecommerce
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Administra la configuración completa de tu tienda en línea
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleGetConfig()}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              <RefreshCw size={18} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Navegación por secciones */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-thin">
          <div className="flex space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {section.icon}
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={btnUpdateSave ? handleActualizar : handleGuardar}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Sección General */}
          {activeSection === 'general' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Settings className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Información General</h2>
                  <p className="text-sm text-gray-600">Configuración básica de tu ecommerce</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div className="md:col-span-2">
                  <div className="bg-gradient-to-r from-blue-50 to-transparent p-5 rounded-xl border border-blue-100">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Logo de la Tienda</label>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative w-48 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 p-4 flex items-center justify-center">
                        {config.logo ? (
                          <img
                            src={typeof config.logo === "string" ? config.logo : URL.createObjectURL(config.logo)}
                            alt="Logo del negocio"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Sin logo</p>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">Cambiar logo</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label
                            htmlFor="logo-upload"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                          >
                            Seleccionar Imagen
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Formatos: JPG, PNG, GIF. Recomendado: 400x200px
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nombre Tienda */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Ecommerce *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Store size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={config.nombreTienda}
                      name='nombreTienda'
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nombre de tu tienda"
                      required
                    />
                  </div>
                </div>

                {/* ID Configuración */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID Configuración</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Info size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={config.idConfiguracion}
                      name='idConfiguracion'
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-500"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText size={20} className="text-gray-400" />
                    </div>
                    <textarea
                      value={config.descripcion}
                      name='descripcion'
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe tu negocio"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sección Ubicación */}
          {activeSection === 'ubicacion' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-50 rounded-xl">
                  <MapPin className="text-green-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ubicación</h2>
                  <p className="text-sm text-gray-600">Configura la dirección de tu negocio</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Código Postal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={config.codigoPostal}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej. 45690"
                      maxLength={5}
                    />
                  </div>
                </div>

                {/* Colonia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Colonia *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={20} className="text-gray-400" />
                    </div>
                    <select
                      name="colonia"
                      value={config.colonia}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={colonias.length === 0}
                    >
                      <option value="">Selecciona una colonia</option>
                      {colonias.map((col, i) => (
                        <option key={i} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Municipio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Municipio</label>
                  <input
                    type="text"
                    name="municipio"
                    value={config.municipio}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <input
                    type="text"
                    name="EstadoMexico"
                    value={config.EstadoMexico}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>

                {/* Dirección */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <textarea
                    value={config.direccion}
                    name='direccion'
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Calle y número (opcional)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección Contacto */}
          {activeSection === 'contacto' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <Phone className="text-purple-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Información de Contacto</h2>
                  <p className="text-sm text-gray-600">Datos para que los clientes te contacten</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Correo Principal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Principal *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={config.correoContacto}
                      name='correoContacto'
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                {/* Teléfono Principal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Principal *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={config.telefono}
                      name='telefono'
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+52 33 1234 5678"
                    />
                  </div>
                </div>

                {/* Teléfono Secundario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Secundario</label>
                  <input
                    type="text"
                    value={config.telefono1}
                    name='telefono1'
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Teléfono adicional (opcional)"
                  />
                </div>

                {/* Correo Secundario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Secundario</label>
                  <input
                    type="email"
                    name='correo1'
                    value={config.correo1}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="correo2@ejemplo.com (opcional)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección Redes Sociales */}
          {activeSection === 'redes' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-pink-50 rounded-xl">
                  <Globe className="text-pink-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Redes Sociales</h2>
                  <p className="text-sm text-gray-600">Conecta tu tienda con tus redes sociales</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Facebook */}
                <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Facebook className="w-6 h-6 text-blue-600" />
                    <label className="block font-medium text-gray-700">Facebook</label>
                  </div>
                  <input
                    type="url"
                    value={config.facebook}
                    onChange={handleChange}
                    name='facebook'
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://facebook.com/tu-pagina"
                  />
                </div>

                {/* Instagram */}
                <div className="bg-gradient-to-r from-pink-50 to-transparent p-4 rounded-xl border border-pink-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Instagram className="w-6 h-6 text-pink-500" />
                    <label className="block font-medium text-gray-700">Instagram</label>
                  </div>
                  <input
                    type="url"
                    value={config.Instagram}
                    name='Instagram'
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="https://instagram.com/tu-cuenta"
                  />
                </div>

                {/* YouTube */}
                <div className="bg-gradient-to-r from-red-50 to-transparent p-4 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <label className="block font-medium text-gray-700">YouTube</label>
                  </div>
                  <input
                    type="url"
                    value={config.youtube}
                    name='youtube'
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="https://youtube.com/tu-canal"
                  />
                </div>

                {/* LinkedIn */}
                <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Linkedin className="w-6 h-6 text-blue-700" />
                    <label className="block font-medium text-gray-700">LinkedIn</label>
                  </div>
                  <input
                    type="url"
                    name='Linkedin'
                    value={config.Linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                    placeholder="https://linkedin.com/company/tu-empresa"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sección FAQs */}
          {activeSection === 'faqs' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <MessageSquare className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Preguntas Frecuentes</h2>
                  <p className="text-sm text-gray-600">Configura preguntas comunes de tus clientes</p>
                </div>
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-gradient-to-r from-gray-50 to-transparent p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-medium">
                        {num}
                      </div>
                      <h3 className="font-medium text-gray-900">Pregunta {num}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
                        <input
                          type="text"
                          value={config[`Pregunta${num}`]}
                          onChange={handleChange}
                          name={`Pregunta${num}`}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Ingresa la pregunta ${num}`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Respuesta</label>
                        <textarea
                          value={config[`Respuesta${num}`]}
                          onChange={handleChange}
                          name={`Respuesta${num}`}
                          rows={3}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Escribe la respuesta para la pregunta ${num}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección Devoluciones */}
          {activeSection === 'devoluciones' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-50 rounded-xl">
                  <RefreshCw className="text-amber-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Política de Devoluciones</h2>
                  <p className="text-sm text-gray-600">Configura los términos de devolución</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Política Principal */}
                <div className="bg-gradient-to-r from-amber-50 to-transparent p-4 rounded-xl border border-amber-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Política General</label>
                  <textarea
                    value={config.politicaDevoluciones}
                    onChange={handleChange}
                    name='politicaDevoluciones'
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Describe la política general de devoluciones"
                  />
                </div>

                {/* Puntos de Devolución */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {num}
                      </div>
                      <h3 className="font-medium text-gray-900">Punto {num}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Título</label>
                        <input
                          type="text"
                          value={config[`tituloDevolucion${num}`]}
                          onChange={handleChange}
                          name={`tituloDevolucion${num}`}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder={`Título del punto ${num}`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Descripción</label>
                        <textarea
                          value={config[`descripcionDevolucion${num}`]}
                          onChange={handleChange}
                          name={`descripcionDevolucion${num}`}
                          rows={2}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder={`Descripción del punto ${num}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección Métodos de Pago */}
          {activeSection === 'pagos' && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <CreditCard className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Métodos de Pago</h2>
                  <p className="text-sm text-gray-600">Activa los métodos de pago disponibles</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Visa */}
                <label className={`flex flex-col items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  config.visa 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-blue-600"
                      name="visa"
                      checked={config.visa}
                      onChange={handleChange}
                    />
                    <FaCcVisa className="text-4xl text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Visa</span>
                  <span className="text-xs text-gray-500 mt-1">Tarjetas Visa</span>
                </label>

                {/* Mastercard */}
                <label className={`flex flex-col items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  config.mastercard 
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-red-600"
                      name="mastercard"
                      checked={config.mastercard}
                      onChange={handleChange}
                    />
                    <FaCcMastercard className="text-4xl text-red-600" />
                  </div>
                  <span className="font-medium text-gray-900">Mastercard</span>
                  <span className="text-xs text-gray-500 mt-1">Tarjetas Mastercard</span>
                </label>

                {/* PayPal */}
                <label className={`flex flex-col items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  config.payPal 
                    ? 'bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-400 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-sky-600"
                      name="payPal"
                      checked={config.payPal}
                      onChange={handleChange}
                    />
                    <FaCcPaypal className="text-4xl text-sky-600" />
                  </div>
                  <span className="font-medium text-gray-900">PayPal</span>
                  <span className="text-xs text-gray-500 mt-1">Pagos con PayPal</span>
                </label>

                {/* Apple Pay */}
                <label className={`flex flex-col items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  config.applePay 
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-gray-800"
                      name="applePay"
                      checked={config.applePay}
                      onChange={handleChange}
                    />
                    <FaApplePay className="text-4xl text-gray-800" />
                  </div>
                  <span className="font-medium text-gray-900">Apple Pay</span>
                  <span className="text-xs text-gray-500 mt-1">Pagos Apple</span>
                </label>

                {/* Stripe */}
                <label className={`flex flex-col items-center justify-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  config.stripe 
                    ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-indigo-600"
                      name="stripe"
                      checked={config.stripe}
                      onChange={handleChange}
                    />
                    <FaCcStripe className="text-4xl text-indigo-600" />
                  </div>
                  <span className="font-medium text-gray-900">Stripe</span>
                  <span className="text-xs text-gray-500 mt-1">Pasarela Stripe</span>
                </label>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-transparent rounded-xl border border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-600 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Recomendación</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Activa al menos dos métodos de pago para ofrecer más opciones a tus clientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando...
                  </>
                ) : btnUpdateSave ? (
                  <>
                    <Save size={20} />
                    Actualizar Configuración
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Guardar Configuración
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setActiveSection(sections[(sections.findIndex(s => s.id === activeSection) + 1) % sections.length].id)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Siguiente Sección
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AdminConfiguracion;