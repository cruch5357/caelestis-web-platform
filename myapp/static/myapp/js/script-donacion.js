//INICIAR SESION
document.getElementById("loginBtn").addEventListener("click", function() {
  var emailInput = document.getElementById("exampleInputEmail1").value;
  var emailLower = emailInput.toLowerCase();
  var passwordInput = document.getElementById("exampleInputPassword1").value;
  var emailPattern = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,}$/;

  if (emailInput === "" || passwordInput === "") {
      alert("Por favor, completa todos los campos.");
  } else if (!emailPattern.test(emailLower)) {
      alert("Por favor, ingresa un correo electrónico válido.");
  }
  else {
      alert("Bienvenido " + emailInput);
      window.location.href = "index.html";
  }
});

document.addEventListener('DOMContentLoaded', function() {
  function formatCVV(input) {
    input.value = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    var formattedValue = input.value.substring(0, 3); // Restringir la longitud a 3 caracteres
    input.value = formattedValue;
  }

  function formatExpiry(input) {
    // Eliminar caracteres no numéricos y limitar a 4 caracteres
    var formattedValue = input.value.replace(/\D/g, '').substring(0, 4);

    // Si la longitud es 4, formatear como "MM/YY"
    if (formattedValue.length === 4) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{2})$/, '$1/$2');
    }   

    input.value = formattedValue;
  }

  function validarFecha(input) {
    // Convertir la entrada a "MM/YY" si se ingresa en formato "MMYY"
    if (input.length === 4) {
      input = input.replace(/^(\d{2})(\d{2})$/, '$1/$2');
    }

    var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-9][0-9])$/;

    if (!pattern.test(input)) {
      return false;
    }

    var parts = input.split('/');
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[1], 10); 

    // Obtener el año actual en formato de dos dígitos
    var currentYearLastTwoDigits = parseInt(String(new Date().getFullYear()).slice(-2));

    return (month >= 1 && month <= 12) && (year >= currentYearLastTwoDigits && year <= 99);
  }

  function formatName(input) {
    input.value = input.value.toUpperCase();
  }

  function validateName(input) {
    var name = input.value.trim();
    return name.length >= 9;
  }

  var expiryInput = document.getElementById('expiry');
  var cvvInput = document.getElementById('cvv');
  var cardNumberInput = document.getElementById('card-number');
  var amountInput = document.getElementById('amount');
  var nameInput = document.getElementById('name-card');

  expiryInput.addEventListener('input', function(event) {
    formatExpiry(event.target);
  });

  cvvInput.addEventListener('input', function(event) {
    formatCVV(event.target);
  });

  cardNumberInput.addEventListener('input', function(event) {
    var inputValue = event.target.value.replace(/\D/g, '').substring(0, 16); // Limitar a 16 caracteres
    var formattedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim(); // Dividir automáticamente en grupos de 4
    cardNumberInput.value = formattedValue;
  });

  amountInput.addEventListener('input', function(event) {
    var inputValue = event.target.value.replace(/\D/g, '');
    inputValue = '$' + inputValue;
    amountInput.value = inputValue;
  });

  nameInput.addEventListener('input', function(event) {
    formatName(event.target);
  });

  document.getElementById("donation-form").addEventListener("submit", function(event) {
    var inputFecha = document.getElementById("expiry").value;
    var inputAmount = document.getElementById("amount").value;
    var inputCardNumber = document.getElementById("card-number").value.replace(/\s/g, ''); // Eliminar espacios para contar solo los dígitos
    var inputCVV = document.getElementById("cvv").value;
    var inputName = document.getElementById("name-card");

    if (!validateName(inputName)) {
      event.preventDefault();
      alert("Por favor, ingrese un nombre completo válido con al menos 9 caracteres.");
    } else if (!validarFecha(inputFecha)) {
      event.preventDefault();
      alert("Por favor, ingrese una fecha de vencimiento válida.");
    } else if (inputAmount === '$' || inputAmount === '') {
      event.preventDefault();
      alert("Por favor, ingrese el monto de la donación.");
    } else if (inputCardNumber.length !== 16) {
      event.preventDefault();
      alert("Por favor, ingrese un número de tarjeta válido con 16 dígitos.");
    } else if (inputCVV.length !== 3) {
      event.preventDefault();
      alert("Por favor, ingrese un CVV válido con 3 dígitos.");
    } else {
      alert("La donación ha sido enviada con éxito! Muchas gracias por tu contribución, te llegará un correo de agradecimiento :)");
    }
  });
});

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
