import React, { useState } from 'react';

const CATEGORIAS = ['Cuerdas', 'Teclas', 'Percusión', 'Audio'];

export function ProductForm({ onAddProduct }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Cuerdas');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!nombre.trim()) {
      errs.nombre = 'El nombre del instrumento es obligatorio.';
    } else if (nombre.trim().length < 3) {
      errs.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    const numPrecio = Number(precio);
    if (!precio || isNaN(numPrecio) || numPrecio <= 0) {
      errs.precio = 'Ingresa un precio numérico válido mayor a 0.';
    }

    if (!descripcion.trim()) {
      errs.descripcion = 'La descripción o detalle es obligatoria.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddProduct({
        nombre: nombre.trim(),
        precio: Number(precio),
        categoria,
        descripcion: descripcion.trim(),
      });
      setNombre('');
      setPrecio('');
      setCategoria('Cuerdas');
      setDescripcion('');
      setErrors({});
    }
  };

  return (
    <section className="bg-[#1c1a2e] border border-[#2e2c45] rounded-3xl p-6 sm:p-8 shadow-2xl w-full">
      <div className="border-b border-[#2e2c45] pb-4 mb-6">
        <span className="text-xs text-[#4fa8ff] font-bold uppercase tracking-wider">Gestión de Catálogo</span>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide mt-1">
          Agregar Nuevo Instrumento
        </h2>
        <p className="text-xs sm:text-sm text-[#a0a0b0] mt-1">
          Completa el formulario para incorporar un nuevo producto a la tienda en tiempo real.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-200">
              Nombre del Instrumento <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Bajo Fender Jazz Bass"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: null }));
              }}
              className={`bg-[#27253d] border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors ${
                errors.nombre ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
              }`}
            />
            {errors.nombre && <span className="text-xs text-red-400">{errors.nombre}</span>}
          </div>

          {/* Precio */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-200">
              Precio en USD ($) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="Ej: 850"
              value={precio}
              onChange={(e) => {
                setPrecio(e.target.value);
                if (errors.precio) setErrors((prev) => ({ ...prev, precio: null }));
              }}
              className={`bg-[#27253d] border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors ${
                errors.precio ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
              }`}
            />
            {errors.precio && <span className="text-xs text-red-400">{errors.precio}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Categoría */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-200">
              Categoría <span className="text-red-400">*</span>
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="bg-[#27253d] border border-[#2e2c45] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors cursor-pointer"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1c1a2e]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-gray-200">
              Descripción o Especificación <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Madera de Caoba, Pastillas Activas"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                if (errors.descripcion) setErrors((prev) => ({ ...prev, descripcion: null }));
              }}
              className={`bg-[#27253d] border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors ${
                errors.descripcion ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
              }`}
            />
            {errors.descripcion && <span className="text-xs text-red-400">{errors.descripcion}</span>}
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-auto min-w-[170px] bg-[#00a843] hover:bg-[#00913a] text-white font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <span>➕</span> Agregar Producto
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
