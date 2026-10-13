import {
  INVENTARIO_INICIAL,
  STORAGE_INVENTARIO_KEY,
  getStoredProducts,
  saveStoredProducts,
  addStoredProduct,
  removeStoredProduct,
} from './inventoryData';

describe('Servicio de Inventario (inventoryData)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe tener un inventario inicial con productos válidos', () => {
    expect(INVENTARIO_INICIAL).toBeDefined();
    expect(INVENTARIO_INICIAL.length).toBeGreaterThan(0);
    const primerProducto = INVENTARIO_INICIAL[0];
    expect(primerProducto.id).toBe(1);
    expect(primerProducto.nombre).toBe('Guitarra Eléctrica Stratocaster');
    expect(primerProducto.precio).toBe(850);
    expect(primerProducto.categoria).toBe('Cuerdas');
  });

  it('debe inicializar el inventario en localStorage si está vacío', () => {
    const productos = getStoredProducts();
    expect(productos.length).toBe(INVENTARIO_INICIAL.length);
    const guardado = localStorage.getItem(STORAGE_INVENTARIO_KEY);
    expect(guardado).not.toBeNull();
    expect(JSON.parse(guardado).length).toBe(INVENTARIO_INICIAL.length);
  });

  it('debe recuperar productos previamente almacenados en localStorage', () => {
    const customList = [
      { id: 99, nombre: 'Ukelele Soprano', precio: 50, categoria: 'Cuerdas' },
    ];
    localStorage.setItem(STORAGE_INVENTARIO_KEY, JSON.stringify(customList));

    const productos = getStoredProducts();
    expect(productos.length).toBe(1);
    expect(productos[0].id).toBe(99);
    expect(productos[0].nombre).toBe('Ukelele Soprano');
  });

  it('debe manejar JSON corrupto en localStorage retornando el inventario inicial', () => {
    localStorage.setItem(STORAGE_INVENTARIO_KEY, 'corrupt-json{[[[');
    const productos = getStoredProducts();
    expect(productos.length).toBe(INVENTARIO_INICIAL.length);
  });

  it('debe guardar productos y despachar el evento inventarioActualizado', (done) => {
    const mockList = [{ id: 10, nombre: 'Pedal Overdrive', precio: 80 }];

    const listener = (event) => {
      expect(event.detail).toEqual(mockList);
      window.removeEventListener('inventarioActualizado', listener);
      done();
    };

    window.addEventListener('inventarioActualizado', listener);
    saveStoredProducts(mockList);

    const guardado = JSON.parse(localStorage.getItem(STORAGE_INVENTARIO_KEY));
    expect(guardado.length).toBe(1);
    expect(guardado[0].nombre).toBe('Pedal Overdrive');
  });

  it('debe agregar un nuevo producto con ID auto-incremental al inicio de la lista', () => {
    const nuevo = addStoredProduct({
      nombre: '  Bajo Fretless  ',
      precio: '900',
      descripcion: 'Bajo sin trastes',
      categoria: 'Cuerdas',
    });

    expect(nuevo.id).toBeGreaterThan(INVENTARIO_INICIAL.length);
    expect(nuevo.nombre).toBe('Bajo Fretless');
    expect(nuevo.precio).toBe(900);
    expect(nuevo.categoria).toBe('Cuerdas');

    const productosActuales = getStoredProducts();
    expect(productosActuales[0].id).toBe(nuevo.id);
    expect(productosActuales.length).toBe(INVENTARIO_INICIAL.length + 1);
  });

  it('debe eliminar un producto por ID correctamente', () => {
    const productosAntes = getStoredProducts();
    const idAEliminar = productosAntes[0].id;

    const productosRestantes = removeStoredProduct(idAEliminar);
    expect(productosRestantes.length).toBe(productosAntes.length - 1);
    expect(productosRestantes.find((p) => p.id === idAEliminar)).toBeUndefined();
  });
});
