// registro
//obtener lo que tenga el id "formulario-registro" y guadar en una variable.
const formulario = document.getElementById("formulario-registro");

//cuando alguien intente enviarte, ejecuta estas instruciones
formulario.addEventListener("submit", (evento) => {

    //la paina no se recarga ni se va a otra pagina antes que js pueda revisar
    //los datos
    evento.preventDefault();

    //busca en el campo, toma lo que escribio y lo guarda, trim quita los espacios
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    //busca en el almacenamineto del localstorage una lista llamada cuentas, si no existe
    //usa una lista vacia
    const cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

    //revisa cada cuenta guardada .some() pregunta si al menos una tiene el mismo correoque se acaba de escribir
    //el resultado sera verdadero si lo encuentra y false si no

    const emailRegistrado = cuentas.some(cuenta => cuenta.email === email);

    if (emailRegistrado) {
        alert("El correo ya está registrado. Por favor, utiliza otro correo.");
        //termina la ejecucion, asi no agrega otra cuenta con el mismo correo
        return;
    }

    //agrega una cuenta nueva a la lista, guarda el nombre de usuario, cooreo y contrasela
    cuentas.push({ usuario, email, contrasena });
    //guarda la lista actualizada en el localstorage
    localStorage.setItem("cuentas", JSON.stringify(cuentas)); //convierte en texto stringify

    //muestra un aviso para confirmar que la cuenta se creo
    alert("Cuenta creada correctamente");

    //despues del aviso, lleva a la pagina index
    window.location.href = "index.html";
}
);