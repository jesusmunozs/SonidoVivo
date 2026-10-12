# SonidoVivo

Este es un proyecto de carácter académico realizado por Jesús Muñoz. Proyecto de 4to semestre de la carrera de Ing. en Informática, en el ramo de Desarrollo Fullstack II (DSY1104).

## 🚀 Proyecto Migrado a React (SPA)

El proyecto ha sido estructurado como una **Single Page Application (SPA)** moderna y limpia utilizando **React 19**, **Vite** y **Tailwind CSS v4**.

---

### 🌐 Arquitectura y Enrutamiento en la Raíz
- **Punto de Entrada Único:** El archivo [`index.html`](index.html) en la raíz actúa como el host principal de la aplicación (`<div id="root"></div>`), conectando directamente con [`src/main.jsx`](src/main.jsx).
- **Enrutador Central:** [`src/App.jsx`](src/App.jsx) maneja la navegación reactiva entre todas las vistas mediante hash (`#/home`, `#/products`, `#/cart`, `#/login`, `#/admin`), garantizando que la navegación funcione sin recargas ni errores 404 en cualquier entorno o hosting estático como GitHub Pages.
- **Estructura Depurada:** Se eliminaron carpetas y scripts auxiliares innecesarios (`404.html`, vistas HTML obsoletas), dejando únicamente el código fuente activo de React.

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

- **`src/admin/`**:
  - [`Admin.jsx`](src/admin/Admin.jsx): Panel de administración de inventario.
  - [`ProductForm.jsx`](src/admin/ProductForm.jsx), [`ProductList.jsx`](src/admin/ProductList.jsx), [`AdminHeader.jsx`](src/admin/AdminHeader.jsx), [`AdminFooter.jsx`](src/admin/AdminFooter.jsx).

---

### 🧪 Pruebas Unitarias con Jasmine y Karma (21 Tests Exitosos)

El proyecto cuenta con un entorno integral de pruebas unitarias configurado con **Jasmine** como framework de testing y **Karma** como test runner en navegador real (Headless Chromium / Microsoft Edge / Google Chrome), preprocesado con **esbuild** para ejecución ultrarrápida de JSX y módulos ES.

Para más detalles, consulta el [**Documento de Cobertura de Testing**](docs/COBERTURA_TESTING.md).

#### Componentes de la Configuración de Pruebas:
- **[`karma.conf.cjs`](karma.conf.cjs)**: Configuración principal de Karma con auto-detección de navegadores basados en Chromium en Windows/CI, integración con `karma-esbuild` y reporter detallado con `karma-spec-reporter`.
- **[`tests/setup.js`](tests/setup.js)**: Configuración global del entorno de testing para compatibilidad con React 19 (`IS_REACT_ACT_ENVIRONMENT`).

#### Suites de Pruebas Implementadas:
1. **Servicio de Inventario ([`src/inventoryData.spec.js`](src/inventoryData.spec.js))**:
   - Validación del catálogo inicial de instrumentos musicales.
   - Inicialización y sincronización con `localStorage`.
   - Recuperación de productos almacenados y manejo de errores ante datos corruptos.
   - Creación de nuevos productos con IDs autoincrementales.
   - Eliminación de productos y emisión del evento `inventarioActualizado`.
2. **Tarjeta de Producto ([`src/products/ProductCard.spec.js`](src/products/ProductCard.spec.js))**:
   - Renderizado correcto de props en el DOM (nombre, precio formateado, descripción).
   - Manejo del evento de interacción al hacer clic en "Añadir al carrito" usando spy mock.
3. **Formulario de Login ([`src/login/LoginForm.spec.js`](src/login/LoginForm.spec.js))**:
   - Renderizado de controles y botón submit en el DOM.
   - Detección de campos vacíos con mensajes de error en pantalla.
   - Validación de formato de correo electrónico.
   - Envío de formulario exitoso invocando callback mock `onSuccess`.
4. **Formulario de Administración ([`src/admin/ProductForm.spec.js`](src/admin/ProductForm.spec.js))**:
   - Renderizado de inputs obligatorios de catálogo.
   - Bloqueo de envío y alertas en el DOM ante campos incompletos.
   - Validación de precios positivos (> 0).
   - Invocación del callback mock `onAddProduct` con el nuevo instrumento normalizado.
5. **Carrito de Compras ([`src/cart/Cart.spec.js`](src/cart/Cart.spec.js))**:
   - Estado de carrito vacío con llamada a la acción.
   - Cálculo automático de subtotales a partir de cantidades y precios de productos.
   - Aplicación y validación de cupones de descuento válidos (`DESCUENTO10`).
   - Manejo de cupones inválidos y mensajes de retroalimentación al usuario.

---

### 💻 Comandos del Proyecto

```bash
# Iniciar servidor local de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la compilación
npm run preview

# Ejecutar pruebas unitarias (Single Run con Karma y Jasmine)
npm test

# Ejecutar pruebas unitarias en modo interactivo / watch
npm run test:watch
```
