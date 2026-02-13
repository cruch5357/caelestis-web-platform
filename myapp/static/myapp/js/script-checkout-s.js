document.addEventListener('DOMContentLoaded', function() {
    const membresiaSeleccionada = JSON.parse(localStorage.getItem('membresiaSeleccionada'));

    if (membresiaSeleccionada) {
        const nombreMembresia = membresiaSeleccionada.nombre;
        const precioMembresia = parseFloat(membresiaSeleccionada.precio);

        const formatearPrecio = (precio) => {
            return precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
        };

        const actualizarResumen = (precio) => {
            const impuesto = precio * 0.19;
            const total = precio + impuesto;

            document.getElementById('precioMembresia').textContent = formatearPrecio(precio);
            document.getElementById('impuesto').textContent = formatearPrecio(impuesto);
            document.getElementById('totalPagar').textContent = formatearPrecio(total);
        };

        document.getElementById('nombreMembresia').textContent = nombreMembresia;
        document.getElementById('precioMensual').textContent = formatearPrecio(precioMembresia);
        document.getElementById('precioAnual').textContent = formatearPrecio(precioMembresia * 12 * 0.8);

        actualizarResumen(precioMembresia);

        const radios = document.querySelectorAll('input[name="tipoPago"]');
        radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.value === 'mensual') {
                    actualizarResumen(precioMembresia);
                } else if (event.target.value === 'anual') {
                    actualizarResumen(precioMembresia * 12 * 0.8);
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const tarjetaDiv = document.getElementById("tarjetaDiv");
    const paypalDiv = document.getElementById("paypalDiv");
    const tarjetaRadio = document.getElementById("tarjeta");
    const paypalRadio = document.getElementById("paypal");
    const datosTarjetaContainer = document.getElementById("datosTarjetaContainer");

    function toggleTarjetaFields() {
        if (tarjetaRadio.checked) {
            datosTarjetaContainer.classList.remove("hidden");
        } else {
            datosTarjetaContainer.classList.add("hidden");
        }
    }

    toggleTarjetaFields();

    tarjetaDiv.addEventListener("click", function() {
        tarjetaRadio.checked = true;
        toggleTarjetaFields();
    });

    paypalDiv.addEventListener("click", function() {
        paypalRadio.checked = true;
        toggleTarjetaFields();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function formatCVV(input) {
        input.value = input.value.replace(/\D/g, ''); 
        var formattedValue = input.value.substring(0, 3); 
        input.value = formattedValue;
    }

    function formatExpiry(input) {
        var formattedValue = input.value.replace(/\D/g, '').substring(0, 4);
        if (formattedValue.length === 4) {
            formattedValue = formattedValue.replace(/^(\d{2})(\d{2})$/, '$1/$2');
        }
        input.value = formattedValue;
    }

    function validarFecha(input) {
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

        var currentYearLastTwoDigits = parseInt(String(new Date().getFullYear()).slice(-2));

        return (month >= 1 && month <= 12) && (year >= currentYearLastTwoDigits && year <= 99);
    }

    function formatNombre(input) {
        input.value = input.value.toUpperCase().replace(/[^A-Z\s]/g, ''); 
    }

    function validarNombre(input) {
        return input.length >= 9; 
    }

    var expiryInput = document.getElementById('expiracion');
    var cvvInput = document.getElementById('cvv');
    var cardNumberInput = document.getElementById('numeroTarjeta');
    var nombreTarjetaInput = document.getElementById('nombreTarjeta');

    expiryInput.addEventListener('input', function(event) {
        formatExpiry(event.target);
    });

    cvvInput.addEventListener('input', function(event) {
        formatCVV(event.target);
    });

    cardNumberInput.addEventListener('input', function(event) {
        var inputValue = event.target.value.replace(/\D/g, '').substring(0, 16); 
        var formattedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim(); 
        cardNumberInput.value = formattedValue;
    });

    nombreTarjetaInput.addEventListener('input', function(event) {
        formatNombre(event.target);
    });

    document.getElementById("checkoutForm").addEventListener("submit", function(event){
        var inputFecha = document.getElementById("expiracion").value;
        var inputCardNumber = document.getElementById("numeroTarjeta").value.replace(/\s/g, ''); 
        var inputCVV = document.getElementById("cvv").value;
        var inputNombreTarjeta = document.getElementById("nombreTarjeta").value;

        if (!validarFecha(inputFecha)) {
            event.preventDefault();  
            alert("Por favor, ingrese una fecha de vencimiento válida.");
        } else if (inputCardNumber.length !== 16) {
            event.preventDefault();  
            alert("Por favor, ingrese un número de tarjeta válido con 16 dígitos.");
        } else if (inputCVV.length !== 3) {
            event.preventDefault();  
            alert("Por favor, ingrese un CVV válido con 3 dígitos.");
        } else if (!validarNombre(inputNombreTarjeta)) {
            event.preventDefault();  
            alert("Por favor, ingrese un nombre válido.");
        } else {
            event.preventDefault();  // Evitar el envío del formulario para mostrar el modal
            mostrarModalBoleta();
        }
    });
});

function mostrarModalBoleta() {
    const tipoPago = document.querySelector('input[name="tipoPago"]:checked').value;
    const nombreMembresia = document.getElementById('nombreMembresia').textContent;
    const totalPagar = document.getElementById('totalPagar').textContent;
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const fechaCompra = new Date().toLocaleDateString('es-CL');

    const detalleCompra = `
    <div class="datos-compra-socio" style="padding-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;">
        <p>${nombreMembresia} - ${tipoPago === 'mensual' ? 'Mensual' : 'Anual'}</p>
        <p>Precio total: ${totalPagar}</p>
        <p>Fecha de la compra: ${fechaCompra}</p>
        <p>Nombre de usuario: ${nombreUsuario}</p>
    </div>
    `;

    document.getElementById('detalleCompra').innerHTML = detalleCompra;

    const modal = document.getElementById('modalBoleta');
    modal.style.display = 'flex';

    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}
