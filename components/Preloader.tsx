
import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a smooth progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const handleLoad = () => {
      // Small delay to ensure the animation finishes smoothly
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] transition-opacity duration-700 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative overflow-hidden mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-emerald-800 tracking-tighter uppercase italic">
          Garden-inn
        </h1>
        {/* Fill effect animation */}
        <div 
          className="absolute inset-0 bg-emerald-800 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${progress - 100}%)` }}
        />
        <h1 className="absolute inset-0 text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic pointer-events-none select-none">
          Garden-inn
        </h1>
      </div>

      <div className="w-64 h-[2px] bg-stone-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-stone-500 text-sm font-medium tracking-widest uppercase animate-pulse">
        Chargement... {progress}%
      </p>
    </div>
  );
};

export default Preloader;
