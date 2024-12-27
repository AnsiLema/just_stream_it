
# JustStreamIt - Projet de Classement de Films

Bienvenue dans le projet **JustStreamIt**, une application web permettant de visualiser en temps réel un classement de films selon leurs notes IMDB. Ce projet a été réalisé dans le cadre d'une mission pour l'association JustStreamIt.

---

## Objectifs du Projet

1. Développer une interface utilisateur intuitive et réactive.
2. Récupérer et afficher des données depuis une API locale fournie (OCMovies API).
3. Offrir une expérience utilisateur fluide avec un affichage dynamique des films et catégories.

---

## Fonctionnalités Principales

- **Meilleur film** : Affiche le film ayant la meilleure note IMDB avec un résumé et des détails.
- **Films les mieux notés** : Affiche les films les mieux notés toutes catégories confondues.
- **Catégories de films** : Présente des films triés par catégorie, avec possibilité de choisir une catégorie libre.
- **Détails des films** : Une fenêtre modale affiche les informations détaillées d'un film (réalisateur, acteurs, box-office, etc.).
- **Responsive Design** : Adaptation de l'affichage pour mobile, tablette et ordinateur.

---

## Technologies Utilisées

- **HTML5** et **CSS3** pour la structure et le style.
- **Vanilla JavaScript** pour la logique côté client.
- **Fetch API** pour les requêtes asynchrones vers l'API locale OCMovies.

---

## Installation et Configuration

### Prérequis

- **Python 3** installé sur votre machine.
- Une version locale de l'API **OCMovies** (fournie dans un dépôt séparé).

### Étapes d'installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/AnsiLema/VideoOnDemand_OC_P6.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd JustStreamIt
   ```
3. Créez un environnement virtuel Python :
   ```bash
   python -m venv env
   ```
4. Activez l'environnement virtuel :
   - Sur Windows :
     ```bash
     .\env\Scripts\activate
     ```
   - Sur macOS/Linux :
     ```bash
     source env/bin/activate
     ```
5. Installez les dépendances nécessaires pour l'API locale OCMovies (voir le fichier README de l'API).
6. Lancez le serveur de l'API locale :
   ```bash
   python manage.py runserver
   ```
7. Ouvrez le fichier `index.html` dans votre navigateur pour afficher l'application.

---

## Arborescence du Projet

```
JustStreamIt/
├── index.html        # Fichier principal HTML
├── style.css         # Feuille de style CSS
├── script.js         # Logique JavaScript
└── README.md         # Documentation du projet
```

---

## Utilisation

1. Lancez l'application en ouvrant `index.html` dans votre navigateur.
2. Naviguez entre les différentes sections : meilleur film, films les mieux notés, catégories.
3. Cliquez sur "Voir Détails" pour obtenir des informations supplémentaires sur un film via une modale.
4. Testez le design réactif en redimensionnant la fenêtre.
5. En version tablette et mobile, cliquez sur "Voir Plus" pour afficher les autres films de la catégorie.

---

## Défis et Solutions

### Défis

- Compréhension et intégration de l'API locale.
- Respect des contraintes strictes (utilisation de vanilla JavaScript, responsive design).

### Solutions

- Documentation approfondie de l'API et des maquettes.
- Tests rigoureux pour garantir la compatibilité multi-navigateurs.

---

## Auteur

Ce projet a été développé par **A'nsi**.

---


