"use client";

import { motion, animate, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Users,
  Heart,
  Target,
  Eye,
  Shield,
  Award,
  Clock,
  Calendar,
  Building2,
  Home,
  TrendingUp,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
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

  const stats = [
    { label: t.about.stats.experience, value: 10, icon: <Calendar className="h-5 w-5" />, gradient: "from-blue-500 to-blue-600" },
    { label: t.about.stats.projects, value: 100, icon: <Building2 className="h-5 w-5" />, gradient: "from-emerald-500 to-emerald-600" },
    { label: t.about.stats.clients, value: 85, icon: <Heart className="h-5 w-5" />, gradient: "from-rose-500 to-pink-600" },
  ];

  function AnimatedStat({ value, label, icon, gradient, darkMode }: { value: number; label: string; icon: React.ReactNode; gradient: string; darkMode: boolean }) {
    const scopeRef = useRef<HTMLDivElement | null>(null);
    const numRef = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(scopeRef, { once: true, amount: 0.5 });

    useEffect(() => {
      if (!inView || !numRef.current) return;
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (numRef.current) numRef.current.textContent = `${Math.floor(v)}`;
        },
      });
      return () => controls.stop();
    }, [inView, value]);

    return (
      <motion.div
        ref={scopeRef}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`group relative rounded-2xl backdrop-blur-xl border shadow-lg hover:shadow-xl transition-all duration-500 p-8 text-center overflow-hidden ${darkMode
          ? 'bg-slate-800/80 border-slate-700/50 hover:border-blue-500/30'
          : 'bg-white/80 border-white/60 hover:border-blue-200'
          }`}
        whileHover={{ y: -4 }}
      >
        {/* Animated Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Glow Blob */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

        <div className="relative">
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-500`}>
            <div className="text-white">
              {icon}
            </div>
          </div>

          <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
            <span ref={numRef} className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${darkMode
              ? 'from-white to-slate-300'
              : 'from-slate-900 to-slate-700'
              }`}>0</span>
            <span className={`transition-colors duration-500 ${darkMode ? 'text-blue-400' : 'text-brand'
              }`}>+</span>
          </div>

          <div className={`text-sm md:text-base font-medium transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>{label}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}>

      {/* Premium Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${darkMode ? 'bg-blue-900/40' : 'bg-blue-200/60'}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-all duration-1000 ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-200/50'}`} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24">
        <motion.div
          className="mx-auto max-w-7xl px-6"
          style={{ y: y1, opacity }}
        >
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`inline-flex items-center rounded-full px-4 py-1.5 mb-8 border transition-all duration-500 ${darkMode
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'bg-blue-50 border-blue-200 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
              }`}
          >
            <span className="text-xs font-semibold tracking-wide uppercase">{t.about.badge}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${darkMode
                  ? 'from-white via-blue-100 to-blue-300'
                  : 'from-slate-900 via-blue-900 to-blue-700'
                  }`}>
                  {t.about.title1}
                </span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${darkMode
                  ? 'from-blue-400 to-blue-200'
                  : 'from-brand to-blue-500'
                  }`}>
                  {t.about.title2}
                </span>
              </h1>

              <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-8 px-4 sm:px-0 transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                {t.about.description}
              </p>

              {/* Key Points */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
                {[
                  { icon: <Shield className="h-5 w-5" />, text: t.about.keyPoints.quality },
                  { icon: <Clock className="h-5 w-5" />, text: t.about.keyPoints.onTime },
                  { icon: <Handshake className="h-5 w-5" />, text: t.about.keyPoints.transparent },
                  { icon: <Award className="h-5 w-5" />, text: t.about.keyPoints.certified },
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="flex items-center gap-3 group"
                  >
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 shadow-md ${darkMode
                      ? 'bg-gradient-to-br from-blue-600/20 to-blue-500/10 text-blue-400 group-hover:from-blue-600/30'
                      : 'bg-white text-brand shadow-blue-900/5 group-hover:shadow-blue-900/10'
                      }`}>
                      {point.icon}
                    </div>
                    <span className={`text-sm font-semibold transition-colors duration-500 ${darkMode ? 'text-slate-200' : 'text-slate-700'
                      }`}>{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              {/* Decorative elements behind image */}
              <div className={`absolute -inset-4 rounded-[2rem] opacity-30 blur-2xl transition-all duration-1000 ${darkMode ? 'bg-blue-600' : 'bg-blue-400'}`} />

              <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden border transition-all duration-500 shadow-2xl ${darkMode
                ? 'border-white/10'
                : 'border-white/60'
                }`}>
                <Image
                  src="/images/dargah%20pro.png"
                  alt="Dargah layihəsi"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${darkMode
                ? 'from-white to-blue-200'
                : 'from-slate-900 to-blue-800'
                }`}>
                {t.about.timeline.title}
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
              {t.about.timeline.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.15 }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-0.5 transition-colors duration-500 ${darkMode
              ? 'bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0'
              : 'bg-gradient-to-b from-blue-600/0 via-blue-600/20 to-blue-600/0'
              }`} />

            <div className="space-y-12 md:space-y-20">
              {[
                {
                  year: t.about.timeline.milestones[0].year,
                  title: t.about.timeline.milestones[0].title,
                  desc: t.about.timeline.milestones[0].desc,
                  icon: <Building2 className="h-5 w-5" />,
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  year: t.about.timeline.milestones[1].year,
                  title: t.about.timeline.milestones[1].title,
                  desc: t.about.timeline.milestones[1].desc,
                  icon: <Home className="h-5 w-5" />,
                  gradient: "from-emerald-500 to-emerald-600"
                },
                {
                  year: t.about.timeline.milestones[2].year,
                  title: t.about.timeline.milestones[2].title,
                  desc: t.about.timeline.milestones[2].desc,
                  icon: <TrendingUp className="h-5 w-5" />,
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  year: t.about.timeline.milestones[3].year,
                  title: t.about.timeline.milestones[3].title,
                  desc: t.about.timeline.milestones[3].desc,
                  icon: <Lightbulb className="h-5 w-5" />,
                  gradient: "from-blue-600 to-blue-700"
                },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative flex items-center gap-8 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:flex-row`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] transform md:-translate-x-2 z-10" />

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />

                  {/* Content Card */}
                  <div className={`flex-1 w-full pl-12 md:pl-0 ${index % 2 === 0 ? 'md:mr-0' : 'md:ml-0'}`}>
                    <div className={`relative p-8 rounded-3xl backdrop-blur-xl border shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden ${darkMode
                      ? 'bg-slate-800/80 border-slate-700/50 hover:border-blue-500/30'
                      : 'bg-white/90 border-white/60 hover:border-blue-200'
                      }`}
                    >
                      {/* Card Hover Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${milestone.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      <div className="relative">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${milestone.gradient} shadow-lg text-white`}>
                            {milestone.icon}
                          </div>
                          <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${milestone.gradient}`}>
                            {milestone.year}
                          </span>
                        </div>

                        <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                          {milestone.title}
                        </h3>

                        <p className={`leading-relaxed transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${darkMode
                ? 'from-white to-blue-200'
                : 'from-slate-900 to-blue-800'
                }`}>
                {t.about.values.title}
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
              {t.about.values.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.15 }}
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: t.about.values.mission.title,
                text: t.about.values.mission.text,
                icon: <Target className="h-6 w-6" />,
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-blue-100"
              },
              {
                title: t.about.values.vision.title,
                text: t.about.values.vision.text,
                icon: <Eye className="h-6 w-6" />,
                gradient: "from-emerald-500 to-emerald-600",
                bgGradient: "from-emerald-50 to-emerald-100"
              },
              {
                title: t.about.values.coreValues.title,
                text: t.about.values.coreValues.text,
                icon: <Users className="h-6 w-6" />,
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-purple-100"
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                viewport={{ once: true }}
                className={`group relative rounded-[2rem] border shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col ${darkMode
                  ? 'bg-slate-800/80 border-slate-700/50 hover:border-blue-500/30'
                  : 'bg-white/80 border-white/60 hover:border-blue-200'
                  }`}
                whileHover={{ y: -8 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative p-10 flex-1 flex flex-col">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg mb-8 transform group-hover:scale-110 transition-transform duration-500`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                    {item.title}
                  </h3>

                  <p className={`leading-relaxed text-base transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background Blob for stats */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 pointer-events-none ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`} />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${darkMode
                ? 'from-white to-blue-200'
                : 'from-slate-900 to-blue-800'
                }`}>
                {t.about.statsSection.title}
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto text-lg transition-colors duration-500 ${darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
              {t.about.statsSection.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} gradient={stat.gradient} darkMode={darkMode} />
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}


