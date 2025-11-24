-- Données de test pour gestion_signalements
-- Insère des citoyens, services, administrateurs et signalements de test

-- Services municipaux
INSERT INTO `service_municipal` (`nom_service`) VALUES
('Voirie et Travaux Publics'),
('Environnement et Propreté'),
('Espaces Verts'),
('Éclairage Public'),
('Transport et Mobilité');

-- Citoyens de test (mot de passe: password123)
INSERT INTO `citoyen` (`nom_citoyen`, `prenom_citoyen`, `email_citoyen`, `mot_de_passe_citoyen`) VALUES
('Dupont', 'Marie', 'marie.dupont@example.com', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC'),
('Martin', 'Pierre', 'pierre.martin@example.com', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC'),
('Bernard', 'Sophie', 'sophie.bernard@example.com', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC'),
('Dubois', 'Luc', 'luc.dubois@example.com', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC'),
('Petit', 'Julie', 'julie.petit@example.com', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC');

-- Administrateurs (mot de passe: password123)
INSERT INTO `administrateur` (`nom_admin`, `prenom_admin`, `email_admin`, `mot_de_passe_admin`, `id_service`) VALUES
('Lefebvre', 'Jean', 'jean.lefebvre@mairie.fr', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC', 1),
('Moreau', 'Claire', 'claire.moreau@mairie.fr', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC', 2),
('Simon', 'Marc', 'marc.simon@mairie.fr', '$2a$10$YQs7P3X5nF8vHZqKp5WKOeX9n9Z2rK3L1VuH5Y9mP7sK3Q5jZrYHC', 3);

-- Signalements
INSERT INTO `signalement` (`description`, `categorie`, `statut`, `id_citoyen`, `date_soumission`) VALUES
('Nid de poule important sur la rue Victor Hugo, dangereux pour les véhicules', 'Infrastructure', 'Nouveau', 1, '2025-11-20 09:15:00'),
('Poubelles non ramassées depuis 3 jours rue de la République', 'Propreté', 'En cours', 2, '2025-11-19 14:30:00'),
('Éclairage public défaillant sur le parking de la gare', 'Éclairage', 'Nouveau', 3, '2025-11-21 18:45:00'),
('Arbre mort menaçant de tomber au parc municipal', 'Espaces verts', 'Résolu', 4, '2025-11-15 10:20:00'),
('Graffitis sur le mur de l''école primaire', 'Vandalisme', 'En cours', 5, '2025-11-18 16:00:00'),
('Fuite d''eau importante au niveau du trottoir rue Pasteur', 'Infrastructure', 'Nouveau', 1, '2025-11-22 07:30:00'),
('Banc cassé au jardin public', 'Mobilier urbain', 'Nouveau', 2, '2025-11-23 11:45:00'),
('Conteneur à verre plein, débordement', 'Propreté', 'Nouveau', 3, '2025-11-23 15:20:00');

-- Notifications
INSERT INTO `notification` (`message`, `id_citoyen`, `lue`, `date_notification`) VALUES
('Votre signalement #1 a été pris en compte', 1, 1, '2025-11-20 09:30:00'),
('Votre signalement #2 est en cours de traitement', 2, 1, '2025-11-19 15:00:00'),
('Votre signalement #3 a été pris en compte', 3, 0, '2025-11-21 19:00:00'),
('Votre signalement #4 a été résolu', 4, 1, '2025-11-16 14:00:00'),
('Votre signalement #5 est en cours de traitement', 5, 0, '2025-11-19 09:00:00');

-- Historique des statuts
INSERT INTO `historiquestatut` (`ancien_statut`, `nouveau_statut`, `id_signalement`, `id_admin`, `date_modification`) VALUES
(NULL, 'Nouveau', 1, NULL, '2025-11-20 09:15:00'),
('Nouveau', 'En cours', 2, 2, '2025-11-19 15:00:00'),
(NULL, 'Nouveau', 3, NULL, '2025-11-21 18:45:00'),
(NULL, 'Nouveau', 4, NULL, '2025-11-15 10:20:00'),
('Nouveau', 'En cours', 4, 3, '2025-11-15 14:00:00'),
('En cours', 'Résolu', 4, 3, '2025-11-16 14:00:00'),
('Nouveau', 'En cours', 5, 1, '2025-11-19 09:00:00');

-- Note: Les mots de passe sont hashés avec bcrypt (hash de "password123")
-- En production, utilisez toujours des mots de passe forts et uniques
