import React, { useState, useEffect } from 'react';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const STORAGE_KEY = 'carritoSonidoVivo';

export function Login({ initialMode = 'login', onNavigate }) {
  const [tab, setTab] = useState(initialMode);
  const [totalItems, setTotalItems] = useState(0);
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

  const handleLoginSuccess = (msg) => {
    setFeedback({ type: 'success', text: msg });
  };

  const handleRegisterSuccess = (msg) => {
    setFeedback({ type: 'success', text: msg });
    setTimeout(() => {
      setTab('login');
    }, 2000);
  };

  const handleError = (msg) => {
    setFeedback({ type: 'error', text: msg });
  };

  return (
    <div className="bg-[#121026] text-white min-h-screen flex flex-col font-sans antialiased w-full">
      {/* Header */}
      <LoginHeader
        tab={tab}
        onTabChange={(mode) => {
          setTab(mode);
          setFeedback(null);
        }}
        onNavigate={onNavigate}
        totalItems={totalItems}
      />

      {/* Contenedor Principal */}
      <main className="auth-wrapper flex-1 w-full max-w-7xl 2xl:max-w-[1536px] mx-auto flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="auth-card w-full max-w-lg bg-[#1c1a2e] border border-[#2e2c45] rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Pestañas para alternar */}
          <div className="auth-tabs flex border-b border-[#2e2c45] mb-8">
            <button
              type="button"
              className={`flex-1 pb-4 text-center font-bold border-b-2 transition-all cursor-pointer text-sm sm:text-base ${
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
              className={`flex-1 pb-4 text-center font-bold border-b-2 transition-all cursor-pointer text-sm sm:text-base ${
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
              className={`mb-6 text-sm p-4 rounded-xl border ${
                feedback.type === 'success'
                  ? 'bg-green-950/40 border-green-500/50 text-green-300'
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}
              role="alert"
            >
              {feedback.text}
            </div>
          )}

          {/* Formulario Login o Registro */}
          {tab === 'login' ? (
            <LoginForm onSuccess={handleLoginSuccess} onError={handleError} />
          ) : (
            <RegisterForm onSuccess={handleRegisterSuccess} onError={handleError} />
          )}
        </div>
      </main>

      {/* Footer */}
      <LoginFooter onNavigate={onNavigate} />
    </div>
  );
}

export default Login;
