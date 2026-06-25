
import React from 'react';
import { Page } from '../types';
import { logEvent } from '../services/chichiLog';
import { useTranslation } from '../contexts/LocalizationContext';
import { useCurrency, Currency } from '../contexts/CurrencyContext';
import { Icons } from '../constants/icons';

interface HeaderProps {
  onNavClick: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const { language, setLanguage, t } = useTranslation();
  const { currency, setCurrency } = useCurrency();

  const handleLangSwitch = (lang: string) => {
    logEvent('lang-switch', { lang });
    setLanguage(lang);
  };

  const navItems = [
    // Removed Home as per request
    { page: Page.Rooms, labelKey: 'bottomNav.rooms', icon: 'Bed' as keyof typeof Icons },
    { page: Page.Restaurant, labelKey: 'bottomNav.restaurant', icon: 'Coffee' as keyof typeof Icons },
    { page: Page.Excursions, labelKey: 'bottomNav.excursions', icon: 'Footprints' as keyof typeof Icons },
    { page: Page.Transfers, labelKey: 'bottomNav.transfers', icon: 'Car' as keyof typeof Icons },
    { page: Page.Contact, labelKey: 'bottomNav.contact', icon: 'Mail' as keyof typeof Icons },
  ];

  return (
    // Darker sand background color: #E8E4DC to distinguish from white
    <header className="bg-[#E8E4DC]/95 backdrop-blur-md shadow-sm z-[50] sticky top-0 border-b border-stone-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Updated: Title is now larger, never truncates, and never shrinks. 
              If screen is too small, the nav items will hide (via xl:flex) instead of crushing the title. */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); onNavClick(Page.Home); }} 
            className="text-lg md:text-xl lg:text-2xl font-bold text-emerald-800 flex-shrink-0 whitespace-nowrap mr-4"
          >
            Garden Inn & Restaurant
          </a>
          
          <div className="flex items-center flex-shrink-0">
             {/* Desktop Navigation - Changed from lg:flex to xl:flex (Extra Large screens only) to prevent overlap on laptops */}
             <nav className="hidden xl:flex space-x-1 xl:space-x-2 mr-6 items-center">
               {navItems.map((item) => {
                 const Icon = Icons[item.icon];
                 
                 // Special handling for Contact to open email directly
                 if (item.page === Page.Contact) {
                   return (
                     <a
                       key={item.page}
                       href={`mailto:${t('footer.email')}`}
                       className="flex items-center px-3 py-2 rounded-full text-stone-600 hover:text-emerald-800 hover:bg-[#d6d3cc] transition-all duration-200 group"
                     >
                       <Icon className="w-5 h-5 mr-2 text-emerald-600 group-hover:text-emerald-800 transition-colors" />
                       <span className="font-medium text-sm xl:text-base">{t(item.labelKey)}</span>
                     </a>
                   );
                 }

                 return (
                   <button
                     key={item.page}
                     onClick={() => onNavClick(item.page)}
                     className="flex items-center px-3 py-2 rounded-full text-stone-600 hover:text-emerald-800 hover:bg-[#d6d3cc] transition-all duration-200 group"
                   >
                     <Icon className="w-5 h-5 mr-2 text-emerald-600 group-hover:text-emerald-800 transition-colors" />
                     <span className="font-medium text-sm xl:text-base">{t(item.labelKey)}</span>
                   </button>
                 );
               })}
               
               {/* Booking Button (Replaces Home) */}
               <a 
                  href="https://book-directonline.com/properties/gardeninnrestaurant-bukitlawang?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=IDR&checkInDate=2025-11-10&checkOutDate=2025-11-11&trackPage=no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 rounded-full bg-[#E88A45] text-white hover:bg-[#d67d3c] transition-colors shadow-sm ml-2"
               >
                 <Icons.CalendarCheck className="w-5 h-5 mr-2" />
                 <span className="font-bold text-sm xl:text-base">{t('bottomNav.book')}</span>
               </a>
             </nav>

            <div className="flex items-center pl-0 xl:pl-4 xl:border-l xl:border-stone-300">
               {/* Currency Selector */}
               <select 
                 value={currency} 
                 onChange={(e) => setCurrency(e.target.value as Currency)}
                 className="bg-transparent text-sm font-semibold text-emerald-800 border-none focus:ring-0 cursor-pointer mr-3 py-1 outline-none appearance-none hover:text-emerald-600 transition-colors"
                 style={{textAlignLast: 'right'}}
               >
                 <option value="IDR">IDR</option>
                 <option value="EUR">EUR</option>
                 <option value="USD">USD</option>
                 <option value="GBP">GBP</option>
                 <option value="AUD">AUD</option>
                 <option value="SGD">SGD</option>
                 <option value="CHF">CHF</option>
               </select>

               {/* Language Flags */}
               <div className="flex space-x-3 items-center">
                 <button
                   onClick={() => handleLangSwitch('fr')}
                   title="Français"
                   className={`relative w-8 h-5 overflow-hidden rounded-sm transition-all duration-300 transform hover:scale-110 ${language === 'fr' ? 'ring-2 ring-emerald-600 shadow-md scale-105' : 'opacity-70 hover:opacity-100 shadow-sm'}`}
                 >
                   <img 
                     src="https://flagcdn.com/w80/fr.png" 
                     alt="Français" 
                     className="w-full h-full object-cover"
                   />
                 </button>
                 <button
                   onClick={() => handleLangSwitch('en')}
                   title="English"
                   className={`relative w-8 h-5 overflow-hidden rounded-sm transition-all duration-300 transform hover:scale-110 ${language === 'en' ? 'ring-2 ring-emerald-600 shadow-md scale-105' : 'opacity-70 hover:opacity-100 shadow-sm'}`}
                 >
                   <img 
                     src="https://flagcdn.com/w80/gb.png" 
                     alt="English" 
                     className="w-full h-full object-cover"
                   />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
