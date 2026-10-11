import React, { useState, useEffect, useMemo } from 'react';
import HomeHeader from './HomeHeader';
import HomeHero from './HomeHero';
import ProductCard from './ProductCard';
import HomeFooter from './HomeFooter';

const STORAGE_KEY = 'carritoSonidoVivo';

const INVENTARIO_PRODUCTOS = [
  { id: 1, nombre: 'Guitarra Eléctrica Stratocaster', precio: 850, descripcion: 'Cuerpo de Fresno', imagen: '' },
  { id: 2, nombre: 'Teclado Sintetizador 61 Teclas', precio: 1200, descripcion: 'Polifonía 128 voces', imagen: '' },
  { id: 3, nombre: 'Batería Acústica 5 Cuerpos', precio: 950, descripcion: 'Madera de Arce', imagen: '' },
  { id: 4, nombre: 'Micrófono Condensador Estudio', precio: 150, descripcion: 'Patrón Cardioide', imagen: '' },
];

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

export function Home() {
  const [products] = useState(INVENTARIO_PRODUCTOS);
  const [cart, setCart] = useState(getInitialCart);
  const [toastMessage, setToastMessage] = useState(null);

  // Guardar carrito y notificar
  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
      window.dispatchEvent(new CustomEvent('carritoActualizado', { detail: newCart }));
    } catch (err) {
      console.error('Error al guardar el carrito:', err);
    }
  };

  // Escuchar cambios de almacenamiento
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
    const handleCustomChange = (e) => {
      if (e.detail) {
        setCart(e.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('carritoActualizado', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('carritoActualizado', handleCustomChange);
    };
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + (item.cantidad || 0), 0);
  }, [cart]);

  // Añadir producto al carrito
  const handleAddToCart = (product) => {
    const currentCart = [...cart];
    const existingIndex = currentCart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      currentCart[existingIndex] = {
        ...currentCart[existingIndex],
        cantidad: (currentCart[existingIndex].cantidad || 0) + 1,
      };
    } else {
      currentCart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        cantidad: 1,
      });
    }

    saveCart(currentCart);
    showToast(`${product.nombre} fue añadido a tu carrito.`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased w-full">
      {/* Header */}
      <HomeHeader totalItems={totalItems} />

      {/* Contenido Principal con limites balanceados y separacion holgada */}
      <main className="flex-1 w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 flex flex-col gap-16 sm:gap-24">
        {/* Hero Banner */}
        <HomeHero />

        {/* Sección de Productos Destacados */}
        <section className="space-y-10 w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#2e2c45] pb-6">
            <div>
              <span className="text-xs sm:text-sm text-[#4fa8ff] font-bold uppercase tracking-wider">Lo más vendido</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide mt-1.5">
                Instrumentos Destacados
              </h2>
            </div>
            <a
              href="#/products"
              className="text-sm sm:text-base text-[#4fa8ff] hover:text-[#3db8ff] no-underline font-semibold flex items-center gap-1.5 transition-colors group"
            >
              Ver catálogo completo <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Grid de productos con espaciado generoso entre cards */}
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <HomeFooter />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 bg-[#100e1f] text-white border border-[#4fa8ff] py-3.5 px-6 rounded-xl shadow-2xl z-50 text-sm font-medium transition-all duration-300 flex items-center gap-2"
        >
          <span>✅</span> {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
