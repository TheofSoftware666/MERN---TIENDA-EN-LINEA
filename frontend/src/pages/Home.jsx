import { useEffect } from "react"
import HeaderCategorias from "../components/HeaderCategorias.jsx"
import Carousel from "../components/Carousel.jsx"
import CardProducto from "../components/CardProducto.jsx"
import CardCategoria from "../components/CardCategoria.jsx"
import CardMarca from "../components/CardMarca.jsx"

const Home = () => {

  useEffect(() => {

    const token = localStorage.getItem('ape_tokens');
    console.log(token);

  }, []);

  return (
    <>
      <HeaderCategorias />
      <Carousel />
      <div className="container mx-auto px-20 py-10 bg-gray-50">
        {/* Promociones */}
        <h1 className="text-2xl text-center font-bold text-gray-900">🔥 Nuestas Promociones 🔥</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0 mt-5">
          <CardProducto />
          <CardProducto />
          <CardProducto />
          <CardProducto />  
        </div>

       <section className="mt-16 mb-16 py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explora por Categorías</h2>

            <div className="flex space-x-4 py-5 overflow-x-auto scrollbar-hide">
              <CardCategoria/>
              <CardCategoria/>
              <CardCategoria/>
              <CardCategoria/>
              <CardCategoria/>
              <CardCategoria/>
              <CardCategoria/>
            </div>
          </div>
        </section>

        <h1 className="text-2xl text-center font-bold text-gray-900"> 💡Productos recomendados 💡 </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0 mt-7">
          <CardProducto />
          <CardProducto />
          <CardProducto />
          <CardProducto />  
          <CardProducto />
          <CardProducto />
          <CardProducto />
          <CardProducto />  
        </div>

        <section className="mt-16 mb-16 py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explora por Categorías</h2>

            <div className="flex space-x-4 py-5 overflow-x-auto scrollbar-hide">
              <CardMarca/>
              <CardMarca/>
              <CardMarca/>
              <CardMarca/>
              <CardMarca/>
              <CardMarca/>
              <CardMarca/>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default Home