import React, {useState} from 'react'
import { Brand } from '../../../../types/brand.type.ts';

interface FormParamsBrand {
    IdBrand?: number,
    onClose: () => void,
    onSubmit: (brand: Brand) => void
}

const FormAddBrand = ({ IdBrand, onClose, onSubmit} : FormParamsBrand) => {

  const [ brandData, setBrandData ] = useState<Brand>({
      id: IdBrand || 0,
      name: '',
  });

  const handleSubmitBrand = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(brandData);
  }

  return (
    <>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">{ IdBrand == undefined ? "Registrar nueva marca" : "Editar marca"}</h2>
          <p className="text-gray-500 mb-6">
            Agrega la información de la marca para que tus clientes la identifiquen fácilmente y refuerces la confianza en tu tienda.
          </p>

          <form className="space-y-6" onSubmit={handleSubmitBrand}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de la marca</label>
              <input 
                type="text"
                value={brandData.name}
                onChange={e => setBrandData({...brandData, name: e.target.value})}
                placeholder="Ej. CHB - Chenson Business"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Un nombre claro ayuda a tus clientes a reconocerla rápidamente.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Registrar marca
              </button>
              {/* <button 
                type="button"
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Guardar como borrador
              </button> */}
            </div>
            <p className="text-xs text-gray-400 mt-2">Podrás editar esta información más tarde, no te preocupes.</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormAddBrand