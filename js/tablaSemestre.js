let filaSeleccionada = null;

// BOTÓN BUSCAR
function filtrarTablaSemestre() {
  const buscador = document.getElementById("buscador");
  const textoBuscado = buscador.value.trim().toLowerCase();
  if (!textoBuscado) {
    alert("Por favor ingrese el semestre a buscar.");
    return;
  }

  const filas = document.querySelectorAll("#tablaSemestre tbody tr");
  let encontrado = false;

  // Limpiar selección previa
  filas.forEach(fila => fila.classList.remove("seleccionada"));

  filas.forEach(fila => {
    const nombreSemestre = fila.cells[1].textContent.trim().toLowerCase();
    if (nombreSemestre === textoBuscado) {
      fila.classList.add("seleccionada");
      filaSeleccionada = fila;
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("No se encontró ningún semestre con ese nombre: " + textoBuscado);
  }

  buscador.value = ""; // Limpiar campo buscador después de buscar
}

// SELECCIÓN DE FILA VISUAL
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#tablaSemestre tbody tr").forEach(fila => {
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
  const clickedInsideTable = e.target.closest("#tablaSemestre");
  const clickedInsideBuscador = e.target.closest(".buscador-container");
  const clickedInsideModal = e.target.closest(".modal");
  if (clickedInsideTable || clickedInsideBuscador || clickedInsideModal) return;
  filaSeleccionada.classList.remove("seleccionada");
  filaSeleccionada = null;
});

// BOTÓN AGREGAR
function abrirModalSemestre() {
  document.getElementById('modalSemestre').style.display = 'block';
  document.getElementById("formularioSemestre").reset();
}

function cerrarModalSemestre() {
  document.getElementById('modalSemestre').style.display = 'none';
  document.getElementById("formularioSemestre").reset();
}

document.getElementById('formularioSemestre').addEventListener('submit', function(e) {
  e.preventDefault();
  cerrarModalSemestre();
});

// BOTÓN MOSTRAR
function abrirModalMostrarSemestre() {
  if (!filaSeleccionada) {
    alert("Primero selecciona un semestre de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos para mostrar.");
    return;
  }

  const c = filaSeleccionada.cells;
  document.getElementById("mostrarNombreSemestre").textContent = c[1].textContent;

  document.getElementById("modalMostrarSemestre").style.display = "flex";
}

function cerrarModalMostrarSemestre() {
  document.getElementById("modalMostrarSemestre").style.display = "none";
}

// BOTÓN ELIMINAR
function eliminarSemestre() {
  const buscador = document.getElementById("buscador");
  const texto = buscador.value.trim().toLowerCase();

  if (filaSeleccionada) {
    const primeraCelda = filaSeleccionada.cells[0].textContent.trim();
    if (primeraCelda === "") {
      alert("Esa fila no contiene datos. No se puede eliminar.");
      return;
    }

    alert("Este semestre simulado como eliminado: " + filaSeleccionada.innerText);
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;

  } else if (texto !== "") {
    const filas = document.querySelectorAll("#tablaSemestre tbody tr");
    let encontrado = false;

    filas.forEach(fila => {
      const primeraCelda = fila.cells[0].textContent.trim();
      const textoFila = fila.innerText.toLowerCase();

      if (primeraCelda !== "" && textoFila.includes(texto) && !encontrado) {
        alert("Este semestre simulado como eliminado: " + fila.innerText);
        encontrado = true;
      }
    });

    if (!encontrado) {
      alert("No se encontró ningún semestre con ese dato o la fila está vacía.");
    }

  } else {
    alert("Selecciona una fila con datos o escribe algo en el buscador.");
  }

  buscador.value = ""; // Limpiar campo buscador después de eliminar
}

// BOTÓN MODIFICAR
function abrirModalModificarSemestre() {
  if (!filaSeleccionada) {
    alert("Primero selecciona un semestre de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos.");
    return;
  }

  const celdas = filaSeleccionada.querySelectorAll("td");
  document.getElementById("inputNombreSemestre").value = celdas[1].textContent;

  document.getElementById("modalModificarSemestre").style.display = "flex";
}

function cerrarModalModificarSemestre() {
  document.getElementById("modalModificarSemestre").style.display = "none";
  if (filaSeleccionada) {
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;
  }
  document.getElementById("formularioModificarSemestre").reset();
}

document.getElementById("formularioModificarSemestre").addEventListener("submit", function(e) {
  e.preventDefault();
  cerrarModalModificarSemestre();
});



