# Projet Code212

Avant de démarrer le projet, assurez-vous d’avoir les éléments suivants installés sur votre machine :

* Node.js
* Composer
* XAMPP

## Étape 1 – Cloner le projet

Ouvrez un terminal et exécutez les commandes suivantes pour cloner le projet depuis GitHub :

```bash
git clone https://github.com/Bahaeeddine15/code212.git
cd code212
```

## Étape 2 – Installer les dépendances

Ouvrez le projet dans votre éditeur de code, puis exécutez les commandes suivantes :

### Installer les dépendances PHP (backend Laravel) :

```bash
composer install
```

### Installer les dépendances JavaScript (frontend React) :

```bash
npm install
```

## Étape 3 – Configurer la base de données

1. Ouvrir **phpMyAdmin**
2. Créer une base de données nommée `code212`
3. Ajouter le fichier `.env` à la racine du projet et y renseigner les clés nécessaires à la configuration.



Exécuter ensuite les migrations :

```bash
php artisan migrate
```

## Étape 4 – Lancer le projet

Lancer le serveur backend Laravel :

```bash
php artisan serve
```

Lancer ensuite le serveur frontend :

```bash
npm run dev
```

Le projet devrait maintenant être accessible dans votre navigateur.


# Push ton projet dans la branche :
## Basculer vers la branche dashboard-etudiant:
git checkout dashboard-etudiant

## Vérifie que tu es sur la bonne branche :
git branch

## Ajoute les fichiers :
add .

## Fais un commit avec un message :
git commit -m "Ajout du projet dans la branche dashboard-etudiant"

## Push vers GitHub :
git push origin dashboard-etudiant
