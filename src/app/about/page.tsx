"use client";

import { motion, animate, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const stats = [
    { label: "İl təcrübə", value: 10 },
    { label: "Layihə", value: 100 },
    { label: "Məmnun müştəri", value: 85 },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;
  const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } } } as const;

  function AnimatedStat({ value, label }: { value: number; label: string }) {
    const scopeRef = useRef<HTMLDivElement | null>(null);
    const numRef = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(scopeRef, { once: true, amount: 0.5 });

    useEffect(() => {
      if (!inView || !numRef.current) return;
      const controls = animate(0, value, {
        duration: 1.2,
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
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-5 text-center shadow-sm"
      >
        <div className="text-2xl md:text-3xl font-bold text-slate-900"><span ref={numRef}>0</span>+</div>
        <div className="text-sm text-slate-600">{label}</div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-24 md:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/dergah%20villa.png" alt="About background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 items-start gap-8">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold tracking-tight">
                Haqqımızda
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-3 max-w-2xl text-slate-700">
                Dargah Construction — müasir memarlıq və inşaat həllləri təqdim edən peşəkar komandadır. Keyfiyyət, etibarlılıq və vaxtında təhvil əsas dəyərlərimizdir. Müştəri yönümlü yanaşma ilə dizayn-dan icraya qədər bütün mərhələləri şəffaf şəkildə idarə edirik, təhlükəsizlik standartlarına, material keyfiyyətinə və budcəyə ciddi riayət edirik. Layihələrimizi dayanıqlılıq, estetik və funksionallığın balansı üzərində qururuq.
              </motion.p>

              {/* Inline Timeline directly under text */}
              <div className="mt-6">
                <h2 className="text-base md:text-lg font-semibold tracking-tight mb-3">Yolumuz</h2>
                <div className="relative pl-6 md:pl-8">
                  <div className="absolute left-2 md:left-3 top-0 bottom-0 w-px bg-black/10" />
                  {[
                    { year: "2015", text: "Şirkətin əsası qoyuldu." },
                    { year: "2018", text: "İlk iri yaşayış layihəsi tamamlandı." },
                    { year: "2021", text: "Komersiya portfeli genişləndirildi." },
                    { year: "2024", text: "Daxili dizayn və layihələndirmə xidmətləri gücləndirildi." },
                  ].map((e, i) => (
                    <motion.div key={e.year} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.05 }} className="relative mb-4">
                      <div className="absolute -left-[10px] md:-left-[12px] mt-1 h-2.5 w-2.5 rounded-full bg-brand" />
                      <div className="flex items-start gap-3">
                        <div className="text-xs md:text-sm font-semibold text-slate-900 w-12 md:w-14 shrink-0">{e.year}</div>
                        <div className="text-xs md:text-sm text-slate-700">{e.text}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-md">
              <Image src="/images/dargah%20pro.png" alt="Dargah layihəsi" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Preview - Bizim Heyyət */}
      <section id="komanda" className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Bizim Heyyət</h2>
            <p className="mt-2 text-slate-700">Peşəkar komandamız hər layihəyə maksimum diqqət və qayğı göstərir.</p>
          </div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { title: "Rəhbər", desc: "Layihələrin idarə edilməsi və strateji planlaşdırma", img: "/Team/anr%20last.png", icon: (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4Z"/></svg>
              ) },
              { title: "Memar", desc: "Yaradıcı dizayn həlləri və layihə hazırlanması", img: "/images/mdrn%20interier.webp", icon: (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4 13h16v2H4zm0 4h10v2H4zM14 5l6 6h-6z"/></svg>
              ) },
              { title: "Mühəndis", desc: "Texniki həllər və konstruksiya işləri", img: "/dergah%20villa.png", icon: (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M10 2h4v4h-4zM3 13h4v4H3zM17 13h4v4h-4zM11 18h2v4h-2zM4 7h4v4H4zM16 7h4v4h-4z"/></svg>
              ) },
            ].map((m) => (
              <motion.article key={m.title} variants={item} className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <div className="relative h-48 md:h-56">
                  <Image src={m.img} alt={m.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center">
                    {m.icon}
                  </div>
                </div>
                <div className="pt-8 pb-5 px-5 text-center">
                  <div className="text-lg font-semibold tracking-tight">{m.title}</div>
                  <div className="mt-1 text-slate-700 text-sm">{m.desc}</div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">Missiya, Vizyon, Dəyərlər</h2>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                title: "Missiya",
                text: "Müştərilərimizə yüksək keyfiyyətli, etibarlı və estetik tikinti həllləri təqdim etmək.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z"/></svg>
                ),
              },
              {
                title: "Vizyon",
                text: "Regionda ən etibarlı və yenilikçi inşaat tərəfdaşı olmaq.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 5c-5 0-9 5-9 7s4 7 9 7 9-5 9-7-4-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
                ),
              },
              {
                title: "Dəyərlər",
                text: "Şəffaflıq, məsuliyyət, komanda işi və dayanıqlılıq.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
              },
            ].map((f) => (
              <motion.div key={f.title} variants={item} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {stats.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}


