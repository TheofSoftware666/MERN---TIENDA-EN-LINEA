import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientAxios from "../config/axios.jsx";

import Devoluciones from "../components/Devoluciones.jsx";
import ProductoDetalle from "../components/ProductoDetalle.jsx"
import Testimonios from "../components/Testimonios.jsx";
import CardProducto from "../components/CardProducto.jsx";
import FaqsProduct from "../components/FaqsProduct.jsx";

const Producto = () => {  
  const { id } = useParams();
  const navigate = useNavigate();
  const [ producto, setProduct ] = useState(null);

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = async (idProducto) => {
    try {
      const { data } = await clientAxios.get(`/Productos/${idProducto}`);
      setProduct(data.data); 
      console.log(data.data);
    } catch (error) {
      console.error("Error obteniendo producto:", error);
      navigate("/error");
    }
  };

  if(!producto){
    return <p className="text-center mt-10">Cargando producto...</p>
  }

  return (
    <>
      <div>
        <ProductoDetalle producto={producto}/>
        <FaqsProduct producto={producto}/>
        <Testimonios producto={producto}/>
        <Devoluciones/>
        <div className="w-full max-w-6xl mx-auto mt-20 px-4">

          
          {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            También te puede interesar
          </h2> */}

          {/* <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 min-w-[700px] md:min-w-full">
              <div className="min-w-[240px] max-w-[260px] flex-shrink-0">
                <CardProducto />
              </div>
              <div className="min-w-[240px] max-w-[260px] flex-shrink-0">
                <CardProducto />
              </div>
              <div className="min-w-[240px] max-w-[260px] flex-shrink-0">
                <CardProducto />
              </div>
              <div className="min-w-[240px] max-w-[260px] flex-shrink-0">
                <CardProducto />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Producto