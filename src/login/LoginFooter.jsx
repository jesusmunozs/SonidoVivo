import React from 'react';

export function LoginFooter({ onNavigate }) {
  return (
    <footer className="mt-auto w-full bg-[#100e1f] border-t border-[#2e2c45] py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="text-white font-bold text-lg hover:text-[#4fa8ff] transition-colors bg-transparent border-none p-0 cursor-pointer"
          >
            Sonido Vivo
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#a0a0b0]">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('products')}
            className="hover:text-[#4fa8ff] transition-colors bg-transparent border-none p-0 cursor-pointer text-[#a0a0b0]"
          >
            Categoría Cuerdas
          </button>
          <span className="text-[#2e2c45]">|</span>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('products')}
            className="hover:text-[#4fa8ff] transition-colors bg-transparent border-none p-0 cursor-pointer text-[#a0a0b0]"
          >
            Categoría Percusión
          </button>
          <span className="text-[#2e2c45]">|</span>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('products')}
            className="hover:text-[#4fa8ff] transition-colors bg-transparent border-none p-0 cursor-pointer text-[#a0a0b0]"
          >
            Categoría Teclas
          </button>
        </div>
        <div>
          <span className="text-xs text-[#a0a0b0]">
            © 2026 Sonido Vivo - Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}

export default LoginFooter;
