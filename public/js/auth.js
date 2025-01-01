// Manejo de la autenticación
async function handleAuthentication(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('#loginEmail')?.value?.trim();
    const password = form.querySelector('#loginPassword')?.value?.trim();

    if (!email || !password) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa tu correo y contraseña.',
            toast: true,
            position: 'top',
            timer: 3000,
            showConfirmButton: false,
        });
        return;
    }

    const data = { email, password };

    try {
        const response = await fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Autenticado!',
                text: result.message,
                toast: true,
                position: 'top',
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                window.location.href = '/dashboard';
            });
        } else {
            throw new Error(result.message || 'Error de autenticación.');
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            text: error.message,
        });
    }
}

// Manejo del registro de usuario
async function registerUser(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('#registerName')?.value?.trim();
    const email = form.querySelector('#registerEmail')?.value?.trim();
    const password = form.querySelector('#registerPassword')?.value;
    const passwordConfirmation = form.querySelector('#registerPasswordConfirmation')?.value;

    if (!name || !email || !password || password !== passwordConfirmation) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Completa todos los campos y asegúrate de que las contraseñas coincidan.',
            toast: true,
            position: 'top',
            timer: 3000,
            showConfirmButton: false,
        });
        return;
    }

    const data = { name, email, password, password_confirmation: passwordConfirmation };

    try {
        const response = await fetch('/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Tu cuenta se ha creado correctamente.',
                toast: true,
                position: 'top',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                window.location.href = '/login';
            });
        } else {
            throw new Error(result.message || 'Error al registrar.');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    }
}

// Manejo de recuperación de contraseña
// Manejo de recuperación de contraseña
async function recoverPassword(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.querySelector('#recoverEmail')?.value?.trim();

    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un correo electrónico válido.',
            toast: true,
            position: 'top',
            timer: 3000,
            showConfirmButton: false,
        });
        return;
    }

    const data = { email };

    try {
        const response = await fetch('/recover', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.password) {
            Swal.fire({
                icon: 'success',
                title: '¡Recuperación Exitosa!',
                html: `
                    Tu nueva contraseña es: <strong id="newPassword">${result.password}</strong>
                    <button id="copyButton" class="ml-4 bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Copiar</button>
                `,
                confirmButtonText: 'Iniciar Sesión',
                showCancelButton: false,
            }).then(() => {
                window.location.href = '/login';
            });

            // Añadir evento para copiar la contraseña al portapapeles
            const copyButton = document.getElementById('copyButton');
            copyButton.addEventListener('click', () => {
                const passwordElement = document.getElementById('newPassword');
                const range = document.createRange();
                range.selectNode(passwordElement);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges(); // Limpia la selección

                // Mensaje de confirmación para el usuario
                Swal.fire({
                    icon: 'success',
                    title: '¡Copiado!',
                    text: 'La nueva contraseña ha sido copiada al portapapeles.',
                    toast: true,
                    position: 'top',
                    timer: 1500,
                    showConfirmButton: false,
                });
            });

        } else {
            throw new Error(result.error || 'Error al recuperar la contraseña.');
        }
    } catch (error) {
        console.error('Error en la recuperación:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            text: error.message,
        });
    }
}


// Asignación de eventos a los formularios
document.getElementById('loginForm')?.addEventListener('submit', handleAuthentication);
document.getElementById('registrationForm')?.addEventListener('submit', registerUser);
document.getElementById('recoverForm')?.addEventListener('submit', recoverPassword);
