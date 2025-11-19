import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';

import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
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

  const [colonias , setColonias] = useState([]); 
  const [btnUpdateSave , setBtnUpdateSave] = useState(false);
  const { toasts, toast, removeToast } = useToast();
  const [loading , SetLoading] = useState(true);

  useEffect(() => {
    handleGetConfig();
  }, []);

  const handleGetConfig = async () => {
    try{
      const token = localStorage.getItem('ape_token');

      if(!token){
        toast.error("Se acabo el tiempo de sesion. ","error");
        return
      }

      const { data } = await axios.get("http://localhost:3001/tienda/api/Admin/GetConfiguracion", {
        headers : {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        }
      });

      if(data.tienda == null){
        toast.info("Aun no cuenta con una configuración.","info");
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

      toast.success("Se cargo tu configuracion correctamente.","success");

    }catch(e){
      showToast("Ocurrio un error inesperado: " + e,"error");
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
        const { data } = await axios.get(`http://localhost:3001/tienda/api/GetCodePostal/${value}`);

        if (data.CodigoPostal?.length > 0) {
          const info = data.CodigoPostal[0];

          // Llenar los campos automáticamente
          setConfig((prev) => ({
            ...prev,
            EstadoMexico: info.estado,
            municipio: info.municipio,
            colonia: "",
          }));

          // Separar las colonias en un arreglo
          const listaColonias = info.colonias.split(",").map((c) => c.trim());
          setColonias(listaColonias);
        } else {
          // Si no se encuentra el CP, limpiar campos
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
        // setConfig({ ...config, logo: reader.result });
        setConfig({ ...config, logo: file });
      };
      reader.readAsDataURL(file);
      //setConfig({ ...config, logo: file });
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    // Aquí podrías guardar en base de datos o enviar a una API
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

    try{
        const token = localStorage.getItem('ape_token');

        if(!token){
          toast.error("Ocurrio un error inesperado.");
          return;
        }

        const { data } = await axios.post("http://localhost:3001/tienda/api/Admin/SetConfiguracionEco", formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization : `Bearer ${token}`
          },
        });

        if(!data){
          toast.error("Se guarda la configración completamente. ");  
        }

        toast.success("Se guarda la configración completamente. ");
    
    }catch(e){
      toast.error("Ocurrio un error inesperado: " + e.response.data.msg);
    }
    
  };

  const handleActualizar = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("ape_token");
      if (!token) {
        toast.error("El tiempo de sesion caduco. ");
        return;
      }

      // Creamos el FormData dinámicamente
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

      // Incluye el id de configuración si existe
      if (config.idConfiguracion) {
        formData.append("id_configuracion", config.idConfiguracion);
      }

      const { data } = await axios.patch(
        "http://localhost:3001/tienda/api/Admin/UpdateConfiguracionEco",
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
      toast.error("Error al actualizar configuración:", error);
    }
  };

  if(loading){
    return(
      <Spinner message={"Cargando tu configuracion..."}/>
    )
  }

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gray-50">
      <ToastContainer toasts={toasts} removeToast={removeToast}/>
    <h2 className="text-3xl font-bold mb-6">Configuración del Ecommerce</h2>
    <form onSubmit={btnUpdateSave ? handleActualizar : handleGuardar}>
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
      {/* IdConfiguracion */}
      <div>
        <label className="block font-semibold mb-1">Num Configuracion</label>
        <input
          type="text"
          value={config.idConfiguracion}
          name='idConfiguracion'
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='idConfiguracion'
          readOnly
        />
      </div>

      {/* Nombre */}
      <div>
        <label className="block font-semibold mb-1">Ecommerce</label>
        <input
          type="text"
          value={config.nombreTienda}
          name='nombreTienda'
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Nombre de tu Ecommerce'
        />
      </div>

    {/* Correo */}
    <div>
      <label className="block font-semibold mb-1">Correo de Contacto</label>
      <input
        type="email"
        value={config.correoContacto}
        name='correoContacto'
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2"
        placeholder='Primero correo electronico de contacto'
      />
    </div>

    {/* Teléfono */}
    <div>
      <label className="block font-semibold mb-1">Teléfono</label>
      <input
        type="tel"
        value={config.telefono}
        name='telefono'
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2"
        placeholder='Ingresa un numero de telefono'
      />
    </div>

      {/* Código Postal */}
      <div>
        <label className="block font-semibold mb-1">Código Postal</label>
        <input
          type="text"
          name="codigoPostal"
          value={config.codigoPostal}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Ej. 45690"
          maxLength={5}
        />
      </div>

      {/* Colonia */}
      <div>
        <label className="block font-semibold mb-1">Colonia</label>
        <select
          name="colonia"
          value={config.colonia}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
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

      {/* Municipio */}
      <div>
        <label className="block font-semibold mb-1">Municipio</label>
        <input
          type="text"
          name="municipio"
          value={config.municipio}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          readOnly
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block font-semibold mb-1">Estado</label>
        <input
          type="text"
          name="EstadoMexico"
          value={config.EstadoMexico}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          readOnly
        />
      </div>

    {/* Dirección */}
    <div>
      <label className="block font-semibold mb-1">Dirección</label>
      <input
        type="text"
        value={config.direccion}
        name='direccion'
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2"
        placeholder='Dirección (opcional)' 
      />
    </div>

    {/* Color */}
    {/* <div>
      <label className="block font-semibold mb-1">Color Primario</label>
      <input
        type="color"
        value="#1A73E8"
        className="w-16 h-10 border rounded-lg p-1"
      />
    </div> */}

    {/* Logo */}
    <div>
  <label className="block font-semibold mb-1">Logotipo</label>

  {config.logo ? (
    <img
  src={
      config.logo
        ? typeof config.logo === "string"
          ? config.logo // ya es una URL
          : URL.createObjectURL(config.logo) // es un archivo (File)
        : "https://via.placeholder.com/150x50?text=Sin+Logo"
    }
    alt="Logo del negocio"
    className="mt-2 h-16 object-contain rounded border"
    />
      ) : (
        <img
          src="https://via.placeholder.com/150x50?text=Sin+Logo"
          alt="Sin logo"
          className="mt-2 h-16 object-contain rounded border"
        />
      )}

  <label className="block font-semibold text-gray-500 mb-1 mt-2">
    Cambiar Logo
  </label>
  <input
    type="file"
    accept="image/*"
    name='image'
    onChange={handleLogoChange}
    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
  />
