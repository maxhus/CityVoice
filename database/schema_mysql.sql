-- ========================================
-- CityVoice - Schéma MySQL/MariaDB
-- ========================================

CREATE DATABASE IF NOT EXISTS `cityvoice` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cityvoice`;

-- ========================================
-- Table: citoyen
-- ========================================
CREATE TABLE IF NOT EXISTS `citoyen` (
  `id_citoyen` INT AUTO_INCREMENT PRIMARY KEY,
  `nom_citoyen` VARCHAR(50) NOT NULL,
  `prenom_citoyen` VARCHAR(50) NOT NULL,
  `email_citoyen` VARCHAR(100) NOT NULL UNIQUE,
  `mot_de_passe_citoyen` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(20),
  `avatar_url` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: service_municipal
-- ========================================
CREATE TABLE IF NOT EXISTS `service_municipal` (
  `id_service` INT AUTO_INCREMENT PRIMARY KEY,
  `nom_service` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: administrateur
-- ========================================
CREATE TABLE IF NOT EXISTS `administrateur` (
  `id_admin` INT AUTO_INCREMENT PRIMARY KEY,
  `nom_admin` VARCHAR(50) NOT NULL,
  `prenom_admin` VARCHAR(50) NOT NULL,
  `email_admin` VARCHAR(100) NOT NULL UNIQUE,
  `mot_de_passe_admin` VARCHAR(255) NOT NULL,
  `id_service` INT,
  `role` VARCHAR(20) DEFAULT 'moderateur',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_service`) REFERENCES `service_municipal`(`id_service`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: signalement
-- ========================================
CREATE TABLE IF NOT EXISTS `signalement` (
  `id_signalement` INT AUTO_INCREMENT PRIMARY KEY,
  `titre` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `categorie` VARCHAR(100) NOT NULL,
  `statut` VARCHAR(50) DEFAULT 'en_attente',
  `priorite` VARCHAR(20) DEFAULT 'normale',
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `adresse` TEXT,
  `quartier` VARCHAR(100),
  `date_soumission` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_resolution` DATETIME,
  `id_citoyen` INT NOT NULL,
  `id_admin_assigne` INT,
  `note_admin` TEXT,
  FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen`(`id_citoyen`) ON DELETE CASCADE,
  FOREIGN KEY (`id_admin_assigne`) REFERENCES `administrateur`(`id_admin`) ON DELETE SET NULL,
  INDEX idx_statut (`statut`),
  INDEX idx_categorie (`categorie`),
  INDEX idx_location (`latitude`, `longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: images_signalement
-- ========================================
CREATE TABLE IF NOT EXISTS `images_signalement` (
  `id_image` INT AUTO_INCREMENT PRIMARY KEY,
  `id_signalement` INT NOT NULL,
  `url` TEXT NOT NULL,
  `public_id` VARCHAR(255),
  `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_signalement`) REFERENCES `signalement`(`id_signalement`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: votes
-- ========================================
CREATE TABLE IF NOT EXISTS `votes` (
  `id_vote` INT AUTO_INCREMENT PRIMARY KEY,
  `id_signalement` INT NOT NULL,
  `id_citoyen` INT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_signalement`) REFERENCES `signalement`(`id_signalement`) ON DELETE CASCADE,
  FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen`(`id_citoyen`) ON DELETE CASCADE,
  UNIQUE KEY unique_vote (`id_signalement`, `id_citoyen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: commentaires
-- ========================================
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id_commentaire` INT AUTO_INCREMENT PRIMARY KEY,
  `id_signalement` INT NOT NULL,
  `id_citoyen` INT,
  `id_admin` INT,
  `texte` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_signalement`) REFERENCES `signalement`(`id_signalement`) ON DELETE CASCADE,
  FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen`(`id_citoyen`) ON DELETE SET NULL,
  FOREIGN KEY (`id_admin`) REFERENCES `administrateur`(`id_admin`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: notification
-- ========================================
CREATE TABLE IF NOT EXISTS `notification` (
  `id_notification` INT AUTO_INCREMENT PRIMARY KEY,
  `id_citoyen` INT NOT NULL,
  `id_signalement` INT,
  `type` VARCHAR(50) NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `lue` BOOLEAN DEFAULT FALSE,
  `date_notification` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_citoyen`) REFERENCES `citoyen`(`id_citoyen`) ON DELETE CASCADE,
  FOREIGN KEY (`id_signalement`) REFERENCES `signalement`(`id_signalement`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Table: historiquestatut
-- ========================================
CREATE TABLE IF NOT EXISTS `historiquestatut` (
  `id_historique` INT AUTO_INCREMENT PRIMARY KEY,
  `id_signalement` INT NOT NULL,
  `ancien_statut` VARCHAR(50),
  `nouveau_statut` VARCHAR(50) NOT NULL,
  `id_admin` INT,
  `commentaire` TEXT,
  `date_modification` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_signalement`) REFERENCES `signalement`(`id_signalement`) ON DELETE CASCADE,
  FOREIGN KEY (`id_admin`) REFERENCES `administrateur`(`id_admin`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Insertion des données de test
-- ========================================

-- Services municipaux
INSERT INTO `service_municipal` (`nom_service`, `description`) VALUES
('Voirie et Infrastructure', 'Gestion des routes, ponts et infrastructure urbaine'),
('Propreté Urbaine', 'Gestion des déchets et nettoyage des espaces publics'),
('Sécurité Publique', 'Éclairage public et sécurité des citoyens'),
('Espaces Verts', 'Entretien des parcs et jardins publics');

-- Administrateur par défaut
INSERT INTO `administrateur` (`nom_admin`, `prenom_admin`, `email_admin`, `mot_de_passe_admin`, `id_service`, `role`) VALUES
('Admin', 'CityVoice', 'admin@cityvoice.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'administrateur');
-- Mot de passe: password (à changer en production)
