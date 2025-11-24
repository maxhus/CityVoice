
# 📱 CityVoice Frontend - Documentation

## 🎯 Vue d'ensemble

Application React pour la plateforme de participation citoyenne CityVoice. Interface permettant aux citoyens de signaler des problèmes urbains et de suivre leur résolution.

---

## 🏗️ Architecture

### Structure du projet

```
frontend/
├── public/
│   ├── index.html          # Point d'entrée HTML
│   ├── manifest.json       # Configuration PWA
│   └── robots.txt          # SEO
├── src/
│   ├── assets/             # Images, icônes, styles globaux
│   ├── components/         # Composants réutilisables
│   │   ├── Header.js       # En-tête navigation
│   │   ├── Header.css
│   │   ├── SearchBar.js    # Barre de recherche
│   │   ├── SearchBar.css
│   │   ├── MapView.js      # Carte interactive Leaflet
│   │   ├── MapView.css
│   │   ├── ReportCard.js   # Carte de signalement
│   │   ├── ReportCard.css
│   │   ├── ForumCard.js    # Carte de discussion forum
│   │   ├── ForumCard.css
│   │   ├── CategoryFilter.js # Filtres catégories forum
│   │   └── CategoryFilter.css
│   ├── pages/              # Pages principales
│   │   ├── Home.js         # Page d'accueil
│   │   ├── Home.css
│   │   ├── Forum.js        # Page forum discussions
│   │   ├── Forum.css
│   │   ├── Connexion.js    # Page connexion
│   │   ├── Connexion.css
│   │   ├── Inscription.js  # Page inscription
│   │   └── Inscription.css
│   ├── services/           # Appels API
│   │   └── reportService.js
│   ├── hooks/              # Custom hooks
│   │   └── useGeoLocation.js
│   ├── context/            # State management
│   │   └── AuthContext.js
│   ├── router/             # Configuration routes
│   │   └── AppRoutes.js
│   ├── utils/              # Fonctions utilitaires
│   │   └── helpers.js
│   ├── App.js              # Composant racine
│   ├── App.css
│   ├── index.js            # Point d'entrée React
│   └── index.css
├── .env                    # Variables d'environnement
└── package.json            # Dépendances
```

---

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org/))
- npm ou yarn

### Installation des dépendances

```bash
cd frontend
npm install
```

### Lancer en mode développement

```bash
npm start
```

L'application démarre sur **http://localhost:3000**

### Build pour production

```bash
npm run build
```

Les fichiers optimisés sont générés dans le dossier `build/`

### Tests

```bash
npm test              # Lancer les tests
npm test -- --coverage  # Avec couverture de code
```

---

## 📦 Dépendances Principales

| Package | Version | Utilité |
|---------|---------|---------|
| `react` | ^19.2.0 | Framework UI |
| `react-router-dom` | ^7.9.6 | Navigation |
| `leaflet` | ^1.9.4 | Cartographie |
| `react-leaflet` | ^5.0.0 | Composants Leaflet pour React |
| `axios` | ^1.13.2 | Requêtes HTTP |
| `@mui/material` | ^7.3.5 | Composants UI Material |
| `react-icons` | ^5.5.0 | Bibliothèque d'icônes |

---

## 🧩 Composants

### 1. Header
**Fichier**: `src/components/Header.js`

En-tête avec navigation et authentification.

**Props**: Aucune

**Fonctionnalités**:
- Logo CityVoice cliquable
- Navigation (Signalement, Forum)
- Boutons Inscription/Connexion
- Menu hamburger responsive

**Usage**:
```jsx
import Header from '../components/Header';

<Header />
```

---

### 2. SearchBar
**Fichier**: `src/components/SearchBar.js`

Barre de recherche pour filtrer les signalements.

**Props**:
```typescript
{
  onSearch: (searchValue: string) => void  // Callback recherche
}
```

**Usage**:
```jsx
import SearchBar from '../components/SearchBar';

<SearchBar onSearch={(value) => console.log(value)} />
```

---

### 3. MapView
**Fichier**: `src/components/MapView.js`

Carte interactive avec marqueurs de signalements.