</div>

    {/* Descripción */}
    <div className="md:col-span-2">
      <label className="block font-semibold mb-1">Descripción del Ecommerce / Negocio</label>
      <textarea
        value={config.descripcion}
        name='descripcion'
        onChange={handleChange}
        rows={4}
        className="w-full border rounded-lg px-4 py-2"
        placeholder='La Descripcion general de tu tienda'
      />
    </div>

    {/* Contactos adicionales */}
    <div className="md:col-span-2">
      <label className="block font-semibold mb-1">Contactos adicionales (opcional)</label>
      <label className="block font-semibold mb-1 text-gray-500">Teléfono</label>
      <input
        type="text"
        value={config.telefono1}
        name='telefono1'
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 mb-2"
        placeholder='Ingresa otro numero de telefono (opcional)'
      />
      <label className="block font-semibold mb-1 text-gray-500">Correo Electronico</label>
      <input
        type="email"
        name='correo1'
        value={config.correo1}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2"
        placeholder='Ingresa otro correo electronico de contacto (opcional)'
      />
    </div>

    {/* Redes Sociales */}
    <div className="md:col-span-2">
      <label className="block font-semibold mb-2">Redes Sociales</label>

      <div className="flex items-center gap-2 mb-2">
        <Facebook className="w-5 h-5 text-blue-600" />
        <input
          type="url"
          value={config.facebook}
          onChange={handleChange}
          name='facebook'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Ingresa la url de tu cuenta de facebook'
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Instagram className="w-5 h-5 text-pink-500" />
        <input
          type="url"
          value={config.Instagram}
          name='Instagram'
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Ingresa la url de tu cuenta de instagram'
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Youtube className="w-5 h-5 text-red-600" />
        <input
          type="url"
          value={config.youtube}
          name='youtube'
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Ingresa la url de tu canal de Youtube'
        />
      </div>

      <div className="flex items-center gap-2">
        <Linkedin className="w-5 h-5 text-blue-700" />
        <input
          type="url"
          name='Linkedin'
          value={config.Linkedin}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Ingresa la url de tu perfil de linkdln'
        />
      </div>
    </div>

    {/* Faqs Genera */}
    <div className="md:col-span-2">
      <label className="block font-semibold mb-1">Preguntas Frecuentes Generales</label>
      <div className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50 mb-2">
        <input
        value={config.Pregunta1}
        onChange={handleChange}
        name='Pregunta1'
        type="text"
        className="w-full border rounded-lg px-4 py-2"
        placeholder='Ingresa una pregunta frecuente general 1'
        />
        <textarea
          value={config.Respuesta1}
          onChange={handleChange}
          name='Respuesta1'
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Escribe la solución de la pregunta 1'
        />
      </div>
      <div className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50">
        <input
          type="text"
          value={config.Pregunta2}
          onChange={handleChange}
          name='Pregunta2'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Ingresa una pregunta frecuente general 2'
        />
        <textarea
          value={config.Respuesta2}
          onChange={handleChange}
          name='Respuesta2'
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Escribe la solución de la pregunta 2'
        />
      </div>
      <div className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50">
        <input
          type="text"
          value={config.Pregunta3}
          onChange={handleChange}
          name='Pregunta3'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Ingresa una pregunta frecuente general 3'
        />
        <textarea
          value={config.Respuesta3}
          onChange={handleChange}
          name='Respuesta3'
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Escribe la solución de la pregunta 3'
        />
      </div>
    </div>

    {/* Devoluciones */}
    <div className="md:col-span-2">
      <label className="block font-semibold mb-1">Política de Devoluciones</label>
      <textarea
        value={config.politicaDevoluciones}
        onChange={handleChange}
        name='politicaDevoluciones'
        rows={2}
        className="w-full border rounded-lg px-4 py-2 mb-3"
        placeholder='Encabezado de Devolucion'
      />
      <div className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50 mb-2">
        <input
          type="text"
          value={config.tituloDevolucion1}
          onChange={handleChange}
          name='tituloDevolucion1'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Titulo de Devolución 1'
        />
        <textarea
          value={config.descripcionDevolucion1}
          onChange={handleChange}
          name='descripcionDevolucion1'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Descripción de Devolución 1'
        />
      </div>
      <div className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50">
        <input
          type="text"
          value={config.tituloDevolucion2}
          onChange={handleChange}
          name='tituloDevolucion2'
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Titulo de Devolución 2'
        />
        <textarea
          value={config.descripcionDevolucion2}
          onChange={handleChange}
          name='descripcionDevolucion2'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Descripción de Devolución 2'
        />
      </div>
      <div className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50">
        <input
          type="text"
          value={config.tituloDevolucion3}
          onChange={handleChange}
          name='tituloDevolucion3'
          rows={2}
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Titulo de Devolucion 3'
        />
        <textarea
          value={config.descripcionDevolucion3}
          onChange={handleChange}
          name='descripcionDevolucion3'
          className="w-full border rounded-lg px-4 py-2"
          placeholder='Descripción de Devolución 3'
        />
      </div>
    </div>

    {/* Métodos de Pago */}
