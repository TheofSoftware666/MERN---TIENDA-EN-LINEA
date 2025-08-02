import React from 'react'

const AdminHeader = () => {
  return (
    <header className='flex justify-between align-middle bg-gray-50 text-gray-400 text-lg w-full px-20 py-4 border'>
        <div className='text-gray-800 text-xl font-bold'>
            🚀 Admin Ecommerce
        </div>
        <nav className='flex justify-between align-middle'>
            <div className='flex flex-col justify-center items-center align-middle bg-gray-200 rounded-md p-2 w-10 h-10 relative mr-6'>
                <a href="" className='text-sm text-gray-500 hover:text-gray-200' >
                    <img className='w-full object-cover' src="./../public/img/icon_notificar.png" alt="Mi Perfil" title='Mi Perfil' />
                </a>
                <div className='block absolute -top-2 -right-2 bg-red-500 text-gray-100 px-2 text-sm rounded-full font-bold'>1</div>
            </div>
            <div className='flex flex-col justify-center items-center align-middle bg-gray-200 rounded-md p-2 w-10 h-10 relative'>
                <a href="" className='text-sm text-gray-500 hover:text-gray-200' >
                    <img className='w-full object-cover' src="./../public/img/icon_usuario.png" alt="Mi Perfil" title='Mi Perfil' />
                </a>
                <div className='block absolute -top-2 -right-2 bg-red-500 text-gray-100 px-2 text-sm rounded-full font-bold'>1</div>
            </div>
        </nav>
    </header>
  )
}

export default AdminHeader