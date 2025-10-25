"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <footer className="relative mt-20 overflow-hidden transition-colors duration-500">
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900/95' 
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30'
      }`}>
        <div className={`absolute top-0 left-0 -mt-40 -ml-40 h-80 w-80 rounded-full blur-3xl transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-600/15 to-blue-500/10' 
            : 'bg-gradient-to-br from-brand/10 to-blue-400/10'
        }`} />
        <div className={`absolute bottom-0 right-0 -mb-40 -mr-40 h-72 w-72 rounded-full blur-3xl transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-tr from-slate-700/20 to-blue-600/5' 
            : 'bg-gradient-to-tr from-slate-200/20 to-brand/5'
        }`} />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src="/dergah-logo.png"
                    alt="Dargah Construction"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
                  darkMode 
                    ? 'from-blue-400 to-blue-200' 
                    : 'from-slate-900 to-slate-700'
                }`}>
                  Dargah Construction
                </h3>
                <p className={`text-sm transition-colors duration-500 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>{t.footer.tagline}</p>
              </div>
            </div>

            <p className={`leading-relaxed mb-6 max-w-md transition-colors duration-500 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.footer.description}
            </p>

            <div className="flex items-center gap-4">
              {[
                {
                  icon: Instagram,
                  href: "#",
                  label: "Instagram",
                  gradient: "from-pink-500 to-purple-600"
                },
                {
                  icon: Linkedin,
                  href: "#",
                  label: "LinkedIn",
                  gradient: "from-blue-600 to-blue-800"
                },
                {
                  icon: Mail,
                  href: "mailto:info@dargah.az",
                  label: "Email",
                  gradient: "from-slate-600 to-slate-800"
                }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${social.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className={`text-lg font-semibold mb-6 transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>{t.footer.contact}</h4>

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  content: t.footer.address,
                  href: "https://maps.google.com/?q=Baku,+Azerbaijan"
                },
                {
                  icon: Phone,
                  content: t.footer.phone,
                  href: "tel:+994702999998"
                },
                {
                  icon: Mail,
                  content: t.footer.email,
                  href: "mailto:info@dargah.az"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${index === 0 ? 'from-blue-500 to-blue-600' : index === 1 ? 'from-emerald-500 to-emerald-600' : 'from-purple-500 to-purple-600'} text-white shadow-sm`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    {item.href ? (
                      <a
                        href={item.href}
                        className={`font-medium transition-colors duration-500 ${
                          darkMode 
                            ? 'text-slate-200 hover:text-blue-400' 
                            : 'text-slate-700 hover:text-brand'
                        }`}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span className={`font-medium transition-colors duration-500 ${
                        darkMode ? 'text-slate-200' : 'text-slate-700'
                      }`}>{item.content}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              <div className={`pt-4 border-t transition-colors duration-500 ${
                darkMode ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className={`h-4 w-4 transition-colors duration-500 ${
                    darkMode ? 'text-blue-400' : 'text-brand'
                  }`} />
                  <span className={`font-semibold transition-colors duration-500 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>{t.footer.workHours}</span>
                </div>
                <div className={`space-y-1 text-sm ml-6 transition-colors duration-500 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <div>{t.footer.workHoursDetails.weekdays}</div>
                  <div>{t.footer.workHoursDetails.saturday}</div>
                  <div>{t.footer.workHoursDetails.sunday}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div variants={itemVariants}>
            <h4 className={`text-lg font-semibold mb-6 transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>{t.footer.location}</h4>
            <motion.div
              className={`overflow-hidden rounded-2xl border shadow-lg transition-all duration-500 ${
                darkMode 
                  ? 'border-slate-700 bg-slate-800' 
                  : 'border-slate-200 bg-white'
              }`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <iframe
                title="Dargah Location"
                src="https://www.google.com/maps?q=Baku%2C%20Azerbaijan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-48 md:h-56 w-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className={`mt-12 pt-8 border-t transition-colors duration-500 ${
            darkMode ? 'border-slate-700' : 'border-slate-200'
          }`}
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              className={`text-sm transition-colors duration-500 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              © {currentYear} Dargah Construction. {t.footer.copyright}
            </motion.div>

            <div className="flex items-center gap-6">
              {[
                { label: t.footer.links.privacy, href: "#" },
                { label: t.footer.links.terms, href: "#" },
                { label: t.footer.links.support, href: "#" }
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`text-sm relative group transition-colors duration-500 ${
                    darkMode 
                      ? 'text-slate-300 hover:text-blue-400' 
                      : 'text-slate-600 hover:text-brand'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}



