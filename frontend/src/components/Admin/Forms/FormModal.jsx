import PropTypes from 'prop-types';
import ProductForm from './ProductForm';

/**
 * Modal para crear/editar productos
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Object} props.product - Datos del producto
 * @param {Function} props.onProductChange - Maneja cambios en campos básicos
 * @param {Function} props.onVariantsChange - Maneja cambios en variantes
 * @param {Function} props.onTagsChange - Maneja cambios en etiquetas
 * @param {Function} props.onFaqsChange - Maneja cambios en FAQs
 * @param {Function} props.onImagesChange - Maneja cambios en imágenes
 * @param {Function} props.onSubmit - Maneja envío del formulario
 * @param {boolean} props.isLoading - Si está cargando
 */
const FormModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onProductChange,
  onVariantsChange,
  onTagsChange,
  onFaqsChange,
  onImagesChange,
  onSubmit,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {product.productoId ? 'Editar producto' : 'Agregar nuevo producto'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Completa la información para que tus clientes lo encuentren más fácil y confíen en tu tienda.
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              aria-label="Cerrar modal"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <ProductForm 
              product={product}
              onChange={onProductChange}
              onVariantsChange={onVariantsChange}
              onTagsChange={onTagsChange}
              onFaqsChange={onFaqsChange}
              onImagesChange={onImagesChange}
            />

            {/* Footer con botones */}
            <div className="sticky bottom-0 bg-white pt-6 mt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <p className="text-xs text-gray-400 text-center sm:text-left">
                  Podrás editar este producto después, no te preocupes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {product.productoId ? 'Actualizando...' : 'Publicando...'}
                      </>
                    ) : (
                      product.productoId ? 'Actualizar producto' : 'Publicar producto'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  onProductChange: PropTypes.func.isRequired,
  onVariantsChange: PropTypes.func.isRequired,
  onTagsChange: PropTypes.func.isRequired,
  onFaqsChange: PropTypes.func.isRequired,
  onImagesChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default FormModal;