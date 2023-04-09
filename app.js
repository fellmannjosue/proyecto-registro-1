document.addEventListener("DOMContentLoaded", function () {
  const formularioRegistro = document.getElementById("formulario-registro");
  const pantallaRegistro = document.getElementById("pantalla-registro");
  const pantallaTabla = document.getElementById("pantalla-tabla");
  const tablaRegistros = document.getElementById("tabla-registros");

  // Ejemplo de botones para cambiar entre pantallas
  const btnRegresarARegistro = document.getElementById("btn-regresar-a-registro");
    btnRegresarARegistro.addEventListener("click", mostrarPantallaRegistro);

  btnIrATabla.addEventListener("click", mostrarPantallaTabla);
  btnIrARegistro.addEventListener("click", mostrarPantallaRegistro);

  formularioRegistro.addEventListener("submit", async function (event) {
      event.preventDefault();

      const identificacion = event.target.elements.identificacion.value;
      const idInventario = event.target.elements.idInventario.value;
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