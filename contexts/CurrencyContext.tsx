

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from './LocalizationContext';

export type Currency = 'IDR' | 'EUR' | 'USD' | 'GBP' | 'AUD' | 'SGD' | 'CHF';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convertAndFormat: (text: string) => string;
  formatPrice: (amount: string | number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'IDR',
  setCurrency: () => {},
  convertAndFormat: (t) => t,
  formatPrice: (a) => String(a),
});

// Default/Fallback exchange rates (Base IDR)
// Used immediately on load or if API fails
const DEFAULT_RATES: Record<Currency, number> = {
  IDR: 1,
  EUR: 17000,
  USD: 16000,
  GBP: 20000,
  AUD: 10500,
  SGD: 12000,
  CHF: 18000
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('IDR');
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>(DEFAULT_RATES);
  const { language } = useTranslation();

  // Load saved currency preference
  useEffect(() => {
    const saved = localStorage.getItem('currency') as Currency;
    if (saved && DEFAULT_RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  // Fetch dynamic rates from Frankfurter API
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Frankfurter uses EUR as default base. 
        // We fetch rates for IDR and our other target currencies.
        const targets = ['IDR', 'USD', 'GBP', 'AUD', 'SGD', 'CHF'].join(',');
        const response = await fetch(`https://api.frankfurter.app/latest?to=${targets}`);
        
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        // The API returns rates relative to 1 EUR.
        // Example: { rates: { IDR: 17000, USD: 1.1, ... } }
        const apiRates = data.rates;
        const idrRate = apiRates.IDR; 

        if (!idrRate) return; // Safety check

        const newRates: Record<Currency, number> = { ...DEFAULT_RATES };

        // Calculate rate: How many IDR = 1 Unit of Currency
        // Formula: Rate(Curr) = (1 EUR in IDR) / (1 EUR in Curr)
        
        newRates['IDR'] = 1;
        newRates['EUR'] = idrRate; // 1 EUR = idrRate IDR
        
        const others: Currency[] = ['USD', 'GBP', 'AUD', 'SGD', 'CHF'];
        others.forEach(curr => {
            if (apiRates[curr]) {
                newRates[curr] = idrRate / apiRates[curr];
            }
        });

        setExchangeRates(newRates);
        console.log('Exchange rates updated from API:', newRates);

      } catch (error) {
        console.error('Failed to fetch dynamic exchange rates, using defaults:', error);
        // We stay with DEFAULT_RATES which is already set in state
      }
    };

    fetchRates();
  }, []);

  const setCurrency = (c: Currency) => {
    localStorage.setItem('currency', c);
    setCurrencyState(c);
  };

  const parseIDR = (input: string | number): number => {
    if (typeof input === 'number') return input;
    // Remove non-digits (handle "350.000", "1,200,000" or "350 000")
    return parseInt(input.replace(/\D/g, ''), 10);
  };

  const getLocale = () => {
      switch(language) {
          case 'fr': return 'fr-FR';
          default: return 'en-US';
      }
  };

  const formatPrice = useCallback((amount: string | number) => {
    const val = parseIDR(amount);
    if (isNaN(val)) return String(amount);

    if (currency === 'IDR') {
      // Use 'id-ID' locale which formats with dots (e.g. 1.000.000)
      // We manually prefix with IDR to avoid 'Rp' or other symbols
      return `IDR ${val.toLocaleString('id-ID')}`;
    }

    // Round up (ceiling) for foreign currencies using dynamic rates
    const converted = Math.ceil(val / exchangeRates[currency]);
    return new Intl.NumberFormat(getLocale(), { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(converted);
  }, [currency, language, exchangeRates]);

  const convertAndFormat = useCallback((text: string) => {
    if (!text) return '';
    if (currency === 'IDR') return text;

    // Regex to find patterns like:
    // 1. "IDR 325.000" (Prefix - English style)
    // 2. "325 000 IDR" (Suffix - French style)
    // Matches digits separated by dots, commas or spaces.
    const regex = /(?:IDR\s*(\d+(?:[.,\s]\d+)*)|(\d+(?:[.,\s]\d+)*)\s*IDR)/g;

    return text.replace(regex, (match, prefixNum, suffixNum) => {
      const numberPart = prefixNum || suffixNum;
      const val = parseIDR(numberPart);
      if (isNaN(val)) return match;

      // Round up (ceiling) for foreign currencies using dynamic rates
      const converted = Math.ceil(val / exchangeRates[currency]);
      return new Intl.NumberFormat(getLocale(), { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(converted);
    });
  }, [currency, language, exchangeRates]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertAndFormat, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);