# 🗓️ Roadmap de Développement Détaillé - CityVoice

**Plan d'implémentation des fonctionnalités par niveau**

---

## 📊 Vue d'ensemble des niveaux

| Niveau | État | Estimation | Priorité |
|--------|------|------------|----------|
| **Basique** | 90% | 1-2 semaines | 🔴 Critique |
| **Intermédiaire** | 40% | 3-4 semaines | 🟠 Haute |
| **Avancé** | 0% | 6-8 semaines | 🟡 Moyenne |

---

## 🎯 Phase 1: Finaliser le Niveau Basique (Semaines 1-2)

### Sprint 1.1: Upload d'images et intégration (3-4 jours)

#### Backend - Upload d'images
**Fichier**: `backend/controllers/signalementController.js`

```javascript
// Tâches:
✅ Multer déjà configuré
☐ Créer endpoint POST /api/signalements/:id/images
☐ Validation format (JPEG, PNG, max 5MB)
☐ Limitation à 5 images par signalement
☐ Génération de noms uniques (UUID)
☐ Stockage dans /uploads/signalements/:id/
☐ Enregistrement URLs en base de données
☐ Tests unitaires
```

**Code à implémenter**:
```javascript
// backend/controllers/imageController.js
exports.uploadImages = async (req, res) => {
  // Validation fichiers
  // Sauvegarde sur disque
  // Insertion en DB
  // Retour URLs
};
```

#### Frontend - Composant Upload
**Fichier**: `frontend/src/components/ImageUpload.jsx`

```javascript
// Tâches:
☐ Créer composant ImageUpload.jsx
☐ Preview des images avant upload
☐ Drag & drop support
☐ Indicateur de progression
☐ Gestion erreurs (taille, format)
☐ Intégration dans Signalement.js
☐ Affichage gallery dans ReportCard
```

**Estimation**: 4 jours  
**Priorité**: 🔴 Critique

---

### Sprint 1.2: Amélioration de la carte (2-3 jours)

#### Clustering des marqueurs
**Fichier**: `frontend/src/components/MapView.js`

```javascript
// Tâches:
☐ Installer react-leaflet-markercluster
☐ Grouper signalements proches
☐ Afficher nombre dans cluster
☐ Animation au zoom
☐ Personnaliser icônes par catégorie
```

**Code à ajouter**:
```javascript
import MarkerClusterGroup from 'react-leaflet-markercluster';

<MarkerClusterGroup>
  {signalements.map(sig => (
    <Marker key={sig.id} position={[sig.lat, sig.lng]}>
      <Popup>{sig.titre}</Popup>
    </Marker>
  ))}
</MarkerClusterGroup>
```

#### Filtres avancés
**Fichier**: `frontend/src/components/AdvancedFilters.jsx`

```javascript
// Tâches:
☐ Créer composant AdvancedFilters
☐ Filtre par date (depuis, jusqu'à)
☐ Filtre par statut (multiple)
☐ Filtre par quartier
☐ Filtre par distance (rayon)
☐ Reset tous les filtres
☐ Persistance dans URL (query params)
```

**Estimation**: 3 jours  
**Priorité**: 🟠 Haute

---

### Sprint 1.3: Page détails signalement (2 jours)

#### Création page
**Fichier**: `frontend/src/pages/SignalementDetails.jsx`

```javascript
// Tâches:
☐ Créer route /signalements/:id
☐ Composant SignalementDetails
☐ Afficher toutes les infos
☐ Gallery d'images (lightbox)
☐ Carte avec marqueur unique
☐ Bouton partager
☐ Historique des statuts
☐ Bouton éditer (si propriétaire)
```

**Estimation**: 2 jours  
**Priorité**: 🟠 Haute

---

### Sprint 1.4: Tests et corrections (2-3 jours)

```javascript
// Tâches Backend:
☐ Tests unitaires signalementController
☐ Tests unitaires citoyenController
☐ Tests intégration API
☐ Validation toutes les routes
☐ Gestion erreurs cohérente

// Tâches Frontend:
☐ Tests composants React
☐ Tests intégration pages
☐ Validation formulaires
☐ Messages erreurs user-friendly
☐ Loading states partout
```

**Estimation**: 3 jours  
**Priorité**: 🟠 Haute

---

## 🚀 Phase 2: Niveau Intermédiaire (Semaines 3-6)

