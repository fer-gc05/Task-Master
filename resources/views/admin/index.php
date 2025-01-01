<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Administrativo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="bg-gray-50">
<!-- Top Navigation Bar -->
<nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <h1 class="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
            </div>
            <div class="flex items-center">
                <button class="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        onclick="logout();">
                    <i class="fas fa-sign-out-alt mr-2"></i>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </div>
</nav>

<!-- Main Content -->
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Stats Grid - Centered -->
    <div class="flex justify-center mb-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <!-- Total Users Card -->
            <div class="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
                <div class="flex items-center justify-center">
                    <div class="p-3 bg-blue-100 rounded-full">
                        <i class="fas fa-users text-blue-500 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-500">Total Usuarios</h3>
                        <p class="text-2xl font-bold text-gray-900"><?php echo count($users); ?></p>
                    </div>
                </div>
            </div>

            <!-- Total Tasks Card -->
            <div class="bg-white rounded-lg shadow p-6 transform hover:scale-105 transition-transform duration-200">
                <div class="flex items-center justify-center">
                    <div class="p-3 bg-green-100 rounded-full">
                        <i class="fas fa-tasks text-green-500 text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-500">Total Tareas</h3>
                        <p class="text-2xl font-bold text-gray-900"><?php echo count($tasks); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tables Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Users Table -->
        <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">
                        <i class="fas fa-users text-blue-500 mr-2"></i>
                        Usuarios
                    </h2>
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            onclick="userModal();">
                        <i class="fas fa-plus mr-2"></i>
                        Nuevo Usuario
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cargo
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <?php foreach ($users as $user): ?>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><?= $user['name']; ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><?= $user['email']; ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><?= $user['role']; ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button class="text-blue-600 hover:text-blue-900 mr-3"
                                        data-id="<?= $user['id']; ?>"
                                        onclick="editUser(this);">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-red-600 hover:text-red-900"
                                        data-id="<?= $user['id']; ?>"
                                        onclick="deleteUser(this);">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Tasks Table -->
        <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">
                        <i class="fas fa-tasks text-green-500 mr-2"></i>
                        Tareas
                    </h2>
                    <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            onclick="taskModal();">
                        <i class="fas fa-plus mr-2"></i>
                        Nueva Tarea
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Título
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Responsable
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha limite
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <?php foreach ($tasks as $task): ?>

                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><?= $task['title']; ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><?= $task['user']; ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><?= $task['deadline']; ?></td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  <?php
                                    switch ($task['status']):
                                        case 'completada':
                                            echo 'bg-green-100 text-green-800';
                                            break;
                                        case 'en_progreso':
                                            echo 'bg-blue-100 text-blue-800';
                                            break;
                                        default:
                                            echo 'bg-yellow-100 text-yellow-800';
                                    endswitch;
                                    ?>">

                                       <?php
                                       switch ($task['status']):
                                           case 'completada':
                                               echo 'Completada';
                                               break;

                                           case 'en_progreso':
                                               echo 'En progreso';
                                               break;

                                           case 'pendiente':
                                               echo 'Pendiente';
                                               break;

                                           default:
                                               echo 'Estado desconocido';
                                               break;
                                       endswitch;
                                       ?>
                                    </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button class="text-blue-600 hover:text-blue-900 mr-3"
                                        data-id="<?php echo $task['id']; ?>"
                                        onclick="editTask(this);">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-red-600 hover:text-red-900"
                                        data-id="<?= $task['id']; ?>"
                                        onclick="deleteTask(this);">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<script src="js/admin.js"></script>
</body>
</html>