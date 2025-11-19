// hooks/useToast.js
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-remover después de la duración
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = useCallback((message, type = 'info') => {
    addToast(message, type);
  }, [addToast]);

  toast.success = (message) => addToast(message, 'success');
  toast.error = (message) => addToast(message, 'error');
  toast.warning = (message) => addToast(message, 'warning');
  toast.info = (message) => addToast(message, 'info');

  return { toasts, toast, removeToast };
};