"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed inset-x-0 top-3 z-50">
      <div className="mx-auto max-w-7xl px-3">
        <div className="px-6 py-3 flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 backdrop-blur shadow-sm">
          <a href="/" className="flex items-center hover:opacity-90 transition">
            <span className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-lg bg-slate-900/90 ring-1 ring-black/10">
              <Image src="/dergah%20logo%20.png" alt="Dargah Construction" width={32} height={32} className="rounded-[6px]" />
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a className="text-slate-900 font-semibold hover:text-brand transition-colors" href="/">Ana səhifə</a>
            <a className="text-slate-900 font-semibold hover:text-brand transition-colors" href="/portfolio">Portfolio</a>
            <a className="text-slate-900 font-semibold hover:text-brand transition-colors" href="/services">Xidmətlər</a>
            <a className="text-slate-900 font-semibold hover:text-brand transition-colors" href="/about">Haqqımızda</a>
            <a className="text-slate-900 font-semibold hover:text-brand transition-colors" href="/contact">Əlaqə</a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/994702999998"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-brand text-white px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition"
            >
              Təklif al
            </a>
            <button
              type="button"
              aria-label="Aç/Kapat menyu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white/70 text-slate-900 hover:bg-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-2 px-3">
            <div className="rounded-2xl border border-black/10 bg-white/90 backdrop-blur shadow-sm py-3">
              <div className="grid gap-2 text-sm px-4">
                <a onClick={() => setOpen(false)} className="py-2 text-slate-900 font-semibold hover:text-brand transition-colors" href="/">Ana səhifə</a>
                <a onClick={() => setOpen(false)} className="py-2 text-slate-900 font-semibold hover:text-brand transition-colors" href="/portfolio">Portfolio</a>
                <a onClick={() => setOpen(false)} className="py-2 text-slate-900 font-semibold hover:text-brand transition-colors" href="/services">Xidmətlər</a>
                <a onClick={() => setOpen(false)} className="py-2 text-slate-900 font-semibold hover:text-brand transition-colors" href="/about">Haqqımızda</a>
                <a onClick={() => setOpen(false)} className="py-2 text-slate-900 font-semibold hover:text-brand transition-colors" href="/contact">Əlaqə</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


