/**
 * LÓGICA DE PRODUCTOS Y CARRITO DE COMPRAS - HOME
 */

// 1. Inventario de productos (instrumentos musicales)
const inventarioProductos = [
    { id: 1, nombre: "Guitarra Eléctrica Stratocaster", precio: 850, descripcion: "Cuerpo de Fresno", imagen: "" },
    { id: 2, nombre: "Teclado Sintetizador 61 Teclas", precio: 1200, descripcion: "Polifonía 128 voces", imagen: "" },
    { id: 3, nombre: "Batería Acústica 5 Cuerpos", precio: 950, descripcion: "Madera de Arce", imagen: "" },
    { id: 4, nombre: "Micrófono Condensador Estudio", precio: 150, descripcion: "Patrón Cardioide", imagen: "" }
];

// 2. Obtener el carrito desde LocalStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
}

// 3. Guardar el carrito en LocalStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// 4. Renderizar productos en el grid del Home
function renderizarProductosHome() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = inventarioProductos.map(producto => `
        <article class="product-card">
            <div class="product-image"></div>
            <h3>${producto.nombre}</h3>
            <button onclick="agregarAlCarrito(${producto.id})" class="btn">Añadir al carrito</button>
            <div class="product-info">
                <span class="attributes">${producto.descripcion || ''}</span>
                <span class="price">$${producto.precio.toLocaleString()}</span>
            </div>
        </article>
    `).join('');
}

// 5. Función para añadir un producto al carrito
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = inventarioProductos.find(prod => prod.id === idProducto);
    if (!productoSeleccionado) return;

    const carrito = obtenerCarrito();
    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            descripcion: productoSeleccionado.descripcion,
            imagen: productoSeleccionado.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    mostrarNotificacion(`${productoSeleccionado.nombre} fue añadido a tu carrito.`);
}

// Mostrar notificación visual amigable
function mostrarNotificacion(mensaje) {
    let notif = document.getElementById('notificacion-toast');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'notificacion-toast';
        notif.style.position = 'fixed';
        notif.style.bottom = '20px';
        notif.style.right = '20px';
        notif.style.backgroundColor = '#100e1f';
        notif.style.color = '#fff';
        notif.style.border = '1px solid #4fa8ff';
        notif.style.padding = '12px 20px';
        notif.style.borderRadius = '6px';
        notif.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
        notif.style.zIndex = '1000';
        notif.style.fontSize = '0.9rem';
        notif.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(notif);
    }
    notif.innerText = mensaje;
    notif.style.opacity = '1';
    notif.style.display = 'block';

    clearTimeout(window._notifTimeout);
    window._notifTimeout = setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => { notif.style.display = 'none'; }, 300);
    }, 2500);
}

// Función para actualizar el número del icono del carrito en el Header
function actualizarContadorCarrito() {
    const contadorElemento = document.querySelector('.cart-icon');
    if (contadorElemento) {
        const carrito = obtenerCarrito();
        const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
        contadorElemento.innerText = `🛒 Cart (${totalItems})`;
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    renderizarProductosHome();
});