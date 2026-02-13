document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const password = document.getElementById('id_password');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    username.addEventListener('input', () => validateUsernameField());
    password.addEventListener('input', () => validatePasswordField());

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío por defecto del formulario

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage();
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                showErrorMessage();
                clearFormFields();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
            clearFormFields();
        });
    });

    function showSuccessMessage() {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }

    function showErrorMessage() {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        setError(username, ' ');
        setError(password, ' ');
    }

    function clearFormFields() {
        username.value = '';
        password.value = '';
    }

    function validateUsernameField() {
        const usernameVal = username.value.trim();
        if (usernameVal === '') {
            setError(username, ' ');
            return false;
        } else {
            setSuccess(username);
            return true;
        }
    }

    function validatePasswordField() {
        const passwordVal = password.value.trim();
        if (passwordVal === '') {
            setError(password, ' ');
            return false;
        } else {
            setSuccess(password);
            return true;
        }
    }

    function setError(element, message) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = message;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }

    function setSuccess(element) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = '';
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    }
});
