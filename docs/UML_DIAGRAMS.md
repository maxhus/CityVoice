# 📐 Diagrammes UML - CityVoice

**Livrables UML pour la plateforme de participation citoyenne**

---

## 1. 📊 Diagramme de Classes

### Vue d'ensemble des entités principales

```plantuml
@startuml CityVoice_Classes

' Styles
skinparam classAttributeIconSize 0
skinparam class {
    BackgroundColor LightBlue
    BorderColor DarkBlue
    ArrowColor DarkGreen
}

' Classes principales

class Citoyen {
    - id_citoyen: INTEGER
    - nom_citoyen: VARCHAR(50)
    - prenom_citoyen: VARCHAR(50)
    - email_citoyen: VARCHAR(100) {unique}
    - mot_de_passe_citoyen: VARCHAR(255)
    - telephone: VARCHAR(20)
    - avatar_url: TEXT
    - created_at: DATETIME
    - updated_at: DATETIME
    - is_active: BOOLEAN
    ---
    + creerSignalement()
    + modifierProfil()
    + voterSignalement()
    + ajouterCommentaire()
    + recevoirNotification()
}

class Administrateur {
    - id_admin: INTEGER
    - nom_admin: VARCHAR(50)
    - prenom_admin: VARCHAR(50)
    - email_admin: VARCHAR(100) {unique}
    - mot_de_passe_admin: VARCHAR(255)
    - id_service: INTEGER
    - role: VARCHAR(20)
    - created_at: DATETIME
    ---
    + traiterSignalement()
    + assignerService()
    + modifierStatut()
    + envoyerNotification()
    + genererRapport()
}

class ServiceMunicipal {
    - id_service: INTEGER
    - nom_service: VARCHAR(100) {unique}
    - description: TEXT
    ---
    + obtenirSignalements()
    + assignerAdministrateur()
}

class Signalement {
    - id_signalement: INTEGER
    - titre: VARCHAR(255)
    - description: TEXT
    - categorie: VARCHAR(100)
    - statut: VARCHAR(50)
    - priorite: VARCHAR(20)
    - latitude: DECIMAL(10,8)
    - longitude: DECIMAL(11,8)
    - adresse: TEXT
    - quartier: VARCHAR(100)
    - date_soumission: DATETIME
    - date_resolution: DATETIME
    - id_citoyen: INTEGER
    - id_admin_assigne: INTEGER
    - note_admin: TEXT
    - nombre_votes: INTEGER
    ---
    + changerStatut()
    + assignerAdmin()
    + calculerPriorite()
    + obtenirHistorique()
    + ajouterImage()
}

class ImageSignalement {
    - id_image: INTEGER
    - id_signalement: INTEGER
    - url: TEXT
    - date_upload: DATETIME
    ---
    + supprimer()
    + obtenirURL()
}

class HistoriqueStatut {
    - id_historique: INTEGER
    - id_signalement: INTEGER
    - ancien_statut: VARCHAR(50)
    - nouveau_statut: VARCHAR(50)
    - date_changement: DATETIME
    - id_auteur: INTEGER
    - commentaire: TEXT
    ---
    + enregistrerChangement()
}

class Vote {
    - id_vote: INTEGER
    - id_signalement: INTEGER
    - id_citoyen: INTEGER
    - date_vote: DATETIME
    ---
    + ajouterVote()
    + retirerVote()
}

class Commentaire {
    - id_commentaire: INTEGER
    - id_signalement: INTEGER
    - id_auteur: INTEGER
    - type_auteur: VARCHAR(20)
    - contenu: TEXT
    - date_commentaire: DATETIME
    ---
    + modifier()
    + supprimer()
}

class Notification {
    - id_notification: INTEGER
    - id_destinataire: INTEGER
    - type_destinataire: VARCHAR(20)
    - type_notification: VARCHAR(50)
    - message: TEXT
    - est_lu: BOOLEAN
    - date_creation: DATETIME
    ---
    + marquerLu()
    + envoyer()
}

' Relations

Citoyen "1" --> "0..*" Signalement : crée >
Citoyen "1" --> "0..*" Vote : vote >
Citoyen "1" --> "0..*" Commentaire : écrit >
Citoyen "1" --> "0..*" Notification : reçoit >

Administrateur "1" --> "0..*" Signalement : traite >
Administrateur "0..1" --> "1" ServiceMunicipal : appartient à >
Administrateur "1" --> "0..*" HistoriqueStatut : modifie >
Administrateur "1" --> "0..*" Commentaire : écrit >

Signalement "1" --> "0..*" ImageSignalement : contient >
Signalement "1" --> "0..*" HistoriqueStatut : a un historique >
Signalement "1" --> "0..*" Vote : reçoit >
Signalement "1" --> "0..*" Commentaire : contient >

@enduml
```

