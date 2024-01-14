
const categoriasValidas = [
    { nombre: "LEGENDARIA", precio: 1820 },
    { nombre: "DEFINITIVA", precio: 3250 },
    { nombre: "EPICA", precio: 1350 },
    { nombre: "COMUN", precio: 975 },
    { nombre: "MITICA", precio: 4750 }
];

let premium = obtenerTipoUsuario();
let rpDisponibles = 10000; // 10.000 RP por cada usuario que ingresa por primera vez.

class skin {
    constructor(categoria) {
        this.categoria = categoria;
        this.precio = categoriasValidas.find(item => item.nombre === categoria).precio;
        this.premium = premium;
    }

    resumen() {
        alert(`Elegiste comprar en categorías ${this.categoria.toLowerCase()}. Tenemos precios de ${this.precio} RP.`);
    }

    agregarAlCarrito(carrito) {
        carrito.push({ categoria: this.categoria, precio: this.precio });
        console.log(`Añadiste la skin ${this.categoria} al carrito.`);
        resumenCarrito(carrito);
    }
}

let cardsMostradas = false;

function mostrarCards() {
    if (!cardsMostradas) {
        const container = document.getElementById("container");

        const categoriasFiltradas = categoriasValidas.filter(categoria => ["MITICA", "LEGENDARIA", "COMUN", "DEFINITIVA", "EPICA"].includes(categoria.nombre));

        categoriasFiltradas.forEach(categoria => {
            const card = document.createElement("div");
            card.className = "card";

            const title = document.createElement("h3");
            title.textContent = categoria.nombre;

            const price = document.createElement("p");
            price.textContent = `Precio: ${categoria.precio} RP`;

            const addButton = document.createElement("button");
            addButton.textContent = "Añadir al carrito";
            addButton.addEventListener("click", function () {
                const skinElegida = new skin(categoria.nombre);
                skinElegida.agregarAlCarrito(carrito);
            });

            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(addButton);

            container.appendChild(card);
        });

        //card para finalizar la compra del usuario
        const finalizarCompraCard = document.createElement("div");
        finalizarCompraCard.className = "card";

        const finalizarCompraButton = document.createElement("button");
        finalizarCompraButton.textContent = "Finalizar Compra";
        finalizarCompraButton.addEventListener("click", function () {
            confirmarCompra();
        });

        finalizarCompraCard.appendChild(finalizarCompraButton);
        container.appendChild(finalizarCompraCard);

        cardsMostradas = true;
    }
}

function elegirSkin() {
    mostrarCards();
}

function obtenerTipoUsuario() {
    const opcion = prompt("¿Eres usuario premium?\n1. Sí\n2. No");

    if (opcion === "1") {
        return true;  // El usuario es premium
    } else if (opcion === "2") {
        return false;  // Usuario no premium
    } else {
        alert("Opción no válida. Se asumirá que no eres usuario premium.");
        return false;  // Si el usuario no pone ninguna opcion se le asigna la categoria no premium.
    }
}

let carrito = [];

alert(`¡Bienvenido a la tienda online de League of Legends! Por ser tu primer ingreso a nuestra tienda tienes ${rpDisponibles} RP para gastar.`);
elegirSkin();
elegirSkin();
elegirSkin();

function calcularValorTotal(carrito) {
    let valorTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        valorTotal += carrito[i].precio;
    }

    return valorTotal;
}

function aplicarDescuentoTotal(carrito, premium) {
    let valorTotal = calcularValorTotal(carrito);

    if (premium) {
        const descuentoPremium = 0.5;
        valorTotal *= 1 - descuentoPremium;
        alert(`¡Felicidades! Como usuario premium, se le aplicó un descuento del 50% en el valor total.`);
    }

    return valorTotal;
}

function confirmarCompra() {
    const valorTotal = aplicarDescuentoTotal(carrito, premium);

    if (rpDisponibles >= valorTotal) {
        const confirmacion = confirm(`¿Deseas confirmar la compra por un valor total de ${valorTotal} RP?`);

        if (confirmacion) {
            alert("Compra realizada con éxito!");
            rpDisponibles -= valorTotal;
            console.log(`RP restantes: ${rpDisponibles}`);
            carrito = [];
            mostrarCards(); // Volver a mostrar las tarjetas para una nueva compra
        } else {
            alert("Compra cancelada.");
        }
    } else {
        alert("No dispones de fondos suficientes para realizar esta compra.");
    }
}

function resumenCarrito(carrito) {
    let mensajeCarrito = "Resumen del carrito:\n";

    for (let i = 0; i < carrito.length; i++) {
        mensajeCarrito += `${carrito[i].categoria}: ${carrito[i].precio} RP\n`;
    }

    const valorTotal = aplicarDescuentoTotal(carrito, premium);

    if (premium) {
        mensajeCarrito += `\nValor total de la compra (con descuento premium): ${valorTotal} RP`;
    } else {
        mensajeCarrito += `\nValor total de la compra (sin descuento premium): ${valorTotal} RP`;
    }

    console.log(mensajeCarrito);
}
