# 🏛️ CityVoice - État du Projet et Roadmap

**Date de mise à jour**: 25 novembre 2025

---

## 📊 Vue d'ensemble

CityVoice est une plateforme de participation citoyenne permettant aux résidents de signaler et suivre la résolution de problèmes urbains (infrastructure, propreté, sécurité).

**Objectif**: Réduire de 50% le temps de résolution des problèmes urbains signalés.

---

## ✅ État Actuel - Fonctionnalités Implémentées

### Backend (Node.js + Express + MySQL)

#### ✅ Architecture de base
- [x] Serveur Express configuré
- [x] Connexion MySQL avec Sequelize ORM
- [x] Middleware CORS et parsing JSON
- [x] Gestion des erreurs globale
- [x] Variables d'environnement (.env)

#### ✅ Modèles de données (Sequelize)
- [x] **Citoyen**: Gestion des utilisateurs citoyens
- [x] **Signalement**: Signalements avec géolocalisation
- [x] **Administrateur**: Gestionnaires municipaux
- [x] **ServiceMunicipal**: Services de la ville
- [x] **HistoriqueStatut**: Traçabilité des changements
- [x] **Notification**: Système de notifications

#### ✅ Controllers & Routes
- [x] **SignalementController**: CRUD complet des signalements
  - Récupération avec filtres (catégorie, statut)
  - Pagination
  - Géolocalisation (latitude, longitude)
  - Historique des statuts
  
- [x] **CitoyenController**: Gestion des citoyens
  - Inscription/Connexion
  - Profil utilisateur

#### ✅ Middleware
- [x] Authentification JWT
- [x] Validation des données (express-validator)

#### ✅ Base de données
- [x] Schéma MySQL complet
- [x] Script de migration
- [x] Données de test (seed)
- [x] Support de géolocalisation (latitude/longitude)

### Frontend (React 19)

#### ✅ Architecture de base
- [x] Configuration React Router
- [x] Context API pour l'authentification
- [x] Axios pour les appels API
- [x] Material-UI pour les composants

#### ✅ Pages principales
- [x] **Home**: Page d'accueil avec carte
- [x] **Connexion**: Authentification utilisateur
- [x] **Inscription**: Enregistrement nouveau citoyen
- [x] **Signalement**: Formulaire de signalement
- [x] **Forum**: Discussion communautaire

#### ✅ Composants
- [x] **Header**: Navigation principale
- [x] **MapView**: Carte Leaflet avec signalements
- [x] **ReportCard**: Carte d'affichage des signalements
- [x] **SearchBar**: Recherche de signalements
- [x] **CategoryFilter**: Filtrage par catégorie
- [x] **ForumCard**: Carte de discussion

#### ✅ Fonctionnalités
- [x] Géolocalisation (hook useGeoLocation)
- [x] Affichage carte interactive (Leaflet)
- [x] Filtrage par catégorie
- [x] Recherche

### Documentation

- [x] README complet
- [x] Architecture technique
- [x] Spécifications API
- [x] Schéma de base de données

---

## 📋 Niveau de Réalisation

### ✅ Niveau Basique (COMPLÉTÉ à 90%)

| Fonctionnalité | État | Notes |
|----------------|------|-------|
| Signalement avec 10 catégories | ✅ Implémenté | Catégories dans le schéma DB |
| Carte des incidents publics | ✅ Implémenté | Leaflet + React-Leaflet |
| Suivi simple par statut | ✅ Implémenté | 4 statuts: nouveau, en_attente, en_cours, résolu |
| Upload d'images | ✅ Partiellement | Multer configuré, intégration front manquante |
| Géolocalisation | ✅ Implémenté | Latitude/Longitude + hook custom |

### 🔄 Niveau Intermédiaire (EN COURS - 40%)