---

## 2. 🔄 Diagramme d'États - Cycle de vie d'un Signalement

### États et transitions du signalement

```plantuml
@startuml Signalement_StateDiagram

[*] --> Nouveau : Citoyen crée signalement

state Nouveau {
    Nouveau : Signalement vient d'être créé
    Nouveau : Aucun admin assigné
    Nouveau : Statut: nouveau
}

Nouveau --> EnAttente : Admin valide le signalement

state EnAttente {
    EnAttente : Signalement validé
    EnAttente : En attente d'assignation
    EnAttente : Statut: en_attente
}

EnAttente --> EnCours : Admin s'assigne le signalement
EnAttente --> Rejete : Admin rejette (invalide/spam)
EnAttente --> Duplique : Signalement déjà existant

state EnCours {
    EnCours : Travaux en cours
    EnCours : Admin assigné
    EnCours : Statut: en_cours
}

EnCours --> Resolu : Problème résolu
EnCours --> EnAttente : Retour en attente (bloqué)

state Resolu {
    Resolu : Problème résolu
    Resolu : Date de résolution enregistrée
    Resolu : Statut: resolu
}

state Rejete {
    Rejete : Signalement rejeté
    Rejete : Motif de rejet documenté
}

state Duplique {
    Duplique : Signalement en double
    Duplique : Référence vers l'original
}

Resolu --> [*] : Fin du cycle
Rejete --> [*] : Fin du cycle
Duplique --> [*] : Fin du cycle

note right of Nouveau
    Notification envoyée 
    au citoyen à chaque
    changement d'état
end note

note right of EnCours
    Calcul automatique 
    de la priorité basé sur:
    - Nombre de votes
    - Catégorie
    - Ancienneté
end note

@enduml
```

### Matrice de transitions d'états

| État Actuel | Action | État Suivant | Acteur |
|-------------|--------|--------------|--------|
| Nouveau | Valider | En Attente | Administrateur |
| Nouveau | Rejeter | Rejeté | Administrateur |
| En Attente | Assigner | En Cours | Administrateur |
| En Attente | Marquer doublon | Dupliqué | Administrateur |
| En Cours | Résoudre | Résolu | Administrateur |
| En Cours | Bloquer | En Attente | Administrateur |

---

## 3. 📝 Diagramme de Séquence - Création d'un Signalement

```plantuml
@startuml Creation_Signalement

actor Citoyen
participant "Frontend\nReact" as Frontend
participant "API\nExpress" as API
participant "Controller\nSignalement" as Controller
participant "Database\nMySQL" as DB
participant "Service\nNotification" as Notif

== Authentification ==
Citoyen -> Frontend : Se connecte
Frontend -> API : POST /api/auth/login
API -> DB : Vérifier credentials
DB --> API : Token JWT
API --> Frontend : Token + User data
Frontend --> Citoyen : Connecté

== Géolocalisation ==
Citoyen -> Frontend : Accède formulaire
Frontend -> Frontend : navigator.geolocation
Frontend --> Citoyen : Position obtenue

== Création signalement ==
Citoyen -> Frontend : Remplit formulaire\n+ Upload image
Frontend -> Frontend : Valider données
Frontend -> API : POST /api/signalements\n+ FormData (image)

API -> Controller : createSignalement()
Controller -> DB : INSERT signalement
DB --> Controller : id_signalement
Controller -> DB : INSERT image_signalement
DB --> Controller : Success

Controller -> Notif : Envoyer notification création
Notif -> DB : INSERT notification
Notif -> Notif : Envoyer email
Notif --> Controller : Notification envoyée

Controller --> API : Signalement créé
API --> Frontend : 201 Created + data
Frontend --> Citoyen : Confirmation + N° signalement

== Mise à jour carte ==
Frontend -> API : GET /api/signalements
API -> DB : SELECT signalements récents
DB --> API : Liste signalements
API --> Frontend : JSON signalements
Frontend -> Frontend : Afficher sur carte
Frontend --> Citoyen : Voir signalement sur carte

@enduml
```

---

## 4. 🔄 Diagramme de Séquence - Traitement par Administrateur

