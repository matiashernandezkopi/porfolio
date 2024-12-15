'use client'
import { useEffect, useState } from 'react';
import { alimentos } from './food';
import { useLanguage } from '@/app/context/LanguageContext';
import BackButton from '@/app/components/back-button';

interface Food {
  nombreEn: string;
  nombreEs: string;
  calorias: number;
  unidadEn: string;
  unidadEs: string;
  imagen: string;
}

export default function Home() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [current, setCurrent] = useState<Food|null>(null);
  const [next, setNext] = useState<Food|null>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    // Solo hacer la selección aleatoria en el cliente
    const nextCurrent = alimentos[Math.floor(Math.random() * alimentos.length)];
    const nextNext = alimentos[Math.floor(Math.random() * alimentos.length)];
    setCurrent(nextCurrent);
    setNext(nextNext);
  }, []); // Se ejecuta solo una vez después del montaje

  if (!current || !next) return <div>Loading...</div>; // Asegura que el componente no se renderice sin datos
  
  const handleGuess = (guess: string) => {
    const correct = guess === (next.calorias > current.calorias ? 'higher' : 'lower');

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);

      // Actualizar high score si es necesario
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('highScore', newScore.toString()); // Guardar en la caché
      }
      const nextIndex = Math.floor(Math.random() * alimentos.length);
      setCurrent(next);
      setNext(alimentos[nextIndex]);
    } else {
      setScore(0);
      setCurrent(alimentos[Math.floor(Math.random() * alimentos.length)]);
      setNext(alimentos[Math.floor(Math.random() * alimentos.length)]);
    }
  };


  return (
    <div className="flex flex-col items-center h-screen">
      <BackButton position='absolute z-50 top-6 left-6'/>
      <div className="flex justify-between w-full mb-6 text-2xl absolute z-50 px-6 bottom-0">
        <p>{t("highScore")}: {highScore}</p>
        <p>{t("score")}: {score}</p>
      </div>
      <div className="flex flex-row items-center gap-1 w-full h-full">
        <div
          className="w-1/2 h-full bg-cover bg-center relative flex items-center justify-center text-white shadow-md overflow-hidden text-center"
          style={{ backgroundImage: `url(${current.imagen})` }}
        >
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-lg font-bold font-sans leading-relaxed">“{language === "en" ? (current.nombreEn) : (current.nombreEs)}”</p>
            <p>
              {current.calorias} {t("caloriesPerUnit", { unit: language === "en" ? current.unidadEn : current.unidadEs })}
            </p>
          </div>
        </div>

        <div
          className="w-1/2 h-full bg-cover bg-center relative flex items-center justify-center text-white shadow-md overflow-hidden text-center"
          style={{ backgroundImage: `url(${next.imagen})` }}
        >
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-lg font-bold font-sans leading-relaxed">“{language === "en" ? (next.nombreEn) : (next.nombreEs)}”</p>
            <p>¿{t("higherOrLowerTitle")}?</p>
            <div className="flex gap-6">
              <button
                className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={() => handleGuess('higher')}
              >
                {t("higher")}
              </button>
              <button
                className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => handleGuess('lower')}
              >
                {t("lower")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
