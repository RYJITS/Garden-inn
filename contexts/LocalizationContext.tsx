import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Define the shape of the context
interface LocalizationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  isLoaded: boolean;
}

// Create the context with a default value
const LocalizationContext = createContext<LocalizationContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLoaded: false,
});

// Create a provider component
export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => localStorage.getItem('language') || 'en');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoaded(false);
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
            console.warn(`Translation file for ${language} not found, falling back to English.`);
            const fallbackResponse = await fetch(`/locales/en.json`);
            const data = await fallbackResponse.json();
            setTranslations(data);
        } else {
            const data = await response.json();
            setTranslations(data);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Load english as a fallback on error
         try {
            const fallbackResponse = await fetch(`/locales/en.json`);
            const data = await fallbackResponse.json();
            setTranslations(data);
        } catch (fallbackError) {
            console.error('Failed to load fallback English translations:', fallbackError);
        }
      } finally {
          setIsLoaded(true);
      }
    };

    loadTranslations();
  }, [language]);
  
  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return the key if not found
      }
    }
    
    let translatedString = String(result);

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
          translatedString = translatedString.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }

    return translatedString;
  }, [translations]);

  const value = { language, setLanguage, t, isLoaded };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Create a custom hook for easy consumption of the context
export const useTranslation = () => useContext(LocalizationContext);