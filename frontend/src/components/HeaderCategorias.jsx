import React from 'react'

const HeaderCategorias = () => {
  return (
    <>
        <div className='flex w-full justify-center align-middle px-20 py-1 overflow-hidden bg-gray-700 text-white'>
          <div className='block relative w-32'>
            <div className='flex align-middle justify-center absolute left-0 w-6 h-6 px-1 py-1 rounded-full '>
              <img src="./../../public/img/icon-location-white.png" alt="Codigo Postal" className='w-full object-cover'/>
            </div>
            <input className='bg-gray-600 focus:outline-none text-sm px-8 py-1 w-40 rounded-xl  text-gray-400' placeholder='Codigo Postal' type="text" name="codigo-postal" id="" />
          </div>
          <div className='flex w-full align-middle justify-evenly py-1.5'>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Lo mas vendido</a>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Promociones</a>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Productos</a>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Tecnología</a>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Electrodomesticos</a>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Para Viajes</a>
            <a className='text-sm text-gray-400 hover:text-gray-300 hover:underline' href="">Moda</a>
          </div>
        </div>
    </>
  )
}

export default HeaderCategorias