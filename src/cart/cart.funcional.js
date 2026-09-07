/**
 * RENDERIZADO DINÁMICO Y FUNCIONALIDADES DEL CARRITO
 */

let descuentoAplicado = 0; // Porcentaje de descuento (ej: 0.10 para 10%)

// Obtener carrito de LocalStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
}

// Guardar carrito en LocalStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Función principal para dibujar el carrito en la página cart.view.html
function renderizarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const elementoTotal = document.getElementById('precio-total');

    if (!contenedorCarrito) return;

    // Limpiar el contenedor antes de renderizar
    contenedorCarrito.innerHTML = '';

    const carritoActual = obtenerCarrito();

    if (carritoActual.length === 0) {
        contenedorCarrito.innerHTML = `
            <div style="padding: 30px; text-align: center; color: var(--text-muted);">
                <p style="font-size: 1.1rem; margin-bottom: 15px;">Tu carrito está vacío.</p>
                <a href="../home/home.view.html" style="color: var(--accent-blue); text-decoration: underline;">Volver a la tienda a buscar instrumentos</a>
            </div>
        `;
        if (elementoTotal) {
            elementoTotal.innerText = '$0';
        }
        return;
    }

    let subtotalGeneral = 0;

    // Recorrer el arreglo para mostrar los productos
    carritoActual.forEach((producto, index) => {
        const subtotalProducto = producto.precio * producto.cantidad;
        subtotalGeneral += subtotalProducto;

        const divItem = document.createElement('div');
        divItem.classList.add('cart-item');
        divItem.innerHTML = `
            <div class="item-img"></div>
            <div class="item-info">
                <h3>${producto.nombre}</h3>
                <p class="item-desc">${producto.descripcion || 'Instrumento musical'}</p>
            </div>
            <div class="item-price">$${subtotalProducto.toLocaleString()}</div>
            <div class="item-controls">
                <button class="btn-qty" onclick="cambiarCantidad(${index}, -1)" title="Disminuir">−</button>
                <input type="text" value="${producto.cantidad}" readonly>
                <button class="btn-qty" onclick="cambiarCantidad(${index}, 1)" title="Aumentar">+</button>
                <button class="btn-qty" onclick="eliminarProducto(${index})" title="Eliminar" style="background-color: #d9534f; margin-left: 5px;">✕</button>
            </div>
        `;

        contenedorCarrito.appendChild(divItem);
    });

    // Calcular total con descuento si aplica
    const totalFinal = subtotalGeneral * (1 - descuentoAplicado);

    if (elementoTotal) {
        if (descuentoAplicado > 0) {
            elementoTotal.innerHTML = `<span style="font-size: 0.9rem; text-decoration: line-through; color: var(--text-muted); margin-right: 8px;">$${subtotalGeneral.toLocaleString()}</span> $${Math.round(totalFinal).toLocaleString()}`;
        } else {
            elementoTotal.innerText = `$${subtotalGeneral.toLocaleString()}`;
        }
    }
}

// Función para sumar o restar cantidad desde el carrito
function cambiarCantidad(index, cambio) {
    const carrito = obtenerCarrito();
    if (!carrito[index]) return;

    carrito[index].cantidad += cambio;

    // Si la cantidad llega a 0, eliminar el producto del arreglo
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

// Función para eliminar directamente un producto
function eliminarProducto(index) {
    const carrito = obtenerCarrito();
    if (!carrito[index]) return;

    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
}

// Función para aplicar cupón de descuento
function aplicarCupon() {
    const inputCupon = document.getElementById('input-cupon');
    const mensajeCupon = document.getElementById('mensaje-cupon');
    if (!inputCupon || !mensajeCupon) return;

    const cupon = inputCupon.value.trim().toUpperCase();

    if (cupon === 'DESCUENTO10' || cupon === 'SONIDO10') {
        descuentoAplicado = 0.10; // 10% de descuento
        mensajeCupon.style.color = '#00a843';
        mensajeCupon.innerText = '¡Cupón de 10% aplicado con éxito!';
        renderizarCarrito();
    } else if (cupon === 'SONIDOVIVO20') {
        descuentoAplicado = 0.20; // 20% de descuento
        mensajeCupon.style.color = '#00a843';
        mensajeCupon.innerText = '¡Cupón de 20% aplicado con éxito!';
        renderizarCarrito();
    } else if (cupon === '') {
        mensajeCupon.style.color = '#d9534f';
        mensajeCupon.innerText = 'Por favor ingresa un código.';
    } else {
        descuentoAplicado = 0;
        mensajeCupon.style.color = '#d9534f';
        mensajeCupon.innerText = 'Cupón no válido.';
        renderizarCarrito();
    }
}

// Función para procesar el pago
function procesarPago() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de pagar.');
        return;
    }

    const confirmar = confirm('¿Deseas confirmar la compra de los productos en tu carrito?');
    if (confirmar) {
        // Vaciar el carrito
        guardarCarrito([]);
        renderizarCarrito();
        alert('¡Gracias por tu compra en Sonido Vivo! Tu pedido ha sido procesado con éxito.');
    }
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

// Ejecutar el renderizado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    renderizarCarrito();
});