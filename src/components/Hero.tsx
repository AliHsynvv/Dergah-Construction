"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero({ darkMode }: { darkMode: boolean }) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for subtle parallax/gradient effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Scroll Parallax
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center ${darkMode ? "bg-slate-950" : "bg-slate-50"
        }`}
      onMouseMove={handleMouseMove}
      style={{ opacity: opacityHero }}
    >
      {/* Dynamic Background */}
      <BackgroundLayer darkMode={darkMode} mouseX={mouseX} mouseY={mouseY} y={yBackground} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full pt-28 md:pt-32 lg:pt-32 pb-12 lg:pb-0">

        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${darkMode
              ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
              : "border-blue-600/20 bg-blue-600/5 text-blue-700"
              }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${darkMode ? "bg-blue-400" : "bg-blue-600"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${darkMode ? "bg-blue-500" : "bg-blue-600"}`}></span>
            </span>
            {t.home.badge || "Premium Construction"}
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeInUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <span className={`block ${darkMode ? "text-white" : "text-slate-900"}`}>
              {t.home.hero.title1 || "Building"}
            </span>
            <span className="block relative">
              <span className={`absolute -inset-1 blur-2xl opacity-30 ${darkMode ? "bg-blue-600" : "bg-blue-400"}`}></span>
              <span className={`relative bg-clip-text text-transparent bg-gradient-to-r ${darkMode
                ? "from-blue-400 via-blue-200 to-blue-400"
                : "from-blue-700 via-blue-500 to-blue-700"
                } bg-[length:200%_auto] animate-gradient`}>
                {t.home.hero.title2 || "Villas"}
              </span>
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={`text-lg md:text-xl max-w-xl leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"
            }`}>
            {t.home.hero.description || "Experience the epitome of luxury and modern architecture. We craft living spaces that redefine comfort and elegance for the next generation."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                href="/portfolio"
                className={`flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold transition-all ${darkMode
                  ? "bg-white text-slate-950 hover:bg-slate-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
              >
                {t.home.hero.projectsBtn || "View Projects"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/contact"
                className={`flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border transition-all ${darkMode
                  ? "border-slate-700 text-white hover:bg-slate-800"
                  : "border-slate-300 text-slate-900 hover:bg-slate-100"
                  }`}
              >
                {t.home.hero.contactBtn || "Contact Us"}
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Stats / Social Proof */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="pt-8 flex items-center gap-8 border-t border-slate-200/10">
            <div className="flex flex-col">
              <span className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>150+</span>
              <span className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-500"}`}>{t.home.hero.projects || "Projects"}</span>
            </div>
            <div className="w-px h-10 bg-slate-500/20"></div>
            <div className="flex flex-col">
              <span className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>15+</span>
              <span className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-500"}`}>{t.home.hero.experience || "Years Exp."}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual / Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative block w-full aspect-square md:aspect-[4/5] lg:aspect-auto lg:h-full mt-8 lg:mt-0"
        >
          {/* Abstract Shape / Blob */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full blur-[100px] opacity-40 pointer-events-none ${darkMode ? "bg-blue-900" : "bg-blue-200"
            }`} />

          {/* Hero Image Container */}
          <div className="relative w-full h-full lg:h-[600px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out perspective-[1000px]">

            {/* Floating Elements (Parallax) */}
            <ParallaxFloatingImage src="/portfolio/p1.png" alt="Luxury Villa" className="object-cover" />

            {/* Glass Overlay Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className={`absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 p-4 lg:p-6 rounded-2xl backdrop-blur-xl border ${darkMode
                ? "bg-slate-900/60 border-slate-700/50 text-white"
                : "bg-white/60 border-white/50 text-slate-900"
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm font-medium opacity-70">{t.home.hero.featuredProjectLabel || "Featured Project"}</p>
                  <p className="text-base lg:text-lg font-bold">{t.home.hero.featuredProjectTitle || "Sahil Project"}</p>
                </div>
                <button className={`p-3 rounded-full ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator (Hide on mobile usually, or keep if screen is tall enough) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className={`text-xs uppercase tracking-widest ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Scroll</span>
        <div className={`w-[1px] h-12 overflow-hidden ${darkMode ? "bg-slate-800" : "bg-slate-200"}`}>
          <motion.div
            className={`w-full h-1/2 ${darkMode ? "bg-blue-500" : "bg-blue-600"}`}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}

// Sub-components

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

function BackgroundLayer({ darkMode, mouseX, mouseY, y }: { darkMode: boolean; mouseX: MotionValue<number>; mouseY: MotionValue<number>; y: MotionValue<number> }) {
  const bg = useMotionTemplate`radial-gradient(
    800px circle at ${mouseX}px ${mouseY}px,
    ${darkMode ? "rgba(29, 78, 216, 0.15)" : "rgba(37, 99, 235, 0.1)"},
    transparent 80%
  )`;

  return (
    <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
      {/* Grid Pattern */}
      <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? "bg-[url('/grid-dark.svg')]" : "bg-[url('/grid-light.svg')]"}`} />

      {/* Mouse Spotlight */}
      <motion.div className="absolute inset-0 opacity-100" style={{ background: bg }} />
    </motion.div>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35); // Strength of magnet
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxFloatingImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
    </div>
  );
}
