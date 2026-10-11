import React from 'react';

export function ProductsHeader({ totalItems = 0 }) {
  return (
    <header className="bg-[#100e1f] border-b border-[#2e2c45] py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40">
      <div className="logo font-bold text-xl tracking-wide">
        <a
          href="../home/home.view.html"
          className="text-[#4fa8ff] hover:text-[#3db8ff] no-underline transition-colors"
        >
          Sonido Vivo
        </a>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium">
        <a
          href="../home/home.view.html"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Home
        </a>
        <a href="products.view.html" className="text-[#4fa8ff] no-underline font-semibold">
          Productos
        </a>
        <a
          href="#"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Nosotros
        </a>
        <a
          href="#"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Blogs
        </a>
        <a
          href="#"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Contacto
        </a>
      </nav>

      <div className="user-actions flex items-center gap-4 text-sm font-medium">
        <a
          href="../login/login.view.html"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Iniciar sesión
        </a>
        <a
          href="../login/login.view.html?mode=register"
          className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors"
        >
          Registrar
        </a>
        <a
          href="../cart/cart.view.html"
          className="cart-icon bg-[#27253d] hover:bg-[#3e3c56] text-white px-3.5 py-1.5 rounded-full border border-[#2e2c45] transition-colors no-underline flex items-center gap-1.5"
        >
          🛒 Cart ({totalItems})
        </a>
      </div>
    </header>
  );
}

export default ProductsHeader;
