"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Image from 'next/image';
import en from "../locales/en.json";
import es from "../locales/es.json";

type Language = "en" | "es";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  ToggleButton: () => ReactNode;
}

const translations: Record<Language, Record<string, string>> = { en, es };

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    setLanguage(storedLanguage as Language || "es");
  }, []);

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const translation = translations[language][key] || key;

    if (!variables) return translation;

    return Object.keys(variables).reduce(
      (result, variable) => result.replace(`{{${variable}}}`, String(variables[variable])),
      translation
    );
  };

  
  const setLanguageAndSave = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  
  const ToggleButton = () => {
    const toggleLanguage = () => setLanguageAndSave(language === "es" ? "en" : "es");

    return (
      <button
        onClick={toggleLanguage}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition w-fit"
        aria-label="Toggle Language"
      >
        <div className="h-6 w-6 relative">
        {language === "es" ? (
          <Image 
            src="/uk.png" 
            alt="English" 
            layout="fill" 
            objectFit="contain" 
          />
        ) : (
          <Image 
            src="/spain.png" 
            alt="Español" 
            layout="fill" 
            objectFit="contain" 
          />
        )}
      </div>


      </button>
    );
  };

  useEffect(() => {
    localStorage.setItem("language", language);
    
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndSave, t, ToggleButton }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
