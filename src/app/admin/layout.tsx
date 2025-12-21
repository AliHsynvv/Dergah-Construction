"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import {
  LayoutDashboard,
  Images,
  FolderOpen,
  ChevronRight,
  Home,
  LogOut,
  Loader2
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Images, label: "Portfolio", href: "/admin/portfolio" },
  { icon: FolderOpen, label: "Kataloq", href: "/admin/catalog" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Get current session
      const { data: { session } } = await supabaseBrowser.auth.getSession();

      const isLoginPage = pathname === "/admin/login";

      if (!session) {
        if (!isLoginPage) {
          // Not logged in, trying to access admin pages -> block
          router.replace("/admin/login");
        } else {
          // Not logged in, at login page -> allow
          setAuthorized(true);
        }
      } else {
        if (isLoginPage) {
          // Logged in, trying to access login page -> redirect to dashboard
          router.replace("/admin");
        } else {
          // Logged in, at admin pages -> allow
          setAuthorized(true);
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.replace("/admin/login");
      } else if (event === 'SIGNED_IN' && pathname === "/admin/login") {
        router.replace("/admin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
  };

  // While checking auth, show a loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // If executing a redirect, or not authorized yet (though loading handles most), return null (or loading)
  // But due to the logic above, valid states set authorized = true.
  if (!authorized) return null;

  // Render Login Page without Sidebar/LayoutWrapper
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0f172a] border-r border-slate-800 shadow-lg transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-800/50">
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>

        <nav className="p-4 space-y-2 text-slate-200">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-600/10 transition-all duration-200 w-full"
          >
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

