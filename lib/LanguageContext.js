'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('nl');

  useEffect(() => {
    const saved = localStorage.getItem('carrio-lang');
    if (saved && translations[saved]) {
      setLang(saved);
    }
  }, []);

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('carrio-lang', newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
