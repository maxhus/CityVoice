-- Migration 002: Ajout des champs manquants à la table signalement
-- Date: 2025-11-25
-- Description: Ajout de titre, latitude, longitude, adresse, quartier, priorite

USE `cityvoice`;

-- Vérifier et ajouter le champ 'titre' s'il n'existe pas
ALTER TABLE `signalement` 
ADD COLUMN IF NOT EXISTS `titre` VARCHAR(255) NOT NULL AFTER `id_signalement`;

-- Vérifier et ajouter les champs géographiques s'ils n'existent pas
ALTER TABLE `signalement` 
ADD COLUMN IF NOT EXISTS `latitude` DECIMAL(10, 8) NOT NULL DEFAULT 0 AFTER `categorie`,
ADD COLUMN IF NOT EXISTS `longitude` DECIMAL(11, 8) NOT NULL DEFAULT 0 AFTER `latitude`;

-- Vérifier et ajouter les champs d'adresse s'ils n'existent pas
ALTER TABLE `signalement` 
ADD COLUMN IF NOT EXISTS `adresse` TEXT AFTER `longitude`,
ADD COLUMN IF NOT EXISTS `quartier` VARCHAR(100) AFTER `adresse`;

-- Vérifier et ajouter le champ priorite s'il n'existe pas
ALTER TABLE `signalement` 
ADD COLUMN IF NOT EXISTS `priorite` VARCHAR(20) DEFAULT 'normale' AFTER `statut`;

-- Vérifier et ajouter les champs admin s'ils n'existent pas
ALTER TABLE `signalement` 
ADD COLUMN IF NOT EXISTS `id_admin_assigne` INT AFTER `date_resolution`,
ADD COLUMN IF NOT EXISTS `note_admin` TEXT AFTER `id_admin_assigne`;

-- Ajouter la clé étrangère pour id_admin_assigne si elle n'existe pas
ALTER TABLE `signalement` 
ADD CONSTRAINT `fk_signalement_admin` 
FOREIGN KEY (`id_admin_assigne`) REFERENCES `administrateur`(`id_admin`) ON DELETE SET NULL;

-- Ajouter des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS `idx_location` ON `signalement` (`latitude`, `longitude`);

SELECT 'Migration 002 terminée avec succès' AS message;
