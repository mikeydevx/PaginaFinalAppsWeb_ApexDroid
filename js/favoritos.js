// Funciones de favoritos

//buscamos donde mostrar los productos y el mensaje de lista vacia
const listaFavoritos = document.getElementById("lista-favoritos");
const mensajeVacio = document.getElementById("mensaje-vacio");

//revisamos quien inicio sesion
const sesion = sessionStorage.getItem("sesionActiva");
let claveFavoritos = "";
let claveCarrito = "";

if (sesion === null) {
    //si no hay sesion abrimos el inicio de sesion
    window.top.location.href = "../inicio-sesion.html";
} else {
    //usamos el correo para encontrar los favoritos y el carrito del usuario
    const usuario = JSON.parse(sesion);
    claveFavoritos = "favoritos_" + usuario.email;
    claveCarrito = "carrito_" + usuario.email;

    mostrarFavoritos();
}

//para mostrar los productos que el usuario marco con el corazon
function mostrarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];

    //limpiamos la lista antes de volver a mostrar las tarjetas
    listaFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
        //si no hay favoritos mostramos el mensaje de lista vacia
        mensajeVacio.classList.remove("d-none");
        return;
    }

    mensajeVacio.classList.add("d-none");

    //creamos una tarjeta por cada producto guardado
    favoritos.forEach((nombre, indice) => {
        const columna = document.createElement("div");
        columna.className = "col";

        //agregamos la imagen, el precio y los botones de la tarjeta
        columna.innerHTML = `
            <div class="card h-100 tarjeta-favorito">
                <div class="text-end">
                    <button type="button" class="btn btn-sm"
                            onclick="quitarFavorito(${indice})">
                        <i class="bi bi-heart-fill icono-corazon"></i>
                        Quitar de favoritos
                    </button>
                </div>

                <img src="../assets/img/productos/producto1.png"
                     class="card-img-top img-favorito" alt="Laptop Lenovo">

                <div class="card-body text-center">
                    <h6 class="fw-bold"></h6>
                    <p class="precio-favorito fw-bold">$29,199.00</p>

                    <a href="producto.html" class="btn btn-ver w-100 mb-2">
                        Ver producto
                    </a>

                    <button type="button" class="btn-carrito-fav w-100"
                            onclick="agregarFavoritoAlCarrito(${indice})">
                        Agregar al carrito
                    </button>
                </div>
            </div>`;

        //mostramos el nombre del producto en la tarjeta
        columna.querySelector("h6").textContent = nombre;
        listaFavoritos.appendChild(columna);
    });
}

//para quitar el favorito que seleccionamos
function quitarFavorito(indice) {
    const favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];

    //quitamos un producto y guardamos la lista actualizada
    favoritos.splice(indice, 1);
    localStorage.setItem(claveFavoritos, JSON.stringify(favoritos));

    //volvemos a mostrar los favoritos que quedan
    mostrarFavoritos();
}

//para agregar al carrito la Lenovo que aparece en favoritos
function agregarFavoritoAlCarrito(indice) {
    const favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
    const carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    //tomamos el nombre seleccionado y los datos de la Lenovo
    const producto = {
        nombre: favoritos[indice],
        precio: 29199,
        imagen: "../assets/img/productos/producto1.png"
    };

    //guardamos el producto y abrimos el carrito
    carrito.push(producto);
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    window.location.href = "carrito.html";
}