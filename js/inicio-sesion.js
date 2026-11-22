//inicio de sesion
//busca en el html el formulario y guarda los datos en variable
const formulario = document.getElementById("formulario-inicio-sesion");

//se envia el formulario, ejecuta las instrucciones siguientes
formulario.addEventListener("submit", (evento) => {

    //evita que la pagina se refresque 
    evento.preventDefault();

    //busca el campo email, contasena y cguarda en variables
    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value;

    //lee del almacenamiento, si no hy crea, pero si si busca
    const cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

    //revisa la lista para encontrar una cuenta con el mimso correo
    //y la misma contrasena. si encunetra una, la guarda en la variable
    const cuentaEncontrada = cuentas.find(cuenta => cuenta.email === email && cuenta.contrasena === contrasena);

    //si no encunetra una cuenta que coincida, muestra alerta
    if (!cuentaEncontrada) {
        alert("El correo o la contraseña son incorrectos.");
        return;
    }

    //guarda los datos basicos de la cuenta en sessionStorage.
    //se mantienen mientras dure esta sesion del navegador
    sessionStorage.setItem("sesionActiva", JSON.stringify({ usuario: cuentaEncontrada.usuario, email: cuentaEncontrada.email }))

    //si el correo y la contrasena eran correctas
    window.location.href = "index.html";
});
