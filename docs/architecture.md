# Architecture CityVoice

## Vue d'ensemble

CityVoice est une plateforme de participation citoyenne basée sur une architecture client-serveur moderne.

## Architecture Technique

### Frontend (React)
- **Framework**: React 19.2.0
- **Routing**: React Router DOM
- **Cartographie**: Leaflet / React-Leaflet
- **UI Components**: Material-UI
- **HTTP Client**: Axios
- **State Management**: Context API

### Backend (Node.js + Express)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Upload fichiers**: Multer
- **Email**: Nodemailer

### Base de données
- **Type**: NoSQL (MongoDB)
- **Collections principales**:
  - Users (Utilisateurs)
  - Reports (Signalements)
  - Categories (Catégories)
  - Comments (Commentaires)
  - Votes (Votes communautaires)

## Architecture des composants

### Frontend
```
src/
├── components/     # Composants réutilisables
├── pages/          # Pages de l'application
├── services/       # Couche d'accès API
├── context/        # Gestion d'état globale
├── hooks/          # Hooks personnalisés
├── router/         # Configuration routes
├── utils/          # Fonctions utilitaires
└── assets/         # Ressources statiques
```

### Backend
```
backend/
├── controllers/    # Logique métier
├── models/         # Schémas de données
├── routes/         # Définition des endpoints
├── middleware/     # Middlewares (auth, validation)
├── config/         # Configuration (DB, env)
├── utils/          # Fonctions utilitaires
└── tests/          # Tests unitaires/intégration
```

## Flux de données

1. **Création de signalement**:
   - Utilisateur remplit le formulaire
   - Géolocalisation automatique
   - Upload d'image (optionnel)
   - Validation côté client
   - Envoi à l'API
   - Validation côté serveur
   - Stockage en base de données
   - Notification aux administrateurs

2. **Consultation des signalements**:
   - Requête API avec filtres
   - Affichage sur carte interactive
   - Affichage en liste
   - Vote communautaire possible

3. **Traitement administrateur**:
   - Connexion avec authentification
   - Visualisation dashboard
   - Modification statut signalement
   - Notifications automatiques

## Sécurité

- **Authentification**: JWT avec expiration
- **Autorisation**: Middleware de vérification des rôles
- **Validation**: Validation stricte des entrées (client + serveur)
- **Upload**: Validation type/taille fichiers
- **CORS**: Configuration stricte des origines autorisées
- **Rate limiting**: Protection contre les abus

## Performance

- **Frontend**: 
  - Lazy loading des composants
  - Optimisation images
  - Cache navigateur
  
- **Backend**:
  - Indexation base de données
  - Pagination des résultats
  - Mise en cache (Redis - futur)

## Déploiement

- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render / Heroku
- **Base de données**: MongoDB Atlas
- **Stockage images**: Cloudinary / AWS S3

## Évolutions futures

- Notifications push (Firebase)
- Système de messagerie interne
- Analytics avancés
- IA de catégorisation automatique
- API publique pour intégrations tierces
