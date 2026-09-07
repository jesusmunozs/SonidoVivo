/**
 * RENDERIZADO DINÁMICO DEL CARRITO
 */

// Función principal para dibujar el carrito en la página carrito.html
function renderizarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const elementoTotal = document.getElementById('precio-total');

    // Verificamos que estemos en la página del carrito
    if (!contenedorCarrito) return;

    // Limpiar el contenedor antes de renderizar
    contenedorCarrito.innerHTML = '';

    // Obtener los datos más recientes del LocalStorage
    let carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];

    if (carritoActual.length === 0) {
        contenedorCarrito.innerHTML = '<p>Tu carrito está vacío. ¡Ve a la tienda a buscar tu instrumento ideal!</p>';
        elementoTotal.innerText = '$0';
        return;
    }

    let totalPrecio = 0;

    // Recorrer el arreglo para mostrar los productos
    carritoActual.forEach((producto, index) => {
        // Calcular el subtotal por producto
        let subtotal = producto.precio * producto.cantidad;
        totalPrecio += subtotal;

        // Crear la estructura HTML del ítem[cite: 1]
        const divItem = document.createElement('div');
        divItem.classList.add('cart-item');
        divItem.innerHTML = `
            <div class="item-img" style="background-color: var(--card-img-bg); width: 80px; height: 80px;"></div>
            <div class="item-detalles">
                <h3>${producto.nombre}</h3>
                <p class="precio-unitario">$${producto.precio}</p>
            </div>
            <div class="item-controles">
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                <input type="text" value="${producto.cantidad}" readonly style="width: 30px; text-align: center;">
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
            </div>
        `;

        contenedorCarrito.appendChild(divItem);
    });

    // Actualizar el total en la pantalla
    if (elementoTotal) {
        elementoTotal.innerText = `$${totalPrecio.toLocaleString()}`;
    }
}

// Función para sumar o restar cantidad desde el carrito
function cambiarCantidad(index, cambio) {
    let carritoActual = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];

    // Modificar la cantidad
    carritoActual[index].cantidad += cambio;

    // Si la cantidad llega a 0, eliminar el producto del arreglo
    if (carritoActual[index].cantidad <= 0) {
        carritoActual.splice(index, 1);
    }

    // Guardar cambios en LocalStorage[cite: 1]
    localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoActual));

    // Actualizar la interfaz
    renderizarCarrito();
    actualizarContadorCarrito(); // Esta función la creamos en el mensaje anterior
}

// Ejecutar el renderizado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});