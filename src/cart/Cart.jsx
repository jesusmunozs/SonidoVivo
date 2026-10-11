import React, { useState, useEffect, useMemo } from 'react';
import CartHeader from './CartHeader';
import CartFooter from './CartFooter';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const STORAGE_KEY = 'carritoSonidoVivo';

// Obtener carrito inicial de LocalStorage
function getInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error al leer el carrito desde localStorage:', err);
    return [];
  }
}

export function Cart() {
  const [cart, setCart] = useState(getInitialCart);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  // Sincronizar cambios en el carrito con LocalStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
      window.dispatchEvent(new CustomEvent('carritoActualizado', { detail: newCart }));
    } catch (err) {
      console.error('Error al guardar el carrito:', err);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setCart(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + (item.cantidad || 0), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 0), 0);
  }, [cart]);

  const total = useMemo(() => {
    return subtotal * (1 - discount);
  }, [subtotal, discount]);

  const handleUpdateQuantity = (index, delta) => {
    const updated = [...cart];
    if (!updated[index]) return;

    const newQty = (updated[index].cantidad || 0) + delta;
    if (newQty <= 0) {
      updated.splice(index, 1);
    } else {
      updated[index] = { ...updated[index], cantidad: newQty };
    }
    saveCart(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
  };

  const handleApplyCoupon = () => {
    const cleanCoupon = coupon.trim().toUpperCase();

    if (!cleanCoupon) {
      setDiscount(0);
      setCouponMessage({
        type: 'error',
        text: 'Por favor ingresa un código.',
      });
      return;
    }

    if (cleanCoupon === 'DESCUENTO10' || cleanCoupon === 'SONIDO10') {
      setDiscount(0.10);
      setCouponMessage({
        type: 'success',
        text: '¡Cupón de 10% aplicado con éxito!',
      });
    } else if (cleanCoupon === 'SONIDOVIVO20') {
      setDiscount(0.20);
      setCouponMessage({
        type: 'success',
        text: '¡Cupón de 20% aplicado con éxito!',
      });
    } else {
      setDiscount(0);
      setCouponMessage({
        type: 'error',
        text: 'Cupón no válido.',
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de pagar.');
      return;
    }

    const confirmed = window.confirm('¿Deseas confirmar la compra de los productos en tu carrito?');
    if (confirmed) {
      saveCart([]);
      setDiscount(0);
      setCoupon('');
      setCouponMessage(null);
      alert('¡Gracias por tu compra en Sonido Vivo! Tu pedido ha sido procesado con éxito.');
    }
  };

  return (
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased w-full">
      {/* Header Full-Width */}
      <CartHeader totalItems={totalItems} />

      {/* Contenedor principal Full-Width */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-4 sm:pt-6 pb-8 sm:pb-10 flex flex-col">
        <div className="bg-[#1c1a2e] border border-[#2e2c45] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl flex-1 flex flex-col w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2e2c45] pb-5 mb-6">
            <div>
              <span className="text-xs sm:text-sm text-[#4fa8ff] font-bold uppercase tracking-wider">Tu orden</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mt-1">
                Mi Carrito de Compras
              </h1>
            </div>
            <a
              href="#/products"
              className="text-xs sm:text-sm text-[#4fa8ff] hover:text-[#3db8ff] font-semibold no-underline flex items-center gap-1.5"
            >
              ← Continuar comprando
            </a>
          </div>

          <div className="cart-layout flex flex-col lg:flex-row gap-6 lg:gap-10 items-start flex-1 w-full">
            {/* Lista de productos / Estado vacío */}
            <div className="cart-items w-full lg:w-2/3 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="py-14 px-6 text-center text-[#a0a0b0] bg-[#27253d] border border-[#2e2c45] rounded-2xl flex flex-col items-center justify-center gap-4 w-full">
                  <span className="text-5xl" role="img" aria-label="Carrito vacío">
                    🛒
                  </span>
                  <div className="space-y-1">
                    <p className="text-lg sm:text-xl font-bold text-white">Tu carrito de compras está vacío</p>
                    <p className="text-sm text-[#a0a0b0]">Descubre guitarras, teclados, baterías y más en nuestro catálogo.</p>
                  </div>
                  <a
                    href="#/products"
                    className="inline-block bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-extrabold text-sm sm:text-base px-7 py-3 rounded-xl no-underline transition-all shadow-lg hover:shadow-cyan-500/20 mt-2 w-auto"
                  >
                    Buscar instrumentos
                  </a>
                </div>
              ) : (
                cart.map((item, index) => (
                  <CartItem
                    key={item.id ? `${item.id}-${index}` : `${item.nombre}-${index}`}
                    item={item}
                    index={index}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))
              )}
            </div>

            {/* Resumen lateral */}
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              coupon={coupon}
              couponMessage={couponMessage}
              onCouponChange={setCoupon}
              onApplyCoupon={handleApplyCoupon}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>

      {/* Footer Full-Width */}
      <CartFooter />
    </div>
  );
}

export default Cart;
