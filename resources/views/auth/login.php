<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Formulario de Inicio de Sesión</title>
</head>

<body class="bg-gray-100 h-screen flex items-center justify-center">
<div class="bg-white p-8 rounded-lg shadow-md w-96">
    <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
        <p class="text-gray-600">¡Bienvenido de nuevo! Por favor, inicia sesión en tu cuenta.</p>
    </div>

    <form id="loginForm">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="loginEmail">
                Correo electrónico
            </label>
            <input
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="loginEmail" name="email" type="email" placeholder="Ingresa tu correo electrónico" required />
        </div>

        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="loginPassword">
                Contraseña
            </label>
            <input
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="loginPassword" name="password" type="password" placeholder="Ingresa tu contraseña" required />
        </div>

        <div class="flex items-center justify-end mb-6">
            <a href="/recover" class="text-sm text-blue-600 hover:text-blue-800">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ingresar
        </button>
    </form>

    <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
            ¿No tienes una cuenta?
            <a href="/register" class="text-blue-600 hover:text-blue-800">Regístrate</a>
        </p>
    </div>
</div>
<script src="js/auth.js"></script>
</body>
</html>
