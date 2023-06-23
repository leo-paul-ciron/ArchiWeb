# Installation de l'application Angular avec Express.js et MongoDB Atlas

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js : [Télécharger et installer Node.js](https://nodejs.org/)
- MongoDB Atlas : [Créer un compte MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

## Étapes d'installation

### Étape 1 : Cloner le dépôt

Clonez votre dépôt Git contenant le code source de votre application Angular.

```
$ git clone <URL_DU_DEPOT>
$ cd <DOSSIER_DU_PROJET>

```

### Étape 2 : Installer les dépendances du frontend

Installez les dépendances nécessaires pour votre application Angular.

```
$ cd <DOSSIER_DU_PROJET>
$ npm install

```

### Étape 3 : Configuration de MongoDB Atlas

1. Connectez-vous à [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) et créez un nouveau cluster.
2. Suivez les instructions fournies par MongoDB Atlas pour configurer votre cluster, y compris la création d'un utilisateur de base de données et la configuration des règles d'accès réseau.

### Étape 4 : Configuration du backend avec Express.js

1. Ouvrez un autre terminal et accédez au dossier du backend.

```
$ cd <DOSSIER_DU_PROJET>/backend

```

1. Installez les dépendances du backend.

```
$ npm install

```

1. Créez un fichier `.env` à la racine du dossier backend et ajoutez les variables d'environnement suivantes :

```
MONGODB_URI=<URL_MONGODB_ATLAS>
JWT_SECRET=<VOTRE_SECRET>

```

- `MONGODB_URI` : Remplacez `<URL_MONGODB_ATLAS>` par l'URL de connexion fournie par MongoDB Atlas.
- `JWT_SECRET` : Remplacez `<VOTRE_SECRET>` par une clé secrète utilisée pour signer les jetons JWT.

### Étape 5 : Démarrage de l'application

1. Dans le terminal du frontend, exécutez la commande suivante pour démarrer l'application Angular en mode de développement :

```
$ npm start

```

1. Dans le terminal du backend, exécutez la commande suivante pour démarrer le serveur Express.js :

```
$ npm start

```

L'application Angular devrait maintenant être accessible à l'adresse `http://localhost:4200`, et le serveur Express.js sera accessible à l'adresse `http://localhost:3000`.

# Bibliothèques utilisées dans l'application Angular

Voici les bibliothèques utilisées dans votre application Angular et leur version :

## Dépendances principales :

- **@angular/animations** : version 15.2.0
- **@angular/cdk** : version 15.2.9
- **@angular/common** : version 15.2.0
- **@angular/compiler** : version 15.2.0
- **@angular/core** : version 15.2.0
- **@angular/forms** : version 15.2.0
- **@angular/material** : version 15.2.9
- **@angular/platform-browser** : version 15.2.0
- **@angular/platform-browser-dynamic** : version 15.2.0
- **@angular/router** : version 15.2.0
- **@auth0/angular-jwt** : version 5.1.2
- **axios** : version 1.3.5
- **bootstrap** : version 5.2.3
- **jquery** : version 3.6.4
- **jsonwebtoken** : version 9.0.0
- **jwt-decode** : version 3.1.2
- **ngx-toastr** : version 16.1.0
- **postcss-import** : version 15.1.0
- **postcss-scss** : version 4.0.6
- **rxjs** : version 7.8.0
- **sweetalert2** : version 11.7.3
- **tslib** : version 2.3.0
- **zone.js** : version 0.12.0

## Dépendances de développement :

- **@angular-devkit/build-angular** : version 15.2.2
- **@angular/cli** : version 15.2.2
- **@angular/compiler-cli** : version 15.2.0
- **@types/jasmine** : version 4.3.0
- **autoprefixer** : version 10.4.14
- **jasmine-core** : version 4.5.0
- **karma** : version 6.4.0
- **karma-chrome-launcher** : version 3.1.0
- **karma-coverage** : version 2.2.0
- **karma-jasmine** : version 5.1.0
- **karma-jasmine-html-reporter** : version 2.0.0
- **postcss** : version 8.4.21
- **tailwindcss** : version 3.3.1
- **typescript** : version 4.9.4

---

---

# Bibliothèques utilisées dans l'application Express.js

Voici les bibliothèques utilisées dans votre application Express.js et leur version :

## Dépendances principales :

- **angular-web-storage** : version 15.0.0
- **body-parser** : version 1.20.2
- **cookie-parser** : version 1.4.6
- **express** : version 4.18.2
- **express-session** : version 1.17.3
- **jsonwebtoken** : version 9.0.0
- **mongodb** : version 5.5.0
- **mongoose** : version 7.0.2
- **ngx-webstorage** : version 11.1.1

## Dépendances de développement :

- **nodemon** : version 2.0.22
