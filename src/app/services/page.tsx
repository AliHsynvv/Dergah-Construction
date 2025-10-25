"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Services from "@/components/Services";
import { useState, useEffect } from "react";

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    }

    // Listen for dark mode changes from other components
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event from same page
    const handleDarkModeChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    };
    
    window.addEventListener('darkModeChange', handleDarkModeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('darkModeChange', handleDarkModeChange);
    };
  }, []);

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>

      <section className={`relative pt-32 md:pt-40 pb-20 md:pb-24 transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900/95' 
          : 'bg-gradient-to-br from-white via-slate-50 to-blue-50/30'
      }`}>
        <motion.div
          className="mx-auto max-w-7xl px-6"
          style={{ y: y1, opacity }}
        >
          <Services darkMode={darkMode} />
        </motion.div>
      </section>
    </main>
  );
}


