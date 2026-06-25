
import React, { useState } from 'react';
import { Icons } from '../constants/icons';
import { useTranslation } from '../contexts/LocalizationContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { getTranslatedPackagesData } from '../constants/translatedData';
import { Package } from '../types';

const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => {
  const { t } = useTranslation();
  const { convertAndFormat } = useCurrency();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl h-full">
      <div className="h-56 overflow-hidden relative">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4">{pkg.name}</h3>
        
        <div className="mb-6 flex-grow">
          <h4 className="font-semibold text-stone-700 mb-2">{t('packages.includedTitle')}</h4>
          <ul className="space-y-2 text-sm text-stone-600">
            {pkg.inclusions.map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <Icons.Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"/>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-stone-200">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center text-left focus:outline-none group"
          >
            <h4 className="font-semibold text-stone-700 group-hover:text-emerald-700 transition-colors">
                {t('packages.priceTitle')}
            </h4>
            <Icons.ChevronDown 
                className={`w-5 h-5 text-emerald-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
            <div className="overflow-hidden">
                <ul className="bg-[#F2EFE9] rounded-lg p-4 space-y-2 text-sm text-emerald-800 font-medium border border-emerald-100">
                    {pkg.prices.map((price, i) => (
                        <li key={i} className="flex items-start">
                            <span className="mr-2 text-emerald-500">•</span>
                            {convertAndFormat(price)}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PackagesPage: React.FC = () => {
  const { t } = useTranslation();
  const packagesData = getTranslatedPackagesData(t);

  return (
    <div className="py-12 md:py-20 bg-[#FDFBF7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('packages.title')}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
