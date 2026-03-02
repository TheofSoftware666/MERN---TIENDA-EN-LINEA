import React, { useState } from 'react';
import { Category } from "../../../../types/category.type.ts";
import {
  X,
  Layers,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Trash2,
  Edit
} from "lucide-react";

interface FormParamsCategory {
    IdCategory?: number,
    onClose: () => void,
    onSubmit: (category: Category) => void
}

const FormAddCategory = ({IdCategory, onClose, onSubmit} : FormParamsCategory) => {

    const [category, setCategory] = useState<Category>({
        id: 0,
        name: '',
        imageUrl: '',
        file: undefined
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append("name", category.name);
            if (category.file) {
                formData.append("image", category.file);
            }

            await onSubmit(formData as unknown as Category);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : undefined;
        
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            
            setCategory(prev => ({
                ...prev,
                file: selectedFile,
                imageUrl: previewUrl 
            }));
        } else {
            setCategory(prev => ({
                ...prev,
                file: undefined
            }));
        }
    }

    const handleRemoveImage = () => {
        setCategory(prev => ({
            ...prev,
            file: undefined,
            imageUrl: ''
        }));
    }

    React.useEffect(() => {
        if (IdCategory) {
            // Aquí normalmente harías una llamada a la API para obtener los datos reales
            setCategory({
                id: IdCategory,
                name: "Categoría Existente",
                imageUrl: "https://ejemplo.com/imagen-actual.jpg",
                file: undefined
            });
        }
    }, [IdCategory]);

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                    
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Layers className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {IdCategory == undefined ? 'Nueva Categoría' : 'Editar Categoría'}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Organiza y clasifica tus productos
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
                    <form className="p-6 space-y-6" onSubmit={handleSubmitCategory}>

                        {/* Nombre de la categoría */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de la categoría *
                            </label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Ej. Mochilas ejecutivas, Electrónica, Ropa..."
                                    value={category.name}
                                    onChange={e => setCategory(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 pl-11 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Layers size={20} className="text-gray-400" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Elige un nombre descriptivo que ayude a los clientes a encontrar productos fácilmente
                            </p>
                        </div>

                        {/* Imagen de la categoría */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Imagen de la categoría
                            </label>
                            
                            {/* Área de subida de archivos */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition-colors mb-4">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600 mb-2">
                                    Arrastra y suelta una imagen o haz clic para seleccionar
                                </p>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="category-image-upload"
                                    name="image"
                                />
                                <label
                                    htmlFor="category-image-upload"
                                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Seleccionar Imagen
                                </label>
                                <p className="text-xs text-gray-500 mt-3">
                                    Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB
                                </p>
                            </div>

                            {/* Vista previa de imágenes */}
                            {(category.imageUrl || category.file) && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-gray-700">
                                            Vista previa
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            Eliminar
                                        </button>
                                    </div>
                                    
                                    <div className="relative w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                        {category.file ? (
                                            <>
                                                <img 
                                                    src={URL.createObjectURL(category.file)} 
                                                    alt="Nueva imagen seleccionada" 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                                                    <div className="text-white">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <ImageIcon size={16} />
                                                            <span className="text-sm font-medium">Nueva imagen</span>
                                                        </div>
                                                        <p className="text-xs opacity-90">
                                                            {(category.file.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : category.imageUrl ? (
                                            <>
                                                <img 
                                                    src={category.imageUrl} 
                                                    alt="Imagen actual" 
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                                                    <div className="text-white">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <ImageIcon size={16} />
                                                            <span className="text-sm font-medium">Imagen actual</span>
                                                        </div>
                                                        <p className="text-xs opacity-90">
                                                            Imagen existente de la categoría
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                        
                                        {/* Badge de estado */}
                                        <div className="absolute top-3 right-3">
                                            {IdCategory && !category.file ? (
                                                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    Actual
                                                </span>
                                            ) : category.file ? (
                                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    Nueva
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    
                                    {/* Información adicional */}
                                    {category.file && (
                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle size={16} className="text-blue-600 mt-0.5" />
                                                <div className="text-sm text-gray-700">
                                                    <p className="font-medium">¡Imagen lista para subir!</p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        La nueva imagen reemplazará a la imagen actual al guardar los cambios.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Estado sin imagen */}
                            {!category.imageUrl && !category.file && (
                                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No hay imagen seleccionada</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Agrega una imagen para hacer tu categoría más atractiva
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Consejos */}
                        <div className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                Recomendaciones
                            </h4>
                            <ul className="text-xs text-gray-600 space-y-1 pl-5 list-disc">
                                <li>Usa imágenes claras y representativas de la categoría</li>
                                <li>Mantén los nombres cortos y descriptivos</li>
                                <li>Organiza las categorías de forma jerárquica</li>
                                <li>Usa imágenes en alta calidad (mínimo 400x400px)</li>
                            </ul>
                        </div>

                        {/* Botones de acción */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 mt-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting || !category.name.trim()}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Procesando...
                                        </>
                                    ) : (
                                        <>
                                            {IdCategory == undefined ? (
                                                <>
                                                    <CheckCircle size={20} />
                                                    Crear Categoría
                                                </>
                                            ) : (
                                                <>
                                                    <Edit size={20} />
                                                    Actualizar Categoría
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormAddCategory;