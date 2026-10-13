import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Cart from './Cart';

describe('Componente Cart (Unit Tests)', () => {
  let container;
  let root;
  const STORAGE_KEY = 'carritoSonidoVivo';

  beforeEach(() => {
    localStorage.clear();
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    localStorage.clear();
  });

  it('debe mostrar mensaje de carrito vacío si no hay productos', async () => {
    await act(async () => {
      root.render(<Cart />);
    });

    expect(container.textContent).toContain('Tu carrito de compras está vacío');
    expect(container.textContent).toContain('Buscar instrumentos');
  });

  it('debe listar los productos del carrito y calcular el subtotal correctamente', async () => {
    const mockCart = [
      { id: 1, nombre: 'Guitarra Eléctrica', precio: 500, cantidad: 2, descripcion: 'Color rojo' },
      { id: 2, nombre: 'Micrófono', precio: 100, cantidad: 1, descripcion: 'Estudio' },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCart));

    await act(async () => {
      root.render(<Cart />);
    });

    expect(container.textContent).toContain('Guitarra Eléctrica');
    expect(container.textContent).toContain('Micrófono');
    // Subtotal esperado: (500*2) + (100*1) = 1100
    expect(container.textContent).toContain('1.100');
  });

  it('debe aplicar un cupón de descuento válido como DESCUENTO10', async () => {
    const mockCart = [
      { id: 1, nombre: 'Piano Digital', precio: 1000, cantidad: 1 },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCart));

    await act(async () => {
      root.render(<Cart />);
    });

    const couponInput = container.querySelector('input[placeholder*="Código"]');
    const applyBtn = Array.from(container.querySelectorAll('button')).find(
      (b) => b.textContent.trim() === 'APLICAR'
    );

    expect(couponInput).not.toBeNull();
    expect(applyBtn).not.toBeNull();

    await act(async () => {
      // Simular cambio de input
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(couponInput, 'DESCUENTO10');
      couponInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await act(async () => {
      applyBtn.click();
    });

    expect(container.textContent).toContain('¡Cupón de 10% aplicado con éxito!');
    // 1000 * 0.9 = 900
    expect(container.textContent).toContain('$900');
  });

  it('debe rechazar un cupón inválido y mostrar mensaje de error', async () => {
    const mockCart = [
      { id: 1, nombre: 'Violín', precio: 400, cantidad: 1 },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCart));

    await act(async () => {
      root.render(<Cart />);
    });

    const couponInput = container.querySelector('input[placeholder*="Código"]');
    const applyBtn = Array.from(container.querySelectorAll('button')).find(
      (b) => b.textContent.trim() === 'APLICAR'
    );

    await act(async () => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(couponInput, 'CUPON_FALSO');
      couponInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await act(async () => {
      applyBtn.click();
    });

    expect(container.textContent).toContain('Cupón no válido.');
  });
});
