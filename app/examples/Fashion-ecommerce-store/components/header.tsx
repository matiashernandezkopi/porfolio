import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const Header = () => {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md">
            <div className="bg-gray-800 text-white text-sm py-2 px-4 text-center">
                <p>Free Shipping on Orders Over $100</p>
            </div>
            <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-6">
                <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 dark:text-white">
                    Chimbi Fashion
                </h1>
                <nav className="flex space-x-6">
                    <Link href="/examples/Fashion-ecommerce-store" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                        {t("home")}
                    </Link>
                    <Link href="/examples/Fashion-ecommerce-store/about" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                        {t("about")}
                    </Link>
                    <a href="#shop" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                        Shop
                    </a>
                    <a href="#contact" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                        Contact
                    </a>
                </nav>
                <button className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
                    Shop Now
                </button>
            </div>
        </header>
    );
};

export default Header;