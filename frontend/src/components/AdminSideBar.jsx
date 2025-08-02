import React from 'react'

const AdminSideBar = () => {
  return (
    <div className='flex flex-col justify-between items-start align-top h-screen  bg-white border px-4 py-5'>
        {/* Encabezado de SideBar */}
        <div className='flex justify-between'>
            <div className='w-full overflow-hidden rounded-lg bg-slate-300'>
                <img className='w-full object-cover' src="./../public/img/banner-facebook-builtech.png" alt="" />
            </div>
        </div>
        {/* Contenido Main SideBar */}
        <div className='flex flex-col w-full'>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Ver resultados del ecommerce, ventas, pedidos, clientes, productos mas vendidos, productos mas vistos'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_dashboard.png" alt="Dashboard" />
                </div>
                <div className='text-md text-gray-700 font-semibol '>Dashboard</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Ver nuevos pedidos, estatus del pedido, cancelacion de pedidos aqui. '>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_pedidos.png" alt="Pedidos" />
                </div>
                <div className='text-md text-gray-700 font-semibol '>Pedidos</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Ver devoluciones'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_devoluciones.png" alt="Devoluciones" />
                </div>
                <div className='text-md text-gray-700 font-semibol '>Devoluciones</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Agregar, eliminar, promociones, categorias, marcas & valoraciones de productos aqui.'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_productos.png" alt="Productos"/>
                </div>
                <div className='text-md text-gray-700 font-semibol '>Productos</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Contacto con tus cliente, Ver sus carritos olvidados, lo que mas te han comprado.'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_clientes.png" alt="Clientes"/>
                </div>
                <div className='text-md text-gray-700 font-semibol '>Email Marketing</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Cupones de descuentos para tus clientes.'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_regalo.png" alt="Cupones"/>
                </div>
                <div className='text-md text-gray-700 font-semibol '>Cupones</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Proxima entrega en paqueteria y reimprimir guias.'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_camion.png" alt="Paqueterias & Envios"/>
                </div>
                <div className='text-md text-gray-700 font-semibol '>Paqueterias & Envios</div>
            </div>
        </div>

        {/* Footer SideBar */}
        <div className='flex flex-col w-full'>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md' title='Configuraciones de tu ecommerce'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_ajustes.png" alt="Ajustes"/>
                </div>
                <div className='text-md text-gray-700 font-semibol '>Ajustes</div>
            </div>
            <div className='flex align-middle items-center bg-white hover:bg-gray-200 hover:cursor-pointer px-1 py-2 rounded-md'>
                <div className='block w-8 h-8 overflow-hidden p-1 rounded-sm ml-2 mr-3'>
                    <img className='w-full object-cover' src="./../public/img/icon_salir.png" alt="Salir" title='Salir'/>
                </div>
                <div className='text-md text-gray-700 font-semibol '>Cerrar Sesion</div>
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar