'use client';

import React from 'react';
import HoverImage from './clothe';
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

interface ClotheListProps {
    item: {
        gender: string;
        name: string;
        price: number;
        colors: {
            [key: string]: string[];
        };
        long?: {
            [key: string]: string[];
        };
    };
}

const ClotheList: React.FC<ClotheListProps> = ({ item }) => {
    const { t } = useLanguage();

    const getProductParam = (item: ClotheListProps['item'], color: string, isLong: boolean) => {
        const productParam = encodeURIComponent(JSON.stringify(item));
        return `product=${productParam}&color=${color}&long=${isLong}`;
    };

    return (
        <section className="py-16">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                {item.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(item.colors).map(([color, images]) => (
                    <div
                        key={color}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition w-64"
                    >
                        <HoverImage images={images} />
                        <div className="p-6">
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{`${item.name} - ${color}`}</h4>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">${item.price}</p>
                            <Link href={`/examples/Fashion-ecommerce-store/buy?${getProductParam(item, color, false)}`}>
                                <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
                                    {t('buyNow')}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
                {item.long &&
                    Object.entries(item.long).map(([color, images]) => (
                        <div
                            key={color}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition w-64"
                        >
                            <HoverImage images={images} />
                            <div className="p-6">
                                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{`${item.name} - ${color}`}</h4>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">${item.price}</p>
                                <Link href={`/examples/Fashion-ecommerce-store/buy?${getProductParam(item, color, true)}`}>
                                    <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
                                        {t('buyNow')}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default ClotheList;
