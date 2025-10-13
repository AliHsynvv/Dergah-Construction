"use client";

import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";

function PortfolioStrip() {
  const items = [
    "/portfolio/p1.png",
    "/portfolio/pr2.png",
    "/portfolio/pr3.png",
    "/portfolio/vl1.png",
    "/portfolio/vl2.png",
  ];
  const slides = [...items, ...items];
  return (
    <section id="portfolio" className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Portfolio</h2>
          <a href="/portfolio" className="text-sm text-brand hover:underline">Hamısına bax</a>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-3 will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            {slides.map((src, i) => (
              <div key={i} className="relative h-28 md:h-36 w-[75vw] sm:w-[220px] md:w-[280px] shrink-0 rounded-xl overflow-hidden bg-white/40 backdrop-blur border border-black/10 shadow-md">
            <Image
                  src={src}
                  alt={`Portfolio ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20px 20px, rgba(249, 115, 22, 0.15) 2px, transparent 2px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
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
    <section className="relative w-full pt-24 pb-24 md:pt-28 md:pb-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              Memarlıq və tikintidə{' '}
              <span className="relative inline-block align-baseline">
                <span className="invisible">{maxWord}</span>
                <span className="absolute inset-0 text-brand inline-flex items-center">
                  {typed}
                  <span
            aria-hidden
                    className="ml-[1px] h-[1em] w-[2px] bg-brand inline-block align-[-0.15em] animate-pulse"
                  />
                </span>
              </span>{' '}
              həllər
              <span className="sr-only" aria-live="polite">{rotatingWords[wordIndex]}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mt-4 text-base md:text-lg text-slate-600 max-w-prose"
            >
              Dargah Construction — yaşayış və kommersiya layihələri üçün planlaşdırma,
              dizayn və yüksək keyfiyyətli inşaat xidmətləri təqdim edir.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="/portfolio"
                className="inline-flex justify-center items-center rounded-xl bg-brand text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:opacity-90 transition w-full sm:w-auto"
              >
                Layihələrimiz
        </a>
        <a
                href="/contact"
                className="inline-flex justify-center items-center rounded-xl border border-black/10 text-slate-800 px-5 py-2.5 text-sm font-medium hover:border-black/20 transition w-full sm:w-auto"
              >
                Bizimlə əlaqə
              </a>
            </motion.div>
          </div>
          <div className="relative">
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[4/3] w-full md:max-w-[680px] ml-0 md:ml-auto overflow-hidden rounded-2xl border border-black/10 shadow-lg bg-white/60 backdrop-blur"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <motion.div
                  ref={trackRef}
                  className="absolute inset-0 flex items-stretch gap-3 px-2 sm:px-3 touch-pan-y"
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
                      className="relative h-full w-[78vw] sm:w-[240px] md:w-[280px] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white/40 shadow-md"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 80vw, 40vw"
                        className="object-cover"
                        draggable={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white text-xs md:text-sm font-medium drop-shadow">
                        {card.title}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              className="absolute -bottom-6 -left-6 hidden md:block rounded-xl bg-white px-4 py-3 border border-black/5 shadow-sm"
            >
              <div className="text-xs text-slate-600"><span ref={expRef}>0+</span> il təcrübə</div>
              <div className="text-sm font-medium"><span ref={projRef}>0+</span> tamamlanmış layihə</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-white">
      <Hero />
      <PortfolioStrip />
      <WhyUs />
    </div>
  );
}

function WhyUs() {
  const features = [
    {
      title: "Peşəkar komanda",
      desc: "Təcrübəli memarlar və ustalarla layihələriniz təhlükəsiz əllərdədir.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
          <path d="M3 21a9 9 0 0 1 18 0" />
        </svg>
      ),
    },
    {
      title: "Zamanında təslim",
      desc: "Dəqiq planlama ilə işlər vaxtında və səmərəli tamamlanır.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      title: "Yüksək keyfiyyət",
      desc: "Material və icrada premium standartlara sadiqik.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2 15 8l6 .9-4.3 4.2L17.5 20 12 17.3 6.5 20l.8-6.9L3 8.9 9 8Z" />
        </svg>
      ),
    },
    {
      title: "Şəffaf büdcə",
      desc: "Aydın smeta və xərclər — sürprizlərsiz proses.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 7h18v10H3Z" />
          <path d="M7 7V5h10v2" />
          <path d="M9 12h6" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
  } as const;

  return (
    <section className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-brand/5 via-white to-brand/10">
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-orange-300/10 blur-3xl" />

          <div className="px-6 py-8 md:px-10 md:py-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Niyə biz?</h2>
              <p className="mt-1 text-slate-600 text-sm md:text-base">Etibarlı tərəfdaşınız — planlamadan təhvilə qədər.</p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  variants={itemVariants}
                  className="group relative rounded-2xl border border-black/10 bg-white/70 backdrop-blur hover:bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-brand/30 transition" />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10">
                        {f.icon}
                      </div>
                      <h3 className="text-sm md:text-base font-semibold tracking-tight">{f.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