<div className="md:col-span-2">
  <label className="block font-semibold mb-3 text-gray-800">
    Activar o Desactivar tus Métodos de Pago
  </label>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {/* Visa */}
    <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${config.visa ? 'bg-blue-50 border-blue-400' : 'border-gray-200'}`}>
      <input
        type="checkbox"
        className="w-5 h-5 accent-blue-600"
        name="visa"
        checked={config.visa}
        onChange={handleChange}
      />
      <FaCcVisa className="text-3xl text-blue-600" />
      <span className="font-medium text-gray-700">Visa</span>
    </label>

    {/* Mastercard */}
    <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${config.mastercard ? 'bg-red-50 border-red-400' : 'border-gray-200'}`}>
      <input
        type="checkbox"
        className="w-5 h-5 accent-red-600"
        name="mastercard"
        checked={config.mastercard}
        onChange={handleChange}
      />
      <FaCcMastercard className="text-3xl text-red-600" />
      <span className="font-medium text-gray-700">Mastercard</span>
    </label>

    {/* PayPal */}
    <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${config.payPal ? 'bg-sky-50 border-sky-400' : 'border-gray-200'}`}>
      <input
        type="checkbox"
        className="w-5 h-5 accent-sky-600"
        name="payPal"
        checked={config.payPal}
        onChange={handleChange}
      />
      <FaCcPaypal className="text-3xl text-sky-600" />
      <span className="font-medium text-gray-700">PayPal</span>
    </label>

    {/* Apple Pay */}
    <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${config.applePay ? 'bg-gray-50 border-gray-400' : 'border-gray-200'}`}>
      <input
        type="checkbox"
        className="w-5 h-5 accent-gray-800"
        name="applePay"
        checked={config.applePay}
        onChange={handleChange}
      />
      <FaApplePay className="text-3xl text-gray-800" />
      <span className="font-medium text-gray-700">Apple Pay</span>
    </label>

    {/* Stripe */}
    <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-lg ${config.stripe ? 'bg-indigo-50 border-indigo-400' : 'border-gray-200'}`}>
      <input
        type="checkbox"
        className="w-5 h-5 accent-indigo-600"
        name="stripe"
        checked={config.stripe}
        onChange={handleChange}
      />
      <FaCcStripe className="text-3xl text-indigo-600" />
      <span className="font-medium text-gray-700">Stripe</span>
    </label>
  </div>
</div>
  </div>

  {/* Guardar */}
  { btnUpdateSave ? (
    <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
    Editar Configuracion
  </button>
  ) : 
  (
    <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
    Guardar configuración
  </button>
  )}

    </form>
  </section>
  );
};

export default AdminConfiguracion;
