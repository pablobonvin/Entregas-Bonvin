// --------------------------------------------------------
// FUNCION CONSTRUCTORA PARA PRODUCTOS
// --------------------------------------------------------
function Producto(id, nombre, categoria, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
}

// --------------------------------------------------------
// ARRAY DE PRODUCTOS (EJEMPLO)
// --------------------------------------------------------
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

// --------------------------------------------------------
// RENDERIZAR PRODUCTOS EN LA PÁGINA
// --------------------------------------------------------
function mostrarProductos(categoria) {
    const contenedor = document.getElementById("productos-dinamicos");

    // Condición: verificar si existe contenedor
    if (!contenedor) {
        console.error("Falta agregar <div id='productos-dinamicos'></div> en el HTML");
        return;
    }

    // Limpiar antes de cargar nuevos productos
    contenedor.innerHTML = "";

    // FILTRAR PRODUCTOS SEGÚN CATEGORÍA (función de orden superior)
    const filtrados = productos.filter(prod => prod.categoria === categoria);

    // Si no hay productos
    if (filtrados.length === 0) {
        contenedor.innerHTML = `<p>No hay productos en esta categoría todavía.</p>`;
        return;
    }

    // Crear tarjetas para cada producto
    filtrados.forEach(prod => {
        contenedor.innerHTML += `
            <div class="card-producto">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
            </div>
        `;
    });
}

// --------------------------------------------------------
// CAPTURAR CLICS DEL MENÚ Y EVITAR IR A LINKS EXTERNOS
// --------------------------------------------------------
function activarMenuInterno() {
    const enlaces = document.querySelectorAll(".productos a");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault(); // Bloquea navegación externa

            // Extraer categoría desde el texto del <a>
            const categoria = normalizarCategoria(enlace.textContent);

            mostrarProductos(categoria);
        });
    });
}

// --------------------------------------------------------
// FUNCIÓN PARA NORMALIZAR CATEGORÍAS
// --------------------------------------------------------
function normalizarCategoria(texto) {
    const t = texto.toLowerCase();

    // Estructura condicional
    if (t.includes("remeras")) return "remeras";
    if (t.includes("chombas")) return "remeras"; // misma categoría
    if (t.includes("buzos")) return "buzos";
    if (t.includes("camperas")) return "buzos";
    if (t.includes("jeans")) return "jeans";
    if (t.includes("camisas")) return "camisas";
    if (t.includes("bermudas")) return "bermudas";
    if (t.includes("baño")) return "short";
    if (t.includes("boxer")) return "boxers";

    return "";
}

// --------------------------------------------------------
// INICIALIZAR AL CARGAR LA PÁGINA
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    activarMenuInterno();
});