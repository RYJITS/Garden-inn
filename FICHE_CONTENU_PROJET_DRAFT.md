# Brouillon contenu fiche - Garden Inn - Site vitrine multilingue et multi-devises

## Resume
Site vitrine moderne pour Bukit Lawang Garden Inn offrant une présentation multilingue, une conversion de devises en temps réel et des fonctionnalités de réservation directe.

## A quoi sert le projet
Valoriser l'établissement Bukit Lawang Garden Inn en fournissant une vitrine claire, accessible et engageante pour les voyageurs internationaux, avec des outils facilitant la réservation et la découverte des services.

## Fonctionnement
L'application React s'appuie sur une architecture modulaire où chaque section (accueil, chambres, restaurant, etc.) est un composant indépendant. Les données sont chargées dynamiquement et traduites selon la langue sélectionnée. La détection de section active au scroll est gérée via IntersectionObserver, tandis que les prix sont convertis en temps réel via une API de taux de change. Les liens de réservation directe et les itinéraires Google Maps sont intégrés pour faciliter l'action des visiteurs.

## Construction
Le projet a été conçu comme une vitrine touristique orientée réservation, avec une structure claire et des parcours utilisateurs logiques : découverte du lieu, compréhension des offres, filtrage des services, puis réservation ou contact. L'architecture repose sur des contextes React (langue et devise) pour centraliser la gestion des préférences utilisateur. Les choix techniques incluent Vite pour le bundling, TypeScript pour le typage strict, et Tailwind CSS pour le styling. Les images sont versionnées pour éviter les problèmes de cache, et un système de fallback est implémenté pour les contenus externes (notes Google Places).

## Installation
[object Object]

## Utilisation
Après installation, l'application peut être lancée en local avec `npm run dev`. L'utilisateur peut naviguer entre les sections via le menu ou le scroll, changer de langue ou de devise via les boutons dédiés, et accéder aux liens de réservation ou d'itinéraire. Les préférences (langue, devise) sont sauvegardées localement pour une expérience personnalisée. L'application est optimisée pour une utilisation mobile et desktop.

## Fonctions
- Présentation des chambres, du restaurant, des excursions et des transferts
- Navigation multilingue (anglais, français, indonésien)
- Conversion dynamique des prix en plusieurs devises (IDR, EUR, USD, GBP, AUD, SGD, CHF)
- Réservation directe via lien externe
- Génération d'itinéraires Google Maps pour les transferts
- Affichage des notes Google Places avec fallback
- Navigation active au scroll avec détection de section
- Pré-chargement optimisé des ressources
