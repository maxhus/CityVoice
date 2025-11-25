# 🧪 Guide de Test - Connexion Frontend-Backend

## 🚀 Démarrage Rapide

### 1. Démarrer le Backend (Terminal 1)
```powershell
cd backend
npm run dev
```

Vous devriez voir :
```
🚀 Serveur démarré sur le port 5000
```

### 2. Démarrer le Frontend (Terminal 2)
```powershell
cd frontend
npm start
```

Le navigateur s'ouvre sur http://localhost:3000

---

## ✅ Tests Manuels

### Test 1: Backend Seul
**URL**: http://localhost:5000

**Résultat attendu**:
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

### Test 2: Liste des Signalements
**URL**: http://localhost:5000/api/signalements

**Résultat attendu**:
```json
{
  "success": true,
  "count": X,
  "data": [...]
}
```

---

## 🔐 Test Authentification

### Étape 1: Inscription
1. Aller sur http://localhost:3000/inscription
2. Remplir:
   - Nom: Dupont
   - Prénom: Jean
   - Email: test@cityvoice.fr
   - Téléphone: 0612345678
   - Mot de passe: Test123!
   - Confirmer: Test123!
3. Cliquer "S'inscrire"

**✅ Résultat attendu**:
- Redirection vers la page d'accueil
- Message "Inscription réussie"
- Token stocké dans localStorage

**Vérification**:
- Ouvrir DevTools (F12)
- Onglet "Application" → "Local Storage"
- Vérifier présence de `token` et `user`

### Étape 2: Connexion
1. Se déconnecter (supprimer token du localStorage)
2. Aller sur http://localhost:3000/connexion
3. Saisir:
   - Email: test@cityvoice.fr
   - Mot de passe: Test123!
4. Cliquer "Se connecter"

**✅ Résultat attendu**:
- Redirection vers page d'accueil
- Message "Connexion réussie"
- Token restauré dans localStorage

---

## 📍 Test Création Signalement

### Prérequis
- Être connecté (avoir un token valide)

### Étape 1: Accéder au formulaire
1. Cliquer sur le bouton signalement dans le header
2. Ou aller sur http://localhost:3000/signalement

**✅ Résultat attendu**:
- Si non connecté: redirection vers /connexion
- Si connecté: affichage du formulaire

### Étape 2: Remplir le formulaire
1. Titre: "Nid de poule dangereux"
2. Catégorie: "Voirie"
3. Description: "Grand trou sur la chaussée, danger pour les véhicules"
4. Adresse: "15 Rue de la République"
5. Quartier: "Centre-ville"
6. Latitude/Longitude: Auto-remplis ou manuels

### Étape 3: Soumettre
Cliquer "Créer le signalement"

**✅ Résultat attendu**:
- Message "Signalement créé avec succès !"
- Redirection vers la page d'accueil
- Le nouveau signalement apparaît dans la liste
- Le nouveau signalement apparaît sur la carte

**Vérification dans la DB**:
```sql
USE cityvoice;
SELECT * FROM signalement ORDER BY date_soumission DESC LIMIT 1;
```

---

## 🗺️ Test Affichage des Signalements

### Étape 1: Page d'accueil
1. Aller sur http://localhost:3000

**✅ Résultat attendu**:
- Liste des signalements chargée depuis l'API
- Signalements affichés sur la carte
- Marqueurs cliquables
- Compteur: "Signalements (X)"

### Étape 2: Recherche
1. Taper dans la barre de recherche: "poule"

**✅ Résultat attendu**:
- Filtrage instantané de la liste
- Seuls les signalements contenant "poule" sont affichés
- Le compteur se met à jour

---

## 🔍 Test avec DevTools

### Ouvrir les DevTools du Navigateur
**Raccourci**: F12 ou Ctrl+Shift+I

### Onglet Network
1. Recharger la page d'accueil
2. Vérifier les requêtes:

**✅ Requêtes attendues**:
```
GET http://localhost:5000/api/signalements
Status: 200 OK
Response: { success: true, count: X, data: [...] }
```

### Onglet Console
Vérifier qu'il n'y a pas d'erreurs rouges

### Onglet Application → Local Storage
Vérifier après connexion:
```
key: token
value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

key: user
value: {"id_citoyen":1,"nom_citoyen":"Dupont",...}
```

---

## 🐛 Dépannage

### Erreur: "Failed to fetch"
**Cause**: Backend non démarré ou URL incorrecte

**Solution**:
1. Vérifier que le backend tourne sur le port 5000
2. Vérifier `frontend/.env`: `REACT_APP_API_URL=http://localhost:5000/api`

### Erreur: "Token invalide"
**Cause**: Token expiré ou JWT_SECRET incorrect

**Solution**:
1. Se déconnecter et se reconnecter
2. Vérifier `backend/.env`: `JWT_SECRET` est défini

### Erreur: "Accès refusé"
**Cause**: Tentative d'accès à une route protégée sans token

**Solution**:
1. Se connecter d'abord
2. Vérifier que le token est bien envoyé dans les headers

### Erreur CORS
**Cause**: Backend refuse les requêtes du frontend

**Solution**:
Vérifier que CORS est activé dans `backend/server.js`:
```javascript
app.use(cors());
```

### Pas de signalements affichés
**Causes possibles**:
1. Base de données vide
2. Erreur de transformation des données

**Solutions**:
1. Importer les données de test:
```bash
mysql -u root -p cityvoice < database/seed_test.sql
```
2. Vérifier la console du navigateur pour les erreurs

---

## 🧪 Script de Test Automatique

```bash
cd backend
node test-connection.js
```

**✅ Résultat attendu**:
```
🧪 Test de connexion Frontend-Backend CityVoice

==================================================

1️⃣ Test: Backend accessible...
   ✅ Backend répond: Bienvenue sur l'API CityVoice

2️⃣ Test: GET /api/signalements...
   ✅ 8 signalements trouvés

3️⃣ Test: GET /api/signalements/stats...
   ✅ Statistiques OK

==================================================
✅ TOUS LES TESTS PASSÉS!

🎉 Le backend est opérationnel et prêt à recevoir les requêtes du frontend
```

---

## 📊 Checklist Complète

### Backend
- [ ] Backend démarré sur port 5000
- [ ] Base de données connectée
- [ ] Route `/` répond
- [ ] Route `/api/signalements` répond
- [ ] Pas d'erreurs dans la console

### Frontend
- [ ] Frontend démarré sur port 3000
- [ ] Fichier `.env` créé avec `REACT_APP_API_URL`
- [ ] Pas d'erreurs de compilation
- [ ] Pas d'erreurs dans la console du navigateur

### Authentification
- [ ] Inscription fonctionne
- [ ] Token stocké dans localStorage
- [ ] Connexion fonctionne
- [ ] Déconnexion fonctionne
- [ ] Redirection si non authentifié

### Signalements
- [ ] Liste chargée depuis l'API
- [ ] Création fonctionne (avec token)
- [ ] Nouveau signalement apparaît
- [ ] Carte affiche les marqueurs
- [ ] Recherche filtre correctement

### Sécurité
- [ ] Routes protégées refusent sans token
- [ ] Token invalide redirige vers login
- [ ] Middleware auth appliqué sur bonnes routes

---

## 🎯 Résultat Final

Si tous les tests passent:

✅ **Frontend ↔ Backend CONNECTÉS**  
✅ **JWT FONCTIONNEL**  
✅ **CRUD Signalements OPÉRATIONNEL**  
✅ **Authentification SÉCURISÉE**

---

**Date**: 25 novembre 2025  
**Version**: 1.0.0  
**Statut**: ✅ Tests OK
