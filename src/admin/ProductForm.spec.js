import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import ProductForm from './ProductForm';

describe('Componente ProductForm - Validación de Inventario y DOM (Unit Tests)', () => {
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

  it('debe renderizar los inputs obligatorios de instrumento, precio, categoría y descripción', async () => {
    await act(async () => {
      root.render(<ProductForm onAddProduct={() => {}} />);
    });

    const inputs = container.querySelectorAll('input');
    const select = container.querySelector('select');
    const submitBtn = container.querySelector('button[type="submit"]');

    expect(inputs.length).toBeGreaterThanOrEqual(3);
    expect(select).not.toBeNull();
    expect(submitBtn).not.toBeNull();
  });

  it('debe impedir el envío y mostrar errores si faltan campos obligatorios', async () => {
    const spyAddProduct = jasmine.createSpy('onAddProduct');

    await act(async () => {
      root.render(<ProductForm onAddProduct={spyAddProduct} />);
    });

    const form = container.querySelector('form');

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain('El nombre del instrumento es obligatorio.');
    expect(container.textContent).toContain('Ingresa un precio numérico válido');
    expect(container.textContent).toContain('La descripción o detalle es obligatoria.');
    expect(spyAddProduct).not.toHaveBeenCalled();
  });

  it('debe validar que el precio sea un número positivo', async () => {
    const spyAddProduct = jasmine.createSpy('onAddProduct');

    await act(async () => {
      root.render(<ProductForm onAddProduct={spyAddProduct} />);
    });

    const nameInput = container.querySelector('input[placeholder*="Ej: Bajo"]');
    const priceInput = container.querySelector('input[type="number"]');
    const descInput = container.querySelector('input[placeholder*="Ej: Madera"]');
    const form = container.querySelector('form');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

    await act(async () => {
      setter.call(nameInput, 'Guitarra Eléctrica');
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      setter.call(priceInput, '-50');
      priceInput.dispatchEvent(new Event('input', { bubbles: true }));
      setter.call(descInput, 'Cuerpo sólido');
      descInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain('Ingresa un precio numérico válido mayor a 0.');
    expect(spyAddProduct).not.toHaveBeenCalled();
  });

  it('debe enviar el producto formateado a través del mock onAddProduct al completar el formulario', async () => {
    const spyAddProduct = jasmine.createSpy('onAddProduct');

    await act(async () => {
      root.render(<ProductForm onAddProduct={spyAddProduct} />);
    });

    const nameInput = container.querySelector('input[placeholder*="Ej: Bajo"]');
    const priceInput = container.querySelector('input[type="number"]');
    const descInput = container.querySelector('input[placeholder*="Ej: Madera"]');
    const select = container.querySelector('select');
    const form = container.querySelector('form');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

    await act(async () => {
      setter.call(nameInput, 'Sintetizador Analógico');
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      setter.call(priceInput, '1200');
      priceInput.dispatchEvent(new Event('input', { bubbles: true }));
      setter.call(descInput, '37 teclas polifónico');
      descInput.dispatchEvent(new Event('input', { bubbles: true }));
      select.value = 'Teclas';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(spyAddProduct).toHaveBeenCalledWith({
      nombre: 'Sintetizador Analógico',
      precio: 1200,
      categoria: 'Teclas',
      descripcion: '37 teclas polifónico',
    });
  });
});
