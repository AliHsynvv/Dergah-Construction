"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Footer({ darkMode = false }: FooterProps) {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t transition-colors duration-500 bg-slate-900 border-slate-800 text-slate-300">

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Dargah Group.
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t.nav.services}</h3>
            <ul className="space-y-4">
              {[
                { label: t.nav.home, href: "/" },
                { label: t.nav.about, href: "/about" },
                { label: t.nav.catalog, href: "/catalog" },
                { label: t.nav.portfolio, href: "/portfolio" },
                { label: t.nav.contact, href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t.footer.contact}</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">{t.footer.location}</span>
                  <span className="text-slate-300 group-hover:text-white transition-colors">{t.footer.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">{t.contact.info.phone}</span>
                  <a href={`tel:${t.footer.phone}`} className="text-slate-300 group-hover:text-white transition-colors">
                    {t.footer.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">{t.contact.info.email}</span>
                  <a href={`mailto:${t.footer.email}`} className="text-slate-300 group-hover:text-white transition-colors">
                    {t.footer.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t.footer.workHours}</h3>
            <div className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <ul className="space-y-4">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{t.footer.workHoursDetails.weekdays.split(':')[0]}</span>
                  <span className="text-white font-medium">{t.footer.workHoursDetails.weekdays.split(':')[1]}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{t.footer.workHoursDetails.saturday.split(':')[0]}</span>
                  <span className="text-white font-medium">{t.footer.workHoursDetails.saturday.split(':')[1]}</span>
                </li>
                <li className="flex justify-between items-center text-sm pt-2 border-t border-slate-700">
                  <span className="text-slate-400">{t.footer.workHoursDetails.sunday.split(':')[0]}</span>
                  <span className="text-red-400 font-medium">{t.footer.workHoursDetails.sunday.split(':')[1]}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Dargah Group. {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">{t.footer.links.privacy}</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">{t.footer.links.terms}</Link>
            <Link href="/support" className="text-slate-500 hover:text-white transition-colors">{t.footer.links.support}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
