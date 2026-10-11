import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'carritoSonidoVivo';

export function Login({ initialMode = 'login', onNavigate }) {
  const [tab, setTab] = useState(initialMode);
  const [totalItems, setTotalItems] = useState(0);

  // Estados Form Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  // Estados Form Register
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerTerms, setRegisterTerms] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});

  // Feedback general
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const updateCount = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const cart = raw ? JSON.parse(raw) : [];
        setTotalItems(cart.reduce((sum, item) => sum + (item.cantidad || 0), 0));
      } catch (err) {
        console.error(err);
      }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('carritoActualizado', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('carritoActualizado', updateCount);
    };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginEmail.trim()) {
      errors.email = 'El correo o usuario es requerido.';
    }
    if (!loginPassword.trim()) {
      errors.password = 'La contraseña es requerida.';
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoginErrors({});
    setFeedback({
      type: 'success',
      text: `¡Bienvenido de vuelta! Sesión iniciada con éxito.`,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!registerName.trim()) {
      errors.name = 'El nombre completo es requerido.';
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      errors.email = 'Ingresa un correo electrónico válido.';
    }
    if (registerPassword.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    if (!registerTerms) {
      errors.terms = 'Debes aceptar los términos y condiciones.';
    }

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setRegisterErrors({});
    setFeedback({
      type: 'success',
      text: '¡Cuenta creada con éxito! Ahora puedes iniciar sesión.',
    });
    setTab('login');
  };

  return (
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased">
      {/* Header */}
      <header className="bg-[#100e1f] border-b border-[#2e2c45] py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40">
        <div className="logo font-bold text-xl tracking-wide">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="text-[#4fa8ff] hover:text-[#3db8ff] transition-colors font-bold cursor-pointer bg-transparent border-none p-0 text-xl"
          >
            Sonido Vivo
          </button>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className="text-[#a0a0b0] hover:text-[#4fa8ff] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('products')}
            className="text-[#a0a0b0] hover:text-[#4fa8ff] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Productos
          </button>
          <a href="#" className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors">
            Nosotros
          </a>
          <a href="#" className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors">
            Blogs
          </a>
          <a href="#" className="text-[#a0a0b0] hover:text-[#4fa8ff] no-underline transition-colors">
            Contacto
          </a>
        </nav>

        <div className="user-actions flex items-center gap-4 text-sm font-medium">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`transition-colors cursor-pointer bg-transparent border-none p-0 ${
              tab === 'login' ? 'text-[#4fa8ff] font-semibold' : 'text-[#a0a0b0] hover:text-[#4fa8ff]'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`transition-colors cursor-pointer bg-transparent border-none p-0 ${
              tab === 'register' ? 'text-[#4fa8ff] font-semibold' : 'text-[#a0a0b0] hover:text-[#4fa8ff]'
            }`}
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('cart')}
            className="cart-icon bg-[#27253d] hover:bg-[#3e3c56] text-white px-3.5 py-1.5 rounded-full border border-[#2e2c45] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            🛒 Cart ({totalItems})
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="auth-wrapper flex-1 max-w-7xl w-full mx-auto flex items-center justify-center p-4 sm:p-6 md:p-12">
        <div className="auth-card w-full max-w-md bg-[#1c1a2e] border border-[#2e2c45] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Pestañas */}
          <div className="auth-tabs flex border-b border-[#2e2c45] mb-6">
            <button
              type="button"
              className={`flex-1 pb-3 text-center font-bold border-b-2 transition-all cursor-pointer text-sm sm:text-base ${
                tab === 'login'
                  ? 'text-white border-[#4fa8ff]'
                  : 'text-[#a0a0b0] border-transparent hover:text-white'
              }`}
              onClick={() => {
                setTab('login');
                setFeedback(null);
              }}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className={`flex-1 pb-3 text-center font-bold border-b-2 transition-all cursor-pointer text-sm sm:text-base ${
                tab === 'register'
                  ? 'text-white border-[#4fa8ff]'
                  : 'text-[#a0a0b0] border-transparent hover:text-white'
              }`}
              onClick={() => {
                setTab('register');
                setFeedback(null);
              }}
            >
              Registrarse
            </button>
          </div>

          {/* Mensaje de Feedback */}
          {feedback && (
            <div
              className={`mb-5 text-sm p-3.5 rounded-lg border ${
                feedback.type === 'success'
                  ? 'bg-green-950/40 border-green-500/50 text-green-300'
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}
              role="alert"
            >
              {feedback.text}
            </div>
          )}

          {/* Form Login */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4" noValidate>
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
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#27253d] border border-[#2e2c45] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors"
                />
                {loginErrors.email && (
                  <span className="text-xs text-red-400">{loginErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-300">Contraseña</label>
                <input
                  type="password"
                  placeholder="Tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#27253d] border border-[#2e2c45] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors"
                />
                {loginErrors.password && (
                  <span className="text-xs text-red-400">{loginErrors.password}</span>
                )}
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
                <a href="#" className="text-[#4fa8ff] hover:text-[#3db8ff] no-underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm sm:text-base mt-2 shadow-md"
              >
                Ingresar
              </button>
            </form>
          ) : (
            /* Form Register */
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4" noValidate>
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
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full bg-[#27253d] border border-[#2e2c45] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors"
                />
                {registerErrors.name && (
                  <span className="text-xs text-red-400">{registerErrors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-300">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full bg-[#27253d] border border-[#2e2c45] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors"
                />
                {registerErrors.email && (
                  <span className="text-xs text-red-400">{registerErrors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-300">Contraseña</label>
                <input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full bg-[#27253d] border border-[#2e2c45] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors"
                />
                {registerErrors.password && (
                  <span className="text-xs text-red-400">{registerErrors.password}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-300">Confirmar Contraseña</label>
                <input
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full bg-[#27253d] border border-[#2e2c45] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fa8ff] transition-colors"
                />
                {registerErrors.confirmPassword && (
                  <span className="text-xs text-red-400">{registerErrors.confirmPassword}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5 py-1">
                <label className="flex items-start gap-2 text-xs sm:text-sm text-[#a0a0b0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registerTerms}
                    onChange={(e) => setRegisterTerms(e.target.checked)}
                    className="accent-[#4fa8ff] cursor-pointer mt-0.5 rounded"
                  />
                  <span>Acepto los términos y condiciones de Sonido Vivo</span>
                </label>
                {registerErrors.terms && (
                  <span className="text-xs text-red-400">{registerErrors.terms}</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm sm:text-base mt-2 shadow-md"
              >
                Crear Cuenta
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full bg-[#100e1f] border-t border-[#2e2c45] py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="text-white font-bold text-lg hover:text-[#4fa8ff] transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Sonido Vivo
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#a0a0b0]">
            <span>Categoría Cuerdas</span>
            <span className="text-[#2e2c45]">|</span>
            <span>Categoría Percusión</span>
            <span className="text-[#2e2c45]">|</span>
            <span>Categoría Teclas</span>
          </div>
          <div>
            <span className="text-xs text-[#a0a0b0]">
              © 2026 Sonido Vivo - Todos los derechos reservados
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
