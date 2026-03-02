import React, { useState } from 'react'
import { Brand } from '../../../../types/brand.type.ts';
import {
  X,
  Tag,
  CheckCircle,
  Award,
  Star,
  TrendingUp,
  Building,
  Edit,
  Plus,
  Shield,
  Sparkles
} from "lucide-react";

interface FormParamsBrand {
    IdBrand?: number,
    onClose: () => void,
    onSubmit: (brand: Brand) => void
}

const FormAddBrand = ({ IdBrand, onClose, onSubmit} : FormParamsBrand) => {

  const [brandData, setBrandData] = useState<Brand>({
      id: IdBrand || 0,
      name: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleSubmitBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Si hay un logo, agregarlo al brandData
      const brandToSubmit = {
        ...brandData,
        ...(logoFile && { logoFile })
      };
      
      await onSubmit(brandToSubmit);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <Award className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {IdBrand == undefined ? 'Nueva Marca' : 'Editar Marca'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {IdBrand == undefined 
                      ? 'Agrega una nueva marca a tu catálogo' 
                      : 'Actualiza la información de la marca'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Formulario */}
          <form className="p-6 space-y-6" onSubmit={handleSubmitBrand}>
            
            {/* Sección de Información Básica */}
            <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building size={20} />
                Información de la Marca
              </h3>
              
              {/* Nombre de la Marca */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la marca *
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={brandData.name}
                    onChange={e => setBrandData({...brandData, name: e.target.value})}
                    placeholder="Ej. CHB - Chenson Business, Nike, Apple..."
                    className="w-full px-4 py-3 pl-11 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag size={20} className="text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Elige un nombre reconocible y fácil de recordar
                </p>
              </div>

              {/* Logo de la Marca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de la marca
                </label>
                
                {/* Área de subida de logo */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Sube el logo de la marca (opcional)
                  </p>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="brand-logo-upload"
                  />
                  <label
                    htmlFor="brand-logo-upload"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Subir Logo
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    Recomendado: PNG transparente, mínimo 200x200px
                  </p>
                </div>

                {/* Vista previa del logo */}
                {logoPreview && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        Vista previa del logo
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                      >
                        <X size={16} />
                        Quitar
                      </button>
                    </div>
                    
                    <div className="relative w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute inset-0 border-2 border-blue-200 rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas y Consejos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-emerald-50 to-transparent p-4 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Beneficios</h4>
                    <p className="text-xs text-gray-600">De agregar marcas</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500" />
                    Mejora la confianza del cliente
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500" />
                    Facilita la búsqueda de productos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500" />
                    Incrementa el valor percibido
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-transparent p-4 rounded-xl border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Shield className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Recomendaciones</h4>
                    <p className="text-xs text-gray-600">Para mejores resultados</p>
                  </div>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <Star size={12} className="text-amber-500" />
                    Usa el nombre oficial de la marca
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={12} className="text-amber-500" />
                    Sube logos de alta calidad
                  </li>
                  <li className="flex items-center gap-2">
                    <Star size={12} className="text-amber-500" />
                    Mantén la consistencia en los nombres
                  </li>
                </ul>
              </div>
            </div>

            {/* Información adicional (opcional) */}
            <div className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={16} />
                Información Adicional (Opcional)
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Descripción breve</label>
                  <textarea
                    placeholder="Breve descripción o eslogan de la marca..."
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">País de origen</label>
                    <input
                      type="text"
                      placeholder="Ej. México, USA, China..."
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Año de fundación</label>
                    <input
                      type="number"
                      placeholder="Ej. 1990"
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit"
                  disabled={isSubmitting || !brandData.name.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      {IdBrand == undefined ? (
                        <>
                          <Plus size={20} />
                          Crear Marca
                        </>
                      ) : (
                        <>
                          <Edit size={20} />
                          Actualizar Marca
                        </>
                      )}
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Cancelar
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">
                Los campos marcados con * son obligatorios
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormAddBrand;