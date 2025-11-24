-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 24 nov. 2025 à 11:58
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_signalements`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `id_admin` int(11) NOT NULL,
  `nom_admin` varchar(50) NOT NULL,
  `prenom_admin` varchar(50) NOT NULL,
  `email_admin` varchar(100) NOT NULL,
  `mot_de_passe_admin` varchar(255) NOT NULL,
  `id_service` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `citoyen`
--

CREATE TABLE `citoyen` (
  `id_citoyen` int(11) NOT NULL,
  `nom_citoyen` varchar(50) NOT NULL,
  `prenom_citoyen` varchar(50) NOT NULL,
  `email_citoyen` varchar(100) NOT NULL,
  `mot_de_passe_citoyen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `declencher`
--

CREATE TABLE `declencher` (
  `id_signalement` int(11) NOT NULL,
  `id_notification` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `historiquestatut`
--

CREATE TABLE `historiquestatut` (
  `id_historique` int(11) NOT NULL,
  `ancien_statut` varchar(50) DEFAULT NULL,
  `nouveau_statut` varchar(50) NOT NULL,
  `date_modification` datetime DEFAULT current_timestamp(),
  `id_signalement` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id_notification` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date_notification` datetime DEFAULT current_timestamp(),
  `lue` tinyint(1) DEFAULT 0,
  `id_citoyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `service_municipal`
--

CREATE TABLE `service_municipal` (
  `id_service` int(11) NOT NULL,
  `nom_service` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `signalement`
--

CREATE TABLE `signalement` (
  `id_signalement` int(11) NOT NULL,
  `description` text NOT NULL,
  `categorie` varchar(100) NOT NULL,
  `date_soumission` datetime DEFAULT current_timestamp(),
  `statut` varchar(50) DEFAULT 'Nouveau',
  `id_citoyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `email_admin` (`email_admin`),
  ADD KEY `id_service` (`id_service`);

--
-- Index pour la table `citoyen`
--
ALTER TABLE `citoyen`
  ADD PRIMARY KEY (`id_citoyen`),
  ADD UNIQUE KEY `email_citoyen` (`email_citoyen`);

--
-- Index pour la table `declencher`
--
ALTER TABLE `declencher`
  ADD PRIMARY KEY (`id_signalement`,`id_notification`),
  ADD KEY `id_notification` (`id_notification`);

--
-- Index pour la table `historiquestatut`
--
ALTER TABLE `historiquestatut`
  ADD PRIMARY KEY (`id_historique`),
  ADD KEY `id_signalement` (`id_signalement`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id_notification`),
  ADD KEY `id_citoyen` (`id_citoyen`);

--
-- Index pour la table `service_municipal`
--
ALTER TABLE `service_municipal`
  ADD PRIMARY KEY (`id_service`),
  ADD UNIQUE KEY `nom_service` (`nom_service`);

--
-- Index pour la table `signalement`
--
ALTER TABLE `signalement`
  ADD PRIMARY KEY (`id_signalement`),
  ADD KEY `id_citoyen` (`id_citoyen`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateur`
--
ALTER TABLE `administrateur`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `citoyen`
--
ALTER TABLE `citoyen`
  MODIFY `id_citoyen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `historiquestatut`
--
ALTER TABLE `historiquestatut`
  MODIFY `id_historique` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `service_municipal`
--
ALTER TABLE `service_municipal`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `signalement`
--
ALTER TABLE `signalement`
  MODIFY `id_signalement` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD CONSTRAINT `administrateur_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `service_municipal` (`id_service`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `declencher`
--
ALTER TABLE `declencher`
  ADD CONSTRAINT `declencher_ibfk_1` FOREIGN KEY (`id_signalement`) REFERENCES `signalement` (`id_signalement`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `declencher_ibfk_2` FOREIGN KEY (`id_notification`) REFERENCES `notification` (`id_notification`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `historiquestatut`
--
ALTER TABLE `historiquestatut`
  ADD CONSTRAINT `historiquestatut_ibfk_1` FOREIGN KEY (`id_signalement`) REFERENCES `signalement` (`id_signalement`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historiquestatut_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `administrateur` (`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen` (`id_citoyen`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `signalement`
--
ALTER TABLE `signalement`
  ADD CONSTRAINT `signalement_ibfk_1` FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen` (`id_citoyen`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
