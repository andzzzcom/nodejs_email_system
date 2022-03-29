-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2022 at 08:48 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_blast`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id_admin` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `born_place` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` int(11) NOT NULL,
  `role` bigint(20) UNSIGNED DEFAULT NULL,
  `expired_reset` datetime DEFAULT NULL,
  `token_reset` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_reset` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `creator` int(11) DEFAULT NULL,
  `last_updater` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id_admin`, `email`, `password`, `avatar`, `name`, `phone`, `address`, `born_place`, `gender`, `role`, `expired_reset`, `token_reset`, `status_reset`, `status`, `creator`, `last_updater`, `last_login`, `created_date`, `last_updated_date`) VALUES
(1, 'admin@gmail.com', '$2y$10$oo71oURavmzSkuovoZ7EwuuzkWZvIU9OI8QOv/S10JIXB63w0iuSi', 'admin.jpg', 'admin', '5512345', 'alamat default', 'Jakarta', 1, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-12-21 15:44:52', '2021-12-21 15:44:52'),
(2, 'admin2@gmail.com', '$2b$10$pjN51O/LgzerlTPZGBgULenU/lU/e/ex69kNPEYCRhGOICjdxHyx6', 'admin-avatar-1647051038901.jpeg', 'admin', '5512345', 'alamat default', 'Jakarta', 1, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL, '2021-12-21 15:44:52', '2022-03-12 15:03:53'),
(3, 'anama@gmail.com', '', 'admin-avatar-1646638653247.png', 'nama1', '123456789', 'alamat1', 'jakarta', 1, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, '2022-03-07 14:37:33', '2022-03-07 14:37:33'),
(4, 'email3@gmail.com', '$2b$10$wLS2pWjzAM09CET6rZDnre75v17fswyuhWv.4PP449rhFfHjKG7Va', 'admin-avatar-1646639811562.png', 'nama3s', 'phone1', 'alamat2', 'jakarta', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:56:51', '2022-03-12 10:25:30'),
(5, 'email3@gmail.com', '$2b$10$PXqWYm58s9ZocSSbOublFugizm2LYjBVDat7Pk.VlOJXLAIGWUbbK', 'admin-avatar-1646639826390.png', 'nama3', 'phone1', 'alamat2', 'jakarta', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:57:06', '2022-03-07 15:35:13'),
(6, 'email3@gmail.com', '$2b$10$ovWm1z4q5M7B6ZYNfpBmDOVvgxRpF6czBeS6klCTD1OQZgLXuJqC.', 'admin-avatar-1646639838373.png', 'nama3', 'phone1', 'alamat2', 'jakarta', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:57:18', '2022-03-07 15:35:08'),
(7, 'adminbaru2@gmail.com', '$2b$10$2yVK9HFtpL4YtTSuwZ.ZMumQKOTlbZAdKD38bAyviWCKXFeDZIxYy', 'admin-avatar-1646641449309.png', 'admin baru2', '1234567890', 'alamat23', 'tangerang', 1, NULL, NULL, NULL, NULL, -1, 1, NULL, NULL, '2022-03-07 14:57:41', '2022-03-07 15:35:01');

-- --------------------------------------------------------

--
-- Table structure for table `emails`
--

CREATE TABLE `emails` (
  `id_email` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `id_group` int(1) NOT NULL,
  `description` text NOT NULL,
  `status` int(1) NOT NULL,
  `creator` int(1) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emails`
--

INSERT INTO `emails` (`id_email`, `email`, `id_group`, `description`, `status`, `creator`, `created_date`, `last_updated_date`) VALUES
(1, 'a@gmail.com', 1, 'deskripsi 1', 1, 1, '2022-03-14 22:49:14', '2022-03-15 09:53:12'),
(2, 'b@gmail.com', 1, 'deskripsi 2', 1, 1, '2022-03-14 22:49:14', '2022-03-15 09:53:14'),
(3, 'andreashermawan1993@gmail.com', 3, 'deskripsi', 0, 1, '2022-03-15 10:00:21', '2022-03-17 15:06:40'),
(4, 'andreash.works@gmail.com', 3, 'deskripsi', -1, 1, '2022-03-15 10:03:23', '2022-03-17 15:06:35');

-- --------------------------------------------------------

--
-- Table structure for table `emails_group`
--

CREATE TABLE `emails_group` (
  `id_group` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` int(1) NOT NULL,
  `creator` int(1) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emails_group`
--

INSERT INTO `emails_group` (`id_group`, `name`, `status`, `creator`, `created_date`, `last_updated_date`) VALUES
(1, 'Group 1', 1, 1, '2022-03-14 22:38:54', '2022-03-14 22:38:54'),
(2, 'Group 2', 1, 1, '2022-03-14 22:38:54', '2022-03-14 22:38:54'),
(3, 'Group 5', 1, 1, '2022-03-14 23:49:55', '2022-03-14 23:49:55'),
(4, 'Group 7', -1, 1, '2022-03-15 07:45:51', '2022-03-15 07:58:01');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id_setting` bigint(20) UNSIGNED NOT NULL,
  `title_web` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle_web` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `favicon_web` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_web` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `creator` bigint(20) UNSIGNED DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id_setting`, `title_web`, `subtitle_web`, `favicon_web`, `logo_web`, `email`, `status`, `creator`, `created_date`, `last_updated_date`) VALUES
(2, 'Blasty', 'Blasty', 'admin-favicon_web-1647049948627.png', 'admin-logo_web-1646716648731.png', 'testing@gmail.coms', 1, 1, '2022-03-08 11:38:48', '2022-03-13 10:20:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `c_admins_role_foreign` (`role`);

--
-- Indexes for table `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`id_email`);

--
-- Indexes for table `emails_group`
--
ALTER TABLE `emails_group`
  ADD PRIMARY KEY (`id_group`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id_setting`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `emails`
--
ALTER TABLE `emails`
  MODIFY `id_email` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `emails_group`
--
ALTER TABLE `emails_group`
  MODIFY `id_group` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id_setting` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
