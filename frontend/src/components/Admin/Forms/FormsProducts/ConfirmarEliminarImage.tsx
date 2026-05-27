import React, { useState, useEffect } from 'react';
import clientAxios from '../../../../config/axios.jsx';
import { ImageItem } from '../../../../types/AdminProducts/productItem.type.ts';

interface ConfirmarEliminar{
    Url: string,
    onClose: () => void,
    onSubmit: (image : ImageItem) => void
}

const ConfirmarEliminarImage = ({ onClose , onSubmit, Url } : ConfirmarEliminar) => {

    const [ image, SetImage] = useState<ImageItem>({
        idImage : 0,
        url : Url || '',
        order : 0
    });

    const [ loadspinner, setLoadSpinner] = useState(false);

    useEffect(() => {
        LoadImage();
    }, []); 

    const LoadImage = async () => {
        try{
            setLoadSpinner(true);
            const token = localStorage.getItem("ape_token");

            if (!token) {
                onClose();
                return;
            }

            const response = await clientAxios.post(`/Admin/GetImage`, image, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            const responseImage = response.data.ok.image;
            const { ImagenId, Orden, URL } = responseImage;
            
            SetImage({ idImage : Number(ImagenId) , url : URL, order : Number(Orden)});
            
        }
        catch(error){
            console.log("Ocurrio un error inesperado al intentar eliminar la imagen: " + error);
            onClose();
        }
        finally{
            setLoadSpinner(false);
        }
    };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">Confirmarción de eliminar imagen. </h2>
        
        {loadspinner && (
            <div className="flex justify-center items-center my-4">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
                <div className="absolute w-8 h-8 border-2 border-red-200 rounded-full animate-ping"></div>
            </div>
        )}

        {!loadspinner && (
            <p className="text-gray-600">¿deseas eliminar la siguiente imagen {image.url} ?{image.idImage} </p>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition">
            Cancelar
          </button>
          <button
            onClick={() => {setLoadSpinner(true), onSubmit(image)}}
            type='submit'
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarEliminarImage