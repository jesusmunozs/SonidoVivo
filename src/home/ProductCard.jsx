import React from 'react';

export function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card bg-[#1c1a2e] border border-[#2e2c45] rounded-xl p-5 flex flex-col justify-between hover:border-[#4fa8ff] transition-all hover:shadow-lg hover:shadow-cyan-950/20">
      <div className="product-image w-full h-44 bg-[#d9d9d9] rounded-lg mb-4 flex items-center justify-center">
        {/* Placeholder para la imagen del producto */}
      </div>

      <h3 className="text-white font-semibold text-base mb-2 min-h-[2.5rem] line-clamp-2">
        {product.nombre}
      </h3>

      <button
        type="button"
        onClick={() => onAddToCart(product)}
        className="btn w-full bg-white text-[#121026] hover:bg-gray-200 font-semibold py-2.5 px-4 rounded-lg transition-colors cursor-pointer mb-3"
      >
        Añadir al carrito
      </button>

      <div className="product-info flex items-center justify-between text-[#a0a0b0] text-sm mt-auto">
        <span className="attributes text-xs sm:text-sm text-[#a0a0b0]">
          {product.descripcion || ''}
        </span>
        <span className="price font-bold text-white text-base">
          ${product.precio?.toLocaleString()}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
