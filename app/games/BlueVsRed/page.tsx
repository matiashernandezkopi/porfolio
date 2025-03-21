"use client";

import BackButton from "@/app/components/back-button";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";

// Funciones auxiliares
const generateRandomColumn = () => Math.floor(Math.random() * 9); // Ahora la columna puede ser de 0 a 8
const isAdjacent = (pos1: { row: number; col: number }, pos2: { row: number; col: number }) => {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return rowDiff <= 1 && colDiff <= 1;
};

export default function BlueVsRed() {
  const [circle1, setCircle1] = useState<{ row: number; col: number } | null>(null); // Rojo
  const [circle2, setCircle2] = useState<{ row: number; col: number } | null>(null); // Azul
  const [turn, setTurn] = useState(2); // 1: Rojo, 2: Azul
  const [moves, setMoves] = useState(0); // Movimientos totales
  const [winner, setWinner] = useState<string | null>(null); // Ganador

  const { t, ToggleButton } = useLanguage();

  // Inicializar posiciones al cargar
  useEffect(() => {
    resetGame();
  }, []);

  //Comprueba cada turno si rojo gano (si esta a una casilla de azul)
  useEffect(()=>{
    if (circle1 && circle2 && isAdjacent(circle1, circle2)) {
      setWinner(t("red"));
      return;
    }
  },[turn,circle1,circle2,t])

  const resetGame = () => {
    setCircle1({ row: 8, col: generateRandomColumn() }); // Círculo rojo en la fila 8
    setCircle2({ row: 0, col: generateRandomColumn() }); // Círculo azul en la fila 0
    setTurn(2);
    setMoves(0);
    setWinner(null);
  };

  const handleRedMove = () => {
    if (!circle1 || !circle2 || winner) return;

    const getCloserMove = () => {
      const rowStep = Math.sign(circle2.row - circle1.row);
      const colStep = Math.sign(circle2.col - circle1.col);

      // Hacer que rojo tenga 10% más de posibilidades de moverse lejos de azul
      const randomFactor = Math.random();
      if (randomFactor < 0.1 && circle1.row!==8) {
        // Movimiento más alejado en alguna dirección
        return { row: circle1.row - rowStep, col: circle1.col - colStep };
      }

      return { row: circle1.row + rowStep, col: circle1.col + colStep };
    };

    const newPos = getCloserMove();

   
    setCircle1(newPos);
    

    // Cambiar turno a azul
    setTurn(2);
    setMoves((prev) => prev + 1);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!circle2 || turn !== 2 || winner) return;

    const newPos = { row, col };
    if (isAdjacent(circle2, newPos) && !(newPos.row === circle1?.row && newPos.col === circle1?.col)) {
      setCircle2(newPos);

      // Verificar si el círculo azul ha llegado al final
      if (newPos.row === 8) {
        setWinner(t("blue"));
      } else {
        setTurn(1);
        setTimeout(handleRedMove, 500);
      }

      setMoves((prev) => prev + 1);
    }
  };

  const getCellClass = (row: number, col: number) => {
    if (!circle1 || !circle2) return "bg-gray-200";

    const isCircle1 = circle1.row === row && circle1.col === col;
    const isCircle2 = circle2.row === row && circle2.col === col;
    const isMovable =
      turn === 2 &&
      isAdjacent(circle2, { row, col }) &&
      !(row === circle1.row && col === circle1.col);

    if (isCircle1) return "bg-red-500 border-4 border-black";
    if (isCircle2) return "bg-blue-500 border-4 border-black";
    if (isMovable) return "bg-green-300";
    return "bg-gray-200";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-6 bg-gradient-to-tl from-blue-800 to-red-800">
      
      <div className="absolute top-6 left-6 text-white flex flex-col gap-10">
        <BackButton/>
        <ToggleButton/>
      </div>

      <h1 className="text-4xl font-bold text-white">
        {t("blueVsRedTitle")}
      </h1>
      {/* Cuadrícula */}
      <button
        onClick={resetGame}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition duration-200"
      >
        {t("reset")}
      </button>
      <div className="grid grid-cols-9 gap-1 mt-12">
        {Array.from({ length: 9 }).map((_, row) =>
          Array.from({ length: 9 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              onClick={() => handleCellClick(row, col)}
              className={`w-12 h-12 flex items-center justify-center border cursor-pointer rounded-md ${getCellClass(
                row,
                col
              )}`}
            ></div>
          ))
        )}
      </div>

      {/* Indicador de turno */}
      <div className="mt-6 text-lg font-bold text-black">
        {t("turnOf")}{" "}
        <span className={turn === 1 ? "text-red-500" : "text-blue-500"}>
          {turn === 1 ? t("red") : t("blue")}
        </span>
      </div>

      {/* Modal de ganador */}
      {winner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm w-full text-black">
            <h2 className="text-3xl font-bold mb-4">{t("winner", { winner })}</h2>
            <p className="mb-4 text-lg">{t("totalMoves", { moves })}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition duration-200"
            >
              {t("reset")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
