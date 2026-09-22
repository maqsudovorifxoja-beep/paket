import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('shifonur_lang') || 'uz';
  });

  const setLanguage = (lang) => {
    if (['uz', 'ru', 'en'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('shifonur_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const langDict = translations[language] || translations.uz;
    return langDict[key] || translations.uz[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
