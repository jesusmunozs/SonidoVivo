import React from 'react';

export function LoginHeader({ tab, onTabChange, onNavigate, totalItems = 0 }) {
  return (
    <header className="bg-[#100e1f] border-b border-[#2e2c45] py-4 px-4 sm:px-8 lg:px-12 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 w-full">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="logo font-bold text-xl sm:text-2xl tracking-wide flex items-center">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="text-[#4fa8ff] hover:text-[#3db8ff] transition-colors font-bold cursor-pointer bg-transparent border-none p-0 text-xl sm:text-2xl flex items-center gap-2"
          >
            <span>🎵</span> Sonido Vivo
          </button>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="text-[#a0a0b0] hover:text-[#4fa8ff] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('products')}
            className="text-[#a0a0b0] hover:text-[#4fa8ff] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Productos
          </button>
          <a href="#/products" className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors">
            Nosotros
          </a>
          <a href="#/products" className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors">
            Blogs
          </a>
          <a href="#/products" className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors">
            Contacto
          </a>
        </nav>

        <div className="user-actions flex items-center gap-3 sm:gap-5 text-sm sm:text-base font-medium">
          <button
            type="button"
            onClick={() => onTabChange && onTabChange('login')}
            className={`transition-colors cursor-pointer bg-transparent border-none p-0 ${
              tab === 'login' ? 'text-[#4fa8ff] font-semibold' : 'text-[#a0a0b0] hover:text-[#4fa8ff]'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => onTabChange && onTabChange('register')}
            className={`transition-colors cursor-pointer bg-transparent border-none p-0 ${
              tab === 'register' ? 'text-[#4fa8ff] font-semibold' : 'text-[#a0a0b0] hover:text-[#4fa8ff]'
            }`}
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('cart')}
            className="cart-icon bg-[#27253d] hover:bg-[#3e3c56] text-white px-4 py-2 rounded-full border border-[#2e2c45] transition-colors cursor-pointer flex items-center gap-2 font-bold shadow-md hover:border-[#4fa8ff] w-auto"
          >
            🛒 Cart ({totalItems})
          </button>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;
