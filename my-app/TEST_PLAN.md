# Plan de Test - Module d'Inscription

Ce document formalise la stratégie de test pour le module d'inscription, couvrant la logique métier (Tests Unitaires) et l'interface utilisateur (Tests d'Intégration).

## 1. Stratégie Globale

L'application est testée selon deux axes principaux :
1.  **Logique Métier (Unit Tests)** : Validation stricte des données (format, règles métier) isolée de l'interface.
2.  **Interface Utilisateur (Integration Tests)** : Validation du comportement du formulaire, du feedback visuel et du cycle de vie des données.

---

## 2. Tests Unitaires (Jest)
**Cible** : `src/utils/validator.js`
**Objectif** : Garantir que chaque règle de validation fonctionne indépendamment.

| Fonctionnalité | Cas de Test Couverts |
| :--- | :--- |
| **Identité** | - Lettres, accents, tirets autorisés.<br>- Rejet des chiffres et caractères spéciaux.<br>- Protection XSS simple (`<script>`). |
| **Email** | - Format standard (x@y.z).<br>- Rejet des formats invalides. |
| **Code Postal** | - Exactement 5 chiffres.<br>- Rejet des lettres et longueurs incorrectes. |
| **Ville** | - Lettres, espaces, tirets, apostrophes.<br>- Rejet des chiffres. |
| **Âge** | - Calcul précis au jour près.<br>- Rejet des mineurs (< 18 ans).<br>- Gestion des années bissextiles. |
| **Stockage** | - Sauvegarde réussie dans localStorage.<br>- Gestion des erreurs (QuotaExceeded). |

---

## 3. Tests d'Intégration (React Testing Library)
**Cible** : `src/pages/RegistrationForm.js`
**Objectif** : Valider l'expérience utilisateur et l'intégration des règles métier dans le DOM.

| Scénario | Vérifications (Assertions) |
| :--- | :--- |
| **Affichage initial** | - Tous les champs sont présents.<br>- Le bouton "Register" est **désactivé** (gris). |
| **Feedback Immédiat** | - Saisie d'une valeur invalide + Focus Out (`blur`) -> **Message d'erreur rouge visible**.<br>- Correction de la saisie -> Le message disparaît. |
| **Sécurité UI** | - Le bouton reste désactivé tant qu'un champ est invalide ou vide.<br>- Le bouton s'active uniquement quand tout est valide. |
| **Soumission Succès** | - Clic sur "Register" -> Affichage du Toaster de succès.<br>- Les champs sont vidés (Reset).<br>- Les données sont présentes dans le `localStorage`. |
| **Utilisateur Chaotique** | - Séquence : Erreur -> Correction -> Autre erreur -> Correction.<br>- Vérification que l'UI suit l'état réel des données à chaque étape. |

---

## 4. Outils et Normes

*   **Framework** : Jest + React Testing Library.
*   **Environnement** : `jsdom` pour simuler le navigateur.
*   **Couverture** : Objectif 100% sur `validator.js` et les chemins critiques de `RegistrationForm.js`.

## 5. Exécution

```bash
npm test
```