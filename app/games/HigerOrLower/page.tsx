'use client'
import Link from 'next/link';
import { useState } from 'react';

const alimentos = [
  {
    nombre: 'Manzana',
    calorias: 52,
    imagen: 'https://via.placeholder.com/400x200?text=Manzana',
  },
  {
    nombre: 'Plátano',
    calorias: 89,
    imagen: 'https://via.placeholder.com/400x200?text=Pl%C3%A1tano',
  },
  {
    nombre: 'Pizza',
    calorias: 266,
    imagen: 'https://via.placeholder.com/400x200?text=Pizza',
  },
  {
    nombre: 'Hamburguesa',
    calorias: 295,
    imagen: 'https://via.placeholder.com/400x200?text=Hamburguesa',
  },
  {
    nombre: 'Ensalada',
    calorias: 33,
    imagen: 'https://via.placeholder.com/400x200?text=Ensalada',
  },
];

export default function Home() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [current, setCurrent] = useState(alimentos[0]);
  const [next, setNext] = useState(alimentos[1]);

  const handleGuess = (guess:string) => {
    const correct = guess === (next.calorias > current.calorias ? 'higher' : 'lower');

    if (correct) {
      setScore(score + 1);
      if (score + 1 > highScore) setHighScore(score + 1);

      const nextIndex = Math.floor(Math.random() * alimentos.length);
      setCurrent(next);
      setNext(alimentos[nextIndex]);
    } else {
      alert('¡Has perdido!');
      setScore(0);
      setCurrent(alimentos[0]);
      setNext(alimentos[1]);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
        <Link href="../../">
            <div className="absolute z-50 top-6 left-6 text-white bg-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 transform hover:scale-105">
                Volver
            </div>
        </Link>
      <div className="flex justify-between w-full mb-6 text-2xl absolute z-50 px-6 bottom-0">
        <p>High Score: {highScore}</p>
        <p>Score: {score}</p>
      </div>
      <div className="flex flex-row items-center gap-1 w-full h-full">
        <div
          className="w-1/2 h-full bg-cover bg-center relative flex items-center justify-center text-white shadow-md overflow-hidden text-center"
          style={{ backgroundImage: `url(${current.imagen})` }}
        >
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-lg font-bold font-sans leading-relaxed">“{current.nombre}”</p>
            <p>{current.calorias} calorías por 100g</p>
          </div>
        </div>

        <div
          className="w-1/2 h-full bg-cover bg-center relative flex items-center justify-center text-white shadow-md overflow-hidden text-center"
          style={{ backgroundImage: `url(${next.imagen})` }}
        >
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
                <p className="text-lg font-bold font-sans leading-relaxed">“{next.nombre}”</p>
                <p className="invisible">¿Más o menos calorías?</p>
                <div className="flex gap-6">
                    <button
                        className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                        onClick={() => handleGuess('higher')}
                    >
                        Higher
                    </button>
                    <button
                        className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                        onClick={() => handleGuess('lower')}
                    >
                        Lower
                    </button>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
}
