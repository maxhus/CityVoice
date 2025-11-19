-- Schema de la base de données CityVoice
-- Base de données: PostgreSQL (alternative à MongoDB)

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'citoyen' CHECK (role IN ('citoyen', 'administrateur', 'moderateur')),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icone VARCHAR(50),
    couleur VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des signalements
CREATE TABLE IF NOT EXISTS signalements (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    categorie_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    statut VARCHAR(20) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'en_cours', 'resolu', 'rejete')),
    priorite VARCHAR(20) DEFAULT 'normale' CHECK (priorite IN ('basse', 'normale', 'haute', 'urgente')),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    adresse TEXT,
    quartier VARCHAR(100),
    auteur_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assigne_a INTEGER REFERENCES users(id) ON DELETE SET NULL,
    note_admin TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Index géospatial pour les recherches par localisation
CREATE INDEX IF NOT EXISTS idx_signalements_location ON signalements(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_signalements_statut ON signalements(statut);
CREATE INDEX IF NOT EXISTS idx_signalements_categorie ON signalements(categorie_id);

-- Table des images
CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    signalement_id INTEGER REFERENCES signalements(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    public_id VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des votes
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    signalement_id INTEGER REFERENCES signalements(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(signalement_id, user_id)
);

-- Table des commentaires
CREATE TABLE IF NOT EXISTS commentaires (
    id SERIAL PRIMARY KEY,
    signalement_id INTEGER REFERENCES signalements(id) ON DELETE CASCADE,
    auteur_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    texte TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    signalement_id INTEGER REFERENCES signalements(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de l'historique des changements de statut
CREATE TABLE IF NOT EXISTS historique_statut (
    id SERIAL PRIMARY KEY,
    signalement_id INTEGER REFERENCES signalements(id) ON DELETE CASCADE,
    ancien_statut VARCHAR(20),
    nouveau_statut VARCHAR(20) NOT NULL,
    modifie_par INTEGER REFERENCES users(id) ON DELETE SET NULL,
    commentaire TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_signalements_updated_at BEFORE UPDATE ON signalements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_commentaires_updated_at BEFORE UPDATE ON commentaires
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