### Sprint 2.1: Système de votes (5 jours)

#### Backend - API Votes
**Fichier**: `backend/controllers/voteController.js`

```javascript
// Tâches:
☐ Créer voteController.js
☐ POST /api/signalements/:id/vote - Ajouter vote
☐ DELETE /api/signalements/:id/vote - Retirer vote
☐ GET /api/signalements/:id/votes - Stats votes
☐ Vérifier: 1 vote par citoyen par signalement
☐ Incrémenter/décrémenter nombre_votes
☐ Recalculer priorité automatiquement
☐ Tests
```

**Algorithme de priorisation**:
```javascript
function calculerPriorite(signalement) {
  const poids = {
    votes: 2,
    anciennete: 1,
    categorie: {
      'Sécurité': 3,
      'Infrastructure': 2,
      'Propreté': 1
    }
  };
  
  const score = 
    (signalement.nombre_votes * poids.votes) +
    (joursDepuisCreation * poids.anciennete) +
    (poids.categorie[signalement.categorie] || 1);
  
  return score;
}
```

#### Frontend - Bouton Vote
**Fichier**: `frontend/src/components/VoteButton.jsx`

```javascript
// Tâches:
☐ Créer composant VoteButton
☐ Afficher nombre de votes
☐ Animation au clic
☐ État "déjà voté" (couleur différente)
☐ Vérifier authentification
☐ Toast notification succès/erreur
☐ Intégrer dans ReportCard
☐ Intégrer dans SignalementDetails
```

**Estimation**: 5 jours  
**Priorité**: 🔴 Critique

---

### Sprint 2.2: Système de commentaires (5 jours)

#### Backend - API Commentaires
**Fichier**: `backend/controllers/commentaireController.js`

```javascript
// Tâches:
☐ Créer modèle Commentaire
☐ POST /api/signalements/:id/commentaires
☐ GET /api/signalements/:id/commentaires
☐ PATCH /api/commentaires/:id (edit)
☐ DELETE /api/commentaires/:id
☐ Pagination (10 commentaires/page)
☐ Vérifier propriété pour edit/delete
☐ Validation contenu (max 500 chars)
☐ Tests
```

#### Frontend - Section Commentaires
**Fichier**: `frontend/src/components/CommentSection.jsx`

```javascript
// Tâches:
☐ Créer CommentSection component
☐ Formulaire ajout commentaire
☐ Liste commentaires avec pagination
☐ Bouton "Charger plus"
☐ Edit/Delete si propriétaire
☐ Avatar utilisateur
☐ Date relative (il y a 5 min)
☐ Markdown support (optionnel)
```

**Estimation**: 5 jours  
**Priorité**: 🟠 Haute

---

### Sprint 2.3: Système de notifications (7 jours)

#### Backend - Service Notifications
**Fichier**: `backend/services/notificationService.js`

```javascript
// Tâches:
☐ Créer notificationService.js
☐ Fonction creerNotification()
☐ Fonction envoyerEmail()
☐ Templates email (Handlebars)
☐ Configuration Nodemailer
☐ Queue système (optionnel: Bull)
☐ Webhook vers frontend (Socket.io)

// Événements déclencheurs:
☐ Nouveau signalement → Admin
☐ Statut changé → Citoyen
☐ Signalement résolu → Citoyen
☐ Nouveau commentaire → Citoyen
☐ Vote sur mon signalement → Citoyen
```

**Templates email**:
```javascript
// templates/email/
☐ nouveau_signalement.hbs
☐ statut_change.hbs
☐ signalement_resolu.hbs
☐ nouveau_commentaire.hbs
```

#### Frontend - Centre de notifications
**Fichier**: `frontend/src/components/NotificationCenter.jsx`

```javascript
// Tâches:
☐ Icône cloche dans Header
☐ Badge nombre non lues
☐ Dropdown liste notifications
☐ Marquer comme lu au clic
☐ Lien vers signalement concerné
☐ Socket.io client (temps réel)
☐ Toast pour nouvelles notifs
☐ Page /notifications (liste complète)
```

**Estimation**: 7 jours  
**Priorité**: 🟠 Haute

---

### Sprint 2.4: Dashboard Administrateur (7 jours)

#### Backend - API Analytics
**Fichier**: `backend/controllers/analyticsController.js`

