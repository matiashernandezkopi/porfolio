import React from 'react'
import HoverImage from './clothe';
import { useLanguage } from '@/app/context/LanguageContext';

interface ClotheListProps {
    item: {
        gender: string;
        name: string;
        price: number;
        colors: {
            [key: string]: string[];
        };
    };
}

const ClotheList: React.FC<ClotheListProps> = ({ item }) => {
    const { t } = useLanguage();
    return (
        <section id="shop" className="py-16">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                {item.name}
            </h3>
                  
        
        
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(item.colors).map(([color, images]) => (
                    <div key={color} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition w-64 ">
                        <HoverImage images={images} />
                        <div className="p-6">
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{`${item.name} - ${color}`}</h4>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">${item.price}</p>
                            <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
                                {t("buyNow")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ClotheList