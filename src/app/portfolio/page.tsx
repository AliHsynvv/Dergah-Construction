"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Project = { title: string; desc: string; img: string };

const projects: Project[] = [
  { title: "Portfolio 1", desc: "Layihə görüntüsü", img: "/portfolio/p1.png" },
  { title: "Portfolio 2", desc: "Layihə görüntüsü", img: "/portfolio/pr2.png" },
  { title: "Portfolio 3", desc: "Layihə görüntüsü", img: "/portfolio/pr3.png" },
  { title: "Villa 1", desc: "Layihə görüntüsü", img: "/portfolio/vl1.png" },
  { title: "Villa 2", desc: "Layihə görüntüsü", img: "/portfolio/vl2.png" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } } as const;
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } } } as const;

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-24 md:pt-28 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Portfolio</h1>
            <p className="mt-2 text-slate-700 max-w-prose">Müxtəlif yaşayış və kommersiya layihələrindən seçilmiş işlərimiz.</p>
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {projects.map((p) => (
              <motion.article key={p.title} variants={item} className="group overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-44 sm:h-48 md:h-56">
                  <Image src={p.img} alt={p.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}


