# Documento de Cobertura y Proceso de Testing Unitario
## Proyecto SonidoVivo — Desarrollo Fullstack II (DSY1104)

**Estudiante:** Jesús Muñoz  
**Framework Frontend:** React 19 (Vite)  
**Herramientas de Testeo:** Jasmine 7 + Karma 6 + esbuild 0.28 + Chromium Headless (Edge / Chrome)  
**Total de Pruebas Unitarias Ejecutadas:** 21 / 21 exitosas (100% Passing)  

---

## 1. Resumen Ejecutivo del Proceso de Testing

El proceso de pruebas unitarias implementado para **SonidoVivo** garantiza la confiabilidad, estabilidad y correcto funcionamiento de la arquitectura frontend migrada a React 19. Las pruebas abarcan:
1. **Lógica de negocio y persistencia de datos** (`inventoryData.js`).
2. **Componentes visuales y renderizado del DOM** (`ProductCard.jsx`).
3. **Formularios interactivos y lógica de validación de entradas** (`LoginForm.jsx`, `ProductForm.jsx`).
4. **Cálculos financieros, gestión de estado y descuentos promocionales** (`Cart.jsx`).

---

## 2. Configuración del Entorno de Pruebas (Test Runner & Framework)

El entorno fue configurado bajo un enfoque moderno y desacoplado:

- **Karma (`karma.conf.cjs`)**:
  - Test runner que ejecuta las pruebas en navegadores reales basados en Chromium en modo Headless (`ChromeHeadless` / `EdgeHeadless`).
  - Auto-detección del binario Chromium en sistemas operativos Windows y entornos CI.
  - Flags de aislamiento y alto rendimiento: `--no-sandbox`, `--disable-gpu`, `--disable-dev-shm-usage`.
  - Reporter `karma-spec-reporter` para visualización granular en consola.

- **Jasmine (`jasmine-core`, `karma-jasmine`)**:
  - Framework BDD para la definición de suites (`describe`), especificaciones (`it`), expectativas (`expect`) y dobles de prueba (`jasmine.createSpy`).

- **Preprocesador esbuild (`karma-esbuild`, `esbuild`)**:
  - Transpilación instantánea de JSX y sintaxis moderna de ECMAScript (`es2022`).
  - Emulación de entorno React 19 (`tests/setup.js` con `globalThis.IS_REACT_ACT_ENVIRONMENT = true`).

---

## 3. Matriz de Trazabilidad y Alcance de Cobertura

| Módulo / Archivo | Tipo de Elemento | Casos de Prueba | Alcance y Comportamientos Verificados |
|---|---|:---:|---|
| [`src/inventoryData.js`](../src/inventoryData.js) | Servicio / Lógica de Datos | 7 | • Integridad del catálogo predeterminado.<br>• Inicialización de `localStorage`.<br>• Recuperación de datos persistidos.<br>• Resiliencia ante JSON corrupto.<br>• Emisión de eventos globales (`inventarioActualizado`).<br>• Generación de IDs correlativos.<br>• Eliminación de ítems por identificador. |
| [`src/products/ProductCard.jsx`](../src/products/ProductCard.jsx) | Componente UI / DOM | 2 | • Renderizado de propiedades (nombre, precio formateado, descripción).<br>• Interacción con el botón "Añadir al carrito" usando spy mock. |
| [`src/cart/Cart.jsx`](../src/cart/Cart.jsx) | Componente UI & Estado | 4 | • Renderizado de estado vacío con CTA.<br>• Cálculo dinámico de subtotales por cantidad.<br>• Aplicación de cupones válidos (`DESCUENTO10`).<br>• Manejo y mensajes de error ante cupones inválidos. |
| [`src/login/LoginForm.jsx`](../src/login/LoginForm.jsx) | Formulario / Validación | 4 | • Existencia de inputs en el DOM y submit.<br>• Detección de campos obligatorios vacíos y alerta en el DOM.<br>• Validación de formato de correo con regex.<br>• Invocación de callback mock `onSuccess` tras credenciales válidas. |
| [`src/admin/ProductForm.jsx`](../src/admin/ProductForm.jsx) | Formulario / Catálogo | 4 | • Renderizado de campos (nombre, precio, categoría, descripción).<br>• Bloqueo de formulario ante datos incompletos.<br>• Validación de precio positivo mayor a 0.<br>• Normalización del objeto y llamada al mock `onAddProduct`. |
| **Total General** | **Suites Frontend** | **21** | **Cumple con creces el requerimiento mínimo de 10 pruebas (210% de la meta)** |

---

## 4. Uso de Mocks y Spies (Dobles de Prueba)

En las suites se implementaron dobles de prueba de acuerdo con las buenas prácticas de testing unitario:
- **`jasmine.createSpy` para callbacks de componentes:**
  - Mock del evento `onAddToCart` en `ProductCard.spec.js`.
  - Mocks de `onSuccess` y `onError` en `LoginForm.spec.js`.
  - Mock de `onAddProduct` en `ProductForm.spec.js`.
- **Aislamiento de `localStorage`:**
  - Limpieza controlada antes y después de cada test (`beforeEach` / `afterEach` con `localStorage.clear()`).
- **Simulación de eventos de navegador:**
  - Despacho de eventos `input`, `change`, y `submit` del DOM simulando la interacción real del usuario.

---

## 5. Resultados de Ejecución

```bash
> npm test

Karma v6.4.4 server started at http://localhost:9876/
Connected on socket LA8sBwPekr9jZePxAAAA (Edge 155.0.0.0 Windows 10)

  Componente ProductCard (Unit Test)
    √ debe renderizar el nombre, precio y descripción del producto
    √ debe invocar onAddToCart con el producto al hacer clic en el botón

  Componente LoginForm - Validaciones y DOM (Unit Tests)
    √ debe renderizar los campos de correo/usuario, contraseña y botón de ingreso en el DOM
    √ debe mostrar errores de validación en el DOM cuando los campos están vacíos
    √ debe validar formato de correo electrónico incorrecto
    √ debe invocar el mock onSuccess cuando las credenciales son válidas

  Componente ProductForm - Validación de Inventario y DOM (Unit Tests)
    √ debe renderizar los inputs obligatorios de instrumento, precio, categoría y descripción
    √ debe impedir el envío y mostrar errores si faltan campos obligatorios
    √ debe enviar el producto formateado a través del mock onAddProduct al completar el formulario
    √ debe validar que el precio sea un número positivo

  Componente Cart (Unit Tests)
    √ debe rechazar un cupón inválido y mostrar mensaje de error
    √ debe listar los productos del carrito y calcular el subtotal correctamente
    √ debe mostrar mensaje de carrito vacío si no hay productos
    √ debe aplicar un cupón de descuento válido como DESCUENTO10

  Servicio de Inventario (inventoryData)
    √ debe manejar JSON corrupto en localStorage retornando el inventario inicial
    √ debe recuperar productos previamente almacenados en localStorage
    √ debe agregar un nuevo producto con ID auto-incremental al inicio de la lista
    √ debe guardar productos y despachar el evento inventarioActualizado
    √ debe eliminar un producto por ID correctamente
    √ debe inicializar el inventario en localStorage si está vacío
    √ debe tener un inventario inicial con productos válidos

TOTAL: 21 SUCCESS (0 FAILURES)
```
