<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Registro de Usuario</title>
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">

<div class="bg-white p-8 rounded-lg shadow-md w-96 space-y-6">
    <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
        <p class="text-gray-600">Complete sus datos para registrarse</p>
    </div>

    <form id="registrationForm" class="space-y-4">
        <div>
            <label class="block text-gray-700 text-sm font-medium mb-1" for="registerName">
                Nombre Completo
            </label>
            <input
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="registerName"
                    type="text"
                    name="name"
                    placeholder="Ingrese su nombre completo"
                    required
            />
        </div>

        <div>
            <label class="block text-gray-700 text-sm font-medium mb-1" for="registerEmail">
                Correo Electrónico
            </label>
            <input
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="registerEmail"
                    type="email"
                    name="email"
                    placeholder="Ingrese su correo electrónico"
                    required
            />
        </div>

        <div>
            <label class="block text-gray-700 text-sm font-medium mb-1" for="registerPassword">
                Contraseña
            </label>
            <input
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="registerPassword"
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    required
            />
        </div>

        <div>
            <label class="block text-gray-700 text-sm font-medium mb-1" for="registerPasswordConfirmation">
                Confirmar Contraseña
            </label>
            <input
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="registerPasswordConfirmation"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirme su contraseña"
                    required
            />
        </div>

        <!-- Campo oculto para el rol -->
        <input type="hidden" id="role" name="role" value="trabajador" />

        <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Registrarse
        </button>
    </form>

    <div class="text-center">
        <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <a href="/login" class="text-blue-600 hover:text-blue-800">Iniciar Sesión</a>
        </p>
    </div>
</div>
<script src="js/auth.js"></script>
</body>
</html>
