# 🏛️ CityVoice

**Plateforme de participation citoyenne pour signaler et résoudre les problèmes urbains**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)

---

## 📋 Description

CityVoice est une plateforme inspirée des projets de civic tech d'Amérique latine et d'Afrique, permettant aux citoyens de :
- 📍 Signaler des problèmes urbains (infrastructure, propreté, sécurité)
- 🗺️ Géolocaliser précisément les incidents
- 📸 Ajouter des photos pour documenter
- 👥 Voter pour prioriser les problèmes
- 📊 Suivre en temps réel les résolutions par les services municipaux

**Impact attendu** : Réduction de 50% du temps de résolution des problèmes urbains signalés

---

## 🏗️ Structure du Projet

```
CityVoice/
├── .github/              # CI/CD workflows
├── backend/              # API Node.js/Express
│   ├── controllers/      # Logique métier
│   ├── models/           # Schémas de données
│   ├── routes/           # Endpoints API
│   ├── middleware/       # Auth, validation
│   ├── config/           # Configuration DB
│   └── server.js         # Point d'entrée
├── cityvoice-frontend/   # Interface React
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages principales
│   │   ├── services/     # Appels API
│   │   ├── hooks/        # Custom hooks
│   │   ├── context/      # State management
│   │   └── router/       # Routes
├── docs/                 # Documentation
│   ├── architecture.md   # Architecture technique
│   ├── api-specs.md      # Spécifications API
│   └── maquettes/        # Designs UI
├── database/             # Scripts SQL
│   ├── schema.sql        # Schéma DB
│   ├── seed.sql          # Données de test
│   └── migrations/       # Migrations
└── README.md
```

---

## 🛠️ Stack Technique

### Frontend
- **React** 19.2.0 - Interface utilisateur
- **React Router** - Navigation
- **Leaflet** - Cartographie interactive
- **Material-UI** - Composants UI
- **Axios** - Requêtes HTTP

### Backend
- **Node.js** + **Express** - API REST
- **MySQL** (MariaDB 10.4.32) - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **Multer** - Upload d'images
- **Nodemailer** - Notifications email

### DevOps
- **GitHub Actions** - CI/CD
- **Docker** - Conteneurisation (à venir)
- **Vercel** / **Netlify** - Déploiement frontend
- **Railway** / **Render** - Déploiement backend

---

## 🚀 Installation

### Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org/))
- MySQL (MariaDB 10.4.32 ou supérieur)
- phpMyAdmin (ou tout client MySQL)
- Git

### 1. Cloner le dépôt
```bash
git clone https://github.com/maxhus/CityVoice.git
cd CityVoice
```

### 2. Installer les dépendances
```bash
# Installer toutes les dépendances
npm run install:all

# Ou manuellement
cd backend && npm install
cd ../cityvoice-frontend && npm install
```

### 3. Configuration
```bash
# Backend
cd backend
cp .env.example .env
# Éditer .env avec vos paramètres MySQL :
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=cityvoice
# DB_PORT=3306
# JWT_SECRET=votre_secret_jwt

# Frontend
cd ../cityvoice-frontend
cp .env.example .env
# REACT_APP_API_URL=http://localhost:5000
```

### 4. Initialiser la base de données
```bash
# Importer le schéma MySQL via phpMyAdmin ou ligne de commande
mysql -u root -p < database/gestion_signalements.sql

# Ou via phpMyAdmin :
# 1. Ouvrir phpMyAdmin
# 2. Importer le fichier database/gestion_signalements.sql
# 3. La base 'cityvoice' sera créée automatiquement avec :
#    - 7 tables (citoyen, signalement, administrateur, etc.)
#    - Données de test (5 citoyens, 8 signalements)
```

### 5. Lancer l'application

#### Mode développement
```bash
# Lancer le backend
cd backend
npm start              # Backend sur http://localhost:5000

# Lancer le frontend (dans un autre terminal)
cd cityvoice-frontend
npm start              # Frontend sur http://localhost:3001
```

#### Compte de test
```
Email: pierre.martin@example.com
Mot de passe: password123
```

---

## 📚 Documentation

### 📖 Documentation Complète

