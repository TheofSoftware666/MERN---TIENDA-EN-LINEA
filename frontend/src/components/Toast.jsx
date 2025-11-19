import { useEffect } from 'react';

const Toast = ({ toast, onClose }) => {
  const { id, message, type, duration } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "flex items-center p-4 rounded-lg shadow-lg border transform transition-all duration-300 ease-in-out max-w-md w-full backdrop-blur-sm";
    
    const typeStyles = {
      success: "bg-green-25 border-green-200 text-green-800",
      error: "bg-red-25 border-red-200 text-red-800",
      warning: "bg-yellow-25 border-yellow-200 text-yellow-800",
      info: "bg-blue-25 border-blue-200 text-blue-800"
    };

    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const getIcon = () => {
    const icons = {
      success: (
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      ),
      error: (
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✕</span>
        </div>
      ),
      warning: (
        <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">!</span>
        </div>
      ),
      info: (
        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">i</span>
        </div>
      )
    };
    return icons[type] || icons.info;
  };

  return (
    <div className={getToastStyles()}>
      <span className="mr-3">{getIcon()}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors text-lg"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;