/**
 * LÓGICA DE PRODUCTOS Y CARRITO DE COMPRAS
 */

// 1. Crear un arreglo de productos[cite: 1] (Adaptado a instrumentos musicales)
const inventarioProductos = [
    { id: 1, nombre: "Guitarra Eléctrica Stratocaster", precio: 850, imagen: "img/guitarra.jpg" },
    { id: 2, nombre: "Teclado Sintetizador 61 Teclas", precio: 1200, imagen: "img/teclado.jpg" },
    { id: 3, nombre: "Batería Acústica 5 Cuerpos", precio: 950, imagen: "img/bateria.jpg" },
    { id: 4, nombre: "Micrófono Condensador Estudio", precio: 150, imagen: "img/microfono.jpg" }
];

// 2. Inicializar el carrito leyendo el LocalStorage (o arreglo vacío si no existe)[cite: 1]
let carritoCompras = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];

// 3. Función para añadir un producto al carrito[cite: 1]
function agregarAlCarrito(idProducto) {
    // Buscar el producto en nuestro inventario
    const productoSeleccionado = inventarioProductos.find(prod => prod.id === idProducto);

    if (productoSeleccionado) {
        // Revisar si el producto ya está en el carrito
        const productoEnCarrito = carritoCompras.find(item => item.id === idProducto);

        if (productoEnCarrito) {
            // Si ya existe, solo sumamos la cantidad
            productoEnCarrito.cantidad += 1;
        } else {
            // Si no existe, lo agregamos con cantidad 1
            carritoCompras.push({ ...productoSeleccionado, cantidad: 1 });
        }

        // 4. Guardar información en LocalStorage[cite: 1]
        actualizarLocalStorage();
        alert(`${productoSeleccionado.nombre} fue añadido a tu carrito.`);
    }
}

// Función auxiliar para actualizar LocalStorage
function actualizarLocalStorage() {
    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoCompras));
    actualizarContadorCarrito();
}

// Función para actualizar el número del icono del carrito en el Header
function actualizarContadorCarrito() {
    const contadorElemento = document.querySelector('.cart-icon');
    if (contadorElemento) {
        // Sumar todas las cantidades de los productos en el carrito
        const totalItems = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
        contadorElemento.innerText = `🛒 Cart (${totalItems})`;
    }
}

// Ejecutar al cargar la página para mostrar el número correcto en el carrito
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});