- 🚀 **[Guide de Démarrage Rapide](docs/QUICK_START.md)** - Installation et configuration en 10 minutes
- 📊 **[État du Projet](docs/PROJECT_STATUS.md)** - Fonctionnalités implémentées et roadmap
- 🗓️ **[Roadmap de Développement](docs/DEVELOPMENT_ROADMAP.md)** - Plan détaillé par sprint
- 📐 **[Diagrammes UML](docs/UML_DIAGRAMS.md)** - Architecture et workflows complets
- 🏗️ **[Architecture Technique](docs/architecture.md)** - Stack et composants
- 📡 **[Spécifications API](docs/api-specs.md)** - Documentation des endpoints
- 🤝 **[Guide de Contribution](CONTRIBUTING.md)** (à venir)

### 🎯 Par où commencer ?

1. **Nouveau sur le projet ?** → Lisez le [Guide de Démarrage Rapide](docs/QUICK_START.md)
2. **Développeur ?** → Consultez la [Roadmap de Développement](docs/DEVELOPMENT_ROADMAP.md)
3. **Architecte ?** → Étudiez les [Diagrammes UML](docs/UML_DIAGRAMS.md)
4. **Chef de projet ?** → Voir l'[État du Projet](docs/PROJECT_STATUS.md)

---

## 🎯 Fonctionnalités

### Niveau Basique ✅
- ✅ Base de données MySQL avec 7 tables
- ✅ API REST complète (signalements, citoyens, authentification)
- ✅ Authentification JWT avec bcrypt
- ✅ Pages Connexion et Inscription fonctionnelles
- ✅ Carte interactive des incidents (Leaflet)
- ✅ Forum de discussion
- ✅ Signalement avec catégories (Voirie, Propreté, Éclairage, etc.)
- ✅ Suivi par statut (Nouveau, En cours, Résolu, Rejeté)
- ✅ Géolocalisation automatique

### Niveau Intermédiaire 🚧
- 🚧 Dashboard utilisateur (mes signalements)
- 🚧 Upload d'images pour les signalements
- 🚧 Vote communautaire de priorisation
- 🚧 Dashboard analytics par quartier
- 🚧 Système de notifications en temps réel
- 🚧 Routes protégées avec authentification

### Niveau Avancé 📋
- 📋 IA de catégorisation automatique
- 📋 Intégration avec systèmes municipaux
- 📋 Prédiction des zones à risque

---

## 🧪 Tests

```bash
# Tests backend
npm run test:backend

# Tests frontend
npm run test:frontend

# Tous les tests
npm test
```

---

## 📦 Build & Déploiement

```bash
# Build frontend pour production
cd cityvoice-frontend
npm run build          # Crée le dossier build/ optimisé

# Le backend n'a pas besoin de build (Node.js)
# Déploiement automatique via GitHub Actions sur push vers main
```

## 📡 API Endpoints

### Signalements
- `GET /api/signalements` - Liste tous les signalements
- `GET /api/signalements/:id` - Détails d'un signalement
- `GET /api/signalements/stats` - Statistiques par statut/catégorie
- `POST /api/signalements` - Créer un signalement (auth requise)
- `PUT /api/signalements/:id` - Modifier un signalement
- `DELETE /api/signalements/:id` - Supprimer un signalement

### Authentification
- `POST /api/citoyens/inscription` - Créer un compte
- `POST /api/citoyens/connexion` - Se connecter (retourne un token JWT)
- `GET /api/citoyens/profil/:id` - Voir le profil
- `PUT /api/citoyens/profil/:id` - Modifier le profil

---

## 👥 Contributeurs

- **Eliel** - Développeur Principal
- **Maxhus** - Repository Owner

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📧 Contact

Pour toute question : 
- **Email** : contact@cityvoice.com
- **Issues** : [GitHub Issues](https://github.com/maxhus/CityVoice/issues)

---

## 🙏 Remerciements

Inspiré des initiatives de civic tech à travers le monde, notamment :
- **FixMyStreet** (UK)
- **Colab.re** (Brésil)
- **Ma3Route** (Sénégal)

---

**⭐ Si ce projet vous plaît, n'oubliez pas de mettre une étoile !**
