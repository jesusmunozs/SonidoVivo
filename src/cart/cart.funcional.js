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
            <div class="py-12 px-6 text-center text-[#a0a0b0] bg-[#27253d] border border-[#2e2c45] rounded-xl flex flex-col items-center justify-center gap-4">
                <span class="text-4xl">🛒</span>
                <p class="text-base sm:text-lg">Tu carrito de compras está vacío.</p>
                <a href="../home/home.view.html" class="inline-block bg-[#4fa8ff] hover:bg-[#3db8ff] text-[#100e1f] font-bold text-sm px-6 py-2.5 rounded-lg no-underline transition-colors">Volver a la tienda a buscar instrumentos</a>
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
        divItem.className = 'cart-item bg-[#27253d] border border-[#2e2c45] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-[#4fa8ff]/40 transition-colors shadow-sm';
        divItem.innerHTML = `
            <div class="item-img w-20 h-20 bg-[#d9d9d9] rounded-lg shrink-0 flex items-center justify-center"></div>
            <div class="item-info flex-1 text-center sm:text-left">
                <h3 class="text-white font-semibold text-base">${producto.nombre}</h3>
                <p class="item-desc text-xs text-[#a0a0b0] mt-1">${producto.descripcion || 'Instrumento musical'}</p>
            </div>
            <div class="item-price text-base font-bold text-white shrink-0 sm:text-right min-w-[90px]">$${subtotalProducto.toLocaleString()}</div>
            <div class="item-controls flex items-center gap-2 shrink-0">
                <button class="btn-qty w-8 h-8 rounded-full bg-[#3e3c56] hover:bg-[#4fa8ff] hover:text-[#100e1f] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#2e2c45]" onclick="cambiarCantidad(${index}, -1)" title="Disminuir">−</button>
                <input type="text" value="${producto.cantidad}" readonly class="w-10 text-center bg-transparent border border-[#3e3c56] text-white text-sm py-1 rounded-md outline-none">
                <button class="btn-qty w-8 h-8 rounded-full bg-[#3e3c56] hover:bg-[#4fa8ff] hover:text-[#100e1f] text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-[#2e2c45]" onclick="cambiarCantidad(${index}, 1)" title="Aumentar">+</button>
                <button class="btn-qty w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ml-1" onclick="eliminarProducto(${index})" title="Eliminar">✕</button>
            </div>
        `;

        contenedorCarrito.appendChild(divItem);
    });

    // Calcular total con descuento si aplica
    const totalFinal = subtotalGeneral * (1 - descuentoAplicado);

    if (elementoTotal) {
        if (descuentoAplicado > 0) {
            elementoTotal.innerHTML = `<span class="text-sm line-through text-[#a0a0b0] mr-2 font-normal">$${subtotalGeneral.toLocaleString()}</span> $${Math.round(totalFinal).toLocaleString()}`;
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
        mensajeCupon.className = 'text-xs text-green-400 mt-1';
        mensajeCupon.innerText = '¡Cupón de 10% aplicado con éxito!';
        renderizarCarrito();
    } else if (cupon === 'SONIDOVIVO20') {
        descuentoAplicado = 0.20; // 20% de descuento
        mensajeCupon.className = 'text-xs text-green-400 mt-1';
        mensajeCupon.innerText = '¡Cupón de 20% aplicado con éxito!';
        renderizarCarrito();
    } else if (cupon === '') {
        mensajeCupon.className = 'text-xs text-red-400 mt-1';
        mensajeCupon.innerText = 'Por favor ingresa un código.';
    } else {
        descuentoAplicado = 0;
        mensajeCupon.className = 'text-xs text-red-400 mt-1';
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
