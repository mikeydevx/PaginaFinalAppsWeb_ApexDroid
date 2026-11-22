function abrir(ruta) {
  const sesion = sessionStorage.getItem("sesionActiva");

  if(ruta !== "ventanas/producto.html" && sesion == null){
    window.location.href ="inicio-sesion.html";
    return;
  }

  document.getElementById("marco").src = ruta;
}
