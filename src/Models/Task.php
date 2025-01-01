<?php

namespace src\Models;

class Task extends Model
{
    protected $table = 'tasks';

    public function getAllTasks()
    {
        try {
            $query = 'SELECT tasks.id, users.name AS user, tasks.title, tasks.description, tasks.status, tasks.deadline FROM tasks INNER JOIN users ON tasks.user_id = users.id';
            $result = $this->query($query)->fetchAll();
            return $result ?  $result : ['error' => 'No se encontraron tareas'];
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getById($id)
    {
        try {
            $query = 'SELECT tasks.id, users.name AS user, tasks.title, tasks.description, tasks.status, tasks.deadline 
              FROM tasks 
              INNER JOIN users ON tasks.user_id = users.id 
              WHERE tasks.id = ?';
            $result = $this->query($query, [$id])->fetch();
            return $result ? $result : ['error' => 'Tarea no encontrada'];
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getByUser($name)
    {
        try {
            $query = 'SELECT tasks.id, users.name AS user, tasks.title, tasks.description, tasks.status, tasks.deadline 
              FROM tasks 
              INNER JOIN users ON tasks.user_id = users.id 
              WHERE users.name LIKE ?';
            $result = $this->query($query, ["%$name%"])->fetchAll();
            return $result ? ['data' => $result] : ['error' => 'Tarea no encontrada'];
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }

    }

    public function getByTitle($title)
    {
        try {
            $query = 'SELECT tasks.id, users.name AS user, tasks.title, tasks.description, tasks.status, tasks.deadline 
              FROM tasks 
              INNER JOIN users ON tasks.user_id = users.id 
              WHERE tasks.title LIKE ?';
            $result = $this->query($query, ["%$title%"])->fetchAll();
            return $result ? ['data' => $result] : ['error' => 'Tarea no encontrada'];

        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getByStatus($status)
    {
        try {
            $query = 'SELECT  tasks.id, users.name AS user, tasks.title, tasks.description, tasks.status, tasks.deadline 
              FROM tasks 
              INNER JOIN users ON tasks.user_id = users.id 
              WHERE tasks.status = ?';
            $result = $this->query($query, [$status])->fetchAll();
            return $result ? ['data' => $result] : ['error' => 'Tarea no encontrada'];
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }

    }

}
