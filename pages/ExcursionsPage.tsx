
import React, { useState } from 'react';
import { OtherExcursion } from '../types';
import ImageCarousel from '../components/ImageCarousel';
import Modal from '../components/Modal';
import { useTranslation } from '../contexts/LocalizationContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { getTranslatedJungleTreks, getTranslatedOtherExcursions } from '../constants/translatedData';
import { APP_VERSION } from '../constants/version';

const trekImages = [
    `/images/jungle-trek/1.webp?v=${APP_VERSION}`,
    `/images/jungle-trek/2.webp?v=${APP_VERSION}`,
    `/images/jungle-trek/3.webp?v=${APP_VERSION}`,
];

const ExcursionsPage: React.FC = () => {
    const { t } = useTranslation();
    const { convertAndFormat } = useCurrency();
    const [selectedExcursion, setSelectedExcursion] = useState<OtherExcursion | null>(null);
    
    const jungleTreks = getTranslatedJungleTreks(t);
    const otherExcursions = getTranslatedOtherExcursions(t);

    return (
        <div className="py-12 md:py-20 bg-[#FDFBF7]">
            <div className="container mx-auto px-4">
                
                {/* Jungle Trekking Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('excursions.jungleTreks.title')}</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        {/* Increased height for desktop version (md:h-[500px]) */}
                        <div className="lg:col-span-3 h-64 md:h-[500px] rounded-xl shadow-lg overflow-hidden">
                           <ImageCarousel images={trekImages} autoPlay />
                        </div>

                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t('excursions.jungleTreks.optionsTitle')}</h3>
                            <div className="space-y-3">
                                {jungleTreks.map((trek, index) => (
                                    <div key={index} className="p-3 bg-[#F2EFE9] rounded-lg">
                                        <p className="font-semibold text-stone-800">{trek.duration}</p>
                                        <p className="text-sm text-stone-600">{t('excursions.jungleTreks.mealsLabel')} {trek.meals}</p>
                                        <p className="text-sm font-bold text-emerald-700 mt-1">{convertAndFormat(trek.price)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                     <div className="mt-8 border-2 border-[#E88A45] p-6 rounded-xl text-center">
                        <h4 className="font-bold text-stone-800 mb-2">{t('excursions.jungleTreks.info.title')}</h4>
                        {/* Use dangerouslySetInnerHTML to render bold tags and line breaks from translation files */}
                        <div className="text-sm text-stone-700 max-w-3xl mx-auto">
                            <p dangerouslySetInnerHTML={{ __html: t('excursions.jungleTreks.info.description') }} />
                            <div className="mt-4">
                                <strong className="block mb-1">{t('excursions.jungleTreks.info.whatToBring')}</strong>
                                <p dangerouslySetInnerHTML={{ __html: t('excursions.jungleTreks.info.whatToBringDetails') }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Excursions (Activities) Section */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('excursions.other.title')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherExcursions.map((excursion, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer flex flex-col" onClick={() => setSelectedExcursion(excursion)}>
                                <div className="h-48 overflow-hidden">
                                    <img src={excursion.image} alt={excursion.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h3 className="text-xl font-bold text-emerald-800">{excursion.name}</h3>
                                        <span className="text-sm font-semibold text-emerald-600 group-hover:underline whitespace-nowrap ml-2">{t('excursions.other.learnMore')} →</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={!!selectedExcursion} onClose={() => setSelectedExcursion(null)} title={selectedExcursion?.name || ''}>
                {selectedExcursion && (
                    <div className="space-y-4">
                        <p className="text-stone-700">{selectedExcursion.description}</p>
                        <ul className="space-y-2 pt-4 border-t border-stone-200">
                            {selectedExcursion.details.map((detail, index) => (
                                <li key={index} className="text-sm text-stone-600 bg-[#F2EFE9] p-3 rounded-md">
                                    {convertAndFormat(detail)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ExcursionsPage;
