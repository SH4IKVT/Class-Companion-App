import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with icon */}
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
            <GraduationCap className="w-7 h-7 text-orange-500" />
            <h1>Class Companion</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-12 text-gray-600 dark:text-gray-300 font-medium">
            <a href="#home" className="hover:text-orange-500 transition">Home</a>
            <a href="#features" className="hover:text-orange-500 transition">Features</a>
            <a href="#contact" className="hover:text-orange-500 transition">Contact</a>
            <a href="#portal" className="hover:text-orange-500 transition">Portal</a>
          </nav>

          {/* Sign Up Button */}
          <div className="hidden md:block ml-6">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              Sign Up
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              className="text-gray-800 dark:text-white text-2xl"
              aria-label="Open Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;