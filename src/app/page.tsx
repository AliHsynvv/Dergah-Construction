"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  // Dark mode state - synced with ConditionalLayout via localStorage
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`font-sans min-h-screen transition-colors duration-500 overflow-x-hidden ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <Hero darkMode={darkMode} />
      <FeaturedProjects darkMode={darkMode} />
      <WhyUs darkMode={darkMode} />
    </div>
  );
}

