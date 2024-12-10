"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex flex-col`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white py-6 px-10 shadow-lg">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-wide">
              🎮 Juegos Divertidos
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <div className="h-6 w-6 text-yellow-400" >a</div>
              ) : (
                <div className="h-6 w-6 text-blue-300" >a</div>
              )}
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 py-10 px-6">
          <section className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
              Explora nuestros Juegos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Juego 1 */}
              <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden">
                <div className="bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 h-48 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white group-hover:scale-105 transition">
                    Azul vs Rojo
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    ¡Un emocionante juego de estrategia donde Azul debe llegar
                    abajo y Rojo debe capturar!
                  </p>
                  <Link href="games/BlueVsRed">
                    <div className="block w-full text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                      Jugar Ahora
                    </div>
                  </Link>
                </div>
              </div>

              {/* Próximamente */}
              <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden">
                <div className="bg-gradient-to-b from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800 h-48 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white group-hover:scale-105 transition">
                    Próximamente
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Estamos trabajando en más juegos emocionantes para ti.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 dark:bg-blue-800 text-white py-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">
              &copy; 2024 Juegos Divertidos. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
