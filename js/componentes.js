function incluirComponente(id, archivo) {
  fetch(archivo)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error("No se pudo cargar el componente: " + archivo);
      }
      return respuesta.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  incluirComponente("encabezado", "../nav/encabezado.html");
  incluirComponente("menu", "../nav/menu.html");
  incluirComponente("footer", "../nav/footer.html");

 
});