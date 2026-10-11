# SonidoVivo

Este es un proyecto de carácter académico realizado por Jesús Muñoz. Proyecto de 4to semestre de la carrera de Ing. en Informática, en el ramo de Desarrollo Fullstack II.

## 🚀 Migración a React y Despliegue en GitHub Pages

El proyecto ha sido completamente migrado hacia una Single Page Application (SPA) con **React 19**, **Vite** y **Tailwind CSS v4**, solucionando los problemas de enrutamiento y errores 404 en GitHub Pages.

---

### 🌐 ¿Por qué ocurría el Error 404 en GitHub Pages?
1. **Redirección a archivos inexistentes:** El archivo `index.html` original ejecutaba una redirección forzada a `src/home/home.view.html`. Al eliminar o renombrar las vistas HTML durante la migración a React, GitHub Pages intentaba acceder a un archivo que ya no existía en el repositorio, arrojando el error `404 Not Found`.
2. **Incompatibilidad de JSX nativo:** GitHub Pages es un servidor de archivos estáticos y los navegadores no interpretan archivos `.jsx` directamente; se requiere un empaquetador (Vite) para compilar la aplicación en bundles optimizados de JavaScript y CSS.

---

### 🛠️ Solución Aplicada
1. **Punto de Entrada SPA:** Se transformó el [index.html](index.html) raíz en el contenedor React con `<div id="root"></div>` y enlace al módulo principal [src/main.jsx](src/main.jsx).
2. **Enrutamiento por Hash:** En [src/App.jsx](src/App.jsx) se implementó un router basado en Hash (`#/home`, `#/products`, `#/cart`, `#/login`) que nunca provoca errores 404 al recargar la página en GitHub Pages.
3. **Página de Captura 404:** Se creó [404.html](404.html) para capturar cualquier ruta rota y redirigirla a la app principal.
4. **Redirecciones de Respaldo:** Se incluyeron archivos ligeros en `src/home/home.view.html`, `src/cart/cart.view.html`, `src/products/products.view.html` y `src/login/login.view.html` para redirigir cualquier enlace antiguo o caché del navegador a la SPA.
5. **Automatización con GitHub Actions:** Se creó el flujo [deploy.yml](.github/workflows/deploy.yml) que compila automáticamente con Vite y despliega en GitHub Pages en cada `git push`.
6. **Carpeta `docs/`:** Se generó la carpeta `docs/` con el build compilado para permitir también el despliegue directo por rama si no se usa GitHub Actions.

---

### 📦 Módulos Migrados

#### 1. `src/cart/`
- **[`Cart.jsx`](src/cart/Cart.jsx)**: Componente del carrito con estado reactivo, cupones (`DESCUENTO10`, `SONIDOVIVO20`) y checkout.
- **[`CartItem.jsx`](src/cart/CartItem.jsx)**: Controles de cantidad (+/-) y eliminación por producto.
- **[`CartSummary.jsx`](src/cart/CartSummary.jsx)**: Resumen y desglose de subtotales y descuentos.
- **[`CartHeader.jsx`](src/cart/CartHeader.jsx)** y **[`CartFooter.jsx`](src/cart/CartFooter.jsx)**.

#### 2. `src/home/`
- **[`Home.jsx`](src/home/Home.jsx)**: Vista principal con destacados y toast notifications.
- **[`HomeHero.jsx`](src/home/HomeHero.jsx)**: Banner con llamada a la acción.
- **[`ProductCard.jsx`](src/home/ProductCard.jsx)**: Tarjeta de instrumento destacado con botón de añadir al carrito.
- **[`HomeHeader.jsx`](src/home/HomeHeader.jsx)** y **[`HomeFooter.jsx`](src/home/HomeFooter.jsx)**.

#### 3. `src/products/`
- **[`Products.jsx`](src/products/Products.jsx)**: Catálogo completo con buscador en tiempo real y filtro por categorías.
- **[`ProductsHeader.jsx`](src/products/ProductsHeader.jsx)** y **[`ProductsFooter.jsx`](src/products/ProductsFooter.jsx)**.
- **[`ProductCard.jsx`](src/products/ProductCard.jsx)**.

#### 4. `src/login/`
- **[`Login.jsx`](src/login/Login.jsx)**: Formularios interactivos de inicio de sesión y registro con validaciones en tiempo real.

---

### 💻 Comandos Útiles

```bash
# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (genera dist/ y docs/)
npm run build

# Previsualizar el build de producción
npm run preview
```
