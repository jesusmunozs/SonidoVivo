import React, { useState, useMemo } from 'react';

const CATEGORIA_BADGES = {
  Cuerdas: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Teclas: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Percusión: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Audio: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const CATEGORIA_EMOJIS = {
  Cuerdas: '🎸',
  Teclas: '🎹',
  Percusión: '🥁',
  Audio: '🎙️',
};

export function ProductList({ products, onRemoveProduct }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = categoryFilter === 'Todas' || p.categoria === categoryFilter;
      const matchSearch =
        p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, search, categoryFilter]);

  const totalInventarioValor = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.precio || 0), 0);
  }, [products]);

  return (
    <section className="bg-[#1c1a2e] border border-[#2e2c45] rounded-3xl p-6 sm:p-8 shadow-2xl w-full flex flex-col gap-6">
      {/* Encabezado y Estadísticas Rápidas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2e2c45] pb-5">
        <div>
          <span className="text-xs text-[#4fa8ff] font-bold uppercase tracking-wider">Inventario Activo</span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide mt-1">
            Listado de Instrumentos ({products.length})
          </h2>
        </div>

        {/* Badges de resumen */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <div className="bg-[#27253d] border border-[#2e2c45] px-4 py-1.5 rounded-xl text-gray-300">
            Total ítems: <strong className="text-white">{products.length}</strong>
          </div>
          <div className="bg-[#27253d] border border-[#2e2c45] px-4 py-1.5 rounded-xl text-gray-300">
            Valor Catálogo: <strong className="text-[#4fa8ff]">${totalInventarioValor.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="sm:w-72">
          <input
            type="text"
            placeholder="Buscar por nombre o detalle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#27253d] border border-[#2e2c45] text-white text-xs sm:text-sm rounded-xl px-4 py-2 outline-none focus:border-[#4fa8ff] transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['Todas', 'Cuerdas', 'Teclas', 'Percusión', 'Audio'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
                categoryFilter === cat
                  ? 'bg-[#4fa8ff] text-[#100e1f] border-[#4fa8ff] font-bold'
                  : 'bg-[#27253d] text-[#a0a0b0] border-[#2e2c45] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla / Lista Responsiva */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-[#a0a0b0] bg-[#27253d]/50 rounded-2xl border border-[#2e2c45] my-2">
          <span className="text-4xl mb-2 block">📦</span>
          <p className="font-semibold">No se encontraron productos en este criterio.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2e2c45]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#27253d] text-xs uppercase tracking-wider text-gray-400 border-b border-[#2e2c45]">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Instrumento</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Detalles</th>
                <th className="py-3 px-4">Precio</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2c45]/60 bg-[#1c1a2e]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#27253d]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-400">
                    #{prod.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2.5">
                    <span className="text-xl">
                      {CATEGORIA_EMOJIS[prod.categoria] || '🎵'}
                    </span>
                    <span>{prod.nombre}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        CATEGORIA_BADGES[prod.categoria] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                      }`}
                    >
                      {prod.categoria || 'General'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#a0a0b0] max-w-xs truncate">
                    {prod.descripcion || 'Sin descripción'}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#4fa8ff]">
                    ${prod.precio?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onRemoveProduct(prod)}
                      className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 text-xs font-semibold py-1.5 px-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                      title="Eliminar producto del inventario"
                    >
                      <span>🗑️</span> Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ProductList;
