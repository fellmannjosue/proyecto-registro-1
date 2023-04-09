const formularioRegistro = document.getElementById("formulario-registro");
const tablaRegistros = document.getElementById("tabla-registros");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnRegresar = document.getElementById("btn-regresar");

let registros = [];

function cargarRegistrosEnTabla() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];

    tablaRegistros.innerHTML = "";

    registros.forEach(function (registro, index) {
        const row = document.createElement("tr");
        row.setAttribute("data-index", index);

        const identificacionCell = document.createElement("td");
        identificacionCell.textContent = registro.identificacion;
        row.appendChild(identificacionCell);

        const idInventarioCell = document.createElement("td");
        idInventarioCell.textContent = registro.idInventario;
        row.appendChild(idInventarioCell);

        const serieCell = document.createElement("td");
        serieCell.textContent = registro.serie;
        row.appendChild(serieCell);

        const modeloCell = document.createElement("td");
        modeloCell.textContent = registro.modelo;
        row.appendChild(modeloCell);

        const nombreCell = document.createElement("td");
        nombreCell.textContent = registro.nombre;
        row.appendChild(nombreCell);

        const apellidoCell = document.createElement("td");
        apellidoCell.textContent = registro.apellido;
        row.appendChild(apellidoCell);

        const usuarioAdminCell = document.createElement("td");
        usuarioAdminCell.textContent = registro.usuarioAdmin;
        row.appendChild(usuarioAdminCell);

        const fechaEntregaCell = document.createElement("td");
        fechaEntregaCell.textContent = registro.fechaEntrega;
        row.appendChild(fechaEntregaCell);

        const tipoIpCell = document.createElement("td");
        tipoIpCell.textContent = registro.tipoIp;
        row.appendChild(tipoIpCell);

        const ipCell = document.createElement("td");
        ipCell.textContent = registro.ip;
        row.appendChild(ipCell);

        const areaCell = document.createElement("td");
        areaCell.textContent = registro.area;
        row.appendChild(areaCell);

        const gradoCell = document.createElement("td");
        gradoCell.textContent = registro.grado;
        row.appendChild(gradoCell);

        const accionesCell = document.createElement("td");

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {
            eliminarRegistro(index);
        });
        accionesCell.appendChild(btnEliminar);

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "btn-sm", "ml-2");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", function () {
            mostrarPantallaRegistroParaEditar(index);
        });
        accionesCell.appendChild(btnEditar);

        row.appendChild(accionesCell);

        tablaRegistros.appendChild(row);
    });
}

function agregarRegistro() {
    const registro = {
        identificacion: formularioRegistro.identificacion.value,
        idInventario: formularioRegistro.idInventario.value,
        serie: formularioRegistro.serie.value,
        modelo: formularioRegistro.modelo.value,
        nombre: formularioRegistro.nombre.value,
        apellido: formularioRegistro.apellido.value,
        usuarioAdmin: formularioRegistro.usuarioAdmin.value,
        fechaEntrega: formularioRegistro.fechaEntrega.value,
        tipoIp: formularioRegistro.tipoIp.value,
        ip: formularioRegistro.ip.value,
        area: formularioRegistro.area.value,
        grado: formularioRegistro.grado.value,
        imagen1: formularioRegistro.imagen1.files[0] ? formularioRegistro.imagen1.files[0].name : "",
        imagen2: formularioRegistro.imagen2.files[0] ? formularioRegistro.imagen2.files[0].name : ""
    };

    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));

    formularioRegistro.reset();

    cargarRegistrosEnTabla();

    mostrarPantallaTabla();
}

function eliminarRegistro(index) {
    if (confirm("¿Está seguro que desea eliminar este registro?")) {
        registros.splice(index, 1);
        localStorage.setItem("registros", JSON.stringify(registros));

        cargarRegistrosEnTabla();
    }
}

function mostrarPantallaRegistro() {
    document.getElementById("pantalla-registro").style.display = "block";
    document.getElementById("pantalla-tabla").style.display = "none";

    btnGuardar.textContent = "Guardar";
    formularioRegistro.reset();
}

function mostrarPantallaTabla() {
    document.getElementById("pantalla-registro").style.display = "none";
    document.getElementById("pantalla-tabla").style.display = "block";

    cargarRegistrosEnTabla();
}

function mostrarPantallaRegistroParaEditar(index) {
    mostrarPantallaRegistro();

    const registro = registros[index];

    formularioRegistro.identificacion.value = registro.identificacion;
    formularioRegistro.idInventario.value = registro.idInventario;
    formularioRegistro.serie.value = registro.serie;
    formularioRegistro.modelo.value = registro.modelo;
    formularioRegistro.nombre.value = registro.nombre;
    formularioRegistro.apellido.value = registro.apellido;
    formularioRegistro.usuarioAdmin.value = registro.usuarioAdmin;
    formularioRegistro.fechaEntrega.value = registro.fechaEntrega;
    formularioRegistro.tipoIp.value = registro.tipoIp;
    formularioRegistro.ip.value = registro.ip;
    formularioRegistro.area.value = registro.area;
    formularioRegistro.grado.value = registro.grado;

    btnGuardar.textContent = "Actualizar";
    btnGuardar.removeEventListener("click", agregarRegistro);
    btnGuardar.addEventListener("click", function () {
        actualizarRegistro(index);
    });
}

function actualizarRegistro(index) {
    const registro = {
        identificacion: formularioRegistro.identificacion.value,
        idInventario: formularioRegistro.idInventario.value,
        serie: formularioRegistro.serie.value,
        modelo: formularioRegistro.modelo.value,
        nombre: formularioRegistro.nombre.value,
        apellido: formularioRegistro.apellido.value,
        usuarioAdmin: formularioRegistro.usuarioAdmin.value,
        fechaEntrega: formularioRegistro.fechaEntrega.value,
        tipoIp: formularioRegistro.tipoIp.value,
        ip: formularioRegistro.ip.value,
        area: formularioRegistro.area.value,
        grado: formularioRegistro.grado.value,
        imagen1: formularioRegistro.imagen1.files[0] ? formulaireRegistro.imagen1.files[0].name : "",
        imagen2: formulaireRegistro.imagen2.files[0] ? formulaireRegistro.imagen2.files[0].name : ""
    };

    registros[index] = registro;
    localStorage.setItem("registros", JSON.stringify(registros));

    formularioRegistro.reset();

    cargarRegistrosEnTabla();

    mostrarPantallaTabla();
}

btnGuardar.addEventListener("click", agregarRegistro);
btnCancelar.addEventListener("click", mostrarPantallaTabla);
btnRegresar.addEventListener("click", mostrarPantallaRegistro);

mostrarPantallaTabla();