```plantuml
@startuml Traitement_Admin

actor Administrateur as Admin
participant "Dashboard\nAdmin" as Dashboard
participant "API\nExpress" as API
participant "Controller\nSignalement" as Controller
participant "Database\nMySQL" as DB
participant "Service\nNotification" as Notif
participant "Email\nService" as Email

== Consultation ==
Admin -> Dashboard : Se connecte
Dashboard -> API : GET /api/signalements?statut=nouveau
API -> DB : SELECT signalements nouveaux
DB --> API : Liste signalements
API --> Dashboard : JSON data
Dashboard --> Admin : Affiche liste

== Assignation ==
Admin -> Dashboard : Sélectionne signalement
Dashboard -> API : GET /api/signalements/:id
API -> DB : SELECT signalement détails
DB --> API : Détails complets
API --> Dashboard : JSON détails
Dashboard --> Admin : Affiche détails + images

Admin -> Dashboard : S'assigne le signalement
Dashboard -> API : PATCH /api/signalements/:id\n{statut: "en_cours", id_admin}

API -> Controller : updateSignalement()
Controller -> DB : BEGIN TRANSACTION
Controller -> DB : UPDATE signalement
Controller -> DB : INSERT historique_statut
Controller -> DB : COMMIT

Controller -> Notif : notifierCitoyen()
Notif -> DB : INSERT notification
Notif -> Email : sendEmail(template, data)
Email --> Notif : Email envoyé
Notif --> Controller : Notification OK

Controller --> API : Signalement mis à jour
API --> Dashboard : 200 OK + data
Dashboard --> Admin : Confirmation

== Résolution ==
Admin -> Dashboard : Marquer résolu + commentaire
Dashboard -> API : PATCH /api/signalements/:id\n{statut: "resolu", date_resolution}

API -> Controller : resolveSignalement()
Controller -> DB : UPDATE signalement
Controller -> DB : INSERT historique_statut

Controller -> Notif : notifierResolution()
Notif -> Email : Envoyer email résolution
Email --> Notif : OK
Notif --> Controller : OK

Controller --> API : Résolu
API --> Dashboard : 200 OK
Dashboard --> Admin : Confirmation résolution

@enduml
```

---

## 5. 🗳️ Diagramme de Séquence - Vote Communautaire

```plantuml
@startuml Vote_Communautaire

actor Citoyen
participant "Frontend" as Front
participant "API" as API
participant "Controller\nVote" as VoteCtrl
participant "Database" as DB
participant "Service\nPriorisation" as Priority

== Consultation signalements ==
Citoyen -> Front : Consulte liste signalements
Front -> API : GET /api/signalements
API --> Front : Liste avec nb_votes
Front --> Citoyen : Affiche signalements triés

== Voter pour un signalement ==
Citoyen -> Front : Clique "Voter"
Front -> Front : Vérifier authentification

alt Non authentifié
    Front --> Citoyen : Rediriger vers login
else Authentifié
    Front -> API : POST /api/signalements/:id/vote
    
    API -> VoteCtrl : addVote(id_signalement, id_citoyen)
    VoteCtrl -> DB : SELECT vote existant
    
    alt Déjà voté
        DB --> VoteCtrl : Vote existe
        VoteCtrl --> API : 400 Bad Request
        API --> Front : Erreur "Déjà voté"
        Front --> Citoyen : Message erreur
    else Pas encore voté
        DB --> VoteCtrl : Aucun vote
        VoteCtrl -> DB : INSERT vote
        VoteCtrl -> DB : UPDATE signalement\n(nombre_votes +1)
        
        VoteCtrl -> Priority : recalculerPriorite(id_signalement)
        Priority -> DB : SELECT données signalement
        Priority -> Priority : Calculer score priorité\n= f(votes, ancienneté, catégorie)
        Priority -> DB : UPDATE priorite
        Priority --> VoteCtrl : Priorité mise à jour
        
        VoteCtrl --> API : 201 Created
        API --> Front : Vote enregistré
        Front -> Front : Actualiser compteur
        Front --> Citoyen : Animation vote + nouveau total
    end
end

== Voir signalements populaires ==
Citoyen -> Front : Onglet "Plus votés"
Front -> API : GET /api/signalements?sort=votes&order=desc
API -> DB : SELECT ORDER BY nombre_votes DESC
DB --> API : Signalements triés
API --> Front : JSON data
Front --> Citoyen : Liste des plus votés

@enduml
```

---

## 6. 🔔 Diagramme de Séquence - Système de Notifications

