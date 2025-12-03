// --------------------------------------
// LISTA DE PRODUCTOS
// --------------------------------------
const productos = [
    { id: 1, nombre: "Remera Básica", precio: 15000 },
    { id: 2, nombre: "Remera Estampa", precio: 20000 },
    { id: 3, nombre: "Chomba", precio: 25000 },
    { id: 4, nombre: "Bermuda", precio: 40000 },
    { id: 5, nombre: "Jeans", precio: 60000 },
    { id: 6, nombre: "Camisa", precio: 50000 },
    { id: 7, nombre: "Malla", precio: 25000 },
];

// --------------------------------------
// STORAGE
// --------------------------------------
let carrito = [];

function guardarCarritoLS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoLS() {
    const data = localStorage.getItem("carrito");
    carrito = data ? JSON.parse(data) : [];
}

// --------------------------------------
// MENSAJE VISUAL
// --------------------------------------
function mostrarMensaje(texto) {
    const box = document.getElementById("mensaje-usuario");
    box.textContent = texto;
    box.classList.remove("oculto");
    setTimeout(() => box.classList.add("oculto"), 3000);
}

// --------------------------------------
// MOSTRAR PRODUCTOS
// --------------------------------------
function cargarProductos() {
    const cont = document.getElementById("productos-dinamicos");
    cont.innerHTML = "";

    productos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("card-producto");
        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button class="btn-agregar" data-id="${prod.id}">+</button>
            <button class="btn-restar" data-id="${prod.id}">−</button>
        `;
        cont.appendChild(card);
    });

    activarBotones();
}

// --------------------------------------
// FUNCIONES DE CARRITO
// --------------------------------------
function activarBotones() {
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", () => agregarAlCarrito(Number(btn.dataset.id)));
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", () => quitarDelCarrito(Number(btn.dataset.id)));
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(p => p.id === id);

    if (item) item.cantidad++;
    else carrito.push({ ...producto, cantidad: 1 });

    guardarCarritoLS();
    mostrarCarrito();
}

function quitarDelCarrito(id) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    if (item.cantidad === 1) carrito = carrito.filter(p => p.id !== id);
    else item.cantidad--;

    guardarCarritoLS();
    mostrarCarrito();
}

function mostrarCarrito() {
    const cont = document.getElementById("carrito-items");
    const totalTexto = document.getElementById("carrito-total");
    cont.innerHTML = "";

    carrito.forEach(item => {
        cont.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre} (${item.cantidad})</span>
                <span>$${item.precio * item.cantidad}</span>
            </div>
        `;
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalTexto.textContent = "Total: $" + total;
}

// --------------------------------------
// FINALIZAR COMPRA
// --------------------------------------
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito está vacío.");
        return;
    }

    const modal = document.getElementById("modal-compra");
    const detalle = document.getElementById("modal-detalle");

    let html = `<h3>Detalle de tu compra</h3><ul>`;
    carrito.forEach(item => {
        html += `<li>${item.nombre} x${item.cantidad} — $${item.precio * item.cantidad}</li>`;
    });
    html += `</ul>`;

    const totalCompra = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    html += `<p style="font-weight:bold; font-size:18px; margin-top:10px;">Total de la compra: $${totalCompra}</p>`;

    detalle.innerHTML = html;

    // Mostrar modal correctamente
    modal.classList.remove("oculto");
    modal.style.display = "flex";
    modal.style.zIndex = 5000;

    // Vaciar carrito después de mostrar modal
    carrito = [];
    guardarCarritoLS();
    mostrarCarrito();
}

// --------------------------------------
// CERRAR MODAL
// --------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    cargarCarritoLS();
    cargarProductos();
    mostrarCarrito();

    document.getElementById("btn-carrito").addEventListener("click", () => {
        document.getElementById("carrito-contenedor").classList.toggle("carrito-oculto");
    });

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        carrito = [];
        guardarCarritoLS();
        mostrarCarrito();
        mostrarMensaje("Carrito vaciado.");
    });

    document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);

    document.getElementById("cerrar-modal").addEventListener("click", () => {
        document.getElementById("modal-compra").classList.add("oculto");
    });
});