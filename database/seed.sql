-- Données de test pour CityVoice

-- Insertion des catégories
INSERT INTO categories (nom, description, icone, couleur) VALUES
('Infrastructure', 'Problèmes de routes, trottoirs, ponts', '🛣️', '#FF6B6B'),
('Propreté', 'Déchets, ordures, nettoyage urbain', '🗑️', '#4ECDC4'),
('Sécurité', 'Éclairage public, dangers', '🚨', '#FFE66D'),
('Espaces verts', 'Parcs, jardins, arbres', '🌳', '#95E1D3'),
('Mobilier urbain', 'Bancs, panneaux, arrêts de bus', '🪑', '#F38181'),
('Circulation', 'Signalisation, feux, parking', '🚦', '#AA96DA'),
('Eau', 'Fuites, inondations', '💧', '#A8E6CF'),
('Bruit', 'Nuisances sonores', '🔊', '#FCBAD3'),
('Animaux', 'Animaux errants, nuisibles', '🐕', '#FFD3B6'),
('Autres', 'Autres problèmes urbains', '📋', '#DCEDC1');

-- Insertion d'utilisateurs de test
INSERT INTO users (nom, prenom, email, password_hash, telephone, role) VALUES
('Admin', 'CityVoice', 'admin@cityvoice.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '+33601020304', 'administrateur'),
('Dupont', 'Jean', 'jean.dupont@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '+33612345678', 'citoyen'),
('Martin', 'Marie', 'marie.martin@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '+33623456789', 'citoyen'),
('Bernard', 'Pierre', 'pierre.bernard@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '+33634567890', 'moderateur'),
('Dubois', 'Sophie', 'sophie.dubois@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '+33645678901', 'citoyen');

-- Insertion de signalements de test
INSERT INTO signalements (titre, description, categorie_id, statut, latitude, longitude, adresse, quartier, auteur_id, priorite) VALUES
('Nid de poule rue Victor Hugo', 'Grand trou dangereux sur la chaussée, à réparer rapidement', 1, 'en_attente', 48.8566, 2.3522, '45 Rue Victor Hugo, 75001 Paris', 'Centre-Ville', 2, 'haute'),
('Poubelle débordante Place de la République', 'La poubelle publique déborde depuis plusieurs jours', 2, 'en_cours', 48.8678, 2.3635, 'Place de la République, 75003 Paris', 'République', 3, 'normale'),
('Lampadaire cassé Avenue des Champs', 'Éclairage public défaillant, zone sombre le soir', 3, 'en_attente', 48.8698, 2.3078, '12 Avenue des Champs, 75008 Paris', 'Champs-Élysées', 2, 'haute'),
('Arbre mort Parc Monceau', 'Arbre mort qui pourrait tomber, dangereux', 4, 'resolu', 48.8800, 2.3089, 'Parc Monceau, 75008 Paris', 'Monceau', 5, 'urgente'),
('Banc cassé Jardin du Luxembourg', 'Banc public endommagé, à remplacer', 5, 'en_attente', 48.8462, 2.3372, 'Jardin du Luxembourg, 75006 Paris', 'Luxembourg', 3, 'basse'),
('Feu tricolore en panne', 'Feu rouge ne fonctionne plus, risque d''accident', 6, 'en_cours', 48.8534, 2.3488, 'Carrefour Bastille, 75012 Paris', 'Bastille', 2, 'urgente'),
('Fuite d''eau sur trottoir', 'Grosse fuite d''eau continue depuis ce matin', 7, 'en_attente', 48.8606, 2.3376, '78 Boulevard Saint-Michel, 75006 Paris', 'Quartier Latin', 5, 'haute'),
('Travaux bruyants la nuit', 'Nuisances sonores travaux nocturnes non autorisés', 8, 'rejete', 48.8584, 2.2945, '15 Rue de la Convention, 75015 Paris', 'Convention', 3, 'normale'),
('Chien errant agressif', 'Chien sans propriétaire apparent, comportement agressif', 9, 'resolu', 48.8738, 2.2950, 'Bois de Boulogne, 75016 Paris', 'Bois de Boulogne', 2, 'haute'),
('Graffiti sur monument historique', 'Tags vandales sur bâtiment classé', 10, 'en_attente', 48.8529, 2.3499, '1 Place de la Bastille, 75004 Paris', 'Bastille', 5, 'normale');

-- Insertion de votes
INSERT INTO votes (signalement_id, user_id) VALUES
(1, 2), (1, 3), (1, 5),
(2, 2), (2, 4),
(3, 3), (3, 5), (3, 2), (3, 4),
(6, 2), (6, 3), (6, 4), (6, 5),
(7, 2), (7, 5);

-- Insertion de commentaires
INSERT INTO commentaires (signalement_id, auteur_id, texte) VALUES
(1, 3, 'J''ai failli avoir un accident à cause de ce trou !'),
(1, 5, 'Très dangereux en effet, intervention urgente nécessaire'),
(2, 2, 'Le problème persiste depuis plus d''une semaine maintenant'),
(3, 4, 'Zone très fréquentée le soir, c''est un vrai problème de sécurité'),
(6, 5, 'J''ai appelé la police pour signaler le danger');

-- Insertion de l'historique des statuts
INSERT INTO historique_statut (signalement_id, ancien_statut, nouveau_statut, modifie_par, commentaire) VALUES
(2, 'en_attente', 'en_cours', 1, 'Équipe de nettoyage envoyée sur place'),
(4, 'en_attente', 'en_cours', 1, 'Intervention programmée'),
(4, 'en_cours', 'resolu', 1, 'Arbre abattu et évacué'),
(6, 'en_attente', 'en_cours', 1, 'Technicien dépêché sur site'),
(8, 'en_attente', 'rejete', 1, 'Travaux autorisés, horaires respectés'),
(9, 'en_attente', 'en_cours', 1, 'Service vétérinaire contacté'),
(9, 'en_cours', 'resolu', 1, 'Animal récupéré par la SPA');

-- Insertion de notifications
INSERT INTO notifications (user_id, signalement_id, type, message) VALUES
(2, 1, 'nouveau_commentaire', 'Nouveau commentaire sur votre signalement'),
(3, 2, 'changement_statut', 'Le statut de votre signalement a changé: en_cours'),
(2, 6, 'nouveau_commentaire', 'Nouveau commentaire sur votre signalement'),
(5, 4, 'changement_statut', 'Le statut de votre signalement a changé: resolu');
