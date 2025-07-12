# Code212 - Système de Gestion d'Étudiants

Une application web moderne construite avec **Laravel 12** et **React 19** utilisant **Inertia.js** pour une expérience utilisateur fluide.

## 🚀 Technologies Utilisées

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI + Headless UI
- **Build**: Vite 6.0
- **Routing**: Inertia.js 2.0

## 📁 Structure du Projet

```
code212/
├── app/
│   ├── Http/Controllers/     # Contrôleurs Laravel
│   ├── Models/              # Modèles Eloquent
│   └── Providers/           # Service Providers
├── resources/
│   ├── css/                 # Styles CSS
│   └── js/
│       ├── components/      # Composants React
│       │   ├── common/      # Composants communs
│       │   ├── forms/       # Composants de formulaires
│       │   ├── layout/      # Composants de mise en page
│       │   ├── navigation/  # Composants de navigation
│       │   ├── ui/          # Composants UI (Radix)
│       │   └── user/        # Composants utilisateur
│       ├── layouts/         # Layouts React
│       ├── pages/           # Pages de l'application
│       ├── hooks/           # Hooks personnalisés
│       ├── lib/             # Utilitaires
│       └── types/           # Types TypeScript
├── routes/                  # Routes Laravel
├── database/               # Migrations et seeders
└── config/                 # Configuration Laravel
```

## 🛠️ Installation

Avant de démarrer le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

* Node.js
* Composer
* XAMPP

### Étape 1 – Cloner le projet

Ouvrez un terminal et exécutez les commandes suivantes pour cloner le projet depuis GitHub :

```bash
git clone https://github.com/Bahaeeddine15/code212.git
cd code212
```

### Étape 2 – Installer les dépendances

Ouvrez le projet dans votre éditeur de code, puis exécutez les commandes suivantes :Avant de démarrer le projet, assurez-vous d’avoir les éléments suivants installés sur votre machine :

* Node.js
* Composer
* XAMPP

### Étape 1 – Cloner le projet

Ouvrez un terminal et exécutez les commandes suivantes pour cloner le projet depuis GitHub :

```bash
git clone https://github.com/Bahaeeddine15/code212.git
cd code212
```

### Étape 2 – Installer les dépendances

Ouvrez le projet dans votre éditeur de code, puis exécutez les commandes suivantes :

#### Installer les dépendances PHP (backend Laravel) :

```bash
composer install
```

#### Installer les dépendances JavaScript (frontend React) :

```bash
npm install
```

### Étape 3 – Configurer la base de données

1. Ouvrir **phpMyAdmin**
2. Créer une base de données nommée `code212`
3. Ajouter le fichier `.env` à la racine du projet et y renseigner les clés nécessaires à la configuration.



Exécuter ensuite les migrations :

```bash
php artisan migrate
```

### Étape 4 – Lancer le projet

Lancer le serveur backend Laravel :

```bash
php artisan serve
```

Lancer ensuite le serveur frontend :

```bash
npm run dev
```
et

### Installation des packages npm
```bash
npm install @heroicons/react
```

### Travailler avec une branche specifique :
#### Basculer vers la branche dashboard-etudiant
changer la branche
```bash
git checkout dashboard-etudiant
```

Vérifie que tu es sur la bonne branche :
```bash
git branch
```

Récupérer les modifications (pull)
```bash
git pull origin dashboard-etudiant
```

#### Faire un commit et push vers la branche dashboard-etudiant
Ajoute les fichiers :
```bash
git add .
```

Fais un commit avec un message :
```bash
git commit -m "message du commit"
```

Push vers la branch dashboard-etudiant :
```bash
git push origin dashboard-etudiant
```

Le projet devrait maintenant être accessible dans votre navigateur.

---

## 📋 Documentation d'Organisation du Projet

### Architecture des Composants

Le projet suit une architecture modulaire avec une séparation claire des responsabilités :

#### 🗂️ Structure des Composants React

