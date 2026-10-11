export const STORAGE_INVENTARIO_KEY = 'inventarioSonidoVivo';

export const INVENTARIO_INICIAL = [
  { id: 1, nombre: 'Guitarra Eléctrica Stratocaster', precio: 850, descripcion: 'Cuerpo de Fresno', categoria: 'Cuerdas' },
  { id: 2, nombre: 'Teclado Sintetizador 61 Teclas', precio: 1200, descripcion: 'Polifonía 128 voces', categoria: 'Teclas' },
  { id: 3, nombre: 'Batería Acústica 5 Cuerpos', precio: 950, descripcion: 'Madera de Arce', categoria: 'Percusión' },
  { id: 4, nombre: 'Micrófono Condensador Estudio', precio: 150, descripcion: 'Patrón Cardioide', categoria: 'Audio' },
  { id: 5, nombre: 'Bajo Eléctrico 4 Cuerdas Jazz', precio: 780, descripcion: 'Pastillas Activas', categoria: 'Cuerdas' },
  { id: 6, nombre: 'Piano Digital 88 Teclas Pesadas', precio: 1450, descripcion: 'Acción Martillo Graduada', categoria: 'Teclas' },
  { id: 7, nombre: 'Set Platillos Batería 14/16/20', precio: 430, descripcion: 'Aleación B20 Bronce', categoria: 'Percusión' },
  { id: 8, nombre: 'Amplificador para Guitarra 50W', precio: 320, descripcion: 'Efectos Digitales DSP', categoria: 'Audio' },
];

export function getStoredProducts() {
  if (typeof window === 'undefined') return INVENTARIO_INICIAL;
  try {
    const raw = localStorage.getItem(STORAGE_INVENTARIO_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_INVENTARIO_KEY, JSON.stringify(INVENTARIO_INICIAL));
      return INVENTARIO_INICIAL;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INVENTARIO_INICIAL;
  } catch (err) {
    console.error('Error al obtener inventario desde localStorage:', err);
    return INVENTARIO_INICIAL;
  }
}

export function saveStoredProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_INVENTARIO_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('inventarioActualizado', { detail: products }));
  } catch (err) {
    console.error('Error al guardar inventario en localStorage:', err);
  }
}

export function addStoredProduct(productData) {
  const current = getStoredProducts();
  const nextId = current.length > 0 ? Math.max(...current.map((p) => p.id || 0)) + 1 : 1;
  const newProduct = {
    id: nextId,
    nombre: productData.nombre.trim(),
    precio: Number(productData.precio) || 0,
    descripcion: productData.descripcion?.trim() || 'Instrumento Musical',
    categoria: productData.categoria || 'Cuerdas',
  };
  const updated = [newProduct, ...current];
  saveStoredProducts(updated);
  return newProduct;
}

export function removeStoredProduct(productId) {
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== productId);
  saveStoredProducts(updated);
  return updated;
}
