

import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/LocalizationContext';
import { Icons } from '../constants/icons';

// Declare google namespace for TypeScript
declare global {
  interface Window {
    google?: any;
  }
}

const GoogleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-0.5">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFull = starValue <= Math.round(rating);
        return (
          <Icons.Star 
            key={index} 
            className={`w-4 h-4 ${isFull ? 'text-[#FBBC05] fill-current' : 'text-gray-300'}`} 
          />
        );
      })}
    </div>
  );
};

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  // --- CONFIGURATION DE LA NOTE ---
  // Mise à jour manuelle : 4.7 étoiles et 303 avis
  const [rating, setRating] = useState(4.7); 
  const [reviewsCount, setReviewsCount] = useState(303); 
  // --------------------------------

  useEffect(() => {
    // Only runs if you enable the script in index.html with a valid API Key
    if (window.google && window.google.maps && window.google.maps.places) {
      try {
        const map = new window.google.maps.Map(document.createElement('div'));
        const service = new window.google.maps.places.PlacesService(map);
        
        service.getDetails({
          placeId: 'ChIJu0tq3oq3MDMRpQkT86k93t4', 
          fields: ['rating', 'user_ratings_total']
        }, (place: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.rating) {
            setRating(place.rating);
            setReviewsCount(place.user_ratings_total);
          }
        });
      } catch (error) {
        // Silent fail to keep the UI clean
      }
    }
  }, []);
  
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <a href={t('footer.mapUrl')} target="_blank" rel="noopener noreferrer" className="flex items-start justify-center md:justify-start space-x-3 text-sm hover:text-white transition-colors">
                <Icons.MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">{t('footer.address')}</span>
              </a>
              <a href={`tel:${t('footer.phone').replace(/[()-\\s]/g, '')}`} className="flex items-center justify-center md:justify-start space-x-3 text-sm hover:text-white transition-colors">
                <Icons.Phone className="w-4 h-4 flex-shrink-0" />
                <span>{t('footer.phone')}</span>
              </a>
              <a href={`mailto:${t('footer.email')}`} className="flex items-center justify-center md:justify-start space-x-3 text-sm hover:text-white transition-colors">
                <Icons.Mail className="w-4 h-4 flex-shrink-0" />
                <span>{t('footer.email')}</span>
              </a>
            </div>
          </div>

          {/* Google Reviews - Google Travel Badge Style */}
          <div className="text-center flex flex-col items-center justify-start">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.reviewsTitle')}</h3>
            <a 
              href={t('footer.reviewsUrl')}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-[280px] flex items-center justify-between group cursor-pointer border border-stone-200"
            >
               <div className="flex flex-col items-start">
                   <div className="flex items-baseline space-x-2">
                       <span className="text-3xl font-bold text-stone-800">{rating}</span>
                       <span className="text-sm font-bold text-emerald-600 tracking-wide">Excellent</span>
                   </div>
                   <StarRating rating={rating} />
                   <div className="mt-1 text-xs text-stone-500">
                       Based on {reviewsCount} reviews
                   </div>
               </div>
               <div className="flex flex-col items-center justify-center border-l border-stone-100 pl-4">
                   <GoogleLogo className="w-8 h-8" />
               </div>
            </a>
          </div>

          {/* Instagram */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.socialTitle')}</h3>
            <a 
              href={t('footer.instagramUrl')}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t('footer.socialButton')}
            </a>
          </div>
        </div>
      </div>
      <div className="bg-stone-900 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-stone-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;