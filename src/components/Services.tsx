"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
} as const;

type Service = {
  title: string;
  desc: string;
  href?: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Memarlıq",
    desc: "Konseptdən icraya qədər müasir memarlıq həlləri.",
    href: "/portfolio",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4 13h16v2H4zm0 4h10v2H4zM14 5l6 6h-6z"/></svg>
    ),
  },
  {
    title: "İnteryer dizayn",
    desc: "Estetik, funksional və dayanıqlı interyerlər.",
    href: "/portfolio",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4 4h16v4H4zM4 10h10v10H4zM16 10h4v10h-4z"/></svg>
    ),
  },
  {
    title: "İnşaat və təmir",
    desc: "A‑dan Z‑yə icra və təhvil, keyfiyyətə zəmanətlə.",
    href: "/portfolio",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3 14l9-9 3 3-9 9H3v-3zM14 7l3 3 3-3-3-3-3 3z"/></svg>
    ),
  },
  {
    title: "Layihə idarəetməsi",
    desc: "Vaxt, büdcə və resursların effektiv koordinasiyası.",
    href: "/about",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3 12h18v2H3zM3 6h18v2H3zM3 18h18v2H3z"/></svg>
    ),
  },
  {
    title: "Fasad yenilənməsi",
    desc: "Estetik və enerji səmərəli fasad həlləri.",
    href: "/portfolio",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4 4h16v16H4zM8 8h8v8H8z"/></svg>
    ),
  },
  {
    title: "Texniki nəzarət",
    desc: "Standartlara uyğunluğun mütəmadi monitorinqi.",
    href: "/about",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a5 5 0 015 5v3h3v9H4V10h3V7a5 5 0 015-5z"/></svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-12 md:py-16">
      <div className="absolute -z-10 inset-0">
        <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-orange-300/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Xidmətlər</h2>
          <p className="mt-2 text-slate-700">Əsas xidmət istiqamətlərimiz — peşəkar və etibarlı.</p>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s) => (
            <motion.a
              key={s.title}
              variants={item}
              href={s.href}
              className="group relative rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand mb-3">
                {s.icon}
              </div>
              <div className="text-base md:text-lg font-semibold tracking-tight">{s.title}</div>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{s.desc}</p>
              <div className="mt-3 text-xs text-brand opacity-0 group-hover:opacity-100 transition">Daha ətraflı →</div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


