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
- **MongoDB** / **PostgreSQL** - Base de données
- **Mongoose** / **Sequelize** - ORM
- **JWT** - Authentification
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
- MongoDB ou PostgreSQL
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
# Copier le fichier .env et configurer les variables
cp .env.example .env
# Éditer .env avec vos valeurs

# Backend
cd backend
cp .env.example .env
# Configurer MONGODB_URI, JWT_SECRET, etc.

# Frontend
cd ../cityvoice-frontend
cp .env.example .env
# Configurer REACT_APP_API_URL
```

### 4. Initialiser la base de données
```bash
# PostgreSQL
psql -U votre_user -d cityvoice < database/schema.sql
psql -U votre_user -d cityvoice < database/seed.sql

# MongoDB : les collections seront créées automatiquement
```

### 5. Lancer l'application

#### Mode développement
```bash
# Lancer backend et frontend simultanément
npm run dev

# Ou séparément
npm run dev:backend    # Backend sur http://localhost:5000
npm run dev:frontend   # Frontend sur http://localhost:3000
```

---

## 📚 Documentation

- [Architecture technique](docs/architecture.md)
- [Spécifications API](docs/api-specs.md)
- [Guide de contribution](CONTRIBUTING.md) (à venir)

---

## 🎯 Fonctionnalités

### Niveau Basique ✅
- ✅ Signalement avec 10 catégories
- ✅ Carte interactive des incidents
- ✅ Suivi par statut (En attente, En cours, Résolu)
- ✅ Upload d'images
- ✅ Géolocalisation

### Niveau Intermédiaire 🚧
- 🚧 Vote communautaire de priorisation
- 🚧 Dashboard analytics par quartier
- 🚧 Système de notifications automatiques

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
# Build backend
npm run build:backend

# Build frontend
npm run build:frontend

# Déploiement automatique via GitHub Actions sur push vers main
```

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
