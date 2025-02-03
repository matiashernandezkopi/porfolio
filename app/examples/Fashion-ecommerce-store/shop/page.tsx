'use client'

import React, { useState, useEffect } from 'react';
import { getAllDocuments } from '../firebase/clothes';
import ClotheList from '../clothe-lists';
import { Slider } from "@/components/ui/slider";

interface Item {
    gender: string;
    name: string;
    price: number;
    id: string;
    colorsRef: string;
    color: string;
    long: boolean;
    sizes: Array<string>;
    colors: string[];
    collection: string;
}

const sizeOptions = ['Any','S', 'M', 'L', 'XL'];

const ShopPage: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [gender, setGender] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number | null>(null);
    const [color, setColor] = useState<string>('');
    const [long, setLong] = useState<boolean | null>(null);
    const [size, setSize] = useState<number[]>([0, sizeOptions.length - 1]);
    const [collection, setCollection] = useState<string>('');
    const [collectionColors, setCollectionColors] = useState<string[]>([]);
    const [collections, setCollections] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);

    useEffect(() => {
        async function fetchClothes() {
            try {
                const fetchedClothes = await getAllDocuments();
                setItems(fetchedClothes);
                setCollectionColors(fetchedClothes.map((item) => item.color));
                const uniqueCollections = Array.from(new Set(fetchedClothes.map((item) => item.collection)));
                setCollections(uniqueCollections);
                const uniqueSizes = Array.from(new Set(fetchedClothes.flatMap((item) => item.sizes)));
                setSizes(uniqueSizes);
                console.log(collectionColors);
            } catch (error) {
                console.error("Error fetching clothes: ", error);
            }
        }

        fetchClothes();
    }, []);

    const filteredItems = items.filter(item => {
        return (
            (gender ? item.gender.toLowerCase().includes(gender.toLowerCase()) : true) &&
            (name ? item.name.toLowerCase().includes(name.toLowerCase()) : true) &&
            (price ? item.price <= price : true) &&
            (color ? item.color.toLowerCase().includes(color.toLowerCase()) : true) &&
            (long !== null ? item.long === long : true) &&
            (size ? item.sizes.some(s => sizeOptions.indexOf(s) >= size[0] && sizeOptions.indexOf(s) <= size[1]) : true) &&
            (collection ? item.collection.toLowerCase().includes(collection.toLowerCase()) : true)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <header className="py-6 bg-gray-800 text-white text-center">
                <h1 className="text-3xl font-bold">Shop</h1>
            </header>
            <main className="flex-1 py-10 px-6 max-w-7xl mx-auto">
                <section className="text-center py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <label className="block">
                            Gender:
                            <select value={gender} onChange={e => setGender(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Any</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </label>
                        <label className="block">
                            Name:
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            Max Price:
                            <input type="number" value={price || ''} onChange={e => setPrice(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            Color:
                            <input type="text" value={color} onChange={e => setColor(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            Long:
                            <select value={long !== null ? long.toString() : ''} onChange={e => setLong(e.target.value === 'true')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Any</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </label>
                        <label className="block">
                            Size:
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
                            Collection:
                            <select value={collection} onChange={e => setCollection(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Any</option>
                                {collections.map((col, index) => (
                                    <option key={index} value={col}>{col}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </section>
                <section className="py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map(item => (
                            <ClotheList key={item.id} item={item} collectionColors={collectionColors} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="py-6 bg-gray-800 text-white text-center">
                <p>&copy; 2023 Fashion Ecommerce Store</p>
            </footer>
        </div>
    );
};

export default ShopPage;
