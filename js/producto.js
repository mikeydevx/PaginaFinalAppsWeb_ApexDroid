// Funciones de producto

//Esta función se ejecuta cuando el usuario pulsa agregar al carrito
function agregarAlCarrito(){

    //busca en esta pestaña la sesion que guardo inicio de sesion
    const sesion = sessionStorage.getItem("sesionActiva");

    //si no exite una sesion, getItem devuelve null
    if(sesion===null){
        //es para abrir el login
        window.top.location.href = "../inicio-sesion.html";
        return;
    }

    //convierte el texto de la sesion en un objeto para poder leer usuario.email
    const usuario = JSON.parse(sesion);

    //forma una clave para este usuario
    const clave = "carrito_" + usuario.email;

    //recupera su lista de productos, si es una primera compra empieza con vacio
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];

    //busca el titulo h5 para obtener el nombre del producto
    const nombre = document.querySelector("h5").textContent.trim();

    //lee el precio tal como aparece en la pantalla
    const textPrecio = document.querySelector(".precio-oferta").textContent;

    // Quita el signo de pesos y la coma antes de convertir el precio a número.
    const precio = Number(textPrecio.replace("$", "").replace(",", ""));

    //leemos la ruta de donde esta la imagen para mostrarla tambien 
    const imagen = document.querySelector(".img-principal").getAttribute("src");

    //guarda los tres datos que necesita la tarjeta
    const producto = {nombre: nombre, precio: precio, imagen: imagen};

    //agrega el producto al final de la lista del carrito
    carrito.push(producto);

    //convierte la lista en texto y la guarda con la clave de este usuario
    localStorage.setItem(clave, JSON.stringify(carrito));

    //una vez guardado el producto, abre la pantalla del carrito

    window.location.href = "carrito.html";
}

//buscamos el corazon y el nombre del producto que estamos viendo
const corazon = document.getElementById("corazon-producto");
const nombreProducto = document.querySelector("h5").textContent.trim();

//revisamos si hay un usuario que ya inicio sesion
const sesionFavoritos = sessionStorage.getItem("sesionActiva");
let claveFavoritos = "";

if (sesionFavoritos !== null) {
    //usamos el correo para que cada usuario tenga sus propios favoritos
    const usuario = JSON.parse(sesionFavoritos);
    claveFavoritos = "favoritos_" + usuario.email;

    //al abrir la pagina revisamos si este producto ya estaba guardado
    const favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];

    if (favoritos.indexOf(nombreProducto) !== -1) {
        corazon.classList.remove("bi-heart");
        corazon.classList.add("bi-heart-fill");
    }
}

//para guardar o quitar el producto cuando se pulsa el corazon
function marcarFavorito() {
    if (sesionFavoritos === null) {
        window.top.location.href = "../inicio-sesion.html";
        return;
    }

    //leemos la lista y buscamos la posicion del producto
    const favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
    const indice = favoritos.indexOf(nombreProducto);

    if (indice === -1) {
        //si no estaba en la lista lo agregamos y rellenamos el corazon
        favoritos.push(nombreProducto);
        corazon.classList.remove("bi-heart");
        corazon.classList.add("bi-heart-fill");
    } else {
        //si ya estaba lo quitamos igual que en el carrito
        favoritos.splice(indice, 1);
        corazon.classList.remove("bi-heart-fill");
        corazon.classList.add("bi-heart");
    }

    //guardamos la lista con los cambios
    localStorage.setItem(claveFavoritos, JSON.stringify(favoritos));
}

