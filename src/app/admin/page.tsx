"use client";

import Link from "next/link";
import { 
  Images, 
  FolderOpen, 
  Tags, 
  TrendingUp, 
  Users, 
  Eye,
  Plus,
  ArrowUpRight,
  Activity
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      icon: Images,
      label: "Portfolio Layihələri",
      value: "24",
      change: "+12%",
      trend: "up",
      color: "blue",
      href: "/admin/portfolio"
    },
    {
      icon: FolderOpen,
      label: "Kataloq Şəkilləri",
      value: "156",
      change: "+8%",
      trend: "up",
      color: "purple",
      href: "/admin/catalog"
    },
    {
      icon: Tags,
      label: "Kateqoriyalar",
      value: "8",
      change: "0%",
      trend: "neutral",
      color: "green",
      href: "/admin/categories"
    },
    {
      icon: Eye,
      label: "Aylıq Baxışlar",
      value: "2.4K",
      change: "+23%",
      trend: "up",
      color: "orange",
      href: "#"
    },
  ];

  const recentPortfolio = [
    { id: 1, title: "Villa Layihəsi - Bilgəh", category: "Villa", date: "15 Okt 2024", status: "active" },
    { id: 2, title: "Ofis İnteryer - Nizami", category: "Ofis", date: "12 Okt 2024", status: "active" },
    { id: 3, title: "Ev Təmiri - Yasamal", category: "Ev", date: "10 Okt 2024", status: "draft" },
    { id: 4, title: "Hotel Renovasiya", category: "Hotel", date: "08 Okt 2024", status: "active" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Xoş gəldiniz! Burada bütün məlumatları idarə edə bilərsiniz.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "from-blue-500 to-blue-600 border-blue-200",
            purple: "from-purple-500 to-purple-600 border-purple-200",
            green: "from-green-500 to-green-600 border-green-200",
            orange: "from-orange-500 to-orange-600 border-orange-200",
          };
          
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[1]}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <span className={`text-sm font-semibold mb-1 ${
                      stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-slate-500"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Portfolio */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Son Portfolio Layihələri</h2>
              <p className="text-sm text-slate-600 mt-1">Ən son əlavə edilən layihələr</p>
            </div>
            <Link
              href="/admin/portfolio"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand to-orange-600 text-white text-sm font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Yeni
            </Link>
          </div>

          <div className="space-y-3">
            {recentPortfolio.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Images className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{item.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">{item.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === "active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {item.status === "active" ? "Aktiv" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-brand to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <Activity className="w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">Sürətli Əməliyyatlar</h3>
            <p className="text-white/90 text-sm mb-6">
              Yeni məzmun əlavə edin və ya mövcud məlumatları redaktə edin
            </p>
            <div className="space-y-2">
              <Link
                href="/admin/portfolio"
                className="block w-full px-4 py-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-center transition-all duration-200"
              >
                Portfolio əlavə et
              </Link>
              <Link
                href="/admin/catalog"
                className="block w-full px-4 py-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-center transition-all duration-200"
              >
                Kataloq əlavə et
              </Link>
              <Link
                href="/admin/categories"
                className="block w-full px-4 py-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-center transition-all duration-200"
              >
                Kateqoriya əlavə et
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Sistem Statusu</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Server</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Aktiv
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Bağlı
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Yaddaş</span>
                <span className="text-sm font-semibold text-slate-900">45% / 100GB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-gradient-to-r from-brand to-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

