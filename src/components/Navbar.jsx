import React, { useContext } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { auth } = useContext(AuthContext);

  return (
    <nav className="bg-white dark:bg-innerDarkColor shadow-sm border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-50">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-primary dark:text-blue-400">
              RPM Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:block text-sm text-gray-600 dark:text-gray-300">
              {auth?.user?.name || "Guest"}
            </div>
            <div className="w-8 h-8 bg-innerDarkColor dark:bg-gray-600 rounded-full flex items-center justify-center text-white dark:text-gray-100 text-sm font-medium">
              {auth?.user?.name?.charAt(0) || "?"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