| Fonctionnalité | État | Notes |
|----------------|------|-------|
| Vote communautaire | ❌ À faire | Table votes existe en DB, backend manquant |
| Dashboard analytics | ❌ À faire | Statistiques par quartier à implémenter |
| Notifications automatiques | 🔄 Partiel | Modèle créé, système email manquant |
| Commentaires | ❌ À faire | Table exists, endpoints manquants |
| Système de priorisation | ❌ À faire | Basé sur votes + ancienneté |

### ❌ Niveau Avancé (NON DÉMARRÉ - 0%)

| Fonctionnalité | État | Notes |
|----------------|------|-------|
| IA de catégorisation | ❌ À faire | Nécessite TensorFlow.js ou API externe |
| Intégration systèmes municipaux | ❌ À faire | API tiers, webhooks |
| Prédiction zones à risque | ❌ À faire | Analyse ML des données historiques |
| SMS notifications | ❌ À faire | Twilio ou service équivalent |
| Analytics avancées | ❌ À faire | Dashboard avec Chart.js/D3.js |

---

## 🎯 Roadmap de Développement

### Phase 1: Compléter le Niveau Basique (1-2 semaines)

#### Backend
- [ ] Finaliser l'upload d'images
  - [ ] Endpoint pour upload multiple
  - [ ] Stockage local ou cloud (AWS S3)
  - [ ] Validation format/taille
  
- [ ] Endpoint de statistiques de base
  - [ ] Nombre de signalements par catégorie
  - [ ] Répartition par statut
  - [ ] Temps moyen de résolution

- [ ] Tests unitaires des controllers

#### Frontend
- [ ] Intégrer upload d'images dans formulaire
- [ ] Affichage des images dans les cartes
- [ ] Améliorer la carte avec clusters
- [ ] Filtres avancés (date, quartier)
- [ ] Page de détails d'un signalement

### Phase 2: Niveau Intermédiaire (2-3 semaines)

#### Backend
- [ ] **Système de votes**
  - [ ] POST /api/signalements/:id/vote
  - [ ] GET /api/signalements/top-voted
  - [ ] Logique de priorisation automatique

- [ ] **Commentaires**
  - [ ] CRUD commentaires par signalement
  - [ ] Modération basique

- [ ] **Notifications**
  - [ ] Configuration Nodemailer
  - [ ] Templates d'emails
  - [ ] Envoi automatique (nouveau statut, résolution)

- [ ] **Dashboard Admin**
  - [ ] Statistiques par quartier
  - [ ] Temps de réponse moyen
  - [ ] Signalements non traités

#### Frontend
- [ ] Bouton de vote sur les signalements
- [ ] Section commentaires
- [ ] Page dashboard administrateur
- [ ] Graphiques avec Chart.js
- [ ] Notifications in-app
- [ ] Paramètres de notification utilisateur

### Phase 3: Niveau Avancé (4-6 semaines)

#### Backend
- [ ] **IA de catégorisation**
  - [ ] API Python avec TensorFlow
  - [ ] Modèle NLP pour analyse texte
  - [ ] Intégration avec Node.js

- [ ] **Prédiction zones à risque**
  - [ ] Collecte données historiques
  - [ ] Algorithme de clustering
  - [ ] Endpoint de heatmap

- [ ] **Intégrations tierces**
  - [ ] SMS via Twilio
  - [ ] Stockage images S3
  - [ ] Webhooks pour systèmes municipaux

#### Frontend
- [ ] Heatmap prédictive
- [ ] Interface IA (suggestions catégories)
- [ ] Dashboard analytics avancé
- [ ] Export de données (PDF, CSV)

---

## 🛠️ Technologies Utilisées

