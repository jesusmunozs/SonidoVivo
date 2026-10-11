import React from 'react';

export function CartFooter() {
  return (
    <footer className="mt-auto w-full bg-[#100e1f] border-t border-[#2e2c45] py-10 sm:py-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="footer-left">
          <a
            href="#/home"
            className="text-white font-extrabold text-xl sm:text-2xl no-underline hover:text-[#4fa8ff] transition-colors flex items-center justify-center md:justify-start gap-2"
          >
            <span>🎵</span> Sonido Vivo
          </a>
          <p className="text-xs text-[#a0a0b0] mt-1.5 max-w-xs">
            Tu tienda especializada en instrumentos musicales de alta fidelidad.
          </p>
        </div>

        <div className="footer-center flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[#a0a0b0] font-medium">
          <a
            href="#/products"
            className="hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Categoría Cuerdas
          </a>
          <span className="text-[#2e2c45]">|</span>
          <a
            href="#/products"
            className="hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Categoría Percusión
          </a>
          <span className="text-[#2e2c45]">|</span>
          <a
            href="#/products"
            className="hover:text-[#4fa8ff] no-underline transition-colors"
          >
            Categoría Teclas
          </a>
        </div>

        <div className="footer-right">
          <span className="text-xs text-[#a0a0b0]">
            © 2026 Sonido Vivo - Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default CartFooter;
