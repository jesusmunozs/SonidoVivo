import React from 'react';

export function CartSummary({
  subtotal,
  discount,
  total,
  coupon,
  couponMessage,
  onCouponChange,
  onApplyCoupon,
  onCheckout,
}) {
  const hasDiscount = discount > 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onApplyCoupon();
    }
  };

  return (
    <div className="cart-summary w-full lg:w-1/3 bg-[#27253d] border border-[#2e2c45] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-lg lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-white border-b border-[#3e3c56] pb-3">
        Resumen de Orden
      </h2>

      <div className="summary-row total-row flex items-center justify-between text-lg font-bold text-white">
        <span className="text-[#a0a0b0]">TOTAL:</span>
        <span className="text-2xl text-white font-extrabold">
          {hasDiscount && (
            <span className="text-sm line-through text-[#a0a0b0] mr-2 font-normal">
              ${subtotal.toLocaleString()}
            </span>
          )}
          ${Math.round(total).toLocaleString()}
        </span>
      </div>

      <div className="coupon-section space-y-2">
        <p className="text-xs text-[#a0a0b0]">¿Tienes un cupón de descuento?</p>
        <div className="coupon-input flex gap-2">
          <input
            type="text"
            placeholder="Código (ej: DESCUENTO10)..."
            aria-label="Código de cupón"
            value={coupon}
            onChange={(e) => onCouponChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-[#3e3c56] border border-[#4a4766] text-white text-xs sm:text-sm rounded-full px-4 py-2.5 outline-none focus:border-[#4fa8ff] transition-colors"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            className="btn-apply bg-[#4a4766] hover:bg-[#4fa8ff] hover:text-[#100e1f] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            APLICAR
          </button>
        </div>

        {couponMessage?.text && (
          <p
            className={`text-xs min-h-[16px] ${
              couponMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {couponMessage.text}
          </p>
        )}
      </div>

      {/* Botón de pago */}
      <button
        type="button"
        onClick={onCheckout}
        className="btn-pagar w-full bg-[#00a843] hover:bg-[#00913a] text-white font-bold text-base py-3.5 px-6 rounded-full transition-colors cursor-pointer shadow-lg hover:shadow-green-900/30 text-center"
      >
        PAGAR
      </button>
    </div>
  );
}

export default CartSummary;
