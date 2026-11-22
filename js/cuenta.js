// cuenta
//busca en sessionStorage los datos de quien inicio sesion
const datosSesion = sessionStorage.getItem("sesionActiva");

//si no hay sesion guardada, muestra un aviso y vuelve al login
if (!datosSesion) {
    alert("Inicia sesión para ver tu cuenta.");
    window.top.location.href = "../inicio-sesion.html";
} else {
    //convierte los datos guardados en texto para que se pueda leer
    const usuario = JSON.parse(datosSesion);

    //busca los espacios donde se mostraran el nombre y el correo
    const nombreUsuario = document.getElementById("nombre-usuario");
    const correoUsuario = document.getElementById("correo-usuario");
    const campoNombre = document.getElementById("campo-nombre");
    const campoCorreo = document.getElementById("campo-correo");
    const campoTelefono = document.getElementById("campo-telefono");
    const botonGuardar = document.getElementById("btn-guardar");

    // Busca la cuenta actual en la lista guardada durante el registro.
    const cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    const cuentaActual = cuentas.find(
        cuenta => cuenta.email.toLowerCase() === usuario.email.toLowerCase()
    );

    //muestra el nombre y el correo guardado al iniciar sesion
    nombreUsuario.textContent = usuario.usuario;
    correoUsuario.textContent = usuario.email;
    campoNombre.value = usuario.usuario;
    campoCorreo.value = usuario.email;
    campoTelefono.value = cuentaActual?.telefono || "";

    // Guarda el teléfono en la cuenta para que siga disponible después.
    botonGuardar.addEventListener("click", () => {
        if (!cuentaActual) {
            alert("No se encontró la cuenta.");
            return;
        }

        cuentaActual.telefono = campoTelefono.value.trim();
        localStorage.setItem("cuentas", JSON.stringify(cuentas));
        alert("Teléfono guardado.");
    });
}

// Cierra la sesión actual y regresa al inicio
function cerrarSesion() {
    sessionStorage.removeItem("sesionActiva");
    window.top.location.href = "../index.html";
}
