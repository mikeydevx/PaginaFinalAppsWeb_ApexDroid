function abrir(ruta) {
  const sesion = sessionStorage.getItem("sesisionActiva");

  if(ruta !== "ventanas/producto.html" && sesion == null){
    window.location.href ="inicio-sesion.html";
    return;
  }

  document.getElementById("marco").src = ruta;
}
