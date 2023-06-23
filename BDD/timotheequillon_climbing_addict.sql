-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db.3wa.io
-- Généré le : mer. 21 juin 2023 à 14:49
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1-log
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `timotheequillon_climbing_addict`
--

-- --------------------------------------------------------

--
-- Structure de la table `Articles`
--

CREATE TABLE `Articles` (
  `id` char(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `categorie_id` char(36) NOT NULL,
  `author_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Articles`
--

INSERT INTO `Articles` (`id`, `date`, `title`, `content`, `categorie_id`, `author_id`) VALUES
('51d368c3-57f8-488c-a1c0-4eff29a66563', '2023-06-20 20:15:16', 'etyhytyza\'rzert', 'a\"rf\'\"e(\'ehy\"\'ar', 'c3b0db5d-23dc-451e-83d2-061da1161d88', '1c785c8a-f177-4399-968f-d9c67638735d'),
('b507fd4c-ce56-4031-8ac7-a3a72f69b196', '2023-06-13 16:07:53', 'test4', 'test4', 'c3b0db5d-23dc-451e-83d2-061da1161d88', '1c785c8a-f177-4399-968f-d9c67638735d'),
('fc76b834-1de9-41a5-aa72-eefc178d13fc', '2023-06-13 12:17:59', 'Nouvelle d\'escalade en intérieur', 'salut les gars je viens d\'aller tester un nouvelle salle d\'escalade qui viens d\'ouvrir pas loin de chez moi elle est vraiment pas mal', 'c3b0db5d-23dc-451e-83d2-061da1161d88', '1c785c8a-f177-4399-968f-d9c67638735d');

-- --------------------------------------------------------

--
-- Structure de la table `ArticlesCategories`
--

CREATE TABLE `ArticlesCategories` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ArticlesCategories`
--

INSERT INTO `ArticlesCategories` (`id`, `name`) VALUES
('4fc3a3aa-4969-4c7c-b714-e6cddbf98d4f', 'escalade en extérieur'),
('c3b0db5d-23dc-451e-83d2-061da1161d88', 'escalade intérieur');

-- --------------------------------------------------------

--
-- Structure de la table `ArticlesComments`
--

CREATE TABLE `ArticlesComments` (
  `id` char(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `article_id` char(36) DEFAULT NULL,
  `author_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ArticlesComments`
--

INSERT INTO `ArticlesComments` (`id`, `date`, `name`, `content`, `article_id`, `author_id`) VALUES
('659e60e7-8b4b-4bd7-8ee4-166322b4ceeb', '2023-06-19 11:45:17', 'xwcvcbnb,', 'qdsfdgfhgjh', 'fc76b834-1de9-41a5-aa72-eefc178d13fc', NULL),
('74b85ddb-8f0d-4cab-820a-ebe6eb35ef18', '2023-06-19 10:40:12', 'sazdfegrhtgjhk', 'sdvfbgnh,j;k:', 'b507fd4c-ce56-4031-8ac7-a3a72f69b196', '1c785c8a-f177-4399-968f-d9c67638735d'),
('8d1c83d5-bd86-4bfc-8edd-f221c95f6ad5', '2023-06-19 11:44:39', 'dzefgr', 'sdfegr', 'fc76b834-1de9-41a5-aa72-eefc178d13fc', NULL),
('9994e539-7307-471a-96be-f2f7a51fbd71', '2023-06-19 11:12:51', 'cdvbn', 'qsdfghjkl', 'fc76b834-1de9-41a5-aa72-eefc178d13fc', NULL),
('cdfe20e5-7a09-49ee-8dc7-8d8b7d52a264', '2023-06-19 10:42:30', 'fdghjk', 'hgjk', 'b507fd4c-ce56-4031-8ac7-a3a72f69b196', NULL),
('e6c86b44-1ed0-4806-b637-2d1041899522', '2023-06-19 10:39:20', 'x scdvfgn', 'x scfdvfbgn', 'b507fd4c-ce56-4031-8ac7-a3a72f69b196', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `OrderProducts`
--

CREATE TABLE `OrderProducts` (
  `id` char(36) NOT NULL,
  `total_ammount` decimal(10,0) NOT NULL,
  `user_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Orders`
--

CREATE TABLE `Orders` (
  `id` char(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_ammount` decimal(10,0) NOT NULL,
  `user_id` char(36) NOT NULL,
  `product_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Products`
--

CREATE TABLE `Products` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categories_id` char(36) NOT NULL,
  `img_path` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Products`
--

INSERT INTO `Products` (`id`, `name`, `description`, `price`, `stock_quantity`, `date_added`, `categories_id`, `img_path`) VALUES
('132a88b3-1333-4061-a6de-ecb65bbdff61', 'Veste Homme 1', 'Veste d\'escalade pour Homme', 50, 2, '2023-06-15 12:28:04', '7cf8020c-231c-483d-ace9-dea88ddb20b7', 'img/img_boutique/0f9d0f2bfad3299e17d9a4909.png'),
('3ede6b07-df44-42e8-9f57-cd6e682474ad', 'Sac à dos 2', 'Sac a dos permettant de transporter son equipement d\'escalade et autre', 70, 2, '2023-06-15 12:06:28', '82289ea0-e41b-41cb-a389-203451f50e0f', 'img/img_boutique/0f9d0f2bfad3299e17d9a4901.png'),
('723eba57-ad2f-427b-9b59-2bc8d7348a3e', 'Short Femme 2', 'Short d\'escalade pour femme', 25, 2, '2023-06-15 12:11:56', '4decb8d4-79d1-49b9-a47a-d34b680266ea', 'img/img_boutique/0f9d0f2bfad3299e17d9a4906.png'),
('a389e7c6-1fad-494f-b6c9-5ac72b45fb5d', 'Short Femme', 'short d\'escalade pour femme', 30, 2, '2023-06-15 12:10:07', '4decb8d4-79d1-49b9-a47a-d34b680266ea', 'img/img_boutique/0f9d0f2bfad3299e17d9a4904.png'),
('af6db5ee-d9c5-402c-a51e-85276596ac85', 'Sac à dos 1', 'Sac a dos permettant de transporter son équipement d\'escalade et autre', 60, 2, '2023-06-15 12:05:36', '82289ea0-e41b-41cb-a389-203451f50e0f', 'img/img_boutique/0f9d0f2bfad3299e17d9a4900.png'),
('b3fa7fbd-ff2c-4002-be51-1bbf8c3c4312', 'Short Femme 3', 'Short d\'escalade pour femme', 35, 2, '2023-06-15 12:11:13', '4decb8d4-79d1-49b9-a47a-d34b680266ea', 'img/img_boutique/0f9d0f2bfad3299e17d9a4905.png'),
('b6911109-435e-4dff-bc74-a944478f9f2a', 'Sac à dos 3', 'Sac a dos permettant de transporter son equipement d\'escalade et autre', 55, 2, '2023-06-15 12:07:10', '82289ea0-e41b-41cb-a389-203451f50e0f', 'img/img_boutique/0f9d0f2bfad3299e17d9a4902.png'),
('bed5e510-1b2c-427b-9e1d-50668dfda6b8', 'Veste Femme 1', 'Veste d\'escalade pour femme', 50, 2, '2023-06-15 12:28:36', '7cf8020c-231c-483d-ace9-dea88ddb20b7', 'img/img_boutique/0f9d0f2bfad3299e17d9a490a.png'),
('c065041d-82bf-4dc5-a44d-c4257dafa5a3', 'Short Homme 1', 'Short d\'escalade pour homme', 30, 2, '2023-06-15 12:26:06', '4decb8d4-79d1-49b9-a47a-d34b680266ea', 'img/img_boutique/0f9d0f2bfad3299e17d9a4908.png'),
('e6dda05a-7536-4f87-9e7c-179ab638a11d', 'Sac à dos 4', 'Sac a dos permettant de transporter son equipement d\'escalade et autre', 75, 2, '2023-06-15 12:07:52', '82289ea0-e41b-41cb-a389-203451f50e0f', 'img/img_boutique/0f9d0f2bfad3299e17d9a4903.png'),
('e75b1801-bd6e-4d04-899b-dee2e4912252', 'Short Femme 4', 'Short d\'escalade pour femme', 30, 2, '2023-06-15 12:12:34', '4decb8d4-79d1-49b9-a47a-d34b680266ea', 'img/img_boutique/0f9d0f2bfad3299e17d9a4907.png');

-- --------------------------------------------------------

--
-- Structure de la table `ProductsCategories`
--

CREATE TABLE `ProductsCategories` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ProductsCategories`
--

INSERT INTO `ProductsCategories` (`id`, `name`) VALUES
('342cac5f-09e9-432f-8649-6569aa767d44', 'Tee-shirt'),
('4decb8d4-79d1-49b9-a47a-d34b680266ea', 'Short'),
('7cf8020c-231c-483d-ace9-dea88ddb20b7', 'Veste'),
('82289ea0-e41b-41cb-a389-203451f50e0f', 'Sac à dos');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` char(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `date`, `name`, `firstname`, `email`, `password`, `role`) VALUES
('1b106405-4cdd-4589-a695-cf36beedd370', '2023-06-13 15:05:27', 'Test', 'Test', 'user@test.fr', '$2b$10$gco.sqsRtOO0usWlgHqpf.P6ZqZ43E6sZ8/kJwrEQBWNnDHwoCo9G', 'user'),
('1c785c8a-f177-4399-968f-d9c67638735d', '2023-06-12 17:14:11', 'michel', 'premier', 'michel1@gmail.com', '$2b$10$h.gLc48aWI3ROpajX6ugLuELelGR.eHoR7yt50fEIOgw6V7dM85xa', 'admin'),
('ab86ad54-be61-4125-bbc8-921685d89053', '2023-06-13 15:05:04', 'Test', 'Test', 'user@test.fr', '$2b$10$9j0BeSYVXAt0JX6vdjzkHOB6colkZCG7yTyrHugkhTYjCY6q5KGQS', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categorie_id` (`categorie_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Index pour la table `ArticlesCategories`
--
ALTER TABLE `ArticlesCategories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ArticlesComments`
--
ALTER TABLE `ArticlesComments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Article_id` (`article_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Index pour la table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Index pour la table `ProductsCategories`
--
ALTER TABLE `ProductsCategories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD CONSTRAINT `Articles_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `ArticlesCategories` (`id`),
  ADD CONSTRAINT `Articles_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `Users` (`id`);

--
-- Contraintes pour la table `ArticlesComments`
--
ALTER TABLE `ArticlesComments`
  ADD CONSTRAINT `ArticlesComments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `Articles` (`id`),
  ADD CONSTRAINT `ArticlesComments_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `Users` (`id`);

--
-- Contraintes pour la table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  ADD CONSTRAINT `OrderProducts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Contraintes pour la table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

--
-- Contraintes pour la table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `ProductsCategories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
