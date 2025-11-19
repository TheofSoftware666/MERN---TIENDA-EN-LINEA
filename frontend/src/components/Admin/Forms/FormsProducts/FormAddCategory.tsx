import React, { useState } from 'react';
import { Category } from "../../../../types/category.type.ts";

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

    const handleSubmitCategory = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", category.name);
        if (category.file) {
            formData.append("image", category.file);
        }

        onSubmit(formData as unknown as Category);
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

    React.useEffect(() => {
        if (IdCategory) {
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
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        &times;
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {IdCategory == undefined ? "Agregar nueva categoría" : "Editar Categoria"}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Organiza tus productos con categorías claras para mejorar la experiencia de compra.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmitCategory}>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre de la categoría</label>
                            <input 
                                type="text"
                                placeholder="Ej. Mochilas ejecutivas"
                                value={category.name}
                                onChange={e => setCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Un nombre claro ayuda a que tus clientes naveguen fácilmente.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Imagen</label>
                            
                            {/* Mostrar imagen actual si existe */}
                            {category.imageUrl && (
                                <div className="mb-3">
                                    <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                                    <img 
                                        src={category.imageUrl} 
                                        alt="Vista previa" 
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                            
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 w-full text-gray-600"
                                name="image"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {IdCategory 
                                    ? "Selecciona una nueva imagen para reemplazar la actual." 
                                    : "Sube una imagen representativa para esta categoría."
                                }
                            </p>
                            
                            {/* Mostrar previsualización de nueva imagen si se selecciona */}
                            {category.file && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 mb-2">Nueva imagen seleccionada:</p>
                                    <img 
                                        src={URL.createObjectURL(category.file)} 
                                        alt="Nueva vista previa" 
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button 
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                            >
                                {IdCategory == undefined ? "Crear categoría" : "Actualizar categoría"}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Podrás editar esta categoría después, no te preocupes.
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormAddCategory