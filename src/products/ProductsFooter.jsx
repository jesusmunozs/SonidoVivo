import React, { useState } from 'react';

export function ProductsFooter() {
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
          <a href="#" className="hover:text-[#4fa8ff] no-underline transition-colors">
            Categoría Cuerdas
          </a>
          <span className="text-[#2e2c45]">|</span>
          <a href="#" className="hover:text-[#4fa8ff] no-underline transition-colors">
            Categoría Percusión
          </a>
          <span className="text-[#2e2c45]">|</span>
          <a href="#" className="hover:text-[#4fa8ff] no-underline transition-colors">
            Categoría Teclas
          </a>
        </div>

        <div className="footer-right flex flex-col sm:flex-row items-center gap-2">
          <p className="text-xs text-[#a0a0b0] sm:mr-2">Stay In Touch:</p>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder={subscribed ? '¡Suscrito!' : 'Enter Email'}
              aria-label="Correo electrónico para boletín"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#27253d] border border-[#2e2c45] text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#4fa8ff] w-full sm:w-44 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default ProductsFooter;