```
resources/js/components/
├── common/              # Composants réutilisables
│   ├── heading.tsx      # Titres et sous-titres
│   ├── heading-small.tsx
│   ├── icon.tsx         # Icônes
│   └── text-link.tsx    # Liens texte
├── forms/               # Composants de formulaires
│   └── input-error.tsx  # Affichage des erreurs
├── layout/              # Composants de mise en page
│   ├── app-content.tsx  # Contenu principal
│   ├── app-header.tsx   # En-tête
│   ├── app-logo.tsx     # Logo
│   ├── app-shell.tsx    # Conteneur principal
│   └── app-sidebar.tsx  # Barre latérale
├── navigation/          # Composants de navigation
│   ├── breadcrumbs.tsx  # Fil d'Ariane
│   ├── nav-main.tsx     # Navigation principale
│   ├── nav-user.tsx     # Navigation utilisateur
│   └── Navbar.tsx       # Barre de navigation
├── ui/                  # Composants UI (Radix)
│   ├── button.tsx       # Boutons
│   ├── dialog.tsx       # Modales
│   ├── input.tsx        # Champs de saisie
│   └── ...              # Autres composants UI
└── user/                # Composants utilisateur
    ├── delete-user.tsx  # Suppression utilisateur
    ├── user-info.tsx    # Informations utilisateur
    └── user-menu-content.tsx
```

### 🎨 Conventions de Nommage

- **Composants** : PascalCase (ex: `UserProfile.tsx`)
- **Hooks** : camelCase avec préfixe "use" (ex: `useAuth.ts`)
- **Utilitaires** : camelCase (ex: `formatDate.ts`)
- **Types** : PascalCase (ex: `UserType.ts`)

### 🔧 Configuration Optimisée

#### Package.json Minimaliste
Le projet a été optimisé pour réduire les dépendances :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:ssr": "vite build && vite build --ssr"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@heroicons/react": "^2.2.0",
    "@inertiajs/react": "^2.0.0",
    "@radix-ui/react-*": "^1.1.3+",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

### 🚀 Optimisations Effectuées

#### ✅ Nettoyage du Projet
- Suppression des fichiers de test (PHPUnit, Pest)
- Suppression des outils de développement (ESLint, Prettier)
- Suppression des dépendances inutiles
- Réduction de 280 à 68 packages npm

#### ✅ Réorganisation des Fichiers
- Structure modulaire des composants
- Conventions de nommage PSR-4 respectées
- Séparation claire des responsabilités

#### ✅ Performance
- Bundle optimisé avec Vite 6.0
- Composants lazy-loaded
- CSS optimisé avec Tailwind CSS 4.0

### 📦 Gestion des Dépendances

#### Dépendances Principales
- **Laravel 12** : Framework PHP backend
- **React 19** : Framework JavaScript frontend
- **Inertia.js 2.0** : SPA routing
- **Tailwind CSS 4.0** : Framework CSS
- **Radix UI** : Composants accessibles
- **Vite 6.0** : Build tool

#### Installation Rapide
```bash
# Installation des dépendances PHP
composer install --no-dev

# Installation des dépendances JavaScript
npm install

# Construction pour production
npm run build
```

### 🔍 Débogage et Développement

#### Scripts Disponibles
```bash
# Développement
npm run dev          # Serveur de développement Vite
composer run dev     # Serveur Laravel + Vite

# Production
npm run build        # Build de production
npm run build:ssr    # Build avec SSR
```

#### Logs et Monitoring
- Logs Laravel : `storage/logs/`
- Erreurs Vite : Console navigateur
- Debugging avec Laravel Pail : `php artisan pail`

### 📝 Bonnes Pratiques

1. **Composants** : Un composant par fichier
2. **Hooks** : Logique réutilisable dans des hooks personnalisés
3. **Types** : Typage TypeScript strict
4. **Styles** : Utilisation de Tailwind CSS classes
5. **État** : Gestion d'état avec React hooks

### 🛡️ Sécurité

- Validation des données côté serveur (Laravel)
- Sanitisation des entrées utilisateur
- Protection CSRF intégrée
- Authentification sécurisée

### 📈 Monitoring et Performance

- Bundle size optimisé
- Code splitting automatique
- Lazy loading des composants
- Optimisation des images

---

### 💡 Conseils de Développement

1. **Avant de commencer** : Vérifiez que vous êtes sur la bonne branche
2. **Développement** : Utilisez `npm run dev` pour le hot reload
3. **Tests** : Testez vos composants dans différents navigateurs
4. **Performance** : Surveillez la taille du bundle avec `npm run build`

### 🤝 Contribution

Pour contribuer au projet :

1. Créez une branche à partir de `dashboard-etudiant`
2. Effectuez vos modifications
3. Testez votre code
4. Créez une pull request

---

*Documentation mise à jour le 12 juillet 2025*
