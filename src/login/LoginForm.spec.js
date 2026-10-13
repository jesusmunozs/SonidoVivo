import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import LoginForm from './LoginForm';

describe('Componente LoginForm - Validaciones y DOM (Unit Tests)', () => {
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

  it('debe renderizar los campos de correo/usuario, contraseña y botón de ingreso en el DOM', async () => {
    await act(async () => {
      root.render(<LoginForm onSuccess={() => {}} onError={() => {}} />);
    });

    const emailInput = container.querySelector('input[type="text"]');
    const passwordInput = container.querySelector('input[type="password"]');
    const submitBtn = container.querySelector('button[type="submit"]');

    expect(emailInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(submitBtn).not.toBeNull();
    expect(submitBtn.textContent.trim()).toBe('Ingresar');
  });

  it('debe mostrar errores de validación en el DOM cuando los campos están vacíos', async () => {
    const spyOnError = jasmine.createSpy('onError');

    await act(async () => {
      root.render(<LoginForm onSuccess={() => {}} onError={spyOnError} />);
    });

    const form = container.querySelector('form');

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain('Por favor, ingresa tu correo electrónico o usuario.');
    expect(container.textContent).toContain('Por favor, ingresa tu contraseña.');
    expect(spyOnError).toHaveBeenCalledWith('Por favor corrige los campos señalados antes de continuar.');
  });

  it('debe validar formato de correo electrónico incorrecto', async () => {
    await act(async () => {
      root.render(<LoginForm onSuccess={() => {}} onError={() => {}} />);
    });

    const emailInput = container.querySelector('input[type="text"]');
    const form = container.querySelector('form');

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(emailInput, 'correo-invalido@sin-dominio');
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain('El correo electrónico no tiene un formato válido');
  });

  it('debe invocar el mock onSuccess cuando las credenciales son válidas', async () => {
    const spyOnSuccess = jasmine.createSpy('onSuccess');
    const spyOnError = jasmine.createSpy('onError');

    await act(async () => {
      root.render(<LoginForm onSuccess={spyOnSuccess} onError={spyOnError} />);
    });

    const emailInput = container.querySelector('input[type="text"]');
    const passwordInput = container.querySelector('input[type="password"]');
    const form = container.querySelector('form');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

    await act(async () => {
      setter.call(emailInput, 'usuario@sonidovivo.cl');
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      setter.call(passwordInput, 'secreto123');
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });

    expect(spyOnSuccess).toHaveBeenCalled();
    expect(spyOnSuccess.calls.mostRecent().args[0]).toContain('¡Bienvenido de nuevo, usuario!');
    expect(spyOnError).not.toHaveBeenCalled();
  });
});