```javascript
// Tâches:
☐ GET /api/analytics/overview
  ├─ Total signalements
  ├─ Par statut
  ├─ Par catégorie
  └─ Temps moyen résolution

☐ GET /api/analytics/by-quartier
  ├─ Grouper par quartier
  └─ Top 10 quartiers

☐ GET /api/analytics/timeline
  ├─ Signalements par jour/semaine/mois
  └─ Pour graphique

☐ GET /api/analytics/performance
  ├─ Taux de résolution
  ├─ Temps réponse moyen
  └─ Signalements actifs
```

#### Frontend - Dashboard Admin
**Fichiers**: 
- `frontend/src/pages/admin/Dashboard.jsx`
- `frontend/src/pages/admin/Statistics.jsx`

```javascript
// Tâches:
☐ Créer layout admin
☐ Route /admin/dashboard (protégée)
☐ KPI Cards (4 métriques principales)
☐ Graphique timeline (Chart.js)
☐ Graphique répartition catégories (Pie)
☐ Tableau top quartiers
☐ Liste signalements urgents
☐ Filtres période (7j, 30j, 1an)
☐ Export PDF/CSV
```

**Librairies à installer**:
```bash
npm install chart.js react-chartjs-2
npm install jspdf jspdf-autotable
```

**Estimation**: 7 jours  
**Priorité**: 🟠 Haute

---

### Sprint 2.5: Gestion administrateur (5 jours)

#### Backend
**Fichier**: `backend/controllers/adminController.js`

```javascript
// Tâches:
☐ GET /api/admin/signalements - Liste avec filtres avancés
☐ PATCH /api/admin/signalements/:id/assign - S'assigner
☐ PATCH /api/admin/signalements/:id/status - Changer statut
☐ POST /api/admin/signalements/:id/note - Ajouter note admin
☐ DELETE /api/admin/signalements/:id - Supprimer (soft delete)
☐ Middleware vérification rôle admin
```

#### Frontend
**Fichier**: `frontend/src/pages/admin/GestionSignalements.jsx`

```javascript
// Tâches:
☐ Tableau signalements (DataTable)
☐ Filtres: statut, catégorie, date, quartier
☐ Actions en masse (sélection multiple)
☐ Bouton "M'assigner"
☐ Modal changement statut
☐ Zone note admin
☐ Recherche textuelle
☐ Tri par colonnes
```

**Estimation**: 5 jours  
**Priorité**: 🟠 Haute

---

## 🎓 Phase 3: Niveau Avancé (Semaines 7-14)

### Sprint 3.1: IA de catégorisation (2 semaines)

#### Option A: API Python + TensorFlow

**Structure**:
```
ml-service/
├── app.py              # Flask API
├── model/
│   ├── train.py        # Entraînement
│   ├── predict.py      # Prédiction
│   └── signalement_classifier.h5
├── data/
│   └── training_data.csv
└── requirements.txt
```

**Tâches**:
```python
# app.py
☐ API Flask POST /predict
☐ Recevoir texte (titre + description)
☐ Preprocessing (tokenization, stop words)
☐ Prédiction avec modèle
☐ Retourner catégorie + confiance

# train.py
☐ Charger données historiques
☐ Feature engineering (TF-IDF)
☐ Entraîner modèle (LSTM ou BERT)
☐ Validation croisée
☐ Sauvegarder modèle
```

**Intégration Node.js**:
```javascript
// backend/services/mlService.js
☐ Fonction appelAPI Python
☐ Fallback si API down
☐ Cache prédictions récentes
☐ Logging pour amélioration continue
```

#### Option B: Service externe (OpenAI)

```javascript
// backend/services/aiCategorization.js
☐ Intégration OpenAI API
☐ Prompt engineering
☐ Catégorisation automatique
☐ Suggestions multiples
```

**Estimation**: 10 jours  
**Priorité**: 🟡 Moyenne

---

### Sprint 3.2: Prédiction zones à risque (10 jours)

#### Algorithme de clustering
**Fichier**: `backend/services/analyticsAdvanced.js`

```javascript
// Tâches:
☐ Requête signalements 6 derniers mois
☐ Grouper par coordonnées GPS
☐ Algorithme K-means clustering
☐ Identifier zones à forte densité
☐ Calculer score de risque par zone
☐ Endpoint GET /api/analytics/risk-zones
☐ Mise à jour quotidienne (cron job)
```