**Props**:
```typescript
{
  reports: Array<{
    id: number,
    title: string,
    latitude: number,
    longitude: number,
    category: string
  }>
}
```

**Fonctionnalités**:
- Carte OpenStreetMap via Leaflet
- Marqueurs cliquables avec popup
- Bouton "New Report" flottant
- Zoom et déplacement

**Usage**:
```jsx
import MapView from '../components/MapView';

const reports = [
  { id: 1, title: 'Nid de poule', latitude: 48.8566, longitude: 2.3522 }
];

<MapView reports={reports} />
```

---

### 4. ReportCard
**Fichier**: `src/components/ReportCard.js`

Carte d'affichage d'un signalement.

**Props**:
```typescript
{
  report: {
    id: number,
    title: string,
    category: string,
    status: string,
    time: string,
    duration: string
  }
}
```

**Usage**:
```jsx
import ReportCard from '../components/ReportCard';

const report = {
  id: 1,
  title: 'Nid de poule',
  category: 'Infrastructure',
  status: 'en cours',
  time: '5 minutes passées',
  duration: 'Depuis 1 heure'
};

<ReportCard report={report} />
```

---

### 5. ForumCard
**Fichier**: `src/components/ForumCard.js`

Carte d'affichage d'une discussion forum.

**Props**:
```typescript
{
  discussion: {
    id: number,
    title: string,
    category: string,
    author: string,
    avatar: string,
    time: string,
    replies: number,
    views: number,
    likes: number
  }
}
```

**Usage**:
```jsx
import ForumCard from '../components/ForumCard';

<ForumCard discussion={{
  id: 1,
  title: 'Comment améliorer les pistes cyclables ?',
  category: 'Transport',
  author: 'Marie Dupont',
  replies: 12,
  views: 245,
  likes: 8
}} />
```

---

### 6. CategoryFilter
**Fichier**: `src/components/CategoryFilter.js`

Filtres de catégories pour le forum.

**Props**:
```typescript
{
  categories: Array<{id: string, label: string, color: string}>,
  activeCategory: string,
  onCategoryChange: (categoryId: string) => void
}
```

**Usage**:
```jsx
import CategoryFilter from '../components/CategoryFilter';

const categories = [
  { id: 'infrastructure', label: 'Infrastructure', color: '#3b82f6' },
  { id: 'environnement', label: 'Environnement', color: '#10b981' }
];

<CategoryFilter 
  categories={categories}
  activeCategory="all"
  onCategoryChange={(cat) => console.log(cat)}
/>
```

---

## 📄 Pages

### 1. Home
**Fichier**: `src/pages/Home.js`

Page d'accueil avec carte interactive et liste des signalements.

**Fonctionnalités**:
- Header de navigation
- Barre de recherche
- Carte Leaflet avec marqueurs
- Liste de signalements (ReportCard)
- Design responsive

---

### 2. Forum
**Fichier**: `src/pages/Forum.js`

Page des discussions communautaires.

**Fonctionnalités**:
- Hero section avec titre et bouton CTA
- Filtres par catégories (CategoryFilter)
- Liste de discussions (ForumCard)
- 7 discussions mockées
- 5 catégories: Infrastructure, Environnement, Transport, Sécurité, Autre

---

### 3. Connexion
**Fichier**: `src/pages/Connexion.js`

Page de connexion utilisateur.

**Fonctionnalités**:
- Formulaire email/mot de passe
- Validation des champs
- Connexion à l'API backend (`POST /api/citoyens/connexion`)
- Stockage du token JWT dans localStorage
- Gestion des erreurs d'authentification
- Lien vers la page d'inscription
- Redirection après connexion réussie

**API Endpoint**:
```javascript
POST http://localhost:5000/api/citoyens/connexion
Body: {
  email_citoyen: "marie.dupont@example.com",
  mot_de_passe_citoyen: "password123"
}
```

---

### 4. Inscription
**Fichier**: `src/pages/Inscription.js`

Page d'inscription nouveaux utilisateurs.

