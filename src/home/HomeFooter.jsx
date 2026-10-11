import React, { useState } from 'react';

export function HomeFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

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
          <p className="text-xs text-[#a0a0b0] mt-1.5 max-w-sm">
            Tu tienda especializada en instrumentos musicales de alta fidelidad.
          </p>
        </div>

        <div className="footer-center flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-[#a0a0b0] font-medium">
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

        <div className="footer-right flex flex-col sm:flex-row items-center gap-3">
          <p className="text-xs sm:text-sm text-[#a0a0b0] whitespace-nowrap">Boletín informativo:</p>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder={subscribed ? '¡Suscrito con éxito!' : 'Ingresa tu correo...'}
              aria-label="Correo electrónico para boletín"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#27253d] border border-[#2e2c45] text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#4fa8ff] w-full sm:w-60 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-cyan-500/20"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>

      <div className="w-full mt-8 pt-6 border-t border-[#2e2c45]/40 text-center text-xs text-[#a0a0b0]">
        © 2026 Sonido Vivo - Todos los derechos reservados. Desarrollado con React 19 y Tailwind CSS.
      </div>
    </footer>
  );
}

export default HomeFooter;
