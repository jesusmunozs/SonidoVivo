import React from 'react';

export function CartFooter() {
  return (
    <footer className="mt-auto w-full bg-[#100e1f] border-t border-[#2e2c45] py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="footer-left">
          <a
            href="../home/home.view.html"
            className="text-white font-bold text-lg no-underline hover:text-[#4fa8ff] transition-colors"
          >
            Sonido Vivo
          </a>
        </div>
        <div className="footer-center flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#a0a0b0]">
          <a
            href="../products/products.view.html"
            className="hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Categoría Cuerdas
          </a>
          <span className="text-[#2e2c45]">|</span>
          <a
            href="../products/products.view.html"
            className="hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Categoría Percusión
          </a>
          <span className="text-[#2e2c45]">|</span>
          <a
            href="../products/products.view.html"
            className="hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Categoría Teclas
          </a>
        </div>
        <div className="footer-right">
          <span className="text-xs text-[#a0a0b0]">
            © 2026 Sonido Vivo - Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}

export default CartFooter;
