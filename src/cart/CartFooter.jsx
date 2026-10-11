import React from 'react';

export function CartFooter() {
  return (
    <footer className="mt-auto w-full bg-[#100e1f] border-t border-[#2e2c45] py-8 px-4 sm:px-8 lg:px-12 text-center text-xs text-[#a0a0b0]">
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="flex items-center gap-2">
          <span>🎵</span> <strong className="text-white">Sonido Vivo</strong> - Tienda Oficial
        </p>
        <p>© 2026 Todos los derechos reservados. Compras 100% seguras con cifrado SSL.</p>
      </div>
    </footer>
  );
}

export default CartFooter;
