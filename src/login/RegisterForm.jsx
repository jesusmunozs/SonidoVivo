import React, { useState } from 'react';

function esEmailValido(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function RegisterForm({ onSuccess, onError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const valName = name.trim();
    const valEmail = email.trim();

    if (!valName) {
      errs.name = 'Por favor, ingresa tu nombre completo.';
    } else if (valName.length < 3) {
      errs.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!valEmail) {
      errs.email = 'El correo electrónico es obligatorio.';
    } else if (!esEmailValido(valEmail)) {
      errs.email = 'Ingresa un correo electrónico válido (ej: usuario@ejemplo.com).';
    }

    if (!password) {
      errs.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
      errs.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Por favor confirma tu contraseña.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Las contraseñas no coinciden. Verifícalas nuevamente.';
    }

    if (!terms) {
      errs.terms = 'Debes aceptar los términos y condiciones para continuar.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onSuccess) {
        onSuccess(`¡Registro exitoso! Cuenta creada para ${name.trim()}. Ya puedes iniciar sesión.`);
      }
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTerms(false);
      setErrors({});
    } else if (onError) {
      onError('Por favor completa todos los campos requeridos correctamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="form-header mb-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Crea tu cuenta</h2>
        <p className="text-xs sm:text-sm text-[#a0a0b0] mt-1">
          Únete a Sonido Vivo y disfruta de las mejores ofertas musicales.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-medium text-gray-300">Nombre Completo</label>
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
          }}
          className={`w-full bg-[#27253d] border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors ${
            errors.name ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
          }`}
        />
        {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-medium text-gray-300">Correo Electrónico</label>
        <input
          type="email"
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
          placeholder="Mínimo 6 caracteres"
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

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-medium text-gray-300">Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: null }));
          }}
          className={`w-full bg-[#27253d] border rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors ${
            errors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-[#2e2c45] focus:border-[#4fa8ff]'
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-400">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 py-1">
        <label className="flex items-start gap-2 text-xs sm:text-sm text-[#a0a0b0] cursor-pointer">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
              if (errors.terms) setErrors((prev) => ({ ...prev, terms: null }));
            }}
            className="accent-[#4fa8ff] cursor-pointer mt-0.5 rounded"
          />
          <span>Acepto los términos y condiciones de Sonido Vivo</span>
        </label>
        {errors.terms && <span className="text-xs text-red-400">{errors.terms}</span>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm sm:text-base mt-2 shadow-md"
      >
        Crear Cuenta
      </button>
    </form>
  );
}

export default RegisterForm;
