import React from 'react';

export function HomeHero() {
  return (
    <section className="hero bg-[#1c1a2e] border border-[#2e2c45] rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
      <div className="hero-content space-y-4 lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          TIENDA ONLINE
        </h1>
        <p className="text-[#a0a0b0] text-sm sm:text-base leading-relaxed">
          Encuentra las mejores guitarras, bajos, baterías y teclados. Todo lo que necesitas para que tu música cobre vida está aquí.
        </p>
        <div className="pt-2">
          <a
            href="../products/products.view.html"
            className="inline-block bg-white text-[#121026] hover:bg-gray-200 font-bold px-6 py-3 rounded-lg transition-colors no-underline shadow-md hover:shadow-lg"
          >
            Ver productos
          </a>
        </div>
      </div>
      <div className="hero-image lg:w-1/2 w-full flex justify-center">
        <div className="placeholder-img w-full max-w-md h-48 sm:h-64 bg-[#3e3c56] rounded-xl flex items-center justify-center text-[#a0a0b0] font-medium border border-[#2e2c45]">
          Imagen de Instrumentos
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