### Backend
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js 4.18",
  "database": "MySQL/MariaDB",
  "orm": "Sequelize 6.35",
  "auth": "JWT + bcrypt",
  "validation": "express-validator",
  "upload": "multer",
  "email": "nodemailer"
}
```

### Frontend
```json
{
  "framework": "React 19.2",
  "routing": "React Router DOM 7.9",
  "http": "Axios 1.13",
  "maps": "Leaflet 1.9 + React-Leaflet 5.0",
  "ui": "Material-UI 7.3",
  "icons": "React Icons 5.5",
  "state": "Context API"
}
```

### Base de données
```
- MySQL 8.0 / MariaDB 10.11
- Indexes sur géolocalisation
- Relations avec clés étrangères
- Support transactions
```

---

## 📐 Livrables UML (À Créer)

### Diagrammes requis

#### 1. Diagramme de classes
```
Classes principales:
├── Citoyen
├── Administrateur
├── ServiceMunicipal
├── Signalement
├── Commentaire
├── Vote
├── Notification
└── HistoriqueStatut
```

#### 2. Diagramme d'états - Cycle de vie Signalement
```
États:
nouveau → en_attente → en_cours → résolu
                ↓
           rejeté / dupliqué
```

#### 3. Diagrammes de séquence
- Workflow création signalement
- Workflow traitement par admin
- Workflow notifications
- Workflow vote communautaire

### Outils recommandés
- PlantUML
- Draw.io
- Lucidchart
- Visual Paradigm

---

## 🔧 Configuration Requise

### Variables d'environnement (Backend)
```env
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cityvoice
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Installation & Démarrage

```bash
# Installation des dépendances
npm run install:all

# Créer la base de données
mysql -u root -p < database/schema_mysql.sql
mysql -u root -p cityvoice < database/seed_test.sql

# Démarrer le développement
npm run dev

# Ou séparément
npm run dev:backend   # Port 5000
npm run dev:frontend  # Port 3000
```

---

## 🧪 Tests

### À implémenter
- [ ] Tests unitaires backend (Jest)
- [ ] Tests intégration API (Supertest)
- [ ] Tests frontend (React Testing Library)
- [ ] Tests E2E (Cypress/Playwright)

---

## 📊 KPIs et Métriques

### Métriques à suivre
- **Temps moyen de résolution**: Objectif < 48h
- **Taux d'adoption**: Nombre d'utilisateurs actifs
- **Satisfaction citoyenne**: Note moyenne
- **Taux de résolution**: % signalements résolus
- **Engagement**: Votes et commentaires

---

## 🚀 Prochaines Étapes Prioritaires

### Immédiat (Cette semaine)
1. ✅ Créer fichier .env et configurer DB
2. ✅ Tester tous les endpoints API
3. ✅ Finaliser l'upload d'images
4. ✅ Connecter frontend au backend réel

### Court terme (2 semaines)
1. Implémenter système de votes
2. Ajouter commentaires
3. Dashboard administrateur
4. Tests unitaires de base

### Moyen terme (1 mois)
1. Notifications email automatiques
2. Analytics par quartier
3. Améliorer UX/UI
4. Documentation API complète

---

## 📝 Notes Techniques

### Contraintes identifiées
- Architecture doc mentionne MongoDB mais code utilise MySQL ✅ 
- Besoin de clarifier le stockage des images (local vs cloud)
- SMS nécessite budget pour Twilio
- IA nécessite serveur Python séparé ou API externe

### Points d'attention
- Sécurité: Validation des uploads, prévention XSS/SQL injection
- Performance: Indexes DB pour géolocalisation
- Scalabilité: Pagination, cache pour carte
- Accessibilité: WCAG 2.1 AA compliance

---

## 🤝 Contribution

### Structure des commits
```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatting
refactor: Refactorisation code
test: Ajout de tests
```

### Branches
```
main: Production
develop: Développement
feature/*: Nouvelles fonctionnalités
bugfix/*: Corrections
```

---

## 📞 Support

Pour questions ou assistance:
- Email: support@cityvoice.com
- GitHub Issues: https://github.com/maxhus/CityVoice/issues
- Documentation: /docs

---

**Version**: 1.0.0  
**Dernière mise à jour**: 25 novembre 2025  
**Statut global**: 🟢 Niveau Basique à 90% - Prêt pour développement Intermédiaire
