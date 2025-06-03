let filaSeleccionada = null;

// BOTÓN BUSCAR
function filtrarTablaCategoriaMaterial() {
  const buscador = document.getElementById("buscador");
  const textoBuscado = buscador.value.trim().toLowerCase();
  if (!textoBuscado) {
    alert("Por favor ingrese la categoría material a buscar.");
    return;
  }

  const filas = document.querySelectorAll("#tablaCategoriaMaterial tbody tr");
  let encontrado = false;

  // Limpiar selección previa
  filas.forEach(fila => fila.classList.remove("seleccionada"));

  filas.forEach(fila => {
    const nombreCategoria = fila.cells[1].textContent.trim().toLowerCase();
    if (nombreCategoria === textoBuscado) {
      fila.classList.add("seleccionada");
      filaSeleccionada = fila;
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("No se encontró ninguna categoría material con ese nombre: " + textoBuscado);
  }

  buscador.value = ""; // Limpiar campo buscador después de buscar
}

// SELECCIÓN DE FILA VISUAL
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#tablaCategoriaMaterial tbody tr").forEach(fila => {
    fila.addEventListener("click", e => {
      e.stopPropagation();
      if (filaSeleccionada) filaSeleccionada.classList.remove("seleccionada");
      filaSeleccionada = fila;
      filaSeleccionada.classList.add("seleccionada");
    });
  });
});

// DESELECCIONAR AL HACER CLIC FUERA
document.addEventListener("click", e => {
  if (!filaSeleccionada) return;
  const clickedInsideTable = e.target.closest("#tablaCategoriaMaterial");
  const clickedInsideBuscador = e.target.closest(".buscador-container");
  const clickedInsideModal = e.target.closest(".modal");
  if (clickedInsideTable || clickedInsideBuscador || clickedInsideModal) return;
  filaSeleccionada.classList.remove("seleccionada");
  filaSeleccionada = null;
});

// BOTÓN AGREGAR
function abrirModalCategoriaMaterial() {
  document.getElementById('modalCategoriaMaterial').style.display = 'block';
  document.getElementById("formularioCategoriaMaterial").reset();
}

function cerrarModalCategoriaMaterial() {
  document.getElementById('modalCategoriaMaterial').style.display = 'none';
  document.getElementById("formularioCategoriaMaterial").reset();
}

document.getElementById('formularioCategoriaMaterial').addEventListener('submit', function(e) {
  e.preventDefault();
  cerrarModalCategoriaMaterial();
});

// BOTÓN MOSTRAR
function abrirModalMostrarCategoriaMaterial() {
  if (!filaSeleccionada) {
    alert("Primero selecciona una categoría material de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos para mostrar.");
    return;
  }

  const c = filaSeleccionada.cells;
  document.getElementById("mostrarNombreCategoriaMaterial").textContent = c[1].textContent;

  document.getElementById("modalMostrarCategoriaMaterial").style.display = "flex";
}

function cerrarModalMostrarCategoriaMaterial() {
  document.getElementById("modalMostrarCategoriaMaterial").style.display = "none";
}

// BOTÓN ELIMINAR
function eliminarCategoriaMaterial() {
  const buscador = document.getElementById("buscador");
  const texto = buscador.value.trim().toLowerCase();

  if (filaSeleccionada) {
    const primeraCelda = filaSeleccionada.cells[0].textContent.trim();
    if (primeraCelda === "") {
      alert("Esa fila no contiene datos. No se puede eliminar.");
      return;
    }

    alert("Esta categoría material simulada como eliminada: " + filaSeleccionada.innerText);
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;

  } else if (texto !== "") {
    const filas = document.querySelectorAll("#tablaCategoriaMaterial tbody tr");
    let encontrado = false;

    filas.forEach(fila => {
      const primeraCelda = fila.cells[0].textContent.trim();
      const textoFila = fila.innerText.toLowerCase();

      if (primeraCelda !== "" && textoFila.includes(texto) && !encontrado) {
        alert("Esta categoría material simulada como eliminada: " + fila.innerText);
        encontrado = true;
      }
    });

    if (!encontrado) {
      alert("No se encontró ninguna categoría material con ese dato o la fila está vacía.");
    }

  } else {
    alert("Selecciona una fila con datos o escribe algo en el buscador.");
  }

  buscador.value = ""; // Limpiar campo buscador después de eliminar
}

// BOTÓN MODIFICAR
function abrirModalModificarCategoriaMaterial() {
  if (!filaSeleccionada) {
    alert("Primero selecciona una categoría material de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos.");
    return;
  }

  const celdas = filaSeleccionada.querySelectorAll("td");
  document.getElementById("inputNombreCategoriaMaterial").value = celdas[1].textContent;

  document.getElementById("modalModificarCategoriaMaterial").style.display = "flex";
}

function cerrarModalModificarCategoriaMaterial() {
  document.getElementById("modalModificarCategoriaMaterial").style.display = "none";
  if (filaSeleccionada) {
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;
  }
  document.getElementById("formularioModificarCategoriaMaterial").reset();
}

document.getElementById("formularioModificarCategoriaMaterial").addEventListener("submit", function(e) {
  e.preventDefault();
  cerrarModalModificarCategoriaMaterial();
});



