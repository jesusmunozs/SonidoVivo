/**
 * VALIDACIÓN Y FUNCIONALIDADES DE INICIO DE SESIÓN Y REGISTRO - SONIDO VIVO
 */

// Utilidad para validar formato de correo electrónico
function esEmailValido(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// Mostrar error personalizado en un campo específico
function mostrarError(inputElement, errorElement, mensaje) {
    if (inputElement) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    }
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.classList.add('visible');
    }
}

// Limpiar error en un campo específico
function limpiarError(inputElement, errorElement) {
    if (inputElement) {
        inputElement.classList.remove('is-invalid');
        if (inputElement.value.trim() !== '') {
            inputElement.classList.add('is-valid');
        } else {
            inputElement.classList.remove('is-valid');
        }
    }
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    }
}

// Mostrar mensaje global de alerta (éxito o error)
function mostrarAlertaGlobal(mensaje, tipo = 'success') {
    const alerta = document.getElementById('alert-feedback');
    if (!alerta) return;

    alerta.textContent = mensaje;
    alerta.className = `alert-feedback ${tipo}`;

    // Desaparecer después de 4 segundos
    clearTimeout(window._alertaTimeout);
    window._alertaTimeout = setTimeout(() => {
        alerta.className = 'alert-feedback';
        alerta.textContent = '';
    }, 4000);
}

// ==========================================
// VALIDACIONES DEL FORMULARIO DE LOGIN
// ==========================================
function validarCampoLoginEmail() {
    const input = document.getElementById('login-email');
    const error = document.getElementById('error-login-email');
    const valor = input.value.trim();

    if (valor === '') {
        mostrarError(input, error, 'Por favor, ingresa tu correo electrónico o usuario.');
        return false;
    }

    // Si contiene @, validar formato de correo
    if (valor.includes('@') && !esEmailValido(valor)) {
        mostrarError(input, error, 'El correo electrónico no tiene un formato válido (ej: usuario@ejemplo.com).');
        return false;
    }

    if (!valor.includes('@') && valor.length < 3) {
        mostrarError(input, error, 'El nombre de usuario debe tener al menos 3 caracteres.');
        return false;
    }

    limpiarError(input, error);
    return true;
}

function validarCampoLoginPassword() {
    const input = document.getElementById('login-password');
    const error = document.getElementById('error-login-password');
    const valor = input.value;

    if (valor === '') {
        mostrarError(input, error, 'Por favor, ingresa tu contraseña.');
        return false;
    }

    if (valor.length < 6) {
        mostrarError(input, error, 'La contraseña debe tener al menos 6 caracteres.');
        return false;
    }

    limpiarError(input, error);
    return true;
}

function manejarSubmitLogin(e) {
    e.preventDefault();

    const emailValido = validarCampoLoginEmail();
    const passwordValido = validarCampoLoginPassword();

    if (emailValido && passwordValido) {
        const inputEmail = document.getElementById('login-email');
        const usuarioNombre = inputEmail.value.split('@')[0];

        mostrarAlertaGlobal(`¡Bienvenido de nuevo, ${usuarioNombre}! Has iniciado sesión correctamente.`, 'success');

        // Opcional: resetear campos
        setTimeout(() => {
            document.getElementById('form-login').reset();
            document.querySelectorAll('#form-login input').forEach(input => input.classList.remove('is-valid'));
        }, 1500);
    } else {
        mostrarAlertaGlobal('Por favor corrige los campos señalados antes de continuar.', 'error');
    }
}

// ==========================================
// VALIDACIONES DEL FORMULARIO DE REGISTRO
// ==========================================
function validarCampoRegisterName() {
    const input = document.getElementById('register-name');
    const error = document.getElementById('error-register-name');
    const valor = input.value.trim();

    if (valor === '') {
        mostrarError(input, error, 'Por favor, ingresa tu nombre completo.');
        return false;
    }

    if (valor.length < 3) {
        mostrarError(input, error, 'El nombre debe tener al menos 3 caracteres.');
        return false;
    }

    limpiarError(input, error);
    return true;
}

function validarCampoRegisterEmail() {
    const input = document.getElementById('register-email');
    const error = document.getElementById('error-register-email');
    const valor = input.value.trim();

    if (valor === '') {
        mostrarError(input, error, 'El correo electrónico es obligatorio.');
        return false;
    }

    if (!esEmailValido(valor)) {
        mostrarError(input, error, 'Ingresa un correo electrónico válido (ej: usuario@ejemplo.com).');
        return false;
    }

    limpiarError(input, error);
    return true;
}

function validarCampoRegisterPassword() {
    const input = document.getElementById('register-password');
    const error = document.getElementById('error-register-password');
    const valor = input.value;

    if (valor === '') {
        mostrarError(input, error, 'La contraseña es obligatoria.');
        return false;
    }

    if (valor.length < 6) {
        mostrarError(input, error, 'La contraseña debe tener un mínimo de 6 caracteres.');
        return false;
    }

    limpiarError(input, error);

    // Revalidar confirmación si ya tiene contenido
    const confirmInput = document.getElementById('register-confirm-password');
    if (confirmInput && confirmInput.value !== '') {
        validarCampoRegisterConfirmPassword();
    }

    return true;
}

