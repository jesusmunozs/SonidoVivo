import React, { useState, useEffect, useMemo } from 'react';
import ProductsHeader from './ProductsHeader';
import ProductCard from './ProductCard';
import ProductsFooter from './ProductsFooter';

const STORAGE_KEY = 'carritoSonidoVivo';

const INVENTARIO_COMPLETO = [
  { id: 1, nombre: 'Guitarra Eléctrica Stratocaster', precio: 850, descripcion: 'Cuerpo de Fresno', categoria: 'Cuerdas' },
  { id: 2, nombre: 'Teclado Sintetizador 61 Teclas', precio: 1200, descripcion: 'Polifonía 128 voces', categoria: 'Teclas' },
  { id: 3, nombre: 'Batería Acústica 5 Cuerpos', precio: 950, descripcion: 'Madera de Arce', categoria: 'Percusión' },
  { id: 4, nombre: 'Micrófono Condensador Estudio', precio: 150, descripcion: 'Patrón Cardioide', categoria: 'Audio' },
  { id: 5, nombre: 'Bajo Eléctrico 4 Cuerdas Jazz', precio: 780, descripcion: 'Pastillas Activas', categoria: 'Cuerdas' },
  { id: 6, nombre: 'Piano Digital 88 Teclas Pesadas', precio: 1450, descripcion: 'Acción Martillo Graduada', categoria: 'Teclas' },
  { id: 7, nombre: 'Set Platillos Batería 14/16/20', precio: 430, descripcion: 'Aleación B20 Bronce', categoria: 'Percusión' },
  { id: 8, nombre: 'Amplificador para Guitarra 50W', precio: 320, descripcion: 'Efectos Digitales DSP', categoria: 'Audio' },
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

export function Products() {
  const [products] = useState(INVENTARIO_COMPLETO);
  const [cart, setCart] = useState(getInitialCart);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sincronizar carrito
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

  // Filtrado de productos por categoría y búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        selectedCategory === 'Todas' || prod.categoria === selectedCategory;
      const matchesSearch =
        prod.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Añadir al carrito
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

  const categories = ['Todas', 'Cuerdas', 'Teclas', 'Percusión', 'Audio'];

  return (
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased w-full">
      {/* Header Full-Width */}
      <ProductsHeader totalItems={totalItems} />

      {/* Contenedor Principal Full-Width fluido */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-4 sm:pt-6 pb-8 sm:pb-10 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2e2c45] pb-6">
          <div>
            <span className="text-xs sm:text-sm text-[#4fa8ff] font-bold uppercase tracking-wider">Catálogo oficial</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mt-1">
              Instrumentos Musicales
            </h1>
            <p className="text-[#a0a0b0] text-sm sm:text-base mt-1.5 max-w-xl">
              Explora nuestra selección completa de instrumentos y accesorios profesionales con envío a todo el país.
            </p>
          </div>

          {/* Filtros y búsqueda integrados */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs sm:text-sm px-4 py-2 rounded-xl border transition-all cursor-pointer font-medium w-auto ${
                    selectedCategory === cat
                      ? 'bg-[#4fa8ff] text-[#100e1f] border-[#4fa8ff] font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#27253d] text-[#a0a0b0] border-[#2e2c45] hover:text-white hover:border-[#4fa8ff]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="sm:w-64">
              <input
                type="text"
                placeholder="Buscar instrumento..."
                aria-label="Buscar instrumento"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#27253d] border border-[#2e2c45] text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#4fa8ff] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Cuadrícula de productos con espaciado amplio */}
        <section id="contenedor-productos" className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 py-2">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-[#a0a0b0] bg-[#1c1a2e] border border-[#2e2c45] rounded-2xl">
              <span className="text-4xl mb-3 block">🔍</span>
              <p className="text-base font-semibold">No se encontraron instrumentos que coincidan con la búsqueda.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('Todas'); setSearchQuery(''); }}
                className="mt-4 text-xs sm:text-sm text-[#4fa8ff] hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </section>
      </main>

      {/* Footer Full-Width */}
      <ProductsFooter />

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

export default Products;
