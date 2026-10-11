import React, { useState } from 'react';

function esEmailValido(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function LoginForm({ onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const val = email.trim();

    if (!val) {
      errs.email = 'Por favor, ingresa tu correo electrónico o usuario.';
    } else if (val.includes('@') && !esEmailValido(val)) {
      errs.email = 'El correo electrónico no tiene un formato válido (ej: usuario@ejemplo.com).';
    } else if (!val.includes('@') && val.length < 3) {
      errs.email = 'El nombre de usuario debe tener al menos 3 caracteres.';
    }

    if (!password) {
      errs.password = 'Por favor, ingresa tu contraseña.';
    } else if (password.length < 6) {
      errs.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const username = email.split('@')[0];
      if (onSuccess) {
        onSuccess(`¡Bienvenido de nuevo, ${username}! Has iniciado sesión correctamente.`);
      }
      setEmail('');
      setPassword('');
      setErrors({});
    } else if (onError) {
      onError('Por favor corrige los campos señalados antes de continuar.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="form-header mb-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Bienvenido de vuelta</h2>
        <p className="text-xs sm:text-sm text-[#a0a0b0] mt-1">
          Ingresa tus credenciales para acceder a tu cuenta.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-medium text-gray-300">
          Correo Electrónico o Usuario
        </label>
        <input
          type="text"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
          }}
          className={`w-full bg-[#27253d] border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors ${
            errors.email ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
          }`}
        />
        {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-medium text-gray-300">Contraseña</label>
        <input
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
          }}
          className={`w-full bg-[#27253d] border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors ${
            errors.password ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
          }`}
        />
        {errors.password && <span className="text-xs text-red-400">{errors.password}</span>}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm py-1">
        <label className="flex items-center gap-2 text-[#a0a0b0] cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-[#4fa8ff] cursor-pointer rounded"
          />
          Recordarme
        </label>
        <button
          type="button"
          onClick={() =>
            alert('Funcionalidad de recuperación: Se enviará un enlace de restablecimiento a tu correo.')
          }
          className="text-[#4fa8ff] hover:text-[#3db8ff] transition-colors bg-transparent border-none p-0 cursor-pointer text-xs sm:text-sm"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm sm:text-base mt-2 shadow-md"
      >
        Ingresar
      </button>
    </form>
  );
}

export default LoginForm;
