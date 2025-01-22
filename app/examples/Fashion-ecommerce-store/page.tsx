'use client'
import { useLanguage } from "@/app/context/LanguageContext";
import Image from 'next/image';
import HoverImage from "./clothe";

export const batmanMan = {
  gender: "man",
  name: "Batman",
  price: 20,
  colors: {
    clasic: [
      "/batman/batman-front.webp",
      "/batman/batman-side.webp",
      "/batman/batman-back.webp",
    ],
    black: [
      "/batman/batman-black-front.webp",
      "/batman/batman-black-back.webp",
    ],
    blackRed: [
      "/batman/batman-blackRed-front.webp",
      "/batman/batman-blackRed-back.webp",
    ],
    blueWhite: [
      "/batman/batman-blueWhite-front.webp",
    ],
    whiteBlack: [
      "/batman/batman-whiteBlack-front.webp"
    ]
  }
}

function Page() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Barra superior */}
      <div className="bg-gray-800 text-white text-sm py-2 px-4 text-center">
        <p>{t("freeShipping")} $100</p>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 dark:text-white">
            Chimbi Fashion
          </h1>
          <nav className="flex space-x-6">
            <a href="#home" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("home")}
            </a>
            <a href="#about" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("about")}
            </a>
            <a href="#shop" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("shop")}
            </a>
            <a href="#contact" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("contact")}
            </a>
          </nav>
          <button className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
            {t("shopNow")}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 py-10 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section id="home" className="text-center py-20">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white leading-tight">
            {t("welcomeTitle")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            {t("welcomeSubtitle")}
          </p>
          <button className="mt-6 bg-gray-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
            {t("discoverCollection")}
          </button>
        </section>

        {/* Productos Destacados */}
        <section id="shop" className="py-16">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            {t("featuredProducts")}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(batmanMan.colors).map(([color, images]) => (
              <div key={color} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition">
                <HoverImage images={images} />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{`${batmanMan.name} - ${color}`}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">${batmanMan.price}</p>
                  <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
                    {t("buyNow")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Chimbi Fashion</h4>
            <p className="text-sm text-gray-400">
              {t("footerAbout")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("customerService")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">{t("faq")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t("returns")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t("shippingInfo")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("aboutUs")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">{t("ourStory")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t("sustainability")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t("followUs")}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
