# 🚀 Guide de Démarrage Rapide - CityVoice

**Guide pour démarrer le projet CityVoice en local**

---

## 📋 Prérequis

### Logiciels nécessaires

- ✅ **Node.js** 18+ et npm ([télécharger](https://nodejs.org/))
- ✅ **MySQL** 8.0+ ou MariaDB 10.11+ ([télécharger](https://dev.mysql.com/downloads/))
- ✅ **Git** ([télécharger](https://git-scm.com/))
- ✅ **Visual Studio Code** (recommandé) ([télécharger](https://code.visualstudio.com/))

### Vérification des installations

```bash
node --version    # v18.0.0 ou supérieur
npm --version     # 9.0.0 ou supérieur
mysql --version   # 8.0.0 ou supérieur
git --version     # 2.30.0 ou supérieur
```

---

## 🔧 Installation Pas à Pas

### Étape 1: Cloner le projet (si nécessaire)

```bash
# Si depuis GitHub
git clone https://github.com/maxhus/CityVoice.git
cd CityVoice

# Si déjà sur votre machine
cd C:\Users\User\Desktop\blablabl\CityVoice
```

### Étape 2: Installer les dépendances

```bash
# Installer toutes les dépendances (backend + frontend)
npm run install:all

# Ou installer séparément
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### Étape 3: Configurer la base de données

#### A. Créer la base de données MySQL

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données (dans le prompt MySQL)
CREATE DATABASE cityvoice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### B. Importer le schéma

```bash
# Importer le schéma de base
mysql -u root -p cityvoice < database/schema_mysql.sql

# (Optionnel) Importer des données de test
mysql -u root -p cityvoice < database/seed_test.sql
```

### Étape 4: Configuration de l'environnement

#### Backend - Créer `.env`

Créer le fichier `backend/.env`:

```env
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cityvoice
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql

# JWT
JWT_SECRET=votre_secret_jwt_tres_securise_ici_123456
JWT_EXPIRE=7d

# Serveur
PORT=5000
NODE_ENV=development

# Email (Optionnel - pour notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_app

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Note importante**: Remplacez `votre_mot_de_passe_mysql` et autres valeurs par vos propres informations.

#### Frontend - Créer `.env` (optionnel)

Créer le fichier `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAP_CENTER_LAT=48.8566
REACT_APP_MAP_CENTER_LNG=2.3522
```

### Étape 5: Créer le dossier uploads

```bash
# Dans le répertoire backend
cd backend
mkdir uploads
cd ..
```

---

## ▶️ Démarrage de l'Application

### Option 1: Démarrer tout ensemble (recommandé)

```bash
# Depuis la racine du projet
npm run dev
```

Cela démarre:
- Backend sur `http://localhost:5000`
- Frontend sur `http://localhost:3000`

### Option 2: Démarrer séparément

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

---

## ✅ Vérification de l'installation

### 1. Tester le Backend

Ouvrir votre navigateur: `http://localhost:5000`

Vous devriez voir:
```json
{
  "message": "Bienvenue sur l'API CityVoice",
  "version": "1.0.0",
  "endpoints": {
    "signalements": "/api/signalements",
    "citoyens": "/api/citoyens"
  }
}
```

### 2. Tester l'API avec curl ou Postman

```bash
# Obtenir tous les signalements
curl http://localhost:5000/api/signalements

# Créer un compte citoyen
curl -X POST http://localhost:5000/api/citoyens/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom_citoyen": "Dupont",
    "prenom_citoyen": "Jean",
    "email_citoyen": "jean.dupont@test.com",
    "mot_de_passe_citoyen": "Password123!",
    "telephone": "0612345678"
  }'
```

### 3. Tester le Frontend

Ouvrir: `http://localhost:3000`

Vous devriez voir la page d'accueil de CityVoice avec:
- En-tête avec navigation
- Carte interactive
- Liste de signalements (si données de test importées)

---

## 🐛 Résolution des Problèmes Courants

### Problème 1: Erreur de connexion MySQL

**Erreur**: `ER_ACCESS_DENIED_ERROR` ou `ECONNREFUSED`

**Solutions**:
1. Vérifier que MySQL est démarré:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```

2. Vérifier les credentials dans `backend/.env`

3. Tester la connexion:
   ```bash
   mysql -u root -p
   ```

### Problème 2: Port déjà utilisé

**Erreur**: `Port 3000/5000 is already in use`

**Solutions**:
1. Tuer le processus existant (Windows):
   ```bash
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. Ou changer le port dans `.env`:
   ```env
   PORT=5001
   ```

### Problème 3: Modules manquants

**Erreur**: `Cannot find module 'express'` ou similaire

**Solution**:
```bash
# Réinstaller les dépendances
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Problème 4: CORS Error dans le navigateur

**Erreur**: `Access-Control-Allow-Origin`

**Solution**:
1. Vérifier que le backend est démarré
2. Vérifier `CORS_ORIGIN` dans `backend/.env`
3. Redémarrer le serveur backend

### Problème 5: Base de données vide

**Symptôme**: Aucun signalement affiché

**Solution**:
```bash
# Importer les données de test
mysql -u root -p cityvoice < database/seed_test.sql
```

---

## 📚 Structure du Projet

```
CityVoice/
├── backend/                  # API Node.js + Express
│   ├── config/              # Configuration DB
│   ├── controllers/         # Logique métier
│   ├── models/              # Modèles Sequelize
│   ├── routes/              # Routes API
│   ├── middleware/          # Auth, validation
│   ├── uploads/             # Dossier images (à créer)
│   ├── .env                 # Variables d'environnement (à créer)
│   ├── server.js            # Point d'entrée
│   └── package.json
│
├── frontend/                # Application React
│   ├── public/              # Fichiers statiques
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   ├── services/        # Appels API
│   │   ├── context/         # State management
│   │   ├── hooks/           # Custom hooks
│   │   └── router/          # Configuration routes
│   ├── .env                 # Variables d'environnement (optionnel)
│   └── package.json
│
├── database/                # Scripts SQL
│   ├── schema_mysql.sql     # Schéma de base
│   ├── seed_test.sql        # Données de test
│   └── migrations/          # Migrations futures
│
├── docs/                    # Documentation
│   ├── PROJECT_STATUS.md    # État du projet
│   ├── UML_DIAGRAMS.md      # Diagrammes UML
│   ├── api-specs.md         # Spécifications API
│   └── architecture.md      # Architecture technique
│
└── package.json             # Scripts racine
```

---

## 🔑 Comptes de Test (après seed)

### Compte Citoyen
```
Email: jean.dupont@test.com
Mot de passe: password123
```

### Compte Administrateur
```
Email: admin@cityvoice.fr
Mot de passe: admin123
```

---

## 📡 Endpoints API Principaux

### Signalements
- `GET /api/signalements` - Liste tous les signalements
- `GET /api/signalements/:id` - Détails d'un signalement
- `POST /api/signalements` - Créer un signalement (auth requis)
- `PATCH /api/signalements/:id` - Modifier un signalement (auth requis)
- `DELETE /api/signalements/:id` - Supprimer un signalement (auth requis)

### Citoyens
- `POST /api/citoyens/register` - Inscription
- `POST /api/citoyens/login` - Connexion
- `GET /api/citoyens/profile` - Profil (auth requis)
- `PATCH /api/citoyens/profile` - Modifier profil (auth requis)

**Documentation complète**: Voir `docs/api-specs.md`

---

## 🎨 Extensions VS Code Recommandées

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next",
    "jebbs.plantuml"
  ]
}
```

---

## 📖 Prochaines Étapes

1. ✅ **Lire la documentation**:
   - `docs/PROJECT_STATUS.md` - État du projet
   - `docs/UML_DIAGRAMS.md` - Diagrammes UML
   - `docs/api-specs.md` - API Reference

2. ✅ **Tester les fonctionnalités**:
   - Créer un compte
   - Créer un signalement
   - Consulter la carte
   - Filtrer par catégorie

3. ✅ **Explorer le code**:
   - Backend: `backend/controllers/signalementController.js`
   - Frontend: `frontend/src/pages/Home.js`
   - Modèles: `backend/models/`

4. ✅ **Contribuer**:
   - Choisir une tâche dans PROJECT_STATUS.md
   - Créer une branche: `git checkout -b feature/ma-fonctionnalite`
   - Faire un commit: `git commit -m "feat: ajouter fonctionnalité X"`
   - Push et créer une Pull Request

---

## 🛠️ Scripts NPM Utiles

### Racine du projet
```bash
npm run install:all    # Installer toutes les dépendances
npm run dev            # Démarrer backend + frontend
npm run dev:backend    # Démarrer seulement le backend
npm run dev:frontend   # Démarrer seulement le frontend
npm run test           # Lancer tous les tests
```

### Backend
```bash
npm start             # Démarrer en production
npm run dev           # Démarrer avec nodemon (auto-reload)
npm test              # Lancer les tests
```

### Frontend
```bash
npm start             # Démarrer le serveur de dev
npm run build         # Build pour production
npm test              # Lancer les tests
```

---

## 📞 Support et Ressources

### Documentation
- 📖 [README.md](../README.md) - Vue d'ensemble
- 📊 [PROJECT_STATUS.md](./PROJECT_STATUS.md) - État du projet
- 📐 [UML_DIAGRAMS.md](./UML_DIAGRAMS.md) - Diagrammes UML
- 📡 [api-specs.md](./api-specs.md) - API Reference

### Liens Utiles
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Leaflet Maps](https://leafletjs.com/)

### Contact
- 🐛 **Issues GitHub**: [github.com/maxhus/CityVoice/issues](https://github.com/maxhus/CityVoice/issues)
- 📧 **Email**: support@cityvoice.com

---

## ✅ Checklist de Démarrage

- [ ] Node.js et npm installés
- [ ] MySQL installé et démarré
- [ ] Base de données `cityvoice` créée
- [ ] Schéma SQL importé
- [ ] Dépendances backend installées
- [ ] Dépendances frontend installées
- [ ] Fichier `backend/.env` créé et configuré
- [ ] Dossier `backend/uploads` créé
- [ ] Backend démarre sur port 5000
- [ ] Frontend démarre sur port 3000
- [ ] API répond correctement
- [ ] Carte s'affiche dans le navigateur
- [ ] Inscription/connexion fonctionne

**Si toutes les cases sont cochées, vous êtes prêt à développer! 🎉**

---

**Version**: 1.0.0  
**Dernière mise à jour**: 25 novembre 2025  
**Bon développement! 🚀**
