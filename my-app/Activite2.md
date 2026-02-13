# Intégration React & Tests d'Interface (Activité 2)
## Réalisé par Pierre TONDEUX le 13/02/2026
repo : https://github.com/PierreTDX/Test_et_Test_unitaire.git

Ce projet constitue la seconde étape du fil rouge. Il consiste à intégrer le module de validation `validator.js` (développé en activité 1) dans une interface utilisateur **React**, tout en garantissant la robustesse de l'application via des **Tests d'Intégration**.

## Objectifs de l'Activité

L'objectif principal est de valider que l'interface utilisateur (UI) réagit correctement à la logique métier et offre un feedback utilisateur optimal.

### 1. Développement du Formulaire
*   **Champs requis** : Nom, Prénom, Email, Date de naissance, Code Postal, Ville.
*   **Feedback Immédiat** : Affichage des erreurs en rouge sous les champs concernés dès la saisie ou à la perte du focus (`onBlur`).
*   **Sécurité UI** : Le bouton de soumission reste **désactivé (disabled)** tant que le formulaire contient des erreurs ou est incomplet.
*   **Succès** :
    *   Affichage d'un message de confirmation (Toaster).
    *   Sauvegarde des données dans le `localStorage`.
    *   Réinitialisation automatique des champs.

### 2. Tests d'Intégration (React Testing Library)
Les tests automatisés valident le comportement du DOM :
*   **Simulation Utilisateur** : Scénarios "chaotiques" incluant saisies invalides, corrections et re-saisies.
*   **Vérification Visuelle** : Contrôle de la présence des messages d'erreur et de l'état du bouton (gris/actif).
*   **Persistance** : Vérification du remplissage du `localStorage` via `jsdom`.

### 3. Documentation & Stratégie
*   Formalisation de la stratégie de test dans un fichier [TEST_PLAN.md](TEST_PLAN.md) (distinction entre couverture Unitaire et Intégration).

## Installation

Assurez-vous d'avoir Node.js installé.

```bash
git clone https://github.com/PierreTDX/Test_et_Test_unitaire
cd my-app
npm install
```

## Commandes Disponibles

### Lancer l'application
Démarre l'interface React en mode développement sur http://localhost:3000.
```bash
npm start
```

### Lancer les tests
Exécute la suite complète de tests (Unitaires + Intégration) avec Jest et React Testing Library.
```bash
npm test
```
> **Objectif** : Couverture de code à 100%.

### Générer la documentation
Génère la documentation technique JSDoc incluant les composants React.
```bash
npm run jsdoc
```

## Livrables

*   **Code Source** : Composant `RegistrationForm.js` intégrant la logique métier.
*   **Tests** : Fichiers `.test.js` validant l'UI et la logique.
*   **Documentation** :
    *   Plan de Test (TEST_PLAN.md)
    *   Documentation Technique (JSDoc)
*   **Tag Git** : `activite_2`