function validarCampoRegisterConfirmPassword() {
    const input = document.getElementById('register-confirm-password');
    const error = document.getElementById('error-register-confirm-password');
    const passwordInput = document.getElementById('register-password');
    const valor = input.value;

    if (valor === '') {
        mostrarError(input, error, 'Por favor confirma tu contraseña.');
        return false;
    }

    if (valor !== passwordInput.value) {
        mostrarError(input, error, 'Las contraseñas no coinciden. Verifícalas nuevamente.');
        return false;
    }

    limpiarError(input, error);
    return true;
}

function validarCampoRegisterTerms() {
    const input = document.getElementById('register-terms');
    const error = document.getElementById('error-register-terms');

    if (!input.checked) {
        mostrarError(null, error, 'Debes aceptar los términos y condiciones para continuar.');
        return false;
    }

    limpiarError(null, error);
    return true;
}

function manejarSubmitRegister(e) {
    e.preventDefault();

    const nameValido = validarCampoRegisterName();
    const emailValido = validarCampoRegisterEmail();
    const passwordValido = validarCampoRegisterPassword();
    const confirmValido = validarCampoRegisterConfirmPassword();
    const termsValido = validarCampoRegisterTerms();

    if (nameValido && emailValido && passwordValido && confirmValido && termsValido) {
        const inputName = document.getElementById('register-name');
        mostrarAlertaGlobal(`¡Registro exitoso! Cuenta creada para ${inputName.value.trim()}. Ya puedes iniciar sesión.`, 'success');

        setTimeout(() => {
            document.getElementById('form-register').reset();
            document.querySelectorAll('#form-register input').forEach(input => input.classList.remove('is-valid'));
            cambiarTab('login');
        }, 2000);
    } else {
        mostrarAlertaGlobal('Por favor completa todos los campos requeridos correctamente.', 'error');
    }
}

// ==========================================
// CAMBIO ENTRE PESTAÑAS (LOGIN / REGISTRO)
// ==========================================
function cambiarTab(modo) {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const alerta = document.getElementById('alert-feedback');

    if (!tabLogin || !tabRegister || !formLogin || !formRegister) return;

    // Limpiar alertas al cambiar de tab
    if (alerta) {
        alerta.className = 'alert-feedback';
        alerta.textContent = '';
    }

    if (modo === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    } else if (modo === 'register') {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    }
}

// ==========================================
// ACTUALIZAR CONTADOR DEL CARRITO
// ==========================================
function actualizarContadorCarrito() {
    const contadorElemento = document.querySelector('.cart-icon');
    if (contadorElemento) {
        const carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];
        const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
        contadorElemento.innerText = `🛒 Cart (${totalItems})`;
    }
}

// ==========================================
// INICIALIZACIÓN DE EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();

    // Revisar si viene con el parámetro ?mode=register en la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'register') {
        cambiarTab('register');
    }

    // Eventos Formulario Login
    const formLogin = document.getElementById('form-login');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');

    if (formLogin) {
        formLogin.addEventListener('submit', manejarSubmitLogin);
    }

    if (loginEmail) {
        loginEmail.addEventListener('blur', validarCampoLoginEmail);
        loginEmail.addEventListener('input', () => {
            const error = document.getElementById('error-login-email');
            limpiarError(loginEmail, error);
        });
    }

    if (loginPassword) {
        loginPassword.addEventListener('blur', validarCampoLoginPassword);
        loginPassword.addEventListener('input', () => {
            const error = document.getElementById('error-login-password');
            limpiarError(loginPassword, error);
        });
    }

    const forgotPassLink = document.getElementById('link-forgot-password');
    if (forgotPassLink) {
        forgotPassLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidad de recuperación de contraseña: Se enviará un enlace de restablecimiento a tu correo.');
        });
    }

    // Eventos Formulario Registro
    const formRegister = document.getElementById('form-register');
    const regName = document.getElementById('register-name');
    const regEmail = document.getElementById('register-email');
    const regPassword = document.getElementById('register-password');
    const regConfirmPassword = document.getElementById('register-confirm-password');
    const regTerms = document.getElementById('register-terms');

    if (formRegister) {
        formRegister.addEventListener('submit', manejarSubmitRegister);
    }

    if (regName) {
        regName.addEventListener('blur', validarCampoRegisterName);
        regName.addEventListener('input', () => {
            const error = document.getElementById('error-register-name');
            limpiarError(regName, error);
        });
    }

    if (regEmail) {
        regEmail.addEventListener('blur', validarCampoRegisterEmail);
        regEmail.addEventListener('input', () => {
            const error = document.getElementById('error-register-email');
            limpiarError(regEmail, error);
        });
    }

    if (regPassword) {
        regPassword.addEventListener('blur', validarCampoRegisterPassword);
        regPassword.addEventListener('input', () => {
            const error = document.getElementById('error-register-password');
            limpiarError(regPassword, error);
        });
    }

    if (regConfirmPassword) {
        regConfirmPassword.addEventListener('blur', validarCampoRegisterConfirmPassword);
        regConfirmPassword.addEventListener('input', () => {
            const error = document.getElementById('error-register-confirm-password');
            limpiarError(regConfirmPassword, error);
        });
    }

    if (regTerms) {
        regTerms.addEventListener('change', () => {
            const error = document.getElementById('error-register-terms');
            limpiarError(null, error);
        });
    }
});
