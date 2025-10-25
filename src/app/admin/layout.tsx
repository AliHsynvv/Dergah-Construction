"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Images, 
  FolderOpen, 
  ChevronRight,
  Home,
  LogOut
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Images, label: "Portfolio", href: "/admin/portfolio" },
  { icon: FolderOpen, label: "Kataloq", href: "/admin/catalog" },
];

// right sidebar removed

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Top Header removed as requested */}

      {/* Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0f172a] border-r border-slate-800 shadow-lg transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2 text-slate-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-brand to-blue-700 text-white shadow-lg shadow-brand/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-[#0b1224]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 mb-2"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Sayta qayıt</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-600/10 transition-all duration-200 w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Çıxış</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-0 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>


      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

