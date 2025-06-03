let filaSeleccionada = null;

// BOTÓN BUSCAR
function filtrarTabla() {
  const buscador = document.getElementById("buscador");
  const programaBuscado = normalizarTexto(buscador.value.trim());

  if (!programaBuscado) {
    alert("Por favor ingresa un programa académico.");
    return;
  }

  const filas = document.querySelectorAll("#tablaUsuarios tbody tr");
  let encontrado = false;

  filas.forEach(fila => fila.classList.remove("seleccionada"));

  filas.forEach(fila => {
    const celdaPrograma = normalizarTexto(fila.cells[1].textContent.trim());
    if (celdaPrograma === programaBuscado) {
      fila.classList.add("seleccionada");
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("No se encontró ningún programa académico con ese nombre: " + buscador.value.trim());
  }

  buscador.value = "";
}

// Elimina tildes y convierte a minúsculas
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}



// SELECCIÓN DE FILA VISUAL
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#tablaUsuarios tbody tr").forEach(fila => {
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
  const clickedInsideTable = e.target.closest("#tablaUsuarios");
  const clickedInsideBuscador = e.target.closest(".buscador-container");
  const clickedInsideModal = e.target.closest(".modal-contenido");
  if (clickedInsideTable || clickedInsideBuscador || clickedInsideModal) return;
  filaSeleccionada.classList.remove("seleccionada");
  filaSeleccionada = null;
});

// BOTÓN AGREGAR
function abrirModalAgregar() {
  document.getElementById('modal').style.display = 'block';
  document.getElementById("formularioUsuario").reset(); // Limpieza explícita al abrir por si quedó algo
}

function cerrarModalAgregar() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById("formularioUsuario").reset();
}

document.getElementById('formularioUsuario').addEventListener('submit', function(e) {
  e.preventDefault();
  cerrarModalAgregar();
});

// BOTÓN MOSTRAR (MODIFICADO)
function abrirModalMostrar() {
  if (!filaSeleccionada) {
    alert("Selecciona primero un usuario con información.");
    return;
  }

  const primeraCelda = filaSeleccionada.cells[0].textContent.trim();
  if (primeraCelda === "") {
    alert("Esa fila no contiene datos para mostrar.");
    return;
  }

  const c = filaSeleccionada.cells;
  document.getElementById("mostrarPrograma").textContent            = c[1].textContent;
  document.getElementById("modalMostrar").style.display = "flex";
}

function cerrarModalMostrar() {
  document.getElementById("modalMostrar").style.display = "none";
}

// BOTÓN ELIMINAR (con validación de fila vacía)
function abrirModalEliminar() {
  const buscador = document.getElementById("buscador");
  const texto = buscador.value.trim().toLowerCase();

  if (filaSeleccionada) {
    const primeraCelda = filaSeleccionada.cells[0].textContent.trim();
    if (primeraCelda === "") {
      alert("Esa fila no contiene datos. No se puede eliminar.");
      return;
    }

    alert("Programa simulado como eliminado: " + filaSeleccionada.innerText);
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;

  } else if (texto !== "") {
    const filas = document.querySelectorAll("tbody tr");
    let encontrado = false;

    filas.forEach(fila => {
      const primeraCelda = fila.cells[0].textContent.trim();
      const textoFila = fila.innerText.toLowerCase();

      if (primeraCelda !== "" && textoFila.includes(texto) && !encontrado) {
        alert("Programa simulado como eliminado: " + fila.innerText);
        encontrado = true;
      }
    });

    if (!encontrado) {
      alert("No se encontró ningún programa con ese dato o la fila está vacía.");
    }

  } else {
    alert("Selecciona una fila con datos o escribe algo en el buscador.");
  }

  buscador.value = ""; // Limpiar campo buscador después de eliminar
}

// BOTÓN MODIFICAR
function abrirModalModificar() {
  if (!filaSeleccionada) {
    alert("Primero selecciona un programa de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos.");
    return;
  }

  const celdas = filaSeleccionada.querySelectorAll("td");
  document.getElementById("inputPrograma").value             = celdas[1].textContent;
  document.getElementById("modalModificar").style.display = "flex";
}

function cerrarModalModificar() {
  document.getElementById("modalModificar").style.display = "none";
  if (filaSeleccionada) {
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;
  }
  document.getElementById("formularioModificar").reset();
}

document.getElementById("formularioModificar").addEventListener("submit", function(e) {
  e.preventDefault();
  cerrarModalModificar();
});