**Librairie**:
```bash
npm install ml-kmeans
```

#### Heatmap Frontend
**Fichier**: `frontend/src/components/HeatmapView.jsx`

```javascript
// Tâches:
☐ Installer leaflet.heat
☐ Créer composant HeatmapView
☐ Overlay heatmap sur carte
☐ Légende gradient
☐ Toggle heatmap on/off
☐ Filtrer par catégorie
☐ Animation temporelle (slider)
```

**Estimation**: 10 jours  
**Priorité**: 🟡 Moyenne

---

### Sprint 3.3: Notifications SMS (3 jours)

#### Backend - Intégration Twilio
**Fichier**: `backend/services/smsService.js`

```javascript
// Tâches:
☐ Créer compte Twilio
☐ Installation twilio SDK
☐ Configuration credentials
☐ Fonction envoyerSMS()
☐ Templates SMS courts
☐ Gestion préférences utilisateur
☐ Limitation débit (rate limiting)
☐ Logs envois
```

**Code**:
```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

async function envoyerSMS(phone, message) {
  await client.messages.create({
    body: message,
    from: '+33123456789',
    to: phone
  });
}
```

#### Frontend - Paramètres
**Fichier**: `frontend/src/pages/Settings.jsx`

```javascript
// Tâches:
☐ Page paramètres utilisateur
☐ Toggle notifications email
☐ Toggle notifications SMS
☐ Vérification numéro téléphone
☐ Code validation SMS
☐ Fréquence notifications
```

**Estimation**: 3 jours  
**Priorité**: 🟡 Moyenne

---

### Sprint 3.4: Intégration systèmes municipaux (5 jours)

#### Webhooks et API externes
**Fichier**: `backend/services/municipalIntegration.js`

```javascript
// Tâches:
☐ Configuration webhooks sortants
☐ POST vers API municipale à chaque:
  ├─ Nouveau signalement
  ├─ Changement statut
  └─ Résolution
☐ Authentification API (OAuth2)
☐ Retry logic (en cas d'échec)
☐ Queue avec Bull/Redis
☐ Logs intégrations
☐ Interface configuration admin
```

**Estimation**: 5 jours  
**Priorité**: 🟡 Moyenne

---

### Sprint 3.5: Analytics avancées (7 jours)

#### Nouveaux rapports
**Fichiers**: `backend/controllers/analyticsController.js`

```javascript
// Nouveaux endpoints:
☐ GET /api/analytics/trends
  ├─ Tendances temporelles
  ├─ Prévisions (régression linéaire)
  └─ Détection anomalies

☐ GET /api/analytics/performance-admins
  ├─ Temps traitement par admin
  ├─ Nombre signalements traités
  └─ Taux satisfaction

☐ GET /api/analytics/citizen-engagement
  ├─ Utilisateurs actifs
  ├─ Votes moyens
  └─ Commentaires moyens

☐ GET /api/analytics/export
  ├─ Export CSV
  ├─ Export PDF
  └─ Paramètres personnalisables
```

#### Dashboard avancé
**Fichier**: `frontend/src/pages/admin/AdvancedAnalytics.jsx`

```javascript
// Tâches:
☐ Graphiques temporels avancés
☐ Prévisions (ligne tendance)
☐ Comparaison périodes
☐ Drill-down par quartier/catégorie
☐ Carte choroplèthe (quartiers colorés)
☐ Export rapports personnalisés
☐ Tableaux de bord sauvegardables
```

**Librairies**:
```bash
npm install d3 recharts
```

**Estimation**: 7 jours  
**Priorité**: 🟡 Moyenne

---

## 📊 Planning Gantt

```
Semaine 1-2: Phase 1 (Basique)
│████████████│ Upload images (4j)
│            │██████│ Carte clusters (3j)
│                   │████│ Page détails (2j)
│                       │██████│ Tests (3j)

Semaine 3-4: Phase 2.1 (Votes + Commentaires)
│          │██████████│ Votes (5j)
│                     │██████████│ Commentaires (5j)

Semaine 5-6: Phase 2.2 (Notifications + Dashboard)
│          │██████████████│ Notifications (7j)
│                         │██████████████│ Dashboard (7j)
│                                        │██████████│ Gestion admin (5j)

Semaine 7-10: Phase 3.1 (IA)
│          │████████████████████│ IA catégorisation (10j)
│                               │████████████████████│ Prédiction zones (10j)

Semaine 11-12: Phase 3.2 (Intégrations)
│          │██████│ SMS (3j)
│                 │██████████│ Intégration municipale (5j)

Semaine 13-14: Phase 3.3 (Analytics avancées)
│          │██████████████│ Analytics avancées (7j)
│                         │██████│ Tests finaux (3j)
```

