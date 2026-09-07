/**
 * LÓGICA DE PRODUCTOS Y CARRITO DE COMPRAS - HOME & CATALOGO
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

// 4. Renderizar productos en el grid
function renderizarProductosHome() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = inventarioProductos.map(producto => `
        <article class="product-card bg-[#1c1a2e] border border-[#2e2c45] rounded-xl p-5 flex flex-col justify-between hover:border-[#4fa8ff] transition-all hover:shadow-lg hover:shadow-cyan-950/20">
            <div class="product-image w-full h-44 bg-[#d9d9d9] rounded-lg mb-4 flex items-center justify-center"></div>
            <h3 class="text-white font-semibold text-base mb-2 min-h-[2.5rem] line-clamp-2">${producto.nombre}</h3>
            <button onclick="agregarAlCarrito(${producto.id})" class="btn w-full bg-white text-[#121026] hover:bg-gray-200 font-semibold py-2.5 px-4 rounded-lg transition-colors cursor-pointer mb-3">Añadir al carrito</button>
            <div class="product-info flex items-center justify-between text-[#a0a0b0] text-sm mt-auto">
                <span class="attributes text-xs sm:text-sm text-[#a0a0b0]">${producto.descripcion || ''}</span>
                <span class="price font-bold text-white text-base">$${producto.precio.toLocaleString()}</span>
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
        notif.className = 'fixed bottom-5 right-5 bg-[#100e1f] text-white border border-[#4fa8ff] py-3 px-5 rounded-lg shadow-2xl z-50 text-sm transition-opacity duration-300';
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
