import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md h-32">
      

      {/* Contenedor del Header y Menu */}
      <div 
        className="relative h-full "
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto  px-6 h-full " onMouseEnter={() => {
            {isDropdownOpen && setIsDropdownOpen(false);isMenuOpen && setIsMenuOpen(false);}}}>
          <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 dark:text-white">
            Chimbi Fashion
          </h1>
          <nav className="flex items-center space-x-6 h-full ">
            <Link href="/examples/Fashion-ecommerce-store" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {t("home")}
            </Link>
            <div className=' h-full  items-center flex'  
            onMouseEnter={() => {setIsDropdownOpen(false);setIsMenuOpen(false);}}
            >

                <Link href="/examples/Fashion-ecommerce-store/about" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                {t("about")}
                </Link>
            </div>

            {/* Shop con Menu */}
            <div className=' h-full  items-center flex'  
            onMouseLeave={() => setIsDropdownOpen(false)}
            >

                <Link href="/examples/Fashion-ecommerce-store/shop" onMouseEnter={() => {setIsDropdownOpen(true);setIsMenuOpen(true);}} 
                className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
                {t("shop")}
                </Link>
            </div>

            <div className=' h-full  items-center flex'  
            onMouseEnter={() => {setIsDropdownOpen(false);setIsMenuOpen(false);}}
            >

                <a href="#contact" className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition" >
                Contact
                </a>
            </div>
          </nav>
          <button className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
            Shop Now
          </button>
        </div>

        {/* Dropdown Menu justo debajo del Header */}
        {(isDropdownOpen || isMenuOpen) && (
          <div className="absolute left-0  w-full bg-white dark:bg-gray-700 shadow-lg z-40 p-4" 
          onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="flex justify-around">
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
        )}
      </div>
    </header>
  );
};

export default Header;
