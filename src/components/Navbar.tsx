"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Moon, Sun, Languages, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    else if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${isScrolled ? "pt-4" : "pt-6"
          }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 transition-all duration-500 rounded-full backdrop-blur-xl border ${isScrolled
            ? "w-[90%] md:w-[85%] lg:w-[1200px] py-3 shadow-2xl"
            : "w-full md:w-[95%] lg:w-[1280px] py-4 shadow-none border-transparent bg-transparent"
            } ${darkMode
              ? isScrolled ? "bg-slate-900/80 border-slate-700/50" : ""
              : isScrolled ? "bg-white/80 border-white/50" : ""
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl">
              <Image
                src="/dergah-logo.png"
                alt="Dargah Group"
                fill
                className="object-contain"
              />
            </div>
            <span className={`font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${darkMode ? "text-white" : "text-slate-900"
              }`}>
              Dargah
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${darkMode ? "text-slate-300 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
              >
                <Languages className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className={`absolute top-full right-0 mt-2 w-32 rounded-xl border p-1 shadow-xl backdrop-blur-xl ${darkMode ? "bg-slate-900/90 border-slate-700" : "bg-white/90 border-slate-200"
                      }`}
                  >
                    {['az', 'en'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang as 'en' | 'az');
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${language === lang
                          ? darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"
                          : darkMode ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                      >
                        {lang === 'az' ? '🇦🇿 AZ' : '🇬🇧 EN'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-full transition-all ${darkMode ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden p-2 rounded-lg transition-colors ${darkMode ? "text-white hover:bg-slate-800" : "text-slate-900 hover:bg-slate-100"
              }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] backdrop-blur-md bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm p-6 shadow-2xl ${darkMode ? "bg-slate-900 border-l border-slate-800" : "bg-white ring-1 ring-slate-200"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-full ${darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    index={i}
                    onClick={() => setMobileMenuOpen(false)}
                    darkMode={darkMode}
                  />
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('az')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${language === 'az'
                      ? darkMode ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-600"
                      : darkMode ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600"
                      }`}
                  >
                    AZ
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${language === 'en'
                      ? darkMode ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-600"
                      : darkMode ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600"
                      }`}
                  >
                    EN
                  </button>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`p-3 rounded-full ${darkMode ? "bg-slate-800 text-yellow-400" : "bg-slate-100 text-slate-700"
                    }`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-components

function NavLink({ href, label, isActive, darkMode }: { href: string; label: string; isActive: boolean; darkMode: boolean }) {
  return (
    <Link href={href} className="relative px-4 py-2 group">
      <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${isActive
        ? darkMode ? "text-blue-400" : "text-blue-600"
        : darkMode ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"
        }`}>
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className={`absolute inset-0 rounded-full -z-0 ${darkMode ? "bg-slate-800" : "bg-blue-50"
            }`}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ href, label, index, onClick, darkMode }: { href: string; label: string; index: number; onClick: () => void; darkMode: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`block w-full p-4 rounded-xl text-lg font-medium transition-colors ${darkMode
          ? "text-slate-300 hover:bg-slate-800 hover:text-white"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
      >
        {label}
      </Link>
    </motion.div>
  );
}
