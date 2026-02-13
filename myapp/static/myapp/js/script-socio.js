//SOCIO
document.addEventListener('DOMContentLoaded', function() {
    const joinButtons = document.querySelectorAll('.join-btn');

    joinButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const nombre = this.getAttribute('data-nombre');
            const precio = this.getAttribute('data-precio');

            localStorage.setItem('membresiaSeleccionada', JSON.stringify({ nombre, precio }));

            window.location.href = this.href;
        });
    });
});