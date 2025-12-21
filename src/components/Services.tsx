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
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get localized service categories
  const getLocalizedCategories = (): ServiceCategory[] => {
    if (language === 'en') {
      return [
        {
          id: "architecture",
          title: "Architecture & Design Services",
          icon: <Palette className="h-6 w-6" />,
          gradient: "from-brand to-blue-700",
          featured: true,
          services: [
            "Architectural concept development",
            "Interior design (apartment, office, object, restaurant, etc.)",
            "Exterior and facade design",
            "2D/3D planning and realistic visualization",
            "Consultation on material, color and furniture selection",
            "Preparation of technical design documents",
            "Replanning and modernization of existing spaces"
          ]
        },
        {
          id: "construction",
          title: "Construction & Renovation Works",
          icon: <Wrench className="h-6 w-6" />,
          gradient: "from-emerald-600 to-emerald-700",
          featured: true,
          services: [
            "Construction of new buildings (house, villa, office, object)",
            "Turnkey renovation and refurbishment works",
            "Construction of structural and frame systems",
            "Concrete, reinforcement and foundation works",
            "Roof covering and insulation systems",
            "Installation of electrical, plumbing and heating systems",
            "Flooring, ceiling, painting and tile works",
            "Decorative and design-based interior renovations",
            "Technical supervision and quality assurance"
          ]
        },
        {
          id: "project-management",
          title: "Project Design & Technical Supervision",
          icon: <Briefcase className="h-6 w-6" />,
          gradient: "from-purple-600 to-purple-700",
          services: [
            "Preparation of architectural, structural and engineering projects",
            "Technical approval of construction plans",
            "Preparation of project estimates and budget control",
            "Phased coordination of work process",
            "Technical supervision and audit",
            "Ensuring compliance with quality standards",
            "Project risk analysis and management"
          ]
        },
        {
          id: "landscape",
          title: "Landscape & Open Space Solutions",
          icon: <Trees className="h-6 w-6" />,
          gradient: "from-green-600 to-green-700",
          services: [
            "Landscape design and planning",
            "Design of green areas and gardens",
            "Selection of decorative trees, plants and lawn cover",
            "Installation of irrigation and drainage systems",
            "Outdoor recreation areas (pool, terrace, seating areas, etc.)",
            "Road, lighting and decorative element design",
            "Facade and yard landscaping works"
          ]
        },
        {
          id: "interior-master",
          title: "Interior (Internal) Master Services",
          icon: <Home className="h-6 w-6" />,
          gradient: "from-blue-600 to-blue-700",
          services: [
            "Wall masonry and plastering",
            "Floor concreting and insulation",
            "Partition wall and ceiling systems (drywall, plasterboard)",
            "Ceiling structures and LED lighting",
            "Painting, water-based and decorative coloring",
            "Wallpaper and 3D panel installation",
            "Parquet, laminate, marble, tile laying",
            "Door, window and partition installation",
            "Kitchen furniture assembly and installation",
            "Wardrobe, cabinet and office furniture installation"
          ]
        },
        {
          id: "exterior-master",
          title: "Exterior (External) Master Services",
          icon: <Building2 className="h-6 w-6" />,
          gradient: "from-slate-600 to-slate-700",
          services: [
            "Facade cladding (stone, brick, composite, paint)",
            "Insulation (thermal, sound, waterproofing)",
            "Installation of facade decorations and architectural elements",
            "Installation of new roof systems",
            "Repair and insulation of old roofs",
            "Construction of metal, stone and concrete fences",
            "Installation of doors, gates and automatic systems",
            "Stone paving (tile, curb, basalt, granite)",
            "Pergola, barbecue area, garden furniture and decor installation"
          ]
        },
        {
          id: "technical",
          title: "Technical & Communication Services",
          icon: <Zap className="h-6 w-6" />,
          gradient: "from-yellow-600 to-orange-600",
          services: [
            "Installation of electrical lines",
            "Installation of sockets, switches and lighting systems",
            "Placement of LED, spot and decorative lights",
            "Installation of water and sewage lines",
            "Installation of bathroom and kitchen equipment",
            "Combi, radiator and underfloor heating system",
            "Installation of split, VRF and central systems",
            "Air duct and ventilation installation",
            "Service and technical maintenance"
          ]
        },
        {
          id: "smart-home",
          title: "Smart Home & Security Systems",
          icon: <Shield className="h-6 w-6" />,
          gradient: "from-indigo-600 to-indigo-700",
          services: [
            "Installation of smart home systems",
            "Camera and alarm systems",
            "Motion sensors, automatic curtain control",
            "Wi-Fi and network infrastructure",
            "Repair and modernization of existing systems",
            "Technical inspection and energy efficiency measurement",
            "Regular service contracts"
          ]
        },
        {
          id: "additional",
          title: "Additional Support Services",
          icon: <Package className="h-6 w-6" />,
          gradient: "from-rose-600 to-rose-700",
          services: [
            "Demolition of old buildings and waste disposal",
            "Post-renovation cleaning and tidying",
            "Minor repair and maintenance work (master call)",
            "Equipment installation and setup support"
          ]
        }
      ];
    }

    return serviceCategories;
  };

  return (
    <section id="services" className="relative">

      {/* Content Container */}
      <div className="mx-auto max-w-7xl px-0 sm:px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className={`inline-flex items-center rounded-full px-4 py-1.5 mb-6 border ${darkMode
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'bg-blue-50 border-blue-200 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
              }`}
          >
            <span className="text-xs font-semibold tracking-wide uppercase">{t.services.badge}</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${darkMode
                ? 'from-white via-blue-100 to-blue-300'
                : 'from-slate-900 via-blue-900 to-blue-700'
              }`}>
              {t.services.title1}
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${darkMode
                ? 'from-blue-400 to-blue-200'
                : 'from-brand to-blue-500'
              }`}>
              {t.services.title2}
            </span>
          </h1>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
            {t.services.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {getLocalizedCategories().map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className={`relative h-full rounded-3xl p-1 transition-all duration-500 ${category.featured
                  ? 'bg-gradient-to-br from-blue-500/30 via-transparent to-purple-500/30'
                  : 'bg-gradient-to-br from-slate-200/50 via-transparent to-slate-200/50'
                } ${darkMode && !category.featured ? 'from-slate-700/50 to-slate-700/50' : ''}`}>

                {/* Glass Card Content */}
                <div className={`relative h-full rounded-[20px] overflow-hidden transition-all duration-500 ${darkMode
                    ? 'bg-slate-900/80 backdrop-blur-xl border border-white/5 hover:border-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                    : 'bg-white/60 backdrop-blur-xl border border-white/60 hover:border-blue-200 hover:shadow-[0_10px_40px_rgba(37,99,235,0.1)]'
                  }`}>

                  {/* Icon Header */}
                  <div className="p-6 pb-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br ${category.gradient}`}>
                      <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                        {category.icon}
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-2 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                      {category.title}
                    </h3>

                    {/* Badge if featured */}
                    {category.featured && (
                      <div className="absolute top-6 right-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg bg-gradient-to-r ${category.gradient}`}>
                          Premium
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Services List */}
                  <div className="p-6 pt-4">
                    <ul className="space-y-3">
                      {category.services.slice(0, expandedId === category.id ? undefined : 3).map((service, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 text-sm group/item"
                        >
                          <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-brand'
                            }`}>
                            <Check className="h-2.5 w-2.5" />
                          </div>
                          <span className={`leading-relaxed transition-colors ${darkMode
                              ? 'text-slate-400 group-hover/item:text-slate-200'
                              : 'text-slate-600 group-hover/item:text-slate-900'
                            }`}>
                            {service}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Expand Button */}
                    {category.services.length > 3 && (
                      <motion.button
                        layout
                        onClick={() => toggleExpand(category.id)}
                        className={`mt-6 w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 flex items-center justify-center gap-2 group/btn ${darkMode
                            ? 'border-slate-700 text-slate-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30'
                            : 'border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-brand hover:border-brand/30'
                          }`}
                      >
                        <span>
                          {expandedId === category.id
                            ? t.services.showLess
                            : t.services.showMore(category.services.length - 3)
                          }
                        </span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expandedId === category.id ? 'rotate-180' : 'group-hover/btn:translate-y-0.5'
                          }`} />
                      </motion.button>
                    )}
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${darkMode ? 'from-blue-500/5 to-purple-500/5' : 'from-blue-500/5 to-purple-500/5'
                    }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20 md:mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            {/* Glow effect back */}
            <div className={`absolute -inset-1 rounded-2xl blur opacity-30 transition-all duration-1000 ${darkMode ? 'bg-blue-500' : 'bg-brand'
              }`} />

            <div className={`relative rounded-2xl p-8 md:p-12 overflow-hidden ${darkMode
                ? 'bg-slate-900 border border-slate-800'
                : 'bg-white border border-slate-100 shadow-2xl shadow-blue-900/5'
              }`}>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                  {t.services.cta.title}
                </h3>
                <p className={`mb-8 text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  {t.services.cta.description}
                </p>

                <motion.a
                  href="/contact"
                  className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${darkMode
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/25'
                      : 'bg-gradient-to-r from-brand to-blue-600 hover:shadow-brand/25'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.services.cta.button}
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </motion.a>
              </div>

              {/* Decorative background visual */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
