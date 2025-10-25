"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Home,
  Wrench,
  Briefcase,
  Trees,
  Building2,
  Zap,
  Shield,
  Package,
  ChevronDown,
  Check
} from "lucide-react";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
} as const;

type ServiceCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  gradient: string;
  services: string[];
  featured?: boolean;
};

const serviceCategories: ServiceCategory[] = [
  {
    id: "architecture",
    title: "Memarlıq və Dizayn Xidmətləri",
    icon: <Palette className="h-6 w-6" />,
    gradient: "from-brand to-blue-700",
    featured: true,
    services: [
      "Memarlıq konseptinin hazırlanması",
      "İnteryer dizayn (mənzil, ofis, obyekt, restoran və s.)",
      "Eksteryer və fasad dizaynı",
      "2D/3D plan və realistik vizuallaşdırma",
      "Material, rəng və mebel seçimi üzrə konsultasiya",
      "Dizaynın texniki icra sənədlərinin hazırlanması",
      "Mövcud məkanların yenidən planlaşdırılması və modernləşdirilməsi"
    ]
  },
  {
    id: "construction",
    title: "Tikinti və Təmir İşləri",
    icon: <Wrench className="h-6 w-6" />,
    gradient: "from-emerald-600 to-emerald-700",
    featured: true,
    services: [
      "Yeni tikililərin (ev, villa, ofis, obyekt) inşası",
      "Açar təhvil təmir və yenilənmə işləri",
      "Struktur və karkas sistemlərinin qurulması",
      "Beton, armatur və bünövrə işləri",
      "Dam örtüyü və izolyasiya sistemləri",
      "Elektrik, santexnika və istilik sistemlərinin montajı",
      "Döşəmə, tavan, boya və kafel-metlax işləri",
      "Dekorativ və dizayn əsaslı interyer yeniləmələri",
      "Texniki nəzarət və keyfiyyətə təminat"
    ]
  },
  {
    id: "project-management",
    title: "Layihələndirmə və Texniki Nəzarət",
    icon: <Briefcase className="h-6 w-6" />,
    gradient: "from-purple-600 to-purple-700",
    services: [
      "Memarlıq, konstruksiya və mühəndis layihələrinin hazırlanması",
      "Tikinti planlarının texniki təsdiqi",
      "Layihə smetalarının tərtibi və büdcə nəzarəti",
      "İş prosesinin mərhələvi koordinasiyası",
      "Texniki nəzarət və audit",
      "Keyfiyyət standartlarına uyğunluğun təmin edilməsi",
      "Layihə risklərinin analizi və idarə edilməsi"
    ]
  },
  {
    id: "landscape",
    title: "Landşaft və Açıq Məkan Həlləri",
    icon: <Trees className="h-6 w-6" />,
    gradient: "from-green-600 to-green-700",
    services: [
      "Landşaft dizayn və planlaşdırma",
      "Yaşıl zonaların və bağların layihələndirilməsi",
      "Dekorativ ağac, bitki və çəmən örtüyü seçimi",
      "Suvarma və drenaj sistemlərinin qurulması",
      "Açıq hava istirahət zonaları (hovuz, terras, oturacaq sahələri və s.)",
      "Yol, işıqlandırma və dekorativ element dizaynı",
      "Fasad və həyət abadlaşdırma işləri"
    ]
  },
  {
    id: "interior-master",
    title: "İnteryer (Daxili) Usta Xidmətləri",
    icon: <Home className="h-6 w-6" />,
    gradient: "from-blue-600 to-blue-700",
    services: [
      "Divar hörgüsü və suvaq",
      "Döşəmə betonlama və izolyasiya",
      "Arakəsmə divar və tavan sistemləri (alçıpan, gipskarton)",
      "Tavan konstruksiyaları və LED işıqlandırma",
      "Boya, su əsaslı və dekorativ rəngləmə",
      "Divar kağızı və 3D panel montajı",
      "Parket, laminat, mərmər, metlax döşənməsi",
      "Qapı, pəncərə və arakəsmə quraşdırılması",
      "Mətbəx mebeli yığımı və montajı",
      "Qarderob, şkaf və ofis mebeli quraşdırılması"
    ]
  },
  {
    id: "exterior-master",
    title: "Eksteryer (Xarici) Usta Xidmətləri",
    icon: <Building2 className="h-6 w-6" />,
    gradient: "from-slate-600 to-slate-700",
    services: [
      "Fasad üzlənməsi (daş, kərpic, kompozit, boya)",
      "İzolyasiya (istilik, səs, su keçirməzlik)",
      "Fasad dekorları və memarlıq elementlərinin quraşdırılması",
      "Yeni dam sistemlərinin quraşdırılması",
      "Köhnə damların təmiri və izolyasiyası",
      "Dəmir, daş və beton hasarların tikintisi",
      "Qapı, darvaza və avtomatik sistemlərin montajı",
      "Daş döşəmə (kafel, bordür, bazalt, qranit)",
      "Pergola, manqal zonası, bağ mebeli və dekor montajı"
    ]
  },
  {
    id: "technical",
    title: "Texniki və Kommunikasiya Xidmətləri",
    icon: <Zap className="h-6 w-6" />,
    gradient: "from-yellow-600 to-orange-600",
    services: [
      "Elektrik xəttlərinin çəkilməsi",
      "Priz, açar və işıq sistemlərinin montajı",
      "LED, spot və dekorativ işıqların yerləşdirilməsi",
      "Su və kanalizasiya xətlərinin çəkilməsi",
      "Hamam və mətbəx avadanlıqlarının quraşdırılması",
      "Kombi, radiator və isti döşəmə sistemi",
      "Split, VRF və mərkəzi sistemlərin quraşdırılması",
      "Hava kanalı və ventilyasiya montajı",
      "Servis və texniki baxım"
    ]
  },
  {
    id: "smart-home",
    title: "Smart Home və Təhlükəsizlik Sistemləri",
    icon: <Shield className="h-6 w-6" />,
    gradient: "from-indigo-600 to-indigo-700",
    services: [
      "Ağıllı ev sistemlərinin quraşdırılması",
      "Kamera və siqnalizasiya sistemləri",
      "Hərəkət sensorları, pərdələrin avtomat idarəsi",
      "Wi-Fi və şəbəkə infrastrukturu",
      "Mövcud sistemlərin təmiri və modernizasiyası",
      "Texniki baxış və enerji effektivliyi ölçümü",
      "Mütəmadi servis müqavilələri"
    ]
  },
  {
    id: "additional",
    title: "Əlavə Yardımçı Xidmətlər",
    icon: <Package className="h-6 w-6" />,
    gradient: "from-rose-600 to-rose-700",
    services: [
      "Köhnə binaların sökülməsi və tullantıların daşınması",
      "Təmir sonrası təmizlik və səliqə",
      "Kiçik təmir və baxım işləri (usta çağırışı)",
      "Avadanlıq montajı və quraşdırma dəstəyi"
    ]
  }
];

