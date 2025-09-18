import { useState } from "react";
import axios from 'axios';
import AdminAddProducto from "../components/AdminAgregarProducto.jsx";
import { useEffect } from "react";

const productosMock = [
  {
    id: 1,
    nombre: 'Shampoo Orgánico',
    marca: 'Chenson',
    precio: 120.5,
    inventario: 3,
    categoria: 'Cabello',
    sku: 'SKU12345',
    promocion: true,
    descuento: 15,
    imagenes: [
      'https://fm.chenson.com.mx/1500X1500/1861105-3/1861105-3_01.jpg',
      'https://fm.chenson.com.mx/1500X1500/1861105-3/1861105-3_02.jpg'
    ]
  },
  {
    id: 2,
    nombre: 'Crema Facial Día & Noche',
    marca: 'Natura',
    precio: 89.9,
    inventario: 35,
    categoria: 'Cuidado de la piel',
    sku: 'SKU67890',
    promocion: false,
    descuento: 0,
    imagenes: [
      'https://fm.chenson.com.mx/1500X1500/1861105-9X/1861105-9X_02.jpg'
    ]
  },
];

const AdminProductos = () => {

  const [ Modal , setModal ] = useState(false);
  const [ Category, setCategory ] = useState(false);
  const [ Brand, setBrand ] = useState(false);
  const [ Spinner, SetSpinner] = useState(false);

  const [ Message , SetMessage ] = useState(false);

  // Marca
  const [ TextBrand, SetTextBrand ] = useState('');

  // Categoria
  const [ TextCategoria, SetTextCategoria ] = useState('');
  const [ ImageCategoria, SetImageCategoria ] = useState(null);

  // Producto 
  const [ ProductoAdd, SetProductoAdd ] = useState('');
  const [ Descripcion, SetDescripcion ] = useState('');
  const [ NumMarca, SetNumMarca ] = useState(0);
  const [ NumCateria, SetNumCategoria ] = useState(0);
  const [ Stock, SetStock ] = useState(0);
  const [ StatusProduct , SetStatusProduct ] = useState(false);
  const [ StatusPromo , SetStatusPromo ] = useState(false);
  const [ Promocion , SetPromocion ] = useState(0);
  const [ Monto , SetMonto ] = useState(0);

  // Selects 
  const [ SelectMarca, SetSelectMarca ] = useState([]);
  const [ SelectCategoria, SetSelectCategoria ] = useState([]);

  // Hooks 
  useEffect(() => {
    responseCategorias();
  }, []);

  // Funciones
  const responseCategorias = async () => {
    try{
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
    }
  }

  function HandleAddProduct(){
    setModal(true);
  }

  function HandleCloseProduct() {
    setModal(false);
    setCategory(false);
    setBrand(false);
  }

  function HandleAddCategoria() {
    setCategory(true);
  }

  function HandleAddBrand() {
    setBrand(true);
  }

  function HandleSpinner() {
    SetSpinner(true);
  }

  function HandleSpinnerClose() {
    SetSpinner(false);
  }
  

  const HandleAddMarca = async e => {
    e.preventDefault();
    
    setBrand(false);
    SetSpinner(true);

    if(TextBrand.length == 0){
      setBrand(true);
      SetSpinner(false);
      console.log("El nombre de la marca es invalido");
      return;
    }

    const url = `http://localhost:3001/tienda/api/Admin/AgregarMarcas`;
    try{
      const token = localStorage.getItem('ape_token');

      if(!token){
        setBrand(true);
        SetSpinner(false);
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
      SetSpinner(false);
      SetTextBrand('');

    }catch(ex){
      setBrand(true);
      SetSpinner(false);
      console.log("Error : " + ex);
      console.log(ex.response.data.error);
    }

  };

  const HandleAgregarCategoria = async e => {
      e.preventDefault();

      setCategory(false);
      SetSpinner(true);

      const token = localStorage.getItem('ape_token');

      if(!token){
        setCategory(true);
        SetSpinner(false);
        console.log("Es necesario agregar una imagen. ");
        return;
      }

      if(TextCategoria.trim().length == 0){
        setCategory(true);
        SetSpinner(false);
        console.log("Para agregar la categoria es necesario completar el campo");
        return;        
      }
      
      const formData = new FormData();
        formData.append("nombre", TextCategoria);

      if(ImageCategoria){
        formData.append("imagen", ImageCategoria);
      }

      console.log(ImageCategoria);
      try{
        const url = `http://localhost:3001/tienda/api/Admin/AgregarCategoria`;

        const response = await axios.post(url, formData, {
          headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        });

        console.log(response.data);

        setCategory(false);
        SetSpinner(false);
        SetImageCategoria(null);
        SetTextCategoria('');

      }catch(ex){
        setCategory(true);
        SetSpinner(false);
        console.log(ex.response.data.error);
      }
  }

  return (
    <section className="w-full px-4 py-2 sm:px-6 lg:px-8  min-h-screen bg-gray-50 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gestión de Productos</h2>
      </div>
      <div className="w-full px-4 py-6 flex justify-start align-middle">
        <button onClick={HandleAddProduct} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
        Agregar Producto
        </button>
        <button onClick={HandleAddBrand} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
          Agregar Marca
        </button>
        <button onClick={HandleAddCategoria} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium">
          Agregar Categoria
        </button>
      </div>

      {Modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            
            {/* Botón de cierre */}
            <button 
              onClick={HandleCloseProduct}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Título */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Agregar nuevo producto</h2>
            <p className="text-gray-500 mb-6">Completa la información para que tus clientes lo encuentren más fácil y confíen en tu tienda.</p>

            {/* Formulario */}
            <form className="space-y-6">
              
              {/* Nombre del producto */}
<div>
  <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
  <input 
    type="text"
    placeholder="Ej. Mochila ejecutiva CHB"
    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
  <p className="text-xs text-gray-500 mt-1">Un nombre claro y atractivo ayuda a que tus clientes lo encuentren más fácil.</p>
</div>

{/* Descripción */}
<div>
  <label className="block text-sm font-medium text-gray-700">Descripción</label>
  <textarea 
    rows="3"
    placeholder="Describe las características principales del producto..."
    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Stock general</label>
    <input 
      type="number"
      placeholder="Ej. 25"
      className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>

{/* SKU y Estatus */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Sku</label>
    <input 
      type="text"
      placeholder="CPRODUCTO-D"
      className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Activo</label>
    <select className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
      <option value="1">Sí</option>
      <option value="0">No</option>
    </select>
  </div>
</div>

{/* Promoción y Descuento */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Promoción</label>
    <input 
      type="number"
      placeholder="$0.00"
      className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Descuento (%)</label>
    <input 
      type="number"
      placeholder="Ej. 10"
      className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>

{/* Categoría */}
<div>
  <label className="block text-sm font-medium text-gray-700">Categoría</label>
  <select className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
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
  <select className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
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
    <input type="number" placeholder="0" className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Ancho (cm)</label>
    <input type="number" placeholder="0" className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Alto (cm)</label>
    <input type="number" placeholder="0" className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1" />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
    <input type="number" placeholder="0" className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1" />
  </div>
</div>

{/* Variantes */}
<div>
  <label className="block text-sm font-medium text-gray-700">Variantes</label>
  <p className="text-xs text-gray-500 mb-2">
    Ejemplo: Color, Talla o Presentación
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
    {/* Nombre de la variante */}
    <input 
      type="text" 
      placeholder="Nombre variante (ej. Azul)" 
      className="border p-2 rounded" 
    />

    {/* Precio */}
    <input 
      type="number" 
      placeholder="Precio" 
      className="border p-2 rounded" 
    />

    {/* Stock */}
    <input 
      type="number" 
      placeholder="Stock" 
      className="border p-2 rounded" 
    />

    {/* Selector de color */}
    <div className="flex items-center gap-2">
      <input 
        type="color" 
        className="w-12 h-10 rounded cursor-pointer border" 
      />
      <span className="text-xs text-gray-500">Selecciona un color</span>
    </div>

    {/* Variantes */}
<div>
  
  {/* Botón para agregar otra variante */}
  <button
    type="button"
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    + Agregar variante
  </button>
</div>

  </div>
</div>


{/* Etiquetas */}
<div>
  <label className="block text-sm font-medium text-gray-700">Etiquetas</label>
  <input 
    type="text"
    placeholder="Ej. escolar, mochilas, cuero"
    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
  />
  <p className="text-xs text-gray-500 mt-1">Separadas por comas.</p>
</div>

{/* Preguntas frecuentes */}
<div>
  <label className="block text-sm font-medium text-gray-700">Preguntas frecuentes</label>
  <div className="space-y-2">
    <input type="text" placeholder="Pregunta" className="w-full border p-2 rounded" />
    <input type="text" placeholder="Respuesta" className="w-full border p-2 rounded" />
  </div>
  {/* Botón para agregar otra variante */}
  <button
    type="button"
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    + Agregar Faq
  </button>
</div>

{/* Imágenes */}
<div>
  <label className="block text-sm font-medium text-gray-700">Imágenes del producto</label>
  <input 
    type="file"
    accept="image/*"
    multiple
    className="mt-1 w-full text-gray-600"
  />
</div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Carga masiva de productos (CSV)</label>
                <input 
                  type="file"
                  accept=".csv"
                  className="mt-1 w-full text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sube un archivo CSV con tus productos para agregarlas todas de una sola vez. 
                  Asegúrate de que el archivo tenga las columnas:  
                  <span className="font-medium"> Nombre</span>, 
                  <span className="font-medium"> Descripción</span>.
                </p>
                <button 
                  type="button"
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Descargar plantilla CSV
                </button>
              </div> */}

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

      )}

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

      {Spinner && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4">
            
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            {/* Mensaje */}
            <p className="text-gray-700 font-medium">Procesando tu solicitud...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosMock.map((producto) => (
          <div
            key={producto.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">{producto.marca} · {producto.categoria}</p>
              </div>

              {producto.promocion && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                  {producto.descuento}% OFF
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-4">
                {producto.imagenes.length > 0 ? (
                  producto.imagenes.slice(0, 2).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="preview"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><strong>SKU:</strong> {producto.sku}</p>
              <p>
                <strong>Precio:</strong>{' '}
                <span className="text-blue-700 font-semibold">${producto.precio.toFixed(2)}</span>
              </p>
              <p>
                <strong>Inventario:</strong>{' '}
                <span className={producto.inventario < 5 ? 'text-red-600 font-semibold' : 'text-gray-800'}>
                  {producto.inventario} unidades
                </span>
              </p>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <button className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
              <button className="text-red-500 hover:underline text-sm font-medium">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {productosMock.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No hay productos disponibles.</div>
      )}
    </section>
  );
};

export default AdminProductos;
