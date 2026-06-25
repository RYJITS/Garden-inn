
import React, { useState } from 'react';
import { Room } from '../types';
import { Icons } from '../constants/icons';
import ImageCarousel from '../components/ImageCarousel';
import Modal from '../components/Modal';
import { useTranslation } from '../contexts/LocalizationContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { getTranslatedRoomsData } from '../constants/translatedData';

const RoomCard: React.FC<{ room: Room; onViewDetails: () => void; className?: string }> = ({ room, onViewDetails, className = "" }) => {
    const { t } = useTranslation();
    const { convertAndFormat } = useCurrency();

    return (
        <div 
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col group ${className}`}
        >
            {/* Image Section - Increased Height for Carousel - No Click Event here */}
            <div className="relative w-full h-72 overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <ImageCarousel images={room.images} />
                </div>
            </div>
            
            {/* Footer Section - Title, Book Button, and Features with Text - Click Event added here */}
            <div 
                className="p-4 bg-white border-t border-stone-100 flex flex-col gap-3 cursor-pointer"
                onClick={onViewDetails}
                role="button"
                aria-haspopup="dialog"
                aria-controls={`details-modal-${room.name.replace(/\s+/g, '-')}`}
            >
                {/* Top Row: Title/Price and Book Button */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                         <h3 className="text-lg font-bold text-emerald-800 leading-none">{room.name}</h3>
                         <span className="text-xs text-emerald-600 font-medium">{convertAndFormat(room.price)}</span>
                    </div>
                    <a 
                        href="https://book-directonline.com/properties/gardeninnrestaurant-bukitlawang?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=IDR&checkInDate=2025-11-10&checkOutDate=2025-11-11&trackPage=no"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center bg-[#E88A45] text-white hover:bg-[#d67d3c] font-medium py-1.5 px-4 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-sm flex-shrink-0 ml-2"
                        title={t('roomsPage.bookNow')}
                        aria-label={`${t('roomsPage.bookNow')} ${room.name}`}
                    >
                        <Icons.CalendarCheck className="w-4 h-4 mr-1.5" />
                        {t('roomsPage.bookBtn')}
                    </a>
                </div>

                {/* Bottom Row: Features with small text */}
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {room.features.map((feature, index) => {
                        const Icon = Icons[feature.icon];
                        return (
                            <div key={index} className="flex items-center text-stone-600">
                                <Icon className="w-4 h-4 mr-1.5 text-emerald-600 flex-shrink-0"/>
                                <span className="text-xs font-medium leading-tight">{feature.text}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const RoomsPage: React.FC = () => {
  const { t } = useTranslation();
  const roomsData = getTranslatedRoomsData(t);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="py-12 md:py-20 bg-[#F2EFE9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('roomsPage.title')}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {roomsData.map((room, index) => (
            <RoomCard key={room.name} room={room} onViewDetails={() => setSelectedRoom(room)} className={index === 2 ? "lg:col-span-2" : ""} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        title={selectedRoom?.name || ''}
      >
        {selectedRoom && (
            <div id={`details-modal-${selectedRoom.name.replace(/\s+/g, '-')}`}>
                {selectedRoom.details.map((category, catIndex) => (
                <div key={catIndex} className="mb-4">
                    <h4 className="font-semibold text-stone-700 mb-2">{category.category}</h4>
                    <ul className="space-y-1 text-sm text-stone-600">
                        {category.items.map((item, itemIndex) => {
                            const Icon = Icons[item.icon];
                            return (
                                <li key={itemIndex} className="flex items-center space-x-3">
                                    <Icon className="w-4 h-4 text-emerald-500" />
                                    <span>{item.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                ))}
            </div>
        )}
      </Modal>
    </div>
  );
};

export default RoomsPage;
