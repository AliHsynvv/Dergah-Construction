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
    const checkDarkMode = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    };

    checkDarkMode();
    window.addEventListener('storage', checkDarkMode);
    window.addEventListener('darkModeChange', checkDarkMode);

    return () => {
      window.removeEventListener('storage', checkDarkMode);
      window.removeEventListener('darkModeChange', checkDarkMode);
    };
  }, []);

  return (
    <main className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}>

      {/* Premium Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${darkMode ? 'bg-blue-900/40' : 'bg-blue-200/60'}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-all duration-1000 ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-200/50'}`} />
      </div>

      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24">
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6"
          style={{ y: y1, opacity }}
        >
          <Services darkMode={darkMode} />
        </motion.div>
      </section>
    </main>
  );
}


