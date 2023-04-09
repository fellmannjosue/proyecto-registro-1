const formularioRegistro = document.getElementById("formulario-registro");
const pantallaRegistro = document.getElementById("pantalla-registro");
const pantallaTabla = document.getElementById("pantalla-tabla");
const tablaRegistros = document.getElementById("tabla-registros");
const btnRegresarARegistro = document.getElementById("btn-regresar-a-registro");
const btnAgregarRegistro = document.getElementById("btn-agregar-registro");

function mostrarPantallaRegistro() {
  pantallaRegistro.style.display = "block";
  pantallaTabla.style.display = "none";
}

function mostrarPantallaTabla() {
  pantallaRegistro.style.display = "none";
  pantallaTabla.style.display = "block";
}

function agregarRegistroATabla(registro, index) {
  const row = document.createElement("tr");
  row.setAttribute("data-index", index);

  Object.keys(registro).forEach(function (key) {
    if (key === "imagen1" || key === "imagen2") {
      return;
    }
    const cell = document.createElement("td");
    cell.textContent = registro[key];
    row.appendChild(cell);
  });

  const accionesCell = document.createElement("td");
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", eliminarRegistro);
  accionesCell.appendChild(btnEliminar);

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.addEventListener("click", editarRegistro);
  accionesCell.appendChild(btnEditar);

  row.appendChild(accionesCell);
  tablaRegistros.appendChild(row);
}

function cargarRegistros() {
  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.forEach(function (registro, index) {
    agregarRegistroATabla(registro, index);
  });
}

function guardarRegistro(event) {
  event.preventDefault();

  const registro = {
    identificacion: formularioRegistro.elements.identificacion.value,
    idInventario: formularioRegistro.elements.idInventario.value,
    serie: formularioRegistro.elements.serie.value,
    modelo: formularioRegistro.elements.modelo.value,
    nombre: formularioRegistro.elements.nombre.value,
    apellido: formularioRegistro.elements.apellido.value,
    usuarioAdmin: formularioRegistro.elements.usuarioAdmin.value,
    fechaEntrega: formularioRegistro.elements.fechaEntrega.value,
    tipoIp: formularioRegistro.elements.tipoIp.value,
    ip: formularioRegistro.elements.ip.value,
    area: formularioRegistro.elements.area.value,
    grado: formularioRegistro.elements.grado.value,
    // Las imágenes no se incluyen en este ejemplo
  };

  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.push(registro);
  localStorage.setItem("registros", JSON.stringify(registros));

  agregarRegistroATabla(registro, registros.length - 1); // Agrega el registro a la tabla

  formularioRegistro.reset();
  mostrarPantallaTabla();
}

function eliminarRegistro(event) {
  const row = event.target.closest("tr");
  const index = row.getAttribute("data-index");
  row.remove();

  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.splice(index, 1);
  localStorage.setItem("registros", JSON.stringify(registros));
}

function editarRegistro(event) {
  const row = event.target.closest("tr");
  const index = row.getAttribute("data-index");

  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  const registro = registros[index];

  // Llena el formulario con los datos del registro
  formularioRegistro.elements.identificacion.value = registro.identificacion;
  formularioRegistro.elements.idInventario.value = registro.idInventario;
  formularioRegistro.elements.serie.value = registro.serie;
  formularioRegistro.elements.modelo.value = registro.modelo;
  formularioRegistro.elements.nombre.value = registro.nombre;
  formularioRegistro.elements.apellido.value = registro.apellido;
  formularioRegistro.elements.usuarioAdmin.value = registro.usuarioAdmin;
  formularioRegistro.elements.fechaEntrega.value = registro.fechaEntrega;
  formularioRegistro.elements.tipoIp.value = registro.tipoIp;
  formularioRegistro.elements.ip.value = registro.ip;
  formularioRegistro.elements.area.value = registro.area;
  formularioRegistro.elements.grado.value = registro.grado;
  // Las imágenes no se incluyen en este ejemplo

  // Elimina el registro anterior
  registros.splice(index, 1);
  localStorage.setItem("registros", JSON.stringify(registros));

  // Actualiza la tabla
  tablaRegistros.innerHTML = "";
  cargarRegistros();

  // Cambia la pantalla al registro
  mostrarPantallaRegistro();
}

formularioRegistro.addEventListener("submit", guardarRegistro);
btnRegresarARegistro.addEventListener("click", mostrarPantallaRegistro);

cargarRegistros();
mostrarPantallaTabla();
