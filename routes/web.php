<?php

use lib\Route;
use src\Controllers\HomeController;
use src\Controllers\UsersController;
use src\Controllers\TasksController;

// RUTAS PRINCIPALES
// --------------------------------------
Route::get('/', [HomeController::class, 'index']);               // Vista principal
Route::get('/register', [HomeController::class, 'register']);    // Vista de registro
Route::get('/login', [HomeController::class, 'login']);          // Vista de inicio de sesión
Route::get('/recover', [HomeController::class, 'recover']);      // Vista de recuperación de contraseña
Route::get('/dashboard', [HomeController::class, 'dashboard']);  // Vista de dashboard

Route::post('/authenticate', [HomeController::class, 'authenticate']); // Autenticar usuario
Route::post('/logout', [HomeController::class, 'logout']);             // Cerrar sesión
Route::post('/recover', [UsersController::class, 'recoveryPasswordByEmail']);      // Enviar correo de recuperación

// RUTAS DE GESTIÓN DE USUARIOS
// --------------------------------------
// Obtener información
Route::get('/users/all', [UsersController::class, 'getAll']);        // Obtener todos los usuarios
Route::get('/user/byId/:id', [UsersController::class, 'getById']);   // Obtener usuario por ID
Route::get('/user/byEmail/:email', [UsersController::class, 'getByEmail']); // Obtener usuario por email
Route::get('/user/byName/:name', [UsersController::class, 'getByName']);   // Obtener usuario por nombre

// Administrar usuarios
Route::post('/store', [UsersController::class, 'store']);          // Registrar usuario
Route::post('/user/update', [UsersController::class, 'update']);   // Actualizar usuario
Route::post('/user/delete', [UsersController::class, 'delete']);   // Eliminar usuario

// RUTAS DE GESTIÓN DE TAREAS
// --------------------------------------
// Obtener información
Route::get('/tasks/all', [TasksController::class, 'getAll']);            // Obtener todas las tareas
Route::get('/task/byId/:id', [TasksController::class, 'getById']);       // Obtener tarea por ID
Route::get('/task/byTitle/:title', [TasksController::class, 'getByTitle']); // Obtener tarea por título
Route::get('/task/byUser/:user', [TasksController::class, 'getByUser']); // Obtener tareas por ID de usuario
Route::get('/task/byStatus/:status', [TasksController::class, 'getByStatus']); // Obtener tareas por estado

// Administrar tareas
Route::post('/task/store', [TasksController::class, 'store']);    // Crear tarea
Route::post('/task/update', [TasksController::class, 'update']);  // Actualizar tarea
Route::post('/task/delete', [TasksController::class, 'delete']);  // Eliminar tarea

// Ejecutar las rutas
Route::dispatch();
