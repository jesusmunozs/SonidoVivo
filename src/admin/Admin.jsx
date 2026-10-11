import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import AdminFooter from './AdminFooter';
import {
  getStoredProducts,
  addStoredProduct,
  removeStoredProduct,
} from '../inventoryData';

export function Admin() {
  const [products, setProducts] = useState(getStoredProducts);
  const [toastMessage, setToastMessage] = useState(null);

  // Escuchar actualizaciones de inventario
  useEffect(() => {
    const handleInventarioChange = () => {
      setProducts(getStoredProducts());
    };
    window.addEventListener('inventarioActualizado', handleInventarioChange);
    window.addEventListener('storage', handleInventarioChange);
    return () => {
      window.removeEventListener('inventarioActualizado', handleInventarioChange);
      window.removeEventListener('storage', handleInventarioChange);
    };
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddProduct = (newProductData) => {
    const added = addStoredProduct(newProductData);
    setProducts(getStoredProducts());
    showToast(`¡"${added.nombre}" fue añadido al catálogo con éxito!`);
  };

  const handleRemoveProduct = (product) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar "${product.nombre}" de la tienda?`);
    if (confirmed) {
      removeStoredProduct(product.id);
      setProducts(getStoredProducts());
      showToast(`El instrumento "${product.nombre}" fue eliminado del catálogo.`);
    }
  };

  return (
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased w-full">
      {/* Header Admin */}
      <AdminHeader />

      {/* Contenido Principal Full-Width */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-4 sm:pt-6 pb-8 sm:pb-10 flex flex-col gap-8 sm:gap-10">
        {/* Banner Superior de Bienvenida */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2e2c45] pb-5">
          <div>
            <span className="text-xs sm:text-sm text-[#4fa8ff] font-bold uppercase tracking-wider">
              Control de Inventario
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide mt-1">
              Administración de Productos
            </h1>
            <p className="text-[#a0a0b0] text-xs sm:text-sm mt-1">
              Agrega nuevos instrumentos o quita productos existentes. Los cambios se reflejarán instantáneamente en la tienda.
            </p>
          </div>
        </div>

        {/* Formulario para Agregar */}
        <ProductForm onAddProduct={handleAddProduct} />

        {/* Lista y Gestión de Productos Existentes */}
        <ProductList products={products} onRemoveProduct={handleRemoveProduct} />
      </main>

      {/* Footer Admin */}
      <AdminFooter />

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

export default Admin;
