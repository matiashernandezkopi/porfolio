"use client";

import { useState, useEffect } from "react";

const generateRandomColumn = () => Math.floor(Math.random() * 8);

const isAdjacent = (pos1: { row: number; col: number }, pos2: { row: number; col: number }) => {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return rowDiff <= 1 && colDiff <= 1; // Correcto para incluir las diagonales
};

export default function BlueVsRed() {
  const [circle1, setCircle1] = useState<{ row: number; col: number } | null>(null); // Rojo
  const [circle2, setCircle2] = useState<{ row: number; col: number } | null>(null); // Azul
  const [turn, setTurn] = useState(2); // 1: Rojo, 2: Azul
  const [moves, setMoves] = useState(0); // Movimientos totales
  const [winner, setWinner] = useState<string | null>(null); // Ganador (null si no hay)

  useEffect(() => {
    // Inicializar posiciones aleatorias en el cliente
    setCircle1({ row: 7, col: generateRandomColumn() });
    setCircle2({ row: 0, col: generateRandomColumn() });
  }, []);

  const resetGame = () => {
    setCircle1({ row: 7, col: generateRandomColumn() });
    setCircle2({ row: 0, col: generateRandomColumn() });
    setTurn(2);
    setMoves(0);
    setWinner(null);
  };

  const handleRedMove = () => {
    if (!circle1 || !circle2) return;

    const getCloserMove = () => {
      const rowDiff = circle2.row - circle1.row;
      const colDiff = circle2.col - circle1.col;

      const rowStep = rowDiff > 0 ? 1 : rowDiff < 0 ? -1 : 0;
      const colStep = colDiff > 0 ? 1 : colDiff < 0 ? -1 : 0;

      return { row: circle1.row + rowStep, col: circle1.col + colStep };
    };

    const getRandomMove = () => {
      const moves = [
        { row: circle1.row + 1, col: circle1.col },
        { row: circle1.row - 1, col: circle1.col },
        { row: circle1.row, col: circle1.col + 1 },
        { row: circle1.row, col: circle1.col - 1 },
        { row: circle1.row + 1, col: circle1.col + 1 },
        { row: circle1.row + 1, col: circle1.col - 1 },
        { row: circle1.row - 1, col: circle1.col + 1 },
        { row: circle1.row - 1, col: circle1.col - 1 },
      ];

      return moves[Math.floor(Math.random() * moves.length)];
    };

    const isValidMove = (pos: { row: number; col: number }) =>
      pos.row >= 0 &&
      pos.row < 8 &&
      pos.col >= 0 &&
      pos.col < 8 &&
      !(pos.row === circle2.row && pos.col === circle2.col);

    let newPos;
    if (Math.random() < 0.7) {
      newPos = getCloserMove();
    } else {
      newPos = getRandomMove();
    }

    if (isValidMove(newPos)) {
      setCircle1(newPos);
      setMoves((prev) => prev + 1);

      // Verificar victoria del rojo por contacto
      if (isAdjacent(newPos, circle2)) {
        setWinner("Rojo");
        return;
      }

      setTurn(2); // Pasar turno al azul
    } else {
      handleRedMove(); // Intentar nuevamente
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (winner || !circle1 || !circle2 || turn !== 2) return;

    const newPos = { row, col };

    if (isAdjacent(circle2, newPos) && !(newPos.row === circle1.row && newPos.col === circle1.col)) {
      setCircle2(newPos);
      setMoves((prev) => prev + 1);

      // Verificar victoria del azul
      if (newPos.row === 7) {
        setWinner("Azul");
      } else if (isAdjacent(newPos, circle1)) {
        setWinner("Rojo");
      } else {
        setTurn(1); // Pasar turno al rojo
        setTimeout(handleRedMove, 500); // Mover al rojo automáticamente con un pequeño retraso
      }
    }
  };

  const getCellClass = (row: number, col: number) => {
    if (!circle1 || !circle2) return "bg-gray-200";

    const isCircle1 = circle1.row === row && circle1.col === col;
    const isCircle2 = circle2.row === row && circle2.col === col;
    const isMovable =
      turn === 2 &&
      isAdjacent(circle2, { row, col }) &&
      !(row === circle1.row && col === circle1.col) &&
      !(row === circle2.row && col === circle2.col);

    if (isCircle1) return "bg-red-500";
    if (isCircle2) return "bg-blue-500";
    if (isMovable) return "bg-green-300";
    return "bg-gray-200";
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Cuadrícula */}
      <div className="grid grid-cols-8 gap-1 w-64">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              onClick={() => handleCellClick(row, col)}
              className={`w-8 h-8 flex items-center justify-center border cursor-pointer ${getCellClass(row, col)}`}
            ></div>
          ))
        )}
      </div>

      {/* Indicador de turno */}
      <div className="mt-4 text-lg font-bold">
        Turno de:{" "}
        <span className={turn === 1 ? "text-red-500" : "text-blue-500"}>
          {turn === 1 ? "Círculo Rojo" : "Círculo Azul"}
        </span>
      </div>

      {/* Modal de ganador */}
      {winner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¡{winner} gana!</h2>
            <p className="mb-4">Movimientos totales: {moves}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
