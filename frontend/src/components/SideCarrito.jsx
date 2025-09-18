import React, { useState } from "react";
import { X } from "lucide-react";

const SideCarrito = ({ onOpenCheck }) => {
  // 🔹 Simulamos productos en el carrito
  const [items] = useState([
    { id: 1, name: "Mochila CHB Pro", price: 450, qty: 1, image: "https://fm.chenson.com.mx/1500X1500/1861105-3/1861105-3_01.jpg" },
    { id: 2, name: "Lapicera Premium", price: 120, qty: 2, image: "https://fm.chenson.com.mx/1500X1500/1861105-3/1861105-3_01.jpg" },
    { id: 3, name: "Laptop Case", price: 300, qty: 1, image: "https://fm.chenson.com.mx/1500X1500/1861105-3/1861105-3_01.jpg" },
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const envioGratis = 1000; // monto meta para envío gratis
  const faltante = envioGratis - subtotal;

  return (
    <>
      {/* Header */}
      {/* <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Tu Carrito</h2>
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div> */}

      {/* Productos */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">Tu carrito está vacío 🛒</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-4 border-b pb-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">x{item.qty}</p>
              </div>
              <p className="text-sm font-semibold">${item.price * item.qty}</p>
            </div>
          ))
        )}
      </div>

      {/* Subtotal + Incentivo */}
      {items.length > 0 && (
        <div className="p-4 border-t space-y-3">
          {faltante > 0 ? (
            <p className="text-xs text-blue-600">
              🚚 Te faltan <span className="font-bold">${faltante}</span> para envío gratis
            </p>
          ) : (
            <p className="text-xs text-green-600">🎉 ¡Ya tienes envío gratis!</p>
          )}

          <div className="flex justify-between font-semibold text-sm">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>

          <button onClick={onOpenCheck()} className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            Finalizar compra
          </button>

          <p className="text-[11px] text-gray-500 text-center mt-2">
            🔒 Pago 100% seguro · Devoluciones fáciles
          </p>
        </div>
      )}
    </>
  );
};

export default SideCarrito;
