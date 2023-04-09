document.addEventListener("DOMContentLoaded", function () {
  const formularioRegistro = document.getElementById("formulario-registro");
  const pantallaRegistro = document.getElementById("pantalla-registro");
  const pantallaTabla = document.getElementById("pantalla-tabla");
  const tablaRegistros = document.getElementById("tabla-registros");
  let ultimoNumeroDeInventario = parseInt(localStorage.getItem("ultimoNumeroDeInventario")) || 2021000;
  // Ejemplo de botones para cambiar entre pantallas
  const btnIrATabla = document.getElementById("btn-ir-a-tabla");
  const btnRegresarARegistro = document.getElementById("btn-regresar-a-registro");
  btnRegresarARegistro.addEventListener("click", mostrarPantallaRegistro);


  btnIrATabla.addEventListener("click", mostrarPantallaTabla);

  const campoIdInventario = document.getElementById("idInventario");
  campoIdInventario.value = ultimoNumeroDeInventario;

  formularioRegistro.addEventListener("submit", async function (event) {
    event.preventDefault();


    ultimoNumeroDeInventario++;
    localStorage.setItem("ultimoNumeroDeInventario", ultimoNumeroDeInventario);


    const identificacion = event.target.elements.identificacion.value;
    const idInventario = ultimoNumeroDeInventario;
    const serie = event.target.elements.serie.value;
    const modelo = event.target.elements.modelo.value;
    const nombre = event.target.elements.nombre.value;
    const apellido = event.target.elements.apellido.value;
    const usuarioAdmin = event.target.elements.usuarioAdmin.value;
    const fechaEntrega = event.target.elements.fechaEntrega.value;
    const tipoIp = event.target.elements.tipoIp.value;
    const ip = event.target.elements.ip.value;
    const area = event.target.elements.area.value;
    const grado = event.target.elements.grado.value;

    const imagen1 = event.target.elements.imagen1.files[0];
    const imagen2 = event.target.elements.imagen2.files[0];

    const imagen1Base64 = await convertirImagenABase64(imagen1);
    const imagen2Base64 = await convertirImagenABase64(imagen2);

    const registro = {
      identificacion,
      idInventario,
      serie,
      modelo,
      nombre,
      apellido,
      usuarioAdmin,
      fechaEntrega,
      tipoIp,
      ip,
      area,
      grado,
      imagen1: imagen1Base64,
      imagen2: imagen2Base64,
    };

    guardarRegistro(registro);
    agregarRegistroATabla(registro);
    formularioRegistro.reset();
  });

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
    // No se incluye la carga de imágenes ya que esto requeriría una implementación más compleja

    // Elimina la fila de la tabla y actualiza el localStorage
    row.remove();
    registros.splice(index, 1);
    localStorage.setItem("registros", JSON.stringify(registros));

    // Muestra la pantalla de registro
    mostrarPantallaRegistro();
}

  function guardarRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));
  }

  function agregarRegistroATabla(registro) {
    const row = document.createElement("tr");

    Object.keys(registro).forEach(function (key) {
      if (key === "imagen1" || key === "imagen2") {
        return;
      }
      const cell = document.createElement("td");
      cell.textContent = registro[key];
      row.appendChild(cell);
    });

    tablaRegistros.appendChild(row);
    mostrarPantallaTabla();
  }

  function mostrarPantallaRegistro() {
    pantallaRegistro.style.display = "block";
    pantallaTabla.style.display = "none";
  }

  function mostrarPantallaTabla() {
    pantallaRegistro.style.display = "none";
    pantallaTabla.style.display = "block";
  }

  async function convertirImagenABase64(imagen) {
    return new Promise((resolve, reject) => {
      if (!imagen) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }
});
