-- Migration: Ajouter la colonne role à la table administrateur
USE gestion_signalements;

-- Ajouter la colonne role si elle n'existe pas
ALTER TABLE `administrateur` 
ADD COLUMN IF NOT EXISTS `role` VARCHAR(20) DEFAULT 'moderateur' AFTER `id_service`;

-- Mettre à jour les admins existants qui n'ont pas de role
UPDATE `administrateur` SET `role` = 'admin' WHERE `role` IS NULL;

-- Afficher les admins
SELECT id_admin, nom_admin, prenom_admin, email_admin, role FROM `administrateur`;
