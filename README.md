# SonidoVivo

Este es un proyecto de carácter académico realizado por Jesús Muñoz. Proyecto de 4to semestre de la carrera de Ing. en Informática, en el ramo de Desarrollo Fullstack II.

## 🚀 Proyecto Migrado a React (SPA)

El proyecto ha sido estructurado como una **Single Page Application (SPA)** moderna y limpia utilizando **React 19**, **Vite** y **Tailwind CSS v4**.

---

### 🌐 Arquitectura y Enrutamiento en la Raíz
- **Punto de Entrada Único:** El archivo [`index.html`](index.html) en la raíz actúa como el host principal de la aplicación (`<div id="root"></div>`), conectando directamente con [`src/main.jsx`](src/main.jsx).
- **Enrutador Central:** [`src/App.jsx`](src/App.jsx) maneja la navegación reactiva entre todas las vistas mediante hash (`#/home`, `#/products`, `#/cart`, `#/login`), garantizando que la navegación funcione sin recargas ni errores 404 en cualquier entorno o hosting estático como GitHub Pages.
- **Estructura Depurada:** Se eliminaron carpetas y scripts auxiliares innecesarios (`docs/`, `.github/`, `404.html`, vistas HTML obsoletas), dejando únicamente el código fuente activo de React.

---

### 📦 Módulos de la Aplicación (`src/`)

- **`src/home/`**:
  - [`Home.jsx`](src/home/Home.jsx): Portada con catálogo destacado y notificaciones toast.
  - [`HomeHeader.jsx`](src/home/HomeHeader.jsx), [`HomeHero.jsx`](src/home/HomeHero.jsx), [`ProductCard.jsx`](src/home/ProductCard.jsx), [`HomeFooter.jsx`](src/home/HomeFooter.jsx).

- **`src/products/`**:
  - [`Products.jsx`](src/products/Products.jsx): Catálogo completo con buscador dinámico y filtros de categorías (Cuerdas, Teclas, Percusión, Audio).
  - [`ProductsHeader.jsx`](src/products/ProductsHeader.jsx), [`ProductCard.jsx`](src/products/ProductCard.jsx), [`ProductsFooter.jsx`](src/products/ProductsFooter.jsx).

- **`src/cart/`**:
  - [`Cart.jsx`](src/cart/Cart.jsx): Carrito de compras con persistencia en `localStorage`, cupones (`DESCUENTO10`, `SONIDOVIVO20`) y checkout.
  - [`CartHeader.jsx`](src/cart/CartHeader.jsx), [`CartItem.jsx`](src/cart/CartItem.jsx), [`CartSummary.jsx`](src/cart/CartSummary.jsx), [`CartFooter.jsx`](src/cart/CartFooter.jsx).

- **`src/login/`**:
  - [`Login.jsx`](src/login/Login.jsx): Vista de autenticación con pestañas para Iniciar Sesión y Registro.
  - [`LoginForm.jsx`](src/login/LoginForm.jsx), [`RegisterForm.jsx`](src/login/RegisterForm.jsx), [`LoginHeader.jsx`](src/login/LoginHeader.jsx), [`LoginFooter.jsx`](src/login/LoginFooter.jsx).

---

### 💻 Comandos del Proyecto

```bash
# Iniciar servidor local de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la compilación
npm run preview
```
