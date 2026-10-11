import React from 'react';

export function HomeHero() {
  return (
    <section className="hero bg-[#1c1a2e] border border-[#2e2c45] rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
      {/* Luz decorativa sutil de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4fa8ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="hero-content space-y-6 lg:w-1/2 text-center lg:text-left z-10">
        <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#27253d] border border-[#2e2c45] text-xs sm:text-sm text-[#4fa8ff] font-semibold tracking-wide uppercase">
          Instrumentos & Audio Profesional
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          TIENDA <span className="text-[#4fa8ff]">ONLINE</span>
        </h1>

        <p className="text-[#a0a0b0] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
          Encuentra las mejores guitarras, bajos, baterías y teclados. Todo lo que necesitas para que tu música cobre vida con la máxima calidad.
        </p>

        <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4">
          <a
            href="#/products"
            className="inline-block bg-white text-[#121026] hover:bg-gray-100 font-extrabold px-8 py-3.5 rounded-xl transition-all no-underline shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transform text-base"
          >
            Ver productos
          </a>
          <a
            href="#/cart"
            className="inline-block bg-[#27253d] text-white hover:border-[#4fa8ff] border border-[#2e2c45] font-semibold px-6 py-3.5 rounded-xl transition-colors no-underline text-base"
          >
            Ver mi carrito
          </a>
        </div>
      </div>

      <div className="hero-image lg:w-1/2 w-full flex justify-center z-10">
        <div className="placeholder-img w-full max-w-xl h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[#27253d] to-[#171528] rounded-2xl flex flex-col items-center justify-center text-[#a0a0b0] font-medium border border-[#2e2c45] shadow-inner p-6 text-center group hover:border-[#4fa8ff]/50 transition-colors">
          <span className="text-5xl sm:text-6xl mb-3 transform group-hover:scale-110 transition-transform">🎸🎹🥁</span>
          <span className="text-lg sm:text-xl font-bold text-white">Sonido Vivo Experience</span>
          <span className="text-xs sm:text-sm text-[#a0a0b0] mt-1">Cuerdas • Teclas • Percusión • Audio</span>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
