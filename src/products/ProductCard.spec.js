import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ProductCard from './ProductCard';

describe('Componente ProductCard (Unit Test)', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('debe renderizar el nombre, precio y descripción del producto', async () => {
    const mockProduct = {
      id: 101,
      nombre: 'Bajo Jazz Master',
      precio: 850,
      descripcion: 'Bajo eléctrico de 4 cuerdas',
    };

    await act(async () => {
      root.render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    });

    expect(container.textContent).toContain('Bajo Jazz Master');
    expect(container.textContent).toContain('850');
    expect(container.textContent).toContain('Bajo eléctrico de 4 cuerdas');
  });

  it('debe invocar onAddToCart con el producto al hacer clic en el botón', async () => {
    const mockProduct = {
      id: 102,
      nombre: 'Batería Electrónica',
      precio: 600,
      descripcion: 'Set de pads de malla',
    };
    const spyAddToCart = jasmine.createSpy('onAddToCart');

    await act(async () => {
      root.render(<ProductCard product={mockProduct} onAddToCart={spyAddToCart} />);
    });

    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.textContent).toContain('Añadir al carrito');

    await act(async () => {
      button.click();
    });

    expect(spyAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(spyAddToCart.calls.count()).toBe(1);
  });
});
