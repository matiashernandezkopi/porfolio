"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";

type Language = "en" | "es";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  ToggleButton: () => ReactNode;
}

const translations: Record<Language, Record<string, string>> = { en, es };

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("es");

    const t = (key: string) => translations[language][key] || key;

    const ToggleButton = () => {
        const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

        return(<button
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
          aria-label="Toggle Dark Mode"
        >
          <div className="h-6 w-6">{language === "es" ? "en" : "es"}</div>
          
        </button>)
    }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, ToggleButton }}>
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
