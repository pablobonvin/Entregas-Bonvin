// --------------------------------------------------
// ARRAY PRINCIPAL DE PRODUCTOS (igual al anterior)
// --------------------------------------------------
function Producto(id, nombre, categoria, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
}

const productos = [
    new Producto(1, "Remera Básica Negra", "remeras", 9500, "../assets/remera1.jpg"),
    new Producto(2, "Chomba Blanca", "remeras", 12000, "../assets/chomba1.jpg"),
    new Producto(3, "Buzo Canguro Gris", "buzos", 22000, "../assets/buzo1.jpg"),
    new Producto(4, "Campera Rompeviento", "buzos", 28000, "../assets/campera1.jpg"),
    new Producto(5, "Jean Azul Slim Fit", "jeans", 32000, "../assets/jean1.jpg"),
    new Producto(6, "Camisa Cuadros Roja", "camisas", 18000, "../assets/camisa1.jpg"),
    new Producto(7, "Bermuda Cargo", "bermudas", 16000, "../assets/bermuda1.jpg"),
    new Producto(8, "Short de Baño Azul", "short", 14000, "../assets/short1.jpg"),
    new Producto(9, "Boxer Algodón Negro", "boxers", 4500, "../assets/boxer1.jpg")
];

// --------------------------------------------------
// CARRITO (se carga desde localStorage si existe)
// --------------------------------------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// --------------------------------------------------
// MOSTRAR CATALOGO
// --------------------------------------------------
function mostrarProductos(categoria) {
    const contenedor = document.getElementById("productos-dinamicos");
    contenedor.innerHTML = "";

    const filtrados = productos.filter(p => p.categoria === categoria);

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<p>No hay productos.</p>`;
        return;
    }

    filtrados.forEach(prod => {
        contenedor.innerHTML += `
            <div class="card-producto">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
                <button class="btn-agregar" data-id="${prod.id}">Agregar al Carrito</button>
            </div>
        `;
    });

    activarBotonesAgregar();
}

// --------------------------------------------------
// FUNCION PARA AGREGAR AL CARRITO
// --------------------------------------------------
function activarBotonesAgregar() {
    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = Number(boton.dataset.id);

            const producto = productos.find(p => p.id === id);

            // Verificar si ya está en el carrito
            const repetido = carrito.find(item => item.id === id);

            if (repetido) {
                repetido.cantidad++;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }

            guardarCarrito();
            mostrarCarrito();
        });
    });
}

// --------------------------------------------------
// MOSTRAR CARRITO EN EL HTML
// --------------------------------------------------
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    const totalTexto = document.getElementById("carrito-total");

    contenedor.innerHTML = "";

    carrito.forEach(item => {
        contenedor.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre} (${item.cantidad})</span>
                <span>$${item.precio * item.cantidad}</span>
                <button class="eliminar-item" data-id="${item.id}">X</button>
            </div>
        `;
    });

    // Calcular total
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalTexto.textContent = "Total: $" + total;

    activarBotonesEliminar();
}

// --------------------------------------------------
// ELIMINAR PRODUCTOS
// --------------------------------------------------
function activarBotonesEliminar() {
    const botones = document.querySelectorAll(".eliminar-item");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = Number(boton.dataset.id);

            carrito = carrito.filter(item => item.id !== id);

            guardarCarrito();
            mostrarCarrito();
        });
    });
}

// --------------------------------------------------
// BOTÓN PARA MOSTRAR / OCULTAR CARRITO
// --------------------------------------------------
document.getElementById("btn-carrito").addEventListener("click", () => {
    document.getElementById("carrito-contenedor").classList.toggle("carrito-oculto");
});

// --------------------------------------------------
// BOTÓN VACÍAR CARRITO
// --------------------------------------------------
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});

// --------------------------------------------------
// ACTIVAR MENÚ DE CATEGORÍAS
// --------------------------------------------------
function activarMenuInterno() {
    const enlaces = document.querySelectorAll(".categoria");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", e => {
            e.preventDefault();
            const categoria = normalizarCategoria(enlace.textContent);
            mostrarProductos(categoria);
        });
    });
}

// Normalizar texto del menú
function normalizarCategoria(texto) {
    const t = texto.toLowerCase();
    if (t.includes("remera")) return "remeras";
    if (t.includes("buzo") || t.includes("campera")) return "buzos";
    if (t.includes("jean")) return "jeans";
    if (t.includes("camisa")) return "camisas";
    if (t.includes("bermuda")) return "bermudas";
    if (t.includes("baño")) return "short";
    if (t.includes("boxer")) return "boxers";
}

// --------------------------------------------------
// INICIO
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    activarMenuInterno();
    mostrarCarrito(); // cargar carrito previo
});