<?php

namespace src\Models;

use mysqli;

class Model
{
    protected $host = DB_HOST;
    protected $user = DB_USER;
    protected $pass = DB_PASS;
    protected $name = DB_NAME;

    protected $connection;
    protected $result;


    public function __construct()
    {
        $this->connect();
    }

    public function connect()
    {
        try {
            $this->connection = new mysqli($this->host, $this->user, $this->pass, $this->name);

            if ($this->connection->connect_error):
                die("Model failed: " . $this->connection->connect_error);
            endif;
        } catch (\Exception $e) {
            die("Error al conectar con la base de datos: " . $e->getMessage());
        }
    }

    public function query($query, $data = [], $params = null)
    {
        try {
            if ($data):
                if ($params == null):
                    $params = str_repeat('s', count($data));
                endif;
                $stmt = $this->connection->prepare($query);
                $stmt->bind_param($params, ...$data);
                $stmt->execute();
                $this->result = $stmt->get_result();
            else:
                $this->result = $this->connection->query($query);
            endif;
            return $this;

        } catch (\Exception $e) {
            die("Error al ejecutar la consulta: " . $e->getMessage());
        }
    }

    public function fetch()
    {
        try {
            return $this->result->fetch_assoc();
        } catch (\Exception $e) {
            die("Error al obtener los datos: " . $e->getMessage());
        }
    }

    public function fetchAll()
    {
        try {
            return $this->result->fetch_all(MYSQLI_ASSOC);
        } catch (\Exception $e) {
            die("Error al obtener los datos: " . $e->getMessage());
        }
    }

    public function all()
    {
        try {
            $query = "SELECT * FROM {$this->table}";
            return $this->query($query)->fetchAll();
        } catch (\Exception $e) {
            die("Error al obtener los datos: " . $e->getMessage());
        }
    }

    public function find($id)
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = ?";
            return $this->query($query, [$id], 'i')->fetch();
        } catch (\Exception $e) {
            die("Error al obtener los datos: " . $e->getMessage());
        }
    }

    public function where($column, $operator, $value = null)
    {
        try {
            if (is_null($value)):
                $value = $operator;
                $operator = '=';
            endif;
            $this->connection->real_escape_string($value);
            $query = "SELECT * FROM {$this->table} WHERE {$column} {$operator} ?";
            $this->query($query, [$value]);
            return $this;
        } catch (\Exception $e) {
            die("Error al obtener los datos: " . $e->getMessage());
        }
    }

    public function like($column, $value)
    {
        try {
            $column = $this->connection->real_escape_string($column);
            $value = $this->connection->real_escape_string($value);

            $query = "SELECT * FROM {$this->table} WHERE {$column} LIKE ?";
            $results = $this->query($query, ["%{$value}%"]);

            return $this;
        } catch (\Exception $e) {
            throw new \Exception("Error al realizar la búsqueda: " . $e->getMessage());
        }
    }

    public function insert($data)
    {
        try {
            $columns = implode(', ', array_map(function ($column) {
                return "`" . $column . "`";
            }, array_keys($data)));

            $values = array_values($data);

            $query = "INSERT INTO {$this->table} ({$columns}) VALUES (" . str_repeat('?,', count($data) - 1) . "?)";
            $this->query($query, $values);
            $inser_id = $this->connection->insert_id;
            return $this->find($inser_id);
        } catch (\Exception $e) {
            die("Error al insertar los datos: " . $e->getMessage());
        }
    }

    public function update($id, $data)
    {
        try {
            $fields = [];

            foreach ($data as $key => $value):
                $fields[] = "`{$key}` = ?";
            endforeach;
            $fields = implode(', ', $fields);
            $query = "UPDATE {$this->table} SET {$fields} WHERE id = ?";
            $value = array_values($data);
            $value[] = $id;
            $this->query($query, $value);
            return $this->find($id);
        } catch (\Exception $e) {
            die("Error al actualizar los datos: " . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = ?";
            $this->query($query, [$id], 'i');
            return $this;
        } catch (\Exception $e) {
            die("Error al eliminar los datos: " . $e->getMessage());
        }
    }
}