---

## ✅ Checklist de Livraison par Phase

### Phase 1: Basique ✅
- [ ] Upload images fonctionnel (5 max)
- [ ] Carte avec clusters
- [ ] Filtres date/statut/quartier
- [ ] Page détails signalement
- [ ] Gallery lightbox
- [ ] Tests unitaires >70% coverage
- [ ] Documentation API à jour

### Phase 2: Intermédiaire 🔄
- [ ] Vote système complet
- [ ] Commentaires avec pagination
- [ ] Notifications email
- [ ] Notifications in-app (temps réel)
- [ ] Dashboard admin avec graphiques
- [ ] Export CSV/PDF
- [ ] Interface gestion signalements
- [ ] Tests E2E principales flows

### Phase 3: Avancé 🎯
- [ ] IA catégorisation (>85% précision)
- [ ] Heatmap prédictive
- [ ] Notifications SMS
- [ ] Webhooks municipaux
- [ ] Analytics ML (tendances, prévisions)
- [ ] Dashboard personnalisable
- [ ] Documentation complète
- [ ] Tests performance

---

## 🧪 Stratégie de Tests

### Tests unitaires (Jest)
```javascript
// À implémenter pour chaque sprint:
☐ Controllers (70%+ coverage)
☐ Services (80%+ coverage)
☐ Models (validation)
☐ Middleware (auth, validation)
☐ Helpers/Utils (100% coverage)
```

### Tests intégration (Supertest)
```javascript
// Routes à tester:
☐ POST /api/signalements
☐ GET /api/signalements (avec filtres)
☐ POST /api/signalements/:id/vote
☐ POST /api/auth/login
☐ GET /api/analytics/*
```

### Tests E2E (Cypress)
```javascript
// Scénarios critiques:
☐ Inscription → Connexion → Créer signalement
☐ Voter pour un signalement
☐ Commenter un signalement
☐ Admin: traiter signalement
☐ Recevoir notifications
```

---

## 📝 Documentation à Produire

### Phase 1
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Guide contributeur
- [ ] CHANGELOG.md

### Phase 2
- [ ] Guide administrateur
- [ ] Guide utilisateur
- [ ] Runbook déploiement

### Phase 3
- [ ] Documentation ML (modèle, training)
- [ ] Guide intégration tierces
- [ ] Documentation API webhooks

---

## 🚀 Déploiement

### Environnements
```
Development  → localhost
Staging      → staging.cityvoice.com
Production   → cityvoice.com
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
☐ Lint (ESLint)
☐ Tests unitaires
☐ Tests intégration
☐ Build frontend
☐ Build backend
☐ Deploy staging (auto)
☐ Deploy prod (manuel approval)
```

---

## 💰 Budget Estimé

| Service | Coût Mensuel | Notes |
|---------|-------------|-------|
| Serveur (VPS) | 20-50€ | DigitalOcean, Linode |
| Base de données | Inclus | MySQL sur VPS |
| Stockage images | 5-10€ | AWS S3 ou similaire |
| Email (SendGrid) | 0-15€ | 100 emails/jour gratuit |
| SMS (Twilio) | Variable | ~0.08€/SMS |
| OpenAI API | 0-50€ | Si IA catégorisation |
| Domaine | 15€/an | .com ou .fr |
| **Total estimé** | **40-140€/mois** | Selon utilisation |

---

## 🎯 KPIs à Suivre

### Techniques
- Temps de réponse API (< 200ms)
- Uptime (> 99.5%)
- Taux d'erreur (< 1%)
- Coverage tests (> 70%)

### Métier
- Nombre signalements/jour
- Temps moyen de résolution
- Taux de résolution
- Engagement (votes, commentaires)
- Satisfaction citoyenne

---

**Version**: 1.0.0  
**Dernière mise à jour**: 25 novembre 2025  
**Prêt à développer! 🚀**
