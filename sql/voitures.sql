-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Ven 09 Juillet 2021 à 08:44
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1
-- Version de PHP :  7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `voitures`
--

-- --------------------------------------------------------

--
-- Structure de la table `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `car`
--

INSERT INTO `car` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Mercedes-AMG pousse le GLE à 603 chevaux', 'Le dernier-né de la gamme de modèles de performance de Mercedes-AMG est, sans surprise, un autre VUS. Voici le nouveau GLE 63 S 4MATIC+ Coupé 2021.', '2021-07-08 11:59:11', NULL),
(2, 'La nouvelle Citroën C5', 'Le nouveau haut de gamme de Citroën adopte une approche très différente des autres familiales du marché', '2021-07-08 12:02:05', NULL),
(3, 'Calandre controversée ', 'En marge de la présentation des nouvelles M3 et M4, Le Guide de l\"auto a été invité à une discussion avec Domagoj Dukec,', '2021-07-08 12:13:28', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `car_files`
--

CREATE TABLE `car_files` (
  `car_id` int(11) NOT NULL,
  `files_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `car_files`
--

INSERT INTO `car_files` (`car_id`, `files_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `destination` text NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  `code` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `files`
--

INSERT INTO `files` (`id`, `name`, `destination`, `type`, `size`, `code`, `createdAt`, `updatedAt`) VALUES
(1, '8918960a-577a-4c59-af81-24890d967648.jpeg', 'uploads/8918960a-577a-4c59-af81-24890d967648.jpeg', 'image/jpeg', '8692', 'fileCar', NULL, NULL),
(2, '6c59bb5c-734f-49c7-9139-be8a3dad6bf6.jpeg', 'uploads/6c59bb5c-734f-49c7-9139-be8a3dad6bf6.jpeg', 'image/jpeg', '8742', 'fileCar', NULL, NULL),
(3, '0157f1f9-84a0-4af2-911a-96b83dbdd79f.jpeg', 'uploads/0157f1f9-84a0-4af2-911a-96b83dbdd79f.jpeg', 'image/jpeg', '8641', 'fileCar', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `lastName` varchar(150) NOT NULL,
  `firstName` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `lastName`, `firstName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'LIONEL', 'Messi', 'lionel@gmail.com', '$2b$10$rDP.Sd3sa2d4Z8sMzcDBgewSl.Ea0orFVUls7umYyPHpJuST43xQq', '2021-07-08 11:07:11', NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `car_files`
--
ALTER TABLE `car_files`
  ADD KEY `car_id` (`car_id`),
  ADD KEY `files_id` (`files_id`);

--
-- Index pour la table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `car_files`
--
ALTER TABLE `car_files`
  ADD CONSTRAINT `car_files_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `car_files_ibfk_2` FOREIGN KEY (`files_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
