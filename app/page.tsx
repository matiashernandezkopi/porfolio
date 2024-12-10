"use client";

import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-600 text-white w-full py-4 shadow-lg">
        <h1 className="text-center text-3xl font-bold">Página de Juegos</h1>
      </header>

      <main className="mt-10 w-full max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Disponibles</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Juego 1 */}
          <li className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Juego 1: Azul vs Rojo</h3>
            <p className="text-gray-600 text-center mb-4">
              ¡Un emocionante juego de estrategia donde Azul debe llegar abajo y Rojo debe capturar!
            </p>
            <Link href="/azul-vs-rojo">
              <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Jugar Ahora
              </a>
            </Link>
          </li>

          {/* Puedes agregar más juegos aquí */}
          <li className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Próximamente</h3>
            <p className="text-gray-600 text-center mb-4">
              Estamos trabajando en más juegos emocionantes para ti.
            </p>
          </li>
        </ul>
      </main>

      <footer className="mt-10 bg-gray-800 text-white py-4 w-full text-center">
        <p className="text-sm">&copy; 2024 Página de Juegos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
