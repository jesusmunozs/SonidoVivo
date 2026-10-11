import React from 'react';

export function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card bg-[#1c1a2e] border border-[#2e2c45] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#4fa8ff] transition-all hover:shadow-xl hover:shadow-cyan-950/20 group">
      {/* Imagen / Placeholder con espacio adecuado */}
      <div className="product-image w-full h-48 sm:h-52 bg-gradient-to-br from-[#27253d] to-[#1a182b] rounded-xl mb-6 flex flex-col items-center justify-center border border-[#2e2c45]/60 group-hover:border-[#4fa8ff]/30 transition-colors shadow-inner">
        <span className="text-4xl sm:text-5xl mb-2.5 transform group-hover:scale-105 transition-transform">🎵</span>
        <span className="text-xs text-[#a0a0b0] uppercase tracking-wider font-semibold">Instrumento</span>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-white font-bold text-base sm:text-lg mb-2.5 min-h-[3rem] line-clamp-2 leading-snug group-hover:text-[#4fa8ff] transition-colors">
          {product.nombre}
        </h3>

        <div className="product-info flex items-center justify-between text-[#a0a0b0] text-sm mt-auto mb-6 pt-4 border-t border-[#2e2c45]/60">
          <span className="attributes text-xs sm:text-sm text-[#a0a0b0] font-medium">
            {product.descripcion || 'Gama Profesional'}
          </span>
          <span className="price font-extrabold text-[#4fa8ff] text-lg sm:text-xl">
            ${product.precio?.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Boton con ancho contenido y centrado, no ocupa todo el ancho de la card */}
      <div className="flex justify-center w-full pt-1">
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="btn w-auto min-w-[170px] max-w-[220px] bg-white text-[#121026] hover:bg-[#4fa8ff] hover:text-[#100e1f] font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 transform hover:scale-105"
        >
          <span>🛒</span> Añadir al carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
