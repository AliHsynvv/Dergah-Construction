"use client";

import { motion, animate, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Users,
  TrendingUp,
  Heart,
  Target,
  Eye,
  Shield,
  Award,
  Clock,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Building2,
  Lightbulb,
  Handshake,
  Home
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
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

  const stats = [
    { label: "İl təcrübə", value: 10, icon: <Calendar className="h-5 w-5" />, gradient: "from-blue-500 to-blue-600" },
    { label: "Layihə", value: 100, icon: <Building2 className="h-5 w-5" />, gradient: "from-emerald-500 to-emerald-600" },
    { label: "Məmnun müştəri", value: 85, icon: <Heart className="h-5 w-5" />, gradient: "from-rose-500 to-pink-600" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  } as const;

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  } as const;

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
        className={`group relative rounded-2xl backdrop-blur-xl border shadow-lg hover:shadow-xl transition-all duration-500 p-8 text-center ${
          darkMode 
            ? 'bg-slate-800/90 border-slate-700/20' 
            : 'bg-white/90 border-white/20'
        }`}
        whileHover={{ y: -4 }}
      >
        {/* Gradient background overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

        <div className="relative">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}>
            <div className="text-white">
              {icon}
            </div>
          </div>

          <div className="text-3xl md:text-4xl font-bold mb-2">
            <span ref={numRef} className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              darkMode 
                ? 'from-slate-100 to-slate-200' 
                : 'from-slate-900 to-slate-700'
            }`}>0</span>
            <span className={`transition-colors duration-500 ${
              darkMode ? 'text-blue-400' : 'text-brand'
            }`}>+</span>
          </div>

          <div className={`text-sm md:text-base font-medium transition-colors duration-500 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>{label}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>

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
            className={`inline-flex items-center rounded-full px-6 py-2 mb-8 transition-colors duration-500 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/15' 
                : 'bg-gradient-to-r from-brand/10 to-blue-600/10'
            }`}
          >
            <span className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-brand'
            }`}>Haqqımızda</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                  darkMode 
                    ? 'from-slate-100 via-slate-200 to-slate-100' 
                    : 'from-slate-900 via-slate-800 to-slate-900'
                }`}>
                  Peşəkar komanda
                </span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                  darkMode 
                    ? 'from-blue-400 to-blue-300' 
                    : 'from-brand to-blue-700'
                }`}>
                  ilə mükəmməllik
                </span>
              </h1>

              <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 px-4 sm:px-0 transition-colors duration-500 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Dargah Construction — müasir memarlıq və inşaat həllləri təqdim edən peşəkar komandadır.
                Keyfiyyət, etibarlılıq və vaxtında təhvil əsas dəyərlərimizdir.
              </p>

              {/* Key Points */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Shield className="h-5 w-5" />, text: "Keyfiyyət zəmanəti" },
                  { icon: <Clock className="h-5 w-5" />, text: "Vaxtında təhvil" },
                  { icon: <Handshake className="h-5 w-5" />, text: "Şəffaf qiymətlər" },
                  { icon: <Award className="h-5 w-5" />, text: "Sertifikatlı komanda" },
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-500 ${
                      darkMode 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-brand/10 text-brand'
                    }`}>
                      {point.icon}
                      </div>
                    <span className={`text-sm font-medium transition-colors duration-500 ${
                      darkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>{point.text}</span>
                    </motion.div>
                  ))}
                </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-2 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                darkMode 
                  ? 'border-slate-700/20 bg-gradient-to-br from-slate-800/80 to-slate-700/40' 
                  : 'border-white/20 bg-gradient-to-br from-white/80 to-white/40'
              }`}>
                <Image
                  src="/images/dargah%20pro.png"
                  alt="Dargah layihəsi"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                darkMode 
                  ? 'from-slate-100 to-slate-200' 
                  : 'from-slate-900 to-slate-700'
              }`}>
                İnkişaf yolumuz
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Dargah Construction-ın uğur hekayəsi və böyümə mərhələləri
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.12, delayChildren: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-0.5 transition-colors duration-500 ${
              darkMode 
                ? 'bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20' 
                : 'bg-gradient-to-b from-brand/20 via-brand/40 to-brand/20'
            }`} />

            <div className="space-y-8 md:space-y-12">
              {[
                {
                  year: "2015",
                  title: "Təməl atıldı",
                  desc: "Şirkətimiz inşaat sektorunda fəaliyyətə başladı",
                  icon: <Building2 className="h-5 w-5" />,
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  year: "2018",
                  title: "İlk iri layihə",
                  desc: "Premium yaşayış kompleksi uğurla tamamlandı",
                  icon: <Home className="h-5 w-5" />,
                  gradient: "from-emerald-500 to-emerald-600"
                },
                {
                  year: "2021",
                  title: "Komersiya genişlənməsi",
                  desc: "Ofis və ticarət mərkəzləri portfeli genişləndirildi",
                  icon: <TrendingUp className="h-5 w-5" />,
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  year: "2024",
                  title: "Tam xidmət spektrumu",
                  desc: "Daxili dizayn və layihələndirmə xidmətləri əlavə edildi",
                  icon: <Lightbulb className="h-5 w-5" />,
                  gradient: "from-blue-600 to-blue-700"
                },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              viewport={{ once: true }}
                  className={`relative flex items-center gap-6 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${milestone.gradient} shadow-lg transform md:-translate-x-2 z-10`} />

                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 p-6 md:p-8 rounded-2xl backdrop-blur-xl border shadow-lg hover:shadow-xl transition-all duration-500 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    } ${
                      darkMode 
                        ? 'bg-slate-800/90 border-slate-700/20' 
                        : 'bg-white/90 border-white/20'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${milestone.gradient} shadow-lg mb-4`}>
                      <div className="text-white">
                        {milestone.icon}
                  </div>
                </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full transition-colors duration-500 ${
                        darkMode 
                          ? 'text-blue-400 bg-blue-500/20' 
                          : 'text-brand bg-brand/10'
                      }`}>
                        {milestone.year}
                      </span>
                </div>

                    <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-500 ${
                      darkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {milestone.title}
                    </h3>

                    <p className={`leading-relaxed transition-colors duration-500 ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {milestone.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                darkMode 
                  ? 'from-slate-100 to-slate-200' 
                  : 'from-slate-900 to-slate-700'
              }`}>
                Missiya, Vizyon və Dəyərlər
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Şirkətimizin əsas prinsipləri və gələcəyə baxışı
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.12, delayChildren: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                title: "Missiya",
                text: "Müştərilərimizə yüksək keyfiyyətli, etibarlı və estetik tikinti həllləri təqdim etmək. Hər bir layihəni unikal ehtiyaclara uyğun şəkildə həyata keçirmək.",
                icon: <Target className="h-6 w-6" />,
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-blue-100"
              },
              {
                title: "Vizyon",
                text: "Regionda ən etibarlı və yenilikçi inşaat tərəfdaşı olmaq. Sektorun standartlarını müəyyən edən lider şirkət kimi tanınmaq.",
                icon: <Eye className="h-6 w-6" />,
                gradient: "from-emerald-500 to-emerald-600",
                bgGradient: "from-emerald-50 to-emerald-100"
              },
              {
                title: "Dəyərlər",
                text: "Şəffaflıq, məsuliyyət, komanda işi və dayanıqlılıq. Müştərilərimizlə uzunmüddətli əməkdaşlıq qurmağa və sektorun inkişafına töhfə verməyə inanırıq.",
                icon: <Users className="h-6 w-6" />,
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-purple-100"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              viewport={{ once: true }}
                className={`group relative rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                  darkMode 
                    ? 'bg-gradient-to-br from-slate-800/90 to-slate-700/60 border-slate-700/20' 
                    : `bg-gradient-to-br ${item.bgGradient} border-white/20`
                }`}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative p-8">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg mb-6`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className={`text-xl md:text-2xl font-bold mb-4 transition-colors duration-500 ${
                    darkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`leading-relaxed transition-colors duration-500 ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
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
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                darkMode 
                  ? 'from-slate-100 to-slate-200' 
                  : 'from-slate-900 to-slate-700'
              }`}>
                Rəqəmlərlə Dargah
              </span>
            </h2>
            <p className={`max-w-2xl mx-auto transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Uğurlarımız və nailiyyətlərimiz rəqəmlərdə
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.12, delayChildren: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} gradient={stat.gradient} darkMode={darkMode} />
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}


