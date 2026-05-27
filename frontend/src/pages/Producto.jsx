import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientAxios from "../config/axios.jsx";

import Devoluciones from "../components/Devoluciones.jsx";
import ProductoDetalle from "../components/ProductoDetalle.jsx";
import Testimonios from "../components/Testimonios.jsx";
import CardProducto from "../components/CardProducto.jsx";
import FaqsProduct from "../components/FaqsProduct.jsx";

// Skeleton para el detalle del producto (mientras carga)
const ProductSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-200 rounded-3xl h-96 w-full"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-24 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    getProduct(id);
    // Aquí podrías obtener productos relacionados, por ahora simulamos vacío
    // getRelatedProducts(id);
  }, [id]);

  const getProduct = async (idProducto) => {
    setLoading(true);
    try {
      const { data } = await clientAxios.get(`/Productos/${idProducto}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Error obteniendo producto:", error);
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  // Simulación de productos relacionados (puedes reemplazar con llamada real)
  // const getRelatedProducts = async (idProducto) => {
  //   try {
  //     const { data } = await clientAxios.get(`/Productos/${idProducto}/related`);
  //     setRelatedProducts(data.data || []);
  //   } catch (error) {
  //     console.warn("No se pudieron cargar productos relacionados");
  //   }
  // };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!producto) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-bold text-gray-700">Producto no encontrado</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full hover:from-pink-600 hover:to-rose-500 transition"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-rose-50 min-h-screen">
      {/* Contenedor principal con padding y max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Detalle del producto */}
        <ProductoDetalle producto={producto} />

        {/* Separador decorativo */}
        <div className="my-16 border-t border-rose-100"></div>

        {/* Preguntas frecuentes */}
        <FaqsProduct producto={producto} />

        {/* Separador decorativo */}
        <div className="my-16 border-t border-rose-100"></div>

        {/* Testimonios / Reseñas */}
        <Testimonios producto={producto} />

        {/* Separador decorativo */}
        <div className="my-16 border-t border-rose-100"></div>

        {/* Políticas de devolución */}
        <Devoluciones />

        {/* Productos relacionados (si existen) */}
        {relatedProducts.length > 0 && (
          <>
            <div className="my-16 border-t border-rose-100"></div>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
                También te puede interesar
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((prod) => (
                <CardProducto key={prod.id} producto={prod} />
              ))}
            </div>
          </>
        )}

        {/* Si no hay relacionados pero queremos mostrar un placeholder (opcional, puedes dejarlo comentado) */}
        {/* <div className="my-16 border-t border-rose-100"></div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
            También te puede interesar
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-300 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CardProducto key={i} producto={null} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Producto;