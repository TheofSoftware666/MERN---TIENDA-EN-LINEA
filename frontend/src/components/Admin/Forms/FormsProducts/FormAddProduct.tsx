import { useEffect, useState } from "react";
import axios from "axios";
import { Producto, Image, Faq } from "../../../../types/product.type";
import { ImageItem } from "../../../../types/AdminProducts/productItem.type.ts";
import clientAxios from "../../../../config/axios";
import ConfirmarEliminarImage from "./ConfirmarEliminarImage.tsx";
import ToastContainer from "../../../ToastContainer.jsx";
import { useToast } from "../../../../hooks/useToast.jsx";
import {
  X,
  Package,
  Tag,
  DollarSign,
  Percent,
  Box,
  Layers,
  Ruler,
  Weight,
  Image as ImageIcon,
  HelpCircle,
  Plus,
  Trash2,
  Upload,
  Eye,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface FormAddProductoProps {
    IdProduct?: number,
    onClose: () => void,
    onSubmit: (producto: Producto) => void
}

const FormAddProduct = ({ IdProduct, onClose, onSubmit }: FormAddProductoProps) => {

  const [Producto, SetProducto] = useState<Producto>({
    id: IdProduct || 0,
    name: '',
    description: '',
    price: '',
    stock: '',
    sku: '',
    active: true,
    discount: '', 
    category: 0, 
    brand: 0,
    large: '',
    width: '',   
    height: '',  
    weight: '', 
    tags: [],
    faqs: [{ pregunta: '', respuesta: '' }], 
    images: [],
  });

  const [etiquetasInput, setEtiquetasInput] = useState('');
  const [SelectMarca, SetSelectMarca] = useState<any[]>([]);
  const [SelectCategoria, SetSelectCategoria] = useState<any[]>([]);
  const [DeleteModal, SetDeleteModal] = useState(false);
  const [UrlImage, SetUrlImage] = useState<ImageItem | null>({
    idImage : 0,
    url : '',
    order : 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toasts, toast, removeToast } = useToast();

  // UseEffect 
  useEffect(() => {
    responseCategorias();
    if (IdProduct && IdProduct > 0) {
      cargarProducto(IdProduct);
    }
  }, []);

  // Evento al cambiar los inputs
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      SetProducto({ ...Producto, [name]: checked });
    } 
    else if (['price', 'stock', 'discount', 'large', 'width', 'height', 'weight'].includes(name)) {
      // Permitir string vacío temporalmente
      SetProducto({ ...Producto, [name]: value === '' ? '' : Number(value) });
    } 
    else if (name === 'active') {
      SetProducto({ ...Producto, [name]: value === '1' });
    } 
    else {
      SetProducto({ ...Producto, [name]: value });
    }
  };

  // Response Categorias
  const responseCategorias = async () => {
    try {
      const urlMarcas = `http://localhost:3001/tienda/api/Admin/Marcas/10`;
      const urlCategorias = `http://localhost:3001/tienda/api/Admin/Categorias/10`;

      const [response1, response2] = await Promise.all([
        axios.get(urlMarcas),
        axios.get(urlCategorias),
      ]);

      SetSelectMarca(response1.data.marcas);
      SetSelectCategoria(response2.data.categorias);

    } catch (err) {
      console.log("Ocurrio un error al intentar buscar las categorias", err);
      toast.error("Error al cargar categorías y marcas", "error");
    }
  }

  const cargarProducto = async (id: number) => {
    try {
      const token = localStorage.getItem("ape_token");

      if (!token) {
        onClose();
        return;
      }

      const response = await clientAxios.get(`/Admin/GetProducto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.producto) {
        const p = response.data.producto;
        
        SetProducto({
          id: p.productoid || 0,
          name: p.name || '',
          description: p.description || '',
          price: String(p.price || ''), 
          stock: String(p.stock || ''),
          sku: p.sku || '',
          active: Boolean(p.active),
          discount: String(p.discount || ''),
          category: p.categoryId || 0,
          brand: p.brandId || 0,
          large: String(p.large || ''),
          width: String(p.width || ''),
          height: String(p.height || ''),
          weight: String(p.weight || ''),
          tags: p.tags || [],
          faqs: p.faqs || [{ pregunta: '', respuesta: '' }],
          images: p.images || [],
        });
      }
    } catch (err) {
      console.error("Ocurrió un error al cargar el producto", err);
      toast.error("Error al cargar el producto", "error");
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("id", Producto.id.toString());
      formData.append("name", Producto.name);
      formData.append("description", Producto.description);
      formData.append("price", Producto.price.toString());
      formData.append("stock", Producto.stock.toString());
      formData.append("sku", Producto.sku);
      formData.append("active", Producto.active ? "1" : "0");
      formData.append("discount", Producto.discount.toString());
      formData.append("category", Producto.category.toString());
      formData.append("brand", Producto.brand.toString());
      formData.append("large", Producto.large.toString());
      formData.append("width", Producto.width.toString());
      formData.append("height", Producto.height.toString());
      formData.append("weight", Producto.weight.toString());
      formData.append("tags", JSON.stringify(Producto.tags));
      formData.append("faqs", JSON.stringify(Producto.faqs));
      Producto.images?.forEach((img, index) => {
        console.log(img.fileImage);
        formData.append("images", img.fileImage);
      });
      
      await onSubmit(formData as unknown as Producto);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEtiquetasKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const nuevaEtiqueta = etiquetasInput.trim();
      if (nuevaEtiqueta && !Producto.tags.includes(nuevaEtiqueta)) {
        SetProducto({
          ...Producto,
          tags: [...Producto.tags, nuevaEtiqueta]
        });
      }
      setEtiquetasInput(""); // limpiar input
    }
  };

  const handleRemoveEtiqueta = (etiqueta: string) => {
    SetProducto({
      ...Producto,
      tags: Producto.tags.filter((et) => et !== etiqueta)
    });
  };

  const handleFaqChange = (index: number, field: keyof Faq, value: string) => {
    const nuevasFaqs = [...(Producto.faqs || [])];
    nuevasFaqs[index][field] = value;
    SetProducto({ ...Producto, faqs: nuevasFaqs });
  };

  const handleAddFaq = () => {
    SetProducto({
      ...Producto,
      faqs: [...(Producto.faqs || []), { pregunta: "", respuesta: "" }]
    });
  };

  const handleRemoveFaq = (index: number) => {
    const nuevasFaqs = (Producto.faqs || []).filter((_, i) => i !== index);
    SetProducto({ ...Producto, faqs: nuevasFaqs });
  };

  const handleImagenesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const nuevasImagenes = Array.from(files).map((file, index) => ({
      fileImage: file,
      fileName: file.name,
      order: Producto.images.length + index,
      url: URL.createObjectURL(file),
    }));

    SetProducto({
      ...Producto,
      images: [...Producto.images, ...nuevasImagenes],
    });
  };

  const handleRemoveImagen = (index: number) => {
    const getUrlImage = Producto.images?.at(index);
    
    if(getUrlImage){
      SetUrlImage({ 
        idImage : 0, 
        url : getUrlImage?.url ?? "", 
        order: 0
      });

      SetDeleteModal(true);
    }
  };  

  const handleSubmitImage = async (image : ImageItem | null) => {
    try{
      SetDeleteModal(false);
      if (!image) return;
      
      const token = localStorage.getItem("ape_token");
      if (!token) {
        onClose();
        return;
      }

      const response = await clientAxios.post('/Admin/DeleteImage', image ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

    }catch(ex){
      toast.error("Ocurrio un error inesperado al intentar eliminar la imagen: " + ex);
    }
    finally{
      onClose();
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <ToastContainer toasts={toasts} removeToast={removeToast}/>
        
        {DeleteModal && (
          <ConfirmarEliminarImage 
            Url={UrlImage?.url ?? ""}
            onClose={() => {SetDeleteModal(false)}}
            onSubmit={handleSubmitImage}
          />
        )}
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {IdProduct == undefined ? 'Nuevo Producto' : 'Editar Producto'}
                  </h2>
                  <p className="text-sm text-gray-600">Completa toda la información del producto</p>
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
          <form className="p-6 space-y-6" onSubmit={handleSubmitProduct}>
            
            {/* Información Básica */}
            <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Package size={20} />
                Información Básica
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto *</label>
                  <input
                    type="text"
                    placeholder="Ej. Mochila ejecutiva CHB"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="name" 
                    value={Producto.name}
                    onChange={HandleChange}
                    required
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                  <input
                    type="text"
                    placeholder="CPRODUCTO-D"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="sku"
                    value={Producto.sku}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  placeholder="Describe las características principales del producto..."
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                  name="description"
                  value={Producto.description}
                  onChange={HandleChange}
                ></textarea>
              </div>
            </div>

            {/* Precios e Inventario */}
            <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign size={20} />
                Precios e Inventario
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Precio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Precio *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name="price"
                      value={Producto.price}
                      onChange={HandleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Box size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name="stock"
                      value={Producto.stock}
                      onChange={HandleChange}
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Descuento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descuento (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      name="discount"
                      value={Producto.discount}
                      onChange={HandleChange}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="active"
                    value={Producto.active ? "1" : "0"}
                    onChange={HandleChange}
                  >
                    <option value="1" className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Activo
                    </option>
                    <option value="0" className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-500" />
                      Inactivo
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Categoría y Marca */}
            <div className="bg-gradient-to-r from-purple-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Layers size={20} />
                Categoría y Marca
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                  <select
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="category"
                    value={Producto.category}
                    onChange={HandleChange}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {SelectCategoria.map((categoria) => (
                      <option key={categoria.categoriaId} value={categoria.categoriaId}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                  <select
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="brand"
                    value={Producto.brand}
                    onChange={HandleChange}
                    required
                  >
                    <option value="">Selecciona una marca</option>
                    {SelectMarca.map((marca) => (
                      <option key={marca.marcaId} value={marca.marcaId}>
                        {marca.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Dimensiones y Peso */}
            <div className="bg-gradient-to-r from-amber-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Ruler size={20} />
                Dimensiones y Peso
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Largo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Largo (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="large"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={Producto.large}
                      onChange={HandleChange}
                      min="0"
                    />
                  </div>
                </div>

                {/* Ancho */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ancho (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="width"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={Producto.width}
                      onChange={HandleChange}
                      min="0"
                    />
                  </div>
                </div>

                {/* Alto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alto (cm)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="height"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={Producto.height}
                      onChange={HandleChange}
                      min="0"
                    />
                  </div>
                </div>

                {/* Peso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Weight size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="weight"
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={Producto.weight}
                      onChange={HandleChange}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Etiquetas */}
            <div className="bg-gradient-to-r from-cyan-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag size={20} />
                Etiquetas
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agregar etiquetas</label>
                <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 bg-white">
                  {Producto.tags.map((etiqueta, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                      <Tag size={14} />
                      {etiqueta}
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => handleRemoveEtiqueta(etiqueta)}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Escribe y presiona Enter"
                    className="flex-grow outline-none bg-transparent px-2"
                    value={etiquetasInput}
                    onChange={(e) => { setEtiquetasInput(e.target.value); }}
                    onKeyDown={handleEtiquetasKeyDown}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Presiona Enter o coma para agregar una etiqueta</p>
              </div>
            </div>

            {/* Preguntas Frecuentes */}
            <div className="bg-gradient-to-r from-emerald-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle size={20} />
                Preguntas Frecuentes
              </h3>
              
              <div className="space-y-4">
                {(Producto.faqs || []).map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">FAQ #{index + 1}</span>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                        onClick={() => handleRemoveFaq(index)}
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Pregunta"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={faq.pregunta}
                      onChange={(e) => handleFaqChange(index, "pregunta", e.target.value)}
                    />
                    <textarea
                      placeholder="Respuesta"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                      value={faq.respuesta}
                      onChange={(e) => handleFaqChange(index, "respuesta", e.target.value)}
                    />
                  </div>
                ))}

                {/* Botón para agregar FAQ */}
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  onClick={handleAddFaq}
                >
                  <Plus size={20} />
                  Agregar Pregunta Frecuente
                </button>
              </div>
            </div>

            {/* Imágenes */}
            <div className="bg-gradient-to-r from-pink-50 to-transparent p-4 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ImageIcon size={20} />
                Imágenes del Producto
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Subir imágenes</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
                  <input
                    type="file"
                    accept="image/*"
                    name="images"
                    multiple
                    className="hidden"
                    id="image-upload"
                    onChange={handleImagenesChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Seleccionar Archivos
                  </label>
                  <p className="text-xs text-gray-500 mt-3">Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen</p>
                </div>
              </div>

              {/* Vista previa */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Vista previa</label>
                {Producto.images && Producto.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Producto.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden group border border-gray-200"
                      >
                        <img
                          src={import.meta.env.VITE_BACKEND_URL_IMAGENES + img.url || URL.createObjectURL(img.fileImage)}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <button
                            type="button"
                            onClick={() => handleRemoveImagen(index)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} />
                            Eliminar
                          </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No hay imágenes cargadas</p>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de Acción */}
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
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      {IdProduct == undefined ? 'Publicar Producto' : 'Actualizar Producto'}
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

export default FormAddProduct;