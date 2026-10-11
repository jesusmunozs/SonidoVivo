import React from 'react';

export function LoginFooter({ onNavigate }) {
  return (
    <footer className="mt-auto w-full bg-[#100e1f] border-t border-[#2e2c45] py-10 sm:py-12 px-4 sm:px-8 lg:px-12">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="text-white font-extrabold text-xl sm:text-2xl hover:text-[#4fa8ff] transition-colors bg-transparent border-none p-0 cursor-pointer flex items-center justify-center md:justify-start gap-2"
          >
            <span>🎵</span> Sonido Vivo
          </button>
          <p className="text-xs text-[#a0a0b0] mt-1.5 max-w-sm">
            Tu tienda especializada en instrumentos musicales de alta fidelidad.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-[#a0a0b0] font-medium">
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
            © 2026 Sonido Vivo - Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default LoginFooter;