```plantuml
@startuml Notifications

participant "Event\nTrigger" as Event
participant "Service\nNotification" as NotifService
participant "Database" as DB
participant "Email\nService" as EmailSvc
participant "SMS\nService" as SMSSvc
participant "Push\nService" as PushSvc
participant Citoyen

== Événement déclenche notification ==
Event -> NotifService : notifier(type, destinataire, data)
NotifService -> DB : SELECT préférences utilisateur

DB --> NotifService : Préférences (email: true, sms: false, push: true)

== Création notification en base ==
NotifService -> DB : INSERT notification
DB --> NotifService : id_notification

== Envoi multi-canal ==
par Envoi parallèle
    alt Email activé
        NotifService -> EmailSvc : sendEmail(template, destinataire, data)
        EmailSvc -> EmailSvc : Charger template Handlebars
        EmailSvc -> EmailSvc : Remplir variables
        EmailSvc -> EmailSvc : SMTP send via Nodemailer
        EmailSvc --> NotifService : Email envoyé
    end
    
    alt SMS activé
        NotifService -> SMSSvc : sendSMS(phone, message)
        SMSSvc -> SMSSvc : API Twilio/Nexmo
        SMSSvc --> NotifService : SMS envoyé
    end
    
    alt Push activé
        NotifService -> PushSvc : sendPushNotification(token, data)
        PushSvc -> PushSvc : Firebase Cloud Messaging
        PushSvc --> NotifService : Push envoyé
    end
end

NotifService -> DB : UPDATE notification\n(statut: envoyée)

== Citoyen consulte ==
Citoyen -> NotifService : GET /api/notifications
NotifService -> DB : SELECT notifications non lues
DB --> NotifService : Liste notifications
NotifService --> Citoyen : JSON notifications

Citoyen -> NotifService : PATCH /api/notifications/:id\n{est_lu: true}
NotifService -> DB : UPDATE est_lu = true
NotifService --> Citoyen : 200 OK

@enduml
```

---

## 7. 📊 Diagramme de Cas d'Utilisation

```plantuml
@startuml Use_Cases

left to right direction
skinparam packageStyle rectangle

actor Citoyen as C
actor Administrateur as A
actor "Service Municipal" as SM
actor "Système" as Sys

rectangle "CityVoice - Plateforme de Participation Citoyenne" {
    
    package "Gestion des Signalements" {
        usecase (Créer signalement) as UC1
        usecase (Consulter carte) as UC2
        usecase (Ajouter photos) as UC3
        usecase (Suivre statut) as UC4
        usecase (Filtrer signalements) as UC5
    }
    
    package "Engagement Communautaire" {
        usecase (Voter pour signalement) as UC6
        usecase (Commenter) as UC7
        usecase (Partager signalement) as UC8
    }
    
    package "Administration" {
        usecase (Traiter signalement) as UC9
        usecase (Assigner service) as UC10
        usecase (Modifier statut) as UC11
        usecase (Générer rapports) as UC12
        usecase (Modérer contenu) as UC13
    }
    
    package "Notifications" {
        usecase (Recevoir notifications) as UC14
        usecase (Configurer préférences) as UC15
    }
    
    package "Analytics" {
        usecase (Dashboard statistiques) as UC16
        usecase (Analyser tendances) as UC17
        usecase (Prédire zones à risque) as UC18
    }
}

' Relations Citoyen
C --> UC1
C --> UC2
C --> UC3
C --> UC4
C --> UC5
C --> UC6
C --> UC7
C --> UC8
C --> UC14
C --> UC15

' Relations Administrateur
A --> UC9
A --> UC10
A --> UC11
A --> UC12
A --> UC13
A --> UC2
A --> UC4
A --> UC16
A --> UC17

' Relations Service Municipal
SM --> UC16
SM --> UC17
SM --> UC18

' Relations Système
Sys --> UC14
Sys --> UC18

' Extensions
UC1 ..> UC3 : <<include>>
UC9 ..> UC11 : <<include>>
UC9 ..> UC14 : <<extend>>
UC11 ..> UC14 : <<extend>>

note right of UC18
    Niveau Avancé
    Machine Learning
end note

@enduml
```

---

## 8. 🏗️ Diagramme de Déploiement

