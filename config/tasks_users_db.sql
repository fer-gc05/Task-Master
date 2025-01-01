-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-01-2025 a las 00:51:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tasks_users_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
                         `id` int(11) NOT NULL,
                         `user_id` int(11) NOT NULL,
                         `title` varchar(100) NOT NULL,
                         `description` text DEFAULT NULL,
                         `status` enum('pendiente','completada','en_progreso') DEFAULT 'pendiente',
                         `deadline` datetime DEFAULT NULL,
                         `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
                         `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `status`, `deadline`, `created_at`, `updated_at`) VALUES
                                                                                                                    (12, 18, 'Planificar estrategia de marketing', 'Desarrollar una estrategia completa de marketing para el próximo trimestre.', 'completada', '2025-01-16 10:00:00', '2024-12-29 16:44:41', '2025-01-01 20:16:37'),
                                                                                                                    (13, 18, 'Revisar informes financieros', 'Analizar los informes financieros del último mes y preparar un resumen ejecutivo.', 'en_progreso', '2025-01-20 10:00:00', '2024-12-29 16:44:41', '2025-01-01 22:42:30'),
                                                                                                                    (19, 29, 'Montar servicion en aws', 'Hacer funcional el api en Amazon web services', 'completada', '2025-01-16 18:02:40', '2025-01-01 22:11:16', '2025-01-02 05:05:08'),
                                                                                                                    (20, 29, 'Crear planificacion mensual', 'Planificar las tareas del mes proximo', 'completada', '2025-01-21 18:02:46', '2025-01-01 22:13:17', '2025-01-01 23:02:51'),
                                                                                                                    (21, 29, 'Generar backend en java', 'Crear un microservicio para la gestión de libros', 'pendiente', '2025-01-31 18:07:00', '2025-01-01 23:07:22', '2025-01-01 23:07:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `name` varchar(100) NOT NULL,
                         `email` varchar(100) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
                         `role` enum('administrador','trabajador') NOT NULL DEFAULT 'trabajador'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `role`) VALUES
                                                                                  (18, 'Juan Luis Pérez', 'Juan.perez@example.com', '$2y$10$cMCv.jqN.kvjS0VA1cWAveH21YI4PEqwTR3xtqP8IPM32Vi/jioSW', '2024-12-29 22:31:02', 'administrador'),
                                                                                  (21, 'Carlos Sánchez', 'carlos.sanchez@example.com', '$2y$10$u9tTRbVPK0NrgiAS5fdm4.w0HtYDtEhDTOX/Cr9dt.5PYFHKUB2jC', '2025-01-01 20:24:32', 'administrador'),
                                                                                  (29, 'Enrique Cerezo', 'enrique.cerezo@example.com', '$2y$10$KIro9ea4VDIg3fQj.vnX.uX1hNLLqFuVckqAO6HE1OO.Toi1Rez3y', '2025-01-02 03:41:42', 'trabajador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
    ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tasks`
--
ALTER TABLE `tasks`
    ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
