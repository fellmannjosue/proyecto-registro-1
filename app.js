// Obtener elementos del DOM
const formulario = document.querySelector('#formulario');
const idInventario = document.querySelector('#idInventario');
const serie = document.querySelector('#serie');
const modelo = document.querySelector('#modelo');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const usuario = document.querySelector('#usuario');
const fecha = document.querySelector('#fecha');
const direccionIP = document.querySelector('#direccionIP');
const area = document.querySelector('#area');
const grado = document.querySelector('#grado');
const tipoIP = document.querySelector('#tipoIP');
const imagen = document.querySelector('#imagen');
const imagenPrevia = document.querySelector('#imagen-previa');
const tabla = document.querySelector('#registros');

// Función para generar un ID aleatorio
function generarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Función para agregar un registro a la tabla
function agregarRegistro(registro) {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${registro.idInventario}</td>
    <td>${registro.serie}</td>
    <td>${registro.modelo}</td>
    <td>${registro.nombre} ${registro.apellido}</td>
    <td>${registro.usuario}</td>
    <td>${registro.fecha}</td>
    <td>${registro.direccionIP}</td>
    <td>${registro.area}</td>
    <td>${registro.grado}</td>
    <td><img src="${registro.imagen}" class="img-thumbnail" alt="Imagen"></td>
    <td>
      <button class="btn btn-editar" data-id="${registro.id}"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-borrar" data-id="${registro.id}"><i class="bi bi-trash"></i></button>
    </td>
  `;
  tabla.appendChild(fila);
}

// Función para guardar el registro en el almacenamiento local
function guardarRegistro(registro) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.push(registro);
  localStorage.setItem('registros', JSON.stringify(registros));
}

// Función para cargar los registros guardados en el almacenamiento local
function cargarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.forEach(registro => {
    agregarRegistro(registro);
  });
}

// Función para eliminar un registro de la tabla y del almacenamiento local
function eliminarRegistro(id) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const indice = registros.findIndex(registro => registro.id === id);
  if (indice !== -1) {
    registros.splice(indice, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
  }
}

// Función para mostrar los detalles de un registro en el formulario
function mostrarRegistro(id) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const registro = registros.find(registro => registro.id === id);
  if (registro) {
    idInventario.value = registro.idInventario;
    serie.value = registro.serie;
    modelo.value = registro.modelo;
    nombre.value = registro.nombre;
    apellido.value = registro.apellido;
    usuario.value = registro.usuario;
    fecha.value = registro.fecha;
    direccionIP.value = registro.direccionIP;
    area.value = registro.area;
    grado.value = registro.grado;
    tipoIP.value = registro.tipoIP;
    imagenPrevia.src = registro.imagen;
  }
}

// Función para enviar el formulario
function enviarFormulario(evento) {
evento.preventDefault();

const idInventarioValor = idInventario.value.trim();
const serieValor = serie.value.trim();
const modeloValor = modelo.value.trim();
const nombreValor = nombre.value.trim();
const apellidoValor = apellido.value.trim();
const usuarioValor = usuario.value.trim();
const fechaValor = fecha.value.trim();
const direccionIPValor = direccionIP.value.trim();
const areaValor = area.value;
const gradoValor = grado.value;
const tipoIPValor = tipoIP.value;
const imagenValor = imagen.files[0];

// Validar campos requeridos
if (!idInventarioValor || !serieValor || !modeloValor || !nombreValor || !apellidoValor || !usuarioValor || !fechaValor || !direccionIPValor || !areaValor || !gradoValor || !tipoIPValor || !imagenValor) {
alert('Por favor, complete todos los campos.');
return;
}

// Crear un objeto de registro
const registro = {
id: generarId(),
idInventario: idInventarioValor,
serie: serieValor,
modelo: modeloValor,
nombre: nombreValor,
apellido: apellidoValor,
usuario: usuarioValor,
fecha: fechaValor,
direccionIP: direccionIPValor,
area: areaValor,
grado: gradoValor,
tipoIP: tipoIPValor,
imagen: ''
};

// Convertir la imagen a una URL de datos
const lector = new FileReader();
lector.onload = function() {
registro.imagen = lector.result;
guardarRegistro(registro);
agregarRegistro(registro);
formulario.reset();
};
lector.readAsDataURL(imagenValor);
}

// Función para manejar los eventos de los botones de editar y borrar
function manejarBotones(evento) {
if (evento.target.classList.contains('btn-editar')) {
const id = evento.target.getAttribute('data-id');
mostrarRegistro(id);
}
if (evento.target.classList.contains('btn-borrar')) {
const id = evento.target.getAttribute('data-id');
eliminarRegistro(id);
evento.target.closest('tr').remove();
}
}

// Cargar los registros guardados al iniciar la aplicación
cargarRegistros();

// Agregar un evento para enviar el formulario
formulario.addEventListener('submit', enviarFormulario);

// Agregar un evento para manejar los botones de editar y borrar
tabla.addEventListener('click', manejarBotones);