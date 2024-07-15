-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-07-2024 a las 17:07:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectonode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `access_requests`
--

CREATE TABLE `access_requests` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `dni` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `access_requests`
--

INSERT INTO `access_requests` (`id`, `email`, `dni`) VALUES
(3, 'alumno40@gmail.com', 87654321),
(5, 'prueba1@hotmail.com', 12345678);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_groups`
--

CREATE TABLE `student_groups` (
  `id_group` int(50) NOT NULL,
  `commission` varchar(10) NOT NULL,
  `info` mediumtext DEFAULT NULL,
  `repos` varchar(50) DEFAULT NULL,
  `id_student1` int(11) DEFAULT NULL,
  `id_student2` int(11) DEFAULT NULL,
  `id_student3` int(11) DEFAULT NULL,
  `id_student4` int(11) DEFAULT NULL,
  `name_group` varchar(30) NOT NULL DEFAULT 'Grupo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `student_groups`
--

INSERT INTO `student_groups` (`id_group`, `commission`, `info`, `repos`, `id_student1`, `id_student2`, `id_student3`, `id_student4`, `name_group`) VALUES
(5, '2', NULL, NULL, 22, 23, 24, 25, 'Grupo'),
(8, '2', NULL, NULL, 15, 16, NULL, NULL, 'Grupo'),
(9, '2', NULL, NULL, 14, 17, 18, NULL, 'Grupo'),
(10, '2', 'ASDSAVC', 'https://github.com/CarlosMartin/proyectoNodeCaC', 2, 19, 20, 21, 'Grupo Dinamita'),
(11, '2', 'bla bla bla descripcion bla bla bla', 'git/prueba', 49, 50, NULL, NULL, 'Grupo prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unsubscribe_request`
--

