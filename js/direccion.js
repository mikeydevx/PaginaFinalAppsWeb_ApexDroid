//direccion

//creo variable para guardar la sesion activa y encuento esa cuenta y la obtengo
const sesion = JSON.parse(sessionStorage.getItem("sesionActiva"));
const cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

//busca la cuenta cuyo correo sea igial, guarda la cuenta en cuenta
const cuenta = cuentas.find(c => c.email === sesion.email);

const formulario = document.getElementById("form-direccion");

// Si la cuenta tiene una dirección guardada, la muestra en los campos
if (cuenta && cuenta.direccionEntrega) {
    const direccion = cuenta.direccionEntrega;

    document.getElementById("nombre").value = direccion.nombre || "";
    document.getElementById("telefono").value = direccion.telefono || "";
    document.getElementById("calle").value = direccion.calle || "";
    document.getElementById("numero").value = direccion.numero || "";
    document.getElementById("interior").value = direccion.interior || "";
    document.getElementById("colonia").value = direccion.colonia || "";
    document.getElementById("codigo-postal").value = direccion.codigoPostal || "";
    document.getElementById("ciudad").value = direccion.ciudad || "";
    document.getElementById("estado").value = direccion.estado || "";
    document.getElementById("referencias").value = direccion.referencias || "";
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    //crea dentro de la cuenta una seccion llamada direccion, ahi se guarda los datos
    cuenta.direccionEntrega = {

        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        calle: document.getElementById("calle").value,
        numero: document.getElementById("numero").value,
        interior: document.getElementById("interior").value,
        colonia: document.getElementById("colonia").value,
        codigoPostal: document.getElementById("codigo-postal").value,
        ciudad: document.getElementById("ciudad").value,
        estado: document.getElementById("estado").value,
        referencias: document.getElementById("referencias").value


    };

    localStorage.setItem("cuentas", JSON.stringify(cuentas));

    alert("Dirección de entrega guardada correctamente");
});

