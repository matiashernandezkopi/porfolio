'use client'

import React, { useState, useEffect } from 'react';
import { getAllDocuments } from '../firebase/clothes';
import ClotheList from '../clothe-lists';
import { Slider } from "@/components/ui/slider";
import { useLanguage } from '@/app/context/LanguageContext';

const ShopPage: React.FC = () => {
    const { t } = useLanguage();
    const sizeOptions = [t("all"), 'S', 'M', 'L', 'XL'];
    const [items, setItems] = useState<ClotheListProps["item"][]>([]);
    const [gender, setGender] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]); // Assuming 0 to 100 as the price range
    const [color, setColor] = useState<string>('');
    const [long, setLong] = useState<boolean | null>(null);
    const [size, setSize] = useState<number[]>([0, sizeOptions.length - 1]);
    const [collection, setCollection] = useState<string>('');
    const [collectionColors, setCollectionColors] = useState<string[]>([]);
    const [collections, setCollections] = useState<string[]>([]);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        async function fetchClothes() {
            try {
                const fetchedClothes = await getAllDocuments();
                setItems(fetchedClothes);
                
                const uniqueColors = Array.from(new Set(fetchedClothes.flatMap((item) => {
                    const colors = item.color.split(/(?=[A-Z])/); // Split on uppercase letters
                    return colors.map((color: string) => color.toLowerCase());
                })));
                setCollectionColors(uniqueColors);
                
                const uniqueCollections = Array.from(new Set(fetchedClothes.map((item) => item.collection)));
                setCollections(uniqueCollections);
                
                const uniqueSizes = Array.from(new Set(fetchedClothes.flatMap((item) => item.sizes)));
                const sizeOptions = [t("all"), ...uniqueSizes];
                
            } catch (error) {
                console.error("Error fetching clothes: ", error);
            }
        }

        fetchClothes();
    }, []);

    const filteredItems = items.filter(item => {
        const colorMatch = color ? item.color.toLowerCase().includes(color.toLowerCase()) || 
            (color.toLowerCase() === 'white' && (item.color.toLowerCase().includes('bluewhite') || item.color.toLowerCase().includes('whiteblack'))) : true;
        
        return (
            (gender ? item.gender.toLowerCase().includes(gender.toLowerCase()) : true) &&
            (name ? item.name.toLowerCase().includes(name.toLowerCase()) : true) &&
            (priceRange ? item.price >= priceRange[0] && item.price <= priceRange[1] : true) &&
            colorMatch &&
            (long !== null ? item.long === long : true) &&
            (size ? item.sizes.some(s => sizeOptions.indexOf(s) >= size[0] && sizeOptions.indexOf(s) <= size[1]) : true) &&
            (collection ? item.collection.toLowerCase().includes(collection.toLowerCase()) : true)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <header className="py-6 sticky top-0 z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md text-center">
                <h1 className="text-3xl font-bold">Shop</h1>
            </header>
            <main className="flex py-10 px-6 max-w-7xl mx-auto">
                <section className={`text-center p-10 fixed top-0 left-0 bg-white dark:bg-gray-800 shadow-lg h-full z-20 overflow-y-auto ${isCollapsed ? 'w-16' : 'w-64'}`}>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4">
                        {isCollapsed ? 'Expand' : 'Collapse'}
                    </button>
                    {!isCollapsed && (
                        <div className="flex flex-col gap-4 sm:gap-8 lg:gap-16">
                            <label className="block">
                                {t("gender")}:
                                <select value={gender} onChange={e => setGender(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="">{t("any")}</option>
                                    <option value="male">{t("male")}</option>
                                    <option value="female">{t("female")}</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </label>
                            <label className="block">
                                {t("name")}:
                                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                            <label className="block">
                                {t("priceRange")}:
                                <Slider
                                    value={priceRange}
                                    onValueChange={(value: number[]) => setPriceRange(value)}
                                    min={0}
                                    max={100}
                                    step={5}
                                />
                                <div className="flex justify-between">
                                    <span>{priceRange[0]}</span>
                                    <span>{priceRange[1]}</span>
                                </div>
                            </label>
                            <label className="block">
                                {t("color")}:
                                <select value={color} onChange={e => setColor(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="">{t("any")}</option>
                                    {collectionColors.map((col, index) => (
                                        <option key={index} value={col}>{col}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block">
                                {t("long")}:
                                <select value={long !== null ? long.toString() : ''} onChange={e => setLong(e.target.value === 'true')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="">{t("any")}</option>
                                    <option value="true">{t("yes")}</option>
                                    <option value="false">{t("no")}</option>
                                </select>
                            </label>
                            <label className="block">
                                {t("size")}:
                                <Slider
                                    value={size}
                                    onValueChange={(value: number[]) => setSize(value)}
                                    min={0}
                                    max={sizeOptions.length - 1}
                                    step={1}
                                    />
                                <div className="flex justify-between">
                                    <span>{sizeOptions[size[0]]}</span>
                                    <span>{sizeOptions[size[1]]}</span>
                                </div>
                            </label>
                            <label className="block">
                                {t("collection")}:
                                <select value={collection} onChange={e => setCollection(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="">{t("any")}</option>
                                    {collections.map((col, index) => (
                                        <option key={index} value={col}>{col}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                </section>
                <section className="py-10 pl-36  lg:pl-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map(item => (
                            <ClotheList key={item.id} item={item} collectionColors={collectionColors} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="py-6 bg-gray-800 text-white text-center">
                <p>&copy; 2023 Chimbi Fashion Store</p>
            </footer>
        </div>
    );
};

export default ShopPage;