**Fonctionnalités**:
- Formulaire: nom, prénom, email, mot de passe, confirmation
- Validation complète des champs
- Vérification de correspondance des mots de passe
- Connexion à l'API backend (`POST /api/citoyens/inscription`)
- Création automatique du compte et connexion
- Stockage du token JWT
- Gestion des erreurs (email déjà utilisé, etc.)
- Lien vers la page de connexion
- Redirection après inscription réussie

**API Endpoint**:
```javascript
POST http://localhost:5000/api/citoyens/inscription
Body: {
  nom_citoyen: "Dupont",
  prenom_citoyen: "Marie",
  email_citoyen: "marie.dupont@example.com",
  mot_de_passe_citoyen: "password123"
}
```

---

## 🎣 Hooks Personnalisés

### useGeoLocation
**Fichier**: `src/hooks/useGeoLocation.js`

Hook pour obtenir la géolocalisation de l'utilisateur.

**Retour**:
```typescript
{
  location: { latitude: number, longitude: number, accuracy: number } | null,
  error: string | null,
  loading: boolean
}
```

**Usage**:
```jsx
import useGeoLocation from '../hooks/useGeoLocation';

function MyComponent() {
  const { location, error, loading } = useGeoLocation();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  
  return <div>Position: {location.latitude}, {location.longitude}</div>;
}
```

---

## 🔌 Services API

### reportService
**Fichier**: `src/services/reportService.js`

Service pour interagir avec l'API backend.

**Méthodes disponibles**:

```javascript
// Créer un signalement
await reportService.createReport(reportData);

// Obtenir tous les signalements
await reportService.getAllReports({ category: 'Infrastructure' });

// Obtenir un signalement par ID
await reportService.getReportById(id);

// Mettre à jour un signalement
await reportService.updateReport(id, updates);

// Supprimer un signalement
await reportService.deleteReport(id);

// Voter pour un signalement
await reportService.voteReport(id);

// Upload d'image
await reportService.uploadImage(file);
```

**Configuration**:
```javascript
// .env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🎨 Styling

### Approche CSS
- CSS Modules pour chaque composant
- Variables CSS pour les couleurs et thèmes
- Responsive design (mobile-first)
- Flexbox et CSS Grid

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

### Palette de couleurs
```css
--primary: #667eea;      /* Bleu principal */
--primary-dark: #764ba2; /* Violet */
--success: #4ECDC4;      /* Vert */
--warning: #FFE66D;      /* Jaune */
--danger: #FF6B6B;       /* Rouge */
--text: #333;            /* Texte principal */
--text-light: #666;      /* Texte secondaire */
--background: #f5f5f5;   /* Fond */
```

---

## 🔐 Authentification

### Flux d'authentification

1. **Inscription** (`/inscription`):
   - L'utilisateur remplit le formulaire
   - Envoi des données à `POST /api/citoyens/inscription`
   - Backend crée le compte et retourne un token JWT
   - Token stocké dans `localStorage`
   - Redirection vers la page d'accueil

2. **Connexion** (`/connexion`):
   - L'utilisateur saisit email/mot de passe
   - Envoi à `POST /api/citoyens/connexion`
   - Backend vérifie les credentials et retourne un token
   - Token stocké dans `localStorage`
   - Redirection vers la page d'accueil

3. **Stockage du token**:
```javascript
// Après connexion/inscription réussie
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.data));

// Pour les requêtes authentifiées
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

4. **Déconnexion**:
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### AuthContext
**Fichier**: `src/context/AuthContext.js`

Context React pour gérer l'authentification.

**Méthodes**:
```javascript
const { user, login, logout, register } = useAuth();

// Connexion
await login(email, password);

// Inscription
await register({ nom, prenom, email, password });

// Déconnexion
logout();
```

