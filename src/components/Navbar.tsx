"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.9, 0.95]);
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 16]);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(scrollY.get() > 50);
    const unsubscribe = scrollY.on("change", updateScrolled);
    return unsubscribe;
  }, [scrollY]);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
    >
      <div className="w-full">
        <motion.div
          className={`px-6 py-4 flex items-center justify-between transition-all duration-500 ${
            darkMode
              ? isScrolled
                ? "bg-slate-900 shadow-lg border-b-2 border-slate-700/30"
                : "bg-slate-900/95 backdrop-blur-xl shadow-md border-b-2 border-slate-800/30"
              : isScrolled
                ? "bg-white shadow-lg border-b-2 border-brand/20"
                : "bg-white/95 backdrop-blur-xl shadow-md border-b-2 border-brand/10"
          }`}
          style={{
            backdropFilter: `blur(${navbarBlur}px)`,
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg shadow-sm overflow-hidden">
                <Image
                  src="/dergah-logo.png"
                  alt="Dargah Construction"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className={`hidden sm:block text-lg font-semibold transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>Dargah</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-500 group ${
                      darkMode
                        ? isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                        : isActive ? 'text-brand' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                    {/* Underline Effect */}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300 ${
                      darkMode 
                        ? 'from-blue-400 to-blue-300' 
                        : 'from-brand to-blue-700'
                    } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Language, Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${
                  darkMode 
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-2 border-slate-700' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Change language"
              >
                <Languages className="h-5 w-5" />
                <span className="hidden sm:inline text-xs font-medium uppercase">{language}</span>
              </motion.button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-32 rounded-lg border backdrop-blur-md shadow-lg overflow-hidden ${
                      darkMode 
                        ? 'border-slate-700/50 bg-slate-800/95' 
                        : 'border-slate-200/50 bg-white/95'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setLanguage('az');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                        language === 'az'
                          ? darkMode
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-brand/10 text-brand'
                          : darkMode
                            ? 'text-slate-300 hover:bg-slate-700'
                            : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      🇦🇿 Azərbaycanca
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                        language === 'en'
                          ? darkMode
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-brand/10 text-brand'
                          : darkMode
                            ? 'text-slate-300 hover:bg-slate-700'
                            : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-500 ${
                darkMode 
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 border-2 border-slate-700' 
                  : 'bg-slate-100 text-brand hover:bg-slate-200 border-2 border-slate-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              aria-label="Aç/Kapat menyu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-500 ${
                darkMode 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className={`mx-4 mb-4 rounded-xl border backdrop-blur-md shadow-sm transition-all duration-500 ${
                darkMode 
                  ? 'border-slate-700/50 bg-slate-800/95' 
                  : 'border-slate-200/50 bg-white/95'
              }`}>
                <div className="grid gap-0.5 p-3">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          onClick={() => setOpen(false)}
                          href={item.href}
                          className={`relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-500 overflow-hidden group ${
                            darkMode
                              ? isActive 
                                ? 'text-blue-400 bg-blue-500/10' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-700'
                              : isActive 
                                ? 'text-brand bg-brand/5' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                          {/* Underline Effect for Mobile */}
                          <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-300 ${
                            darkMode 
                              ? 'from-blue-400 to-blue-300' 
                              : 'from-brand to-blue-700'
                          } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}


