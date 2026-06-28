# Garden Inn - Site vitrine multilingue et multi-devises

## Rapport complet

Ce depot public presente le concept, les fonctions, les choix de conception, les outils utilises, les commandes locales et les captures d'ecran de l'application. Il est genere par l'orchestrateur uniquement apres validation de publication publique.

## Concept

Site vitrine moderne pour Bukit Lawang Garden Inn offrant une présentation multilingue, une conversion de devises en temps réel et des fonctionnalités de réservation directe.

Valoriser l'établissement Bukit Lawang Garden Inn en fournissant une vitrine claire, accessible et engageante pour les voyageurs internationaux, avec des outils facilitant la réservation et la découverte des services.

Public vise: Voyageurs internationaux, clients potentiels, partenaires touristiques et toute personne souhaitant découvrir ou réserver un séjour à Bukit Lawang.


## Fonctionnement de l'application

L'application React s'appuie sur une architecture modulaire où chaque section (accueil, chambres, restaurant, etc.) est un composant indépendant. Les données sont chargées dynamiquement et traduites selon la langue sélectionnée. La détection de section active au scroll est gérée via IntersectionObserver, tandis que les prix sont convertis en temps réel via une API de taux de change. Les liens de réservation directe et les itinéraires Google Maps sont intégrés pour faciliter l'action des visiteurs.

## Fonctions de l'application

- Présentation des chambres, du restaurant, des excursions et des transferts
- Navigation multilingue (anglais, français, indonésien)
- Conversion dynamique des prix en plusieurs devises (IDR, EUR, USD, GBP, AUD, SGD, CHF)
- Réservation directe via lien externe
- Génération d'itinéraires Google Maps pour les transferts
- Affichage des notes Google Places avec fallback
- Navigation active au scroll avec détection de section
- Pré-chargement optimisé des ressources
- Affichage des chambres avec descriptions et photos
- Présentation du restaurant et de ses menus
- Liste des excursions disponibles avec détails et tarifs
- Catalogue des transferts avec options et prix
- Système de réservation directe via lien externe
- Conversion dynamique des prix en plusieurs devises
- Navigation multilingue (EN/FR/ID)
- Détection de section active au scroll
- Pré-chargement des ressources pour une expérience fluide
- Affichage des notes Google Places avec fallback en cas d'erreur
- Expérience PWA (Progressive Web App) pour une utilisation hors ligne

## Actualisations et evolution

- Statut fonctionnel confirmé avec alertes mineures (vérification de sécurité requise avant publication)
- Optimisation des performances de chargement via IntersectionObserver et cache-busting
- Amélioration de l'expérience mobile avec ajustement des marges et du viewport
- Ajout de métadonnées structurées pour le référencement SEO
- Mise à jour des dépendances pour corriger les vulnérabilités connues
- Statut courant: PUBLIC_READY.
- Securite: OK_PUBLIC.
- Fonctionnement: FONCTIONNEL.
- Statut fonctionnel confirmé avec alertes mineures (vérification de sécurité requise avant publication publique)
- Optimisation des performances de chargement via IntersectionObserver

## Comment le projet a ete reflechi et construit

Le projet a été conçu comme une vitrine touristique orientée réservation, avec une structure claire et des parcours utilisateurs logiques : découverte du lieu, compréhension des offres, filtrage des services, puis réservation ou contact. L'architecture repose sur des contextes React (langue et devise) pour centraliser la gestion des préférences utilisateur. Les choix techniques incluent Vite pour le bundling, TypeScript pour le typage strict, et Tailwind CSS pour le styling. Les images sont versionnées pour éviter les problèmes de cache, et un système de fallback est implémenté pour les contenus externes (notes Google Places).

Cette section doit expliquer les choix qui ont guide le projet: besoin de depart, structure retenue, modules principaux, compromis techniques, interface ou logique metier, et raisons des outils utilises.

### Outils, IA et moteurs utilises

- Vite (bundler et serveur de développement)
- React (bibliothèque UI)
- TypeScript (typage statique)
- Tailwind CSS (styling utilitaire)
- Frankfurter API (taux de change)
- IntersectionObserver (détection de scroll)
- Google Maps API (itinéraires et notes)
- Sharp (optimisation d'images)
- ESLint et Prettier (linting et formatage de code)
- Architecture modulaire avec composants React
- Contextes React pour la gestion centralisée (langue, devise)
- Gestion des préférences utilisateur via localStorage
- Optimisation des performances avec lazy loading et cache-busting
- Responsive design avec Tailwind CSS
- SEO optimisé via métadonnées structurées
- PWA (Progressive Web App) pour une expérience hors ligne
- Logging des événements utilisateur pour analyse

### Options techniques detectees

- Type de projet: node
- Gestionnaire: npm
- Nom package: garden-inn-app
- Version: 1.0.0
- Lien public: https://bukitlawang-garden-inn.com
- Statut securite: OK_PUBLIC

### Stack et dependances principales

- Vite/Dev server
- React
- Node.js
- Architecture modulaire avec composants React
- Contextes React pour la gestion centralisée (langue, devise)
- Gestion des préférences utilisateur via localStorage
- Optimisation des performances avec lazy loading et cache-busting
- Responsive design avec Tailwind CSS
- SEO optimisé via métadonnées structurées
- PWA (Progressive Web App) pour une expérience hors ligne
- Logging des événements utilisateur pour analyse

### Scripts disponibles

- build: tsc && vite build
- dev: vite
- preview: vite preview

### Dependances applicatives

- react ^18.2.0
- react-dom ^18.2.0

### Dependances de developpement

- @types/node ^20.12.0
- @types/react ^18.2.66
- @types/react-dom ^18.2.22
- @vitejs/plugin-react ^4.2.1
- autoprefixer ^10.5.0
- postcss ^8.5.12
- sharp ^0.34.5
- tailwindcss ^3.4.19
- typescript ^5.2.2
- vite ^5.2.0

## Automatisations et comportements internes

- Chargement automatique des traductions avec fallback anglais
- Sauvegarde des préférences (langue/devise) en localStorage
- Conversion dynamique des prix via API de taux de change
- Détection de section active au scroll avec IntersectionObserver
- Cache-busting des images via APP_VERSION
- Fallback image en cas d'erreur de chargement
- Génération de routes Google Maps pour les transferts
- Logging des événements utilisateur (clics, erreurs, etc.)

## Installation locale

[object Object]

### Pre-requis
- Node.js installe localement.
- Gestionnaire detecte: npm.

### Commandes
```powershell
npm install
npm run build
npm run dev
```

### Scripts utiles
- build: tsc && vite build
- dev: vite
- preview: vite preview

## Lancement

```powershell
npm run dev
npm run build
```

## Utilisation

Après installation, l'application peut être lancée en local avec `npm run dev`. L'utilisateur peut naviguer entre les sections via le menu ou le scroll, changer de langue ou de devise via les boutons dédiés, et accéder aux liens de réservation ou d'itinéraire. Les préférences (langue, devise) sont sauvegardées localement pour une expérience personnalisée. L'application est optimisée pour une utilisation mobile et desktop.

## Captures d'ecran

![Capture desktop](docs/github-captures/10-garden-inn-2026-06-28_03-38-00-desktop.png)

![Capture mobile](docs/github-captures/10-garden-inn-2026-06-28_03-38-00-mobile.png)

## Variables d'environnement

Aucune variable d'environnement n'a ete detectee par l'orchestrateur.

## Securite

Ne jamais publier `.env`, tokens, sessions, logs sensibles, cles privees ou donnees personnelles.
