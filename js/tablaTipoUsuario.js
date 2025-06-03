let filaSeleccionada = null;

// BOTÓN BUSCAR
function filtrarTablaTipoUsuario() {
  const buscador = document.getElementById("buscador");
  const textoBuscado = buscador.value.trim().toLowerCase();
  if (!textoBuscado) {
    alert("Por favor ingrese el tipo de usuario a buscar.");
    return;
  }

  const filas = document.querySelectorAll("#tablaTipoUsuario tbody tr");
  let encontrado = false;

  // Limpiar selección previa
  filas.forEach(fila => fila.classList.remove("seleccionada"));

  filas.forEach(fila => {
    const nombreTipoUsuario = fila.cells[1].textContent.trim().toLowerCase();
    if (nombreTipoUsuario === textoBuscado) {
      fila.classList.add("seleccionada");
      filaSeleccionada = fila;
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("No se encontró ningún tipo de usuario con ese nombre: " + textoBuscado);
  }

  buscador.value = ""; // Limpiar campo buscador después de buscar
}

// SELECCIÓN DE FILA VISUAL
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#tablaTipoUsuario tbody tr").forEach(fila => {
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
  const clickedInsideTable = e.target.closest("#tablaTipoUsuario");
  const clickedInsideBuscador = e.target.closest(".buscador-container");
  const clickedInsideModal = e.target.closest(".modal");
  if (clickedInsideTable || clickedInsideBuscador || clickedInsideModal) return;
  filaSeleccionada.classList.remove("seleccionada");
  filaSeleccionada = null;
});

// BOTÓN AGREGAR
function abrirModalTipoUsuario() {
  document.getElementById('modalTipoUsuario').style.display = 'block';
  document.getElementById("formularioTipoUsuario").reset();
}

function cerrarModalTipoUsuario() {
  document.getElementById('modalTipoUsuario').style.display = 'none';
  document.getElementById("formularioTipoUsuario").reset();
}

document.getElementById('formularioTipoUsuario').addEventListener('submit', function(e) {
  e.preventDefault();
  cerrarModalTipoUsuario();
});

// BOTÓN MOSTRAR
function abrirModalMostrarTipoUsuario() {
  if (!filaSeleccionada) {
    alert("Primero selecciona un tipo de usuario de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos para mostrar.");
    return;
  }

  const c = filaSeleccionada.cells;
  document.getElementById("mostrarNombreTipoUsuario").textContent = c[1].textContent;

  document.getElementById("modalMostrarTipoUsuario").style.display = "flex";
}

function cerrarModalMostrarTipoUsuario() {
  document.getElementById("modalMostrarTipoUsuario").style.display = "none";
}

// BOTÓN ELIMINAR
function eliminarTipoUsuario() {
  const buscador = document.getElementById("buscador");
  const texto = buscador.value.trim().toLowerCase();

  if (filaSeleccionada) {
    const primeraCelda = filaSeleccionada.cells[0].textContent.trim();
    if (primeraCelda === "") {
      alert("Esa fila no contiene datos. No se puede eliminar.");
      return;
    }

    alert("Tipo de usuario simulado como eliminado: " + filaSeleccionada.innerText);
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;

  } else if (texto !== "") {
    const filas = document.querySelectorAll("#tablaTipoUsuario tbody tr");
    let encontrado = false;

    filas.forEach(fila => {
      const primeraCelda = fila.cells[0].textContent.trim();
      const textoFila = fila.innerText.toLowerCase();

      if (primeraCelda !== "" && textoFila.includes(texto) && !encontrado) {
        alert("Tipo de usuario simulado como eliminado: " + fila.innerText);
        encontrado = true;
      }
    });

    if (!encontrado) {
      alert("No se encontró ningún tipo de usuario con ese dato o la fila está vacía.");
    }

  } else {
    alert("Selecciona una fila con datos o escribe algo en el buscador.");
  }

  buscador.value = ""; // Limpiar campo buscador después de eliminar
}

// BOTÓN MODIFICAR
function abrirModalModificarTipoUsuario() {
  if (!filaSeleccionada) {
    alert("Primero selecciona un tipo de usuario de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos.");
    return;
  }

  const celdas = filaSeleccionada.querySelectorAll("td");
  document.getElementById("inputNombreTipoUsuario").value = celdas[1].textContent;

  document.getElementById("modalModificarTipoUsuario").style.display = "flex";
}

function cerrarModalModificarTipoUsuario() {
  document.getElementById("modalModificarTipoUsuario").style.display = "none";
  if (filaSeleccionada) {
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;
  }
  document.getElementById("formularioModificarTipoUsuario").reset();
}

document.getElementById("formularioModificarTipoUsuario").addEventListener("submit", function(e) {
  e.preventDefault();
  cerrarModalModificarTipoUsuario();
});



