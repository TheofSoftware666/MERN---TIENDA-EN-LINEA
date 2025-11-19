import { useState, useEffect } from "react";
import axios from 'axios';
import AdminAddProducto from "../components/AdminAgregarProducto.jsx";
import Spinner from '../components/Spinner.jsx';

const AdminProductos = () => {
  
  const [ loading, setLoading] = useState(true);

  // Mostrar Formularios 
  const [ ModalFormProduct , setModalFormProduct ] = useState(false);
  const [ ModalFormVariant , setModalFormVariant ] = useState(false);
  const [ ModalFormBrand , setModalFormBrand ] = useState(false);
  const [ ModalFormCategory , setModalFormCategory ] = useState(false);

  const [ Category, setCategory ] = useState(false);
  const [ Brand, setBrand ] = useState(false);
  const [ SpinnerKit, SetSpinnerKit] = useState(false);
  const [ Message , SetMessage ] = useState(false);
  const [ TextBrand, SetTextBrand ] = useState('');
  const [ TextCategoria, SetTextCategoria ] = useState('');
  const [ ImageCategoria, SetImageCategoria ] = useState(null);

  const [ Productos, SetProductos ] = useState([]);

  const [ SelectMarca, SetSelectMarca ] = useState([]);
  const [ SelectCategoria, SetSelectCategoria ] = useState([]);

  // Hooks 
  useEffect( () => {
    responseCategorias();
    cargarProductos();
  }, []);

  

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const productosData = await GetProductsAdmin(50);
      SetProductos(productosData || []); // Guardar productos en array
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

      const urlProductos = `http://localhost:3001/tienda/api/Admin/GetProducts/${limit}`;

      const response = await axios.get(urlProductos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.productos) {
        return response.data.productos;
      } else {
        throw new Error("No se encontraron productos en la respuesta");
      }

    } catch (err) {
      console.error("Error al intentar buscar los productos:", err.response?.data || err.message);
      return []; // Retornar array vacío en caso de error
    }
  };

  // const UpdateProductAdmin = async (idProducto) => {
  //  try{
  //    SetSpinnerKit(true);
  //   const producto = await GetProductByIdAdmin(idProducto)
    
  //   if(producto == null || producto == undefined || producto.length <= 0){
  //     SetSpinnerKit(true);
  //     console.log("No se encontro el producto");
  //     return ;
  //   }
    
  //   console.log(producto);
  //   SetProducto({
  //     nombre: producto.Producto.NombreProducto || "",
  //     descripcion : producto.Producto.Descripcion || "",
  //     descuento: producto.Producto.Descuento || 0,
  //     precio: producto.Producto.Precio || 0,
  //     productoId: producto.Producto.ProductoId || 0,
  //     sku : producto.Producto.SKU || "",
  //     stock: producto.Producto.Disponible || 0,
  //     activo : producto.Producto.Activo == 1 ? true : false,
  //     marcaId : producto.Producto.Marca,
  //     categoriaId : producto.Producto.Categoria,
  //     largo : producto.Producto.Largo,
  //     ancho : producto.Producto.Ancho,
  //     alto : producto.Producto.Alto,
  //     peso : producto.Producto.Peso,
  //     variantes : producto.Producto.Variantes || [],
  //     etiquetas : producto.Producto.Etiquetas || [],
  //     faqs : producto.Producto.Faqs || [],
  //     imagenes : producto.Producto.Imagenes || []
  //   });

  //   SetSpinnerKit(false);
  //   setModalFormProduct(true);
  //  }catch(ex){
  //     SetSpinnerKit(false);
  //     setModalFormProduct(true);
  //     console.log("Erro inesperado" + ex.Message);
  //  }

  // }

  const GetProductByIdAdmin = async (idProducto) => {
    try {
      const token = localStorage.getItem('ape_token');

      if (!token) {
        return [];
      }

      const urlProductos = `http://localhost:3001/tienda/api/Admin/GetProducto/${idProducto}`;
      const response = await axios.get(urlProductos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data && response.data.producto) {
        return response.data.producto;
      } else {
        throw new Error("No se encontraron productos en la respuesta");
      }

    } catch (err) {
      console.error("Error al intentar buscar los productos:", err.response?.data || err.message);
      return []; // Retornar array vacío en caso de error
    }
  };

  const responseCategorias = async () => {
    try{
      setLoading(true);

      const urlMarcas = `http://localhost:3001/tienda/api/Admin/Marcas/10`;
      const urlCategorias = `http://localhost:3001/tienda/api/Admin/Categorias/10`;

      const [response1, response2] = await Promise.all([
        axios.get(urlMarcas),
        axios.get(urlCategorias),
      ]);

      SetSelectMarca(response1.data.marcas);
      SetSelectCategoria(response2.data.categorias);

    }catch(err){
      console.log("Ocurrio un error al intentar buscar las categorias" || err.data);
    }finally{
      setLoading(false);
    }
  }

  function HandleAddProduct(){
    setModalFormProduct(true);
  }

  function HandleCloseProduct() {
    setModalFormProduct(false);
    setCategory(false);
    setBrand(false);
  }

  function HandleAddCategoria() {
    setCategory(true);
  }

  function HandleAddBrand() {
    setBrand(true);
  }

  const HandleChange = (e) => {
    const { name, value } = e.target;
    SetProducto({...Producto, [name]: value});
  }

  function HandleSpinner() {
    SetSpinnerKit(true);
  }

  function HandleSpinnerClose() {
    SetSpinnerKit(false);
  }

  const handleSubmitProducto = async e => {
      setModalFormProduct(false);
      setCategory(false);
      setBrand(false);
      SetSpinnerKit(true);

      e.preventDefault();

      const formData = new FormData();

      // ✅ Datos simples
      formData.append("nombre", Producto.nombre);
      formData.append("descripcion", Producto.descripcion);
      formData.append("precio", Producto.precio);
      formData.append("stock", Producto.stock);
      formData.append("sku", Producto.sku);
      formData.append("marcaId", Producto.marcaId);
      formData.append("categoriaId", Producto.categoriaId);
      formData.append("activo", Producto.activo);
      formData.append("descuento", Producto.descuento);
      formData.append("largo", Producto.largo);
      formData.append("ancho", Producto.ancho);
      formData.append("alto", Producto.alto);
      formData.append("peso", Producto.peso);      

      // ✅ Arrays / Objetos
      formData.append("variantes", JSON.stringify(Producto.variantes));
      formData.append("etiquetas", JSON.stringify(Producto.etiquetas));
      formData.append("faqs", JSON.stringify(Producto.faqs));

      // ✅ Imágenes múltiples
      Producto.imagenes.forEach((file) => {
        formData.append("imagenes", file);
      });

      try {
        const token = localStorage.getItem('ape_token');

        if(!token){
          setModalFormProduct(true);
          setCategory(false);
          setBrand(false);
          SetSpinnerKit(false);
          console.log("Ocurrio un error inesperado.");
          return;
        }

        const res = await axios.post("http://localhost:3001/tienda/api/Admin/AgregarProducto", formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization : `Bearer ${token}`
          },
        });

        console.log("✅ Producto creado:", res.data);
        
                // 🔄 Resetear formulario
        SetProducto({
          nombre: "",
          descripcion: "",
          precio: 0,
          stock: 0,
          sku: "",
          activo: 1,
          promocion: 0,
          descuento: 0,
          categoriaId: 0,
          marcaId: 0,
          largo: 0,
          ancho: 0,
          alto: 0,
          peso: 0,
          variantes: [],
          etiquetas: [],
          faqs: [],
          imagenes: []
        });

        setModalFormProduct(true);
        setCategory(false);
        setBrand(false);
        SetSpinnerKit(false);
      } catch (err) {
          setModalFormProduct(true);
          setCategory(false);
          setBrand(false);
          SetSpinnerKit(false);
        console.error("❌ Error al guardar producto:", err.response.data.error);
      }
  };
  
  const HandleAddMarca = async e => {
    e.preventDefault();
    
    setBrand(false);
    SetSpinnerKit(true);

    if(TextBrand.length == 0){
      setBrand(true);
      SetSpinnerKit(false);
      console.log("El nombre de la marca es invalido");
      return;
    }

    const url = `http://localhost:3001/tienda/api/Admin/AgregarMarcas`;
    try{
      const token = localStorage.getItem('ape_token');

      if(!token){
        setBrand(true);
        SetSpinnerKit(false);
        console.log("Ocurrio un error inesperado.");
        return;
      }

      const response = await axios.post(url, { "nombre" : TextBrand }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      console.log(response.data.msg);

      setBrand(false);
      SetSpinnerKit(false);
      SetTextBrand('');

    }catch(ex){
      setBrand(true);
      SetSpinnerKit(false);
      console.log("Error : " + ex);
      console.log(ex.response.data.error);
    }

  };

  const addVariante = () => {
  SetProducto({
    ...Producto,
    variantes: [
      ...Producto.variantes,
      { nombre: "", precio: 0, stock: 0, colorHex: "", imagen: null }
    ]
  });
  };

  const handleVarianteChange = (index, e) => {
    const { name, value, files } = e.target;
    const nuevas = [...Producto.variantes];

    // if (name === "imagen") {
    //   nuevas[index][name] = files[0]; // Guardar archivo
    // } else {
    //   nuevas[index][name] = value;
    // }
    
    nuevas[index][name] = value;
    SetProducto({ ...Producto, variantes: nuevas });
  };

  const handleEtiquetasChange = (e) => {
    setEtiquetasInput(e.target.value);
  };

  const handleEtiquetasKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const nuevaEtiqueta = etiquetasInput.trim();
      if (nuevaEtiqueta && !Producto.etiquetas.includes(nuevaEtiqueta)) {
        SetProducto({
          ...Producto,
          etiquetas: [...Producto.etiquetas, nuevaEtiqueta]
        });
      }
      setEtiquetasInput(""); // limpiar input
    }
  };

  const handleRemoveEtiqueta = (etiqueta) => {
    SetProducto({
      ...Producto,
      etiquetas: Producto.etiquetas.filter((et) => et !== etiqueta)
    });
  };

  const handleAddFaq = () => {
    SetProducto({
      ...Producto,
      faqs: [...Producto.faqs, { pregunta: "", respuesta: "" }]
    });
  };

  const handleFaqChange = (index, field, value) => {
    const nuevasFaqs = [...Producto.faqs];
    nuevasFaqs[index][field] = value;
    SetProducto({ ...Producto, faqs: nuevasFaqs });
  };

  const handleRemoveFaq = (index) => {
    const nuevasFaqs = Producto.faqs.filter((_, i) => i !== index);
    SetProducto({ ...Producto, faqs: nuevasFaqs });
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files); // convertir FileList en array
    SetProducto({
      ...Producto,
      imagenes: [...Producto.imagenes, ...files] // agregamos en lugar de reemplazar
    });
  };

  const handleRemoveImagen = (index) => {
    const nuevasImagenes = Producto.imagenes.filter((_, i) => i !== index);
    SetProducto({ ...Producto, imagenes: nuevasImagenes });
  };

  const HandleAgregarCategoria = async e => {
      e.preventDefault();

      setCategory(false);
      SetSpinnerKit(true);

      const token = localStorage.getItem('ape_token');

      if(!token){
        setCategory(true);
        SetSpinnerKit(false);
        console.log("Es necesario agregar una imagen. ");
        return;
      }

      if(TextCategoria.trim().length == 0){
        setCategory(true);
        SetSpinnerKit(false);
        console.log("Para agregar la categoria es necesario completar el campo");
        return;        
      }
      
      const formData = new FormData();
        formData.append("nombre", TextCategoria);

      if(ImageCategoria){
        formData.append("imagen", ImageCategoria);
      }

      try{
        const url = `http://localhost:3001/tienda/api/Admin/AgregarCategoria`;

        const response = await axios.post(url, formData, {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        });

        setCategory(false);
        SetSpinnerKit(false);
        SetImageCategoria(null);
        SetTextCategoria('');

      }catch(ex){
        setCategory(true);
        SetSpinnerKit(false);
        console.log(ex.response.data.error);
      }
  };

  if(loading){
    return(
      <Spinner message="Consultando tus productos..."/>
    )
  }

  return (
    <section className="w-full px-4 py-2 sm:px-6 lg:px-8  min-h-screen bg-gray-50 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gestión de Productos</h2>
      </div>
      <div className="w-full px-4 py-6 flex flex-wrap justify-start items-center gap-3 sm:gap-4">
        <button 
          onClick={HandleAddProduct} 
          className="border-2 border-blue-600 text-blue-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Producto
        </button>
        <button 
          onClick={HandleAddBrand} 
          className="border-2 border-green-600 text-green-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Marca
        </button>
        <button 
          onClick={HandleAddCategoria} 
          className="border-2 border-purple-600 text-purple-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Categoria
        </button>
        <button 
          onClick={HandleAddCategoria} 
          className="border-2 border-purple-600 text-purple-600 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all font-medium shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap">
          Agregar Variante de Producto
        </button>
      </div>

      {ModalFormProduct && (<AdminAddProducto/>)}

      {Category && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            
            <button 
              onClick={HandleCloseProduct}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Agregar nueva categoría</h2>
            <p className="text-gray-500 mb-6">
              Organiza tus productos con categorías claras para mejorar la experiencia de compra.
            </p>

            <form className="space-y-6" onSubmit={HandleAgregarCategoria}>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de la categoría</label>
                <input 
                  type="text"
                  placeholder="Ej. Mochilas ejecutivas"
                  value={TextCategoria}
                  onChange={e => SetTextCategoria(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Un nombre claro ayuda a que tus clientes naveguen fácilmente.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={e => SetImageCategoria(e.target.files[0])}
                  className="mt-1 w-full text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sube un archivo CSV con tus categorías para agregarlas todas de una sola vez. 
                  Asegúrate de que el archivo tenga las columnas: <span className="font-medium">Nombre</span>, 
                  <span className="font-medium">Descripción</span>.
                </p>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Crear categoría
                </button>
                {/* <button 
                  type="button"
                  className="w-full sm: w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
                >
                  Guardar como borrador
                </button> */}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Podrás editar esta categoría después, no te preocupes.
              </p>
            </form>
          </div>
        </div>
      )}

      {Brand && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          
          <button 
            onClick={HandleCloseProduct}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registrar nueva marca</h2>
          <p className="text-gray-500 mb-6">
            Agrega la información de la marca para que tus clientes la identifiquen fácilmente y refuerces la confianza en tu tienda.
          </p>

          <form className="space-y-6" onSubmit={HandleAddMarca}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de la marca</label>
              <input 
                type="text"
                value={TextBrand}
                onChange={e => SetTextBrand(e.target.value)}
                placeholder="Ej. CHB - Chenson Business"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Un nombre claro ayuda a tus clientes a reconocerla rápidamente.</p>
              { Message && (
                <p className="text-xs text-gray-500 mt-1"></p>
              )}
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
      )}

      {SpinnerKit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4">
            
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            {/* Mensaje */}
            <p className="text-gray-700 font-medium">Procesando tu solicitud...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {Productos.map((producto) => (
          <div
            key={producto.productoId}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
          >
            {/* Header con imagen y badge */}
            <div className="relative">
              <div className="flex overflow-x-auto snap-x snap-mandatory h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                {producto.Imagenes && producto.Imagenes.length > 0 ? (
                  producto.Imagenes.map((imagenObj, index) => (
                    <img
                      key={imagenObj.id || index}
                      src={imagenObj.URL}
                      alt={`${producto.nombre} ${index + 1}`}
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
              {producto.descuento1 > 0 && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {producto.descuento1}% OFF
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
              {!producto.estatusProducto && (
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    Inactivo
                  </span>
                </div>
              )}

              {/* Badge de variantes */}
              {producto.Variantes && producto.Variantes.length > 0 && (
                <div className="absolute bottom-3 right-3">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    {producto.Variantes.length} variantes
                  </span>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-5">
              {/* Categoría y marca */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  {producto.categoria || "Sin categoría"}
                </span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {producto.marca || "Sin marca"}
                </span>
              </div>

              {/* Nombre del producto */}
              <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {producto.nombre}
              </h3>

              {/* Descripción (opcional) */}
              {producto.descripcion && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {producto.descripcion}
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
                        ${producto.monto.toFixed(2)}
                      </span>
                      {producto.descuento1 > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ${(producto.monto / (1 - producto.descuento1 / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vendidos */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Vendidos:</span>
                  <span className="text-sm font-semibold text-green-600">
                    {producto.vendidos} unidades
                  </span>
                </div>

                {/* Inventario */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Inventario:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      producto.stock < 5 ? 'bg-red-500 animate-pulse' : 
                      producto.stock < 20 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className={`text-sm font-semibold ${
                      producto.stock < 5 ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {producto.stock} unidades
                    </span>
                  </div>
                </div>

                {/* Barra de inventario */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      producto.stock < 5 ? 'bg-red-500' : 
                      producto.stock < 20 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min((producto.stock / 100) * 100, 100)}%`
                    }}
                  ></div>
                </div>

                {/* Etiquetas - CORREGIDO */}
                {producto.Etiquetas && producto.Etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {producto.Etiquetas.map((etiquetaObj, index) => (
                      <span
                        key={etiquetaObj.id || index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {etiquetaObj.Etiqueta} {/* ✅ Acceder a la propiedad Etiqueta */}
                      </span>
                    ))}
                  </div>
                )}

                {/* Información de variantes */}
                {producto.Variantes && producto.Variantes.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Variantes:</span>
                    <span className="font-semibold text-blue-600">
                      {producto.Variantes.length} opciones
                    </span>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button onClick={() => UpdateProductAdmin(producto.productoId)} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group/edit">
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
            <button onClick={HandleAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
              Crear Producto
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Ver Tutorial
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProductos;
