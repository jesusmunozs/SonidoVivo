import React, { useState, useEffect } from 'react';
import Home from './home/Home';
import Products from './products/Products';
import Cart from './cart/Cart';
import Login from './login/Login';
import Admin from './admin/Admin';

export function App() {
  // Manejo de rutas con hash para compatibilidad total con GitHub Pages
  const getRouteFromHash = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
    if (['home', 'products', 'cart', 'login', 'admin'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interceptar clicks en enlaces relativos antiguos para convertirlos en navegacion SPA
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      if (href.includes('home.view.html') || href === '#/home' || href === '#home') {
        e.preventDefault();
        navigateTo('home');
      } else if (href.includes('products.view.html') || href === '#/products' || href === '#products') {
        e.preventDefault();
        navigateTo('products');
      } else if (href.includes('cart.view.html') || href === '#/cart' || href === '#cart') {
        e.preventDefault();
        navigateTo('cart');
      } else if (href.includes('login.view.html') || href === '#/login' || href === '#login') {
        e.preventDefault();
        navigateTo('login');
      } else if (href === '#/admin' || href === '#admin') {
        e.preventDefault();
        navigateTo('admin');
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <div className="app-container min-h-screen w-full flex flex-col bg-[#121026] text-white">
      {currentRoute === 'home' && <Home />}
      {currentRoute === 'products' && <Products />}
      {currentRoute === 'cart' && <Cart />}
      {currentRoute === 'login' && <Login onNavigate={navigateTo} />}
      {currentRoute === 'admin' && <Admin />}
    </div>
  );
}

export default App;
