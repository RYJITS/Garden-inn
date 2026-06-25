

import React from 'react';
import { useTranslation } from '../contexts/LocalizationContext';
import { Icons } from '../constants/icons';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 md:py-20 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('contactPage.title')}</h1>
            </div>

            <div className="max-w-2xl mx-auto bg-[#F2EFE9] rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12 text-center">
                    <p className="text-lg text-stone-600 mb-8">
                        {t('contactPage.description')}
                    </p>

                    <div className="flex flex-col items-center space-y-6">
                        <div className="p-6 bg-white rounded-full shadow-md">
                            <Icons.Mail className="w-12 h-12 text-[#E88A45]" />
                        </div>
                        
                        <a 
                            href={`mailto:${t('footer.email')}`}
                            className="inline-flex items-center px-8 py-4 bg-[#E88A45] text-white text-lg font-bold rounded-full shadow-md hover:bg-[#d67d3c] hover:shadow-lg transition-all duration-300"
                        >
                            {t('footer.email')}
                        </a>

                        <p className="text-sm text-stone-500 mt-4">
                            {t('contactPage.emailHint')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;