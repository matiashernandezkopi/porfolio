'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

const Page = () => {
  const [product, setProduct] = useState<ClotheListProps["item"] | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLong, setIsLong] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const productParam = searchParams.get('product');
    const colorParam = searchParams.get('color');
    const longParam = searchParams.get('long');

    if (productParam) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(productParam));
        setProduct(parsedProduct);

        if (parsedProduct.colors) {
          setSelectedColor(colorParam || Object.keys(parsedProduct.colors)[0]);
        }
        if (parsedProduct.long) {
          setIsLong(longParam === 'true');
        }
      } catch (error) {
        console.error('Error al parsear el producto desde la URL:', error);
      }
    }
  }, [searchParams]);

  const updateUrl = (color: string, long: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('color', color);
    params.set('long', long.toString());
    router.push(`?${params.toString()}`);
  };

  if (!product) return <p>Cargando...</p>;

  const images =
    isLong && product.long
      ? product.long[selectedColor] || []
      : product.colors[selectedColor] || [];

  const getColorStyle = (color: string) => {
    return { backgroundColor: color.toLowerCase() };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-wide text-gray-800 dark:text-white mt-10">{product.name}</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-300 mt-4">Price: ${product.price}</p>
      <div className="mt-6">
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Choose a color:</label>
        <div className="flex space-x-2 mt-2">
          {Object.keys(
            isLong && product.long ? product.long : product.colors
          ).map((color) => (
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
      {product.long && (
        <div className="mt-4">
          <label htmlFor="segment-select" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Choose a segment:
          </label>
          <select
            id="segment-select"
            value={isLong ? 'long' : 'regular'}
            onChange={(e) => {
              const isLongSelected = e.target.value === 'long';
              setIsLong(isLongSelected);
              updateUrl(selectedColor, isLongSelected);
            }}
            className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="regular">Regular</option>
            <option value="long">Long</option>
          </select>
        </div>
      )}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${selectedColor}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No images available for the selected color.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
