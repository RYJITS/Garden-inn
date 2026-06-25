
// --- CONFIGURATION DU CACHE IMAGE ---

// Mettez ceci sur 'true' pendant que vous changez vos photos.
// Cela forcera le navigateur à recharger les images à chaque visite.
// IMPORTANT : Remettez sur 'false' quand vous avez fini, sinon le site sera lent pour les clients !
export const FORCE_REFRESH = true;

// Changez ce numéro uniquement quand FORCE_REFRESH est sur 'false'
// pour valider une mise à jour majeure des images pour le public.
export const MANUAL_VERSION = '1';

// Logique automatique : ne pas toucher ci-dessous
export const APP_VERSION = FORCE_REFRESH ? Date.now().toString() : MANUAL_VERSION;