CREATE TABLE `unsubscribe_request` (
  `id_request` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_data` int(11) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `pass` varchar(15) NOT NULL,
  `rol` varchar(15) NOT NULL,
  `id_data` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `email`, `pass`, `rol`, `id_data`) VALUES
(1, 'admin@coc.com', 'admin123', 'Administrator', 1),
(3, 'caffaroH@gmail.com', '12345678', 'Teacher', NULL),
(4, 'nabelY@gmail.com', '12345678', 'Teacher', NULL),
(5, 'sajamaP@gmail.com', '12345678', 'Teacher', NULL),
(6, 'perezA@gmail.com', '12345678', 'Teacher', 46),
(7, 'alumno1@gmail.com', '12345', 'Student', 2),
(9, 'alumno3@gmail.com', '12345678', 'Student', 4),
(10, 'alumno4@gmail.com', '12345678', 'Student', 5),
(11, 'alumno5@gmail.com', '12345678', 'Student', 6),
(12, 'alumno6@gmail.com', '12345678', 'Student', 7),
(13, 'alumno7@gmail.com', '12345678', 'Student', 8),
(14, 'alumno8@gmail.com', '12345678', 'Student', 9),
(15, 'alumno9@gmail.com', '12345678', 'Student', 10),
(16, 'alumno10@gmail.com', '12345678', 'Student', 11),
(17, 'alumno11@gmail.com', '12345678', 'Student', 12),
(19, 'alumno12@gmail.com', '12345678', 'Student', 13),
(20, 'alumno13@gmail.com', '12345678', 'Student', 14),
(21, 'alumno14@gmail.com', '12345678', 'Student', 15),
(22, 'alumno15@gmail.com', '12345678', 'Student', 16),
(23, 'alumno16@gmail.com', '12345678', 'Student', 17),
(24, 'alumno17@gmail.com', '12345678', 'Student', 18),
(25, 'alumno18@gmail.com', '12345678', 'Student', 19),
(26, 'alumno19@gmail.com', '12345678', 'Student', 20),
(27, 'alumno20@gmail.com', '12345678', 'Student', 21),
(28, 'alumno21@gmail.com', '12345678', 'Student', 22),
(29, 'alumno22@gmail.com', '12345678', 'Student', 23),
(30, 'alumno23@gmail.com', '12345678', 'Student', 24),
(31, 'alumno24@gmail.com', '12345678', 'Student', 25),
(32, 'alumno25@gmail.com', '12345678', 'Student', 26),
(34, 'alumno26@gmail.com', '12345678', 'Student', 27),
(35, 'alumno27@gmail.com', '12345678', 'Student', 28),
(36, 'alumno28@gmail.com', '12345678', 'Student', 29),
(37, 'alumno29@gmail.com', '12345678', 'Student', 30),
(38, 'alumno30@gmail.com', '12345678', 'Student', 31),
(39, 'alumno31@gmail.com', '12345678', 'Student', 32),
(40, 'alumno32@gmail.com', '12345678', 'Student', 33),
(41, 'alumno33@gmail.com', '12345678', 'Student', 34),
(42, 'alumno34@gmail.com', '12345678', 'Student', 35),
(43, 'alumno35@gmail.com', '12345678', 'Student', 36),
(45, 'alumno37@gmail.com', '12345678', 'Student', NULL),
(46, 'profesor1@gmail.com', 'cac2024', 'Teacher', 47),
(47, 'alumno100@gmail.com', '12345678', 'Student', 48),
(48, 'alumno50@gmail.com', '12345678', 'Student', 49),
(49, 'prueba2@gmail.com', '12345678', 'Student', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_data`
--

CREATE TABLE `user_data` (
  `id_data` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `schooling` varchar(15) DEFAULT NULL,
  `commission` varchar(10) NOT NULL,
  `photo` varchar(100) NOT NULL DEFAULT 'profilePic.png',
  `onGroup` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_data`
--

INSERT INTO `user_data` (`id_data`, `name`, `surname`, `birthdate`, `schooling`, `commission`, `photo`, `onGroup`) VALUES
(1, 'Administracion', 'Codo a Codo', '2000-01-01', 'Curso Virtual', '4DM1N', 'profilePic.png', 0),
(2, 'Carlos Martin', 'Garcia', '1984-08-07', 'Universitario', '2', '2_tequieromucho.jpg', 1),
(3, 'María', 'Martínez', '1991-02-02', 'Secundario', '1', 'profilePic.png', 0),
(4, 'Juan', 'López', '1992-03-03', 'Universitario', '1', 'profilePic.png', 0),
(5, 'Ana', 'Hernández', '1993-04-04', 'Terciario', '1', 'profilePic.png', 0),
(6, 'Pedro', 'González', '1994-05-05', 'Primario', '1', 'profilePic.png', 0),
(7, 'Luisa', 'Pérez', '1995-06-06', 'Secundario', '1', 'profilePic.png', 0),
(8, 'José', 'Sánchez', '1996-07-07', 'Universitario', '1', 'profilePic.png', 0),
(9, 'Laura', 'Ramírez', '1997-08-08', 'Terciario', '1', 'profilePic.png', 0),
(10, 'Miguel', 'Torres', '1998-09-09', 'Primario', '1', 'profilePic.png', 0),
(11, 'Isabel', 'Flores', '1999-10-10', 'Secundario', '1', 'profilePic.png', 0),
(12, 'Ricardo', 'Rivera', '2000-11-11', 'Universitario', '1', 'profilePic.png', 0),
(13, 'Carmen', 'Gómez', '2001-12-12', 'Terciario', '1', 'profilePic.png', 0),
(14, 'Andrés', 'Fernández', '1990-01-01', 'Primario', '2', 'profilePic.png', 1),
(15, 'Sofía', 'Jiménez', '1991-02-02', 'Secundario', '2', 'profilePic.png', 1),
(16, 'Diego', 'Ruiz', '1992-03-03', 'Universitario', '2', 'profilePic.png', 1),
(17, 'Valeria', 'Morales', '1993-04-04', 'Terciario', '2', 'profilePic.png', 1),
(18, 'Jorge', 'Ortiz', '1994-05-05', 'Primario', '2', 'profilePic.png', 1),
(19, 'Elena', 'Castro', '1995-06-06', 'Secundario', '2', 'profilePic.png', 1),
(20, 'Pablo', 'Vargas', '1996-07-07', 'Universitario', '2', 'profilePic.png', 1),
(21, 'Marta', 'Ramos', '1997-08-08', 'Terciario', '2', 'profilePic.png', 1),
(22, 'Luis', 'Gutiérrez', '1998-09-09', 'Primario', '2', 'profilePic.png', 1),
(23, 'Adriana', 'Chávez', '1999-10-10', 'Secundario', '2', 'profilePic.png', 1),
(24, 'Héctor', 'Molina', '2000-11-11', 'Universitario', '2', 'profilePic.png', 1),
(25, 'Rosa', 'Soto', '2001-12-12', 'Terciario', '2', 'profilePic.png', 1),
(26, 'Enrique', 'Suárez', '1990-01-01', 'Primario', '3', 'profilePic.png', 0),
(27, 'Beatriz', 'Delgado', '1991-02-02', 'Secundario', '3', 'profilePic.png', 0),
(28, 'Víctor', 'Medina', '1992-03-03', 'Universitario', '3', 'profilePic.png', 0),
(29, 'Silvia', 'Reyes', '1993-04-04', 'Terciario', '3', 'profilePic.png', 0),
(30, 'Fernando', 'Aguilar', '1994-05-05', 'Primario', '3', 'profilePic.png', 0),
(31, 'Daniela', 'Herrera', '1995-06-06', 'Secundario', '3', 'profilePic.png', 0),
(32, 'Raúl', 'Castillo', '1996-07-07', 'Universitario', '3', 'profilePic.png', 0),
(33, 'Patricia', 'Romero', '1997-08-08', 'Terciario', '3', 'profilePic.png', 0),
(34, 'Manuel', 'Vega', '1998-09-09', 'Primario', '3', 'profilePic.png', 0),
(35, 'Claudia', 'Ibarra', '1999-10-10', 'Secundario', '3', 'profilePic.png', 0),
(36, 'Gabriel', 'Campos', '2000-11-11', 'Universitario', '3', 'profilePic.png', 0),
(46, 'Alan Gabriel', 'Perez', '1994-12-19', 'Universitario', '3', 'profilePic.png', 1),
(47, 'Gabriel', 'Peralta', NULL, NULL, '2', 'profilePic.png', 1),
(48, 'ejemplo', 'ejemplo', '2024-07-29', 'Primario', '3', 'profilePic.png', 0),
(49, 'Robin', 'Nico', '1994-02-06', 'Universitario', '2', '49_nicoRobin.jpg', 1),
(50, 'Prueba', 'Dos', '2024-07-01', 'Primario', '2', '50_DaveMustaine.jpg', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `access_requests`
--
ALTER TABLE `access_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `student_groups`
--
ALTER TABLE `student_groups`
  ADD PRIMARY KEY (`id_group`);

--
-- Indices de la tabla `unsubscribe_request`
--
ALTER TABLE `unsubscribe_request`
  ADD PRIMARY KEY (`id_request`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id_data_2` (`id_data`),
  ADD KEY `id_data` (`id_data`);

--
-- Indices de la tabla `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id_data`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `access_requests`
--
ALTER TABLE `access_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `student_groups`
--
ALTER TABLE `student_groups`
  MODIFY `id_group` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `unsubscribe_request`
--
ALTER TABLE `unsubscribe_request`
  MODIFY `id_request` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id_data` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `student_groups`
--
ALTER TABLE `student_groups`
  ADD CONSTRAINT `student_groups_ibfk_1` FOREIGN KEY (`id_student1`) REFERENCES `user_data` (`id_data`),
  ADD CONSTRAINT `student_groups_ibfk_2` FOREIGN KEY (`id_student2`) REFERENCES `user_data` (`id_data`),
  ADD CONSTRAINT `student_groups_ibfk_3` FOREIGN KEY (`id_student3`) REFERENCES `user_data` (`id_data`),
  ADD CONSTRAINT `student_groups_ibfk_4` FOREIGN KEY (`id_student4`) REFERENCES `user_data` (`id_data`);

--
-- Filtros para la tabla `unsubscribe_request`
--
ALTER TABLE `unsubscribe_request`
  ADD CONSTRAINT `unsubscribe_request_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_data`) REFERENCES `user_data` (`id_data`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
