// carrito

//donde se mostrara la lista de los productos
const listaProductos = document.getElementById("lista-productos");

//para saber quien esta en la sesion
const sesion = sessionStorage.getItem("sesionActiva");

//para usar la misma clave al mostrar y al borrar un producto
let clave = "";

if (sesion === null) {
    window.top.location.href = "../inicio-sesion.html";
} else {
    //recuperamos el correo del usuario que inicio sesion
    const usuario = JSON.parse(sesion);

    //usamos la misma clave con la que producto.js guardo el carrito
    clave = "carrito_" + usuario.email;

    //mostramos los productos del usuario
    mostrarCarrito();
}

function mostrarCarrito() {
    //lee la lista de los productos guardados
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];

    if (carrito.length > 0) {
        document.getElementById("btnContinuar").classList.remove("d-none");
        //quitamos el mensaje de que el carrito esta vacio
        listaProductos.textContent = "";

        //el subtotal empieza en 0
        let subtotal = 0;

        //por cada producto guardado, agrega un parrafo con su nombre
        carrito.forEach((producto, indice) => {
            const parrafo = document.createElement("p");

            //para mostrar el nombre y el precio del producto
            parrafo.className = "producto-carrito";

            //muestra el nombre del producto dentro de la tarjeta
            parrafo.textContent = producto.nombre;

            //recupera la ruta de la foto que guardamos en producto.js
            let rutaImagen = producto.imagen;

            //por ahora solo probamos con la que tenemos guardada
            if (!rutaImagen && producto.nombre.startsWith("Laptop Lenovo ThinkPad T16 Gen 4")) {
                rutaImagen = "../assets/img/productos/producto1.png";
            }

            if (rutaImagen) {
                //crea la imagen y le asigna su ruta
                const foto = document.createElement("img");
                foto.src = rutaImagen;

                //el nombre ya aparece junto a la foto
                foto.alt = "";

                //coloca la foto al principio de la tarjeta, antes del nombre
                parrafo.prepend(foto);
            }

            //creamos el espacio separado para destacar el precio
            const precio = document.createElement("strong");

            //mostramos el precio
            precio.textContent = "$" + producto.precio.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            //colocamos el precio dentro de la misma tarjeta que el nombre
            parrafo.appendChild(precio);

            //creamos el boton de eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "btn btn-outline-danger btn-sm";

            //al dar clic mandamos la posicion del producto que queremos borrar
            botonEliminar.setAttribute("onclick", "borrarProducto(" + indice + ")");

            //colocamos el boton dentro de la tarjeta
            parrafo.appendChild(botonEliminar);

            //suma el precio de este producto al subtotal que ya llevamos
            subtotal = subtotal + producto.precio;

            //mostramos la tarjeta en la lista de productos
            listaProductos.appendChild(parrafo);
        });

        //para mostrar el subtotal
        document.getElementById("subtotal-carrito").textContent = "$" + subtotal.toFixed(2);

        //para sumar lo del envio del productot
        const total = subtotal + 150;

        //para mostrar el total
        document.getElementById("total-carrito").textContent = "$" + total.toFixed(2);
    } else {
        //si ya no quedan productos mostramos el mensaje y dejamos los precios en cero
        listaProductos.textContent = "Tu carrito está vacío.";
        //si el carrito esta vacio ocultamos el boton de envio
        document.getElementById("btnContinuar").classList.add("d-none");
        document.getElementById("subtotal-carrito").textContent = "$0.00";
        document.getElementById("total-carrito").textContent = "$0.00";
    }
}

//para borrar el producto que seleccionamos
function borrarProducto(indice) {
    //lee la lista de los productos guardados
    const carrito = JSON.parse(localStorage.getItem(clave)) || [];

    //quita un solo producto en la posicion de esta tarjeta
    carrito.splice(indice, 1);

    //guarda la lista actualizada en el carrito
    localStorage.setItem(clave, JSON.stringify(carrito));

    //volvemos a mostrar los productos para actualizar la lista y el total
    mostrarCarrito();
}