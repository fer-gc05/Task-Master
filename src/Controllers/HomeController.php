<?php

namespace src\Controllers;
session_start();

use src\Models\Users;
use src\Models\Task;


class HomeController extends Controller
{
    public function index()
    {
        if (isset($_SESSION['user'])):
            $this->redirect('/dashboard');
        endif;
        return $this->view('index');
    }

    public function register()
    {
        if (isset($_SESSION['user'])):
            $this->redirect('/dashboard');
        endif;

        return $this->view('auth.register');
    }

    public function recover()
    {
        if (isset($_SESSION['user'])):
            $this->redirect('/dashboard');
        endif;

        return $this->view('auth.recover');
    }

    public function login()
    {
        if (isset($_SESSION['user'])):
            $this->redirect('/dashboard');
        endif;

        return $this->view('auth.login');
    }

    public function dashboard()
    {
        try {
            if (!isset($_SESSION['user'])):
                $this->redirect('/');
            endif;
            if ($_SESSION['user']['role'] === 'administrador'):
                $modelUser = new Users();
                $modelTask = new Task();
                $users = $modelUser->all();
                $tasks = $modelTask->getAllTasks();
                //return ['users' => $users, 'tasks' => $tasks];
                return $this->view('admin.index', compact('users', 'tasks'));
            elseif ($_SESSION['user']['role'] === 'trabajador'):
                $modelTask = new Task();
                $workerId = $_SESSION['user']['id'];
                $tasks = $modelTask->where('user_id', '=', $workerId)->fetchAll();
                //return ['tasks' => $tasks];
                return $this->view('workers.index', compact('tasks'));
            endif;

        } catch (\Exception $e) {
            return ['error' => 'Error al cargar la vista requerida.' . $e->getMessage()];
        }
    }

    public function authenticate()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data || !isset($data['email'], $data['password'])):
                return ['error' => 'Complete todos los campos'];
            endif;

            $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
            $password = $data['password'];

            if (!$email):
                return ['error' => 'Email inválido'];
            endif;

            $user = new Users();
            $user = $user->where('email', '=', $email)->fetch();

            if (!$user):
                return ['success' => false, 'message' => 'Usuario no encontrado'];
            endif;

            if (!password_verify($password, $user['password'])):
                return ['success' => false, 'message' => 'Contraseña incorrecta'];
            endif;

            $_SESSION['user'] = $user;
            return ['success' => true, 'message' => 'Usuario autenticado correctamente'];
        } catch (\Exception $e) {
            return ['error' => 'Error al autenticar el usuario: ' . $e->getMessage()];
        }
    }

    public function logout()
    {
        try {
            session_destroy();
            return ['success' => true, 'message' => 'Sesión cerrada correctamente'];
            exit;
        } catch (\Exception $e) {
            return ['error' => 'Error al cerrar sesión: ' . $e->getMessage()];
            exit;
        }
    }
}