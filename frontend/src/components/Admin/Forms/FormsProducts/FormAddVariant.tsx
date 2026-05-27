import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ProductVariant, ProductVariantImage } from '../../../../types/productvariant.type.ts';

interface SimpleProduct {
  id: number;
  name: string;
}

interface FormParamsBrand {
  IdVariant?: number;
  onClose: () => void;
  onSubmit: (variant: ProductVariant) => void;
}

const FormAddVariant = ({ IdVariant, onClose, onSubmit }: FormParamsBrand) => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [ProductVariant, setProductVariant] = useState<ProductVariant>({
    id: IdVariant || 0,
    productId: 0,
    name: "",
    sku: "",
    price: 0,
    stock: 0,
    colorHex: "",
    createdAt: "",
    discountedPrice: 0,
    priceFinal: 0,
    largo: "",
    alto: "",
    ancho: "",
    peso: "",
    Images: new Array<ProductVariantImage>(),
  });

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

    const newImages: ProductVariantImage[] = Array.from(files).map((file, index) => ({
        id: 0,
        variantId: ProductVariant.id,
        imageUrl: URL.createObjectURL(file), // vista previa
        Order: ProductVariant.Images?.length || 0 + index,
        file,
    }));

    setProductVariant({
        ...ProductVariant,
        Images: [...(ProductVariant.Images || []), ...newImages],
        });
    };

    const handleRemoveImage = (index: number) => {
        const updated = [...(ProductVariant.Images || [])];
        updated.splice(index, 1);
        setProductVariant({ ...ProductVariant, Images: updated });
    };


//   // --- Efecto principal ---
    useEffect(() => {
        const fetchData = async () => {
        try {
            if (!IdVariant) {
            // 🚀 Modo creación → cargar lista de productos
            const res = await axios.get('/api/products');
            setProducts(res.data);
            } else {
            // ✏️ Modo edición → cargar variante y producto base
            const res = await axios.get(`/api/variants/${IdVariant}`);
            setProductVariant(res.data);
            }
        } catch (err) {
            console.error("Error al cargar los datos:", err);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, [IdVariant]);

    // useEffect(() => {
    // const fetchData = async () => {
    //     try {
    //     setLoading(true);

    //     // Simulamos un pequeño delay para parecer una llamada a la API
    //     await new Promise((resolve) => setTimeout(resolve, 800));

    //     if (!IdVariant) {
    //         // 🚀 Modo creación → simulamos lista de productos
    //         const mockProducts = [
    //         { id: 1, name: "Mochila Chenson Business" },
    //         { id: 2, name: "Lonchera Escolar Azul" },
    //         { id: 3, name: "Mochila Deportiva Negra" },
    //         ];
    //         setProducts(mockProducts);
    //     } else {
    //         // ✏️ Modo edición → simulamos variante existente
    //         const mockVariant = {
    //         VarianteId: IdVariant,
    //         ProductoId: 2,
    //         Nombre: "Mochila Azul XL",
    //         Precio: 799.99,
    //         Stock: 50,
    //         ColorHex: "#0033FF",
    //         DescuentoPorcentaje: 10,
    //         PrecioFinal: 719.99,
    //         Largo: 45.0,
    //         Ancho: 30.0,
    //         Alto: 15.0,
    //         Peso: 0.8,
    //         };
    //         setProductVariant(mockVariant as unknown as ProductVariant);
    //     }
    //     } catch (err) {
    //     console.error("Error al cargar los datos:", err);
    //     } finally {
    //     setLoading(false);
    //     }
    // };

    // fetchData();
    // }, [IdVariant]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ProductVariant);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700 font-medium">
          Cargando información...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {IdVariant ? "Editar variante" : "Registrar nueva variante"}
        </h2>
        <p className="text-gray-500 mb-6">
          {IdVariant
            ? "Actualiza la información de esta variante sin alterar su producto base."
            : "Crea una nueva variante seleccionando el producto base al que pertenece."}
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Producto base */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Producto base</label>

            <select
              disabled={!!IdVariant}
              value={ProductVariant.productId}
              onChange={e => setProductVariant({ ...ProductVariant, productId: parseInt(e.target.value) || 0 })}
              className={`mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                IdVariant ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              {!IdVariant && <option value={0}>-- Selecciona un producto --</option>}
              {IdVariant ? (
                <option value={ProductVariant.productId}>
                  {products.find(p => p.id === ProductVariant.productId)?.name || "Producto asociado"}
                </option>
              ) : (
                products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              )}
            </select>

            <p className="text-xs text-gray-500 mt-1">
              {IdVariant
                ? "No puedes cambiar el producto base de una variante existente."
                : "Selecciona el producto al que pertenece esta variante."}
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={ProductVariant.name}
              onChange={e => setProductVariant({ ...ProductVariant, name: e.target.value })}
              placeholder="Ej. Playera Azul Talla M"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* SKU y Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                value={ProductVariant.sku}
                onChange={e => setProductVariant({ ...ProductVariant, sku: e.target.value })}
                placeholder="Ej. SKU-12345"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color (Hex)</label>
              <input
                type="color"
                value={ProductVariant.colorHex}
                onChange={e => setProductVariant({ ...ProductVariant, colorHex: e.target.value })}
                className="mt-1 w-full h-[42px] border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Precio / Descuento / Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                step="0.01"
                value={ProductVariant.price}
                onChange={e => setProductVariant({ ...ProductVariant, price: parseFloat(e.target.value) || 0 })}
                placeholder="Ej. 299.99"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">% Descuento</label>
              <input
                type="number"
                step="0.01"
                value={ProductVariant.discountedPrice}
                onChange={e => setProductVariant({ ...ProductVariant, discountedPrice: parseFloat(e.target.value) || 0 })}
                placeholder="Ej. 10"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={ProductVariant.stock}
                onChange={e => setProductVariant({ ...ProductVariant, stock: parseInt(e.target.value) || 0 })}
                placeholder="Ej. 15"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Dimensiones */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Dimensiones del producto</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["largo", "ancho", "alto", "peso"].map((campo, i) => (
                <div key={campo}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {campo} {campo === "peso" ? "(kg)" : "(cm)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={(ProductVariant as any)[campo] || ""}
                    onChange={e => setProductVariant({ ...ProductVariant, [campo]: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Imágenes de la variante */}
            <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Imágenes de la variante</h3>

            {/* Input de carga */}
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="block w-full text-sm text-gray-700 
                        border border-gray-300 rounded-lg cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            />
            <p className="text-xs text-gray-500 mt-1">
                Puedes subir varias imágenes. La primera será la principal.
            </p>

            {/* Vista previa */}
            {ProductVariant.Images && ProductVariant.Images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {ProductVariant.Images.map((img, index) => (
                    <div key={index} className="relative group">
                    <img
                        src={img.imageUrl}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                        ✕
                    </button>
                    </div>
                ))}
                </div>
            )}
            </div>


          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {IdVariant ? "Guardar cambios" : "Registrar variante"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormAddVariant;
