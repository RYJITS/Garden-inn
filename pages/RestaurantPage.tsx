
import React from 'react';
import { useTranslation } from '../contexts/LocalizationContext';
import { APP_VERSION } from '../constants/version';

const RestaurantPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 md:py-20 bg-[#F2EFE9]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('restaurantPage.title')}</h1>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="md:flex">
                     <div className="md:w-1/2">
                         <img 
                            src={`/images/restaurant/main.webp?v=${APP_VERSION}`} 
                            alt="Garden Inn Restaurant" 
                            className="h-64 md:h-full w-full object-cover"
                         />
                     </div>
                     <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        <div className="mb-6">
                            {/* Orange framed box for description */}
                            <div className="border-2 border-[#E88A45] p-6 rounded-xl bg-[#FDFBF7]/50 shadow-sm">
                                <p 
                                    className="text-stone-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: t('restaurantPage.description') }}
                                />
                            </div>
                        </div>
                        
                        <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8E4DC] flex items-center justify-center md:justify-start">
                             <span className="font-semibold text-emerald-800">{t('restaurantPage.hours')}</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RestaurantPage;