export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-brand" />
              <span className="text-base font-semibold tracking-tight">Dargah Construction</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 max-w-prose">
              Müasir memarlıq və inşaat həlləri. Keyfiyyət, etibarlılıq və vaxtında təhvil — əsas prioritetlərimizdir.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:border-brand text-slate-700 hover:text-brand transition" href="#">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zM18 6.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/></svg>
              </a>
              <a aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:border-brand text-slate-700 hover:text-brand transition" href="#">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.2 2.4-2.5 4.9-2.5 5.2 0 6.2 3.4 6.2 7.8V24h-5V16c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24H8z"/></svg>
              </a>
              <a aria-label="Email" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:border-brand text-slate-700 hover:text-brand transition" href="mailto:info@dargah.az">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2 .5 8 5 8-5V6H4v.5Z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold tracking-tight">Əlaqə</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" /> Bakı, Azərbaycan</li>
              <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" /> Tel: <a className="hover:text-brand" href="tel:+994702999998">+994 70 299 99 98</a></li>
              <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" /> E-poçt: <a className="hover:text-brand" href="mailto:info@dargah.az">info@dargah.az</a></li>
            </ul>
            <div className="mt-4 text-sm text-slate-700">
              <div className="font-semibold">İş saatları</div>
              <div>B.e. – Cümə: 09:00 – 18:00</div>
              <div>Şənbə: 10:00 – 16:00</div>
              <div>Bazar: Bağlı</div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-base font-semibold tracking-tight">Xəritə</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 shadow-sm">
              <iframe
                title="Dargah Location"
                src="https://www.google.com/maps?q=Baku%2C%20Azerbaijan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-48 md:h-56 w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div>© {new Date().getFullYear()} Dargah Construction. Bütün hüquqlar qorunur.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-brand" href="#">Məxfilik</a>
            <a className="hover:text-brand" href="#">Şərtlər</a>
            <a className="hover:text-brand" href="#">Dəstək</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



