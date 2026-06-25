
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LocalizationContext';

interface Slide {
  image?: string;
  video?: string;
  titleKey: string;
  subtitleKey: string;
  subtitleFirst?: boolean;
}

interface DynamicHeroProps {
  slides: Slide[];
  interval?: number;
}

// Composant pour l'effet de reconstitution géométrique
const GeometricText: React.FC<{ 
  text: string; 
  isVisible: boolean; 
  className?: string; 
  delay?: number 
}> = ({ text, isVisible, className = "", delay = 0 }) => {
  // On découpe le texte en caractères, en préservant les espaces
  const characters = text.split('');

  return (
    <div className={`perspective-1000 inline-block ${className}`} aria-label={text}>
      {characters.map((char, index) => {
        if (char === ' ') return <span key={index}>&nbsp;</span>;

        // Génération de valeurs "aléatoires" déterministes basées sur l'index
        // pour créer l'effet d'éclatement géométrique
        const randomX = (index % 2 === 0 ? 1 : -1) * (20 + (index * 5) % 40);
        const randomY = (index % 3 === 0 ? -1 : 1) * (30 + (index * 7) % 50);
        const randomZ = (index % 2 === 0 ? -1 : 1) * (100 + (index * 10) % 200);
        const randomRotateX = (index * 25) % 360;
        const randomRotateY = (index * 15) % 360;

        return (
          <span
            key={index}
            className="inline-block backface-hidden will-change-transform"
            style={{
              transition: `all 1200ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
              transitionDelay: `${delay + (index * 30)}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? 'translate3d(0,0,0) rotate3d(0,0,0,0deg) scale(1)' 
                : `translate3d(${randomX}px, ${randomY}px, ${randomZ}px) rotateX(${randomRotateX}deg) rotateY(${randomRotateY}deg) scale(0.5)`,
              filter: isVisible ? 'blur(0px)' : 'blur(8px)'
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

const DynamicHero: React.FC<DynamicHeroProps> = ({ slides, interval = 6000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const { t } = useTranslation();
  const timeoutRef = useRef<number | null>(null);

  // Gestion du cycle d'animation
  useEffect(() => {
    // 1. Démarrer l'animation du texte après le montage
    const enterTimer = setTimeout(() => setIsTextVisible(true), 500);

    // 2. Configurer la boucle
    const loopTimer = setInterval(() => {
      // a. Cacher le texte (effet d'éclatement sortant)
      setIsTextVisible(false);

      // b. Changer l'image après que le texte ait commencé à disparaître
      timeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        // c. Réafficher le texte (effet de reconstitution entrant)
        // Petit délai pour laisser l'image s'installer
        setTimeout(() => setIsTextVisible(true), 200);
      }, 1000); // Attendre 1s pour l'animation de sortie du texte

    }, interval);

    return () => {
      clearTimeout(enterTimer);
      clearInterval(loopTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [slides.length, interval]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative h-full w-full overflow-hidden bg-stone-900">
      
      {/* --- Image Layer --- */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full"
          aria-hidden={index !== currentIndex}
        >
          {slide.image && (
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-[2000ms] ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                opacity: index === currentIndex ? 1 : 0,
                transform: index === currentIndex ? 'scale(1.05)' : 'scale(1.15)', // Zoom subtil moderne
              }}
            />
          )}
          {slide.video && (
            <video
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-all duration-[2000ms] ease-out"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform: index === currentIndex ? 'scale(1.05)' : 'scale(1.15)',
              }}
            />
          )}
        </div>
      ))}

      {/* --- Overlay Gradient --- */}
      {/* Modern gradient: darker at bottom for text readability, subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10 pointer-events-none" />

      {/* --- Text Layer --- */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          {currentSlide.subtitleFirst ? (
            <>
               <div className="mb-4 overflow-hidden">
                  <GeometricText 
                    text={t(currentSlide.subtitleKey)} 
                    isVisible={isTextVisible}
                    delay={0}
                    className="text-lg md:text-2xl font-light text-emerald-100 tracking-[0.2em] uppercase"
                  />
               </div>
               <div className="overflow-visible py-4">
                  <GeometricText 
                    text={t(currentSlide.titleKey)} 
                    isVisible={isTextVisible}
                    delay={300} // Le titre commence après le sous-titre
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl"
                  />
               </div>
            </>
          ) : (
            <>
               <div className="overflow-visible py-4 mb-2">
                  <GeometricText 
                    text={t(currentSlide.titleKey)} 
                    isVisible={isTextVisible}
                    delay={0}
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl"
                  />
               </div>
               <div className="overflow-hidden">
                  <GeometricText 
                    text={t(currentSlide.subtitleKey)} 
                    isVisible={isTextVisible}
                    delay={400}
                    className="text-lg md:text-2xl font-light text-emerald-100 tracking-[0.2em] uppercase"
                  />
               </div>
            </>
          )}
          
          {/* Decorative Geometric Line */}
          <div 
             className="w-24 h-1 bg-[#E88A45] mx-auto mt-8 rounded-full transition-all duration-1000 ease-geo-out"
             style={{
               width: isTextVisible ? '6rem' : '0rem',
               opacity: isTextVisible ? 1 : 0,
               transform: isTextVisible ? 'scaleX(1)' : 'scaleX(0)'
             }}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicHero;
