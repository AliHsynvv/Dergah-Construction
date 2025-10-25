"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { az, Translations } from '@/locales/az';
import { en } from '@/locales/en';

type Language = 'az' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  az,
  en,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('az');

  // Load language preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'az' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}


