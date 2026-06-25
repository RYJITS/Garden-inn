

import React, { useState, useMemo } from 'react';
import { useTranslation } from '../contexts/LocalizationContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { getTranslatedPrivateTransfers, getTranslatedBusTransfers } from '../constants/translatedData';
import { Icons } from '../constants/icons';

const TransfersPage: React.FC = () => {
    const { t } = useTranslation();
    const { formatPrice } = useCurrency();
    const privateTransfers = getTranslatedPrivateTransfers(t);
    const busTransfers = getTranslatedBusTransfers(t);
    
    // Default to empty string to force user selection
    const [selectedDestination, setSelectedDestination] = useState('');

    const destinationOptions = [
        { value: 'medan', labelKey: 'transfers.destinations.medan', mapQuery: 'Medan, North Sumatra, Indonesia' },
        { value: 'berastagi', labelKey: 'transfers.destinations.berastagi', mapQuery: 'Berastagi, North Sumatra, Indonesia' },
        { value: 'lakeToba', labelKey: 'transfers.destinations.lakeToba', mapQuery: 'Parapat, North Sumatra, Indonesia' },
    ];

    const filteredPrivateTransfers = useMemo(() => {
        if (!selectedDestination) return [];
        return privateTransfers.filter(t => t.destinationCode === selectedDestination);
    }, [privateTransfers, selectedDestination]);

    const filteredBusTransfers = useMemo(() => {
         if (!selectedDestination) return [];
         return busTransfers.filter(t => t.destinationCode === selectedDestination);
    }, [busTransfers, selectedDestination]);

    // Helper to get map URL
    const getMapUrl = () => {
        // GARDEN INN GPS COORDINATES (Start Point)
        // Using coordinates is the most reliable way to lock the start pin exactly on the hotel
        const startCoords = "3.5495271,98.117457";

        if (!selectedDestination) {
             // Default view: Show pin on Garden Inn
            return `https://maps.google.com/maps?q=Garden+Inn+Bukit+Lawang&z=14&output=embed`;
        }
        
        const destOption = destinationOptions.find(opt => opt.value === selectedDestination);
        const destQuery = destOption ? encodeURIComponent(destOption.mapQuery) : '';
        
        // Route View: saddr (Start) -> daddr (Destination)
        // Using coordinates for start ensures it always starts from Garden Inn
        return `https://maps.google.com/maps?saddr=${startCoords}&daddr=${destQuery}&output=embed`;
    };

    return (
        <div className="py-12 md:py-20 bg-[#F2EFE9]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('transfers.title')}</h1>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Dynamic Google Map Section */}
                    <div className="h-64 md:h-96 w-full bg-stone-200">
                        <iframe 
                            src={getMapUrl()} 
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Route Map"
                        ></iframe>
                    </div>

                    <div className={`p-6 md:p-8 bg-[#FDFBF7] ${selectedDestination !== '' ? 'border-b border-stone-200' : ''}`}>
                        <label htmlFor="destination-select" className="block text-lg font-bold text-emerald-800 mb-3">
                            {t('transfers.selectDest')}
                        </label>
                        <select 
                            id="destination-select"
                            value={selectedDestination}
                            onChange={(e) => setSelectedDestination(e.target.value)}
                            className="w-full md:w-auto min-w-[300px] px-4 py-3 rounded-lg border border-stone-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 bg-white text-stone-800 font-medium"
                        >
                            <option value="" disabled>{t('transfers.destinations.placeholder')}</option>
                            {destinationOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {t(option.labelKey)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedDestination !== '' && (
                        <div className="p-6 md:p-8 space-y-8">
                            {/* Private Transfers List - Compact Single Line Format */}
                            {filteredPrivateTransfers.length > 0 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-emerald-800 mb-4 border-b border-[#E88A45] pb-2 inline-block">
                                        {t('transfers.private.title')}
                                    </h3>
                                    <p className="text-sm text-stone-500 mb-4 italic">{t('transfers.pricesAre')} {t('transfers.private.unit')}</p>
                                    <div className="space-y-3">
                                        {filteredPrivateTransfers.map((transfer, index) => (
                                            <div key={index} className="bg-[#F2EFE9] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between group hover:bg-[#E8E4DC] transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-center text-stone-700 text-sm md:text-base gap-1 md:gap-0">
                                                    {/* Description / Route */}
                                                    <span className="font-bold text-stone-800">{transfer.route}</span>
                                                    
                                                    {/* Separator & Details (Hidden on mobile, shown as list or inline on desktop) */}
                                                    <span className="hidden md:inline mx-3 text-stone-400">•</span>
                                                    <span className="flex items-center mt-1 md:mt-0">
                                                        <Icons.Clock className="w-4 h-4 mr-1 text-emerald-600" />
                                                        {transfer.duration}
                                                    </span>
                                                    
                                                    <span className="hidden md:inline mx-3 text-stone-400">•</span>
                                                    <span className="flex items-center mt-1 md:mt-0">
                                                        <Icons.Car className="w-4 h-4 mr-1 text-emerald-600" />
                                                        {transfer.vehicle}
                                                    </span>
                                                    
                                                    <span className="hidden md:inline mx-3 text-stone-400">•</span>
                                                    <span className="flex items-center mt-1 md:mt-0">
                                                        <Icons.Users className="w-4 h-4 mr-1 text-emerald-600" />
                                                        Max {transfer.maxPersons}
                                                    </span>
                                                </div>
                                                
                                                {/* Price: Formatted */}
                                                <div className="mt-3 md:mt-0 text-emerald-700 text-base whitespace-nowrap font-semibold">
                                                    {formatPrice(transfer.price)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tourist Bus List - Compact Single Line Format */}
                            {filteredBusTransfers.length > 0 && (
                                <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                                    <h3 className="text-xl font-bold text-emerald-800 mb-4 border-b border-[#E88A45] pb-2 inline-block">
                                        {t('transfers.bus.title')}
                                    </h3>
                                    <p className="text-sm text-stone-500 mb-4 italic">{t('transfers.pricesAre')} {t('transfers.bus.unit')}</p>
                                    <div className="space-y-3">
                                        {filteredBusTransfers.map((transfer, index) => (
                                            <div key={index} className="bg-[#F2EFE9] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between group hover:bg-[#E8E4DC] transition-colors">
                                                 <div className="flex flex-col md:flex-row md:items-center text-stone-700 text-sm md:text-base gap-1 md:gap-0">
                                                    <span className="font-bold text-stone-800">{transfer.route}</span>
                                                    
                                                    <span className="hidden md:inline mx-3 text-stone-400">•</span>
                                                    <span className="flex items-center mt-1 md:mt-0">
                                                        Departs: {transfer.departure}
                                                    </span>
                                                </div>
                                                {/* Price: Formatted */}
                                                <div className="mt-3 md:mt-0 text-emerald-700 text-base whitespace-nowrap font-semibold">
                                                    {formatPrice(transfer.price)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {filteredPrivateTransfers.length === 0 && filteredBusTransfers.length === 0 && (
                                <div className="text-center py-8 text-stone-500">
                                    <p>No transfer options available for this selection.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransfersPage;