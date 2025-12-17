# 🎯 Projet Gestion d'Événements

##  Informations Étudiant
- **Nom et Prénom :** BELARBI LINA
- **Numéro Étudiant :** 31083802
- **Groupe / Section :** Groupe 1 ISII
- **Module :** M2 ISII - Ingénierie Web 2025/2026

---

##  Description du Projet

Application web complète de gestion d'événements développée avec une **architecture microservices**. Cette application permet aux administrateurs de créer et gérer des événements, et aux participants de s'inscrire et de consulter les événements disponibles.

### Fonctionnalités Principales

#### 👤 Authentification et Autorisation
- **Inscription** : Création de compte utilisateur (Administrateur ou Participant)
- **Connexion** : Authentification sécurisée avec gestion des rôles
- **Profil utilisateur** : Affichage du nom et rôle de l'utilisateur connecté
- **Déconnexion** : Système de logout sécurisé
- **Gestion des rôles** : 
  - **Administrateur** : Création, modification et suppression d'événements
  - **Participant** : Consultation et inscription aux événements

####  Gestion des Événements
- **Création d'événements** (Admin) : 
  - Bouton "Nouvel événement" pour ajouter des événements
  - Formulaire complet avec titre, description, date, lieu
  - Upload d'images pour illustrer les événements
- **Liste des événements** : 
  - Affichage en cartes visuelles avec images
  - Informations détaillées (date, lieu, description)
  - Nombre de participants en temps réel
- **Recherche d'événements** : 
  - Barre de recherche pour filtrer les événements
  - Recherche par titre, lieu ou date
- **Inscription aux événements** (Participant) : 
  - Bouton "Participer" sur chaque événement
  - Comptage automatique des inscriptions
  - Documents joints téléchargeables 
- **Vue détaillée** : 
  - Localisation avec icône de lieu
  - Date et heure précises
  - Description complète de l'événement

#### 🔔 Système de Notifications
- **Centre de notifications** : Page dédiée avec compteur (ex: "12 notification(s)")
- **Notifications d'inscription** : 
  - Confirmation automatique : "Bienvenue Nassim par exemple! Votre inscription a été confirmée."
  - Affichage de l'email du participant
- **Statut des notifications** : 
  - Badge "En attente" pour les notifications non lues
  - Bouton de suppression pour chaque notification
- **Icônes visuelles** : Interface intuitive avec icônes de boîte aux lettres

####  Gestion des Participants
- Navigation dédiée "Participants"
- Vue de tous les participants inscrits
- Suivi des inscriptions par événement

---

## 🏗️ Architecture Technique

### Technologies Utilisées

#### Backend
- **Framework** : Java Spring Boot
- **Service Discovery** : Netflix Eureka
- **API Gateway** : Spring Cloud Gateway
- **Communication** : OpenFeign (REST)
- **Base de Données** : MySQL
- **Gestion des sessions** : Sessions HTTP basiques

#### Frontend
- **Framework** : Angular 17+
- **Langage** : TypeScript
- **Styling** : CSS/SCSS
- **HTTP Client** : HttpClient

### Architecture Microservices

