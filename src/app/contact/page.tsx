"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Calendar,
  Building
} from "lucide-react";
import { MessageCircleMore } from "lucide-react";

export default function ContactPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert("Mesajınız göndərildi. Tezliklə əlaqə saxlayacağıq.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Ünvan",
      content: "Bakı, Azərbaycan",
      href: "https://maps.google.com/?q=Baku,+Azerbaijan",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Telefon",
      content: "+994 70 299 99 98",
      href: "tel:+994702999998",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "E-poçt",
      content: "info@dargah.az",
      href: "mailto:info@dargah.az",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "İş saatları",
      content: "B.e.–Cümə: 09:00–18:00, Şənbə: 10:00–16:00",
      gradient: "from-blue-600 to-blue-700"
    }
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

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20">
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
            <MessageCircle className={`h-4 w-4 mr-2 transition-colors duration-500 ${
              darkMode ? 'text-blue-400' : 'text-brand'
            }`} />
            <span className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-brand'
            }`}>Əlaqə</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                  darkMode 
                    ? 'from-slate-100 via-slate-200 to-slate-100' 
                    : 'from-slate-900 via-slate-800 to-slate-900'
                }`}>
                  Bizimlə əlaqə
                </span>
                <br />
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                  darkMode 
                    ? 'from-blue-400 to-blue-300' 
                    : 'from-brand to-blue-700'
                }`}>
                  saxlayın
                </span>
              </h1>

              <p className={`text-lg md:text-xl leading-relaxed mb-8 transition-colors duration-500 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Layihələriniz üçün peşəkar məsləhət və konsultasiya xidmətlərimizdən
                istifadə edin. Sizinlə əməkdaşlıq etməkdən məmnun olarıq.
              </p>

              {/* Quick Contact Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <Phone className="h-5 w-5" />, text: "Zəng edin", action: "tel:+994702999998" },
                  { icon: <Mail className="h-5 w-5" />, text: "E-poçt yazın", action: "mailto:info@dargah.az" },
                  { icon: <MessageCircleMore className="h-5 w-5" />, text: "WhatsApp", action: "https://wa.me/994702999998", gradient: true },
                ].map((option, index) => (
                  <motion.a
                    key={index}
                    href={option.action}
                    target={option.action.startsWith('http') ? '_blank' : undefined}
                    rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border transition-all duration-500 ${
                      option.gradient 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                        : darkMode
                          ? 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-700 hover:border-slate-600 hover:scale-105'
                          : 'bg-white/80 border-slate-200/60 hover:bg-white hover:border-slate-300 hover:scale-105'
                    }`}
                  >
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                      option.gradient 
                        ? 'bg-white/20 text-white' 
                        : darkMode
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-brand/10 text-brand'
                    }`}>
                      {option.icon}
                    </div>
                    <span className={`text-sm font-medium ${
                      option.gradient 
                        ? 'text-white' 
                        : darkMode
                          ? 'text-slate-200 group-hover:text-white'
                          : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {option.text}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative rounded-2xl backdrop-blur-xl border shadow-lg hover:shadow-xl transition-all duration-500 p-6 ${
                    info.href ? 'cursor-pointer' : ''
                  } ${
                    darkMode 
                      ? 'bg-slate-800/90 border-slate-700/20' 
                      : 'bg-white/90 border-white/20'
                  }`}
                  onClick={() => info.href && window.open(info.href, '_blank')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${info.gradient} shadow-lg`}>
                      <div className="text-white">
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-1 transition-colors duration-500 ${
                        darkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}>{info.title}</h3>
                      <p className={`transition-colors duration-300 ${
                        darkMode 
                          ? `text-slate-300 ${info.href ? 'group-hover:text-blue-400' : ''}` 
                          : `text-slate-600 ${info.href ? 'group-hover:text-brand' : ''}`
                      }`}>
                        {info.content}
                      </p>
                    </div>
                    {info.href && (
                      <ArrowRight className={`h-5 w-5 group-hover:translate-x-1 transition-all duration-300 ${
                        darkMode 
                          ? 'text-slate-500 group-hover:text-blue-400' 
                          : 'text-slate-400 group-hover:text-brand'
                      }`} />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
        </motion.div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                    darkMode 
                      ? 'from-slate-100 to-slate-200' 
                      : 'from-slate-900 to-slate-700'
                  }`}>
                    Mesaj göndərin
                  </span>
                </h2>
                <p className={`transition-colors duration-500 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Layihəniz haqqında məlumat verin, peşəkar komandamız sizinlə əlaqə saxlayacaq.
                </p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      darkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-xl border-2 backdrop-blur-md px-4 py-3 text-sm focus:outline-none focus:ring-2 shadow-sm hover:shadow-md transition-all duration-500 ${
                        darkMode 
                          ? 'border-slate-700 bg-slate-800/80 text-slate-100 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-slate-400' 
                          : 'border-slate-200 bg-white/80 text-slate-900 focus:ring-brand/50 focus:border-brand/50 placeholder:text-slate-400'
                      }`}
                      placeholder="Adınızı daxil edin"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      darkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      E-poçt <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-xl border-2 backdrop-blur-md px-4 py-3 text-sm focus:outline-none focus:ring-2 shadow-sm hover:shadow-md transition-all duration-500 ${
                        darkMode 
                          ? 'border-slate-700 bg-slate-800/80 text-slate-100 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-slate-400' 
                          : 'border-slate-200 bg-white/80 text-slate-900 focus:ring-brand/50 focus:border-brand/50 placeholder:text-slate-400'
                      }`}
                      placeholder="name@example.com"
                    />
                  </div>
        </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    darkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Mövzu <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-xl border-2 backdrop-blur-md px-4 py-3 text-sm focus:outline-none focus:ring-2 shadow-sm hover:shadow-md transition-all duration-500 ${
                      darkMode 
                        ? 'border-slate-700 bg-slate-800/80 text-slate-100 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-slate-400' 
                        : 'border-slate-200 bg-white/80 text-slate-900 focus:ring-brand/50 focus:border-brand/50 placeholder:text-slate-400'
                    }`}
                    placeholder="Layihə mövzusu"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    darkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    Mesaj <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full rounded-xl border-2 backdrop-blur-md px-4 py-3 text-sm focus:outline-none focus:ring-2 shadow-sm hover:shadow-md transition-all duration-500 resize-none ${
                      darkMode 
                        ? 'border-slate-700 bg-slate-800/80 text-slate-100 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-slate-400' 
                        : 'border-slate-200 bg-white/80 text-slate-900 focus:ring-brand/50 focus:border-brand/50 placeholder:text-slate-400'
                    }`}
                    placeholder="Layihə təfərrüatlarını və suallarınızı yazın..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group inline-flex items-center gap-3 rounded-xl text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
                      : 'bg-gradient-to-r from-brand to-blue-700'
                  } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Göndərilir...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      <span>Mesaj göndər</span>
                    </>
                  )}
              </motion.button>
            </motion.form>
          </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                    darkMode 
                      ? 'from-slate-100 to-slate-200' 
                      : 'from-slate-900 to-slate-700'
                  }`}>
                    Yerləşməmiz
                  </span>
                </h2>
                <p className={`transition-colors duration-500 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Ofisimizə baş çəkmək və ya görüş təyin etmək üçün xəritədən istifadə edin.
                </p>
              </div>

              <motion.div
                className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
                  darkMode 
                    ? 'border-slate-700/20 bg-gradient-to-br from-slate-800/80 to-slate-700/40' 
                    : 'border-white/20 bg-gradient-to-br from-white/80 to-white/40'
                }`}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <iframe
                  title="Dargah Construction Yerləşməsi"
                  src="https://www.google.com/maps?q=Baku%2C%20Azerbaijan&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-96 w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="tel:+994702999998"
                  className={`group flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border hover:scale-105 transition-all duration-500 ${
                    darkMode 
                      ? 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-700 hover:border-slate-600' 
                      : 'bg-white/80 border-slate-200/60 hover:bg-white hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className={`text-xs transition-colors duration-500 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>Zəng edin</div>
                    <div className={`text-sm font-medium transition-colors duration-500 ${
                      darkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>+994 70 299 99 98</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@dargah.az"
                  className={`group flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border hover:scale-105 transition-all duration-500 ${
                    darkMode 
                      ? 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-700 hover:border-slate-600' 
                      : 'bg-white/80 border-slate-200/60 hover:bg-white hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className={`text-xs transition-colors duration-500 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>E-poçt yazın</div>
                    <div className={`text-sm font-medium transition-colors duration-500 ${
                      darkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>info@dargah.az</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}