**Usage**:
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login } = useAuth();

  if (user) {
    return <div>Bonjour {user.email}</div>;
  }

  return <button onClick={() => login(email, pass)}>Connexion</button>;
}
```

---

## 🗺️ Routing

### AppRoutes
**Fichier**: `src/router/AppRoutes.js`

Configuration des routes de l'application.

**Routes disponibles**:
```javascript
/                # Page d'accueil (Home)
/forum           # Forum discussions
/connexion       # Connexion utilisateur
/inscription     # Inscription nouveau compte
/dashboard       # Dashboard utilisateur (protégé, à implémenter)
/report/new      # Nouveau signalement (protégé, à implémenter)
```

**Routes protégées**:
Utilisent le composant `ProtectedRoute` qui vérifie l'authentification.

---

## 🛠️ Fonctions Utilitaires

### helpers.js
**Fichier**: `src/utils/helpers.js`

**Fonctions disponibles**:

```javascript
// Formater une date
formatDate(date) // "19 novembre 2025 à 14:30"

// Temps écoulé
timeAgo(date) // "il y a 5 minutes"

// Valider un email
validateEmail(email) // true/false

// Tronquer un texte
truncateText(text, 100) // "Texte tronqué..."
```

---

## 🌍 Variables d'environnement

Fichier `.env` à la racine du frontend:

```env
# URL de l'API backend
REACT_APP_API_URL=http://localhost:5000/api

# Token Mapbox (si utilisé)
REACT_APP_MAPBOX_TOKEN=your_token_here

# Environnement
REACT_APP_ENV=development
```

⚠️ **Important**: Ne jamais commiter le fichier `.env` avec des vraies clés !

---

## 📱 Responsive Design

L'application est entièrement responsive :

### Mobile (< 768px)
- Menu hamburger
- Carte réduite (350px)
- Liste de signalements empilée
- Boutons pleine largeur

### Tablet (768px - 1024px)
- Navigation complète
- Layout adapté
- Carte 500px

### Desktop (> 1024px)
- Layout 2 colonnes (carte + liste)
- Carte sticky
- Toutes les fonctionnalités visibles

---

## 🧪 Tests

### Structure des tests
```
src/
├── components/
│   ├── Header.test.js
│   ├── MapView.test.js
│   └── ReportCard.test.js
└── App.test.js
```

### Écrire un test
```javascript
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('affiche le logo CityVoice', () => {
  render(<Header />);
  const logoElement = screen.getByText(/CityVoice/i);
  expect(logoElement).toBeInTheDocument();
});
```

---

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Déploiement sur Netlify
```bash
# Build
npm run build

# Déployer le dossier build/
netlify deploy --prod --dir=build
```

---

## 🐛 Debug et Développement

### React DevTools
Installer l'extension [React Developer Tools](https://react.dev/learn/react-developer-tools)

### Logs de développement
```javascript
console.log('Debug:', data);
```

### Hot Reload
Le serveur de développement recharge automatiquement les changements.

---

## 📝 TODO / Fonctionnalités futures

- [x] Page de connexion
- [x] Page d'inscription
- [x] Page Forum avec discussions
- [x] Intégration API backend (connexion/inscription)
- [ ] Dashboard utilisateur
- [ ] Formulaire de création de signalement
- [ ] Page de profil utilisateur
- [ ] Filtres avancés (catégorie, statut, date)
- [ ] Notifications en temps réel
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Internationalisation (i18n)
- [ ] Accessibilité (ARIA)
- [ ] Page détails d'un signalement
- [ ] Gestion des discussions forum (créer, répondre, like)

---

## 🤝 Contribution

### Conventions de code
- Utiliser ESLint et Prettier
- Nommer les composants en PascalCase
- Nommer les fichiers comme les composants
- CSS Modules pour le styling
- Commentaires JSDoc pour les fonctions complexes

### Git workflow
```bash
# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Commit
git commit -m "feat: ajout de la fonctionnalité X"

# Push et Pull Request
git push origin feature/ma-fonctionnalite
```

---

## 📚 Ressources

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Material-UI](https://mui.com/)
- [Axios](https://axios-http.com/)

---

## 🆘 Support

Pour toute question ou problème :
- **Issues GitHub** : [github.com/maxhus/CityVoice/issues](https://github.com/maxhus/CityVoice/issues)
- **Email** : contact@cityvoice.com

---

**Dernière mise à jour** : 20 novembre 2025  
**Version** : 0.1.0  
**Auteur** : Équipe CityVoice