Le projet est composé de **5 microservices indépendants** :

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (Angular)                   │
│                     Port: 4200                           │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  API GATEWAY                             │
│                  Port: 8080                              │
│            (Point d'entrée unique)                       │
└────────┬────────────┬────────────┬───────────────────────┘
         │            │            │
    ┌────▼───┐   ┌───▼────┐  ┌───▼──────┐
    │ Events │   │Particip│  │Notificat │
    │Service │   │ Service│  │  Service │
    │  8081  │   │  8082  │  │   8083   │
    └────────┘   └────────┘  └──────────┘
         │            │            │
         └────────────┴────────────┘
                      │
              ┌───────▼────────┐
              │ EUREKA SERVER  │
              │   Port: 8761   │
              │ (Service Reg.) │
              └────────────────┘
#remarque ; EURIKA EST LIè AUSSI AVEC GATWAY

#### 1️⃣ Eureka Server (Port 8761)
- **Rôle** : Service de découverte et d'enregistrement
- **Fonction** : Permet aux microservices de se découvrir mutuellement
- **Avantages** : Équilibrage de charge, haute disponibilité

#### 2️⃣ API Gateway (Port 8080)
- **Rôle** : Point d'entrée unique pour toutes les requêtes
- **Fonction** : Routage intelligent vers les microservices appropriés
- **Sécurité** : Gestion centralisée de l'authentification

#### 3️⃣ Events Service (Port 8081)
- **Rôle** : Gestion complète des événements
- **Endpoints** :
  - `POST /api/events` : Créer un événement (Admin)
  - `GET /api/events` : Liste tous les événements
  - `GET /api/events/{id}` : Détails d'un événement
  - `PUT /api/events/{id}` : Modifier un événement (Admin)
  - `DELETE /api/events/{id}` : Supprimer un événement (Admin)

#### 4️⃣ Participant Service (Port 8082)
- **Rôle** : inscrittion consultation des evenement 
- **Endpoints** :
  - `POST /api/participants/register` : Inscription à un événement
  - `GET /api/participants/event/{eventId}` : Liste des participants d'un événement
  - `GET /api/participants/{id}` : Informations d'un participant

#### 5️⃣ Notification Service (Port 8083)
- **Rôle** : Envoi de notifications
- **Fonction** : Notifie les utilisateurs lors d'actions importantes
- **Types** : Email, notifications in-app

---

## 🚀 Installation et Lancement

### Prérequis
- **Java** : JDK 17 ou supérieur
- **Node.js** : Version 18+ et npm
- **MySQL** : Version 8+
- **Maven** : Version 3.6+
- **Angular CLI** : `npm install -g @angular/cli`

### Configuration de la Base de Données

1. Créer les bases de données MySQL :
```sql
CREATE DATABASE events_db;
CREATE DATABASE participants_db;
CREATE DATABASE notifications_db;
```

2. Configurer les fichiers `application.properties` de chaque service :
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nom_base
spring.datasource.username=votre_utilisateur
spring.datasource.password=votre_mot_de_passe
```

### Lancement des Services Backend

**Ordre de démarrage important** :

1. **Eureka Server** (en premier)
```bash
cd eureka-server
mvn spring-boot:run
```
Vérifier : http://localhost:8761

2. **API Gateway** (en second)
```bash
cd gateway-service
mvn spring-boot:run
```

3. **Les autres services** (dans n'importe quel ordre)
```bash
# Events Service
cd events-service
mvn spring-boot:run

Vérifier : http://localhost:8081
# Participant Service
cd participant-service
mvn spring-boot:run
Vérifier : http://localhost:8082
# Notification Service
cd notification-service
mvn spring-boot:run
```Vérifier : http://localhost:8083

### Lancement du Frontend

```bash
cd frontend
npm install
ng serve
```

Accéder à l'application : http://localhost:4200

---

## 📖 Guide d'Utilisation

### Pour les Administrateurs

1. **Connexion** : Se connecter avec un compte administrateur
2. **Tableau de bord** : Accéder au panneau d'administration
3. **Créer un événement** :
   - Cliquer sur le bouton violet "➕ Nouvel événement" en haut à droite
   - Remplir les informations obligatoires :
     - Titre de l'événement
     - Description détaillée
     - Date et heure
     - Lieu (ville et adresse)
     - Image illustrative
     - Document joint (optionnel)
   - Valider la création
4. **Gérer les événements** :
   - Voir la liste complète des événements en cartes visuelles
   - Utiliser la barre de recherche pour trouver un événement spécifique
   - Modifier ou supprimer un événement existant
   - Consulter le nombre d'inscrits en temps réel (badge vert avec icône)

### Pour les Participants

1. **Inscription** : Créer un compte participant via le formulaire d'inscription
2. **Connexion** : Se connecter avec ses identifiants
3. **Navigation** : L'interface affiche le nom de l'utilisateur connecté en haut (ex: "anis hamina (PARTICIPANT)")
4. **Parcourir les événements** :
   - Accéder à l'onglet  Événements" dans le menu principal
   - Voir tous les événements disponibles sous forme de cartes
   - Utiliser la recherche : "Rechercher un événement..."
   - Consulter les détails : date , lieu , description
5. **S'inscrire à un événement** :
   - Cliquer sur le bouton violet "Participer" sur l'événement choisi
   - Recevoir une notification de confirmation automatique
   - L'événement affiche le compteur mis à jour (ex: "3 participants")
6. **Consulter les notifications** :
   - Cliquer sur "🔔 Notifications" dans le menu
   - Voir toutes les confirmations d'inscription
   - Message type : "Bienvenue [amine]! Votre inscription a été confirmée."
   - Gérer les notifications (marquer comme lues ou supprimer)
7. **Documents** : Télécharger les documents joints via le lien en ligne 

---

## 🔒 Sécurité

- **Authentification par session** : Gestion des utilisateurs connectés via sessions HTTP
- **Autorisation par rôles** : Contrôle d'accès basé sur les rôles (Admin/Participant)
- **Validation des données** : Vérification côté backend et frontend
- **Hachage des mots de passe** : Stockage sécurisé des mots de passe
- **Protection des routes** : Vérification de l'authentification avant l'accès aux pages protégées

---

## 📊 Flux de Données

### Inscription à un Événement

```
1. Participant clique sur "S'inscrire" (Frontend)
                    ↓
2. Requête POST via API Gateway
                    ↓
3. Gateway route vers Participant Service
                    ↓
4. Participant Service enregistre l'inscription
                    ↓
5. Appel OpenFeign vers Events Service (incrément compteur)
                    ↓
6. Events Service met à jour le nombre de participants
                    ↓
7. Notification Service envoie une confirmation
                    ↓
8. Réponse retournée au Frontend
```

---

## 🛠️ Structure du Projet

```
gestion_event/
│
├── eureka-server/              # Service de découverte
│   ├── src/
│   └── pom.xml
│
├── gateway-service/            # API Gateway
│   ├── src/
│   └── pom.xml
│
├── events-service/             # Gestion des événements
│   ├── src/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── entity/
│   │   └── dto/
│   └── pom.xml
│
├── participant-service/        # Gestion des participants
│   ├── src/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── entity/
│   │   └── client/             # OpenFeign clients
│   └── pom.xml
│
├── notification-service/       # Service de notifications
│   ├── src/
│   └── pom.xml
│
├── frontend/                   # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── auth/
│   │   │   │   ├── events/
│   │   │   │   └── participants/
│   │   │   ├── services/
│   │   │   └── guards/
│   │   └── assets/
│   └── package.json
│
└── README.md
```

---




### Navigation
Menu principal avec 4 sections principales :
- **📅 GestionEvent** : Logo et page d'accueil
- **🎪 Événements** : Liste de tous les événements
- **👥 Participants** : Gestion des participants
- **🔔 Notifications** : Centre de notifications
- **👤 Profil utilisateur** : Nom et rôle (ex: "anis hamina (PARTICIPANT)") avec bouton de déconnexion

---



---

## 👨‍💻 Auteur

**BELARBI LINA**  
Étudiante M2 ISII - Groupe 1  

---

## 🙏 Remerciements

- Encadrants du module Ingénierie Web
merci madame d'avoir pris la peine de lire et de nous accompagner jusqu'aujourdhui grave a vous nous sommes arrivées a realiser une application web intuitive

---
 
**Dernière mise à jour** :  17 Décembre 2025