// metodo de pago

const sesion = sessionStorage.getItem("sesionActiva");
if(sesion===null){
    window.top.location.href = "../inicio-sesion.html";
}else{
    //usamos el correo para buscar el carrito de ese usuario

    const usuario = JSON.parse(sesion);
    const clave = "carrito_" + usuario.email;



const carrito = JSON.parse(localStorage.getItem(clave)) || [];

if (carrito.length===0) {
    //si el carrito esta vacio regresamos al carrito
    window.location.href ="carrito.html";
}else{
    //sumamos el precio de cada producto
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal = subtotal + producto.precio;
    });

    //sumamos los 150 pesos de envio una sola vez
    const total = subtotal + 150;

    //mostramos los importes en el resumen de pago
    document.getElementById("subtotal-pago").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("total-pago").textContent = "$" + total.toFixed(2);

    const formulario = document.getElementById("form-metodo-pago");

    //buscamos las dos opciones de pago y el grupo de datos de la tarjeta
    const opcionTarjeta = document.getElementById("pago-tarjeta");
    const opcionTransferencia = document.getElementById("pago-transferencia");
    const datosTarjeta = document.getElementById("datos-tarjeta");

    //revisamos cual metodo de pago esta seleccionado
    function mostrarDatosTarjeta() {
        if (opcionTarjeta.checked) {
            //mostramos los campos y permitimos escribir en ellos
            datosTarjeta.classList.remove("d-none");
            datosTarjeta.disabled = false;
        } else {
            //ocultamos los campos para que transferencia pueda continuar
            datosTarjeta.classList.add("d-none");
            datosTarjeta.disabled = true;
        }
    }

    //actualizamos los campos cuando el usuario cambia de opcion
    opcionTarjeta.addEventListener("change", mostrarDatosTarjeta);
    opcionTransferencia.addEventListener("change", mostrarDatosTarjeta);

    //revisamos la opcion que aparece marcada al abrir la pagina
    mostrarDatosTarjeta();

    //cuando el usuario presiona confirmar pedido
    formulario.addEventListener("submit", function (evento) {
    //evitamos que se recargue la pagina
    evento.preventDefault();

    //revisamos si el usuario marco tarjeta de credito o debito
    const tarjeta = document.getElementById("pago-tarjeta");

    //guardamos el metodo que selecciono el usuario
    let metodoPago = "transferencia";

    if (tarjeta.checked) {
        metodoPago = "tarjeta";
    }

    //juntamos los datos de la compra en un pedido
    const pedido = {
        productos: carrito,
        metodoPago: metodoPago,
        subtotal: subtotal,
        envio: 150,
        total: total
    };

    //mostramos el resumen del pedido
    alert("Pedido de prueba con " + pedido.metodoPago +
        "\nTotal con envio: $" + pedido.total.toFixed(2));
    });
    
}
}