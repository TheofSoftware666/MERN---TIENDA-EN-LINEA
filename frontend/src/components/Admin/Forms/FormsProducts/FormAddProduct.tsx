import { useEffect, useState } from "react";
import axios from "axios";
import { Producto, Image, Faq } from "../../../../types/product.type";
import { ImageItem } from "../../../../types/AdminProducts/productItem.type.ts";
import clientAxios from "../../../../config/axios";
import ConfirmarEliminarImage from "./ConfirmarEliminarImage.tsx";
import ToastContainer from "../../../ToastContainer.jsx";
import { useToast } from "../../../../hooks/useToast.jsx";

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

  const [ DeleteModal, SetDeleteModal] = useState(false);
  const [ UrlImage, SetUrlImage ] = useState<ImageItem | null>({
    idImage : 0,
    url : '',
    order : 0
  });

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
    }
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

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
        
    onSubmit(formData as unknown as Producto);
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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <ToastContainer toasts={toasts} removeToast={removeToast}/>
        
        { DeleteModal && (
          <ConfirmarEliminarImage 
          Url={UrlImage?.url ?? ""}
          onClose={() => {SetDeleteModal(false)}}
          onSubmit={handleSubmitImage}
        />
        )
        }
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">

          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{IdProduct == undefined ? 'Agregar nuevo producto' : 'Editar Producto'}</h2>
          <p className="text-gray-500 mb-6">Completa la información para que tus clientes lo encuentren más fácil y confíen en tu tienda.</p>

          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleSubmitProduct}>

            {/* Nombre del producto */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
              <input
                type="text"
                placeholder="Ej. Mochila ejecutiva CHB"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                name="name" 
                value={Producto.name}
                onChange={HandleChange}
              />
              <p className="text-xs text-gray-500 mt-1">Un nombre claro y atractivo ayuda a que tus clientes lo encuentren más fácil.</p>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                placeholder="Describe las características principales del producto..."
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                name="description" // ✅ Corregido: era "descripcion"
                value={Producto.description}
                onChange={HandleChange}
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Una buena descripción aumenta la confianza y reduce devoluciones.</p>
            </div>

            {/* Precio y Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="price" // ✅ Corregido: era "precio"
                  value={Producto.price}
                  onChange={HandleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock general</label>
                <input
                  type="number"
                  placeholder="Ej. 25"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="stock"
                  value={Producto.stock}
                  onChange={HandleChange}
                />
              </div>
            </div>

            {/* SKU y Estatus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  placeholder="CPRODUCTO-D"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="sku"
                  value={Producto.sku}
                  onChange={HandleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Activo</label>
                <select
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="active" // ✅ Corregido: era "activo"
                  value={Producto.active ? "1" : "0"}
                  onChange={HandleChange}
                >
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>

            {/* Descuento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Descuento (%)</label>
                <input
                  type="number"
                  placeholder="Ej. 10"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="discount" // ✅ Corregido: era "descuento"
                  value={Producto.discount} // ✅ Corregido: era "descount"
                  onChange={HandleChange}
                />
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                name="category" // ✅ Corregido: era "categoriaId"
                value={Producto.category} // ✅ Corregido: era "categoy"
                onChange={HandleChange}
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
              <label className="block text-sm font-medium text-gray-700">Marca</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                name="brand" // ✅ Corregido: era "marcaId"
                value={Producto.brand} // ✅ Corregido: era "marcaId"
                onChange={HandleChange}
              >
                <option value="">Selecciona una marca</option>
                {SelectMarca.map((marca) => (
                  <option key={marca.marcaId} value={marca.marcaId}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensiones */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Largo (cm)</label>
                <input
                  type="number"
                  name="large"
                  placeholder="0"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1"
                  value={Producto.large}
                  onChange={HandleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ancho (cm)</label>
                <input
                  type="number"
                  name="width" // ✅ Corregido: era "ancho"
                  placeholder="0"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1"
                  value={Producto.width} // ✅ Corregido: era "ancho"
                  onChange={HandleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alto (cm)</label>
                <input
                  type="number"
                  name="height" // ✅ Corregido: era "alto"
                  placeholder="0"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1"
                  value={Producto.height} // ✅ Corregido: era "alto"
                  onChange={HandleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <input
                  type="number"
                  name="weight" // ✅ Corregido: era "peso"
                  placeholder="0"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1"
                  value={Producto.weight} // ✅ Corregido: era "peso"
                  onChange={HandleChange}
                />
              </div>
            </div>

            {/* Etiquetas */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
              <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                {Producto.tags.map((etiqueta, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    {etiqueta}
                    <button
                      type="button"
                      className="text-red-500 font-bold"
                      onClick={() => handleRemoveEtiqueta(etiqueta)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Escribe y presiona Enter"
                  className="flex-grow outline-none"
                  value={etiquetasInput}
                  onChange={(e) => { setEtiquetasInput(e.target.value); }}
                  onKeyDown={handleEtiquetasKeyDown}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">Presiona Enter o coma para agregar una etiqueta.</p>
            </div>

            {/* Preguntas frecuentes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Preguntas frecuentes</label>
              <p className="text-xs text-gray-500 mb-2">
                Agrega dudas comunes que tus clientes podrían tener.
              </p>

              <div className="space-y-4">
                {(Producto.faqs || []).map((faq, index) => (
                  <div key={index} className="border p-3 rounded-lg space-y-2">
                    <input
                      type="text"
                      placeholder="Pregunta"
                      className="w-full border p-2 rounded"
                      value={faq.pregunta} 
                      onChange={(e) => handleFaqChange(index, "pregunta", e.target.value)} 
                    />
                    <input
                      type="text"
                      placeholder="Respuesta"
                      className="w-full border p-2 rounded"
                      value={faq.respuesta} 
                      onChange={(e) => handleFaqChange(index, "respuesta", e.target.value)} 
                    />
                    <button
                      type="button"
                      className="text-red-500 text-sm"
                      onClick={() => handleRemoveFaq(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              {/* Botón para agregar FAQ */}
              <button
                type="button"
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleAddFaq}
              >
                + Agregar FAQ
              </button>
            </div>

           {/* Imágenes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Imágenes del producto</label>
              <input
                type="file"
                accept="image/*"
                name="images"
                multiple
                className="mt-1 w-full text-gray-600"
                onChange={handleImagenesChange}
              />

              {/* Vista previa */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Producto.images && Producto.images.length > 0 ? (
                  Producto.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={import.meta.env.VITE_BACKEND_URL_IMAGENES + img.url || URL.createObjectURL(img.fileImage)}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Botón para eliminar */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImagen(index)}
                        className="absolute top-2 right-2 bg-black/60 text-red-600 rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 text-sm py-6 border border-dashed border-gray-300 rounded-lg">
                    No hay imágenes cargadas
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Publicar producto
              </button>
              <button
                type="button"
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Guardar como borrador
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Podrás editar este producto después, no te preocupes.</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default FormAddProduct;