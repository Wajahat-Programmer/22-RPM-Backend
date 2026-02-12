import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> tag and persist to localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-lg border bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {theme === "dark" ? "🌙 Light" : "☀️ Dark"}
    </button>
  );
};

export default ThemeToggle;