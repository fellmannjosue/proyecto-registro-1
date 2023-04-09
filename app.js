document.addEventListener('DOMContentLoaded', function() {
  // Inicializa la aplicación y maneja la navegación entre pantallas
  initApp();

  // Agrega event listeners a los formularios
  setupFormListeners();
});

function initApp() {
  // Muestra la pantalla inicial de inicio de sesión y registro
  // Oculta las otras pantallas
  document.getElementById('loginRegisterContainer').style.display = 'flex';
  document.getElementById('dataFormContainer').style.display = 'none';
  document.getElementById('tableContainer').style.display = 'none';
}

function setupFormListeners() {
  // Agrega event listeners a los formularios para manejar la validación y almacenamiento local
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function(event) {
      event.preventDefault();

      if (validateRegisterForm()) {
          saveRegisterData();

          // Navega a la pantalla de datos si el registro es exitoso
          document.getElementById('loginRegisterContainer').style.display = 'none';
          document.getElementById('dataFormContainer').style.display = 'block';
      }
  });

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();

      if (validateLoginForm() && checkLoginData()) {
          // Navega a la pantalla de datos si el inicio de sesión es exitoso
          document.getElementById('loginRegisterContainer').style.display = 'none';
          document.getElementById('dataFormContainer').style.display = 'block';
      }
  });

  const dataForm = document.getElementById('dataForm');
  dataForm.addEventListener('submit', function(event) {
      event.preventDefault();

      if (validateDataForm()) {
          saveDataForm();

          // Actualiza la tabla con los datos almacenados en el almacenamiento local
          updateDataTable();
      }
  });
}

function validateRegisterForm() {
  // Valida los campos del formulario de registro
  // Devuelve true si el formulario es válido, de lo contrario false
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (email === '' || password === '' || confirmPassword === '') {
      alert('Todos los campos son requeridos');
      return false;
  } else if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
  } else {
      return true;
  }
}

function saveRegisterData() {
  // Guarda los datos del registro en el almacenamiento local
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  localStorage.setItem('userData', JSON.stringify({ email, password }));
}

function validateLoginForm() {
  // Valida los campos del formulario de inicio de sesión
  // Devuelve true si el formulario es válido, de lo contrario false
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (email === '' || password === '') {
      alert('Todos los campos son requeridos');
      return false;
  } else {
      return true;
  }
}

function checkLoginData() {
  // Comprueba si los datos de inicio de sesión coinciden con los datos almacenados en el almacenamiento local
  // Devuelve true si coinciden, de lo contrario false
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const storedData = JSON.parse(localStorage.getItem('userData'));
  
 
  if (storedData && storedData.email === email && storedData.password === password) {
      return true;
  } else {
      alert('Correo electrónico o contraseña incorrectos');
      return false;
  }
  }
  
  function validateDataForm() {
  // Valida los campos del formulario de datos
  // Devuelve true si el formulario es válido, de lo contrario false
  const idInventario = document.getElementById('idInventario').value;
  const serieModelo = document.getElementById('serieModelo').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const usuarioAdmin = document.getElementById('usuarioAdmin').value;
  const fechaEntrega = document.getElementById('fechaEntrega').value;
  const tipoIp = document.getElementById('tipoIp').value;
  const ip = document.getElementById('ip').value;
  const area = document.getElementById('area').value;
  const grado = document.getElementById('grado').value;
  
  
  if (idInventario === '' || serieModelo === '' || nombre === '' || apellido === '' || usuarioAdmin === '' || fechaEntrega === '' || tipoIp === '' || ip === '' || area === '' || grado === '') {
      alert('Todos los campos son requeridos');
      return false;
  } else {
      return true;
  }
  }
  
  function saveDataForm() {
  // Guarda los datos del formulario de datos en el almacenamiento local
  const data = {
  idInventario: document.getElementById('idInventario').value,
  serieModelo: document.getElementById('serieModelo').value,
  nombre: document.getElementById('nombre').value,
  apellido: document.getElementById('apellido').value,
  usuarioAdmin: document.getElementById('usuarioAdmin').value,
  fechaEntrega: document.getElementById('fechaEntrega').value,
  tipoIp: document.getElementById('tipoIp').value,
  ip: document.getElementById('ip').value,
  area: document.getElementById('area').value,
  grado: document.getElementById('grado').value,
  imagen1: document.getElementById('imagen1').value,
  imagen2: document.getElementById('imagen2').value,
  };
  
  
  let dataArray = JSON.parse(localStorage.getItem('inventoryData')) || [];
  dataArray.push(data);
  localStorage.setItem('inventoryData', JSON.stringify(dataArray));
  }
  
  function updateDataTable() {
  // Actualiza la tabla con los datos almacenados en el almacenamiento local
  const tableBody = document.getElementById('dataTableBody');
  tableBody.innerHTML = '';
  

  const storedData = JSON.parse(localStorage.getItem('inventoryData')) || [];
  
  storedData.forEach(function(data) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${data.idInventario}</td>
          <td>${data.serieModelo}</td>
          <td>${data.nombre}</td>
          <td>${data.apellido}</td>
          <td>${data.usuarioAdmin}</td>
          <td>${data.fechaEntrega}</td>
          <td>${data.tipoIp}</td>
          <td>${data.ip}</td>
          <td>${data.area}</td>
          <td>${data.grado}</td>
          <td>${data.imagen1}</td>
          <td>${data.imagen2}</td>
      `;
      tableBody
  
  
  
  
      .appendChild(row);
  });
  }
