"use client";

import Services from "@/components/Services";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-24 md:pt-28 pb-0 overflow-hidden">
        <div className="absolute -z-10 inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6" />
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Services />
        </div>
      </section>
    </main>
  );
}


