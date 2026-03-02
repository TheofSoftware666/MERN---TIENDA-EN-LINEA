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

// Iconos
import { 
  Plus,
  Tag,
  Layers,
  Package,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  BarChart3,
  ChevronRight,
  Star,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const AdminProductos = () => {
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" o "list"

  // Mostrar Formularios 
  const [ModalFormProduct, setModalFormProduct] = useState(false);
  const [ModalFormVariant, setModalFormVariant] = useState(false);
  const [ModalFormBrand, setModalFormBrand] = useState(false);
  const [ModalFormCategory, setModalFormCategory] = useState(false);

  // Estados para Productos, Marcas, Categorias
  const [selectedProduct, setSelectedProduct] = useState<number | undefined>(undefined); 
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(undefined);
  const [selectedVariant, setSelectedVariant] = useState<number | undefined>(undefined);

  const [Productos, setProductos] = useState<ProductItem[]>([]);
  const { toasts, toast, removeToast } = useToast();
 
  useEffect(() => {
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
      setProductos(productosData || []); 

    } catch (error) {
      console.error('Error cargando productos:', error);
      setProductos([]); // En caso de error, array vacío
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
        toast.info("Se cargaron todos los productos correctamente.", "info");
        return response.data.productos;
      } else {
        toast.error("Error al cargar productos", "error");
        throw new Error("No se encontraron productos en la respuesta");
      }

    } catch (err : unknown) {
      return []; 
    }
  };

  // Producto - MANTENER ESTA FUNCIÓN
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
          toast.success(responseUpdate.data.success ?? "Se actualizó el Producto Correctamente.", "success");
          cargarProductos(); 
        } else {
          setModalFormProduct(false);
          toast.warning("No se pudo actualizar el producto.", "warning");
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

  // Categoria - MANTENER ESTA FUNCIÓN
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

  // Marca - MANTENER ESTA FUNCIÓN
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

  // Calcular estadísticas
  const stats = {
    total: Productos.length,
    active: Productos.filter(p => p.active).length,
    lowStock: Productos.filter(p => p.stock < 10).length,
    withDiscount: Productos.filter(p => p.discount > 0).length,
    totalValue: Productos.reduce((sum, p) => sum + (Number(p.price) * Number(p.stock)), 0),
    totalSales: Productos.reduce((sum, p) => sum + Number(p.sales), 0)
  };

  // Filtrar productos
  const filteredProducts = Productos.filter(producto => {
    // Filtro de búsqueda
    if (searchTerm && !producto.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !producto.sku.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtro por categoría
    if (selectedCategory !== "all" && producto.categotyName !== selectedCategory) {
      return false;
    }
    
    // Filtro por estado
    if (selectedStatus !== "all") {
      if (selectedStatus === "active" && !producto.active) return false;
      if (selectedStatus === "low-stock" && producto.stock >= 10) return false;
      if (selectedStatus === "no-stock" && producto.stock > 0) return false;
      if (selectedStatus === "with-discount" && producto.discount === 0) return false;
    }
    
    return true;
  });

  // Agrupar productos por categoría
  const categories = [...new Set(Productos.map(p => p.categotyName).filter(Boolean))];

  if (loading) {
    return (
      <Spinner message="Consultando tus productos..."/>
    );
  }

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      <ToastContainer toasts={toasts} removeToast={removeToast}/>
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Gestión de Productos
          </h1>
          <p className="text-gray-600 text-sm mt-1">Administra tu catálogo completo</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button 
            onClick={() => cargarProductos()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
          >
            <RefreshCw size={18} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="text-blue-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">${(stats.totalValue / 1000).toFixed(1)}k</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <DollarSign className="text-emerald-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle className="text-green-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <AlertCircle className="text-amber-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Con Descuento</p>
              <p className="text-2xl font-bold text-gray-900">{stats.withDiscount}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <Tag className="text-purple-600" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventas Totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <ShoppingCart className="text-red-600" size={22} />
            </div>
          </div>
        </div>
      </div> */}

      {/* Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos por nombre o SKU..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              className="px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="low-stock">Stock bajo</option>
              <option value="no-stock">Sin stock</option>
              <option value="with-discount">Con descuento</option>
            </select>
            
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-100"}`}
              >
                <Layers size={20} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-100"}`}
              >
                <BarChart3 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => {setModalFormProduct(true);setSelectedProduct(undefined);}} 
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
          <button 
            onClick={() => {setModalFormBrand(true);setSelectedBrandId(undefined);}} 
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Tag size={20} />
            Nueva Marca
          </button>
          <button 
            onClick={() => {setModalFormCategory(true);setSelectedCategoryId(undefined);}} 
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Layers size={20} />
            Nueva Categoría
          </button>
          {/* <button 
            onClick={() => {setModalFormVariant(true);setSelectedVariant(undefined);}} 
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Package size={20} />
            Nueva Variante
          </button> */}
        </div>
      </div>

      {/* Contenido Principal */}
      {Productos.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
            <Package className="text-blue-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Catálogo Vacío</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
            Tu tienda está lista para mostrar productos. Agrega algunos productos para comenzar a vender.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {setModalFormProduct(true);setSelectedProduct(undefined);}} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              Crear Primer Producto
            </button>
            <button className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
              Ver Tutorial
            </button>
          </div>
        </div>
      ) : (
        <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}`}>
          {filteredProducts.map((producto) => (
            viewMode === "grid" ? (
              // Vista Grid
              <div
                key={producto.productoid}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                {/* Imagen del producto */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {producto.Images && producto.Images.length > 0 ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL_IMAGENES}${producto.Images[0].url}`}
                      alt={producto.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="text-gray-300" size={48} />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {!producto.active && (
                      <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Inactivo
                      </span>
                    )}
                    {producto.stock < 5 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        ¡Últimas {producto.stock}!
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {producto.discount > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{producto.discount}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5">
                  {/* Categoría y marca */}
                  <div className="flex items-center gap-2 mb-2">
                    {producto.categotyName && (
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {producto.categotyName}
                      </span>
                    )}
                    {producto.brandName && (
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {producto.brandName}
                      </span>
                    )}
                  </div>

                  {/* Nombre y SKU */}
                  <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                    {producto.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {producto.sku}
                    </code>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-medium">4.5</span>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
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
                      <span className="text-xs text-gray-500">por unidad</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">Stock</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          producto.stock < 5 ? "bg-red-500 animate-pulse" :
                          producto.stock < 20 ? "bg-yellow-500" : "bg-green-500"
                        }`} />
                        <span className={`font-semibold ${
                          producto.stock < 5 ? "text-red-600" : "text-gray-700"
                        }`}>
                          {producto.stock}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Barra de stock */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        producto.stock < 5 ? "bg-red-500" :
                        producto.stock < 20 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min((Number(producto.stock) / 50) * 100, 100)}%` }}
                    />
                  </div>

                  {/* Ventas */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Ventas: <strong className="text-gray-900">{producto.sales}</strong></span>
                    <span>Visitas: <strong className="text-gray-900">1.2k</strong></span>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Eye size={16} />
                      Ver
                    </button>
                    <button 
                      onClick={() => UpdateProductAdmin(producto.productoid)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit size={16} />
                      Editar
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Vista Lista
              <div
                key={producto.productoid}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Imagen */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      {producto.Images && producto.Images.length > 0 ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL_IMAGENES}${producto.Images[0].url}`}
                          alt={producto.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="text-gray-300" size={24} />
                        </div>
                      )}
                      {!producto.active && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">INACTIVO</span>
                        </div>
                      )}
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg truncate">
                            {producto.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {producto.sku}
                            </code>
                            {producto.categotyName && (
                              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                {producto.categotyName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">
                            ${Number(producto.price).toFixed(2)}
                          </div>
                          {producto.discount > 0 && (
                            <div className="text-sm text-gray-400 line-through">
                              ${(Number(producto.price) / (1 - Number(producto.discount) / 100)).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Detalles */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Stock</div>
                          <div className="flex items-center justify-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${
                              producto.stock < 5 ? "bg-red-500" :
                              producto.stock < 20 ? "bg-yellow-500" : "bg-green-500"
                            }`} />
                            <span className="font-semibold text-gray-900">{producto.stock}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Ventas</div>
                          <div className="font-semibold text-gray-900">{producto.sales}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Estado</div>
                          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                            producto.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {producto.active ? "Activo" : "Inactivo"}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Acciones</div>
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1 text-blue-600 hover:text-blue-700">
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => UpdateProductAdmin(producto.productoid)}
                              className="p-1 text-emerald-600 hover:text-emerald-700"
                            >
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-700">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Contador de resultados */}
      {Productos.length > 0 && (
        <div className="mt-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> de{' '}
              <span className="font-semibold text-gray-900">{Productos.length}</span> productos
              {searchTerm && (
                <span className="ml-2">para "<span className="font-medium">{searchTerm}</span>"</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Ordenar por: </span>
              <select className="ml-2 bg-transparent border-none focus:outline-none">
                <option>Recientes</option>
                <option>Más vendidos</option>
                <option>Precio (menor a mayor)</option>
                <option>Precio (mayor a menor)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Modales - AQUÍ ESTÁN LAS FUNCIONES CORRECTAS */}
      {ModalFormProduct && (
        <FormAddProduct 
          onClose={handleCloseModal} 
          onSubmit={handleSubmitProduct} // FUNCIÓN CORRECTA
          IdProduct={selectedProduct}
        />
      )}

      {ModalFormCategory && (
        <FormAddCategory 
          IdCategory={selectedCategoryId}
          onClose={handleCloseModal} 
          onSubmit={handleSubmitCategory} // FUNCIÓN CORRECTA
        />
      )}

      {ModalFormBrand && (
        <FormAddBrand 
          IdBrand={selectedBrandId}
          onClose={handleCloseModal} 
          onSubmit={handleSubmitBrand} // FUNCIÓN CORRECTA
        />
      )}
      
      {ModalFormVariant && (
        <FormAddVariant 
          IdVariant={selectedVariant}
          onClose={handleCloseModal} 
          onSubmit={handleSubmitBrand} // Si maneja variantes, ajusta esta función
        />
      )}
    </section>
  );
};

export default AdminProductos;