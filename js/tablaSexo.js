let filaSeleccionada = null;

// BOTÓN BUSCAR
function filtrarTabla() {
  const buscador = document.getElementById("buscador");
  const idBuscado = buscador.value.trim();
  if (!idBuscado) {
    alert("Por favor ingrese el sexo.");
    return;
  }

  const filas = document.querySelectorAll("#tablaSexo tbody tr");
  let encontrado = false;

  // Limpiar selección previa
  filas.forEach(fila => fila.classList.remove("seleccionada"));

  // Buscar coincidencia exacta en la tercera celda
  filas.forEach(fila => {
    const celdaID = fila.cells[2].textContent.trim();
    if (celdaID === idBuscado) {
      fila.classList.add("seleccionada");
      filaSeleccionada = fila;
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("No se encontró ningúna informacion " + idBuscado);
  }

  buscador.value = ""; // Limpiar campo buscador después de buscar
}

// SELECCIÓN DE FILA VISUAL
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#tablaSexo tbody tr").forEach(fila => {
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
  const clickedInsideTable = e.target.closest("#tablaSexo");
  const clickedInsideBuscador = e.target.closest(".buscador-container");
  const clickedInsideModal = e.target.closest(".modal-contenido");
  if (clickedInsideTable || clickedInsideBuscador || clickedInsideModal) return;
  filaSeleccionada.classList.remove("seleccionada");
  filaSeleccionada = null;
});

// BOTÓN AGREGAR
function abrirModal() {
  document.getElementById('modal').style.display = 'block';
  document.getElementById("formularioSexo").reset(); // Limpieza explícita al abrir por si quedó algo
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById("formularioSexo").reset();
}

document.getElementById('formularioSexo').addEventListener('submit', function(e) {
  e.preventDefault();
  cerrarModal();
});

// BOTÓN MOSTRAR
function abrirModalMostrar() {
  if (!filaSeleccionada) {
    alert("Mostrar sexo.");
    return;
  }
  
  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos para mostrar.");
    return;
  }

  const c = filaSeleccionada.cells;
  document.getElementById("mostrarNombre").textContent    = c[1].textContent;

  document.getElementById("modalMostrar").style.display = "flex";
}

function cerrarModalMostrar() {
  document.getElementById("modalMostrar").style.display = "none";
}

// BOTÓN ELIMINAR (con validación de fila vacía)
function eliminarSexo() {
  const buscador = document.getElementById("buscador");
  const texto = buscador.value.trim().toLowerCase();

  if (filaSeleccionada) {
    const primeraCelda = filaSeleccionada.cells[0].textContent.trim();
    if (primeraCelda === "") {
      alert("Esa fila no contiene datos. No se puede eliminar.");
      return;
    }

    alert("Este sexo simulado como eliminado: " + filaSeleccionada.innerText);
    filaSeleccionada.classList.remove("seleccionada");
    filaSeleccionada = null;

  } else if (texto !== "") {
    const filas = document.querySelectorAll("tbody tr");
    let encontrado = false;

    filas.forEach(fila => {
      const primeraCelda = fila.cells[0].textContent.trim();
      const textoFila = fila.innerText.toLowerCase();

      if (primeraCelda !== "" && textoFila.includes(texto) && !encontrado) {
        alert("Este sexo simulado como eliminado: " + fila.innerText);
        encontrado = true;
      }
    });

    if (!encontrado) {
      alert("No se encontró ningún sexo con ese dato o la fila está vacía.");
    }

  } else {
    alert("Selecciona una fila con datos o escribe algo en el buscador.");
  }

  buscador.value = ""; // Limpiar campo buscador después de eliminar
}

// BOTÓN MODIFICAR
function abrirModalModificar() {
  if (!filaSeleccionada) {
    alert("Primero selecciona el sexo de la tabla.");
    return;
  }

  const firstCell = filaSeleccionada.cells[0].textContent.trim();
  if (firstCell === "") {
    alert("Esa fila no contiene datos.");
    return;
  }

  const celdas = filaSeleccionada.querySelectorAll("td");
  document.getElementById("inputNombre").value    = celdas[1].textContent;

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



