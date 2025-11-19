import { useState, useEffect } from "react";
import clientAxios from "../config/axios.jsx";
import { useToast } from './../hooks/useToast.jsx';
import ToastContainer from '../components/ToastContainer.jsx';

// Interfaces
import { ProductItem } from "../types/AdminProducts/productItem.type.ts";
import { Brand } from "../types/brand.type.ts";
import { Category } from "../types/category.type.ts";
import { Producto } from "../types/product.type.ts";

// Componentes
import FormAddProduct from "../components/Admin/Forms/FormsProducts/FormAddProduct.tsx";
import FormAddCategory from "../components/Admin/Forms/FormsProducts/FormAddCategory.tsx";
import FormAddBrand from "../components/Admin/Forms/FormsProducts/FormAddBrand.tsx";
import FormAddVariant from "../components/Admin/Forms/FormsProducts/FormAddVariant.tsx";
import Spinner from '../components/Spinner.jsx';

const AdminProductos = () => {
  
  const [ loading, setLoading] = useState(true);

  // Mostrar Formularios 
  const [ ModalFormProduct , setModalFormProduct ] = useState(false);
  const [ ModalFormVariant , setModalFormVariant ] = useState(false);
  const [ ModalFormBrand , setModalFormBrand ] = useState(false);
  const [ ModalFormCategory , setModalFormCategory ] = useState(false);

  // Estados para Productos, Marcas, Categorias
  const [ selectedProduct, setSelectedProduct ] = useState<number | undefined>(undefined); 
  const [ selectedCategory, setSelectedCategory ] = useState<number | undefined>(undefined);
  const [ selectedBrand, setSelectedBrand ] = useState<number | undefined>(undefined);
  const [ selectedVariant, setSelectedVariant ] = useState<number | undefined>(undefined);

  const [ Productos, SetProductos ] = useState<ProductItem[]>([]);
  const { toasts, toast, removeToast } = useToast();
 
  useEffect( () => {
    cargarProductos();
  }, []);

  // Cerrar Modales
  const handleCloseModal = () => {
    setModalFormProduct(false);
    setModalFormBrand(false);
    setModalFormCategory(false);
    setModalFormVariant(false);
    setSelectedProduct(undefined);
  };

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const productosData = await GetProductsAdmin(50);
      SetProductos(productosData || []); 

    } catch (error) {
      console.error('Error cargando productos:', error);
      SetProductos([]); // En caso de error, array vacío
    } finally {
      setLoading(false);
    }
  };

  const GetProductsAdmin = async (limit = 50) => {
    try {
      const token = localStorage.getItem('ape_token');

      if (!token) {
        return [];
      }

      const response = await clientAxios.get(`/Admin/GetProducts/${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.productos) {
        toast.info("Se cargaron todos los porductos correctamente. ","info");
        return response.data.productos;
      } else {
        toast.error("Se cargaron todos los porductos correctamente. ","error");
        throw new Error("No se encontraron productos en la respuesta");
      }

    } catch (err : unknown) {
      return []; 
    }
  };

  // Producto
  const handleSubmitProduct = async (producto: Producto) => {
    try {
      const token = localStorage.getItem("ape_token");

      if (!token) {
        setModalFormProduct(false);
        toast.error("No se encontró el token de autenticación.", "error");
        return;
      }
      
      if(producto.get("id") && producto.get("id") > 0){
        console.log(producto);
        const responseUpdate = await clientAxios.patch(
          `/Admin/EditarProducto/${producto.id}`,
          producto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseUpdate.data && responseUpdate.data.success) {
          setModalFormProduct(false);
          toast.success(responseUpdate.data.success ?? "Se actualizo el Producto Correctamente.", "success");
          cargarProductos(); 
        } else {
          setModalFormProduct(false);
          toast.warning("No se pudo registrar el producto.", "warning");
        }
      }

      if(!producto.id || producto.id === 0){
        const response = await clientAxios.post(
          "/Admin/AgregarProducto",
          producto,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setModalFormProduct(false);
          toast.success(response.data.success ?? "Producto agregado correctamente.", "success");
          cargarProductos(); 
        } else {
          setModalFormProduct(false);
          toast.warning("No se pudo registrar el producto.", "warning");
        }
      }

      } catch (error : unknown) {
        setModalFormProduct(false);
        toast.error(error.response.data.error ?? "Hubo un error al registrar el producto: " + error, "error");
      }
    setModalFormProduct(false);
  };

  // Categoria
  const handleSubmitCategory = async (category: Category) => {
    try {
      const token = localStorage.getItem("ape_token");

      if (!token) {
        setModalFormCategory(false);
        toast.error("No se encontró el token de autenticación.", "error");
        return;
      }
      
      const response = await clientAxios.post(
        "/Admin/CreateCategory",
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        setModalFormCategory(false);
        toast.success(response.data.success ?? "Categoria registrada correctamente.", "success");
        cargarProductos(); 
      } else {
        setModalFormCategory(false);
        toast.warning("No se pudo registrar la categoria.", "warning");
      }
      } catch (error : unknown) {
        setModalFormCategory(false);
        toast.error(error.response.data.error ?? "Hubo un error al registrar la categoria: " + error, "error");
      }
    setModalFormCategory(false);
  };

  // Marca
  const handleSubmitBrand = async (brand : Brand) => {
    try {
    const token = localStorage.getItem("ape_token");
    if (!token) {
      setModalFormBrand(false);
      toast.error("No se encontró el token de autenticación.", "error");
      return;
    }

      const response = await clientAxios.post(
        "/Admin/CreateBrand",
        brand,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        setModalFormBrand(false);
        toast.success(response.data.success ?? "Marca registrada correctamente.", "success");
        cargarProductos(); 
      } else {
        setModalFormBrand(false);
        toast.warning("No se pudo registrar la marca.", "warning");
      }
      } catch (error : unknown) {
        setModalFormBrand(false);
        toast.error(error.response.data.error ?? "Hubo un error al registrar la marca: " + error, "error");
      }
  };

  const UpdateProductAdmin = (productId: number) => {
    const producto = Productos.find(p => p.productoid === productId);
    if (producto) {
      setSelectedProduct(producto.productoid); 
      setModalFormProduct(true);    
    }
  };  

  if(loading){
    return(
      <Spinner message="Consultando tus productos..."/>
    )
  }

  return (
    <section className="w-full px-4 py-2 sm:px-6 lg:px-8  min-h-screen bg-gray-50 pb-20">
      <ToastContainer toasts={toasts} removeToast={removeToast}/>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gestión de Productos</h2>
      </div>
      <div className="w-full px-4 py-6 flex flex-wrap justify-start items-center gap-3 sm:gap-4">
        <button 
          onClick={() => {setModalFormProduct(true);setSelectedProduct(undefined);}} 
          className="border-2 border-blue-600 text-blue-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Producto
        </button>
        <button 
          onClick={() => {setModalFormBrand(true);setSelectedBrand(undefined);}} 
          className="border-2 border-green-600 text-green-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Marca
        </button>
        <button 
          onClick={() => {setModalFormCategory(true);setSelectedCategory(undefined);}} 
          className="border-2 border-purple-600 text-purple-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Categoria
        </button>
        <button 
          onClick={() =>  {setModalFormVariant(true);setSelectedVariant(undefined);}} 
          className="border-2 border-purple-600 text-purple-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Variante de Producto
        </button>
      </div>

      {Productos.length === 0 && (
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
            <span className="text-3xl text-blue-500">🛍️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Catálogo Vacío</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
            Tu tienda está lista para mostrar productos. Agrega algunos productos para comenzar a vender.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => {setModalFormProduct(true);setSelectedProduct(undefined);}} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
              Crear Producto
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Ver Tutorial
            </button>
          </div>
        </div>
      )}

      {ModalFormProduct && (
        <FormAddProduct 
          onClose={handleCloseModal} 
          onSubmit={handleSubmitProduct}
          IdProduct={selectedProduct}
        />
        )}

      {ModalFormCategory && (
        <FormAddCategory 
          IdCategory={selectedCategory}
          onClose={handleCloseModal} 
          onSubmit={handleSubmitCategory}
        />
      )}

      {ModalFormBrand && (
        <FormAddBrand 
          IdBrand={selectedBrand}
          onClose={handleCloseModal} 
          onSubmit={handleSubmitBrand}
        />
      )}
      
      {ModalFormVariant && (
        <FormAddVariant 
          IdVariant={selectedVariant}
          onClose={handleCloseModal} 
          onSubmit={handleSubmitBrand}
        />
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
  {Productos.map((producto: ProductItem) => (
    <div
      key={producto.productoid}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
    >
      {/* Header con imagen y badge */}
      <div className="relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory h-48 bg-gradient-to-br from-gray-50 to-gray-100">
          {producto.Images && producto.Images.length > 0 ? (
            producto.Images.map((imagenObj, index) => (
              <img
                key={imagenObj.idImage || index}
                src={import.meta.env.VITE_BACKEND_URL_IMAGENES + imagenObj.url}
                alt={`${producto.name} ${index + 1}`}
                className="w-full h-full object-cover snap-center flex-shrink-0"
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm">Sin imágenes</p>
              </div>
            </div>
          )}
        </div>

        {/* Badge de promoción */}
        {producto.discount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {producto.discount}% OFF
            </span>
          </div>
        )}

        {/* Badge de inventario bajo */}
        {producto.stock < 5 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              ¡Últimas {producto.stock}!
            </span>
          </div>
        )}

        {/* Badge de producto inactivo */}
        {!producto.active && (
          <div className="absolute top-3 left-3">
            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              Inactivo
            </span>
          </div>
        )}

        {/* Badge de variantes */}
        {/* {producto.Variants && producto.Variants.length > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {producto.Variants.length} variantes
            </span>
          </div>
        )} */}
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Categoría y marca */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
            {producto.categotyName || "Sin categoría"}
          </span>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {producto.brandName || "Sin marca"}
          </span>
        </div>

        {/* Nombre del producto */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {producto.name}
        </h3>

        {/* Descripción (opcional) */}
        {producto.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {producto.description}
          </p>
        )}

        {/* Información del producto */}
        <div className="space-y-3 mb-4">
          {/* SKU */}
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">SKU:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
              {producto.sku}
            </code>
          </div>

          {/* Precio */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-600 font-medium">Precio:</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${Number(producto.price).toFixed(2)}
                </span>
                {producto.discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ${(Number(producto.price) / (1 - Number(producto.discount) / 100)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Vendidos */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Vendidos:</span>
            <span className="text-sm font-semibold text-green-600">
              {Number(producto.sales)} unidades
            </span>
          </div>

          {/* Inventario */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Inventario:</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  producto.stock < 5
                    ? "bg-red-500 animate-pulse"
                    : producto.stock < 20
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
              <span
                className={`text-sm font-semibold ${
                  producto.stock < 5 ? "text-red-600" : "text-gray-700"
                }`}
              >
                {producto.stock} unidades
              </span>
            </div>
          </div>

          {/* Barra de inventario */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                producto.stock < 5
                  ? "bg-red-500"
                  : producto.stock < 20
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${Math.min((Number(producto.stock) / 100) * 100, 100)}%`,
              }}
            ></div>
          </div>

          {/* Etiquetas */}
          {producto.Tags && producto.Tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {producto.Tags.map((etiquetaObj, index) => (
                <span
                  key={etiquetaObj.idTag || index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {etiquetaObj.name}
                </span>
              ))}
            </div>
          )}

          {/* Información de variantes */}
          {/* {producto.Variants && producto.Variants.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Variantes:</span>
              <span className="font-semibold text-blue-600">
                {producto.Variants.length} opciones
              </span>
            </div>
          )}*/}
        </div> 

        {/* Acciones */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => UpdateProductAdmin(producto.productoid)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group/edit"
          >
            <span>✏️</span>
            Editar
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-medium text-sm transition-colors group/delete">
            <span>🗑️</span>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


    </section>
  );
}

export default AdminProductos;
