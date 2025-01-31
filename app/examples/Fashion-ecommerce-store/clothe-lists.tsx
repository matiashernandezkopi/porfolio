'use client';

import React from 'react';
import HoverImage from './clothe';
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';
import { ClotheListProps } from './types.t';

interface ClotheListPropsNew {
    item: ClotheListProps["item"];
    collectionColors: string[];
}


const ClotheList: React.FC<ClotheListPropsNew> = ({ item,collectionColors }) => {
    const { t } = useLanguage();

    const getProductParam = () => {
        return `name=${item.name}&color=${item.color}&long=${item.long}&collection=${item.collection}&collectionColors=${collectionColors.join(',')}`;
    };

    const colorImages = Array.isArray(item.colors) ? item.colors : [item.colors];
    

    return (
        

               <div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition w-64"
                >
                    <HoverImage images={colorImages} />
                    <div className="p-6">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {`${item.name} - ${item.colorsRef || 'default color'}`}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">${item.price}</p>
                        <Link href={`/examples/Fashion-ecommerce-store/buy?${getProductParam()}`}>
                            <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
                                {t('buyNow')}
                            </button>
                        </Link>
                    </div>
                </div>
            
    );
};

export default ClotheList;
