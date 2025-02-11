'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDocumentbyname } from '../firebase/clothes';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const Page = () => {
  const { t } = useLanguage();
  const [product, setProduct] = useState<ClotheListProps["item"] | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLong, setIsLong] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [collectionColors, setCollectionColors] = useState<string[]>([]);

  useEffect(() => {
    const productCollection = searchParams.get('collection');
    console.log(productCollection);
    const colorParam = searchParams.get('color');
    const longParam = searchParams.get('long');
    setCollectionColors(searchParams.get('collectionColors')?.split(',') || []);

    if (productCollection) {
      getDocumentbyname(productCollection, colorParam || '')
        .then((fetchedProduct) => {
          setProduct(fetchedProduct);

          if (fetchedProduct.colors) {
            setSelectedColor(colorParam || Object.keys(fetchedProduct.colors)[0]);
          }
          if (fetchedProduct.long) {
            setIsLong(longParam === 'true');
          }

          if(fetchedProduct.sizes){
            setSelectedSize(fetchedProduct.sizes[0]);
          }

          if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
            setSelectedImage(fetchedProduct.colors[0]);
          }
        })
        .catch((error) => {
          console.error('Error fetching product from Firebase:', error);
        });
    }
  }, [searchParams]);

  const updateUrl = (color: string, long: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('color', color);
    params.set('long', long.toString());
    router.push(`?${params.toString()}`);
  };

  if (!product) return <p>Cargando...</p>;

  const getColorStyle = (color: string) => {
    return { backgroundColor: color.toLowerCase() };
  };

  return (
    <div className="p-10 h-screen bg-gray-50 dark:bg-gray-900 flex sm:flex-row-reverse flex-col items-center justify-center gap-3">
      <Link href="/examples/Fashion-ecommerce-store" 
      className=" absolute left-10 top-10 bg-gray-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-lg font-medium transition">
          {t("back")}
      </Link>
      <div className='flex flex-col items-center  border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 h-2/3  justify-between'>

        <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 dark:text-white ">{product.name}</h1>
        
          <div className="mt-6">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Choose a color:</label>

            <div className="flex space-x-2">
              {collectionColors.map((color) => (
                <button
                key={color}
                onClick={() => {
                    setSelectedColor(color);
                    updateUrl(color, isLong);
                  }}
                  style={getColorStyle(color)}
                  className={`w-10 h-10 rounded-full border-2 bg-gray-500 ${
                    selectedColor === color ? 'border-black' : 'border-transparent'
                  }`}
                  />
                ))}
            </div>

          </div>

          <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Choose a size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300">Price: ${product.price}</p>
      </div>
      
      <div className=" flex flex-row gap-3 h-2/3">
              
        <div className="flex flex-col gap-3 w-32">
          {product.colors.length > 0 ? (
            product.colors.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${selectedColor}`}
                className={`w-full h-auto rounded-lg shadow-md cursor-pointer  ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No images available for the selected color.</p>
          )}
        </div>


        <div className="flex flex-col items-center w-full h-full rounded-lg overflow-hidden">
          <img
            src={selectedImage}
            alt={`${product.name} ${selectedColor}`}
            className="w-full h-full object-contain rounded-lg shadow-md"
            style={{ borderRadius: '1rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
