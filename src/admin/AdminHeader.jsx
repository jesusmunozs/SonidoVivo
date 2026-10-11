import React from 'react';

export function AdminHeader() {
  return (
    <header className="bg-[#100e1f] border-b border-[#2e2c45] py-3.5 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 w-full">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="logo font-bold text-xl sm:text-2xl tracking-wide flex items-center gap-3">
          <a
            href="#/home"
            className="text-[#4fa8ff] hover:text-[#3db8ff] no-underline transition-colors flex items-center gap-2"
          >
            <span>🎵</span> Sonido Vivo
          </a>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#27253d] text-[#4fa8ff] border border-[#2e2c45]">
            Panel de Administración
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium">
          <a
            href="#/home"
            className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
          >
            ← Volver a la Tienda
          </a>
          <a
            href="#/products"
            className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Ver Catálogo
          </a>
          <a
            href="#/cart"
            className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Carrito
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
