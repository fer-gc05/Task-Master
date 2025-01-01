<?php

namespace src\Controllers;

class Controller
{
    public function view($route, $data = [])
    {
        extract($data);
        $route = str_replace('.', '/', $route);

        if (file_exists('../resources/views/' . $route . '.php')):
            ob_start();
            require_once '../resources/views/' . $route . '.php';
            $content = ob_get_clean();

            return $content;
        else:
            echo 'View not found';
        endif;

    }

    public function redirect($route)
    {
        header("Location: {$route}");
    }

}