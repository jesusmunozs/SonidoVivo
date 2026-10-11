import React from 'react';

export function CartHeader({ totalItems = 0 }) {
  return (
    <header className="bg-[#100e1f] border-b border-[#2e2c45] py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 w-full">
      <div className="logo font-bold text-xl sm:text-2xl tracking-wide flex items-center">
        <a
          href="#/home"
          className="text-[#4fa8ff] hover:text-[#3db8ff] no-underline transition-colors flex items-center gap-2"
        >
          <span>🎵</span> Sonido Vivo
        </a>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium">
        <a
          href="#/home"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Home
        </a>
        <a
          href="#/products"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Productos
        </a>
        <a
          href="#/products"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Nosotros
        </a>
        <a
          href="#/products"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Blogs
        </a>
        <a
          href="#/products"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Contacto
        </a>
      </nav>

      <div className="user-actions flex items-center gap-3 sm:gap-5 text-sm sm:text-base font-medium">
        <a
          href="#/login"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors px-2 py-1 rounded-md"
        >
          Iniciar sesión
        </a>
        <a
          href="#/home"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors px-2 py-1 rounded-md"
        >
          Volver a la tienda
        </a>
        <a
          href="#/cart"
          className="cart-icon bg-[#27253d] hover:bg-[#3e3c56] text-white px-4 py-2 rounded-full border border-[#2e2c45] transition-colors no-underline flex items-center gap-2 font-bold shadow-md hover:border-[#4fa8ff]"
        >
          🛒 Cart ({totalItems})
        </a>
      </div>
    </header>
  );
}

export default CartHeader;
