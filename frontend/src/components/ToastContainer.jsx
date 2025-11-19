import Toast from "./Toast.jsx";

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;