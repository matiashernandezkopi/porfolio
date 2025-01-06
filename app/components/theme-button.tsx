'use client'

import { useTheme } from "next-themes";

export const ThemeButton = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const toggleDarkMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

  return (
    <button
    onClick={toggleDarkMode}
    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
    aria-label="Toggle Dark Mode"
    >
        {resolvedTheme === "dark" ? (
            <div className="h-6 w-6 text-yellow-400">🌙</div>
        ) : (
            <div className="h-6 w-6 text-blue-300">☀️</div>
        )}
    </button>
  )
}