```plantuml
@startuml Deployment

node "Serveur Web\n(Frontend)" as WebServer {
    component "React App" as React
    component "Nginx" as Nginx
    
    Nginx --> React
}

node "Serveur API\n(Backend)" as APIServer {
    component "Node.js\nExpress" as Express
    component "Middleware\nAuth/Validation" as Middleware
    
    Express --> Middleware
}

node "Serveur Base de Données" as DBServer {
    database "MySQL\nCityVoice" as MySQL
}

node "Serveur Fichiers" as FileServer {
    storage "Images\nSignalements" as Files
}

node "Services Externes" as External {
    component "Email\nNodemailer" as Email
    component "SMS\nTwilio" as SMS
    component "Maps\nLeaflet/OSM" as Maps
}

cloud "Utilisateurs" as Users {
    actor Citoyen
    actor Administrateur
}

' Connexions
Citoyen --> Nginx : HTTPS
Administrateur --> Nginx : HTTPS
Nginx --> Express : HTTP/REST API
Express --> MySQL : SQL
Express --> Files : File I/O
Express --> Email : SMTP
Express --> SMS : API REST
React --> Maps : API

note right of WebServer
    Port: 80/443
    SSL/TLS
    Static Files
end note

note right of APIServer
    Port: 5000
    JWT Auth
    CORS enabled
end note

note right of DBServer
    Port: 3306
    Indexes optimisés
    Backups quotidiens
end note

@enduml
```

---

## 9. 📦 Diagramme de Composants

```plantuml
@startuml Components

package "Frontend (React)" {
    [Pages] as Pages
    [Components] as Comp
    [Services] as FrontSvc
    [Context] as Context
    [Hooks] as Hooks
    
    Pages --> Comp
    Pages --> Context
    Pages --> Hooks
    Comp --> Hooks
    FrontSvc --> Context
}

package "Backend (Node.js)" {
    [Routes] as Routes
    [Controllers] as Controllers
    [Models] as Models
    [Middleware] as Middleware
    [Services] as BackSvc
    
    Routes --> Middleware
    Routes --> Controllers
    Controllers --> Models
    Controllers --> BackSvc
    Models --> BackSvc
}

package "Database Layer" {
    [Sequelize ORM] as ORM
    database MySQL
    
    ORM --> MySQL
}

package "External Services" {
    [Nodemailer] as Mail
    [Multer] as Upload
    [JWT] as JWT
    [Bcrypt] as Bcrypt
}

' Connexions
FrontSvc --> Routes : HTTP/REST
Controllers --> ORM
Middleware --> JWT
Middleware --> Bcrypt
BackSvc --> Mail
Routes --> Upload

interface "REST API" as API
Routes - API

note right of Pages
    Home, Signalement
    Connexion, Forum
    Dashboard Admin
end note

note right of Controllers
    SignalementController
    CitoyenController
    AdminController
end note

@enduml
```

---

## 📖 Guide d'utilisation des diagrammes

### Pour PlantUML

1. **Installation**:
   ```bash
   npm install -g node-plantuml
   # ou
   brew install plantuml  # macOS
   ```

2. **Génération des images**:
   ```bash
   plantuml UML_DIAGRAMS.md
   ```

3. **VS Code Extension**:
   - Installer "PlantUML" extension
   - Preview: `Alt+D`

### Outils en ligne
- [PlantText](https://www.planttext.com/)
- [PlantUML Online](http://www.plantuml.com/plantuml/)

### Export formats
- PNG (raster)
- SVG (vectoriel)
- PDF (documentation)

---

## 📝 Explications des Diagrammes

### 1. Diagramme de Classes
**Objectif**: Modéliser la structure statique du système
- Relations entre entités
- Attributs et méthodes
- Cardinalités

### 2. Diagramme d'États
**Objectif**: Cycle de vie d'un signalement
- États possibles
- Transitions et événements
- Actions sur changement d'état

### 3-6. Diagrammes de Séquence
**Objectif**: Interactions temporelles entre composants
- Création signalement
- Traitement administrateur
- Vote communautaire
- Notifications

### 7. Diagramme de Cas d'Utilisation
**Objectif**: Vue fonctionnelle du système
- Acteurs et rôles
- Fonctionnalités principales
- Relations entre cas

### 8. Diagramme de Déploiement
**Objectif**: Architecture physique
- Serveurs et composants
- Protocoles de communication
- Ports et sécurité

### 9. Diagramme de Composants
**Objectif**: Architecture logicielle
- Organisation du code
- Dépendances
- Interfaces

---

## 🎯 Utilisation dans le Projet

### Documentation
- Onboarding nouveaux développeurs
- Architecture reviews
- Documentation technique

### Développement
- Référence pour implémentation
- Validation des workflows
- Tests (base pour scénarios)

### Communication
- Présentations stakeholders
- Spécifications techniques
- Formation utilisateurs

---

**Version**: 1.0.0  
**Date**: 25 novembre 2025  
**Auteur**: CityVoice Team
