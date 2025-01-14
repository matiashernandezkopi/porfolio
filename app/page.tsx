"use client";

import { useEffect, useState } from "react";
import Section from "./components/home-section";
import { useLanguage } from "./context/LanguageContext";
import { ThemeButton } from "./components/theme-button";



export default function Home() {
  const [mounted, setMounted] = useState(false);

  const { t, ToggleButton } = useLanguage();

  const games = [
    {
      title: t("blueVsRedTitle"),
      description:
        t("blueVsRedDescription"),
      link: "/games/BlueVsRed",
    },
    {
      title: t("higherOrLowerTitle"),
      description:
        t("higherOrLowerDescription"),
      link: "/games/HigerOrLower",
    },
  ];

  const code = [
    {
      title: "Firebase",
      description:
        t("firebaseDescription"),
      link: "/code/Firebase",
    },
  ]

  const examples = [
    {
      title: "Fashion Ecommerce Store",
      description:
        t("fashionDescription"),
      link: "/examples/Fashion-ecommerce-store",
    },
  ]


  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

 

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white py-6 px-10 shadow-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-wide">Chimbi Proyects</h1>
          <ThemeButton/>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 py-10 px-6">
        <ToggleButton/>
        <Section title={t("availableGames")} proyects={games} />
        <Section title={t("availableCode")} proyects={code} subtitle={t("codeDescription")} />
        <Section title={t("availableCode")} proyects={examples} subtitle={t("codeDescription")} />
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 dark:bg-blue-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            &copy; {t("footerText")}
          </p>
        </div>
      </footer>
    </div>
  );
}