interface ServicesProps {
  darkMode?: boolean;
}

export default function Services({ darkMode = false }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="relative">
      {/* Background Elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className={`absolute top-0 right-0 -mt-32 -mr-32 h-80 w-80 rounded-full blur-3xl animate-pulse transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-600/15 to-blue-500/10' 
            : 'bg-gradient-to-br from-brand/10 to-blue-400/10'
        }`} />
        <div className={`absolute bottom-0 left-0 -mb-32 -ml-32 h-72 w-72 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-tr from-slate-700/20 to-blue-600/5' 
            : 'bg-gradient-to-tr from-slate-200/20 to-brand/5'
        }`} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className={`inline-flex items-center rounded-full px-6 py-2 mb-6 transition-colors duration-500 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/15' 
                : 'bg-gradient-to-r from-brand/10 to-blue-600/10'
            }`}
          >
            <span className={`text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-300' : 'text-brand'
            }`}>Xidmətlərimiz</span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              darkMode 
                ? 'from-slate-100 via-slate-200 to-slate-100' 
                : 'from-slate-900 via-slate-800 to-slate-900'
            }`}>
              Geniş xidmət çeşidi
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500 ${
              darkMode 
                ? 'from-blue-400 to-blue-300' 
                : 'from-brand to-blue-700'
            }`}>
              ilə yanınızdayıq
            </span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 transition-colors duration-500 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Memarlıqdan tikintiyə, dizayndan texniki xidmətlərə qədər kompleks həllər təqdim edirik.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {serviceCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="group"
            >
              <div className={`relative rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                category.featured 
                  ? darkMode
                    ? 'border-blue-500/30 bg-slate-800/90 backdrop-blur-sm'
                    : 'border-brand/30 bg-white'
                  : darkMode
                    ? 'border-slate-700/60 bg-slate-800/80 backdrop-blur-md'
                    : 'border-slate-200 bg-white'
              }`}>
                {/* Header */}
                <div className={`p-6 border-b transition-colors duration-500 ${
                  darkMode ? 'border-slate-700/60' : 'border-slate-100'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-bold mb-1 leading-tight transition-colors duration-500 ${
                        darkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm transition-colors duration-500 ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {category.services.length} xidmət
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services List - Preview (first 3) */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.services.slice(0, expandedId === category.id ? undefined : 3).map((service, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-sm transition-colors duration-500 ${
                        darkMode ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                          darkMode ? 'text-blue-400' : 'text-brand'
                        }`} />
                        <span className="flex-1">{service}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expand Button */}
                  {category.services.length > 3 && (
                    <button
                      onClick={() => toggleExpand(category.id)}
                      className={`mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                        darkMode 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-brand hover:text-blue-700'
                      }`}
                    >
                      <span>
                        {expandedId === category.id 
                          ? "Daha az göstər" 
                          : `Daha çox (${category.services.length - 3}+)`
                        }
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        expandedId === category.id ? 'rotate-180' : ''
                      }`} />
                    </button>
                  )}
                </div>

                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-lg transition-colors duration-500 ${
                      darkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
                        : 'bg-gradient-to-r from-brand to-blue-700'
                    }`}>
                      Premium
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className={`inline-block p-1 rounded-2xl transition-colors duration-500 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
              : 'bg-gradient-to-r from-brand to-blue-700'
          }`}>
            <div className={`rounded-xl p-8 md:p-10 transition-colors duration-500 ${
              darkMode ? 'bg-slate-800' : 'bg-white'
            }`}>
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 ${
                darkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Layihənizi müzakirə edək
              </h3>
              <p className={`mb-6 max-w-2xl mx-auto transition-colors duration-500 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Peşəkar komandamız sizin layihəniz üçün ən yaxşı həlləri təqdim etməyə hazırdır.
              </p>
              <motion.a
                href="/contact"
                className={`inline-flex items-center gap-3 rounded-xl text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
                    : 'bg-gradient-to-r from-brand to-blue-700'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Pulsuz Konsultasiya</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
