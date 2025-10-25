"use client";

import { motion, useMotionValue, useAnimationFrame, animate, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function PortfolioStrip({ darkMode }: { darkMode: boolean }) {
  const { t } = useLanguage();
  const items = [
    "/portfolio/p1.png",
    "/portfolio/pr2.png",
    "/portfolio/pr3.png",
    "/portfolio/vl1.png",
    "/portfolio/vl2.png",
  ];
  const slides = [...items, ...items];
  return (
    <section id="portfolio" className="relative py-16 md:py-20 overflow-hidden transition-colors duration-500">
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-r from-slate-800/50 via-slate-900 to-slate-800/30' 
          : 'bg-gradient-to-r from-slate-50/50 via-white to-blue-50/30'
      }`} />

      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              darkMode 
                ? 'from-blue-400 to-blue-200' 
                : 'from-slate-900 to-slate-700'
            }`}>
              {t.home.portfolio.title}
            </h2>
            <p className={`mt-1 text-sm md:text-base transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.home.portfolio.subtitle}
            </p>
          </div>
          <motion.a
            href="/portfolio"
            className={`group inline-flex items-center text-sm font-semibold transition-colors duration-500 ${
              darkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-brand hover:text-blue-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.home.portfolio.viewAll}
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>

        <div className={`relative overflow-hidden rounded-2xl backdrop-blur-sm shadow-lg transition-all duration-500 ${
          darkMode 
            ? 'bg-gradient-to-r from-slate-800/60 via-slate-700/80 to-slate-800/60 border border-slate-700/20' 
            : 'bg-gradient-to-r from-white/60 via-white/80 to-white/60 border border-white/20'
        }`}>
          <motion.div
            className="flex gap-4 will-change-transform py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {slides.map((src, i) => (
              <motion.div
                key={i}
                className={`relative h-32 md:h-40 w-[80vw] sm:w-[240px] md:w-[300px] shrink-0 rounded-xl overflow-hidden backdrop-blur shadow-md hover:shadow-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-800/60 border border-slate-700/30' 
                    : 'bg-white/60 border border-white/30'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <Image
                  src={src}
                  alt={`Portfolio ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  className="object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-10"
                     style={{
                       backgroundImage: "radial-gradient(circle at 25px 25px, rgba(30, 58, 138, 0.2) 3px, transparent 3px)",
                       backgroundSize: "30px 30px",
                     }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r pointer-events-none transition-all duration-500 ${
            darkMode ? 'from-slate-900/80' : 'from-white/80'
          } to-transparent`} />
          <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l pointer-events-none transition-all duration-500 ${
            darkMode ? 'from-slate-900/80' : 'from-white/80'
          } to-transparent`} />
        </div>
      </div>
    </section>
  );
}

function Hero({ darkMode }: { darkMode: boolean }) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Five cards (reuse available assets)
  const cards = [
    { src: "/dergah%20villa.png", title: "Villa layihəsi" },
    { src: "/images/mdrn%20interier.webp", title: "İnteryer dizayn" },
    { src: "/dergah%20villa.png", title: "Fasad yenilənməsi" },
    { src: "/images/mdrn%20interier.webp", title: "Ofis təmiri" },
    { src: "/dergah%20villa.png", title: "Layihə idarəetməsi" },
  ];
  const loop = [...cards, ...cards];
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const halfWidthRef = useRef(1);
  const [isHover, setIsHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const expRef = useRef<HTMLSpanElement | null>(null);
  const projRef = useRef<HTMLSpanElement | null>(null);

  // Dynamic typing for headline: cycle through words with fast type/delete
  const rotatingWords = useMemo(() => ["müasir", "etibarlı"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const maxWord = rotatingWords.reduce((a, b) => (a.length >= b.length ? a : b));

  useEffect(() => {
    const current = rotatingWords[wordIndex];
    const typeSpeed = 70; // ms per char while typing
    const deleteSpeed = 40; // faster delete
    const holdBeforeDelete = 450; // pause when full word shown
    const holdBeforeType = 200; // pause before next word starts

    if (!deleting && typed === current) {
      const id = setTimeout(() => setDeleting(true), holdBeforeDelete);
      return () => clearTimeout(id);
    }
    if (deleting && typed === "") {
      const id = setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setDeleting(false);
      }, holdBeforeType);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => {
      if (deleting) {
        setTyped((t) => t.slice(0, -1));
      } else {
        setTyped(current.slice(0, typed.length + 1));
      }
    }, deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(id);
  }, [typed, deleting, wordIndex, rotatingWords]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Width of one loop (half of total since we doubled slides)
    const loopWidth = el.scrollWidth / 2;
    halfWidthRef.current = Math.max(loopWidth, 1);
  }, []);

  useAnimationFrame((_, delta) => {
    if (isHover || isDragging) return;
    const speedPxPerMs = 0.04; // smooth luxurious
    const dx = -speedPxPerMs * delta;
    let next = x.get() + dx;
    const half = halfWidthRef.current;
    if (next <= -half) next += half; // wrap forward
    if (next >= 0) next -= half;     // wrap backward
    x.set(next);
  });

  useEffect(() => {
    if (!expRef.current || !projRef.current) return;
    const controls1 = animate(0, 10, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (expRef.current) expRef.current.textContent = `${Math.floor(v)}+`;
      },
    });
    const controls2 = animate(0, 100, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (projRef.current) projRef.current.textContent = `${Math.floor(v)}+`;
      },
      delay: 0.2,
    });
    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, []);

  return (
    <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-40 overflow-hidden transition-colors duration-500">
      {/* Modern gradient background with animated elements */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900/95' 
          : 'bg-gradient-to-br from-white via-slate-50 to-blue-50/30'
      }`}>
        <div className={`absolute top-0 right-0 -mt-40 -mr-40 h-96 w-96 rounded-full blur-3xl animate-pulse transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-600/30 to-blue-500/20' 
            : 'bg-gradient-to-br from-brand/20 to-blue-400/20'
        }`} />
        <div className={`absolute bottom-0 left-0 -mb-40 -ml-40 h-80 w-80 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-tr from-slate-700/40 to-blue-600/10' 
            : 'bg-gradient-to-tr from-slate-200/40 to-brand/10'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-2xl transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-radial from-blue-500/10 to-transparent' 
            : 'bg-gradient-radial from-brand/5 to-transparent'
        }`} />
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-6 relative"
        style={{ y: y1, opacity }}
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div style={{ y: y2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`mb-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500 ${
                darkMode 
                  ? 'bg-blue-500/20 text-blue-300' 
                  : 'bg-brand/10 text-brand'
              }`}
            >
              ✨ {t.home.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight transition-colors duration-500 ${
                darkMode ? 'text-white' : ''
              }`}
            >
              Memarlıq və{' '}
              <span className="relative inline-block align-baseline">
                <span className="invisible">{maxWord}</span>
                <span className={`absolute inset-0 bg-gradient-to-r bg-clip-text text-transparent inline-flex items-center transition-colors duration-500 ${
                  darkMode 
                    ? 'from-blue-400 to-blue-200' 
                    : 'from-brand to-blue-700'
                }`}>
                  {typed}
                  <motion.span
                    aria-hidden
                    className={`ml-1 h-[1.2em] w-[3px] inline-block align-[-0.15em] transition-colors duration-500 ${
                      darkMode 
                        ? 'bg-gradient-to-b from-blue-400 to-blue-200' 
                        : 'bg-gradient-to-b from-brand to-blue-700'
                    }`}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
              </span>{' '}
              tikinti həlləri
              <span className="sr-only" aria-live="polite">{rotatingWords[wordIndex]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className={`mt-6 text-lg md:text-xl max-w-2xl leading-relaxed transition-colors duration-500 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {t.home.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full sm:w-auto"
            >
              <a
                href="/portfolio"
                className={`group inline-flex justify-center items-center rounded-xl text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
                    : 'bg-gradient-to-r from-brand to-blue-700'
                }`}
              >
                <span>{t.home.hero.projectsBtn}</span>
                <svg className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="/contact"
                className={`inline-flex justify-center items-center rounded-xl border-2 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold transition-all duration-300 w-full sm:w-auto ${
                  darkMode 
                    ? 'border-slate-600 text-slate-200 hover:border-blue-400 hover:text-blue-300 hover:bg-blue-500/10' 
                    : 'border-slate-200 text-slate-700 hover:border-brand hover:text-brand hover:bg-brand/5'
                }`}
              >
                {t.home.hero.contactBtn}
              </a>
            </motion.div>
          </motion.div>

          <div className="relative">
            <motion.div
              style={{ perspective: "1200px" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div
                className={`relative aspect-[4/3] w-full md:max-w-[680px] ml-0 md:ml-auto overflow-hidden rounded-3xl border-2 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                  darkMode 
                    ? 'border-slate-700/30 bg-gradient-to-br from-slate-800/80 to-slate-900/60' 
                    : 'border-white/20 bg-gradient-to-br from-white/80 to-white/40'
                }`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <motion.div
                  ref={trackRef}
                  className="absolute inset-0 flex items-stretch gap-4 px-3 sm:px-4 touch-pan-y"
                  style={{ x }}
                  drag="x"
                  dragConstraints={{ left: -Infinity, right: Infinity }}
                  dragElastic={0.08}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                >
                  {loop.map((card, i) => (
                    <motion.div
                      key={`hero-card-${i}`}
                      className={`relative h-full w-[75vw] sm:w-[240px] md:w-[280px] shrink-0 overflow-hidden rounded-2xl border shadow-lg transition-colors duration-500 ${
                        darkMode 
                          ? 'border-slate-700/30 bg-slate-800/60' 
                          : 'border-white/30 bg-white/60'
                      }`}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: darkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.15)",
                        rotateY: 5,
                        rotateX: 2
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 75vw, 40vw"
                        className="object-cover"
                        draggable={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-sm md:text-base font-semibold drop-shadow-lg">
                        {card.title}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="absolute -bottom-8 -left-8 hidden md:block rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl px-6 py-4 border border-white/30 shadow-xl"
            >
              <div className="text-sm text-slate-600 mb-1">
                <span ref={expRef} className="font-bold text-brand">0+</span> il təcrübə
              </div>
              <div className="text-base font-semibold text-slate-800">
                <span ref={projRef} className="font-bold text-brand">0+</span> tamamlanmış layihə
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

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
      <PortfolioStrip darkMode={darkMode} />
      <WhyUs darkMode={darkMode} />
    </div>
  );
}

function WhyUs({ darkMode }: { darkMode: boolean }) {
  const { t } = useLanguage();
  const features = [
    {
      title: t.home.whyUs.features.team.title,
      desc: t.home.whyUs.features.team.desc,
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
          <path d="M3 21a9 9 0 0 1 18 0" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: t.home.whyUs.features.delivery.title,
      desc: t.home.whyUs.features.delivery.desc,
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: t.home.whyUs.features.quality.title,
      desc: t.home.whyUs.features.quality.desc,
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2 15 8l6 .9-4.3 4.2L17.5 20 12 17.3 6.5 20l.8-6.9L3 8.9 9 8Z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-700",
    },
    {
      title: t.home.whyUs.features.budget.title,
      desc: t.home.whyUs.features.budget.desc,
      icon: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7h18v10H3Z" />
          <path d="M7 7V5h10v2" />
          <path d="M9 12h6" />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 26 }
    },
  } as const;

  return (
    <section className="relative py-20 md:py-24 overflow-hidden transition-colors duration-500">
      {/* Enhanced background with multiple gradient layers */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900/95' 
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50/40'
      }`}>
        <div className={`absolute top-0 right-0 -mt-32 -mr-32 h-80 w-80 rounded-full blur-3xl animate-pulse transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-600/20 to-blue-500/15' 
            : 'bg-gradient-to-br from-brand/15 to-blue-400/15'
        }`} />
        <div className={`absolute bottom-0 left-0 -mb-32 -ml-32 h-72 w-72 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-tr from-slate-700/30 to-blue-600/10' 
            : 'bg-gradient-to-tr from-slate-200/30 to-brand/10'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-3xl transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-radial from-blue-500/8 to-transparent' 
            : 'bg-gradient-radial from-brand/3 to-transparent'
        }`} />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`inline-flex items-center rounded-full px-8 py-3 mb-8 transition-colors duration-500 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/15' 
                : 'bg-gradient-to-r from-brand/10 to-blue-600/10'
            }`}
          >
            <span className={`text-base md:text-lg font-semibold transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-brand'
            }`}>{t.home.whyUs.badge}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-8">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              darkMode 
                ? 'from-slate-100 via-slate-200 to-slate-100' 
                : 'from-slate-900 via-slate-800 to-slate-900'
            }`}>
              {t.home.whyUs.title1}
            </span>
            <br />
            <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              darkMode 
                ? 'from-blue-400 to-blue-300' 
                : 'from-brand to-blue-700'
            }`}>
              {t.home.whyUs.title2}
            </span>
          </h2>

          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed transition-colors duration-500 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.home.whyUs.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative h-full"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`relative h-full rounded-3xl backdrop-blur-xl border shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                darkMode 
                  ? 'bg-slate-800/80 border-slate-700/30' 
                  : 'bg-white/80 border-white/20'
              }`}>
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 transition-all duration-300 ${
                  darkMode ? 'ring-blue-500/30' : 'ring-brand/20'
                }`} />

                <div className="relative h-full p-8 flex flex-col">
                  <div className="mb-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className={`text-lg md:text-xl font-bold tracking-tight mb-4 transition-colors duration-500 ${
                    darkMode 
                      ? 'text-slate-100 group-hover:text-white' 
                      : 'text-slate-900 group-hover:text-slate-800'
                  }`}>
                    {feature.title}
                  </h3>

                  <p className={`text-sm md:text-base leading-relaxed transition-colors duration-500 flex-1 ${
                    darkMode 
                      ? 'text-slate-300 group-hover:text-slate-200' 
                      : 'text-slate-600 group-hover:text-slate-700'
                  }`}>
                    {feature.desc}
                  </p>

                  {/* Decorative element */}
                  <div className={`absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    darkMode ? 'from-blue-500/10 to-transparent' : 'from-brand/5 to-transparent'
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/about"
            className={`group inline-flex items-center text-base font-semibold transition-colors duration-500 ${
              darkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-brand hover:text-blue-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.home.whyUs.learnMore}
            <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
