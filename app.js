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
// CARRITO (cantidad ilimitada)
// --------------------------------------
let carrito = [];

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
            <div>
                <button class="btn-restar" data-id="${prod.id}">−</button>
                <button class="btn-agregar" data-id="${prod.id}">+</button>
            </div>
        `;

        cont.appendChild(card);
    });

    activarBotones();
}

// --------------------------------------
// BOTONES SUMAR / RESTAR
// --------------------------------------
function activarBotones() {
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            agregarAlCarrito(id);
        });
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            quitarDelCarrito(id);
        });
    });
}

// --------------------------------------
// AGREGAR PRODUCTO
// --------------------------------------
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    mostrarCarrito();
}

// --------------------------------------
// QUITAR PRODUCTO
// --------------------------------------
function quitarDelCarrito(id) {
    const item = carrito.find(p => p.id === id);

    if (!item) return;
    if (item.cantidad === 1) {
        carrito = carrito.filter(p => p.id !== id);
    } else {
        item.cantidad--;
    }

    mostrarCarrito();
}

// --------------------------------------
// MOSTRAR CARRITO EN HTML
// --------------------------------------
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
document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let detalle = "Detalle de compra:\n\n";

    carrito.forEach(item => {
        detalle += `${item.nombre} x${item.cantidad} — $${item.precio * item.cantidad}\n`;
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    detalle += `\nTOTAL: $${total}`;

    alert(detalle);
});

// --------------------------------------
// INICIO
// --------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    mostrarCarrito();
});
// Obtener referencias a elementos
const btnCarrito = document.getElementById("btn-carrito");
const carritoContenedor = document.getElementById("carrito-contenedor");

// Función para alternar visibilidad del carrito
btnCarrito.addEventListener("click", () => {
    carritoContenedor.classList.toggle("carrito-oculto");
});