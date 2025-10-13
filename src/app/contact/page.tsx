"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
} as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder submit UX
    alert("Mesajınız göndərildi. Tezliklə əlaqə saxlayacağıq.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-24 md:pt-28 pb-10 overflow-hidden">
        <div className="absolute -z-10 inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold tracking-tight">
            Əlaqə
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-2 max-w-prose text-slate-700">
            Aşağıdakı form vasitəsilə bizə yazın və ya əlaqə məlumatlarımızdan istifadə edin.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Form */}
          <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-2">
            <motion.form variants={item} onSubmit={handleSubmit} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm p-5 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30" placeholder="Adınızı daxil edin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E‑poçt</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30" placeholder="name@example.com" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Mövzu</label>
                <input name="subject" value={form.subject} onChange={handleChange} required className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30" placeholder="Mövzu" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Mesaj</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={6} className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30" placeholder="Mesajınızı yazın" />
              </div>
              <motion.button whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(249, 115, 22, 0.25)" }} whileTap={{ scale: 0.98 }} type="submit" className="mt-5 inline-flex items-center rounded-xl bg-brand text-white px-5 py-2.5 text-sm font-medium shadow-sm">
                Göndər
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Info + Map */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            <motion.div variants={item} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm p-5">
              <h3 className="text-base font-semibold tracking-tight mb-3">Əlaqə məlumatları</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Bakı, Azərbaycan</li>
                <li>Tel: <a className="hover:text-brand" href="tel:+994702999998">+994 70 299 99 98</a></li>
                <li>E‑poçt: <a className="hover:text-brand" href="mailto:info@dargah.az">info@dargah.az</a></li>
                <li>İş saatları: B.e.–Cümə 09:00–18:00, Şənbə 10:00–16:00</li>
              </ul>
            </motion.div>

            <motion.div variants={item} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
              <iframe title="Xəritə" src="https://www.google.com/maps?q=Baku%2C%20Azerbaijan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}


