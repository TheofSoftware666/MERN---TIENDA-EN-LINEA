import { useParams } from "react-router-dom";

import Devoluciones from "../components/Devoluciones.jsx";
import ProductoDetalle from "../components/ProductoDetalle.jsx"
import Testimonios from "../components/Testimonios.jsx";
import CardProducto from "../components/CardProducto.jsx";

const Producto = () => {
  const { id } = useParams();

  return (
    <>
      <div>
        <ProductoDetalle productoId={id}/>
        <Testimonios productoId={id}/>
        <Devoluciones/>
       <div className="w-full max-w-6xl mx-auto mt-20 px-4">

  {/* Título de la sección */}
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
    También te puede interesar
  </h2>

  {/* Carrusel horizontal sin JS */}
  <div className="overflow-x-auto hide-scrollbar">
    <div className="flex gap-6 min-w-[700px] md:min-w-full">

      {/* Reutilizando el componente */}
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
  </div>
</div>

      </div>
    </>
  )
}

export default Producto