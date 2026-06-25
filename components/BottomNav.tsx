
import React, { useState } from 'react';
import { Page } from '../types';
import { Icons } from '../constants/icons';
import { useTranslation } from '../contexts/LocalizationContext';

interface NavItemProps {
    page: Page;
    label: string;
    icon: keyof typeof Icons;
    isActive: boolean;
    onNavClick: (page: Page) => void;
    emailAddress?: string;
    className?: string;
}

interface NavItemData {
    page: Page;
    labelKey: string;
    icon: keyof typeof Icons;
}

// Items visible on the main bar (Set 1)
const primaryItems: NavItemData[] = [
    { page: Page.Rooms, labelKey: 'bottomNav.rooms', icon: 'Bed' },
    { page: Page.Restaurant, labelKey: 'bottomNav.restaurant', icon: 'Coffee' },
    { page: Page.Excursions, labelKey: 'bottomNav.excursions', icon: 'Footprints' },
];

// Items visible on the secondary bar (Set 2)
const secondaryItems: NavItemData[] = [
    { page: Page.Transfers, labelKey: 'bottomNav.transfers', icon: 'Car' },
    { page: Page.Contact, labelKey: 'bottomNav.contact', icon: 'Mail' },
];

const NavItem: React.FC<NavItemProps> = ({ page, label, icon, isActive, onNavClick, emailAddress, className }) => {
  const Icon = Icons[icon];
  const activeClasses = 'text-emerald-600 transform scale-110';
  const inactiveClasses = 'text-stone-500 group-hover:text-emerald-600';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (emailAddress) return;
    e.preventDefault();
    onNavClick(page);
  };

  const href = emailAddress ? `mailto:${emailAddress}` : `#${page.toLowerCase()}`;

  return (
    <a 
        href={href} 
        onClick={handleClick}
        className={`flex flex-col items-center justify-center space-y-1 group transition-all duration-300 w-16 ${className || ''}`}
        aria-current={isActive ? 'page' : undefined}
    >
      {/* Standardized Icon Container for Alignment: Matches h-9 (36px) of static buttons */}
      <div className="h-9 w-9 flex items-center justify-center">
         <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? activeClasses : inactiveClasses}`} />
      </div>
      <span className={`text-[10px] font-medium transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-emerald-600 font-bold' : 'text-stone-500'}`}>
        {label}
      </span>
    </a>
  );
};

interface BottomNavProps {
    activePage: Page;
    onNavClick: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavClick }) => {
  const { t } = useTranslation();
  const [showSecondary, setShowSecondary] = useState(false);

  const handleNavSelection = (page: Page) => {
      onNavClick(page);
      setShowSecondary(false); 
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#E8E4DC]/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-[50] xl:hidden pb-safe">
        <div className="flex items-center justify-between h-full max-w-xl mx-auto px-2 relative">
            
            {/* DYNAMIC SECTION: The first 3 slots morph between Primary and Secondary */}
            <div className="flex-1 relative h-full">
                
                {/* PRIMARY ITEMS CONTAINER */}
                <div 
                    className={`absolute inset-0 flex justify-around items-center transition-all duration-500 ease-in-out transform ${
                        !showSecondary 
                        ? 'opacity-100 translate-y-0 scale-100 z-10' 
                        : 'opacity-0 translate-y-4 scale-90 z-0 pointer-events-none'
                    }`}
                >
                    {primaryItems.map(item => (
                        <NavItem 
                            key={item.page} 
                            {...item} 
                            label={t(item.labelKey)} 
                            isActive={activePage === item.page} 
                            onNavClick={handleNavSelection} 
                        />
                    ))}
                </div>

                {/* SECONDARY ITEMS CONTAINER */}
                <div 
                    className={`absolute inset-0 flex justify-around items-center transition-all duration-500 ease-in-out transform ${
                        showSecondary 
                        ? 'opacity-100 translate-y-0 scale-100 z-10' 
                        : 'opacity-0 translate-y-4 scale-90 z-0 pointer-events-none'
                    }`}
                >
                    {secondaryItems.map(item => (
                        <NavItem
                            key={item.page}
                            {...item}
                            label={t(item.labelKey)}
                            isActive={activePage === item.page}
                            onNavClick={handleNavSelection}
                            emailAddress={item.page === Page.Contact ? t('footer.email') : undefined}
                        />
                    ))}
                </div>
            </div>

            {/* STATIC DIVIDER */}
            <div className="h-10 w-px bg-stone-300 mx-1"></div>

            {/* STATIC SECTION: Toggle & Book (Order Swapped) */}
            <div className="flex items-center space-x-1 pl-1 pr-2">
                 {/* Toggle Button (More / Back) */}
                <button
                    onClick={() => setShowSecondary(!showSecondary)}
                    className="flex flex-col items-center justify-center space-y-1 group w-14 transition-colors"
                >
                     <div className={`h-9 w-9 flex items-center justify-center rounded-full transition-all duration-300 ${showSecondary ? 'bg-stone-300 rotate-180' : 'bg-transparent rotate-0'}`}>
                        {showSecondary ? (
                            <Icons.X className="w-6 h-6 text-stone-700" />
                        ) : (
                            <Icons.MoreHorizontal className="w-6 h-6 text-stone-500 group-hover:text-emerald-600" />
                        )}
                     </div>
                     <span className={`text-[10px] font-medium transition-colors ${showSecondary ? 'text-stone-800' : 'text-stone-500'}`}>
                        {showSecondary ? 'Back' : t('bottomNav.more')}
                     </span>
                </button>

                 {/* Book Button */}
                 <a 
                    href="https://book-directonline.com/properties/gardeninnrestaurant-bukitlawang?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=IDR&checkInDate=2025-11-10&checkOutDate=2025-11-11&trackPage=no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center space-y-1 group w-16"
                >
                    <div className="h-9 w-9 flex items-center justify-center bg-[#E88A45] rounded-full shadow-sm group-hover:bg-[#d67d3c] transition-colors">
                         <Icons.CalendarCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E88A45] group-hover:text-[#d67d3c]">{t('bottomNav.book')}</span>
                </a>
            </div>
        </div>
    </nav>
  );
};

export default BottomNav;
