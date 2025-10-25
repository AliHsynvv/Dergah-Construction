"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Project = {
  title: string;
  category: string;
  desc: string;
  img: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "modern-villa-kompleksi",
    title: "Modern Villa Kompleksi",
    category: "Villa",
    desc: "Lüks villa tasarımı ve inşaatı",
    img: "/portfolio/vl1.png",
    featured: true
  },
  {
    id: "klasik-villa",
    title: "Klasik Villa",
    category: "Villa",
    desc: "Geleneksel mimari ile modern konfor",
    img: "/portfolio/vl2.png",
    featured: true
  },
  {
    id: "ofis-kompleksi",
    title: "Ofis Kompleksi",
    category: "Ofis",
    desc: "Çalışma alanları için profesyonel tasarım",
    img: "/portfolio/pr2.png"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
} as const;

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("all");
  const [darkMode, setDarkMode] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

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

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.category === filter);

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>

      <section className={`relative pt-32 md:pt-36 pb-16 md:pb-20 transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900/95' 
          : 'bg-gradient-to-br from-white via-slate-50 to-blue-50/30'
      }`}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div style={{ y: y1 }}>
            {/* Header */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className={`inline-flex items-center rounded-full px-4 py-1.5 mb-4 transition-colors duration-500 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/15' 
                  : 'bg-gradient-to-r from-brand/10 to-blue-600/10'
              }`}
            >
              <span className={`text-xs font-medium transition-colors duration-500 ${
                darkMode ? 'text-blue-300' : 'text-brand'
              }`}>Portfolio</span>
            </motion.div>

            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                darkMode 
                  ? 'from-slate-100 via-slate-200 to-slate-100' 
                  : 'from-slate-900 via-slate-800 to-slate-900'
              }`}>
                Uğur dolu
              </span>{' '}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                darkMode 
                  ? 'from-blue-400 to-blue-300' 
                  : 'from-brand to-blue-700'
              }`}>
                Layihələrimiz
              </span>
            </h1>

            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Mükəmməlliyə olan bağlılığımızla həyata keçirdiyimiz yaşayış və kommersiya layihələrini kəşf edin.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  filter === category
                    ? darkMode
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-gradient-to-r from-brand to-blue-700 text-white shadow-lg shadow-brand/25 scale-105"
                    : darkMode
                      ? "bg-slate-800/80 backdrop-blur-md text-slate-200 border-2 border-slate-700/60 hover:bg-slate-700 hover:border-slate-600 hover:scale-105"
                      : "bg-white/80 backdrop-blur-md text-slate-700 border-2 border-slate-200/60 hover:bg-white hover:border-slate-300 hover:scale-105"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === "all" ? "Hamısı" : category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={item}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                  project.featured
                    ? darkMode
                      ? "border-blue-500/30 bg-slate-800/90 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
                      : "border-brand/30 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl"
                    : darkMode
                      ? "border-slate-700/60 bg-slate-800/80 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-slate-700/20"
                      : "border-slate-200/60 bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl"
                }`}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-500 ${
                      project.featured
                        ? darkMode
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                          : "bg-gradient-to-r from-brand to-blue-700 text-white shadow-lg"
                        : darkMode
                          ? "bg-slate-800/90 backdrop-blur-md text-slate-200 shadow-sm"
                          : "bg-white/90 backdrop-blur-md text-slate-800 shadow-sm"
                    }`}>
                      {project.category}
                    </span>
          </div>
                </div>

                <div className="p-5 md:p-6">
                  <h3 className={`text-lg md:text-xl font-bold tracking-tight mb-2 transition-colors duration-300 ${
                    darkMode 
                      ? 'text-slate-100 group-hover:text-blue-400' 
                      : 'text-slate-900 group-hover:text-brand'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed line-clamp-3 transition-colors duration-500 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.desc}
                  </p>

                  {/* Hover Action */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/portfolio/${project.id}`}
                      className={`inline-flex items-center text-sm font-medium transition-colors ${
                        darkMode 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-brand hover:text-blue-700'
                      }`}
                    >
                      Daha çox məlumat
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}


