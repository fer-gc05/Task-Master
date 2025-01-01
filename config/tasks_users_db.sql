-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2024 a las 17:45:18
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
  `status` enum('pendiente','completada') DEFAULT 'pendiente',
  `deadline` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `status`, `deadline`, `created_at`, `updated_at`) VALUES
(12, 18, 'Planificar estrategia de marketing', 'Desarrollar una estrategia completa de marketing para el próximo trimestre.', 'pendiente', '2025-01-15 10:00:00', '2024-12-29 16:44:41', '2024-12-29 16:44:41'),
(13, 18, 'Revisar informes financieros', 'Analizar los informes financieros del último mes y preparar un resumen ejecutivo.', 'pendiente', '2024-12-31 17:00:00', '2024-12-29 16:44:41', '2024-12-29 16:44:41'),
(14, 18, 'Implementar nuevo sistema CRM', 'Configurar el nuevo sistema CRM y migrar los datos existentes.', 'completada', '2024-12-28 18:00:00', '2024-12-29 16:44:41', '2024-12-29 16:44:41'),
(15, 19, 'Desarrollar módulo de facturación', 'Crear un nuevo módulo de facturación para la aplicación web.', 'pendiente', '2025-02-28 17:00:00', '2024-12-29 16:44:42', '2024-12-29 16:44:42'),
(16, 19, 'Corregir errores en la aplicación móvil', 'Identificar y corregir los errores reportados por los usuarios en la aplicación móvil.', 'pendiente', '2024-12-30 12:00:00', '2024-12-29 16:44:42', '2024-12-29 16:44:42');

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
(18, 'Juan Pérez', 'juan.perez@example.com', '$2y$10$eLLKHmKLtz7YKTVZSZn27u4ofmH/Nbl6L9Vifap.2tfABzqoST47y', '2024-12-29 22:31:02', 'administrador'),
(19, 'Enrique Pérez', 'enrique.perez@example.com', '$2y$10$z8XI5odYO8OVlnk7tOfjaO6rPz2f0aJ9GAO54LTS7oFdxPFIsQILm', '2024-12-29 22:33:26', 'trabajador');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
