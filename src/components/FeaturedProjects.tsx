"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeaturedProjectsProps {
    darkMode: boolean;
}

export default function FeaturedProjects({ darkMode }: FeaturedProjectsProps) {
    const { t } = useLanguage();

    const projects = [
        {
            id: 1,
            title: t.portfolio.projects["Modern Villa Kompleksi"]?.title || "Modern Villa Complex",
            category: t.portfolio.categories["Villa"],
            image: "/portfolio/p1.png",
            link: "/portfolio/modern-villa-kompleksi",
            size: "large" // Spans 2 cols on desktop if desired, or just standard
        },
        {
            id: 2,
            title: t.portfolio.projects["Ofis Kompleksi"]?.title || "Office Complex",
            category: t.portfolio.categories["Ofis"],
            image: "/portfolio/pr2.png",
            link: "/portfolio/ofis-kompleksi",
            size: "standard"
        },
        {
            id: 3,
            title: t.portfolio.projects["Klasik Villa"]?.title || "Classic Villa",
            category: t.portfolio.categories["Villa"],
            image: "/portfolio/vl1.png",
            link: "/portfolio/klasik-villa",
            size: "standard"
        }
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden transition-colors duration-500">
            {/* Background Decor */}
            <div className={`absolute inset-0 transition-colors duration-500 ${darkMode ? "bg-slate-900" : "bg-slate-50/50"}`} />

            {/* Gradient Blob - Top Right */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 pointer-events-none ${darkMode ? "bg-blue-900/40" : "bg-blue-200/40"
                }`} />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={`inline-flex items-center rounded-full px-4 py-1.5 mb-4 border ${darkMode
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            : "bg-blue-50 border-blue-200 text-blue-600"
                            }`}>
                            <span className="text-xs font-semibold tracking-wide uppercase">{t.home.portfolio.title}</span>
                        </div>
                        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                            {t.home.portfolio.subtitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            href="/portfolio"
                            className={`group inline-flex items-center gap-2 text-lg font-medium transition-colors ${darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            {t.home.portfolio.viewAll}
                            <div className={`p-2 rounded-full transition-all duration-300 group-hover:translate-x-1 ${darkMode ? "bg-slate-800 group-hover:bg-blue-600 text-white" : "bg-white group-hover:bg-blue-600 text-slate-900 group-hover:text-white shadow-sm"
                                }`}>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative rounded-3xl overflow-hidden ${index === 0 ? "lg:col-span-2" : "col-span-1"
                                }`}
                        >
                            <Link href={project.link} className="block relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:h-[500px]">
                                {/* Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                    <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                        <span className={`inline-block px-3 py-1 mb-3 rounded-lg text-xs font-medium backdrop-blur-md ${darkMode ? "bg-white/10 text-white" : "bg-white/20 text-white"
                                            }`}>
                                            {project.category}
                                        </span>

                                        <div className="flex items-end justify-between gap-4">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-[80%] leading-tight">
                                                {project.title}
                                            </h3>

                                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-slate-900">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
