"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { HardHat, Clock, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

interface WhyUsProps {
    darkMode: boolean;
}

export default function WhyUs({ darkMode }: WhyUsProps) {
    const { t } = useLanguage();

    const features = [
        {
            key: "team",
            icon: HardHat,
            color: "blue",
            delay: 0.1,
            colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
        },
        {
            key: "delivery",
            icon: Clock,
            color: "emerald",
            delay: 0.2,
            colSpan: "col-span-1 md:col-span-1",
        },
        {
            key: "quality",
            icon: ShieldCheck,
            color: "indigo",
            delay: 0.3,
            colSpan: "col-span-1 md:col-span-1",
        },
        {
            key: "budget",
            icon: Wallet,
            color: "purple",
            delay: 0.4,
            colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
        },
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className={`absolute inset-0 transition-colors duration-500 ${darkMode ? "bg-slate-900" : "bg-white"}`} />

            {/* Mesh Gradients */}
            <div className={`absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none ${darkMode ? "bg-blue-600/30" : "bg-blue-400/30"
                }`} />
            <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none ${darkMode ? "bg-purple-600/30" : "bg-purple-400/30"
                }`} />

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 lg:max-w-xl"
                    >
                        <div className={`inline-flex items-center rounded-full px-4 py-1.5 mb-6 border ${darkMode
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            : "bg-blue-50 border-blue-200 text-blue-600"
                            }`}>
                            <span className="text-xs font-bold tracking-wider uppercase">{t.home.whyUs.badge}</span>
                        </div>

                        <h2 className={`text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                            {t.home.whyUs.title1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                                {t.home.whyUs.title2}
                            </span>
                        </h2>

                        <p className={`text-lg md:text-xl leading-relaxed mb-10 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                            {t.home.whyUs.description}
                        </p>

                        <Link href="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all ${darkMode
                                    ? "bg-white text-slate-900 hover:bg-blue-50"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                                    }`}
                            >
                                {t.home.whyUs.learnMore}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature) => {
                            // We need to properly access the nested properties dynamically.
                            // Since we know the structure matches our keys, we can cast or assert, 
                            // but purely for this demo we'll assume t.home.whyUs.features[feature.key] exists.
                            // Type safety workaround for dynamic key access:
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const featureData = (t.home.whyUs.features as Record<string, { title: string; desc: string }>)[feature.key];

                            return (
                                <motion.div
                                    key={feature.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: feature.delay }}
                                    whileHover={{ y: -5 }}
                                    className={`relative group p-8 rounded-3xl border transition-all duration-300 ${feature.colSpan} ${darkMode
                                        ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
                                        : "bg-white/60 border-white/50 hover:bg-white/80"
                                        } backdrop-blur-md shadow-lg hover:shadow-xl`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl from-${feature.color}-500 to-${feature.color}-600`} />

                                    <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
                                        {featureData?.title}
                                    </h3>

                                    <p className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                                        {featureData?.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
