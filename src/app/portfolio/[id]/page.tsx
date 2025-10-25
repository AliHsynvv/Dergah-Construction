"use client";

import { motion, animate, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle,
  Star,
  Clock,
  Award,
  Building2,
  Home,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { useEffect, useRef } from "react";
import { use } from "react";

type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  beforeImages: string[];
  duringImages: string[];
  afterImages: string[];
  features: string[];
  client: string;
};

const projectDetails: Record<string, ProjectDetail> = {
  "modern-villa-kompleksi": {
    id: "modern-villa-kompleksi",
    title: "Modern Villa Kompleksi",
    category: "Villa",
    description: "Lüks villa tasarımı ve inşaatı ile modern yaşam alanları oluşturduk. Proje kapsamında 5 adet premium villa inşa edildi.",
    startDate: "2024-01-15",
    endDate: "2024-08-30",
    location: "Bakı, Azərbaycan",
    client: "Premium İnşaat A.Ş.",
    beforeImages: [
      "/portfolio/vl1.png",
      "https://picsum.photos/seed/before2/800/600",
      "https://picsum.photos/seed/before3/800/600"
    ],
    duringImages: [
      "https://picsum.photos/seed/during1/800/600",
      "https://picsum.photos/seed/during2/800/600",
      "https://picsum.photos/seed/during3/800/600",
      "https://picsum.photos/seed/during4/800/600"
    ],
    afterImages: [
      "/portfolio/vl1.png",
      "https://picsum.photos/seed/after2/800/600",
      "https://picsum.photos/seed/after3/800/600",
      "https://picsum.photos/seed/after4/800/600"
    ],
    features: [
      "Modern minimalist mimari",
      "Akıllı ev otomasyon sistemleri",
      "Premium ithal malzemeler",
      "Enerji verimli yalıtım",
      "Geniş teras ve bahçe alanları",
      "Özel yüzme havuzu",
      "Güneş paneli sistemi",
      "Akustik ses yalıtımı"
    ]
  },
  "klasik-villa": {
    id: "klasik-villa",
    title: "Klasik Villa",
    category: "Villa",
    description: "Geleneksel Osmanlı mimarisi ile modern konforu birleştiren özel villa projesi. Tarihi dokuyu koruyarak çağdaş yaşam standartları oluşturuldu.",
    startDate: "2023-09-01",
    endDate: "2024-03-15",
    location: "İstanbul, Türkiye",
    client: "Klasik Yapı Ltd.",
    beforeImages: [
      "/portfolio/vl2.png",
      "https://picsum.photos/seed/kbefore2/800/600"
    ],
    duringImages: [
      "https://picsum.photos/seed/kduring1/800/600",
      "https://picsum.photos/seed/kduring2/800/600",
      "https://picsum.photos/seed/kduring3/800/600"
    ],
    afterImages: [
      "/portfolio/vl2.png",
      "https://picsum.photos/seed/kafter2/800/600",
      "https://picsum.photos/seed/kafter3/800/600"
    ],
    features: [
      "Klasik Osmanlı mimarisi",
      "Orijinal taş duvar işçiliği",
      "El yapımı ahşap oyma detayları",
      "Geleneksel çini kaplamalar",
      "Modern iç mekan tasarımı",
      "Yerden ısıtma sistemi",
      "Akıllı aydınlatma çözümleri",
      "Tarihi doku koruma"
    ]
  },
  "ofis-kompleksi": {
    id: "ofis-kompleksi",
    title: "Ofis Kompleksi",
    category: "Ofis",
    description: "Çalışma alanları için profesyonel tasarım ve modern ofis çözümleri. Çok katlı ofis binası inşaatı ve iç mekan tasarımı.",
    startDate: "2023-06-01",
    endDate: "2024-01-20",
    location: "Bakı, Azərbaycan",
    client: "İş Merkezi A.Ş.",
    beforeImages: [
      "/portfolio/pr2.png",
      "https://picsum.photos/seed/obefore2/800/600"
    ],
    duringImages: [
      "https://picsum.photos/seed/oduring1/800/600",
      "https://picsum.photos/seed/oduring2/800/600"
    ],
    afterImages: [
      "/portfolio/pr2.png",
      "https://picsum.photos/seed/oafter2/800/600"
    ],
    features: [
      "Modern çalışma alanları",
      "Açık ofis konsepti",
      "Konferans salonları",
      "Dinlenme ve yemek alanları",
      "Akıllı bina otomasyonu",
      "Enerji verimli aydınlatma",
      "Yangın güvenliği sistemleri",
      "Engelli erişimi"
    ]
  }
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const project = projectDetails[id];

  if (!project) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Layihə tapılmadı</h1>
          <Link href="/portfolio" className="text-brand hover:text-blue-700 transition-colors">
            Portfolio'ya qayıt
          </Link>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} gün`;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Portfolio'ya qayıt</span>
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-brand/10 to-blue-600/10 px-6 py-2 mb-6">
              <span className="text-sm font-medium text-brand">{project.category}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Project Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-brand" />
                  <span className="font-semibold text-slate-900">Müddət</span>
                </div>
                <div className="text-sm text-slate-600">
                  <div className="font-medium">{calculateDuration(project.startDate, project.endDate)}</div>
                  <div className="text-xs text-slate-500">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-brand" />
                  <span className="font-semibold text-slate-900">Yerləşmə</span>
                </div>
                <div className="text-sm text-slate-600">
                  {project.location}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-5 w-5 text-brand" />
                  <span className="font-semibold text-slate-900">Müştəri</span>
                </div>
                <div className="text-sm text-slate-600">
                  {project.client}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Before Images */}
          {project.beforeImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Başlanğıc Vəziyyəti
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.beforeImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg group"
                  >
                    <Image
                      src={image}
                      alt={`Başlanğıc ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* During Images */}
          {project.duringImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  İnşaat Prosesi
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.duringImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg group"
                  >
                    <Image
                      src={image}
                      alt={`Proses ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* After Images */}
          {project.afterImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Nəticə
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.afterImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg group"
                  >
                    <Image
                      src={image}
                      alt={`Nəticə ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Layihə Xüsusiyyətləri
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60"
                >
                  <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
