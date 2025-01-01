<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Recuperar Contraseña</title>
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
<div class="bg-white p-8 rounded-lg shadow-md w-96">
    <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-gray-800">¿Olvidaste tu contraseña?</h2>
        <p class="text-gray-600 mt-2">Ingresa tu correo electrónico y te brindaremos una nueva contraseña</p>
    </div>

    <form id="recoverForm">
        <div class="mb-6">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                Correo Electrónico
            </label>
            <input
                    id="recoverEmail"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Recuperar Contraseña
        </button>
    </form>

    <div class="mt-6 text-center">
        <a href="/login" class="text-sm text-blue-600 hover:text-blue-800">
            ← Volver al inicio de sesión
        </a>
    </div>
</div>
<script src="js/auth.js"></script>
</body>
</html>