# API Specifications - CityVoice

## Base URL
```
Production: https://api.cityvoice.com
Development: http://localhost:5000/api
```

## Authentification

Toutes les routes protégées nécessitent un token JWT dans le header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 🔐 Authentification

#### POST /auth/register
Inscription d'un nouvel utilisateur

**Body**:
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123",
  "telephone": "+33612345678"
}
```

**Response 201**:
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "jean.dupont@example.com",
    "nom": "Dupont",
    "prenom": "Jean"
  }
}
```

#### POST /auth/login
Connexion utilisateur

**Body**:
```json
{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

**Response 200**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "jean.dupont@example.com",
    "role": "citoyen"
  }
}
```

---

### 📍 Signalements

#### GET /signalements
Obtenir tous les signalements

**Query Parameters**:
- `categorie`: Filtrer par catégorie
- `statut`: Filtrer par statut (en_attente, en_cours, resolu)
- `latitude`: Latitude du centre de recherche
- `longitude`: Longitude du centre de recherche
- `rayon`: Rayon de recherche en km
- `page`: Numéro de page (défaut: 1)
- `limit`: Nombre de résultats par page (défaut: 20)

**Response 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "titre": "Nid de poule sur la route",
      "description": "Grand trou sur la chaussée dangereux",
      "categorie": "Infrastructure",
      "statut": "en_attente",
      "location": {
        "type": "Point",
        "coordinates": [2.3522, 48.8566]
      },
      "adresse": "123 Rue de la Paix, Paris",
      "images": ["https://..."],
      "votes": 15,
      "createdAt": "2025-11-19T10:30:00Z",
      "auteur": {
        "id": "507f1f77bcf86cd799439012",
        "nom": "Dupont"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### POST /signalements
Créer un nouveau signalement (🔒 Authentification requise)

**Body**:
```json
{
  "titre": "Nid de poule sur la route",
  "description": "Grand trou sur la chaussée dangereux pour les véhicules",
  "categorie": "Infrastructure",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "adresse": "123 Rue de la Paix, 75001 Paris",
  "images": ["base64_string_or_url"]
}
```

**Response 201**:
```json
{
  "success": true,
  "message": "Signalement créé avec succès",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "titre": "Nid de poule sur la route",
    "statut": "en_attente",
    "createdAt": "2025-11-19T10:30:00Z"
  }
}
```

#### GET /signalements/:id
Obtenir un signalement par ID

**Response 200**:
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "titre": "Nid de poule sur la route",
    "description": "Grand trou sur la chaussée dangereux",
    "categorie": "Infrastructure",
    "statut": "en_attente",
    "location": {
      "type": "Point",
      "coordinates": [2.3522, 48.8566]
    },
    "votes": 15,
    "commentaires": [
      {
        "id": "507f1f77bcf86cd799439013",
        "auteur": "Marie Martin",
        "texte": "J'ai eu le même problème",
        "createdAt": "2025-11-19T11:00:00Z"
      }
    ]
  }
}
```

#### PUT /signalements/:id
Mettre à jour un signalement (🔒 Admin uniquement)

**Body**:
```json
{
  "statut": "en_cours",
  "noteAdmin": "Intervention programmée pour demain"
}
```

**Response 200**:
```json
{
  "success": true,
  "message": "Signalement mis à jour",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "statut": "en_cours",
    "updatedAt": "2025-11-19T12:00:00Z"
  }
}
```

#### DELETE /signalements/:id
Supprimer un signalement (🔒 Admin uniquement)

**Response 200**:
```json
{
  "success": true,
  "message": "Signalement supprimé"
}
```

#### POST /signalements/:id/vote
Voter pour un signalement (🔒 Authentification requise)

**Response 200**:
```json
{
  "success": true,
  "message": "Vote enregistré",
  "votes": 16
}
```

#### POST /signalements/:id/commentaires
Ajouter un commentaire (🔒 Authentification requise)

**Body**:
```json
{
  "texte": "Ce problème est très gênant pour les cyclistes"
}
```

**Response 201**:
```json
{
  "success": true,
  "message": "Commentaire ajouté",
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "texte": "Ce problème est très gênant pour les cyclistes",
    "createdAt": "2025-11-19T13:00:00Z"
  }
}
```

---

### 📊 Catégories

#### GET /categories
Obtenir toutes les catégories disponibles

**Response 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nom": "Infrastructure",
      "icone": "🛣️",
      "couleur": "#FF6B6B"
    },
    {
      "id": "2",
      "nom": "Propreté",
      "icone": "🗑️",
      "couleur": "#4ECDC4"
    },
    {
      "id": "3",
      "nom": "Sécurité",
      "icone": "🚨",
      "couleur": "#FFE66D"
    }
  ]
}
```

---

### 📈 Statistiques (Admin)

#### GET /admin/stats
Obtenir les statistiques globales (🔒 Admin uniquement)

**Response 200**:
```json
{
  "success": true,
  "data": {
    "totalSignalements": 1523,
    "enAttente": 234,
    "enCours": 156,
    "resolus": 1133,
    "parCategorie": {
      "Infrastructure": 456,
      "Propreté": 389,
      "Sécurité": 234
    },
    "parQuartier": {
      "Centre-Ville": 345,
      "Nord": 289
    }
  }
}
```

---

## Codes d'erreur

- `200`: Succès
- `201`: Créé avec succès
- `400`: Requête invalide
- `401`: Non authentifié
- `403`: Non autorisé
- `404`: Ressource non trouvée
- `500`: Erreur serveur

**Format d'erreur**:
```json
{
  "success": false,
  "error": "Message d'erreur descriptif",
  "details": []
}
```
