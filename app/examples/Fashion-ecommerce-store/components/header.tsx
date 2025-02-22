import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md h-32">
      <div className="relative h-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
          <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 dark:text-white">
            Chimbi Fashion
          </h1>
          <nav className="flex items-center space-x-6 h-full">
            <Link href="/examples/Fashion-ecommerce-store" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("home")}
            </Link>
            <Link href="/examples/Fashion-ecommerce-store/about" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("about")}
            </Link>
            <div className="relative group">
              <Link href="/examples/Fashion-ecommerce-store/shop" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                {t("shop")}
              </Link>
              <div className="hidden group-hover:block absolute top-full right-0 bg-white dark:bg-gray-700 shadow-lg z-40 p-4 min-w-[350px] w-fit h-fit">
                <button className="block text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 rounded-md">
                  Women's Fashion
                </button>
                <button className="block text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 rounded-md">
                  Men's Fashion
                </button>
                <button className="block text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 rounded-md">
                  Accessories
                </button>
                <button className="block text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 rounded-md">
                  Sale Items
                </button>
              </div>
            </div>
            <a href="#contact" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("contact")}
            </a>
          </nav>
          <button className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
            {t("shopNow")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;