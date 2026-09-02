# Garden Inn - Site vitrine multilingue et multi-devises

## Statut de diffusion
Projet explique sur Site Ma Methode: la fiche publique peut presenter son utilite, ses fonctions, son avancement et ses liens disponibles.

## Liens vers l'application
- Application: [https://bukitlawang-garden-inn.com](https://bukitlawang-garden-inn.com)
- GitHub: [https://github.com/RYJITS/garden-inn](https://github.com/RYJITS/garden-inn)

## Avancement du projet
- Etat du projet: pret cote usage public.
- Fonctionnement: fonctionnel.
- Securite: OK pour une presentation publique.
- Ma Methode: fiche explicative visible.
- Publication externe: candidat public, validation finale separee.

## A quoi sert le projet
Site vitrine moderne pour Bukit Lawang Garden Inn, conçu comme une plateforme de découverte et de réservation. L'application présente les chambres, le restaurant, les excursions et les services de transfert avec une interface responsive et accessible. Les fonctionnalités clés incluent une navigation multilingue, une conversion de devises en temps réel, et des outils d'interaction comme les itinéraires Google Maps et les liens de réservation directe.

## Fonctionnement de l'application ou du projet
L'application React s'appuie sur une architecture modulaire où chaque section (accueil, chambres, restaurant, etc.) est un composant indépendant. Les données sont chargées dynamiquement et traduites selon la langue sélectionnée. La détection de section active au scroll est gérée via IntersectionObserver, tandis que les prix sont convertis en temps réel via une API de taux de change. Les liens de réservation directe et les itinéraires Google Maps sont intégrés pour faciliter l'action des visiteurs.

## Comment le projet a ete construit
Le projet a été conçu comme une vitrine touristique orientée réservation, avec une structure claire et des parcours utilisateurs logiques : découverte du lieu, compréhension des offres, filtrage des services, puis réservation ou contact. L'architecture repose sur des contextes React (langue et devise) pour centraliser la gestion des préférences utilisateur. Les choix techniques incluent Vite pour le bundling, TypeScript pour le typage strict, et Tailwind CSS pour le styling. Les images sont versionnées pour éviter les problèmes de cache, et un système de fallback est implémenté pour les contenus externes (notes Google Places).

## Installation et utilisation
### Installation
Installation locale standard pour la version partageable du projet:

```powershell
npm install
npm run build
npm run dev
```

### Utilisation
Après installation, l'application peut être lancée en local avec `npm run dev`. L'utilisateur peut naviguer entre les sections via le menu ou le scroll, changer de langue ou de devise via les boutons dédiés, et accéder aux liens de réservation ou d'itinéraire. Les préférences (langue, devise) sont sauvegardées localement pour une expérience personnalisée. L'application est optimisée pour une utilisation mobile et desktop.

## Fonctions disponibles dans l'application
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

## Outils, IA et moteurs en arriere-plan
- Vite (bundler et serveur de développement)
- React (bibliothèque UI)
- TypeScript (typage statique)
- Tailwind CSS (styling utilitaire)
- Frankfurter API (taux de change)
- IntersectionObserver (détection de scroll)
- Google Maps API (itinéraires et notes)
- Sharp (optimisation d'images)
- ESLint et Prettier (linting et formatage de code)

## Automatisations integrees
- Chargement automatique des traductions avec fallback anglais
- Sauvegarde des préférences (langue/devise) en localStorage
- Conversion dynamique des prix via API de taux de change
- Détection de section active au scroll avec IntersectionObserver
- Cache-busting des images via APP_VERSION
- Fallback image en cas d'erreur de chargement
- Génération de routes Google Maps pour les transferts
- Logging des événements utilisateur (clics, erreurs, etc.)

## Captures d'ecran
![Capture 1 - garden-inn](docs/captures/10-garden-inn-2026-08-30_00-29-42-desktop.png)

![Capture 2 - garden-inn](docs/captures/10-garden-inn-2026-08-30_00-29-42-mobile.png)

## Mises a jour
- Optimisation des performances de chargement via IntersectionObserver
- Mise à jour des dépendances pour corriger les vulnérabilités connues
- Amélioration de l'expérience mobile avec ajustement des marges et du viewport
- Ajout de métadonnées structurées pour le référencement SEO
- Optimisation des performances de chargement via IntersectionObserver et cache-busting
