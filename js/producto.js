// Funciones de producto

function agregarAlCarrito(){
    const sesion = sessionStorage.getItem("sesionActiva");

    if(sesion===null){
        window.top.location.href = "../inicio-sesion.html";
        return;
    }

    window.location.href = "carrito.html";
}