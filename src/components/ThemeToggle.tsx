import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/20 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer overflow-hidden transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="light"
            initial={{ y: -20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="text-neutral-800"
          >
            <Sun className="h-5 w-5 fill-amber-500 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="text-indigo-400"
          >
            <Moon className="h-5 w-5 fill-indigo-950 text-indigo-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
