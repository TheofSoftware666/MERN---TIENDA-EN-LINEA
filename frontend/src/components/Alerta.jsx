export default function Alerta({ alerta }) {
  const iconos = {
    Error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-red-700" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zM9 4a1 1 0 112 0v5a1 1 0 11-2 0V4zm1 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
      </svg>
    ),
    Exito: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-700" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414L9 12.414l4.707-4.707z" clipRule="evenodd" />
      </svg>
    ),
    Info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10A8 8 0 11.001 10 8 8 0 0118 10zM9 7a1 1 0 112 0 1 1 0 01-2 0zm1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  };

  const estilos = {
    base: "flex items-center p-4 rounded-lg shadow-sm text-sm font-medium transition-all duration-300 ease-in-out my-2",
    tipos: {
      Error: "bg-red-50 text-red-800 border border-red-300",
      Exito: "bg-green-50 text-green-800 border border-green-300",
      Info: "bg-blue-50 text-blue-800 border border-blue-300",
    },
  };

  return (
    <div className={`${estilos.base} ${estilos.tipos[alerta.tipo] || ""} animate-fadeIn`}>
      {iconos[alerta.tipo]}
      <span>{alerta.msg}</span>
    </div>
  );
}
