import React from 'react';

export function CartItem({ item, index, onUpdateQuantity, onRemove }) {
  const subtotalProducto = (item.precio || 0) * (item.cantidad || 0);

  return (
    <div className="cart-item bg-[#27253d] border border-[#2e2c45] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-[#4fa8ff]/40 transition-colors shadow-sm">
      <div className="item-img w-20 h-20 bg-[#d9d9d9] rounded-lg shrink-0 flex items-center justify-center">
        {/* Placeholder para la imagen del producto */}
      </div>

      <div className="item-info flex-1 text-center sm:text-left">
        <h3 className="text-white font-semibold text-base">{item.nombre}</h3>
        <p className="item-desc text-xs text-[#a0a0b0] mt-1">
          {item.descripcion || 'Instrumento musical'}
        </p>
      </div>

      <div className="item-price text-base font-bold text-white shrink-0 sm:text-right min-w-[90px]">
        ${subtotalProducto.toLocaleString()}
      </div>

      <div className="item-controls flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="btn-qty w-8 h-8 rounded-full bg-[#3e3c56] hover:bg-[#4fa8ff] hover:text-[#100e1f] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#2e2c45]"
          onClick={() => onUpdateQuantity(index, -1)}
          title="Disminuir"
          aria-label="Disminuir cantidad"
        >
          −
        </button>

        <input
          type="text"
          value={item.cantidad}
          readOnly
          aria-label="Cantidad"
          className="w-10 text-center bg-transparent border border-[#3e3c56] text-white text-sm py-1 rounded-md outline-none"
        />

        <button
          type="button"
          className="btn-qty w-8 h-8 rounded-full bg-[#3e3c56] hover:bg-[#4fa8ff] hover:text-[#100e1f] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#2e2c45]"
          onClick={() => onUpdateQuantity(index, 1)}
          title="Aumentar"
          aria-label="Aumentar cantidad"
        >
          +
        </button>

        <button
          type="button"
          className="btn-qty w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ml-1"
          onClick={() => onRemove(index)}
          title="Eliminar"
          aria-label="Eliminar producto"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default CartItem;
