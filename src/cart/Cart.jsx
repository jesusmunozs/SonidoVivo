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
      // Disparar evento para que otras partes o scripts de la app puedan actualizarse
      window.dispatchEvent(new CustomEvent('carritoActualizado', { detail: newCart }));
    } catch (err) {
      console.error('Error al guardar el carrito:', err);
    }
  };

  // Escuchar cambios de almacenamiento entre pestañas o fuentes externas
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

  // Totales calculados
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + (item.cantidad || 0), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 0), 0);
  }, [cart]);

  const total = useMemo(() => {
    return subtotal * (1 - discount);
  }, [subtotal, discount]);

  // Cambiar cantidad (+1 o -1)
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

  // Eliminar producto
  const handleRemoveItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
  };

  // Aplicar cupón de descuento
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

  // Procesar pago
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
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased">
      {/* Header */}
      <CartHeader totalItems={totalItems} />

      {/* Contenedor principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col">
        <div className="bg-[#1c1a2e] border border-[#2e2c45] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl flex-1 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-8 border-b border-[#2e2c45] pb-4">
            Mi Carrito de Compras
          </h1>

          <div className="cart-layout flex flex-col lg:flex-row gap-8 items-start flex-1">
            {/* Lista de productos / Estado vacío */}
            <div className="cart-items w-full lg:w-2/3 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="py-12 px-6 text-center text-[#a0a0b0] bg-[#27253d] border border-[#2e2c45] rounded-xl flex flex-col items-center justify-center gap-4">
                  <span className="text-4xl" role="img" aria-label="Carrito vacío">
                    🛒
                  </span>
                  <p className="text-base sm:text-lg">Tu carrito de compras está vacío.</p>
                  <a
                    href="../home/home.view.html"
                    className="inline-block bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold text-sm px-6 py-2.5 rounded-lg no-underline transition-colors"
                  >
                    Volver a la tienda a buscar instrumentos
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

      {/* Footer */}
      <CartFooter />
    </div>
  );
}

export default Cart;
