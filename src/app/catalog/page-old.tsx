"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Search, Loader2, Globe } from "lucide-react";

type CatalogItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  designType: "minimal" | "modern" | "klassik" | "digər";
  subCategory: string; // e.g., qonaq-otagi, yataq-otagi, metbex
  tags: string[];
  image: string;
  photographer?: string;
  photographerUrl?: string;
  isFromInternet?: boolean;
};

const DESIGN_TYPE_LABEL: Record<CatalogItem["designType"], string> = {
  minimal: "Minimal",
  modern: "Modern",
  klassik: "Klassik",
  digər: "Digər",
};

const DESIGN_TYPE_THUMBS: Record<CatalogItem["designType"], string> = {
  modern: "/images/mdrn interier.webp",
  minimal: "/portfolio/p1.png",
  klassik: "/portfolio/pr3.png",
  digər: "/portfolio/vl1.png",
};

const CATEGORIES = [
  { key: "all", label: "Hamısı" },
  { key: "interyer", label: "İnteryer" },
  { key: "memarlik", label: "Memarlıq" },
  { key: "villa", label: "Villa / Mənzil" },
  { key: "ofis", label: "Ofis" },
];

type DesignType = CatalogItem["designType"];
const DESIGN_SUBCATEGORIES: Record<DesignType, { key: string; label: string }[]> = {
  modern: [
    { key: "all", label: "Hamısı" },
    { key: "qonaq-otagi", label: "Qonaq otağı" },
    { key: "yataq-otagi", label: "Yataq otağı" },
    { key: "metbex", label: "Mətbəx" },
  ],
  minimal: [
    { key: "all", label: "Hamısı" },
    { key: "qonaq-otagi", label: "Qonaq otağı" },
    { key: "yataq-otagi", label: "Yataq otağı" },
    { key: "metbex", label: "Mətbəx" },
  ],
  klassik: [
    { key: "all", label: "Hamısı" },
    { key: "qonaq-otagi", label: "Qonaq otağı" },
    { key: "yataq-otagi", label: "Yataq otağı" },
    { key: "metbex", label: "Mətbəx" },
  ],
  digər: [
    { key: "all", label: "Hamısı" },
    { key: "qonaq-otagi", label: "Qonaq otağı" },
    { key: "yataq-otagi", label: "Yataq otağı" },
    { key: "metbex", label: "Mətbəx" },
  ],
};

const ITEMS: CatalogItem[] = (() => {
  const designTypes: DesignType[] = ["modern", "minimal", "klassik", "digər"];
  const subcats = ["qonaq-otagi", "yataq-otagi", "metbex"] as const;
  const categories = ["interyer", "villa", "ofis", "memarlik"] as const;
  const items: CatalogItem[] = [];
  for (const dt of designTypes) {
    for (let i = 1; i <= 20; i++) {
      const sc = subcats[i % subcats.length];
      const cat = categories[(i + dt.length) % categories.length];
      const id = `${dt}-${sc}-${i}`;
      const title = `${DESIGN_TYPE_LABEL[dt]} ${sc.replace("-", " ")} #${i}`;
      const description = `${DESIGN_TYPE_LABEL[dt]} üslubunda ${sc.replace("-", " ")} nümunəsi.`;
      const image = `https://picsum.photos/seed/${encodeURIComponent(id)}/1200/900`;
      items.push({
        id,
        title,
        description,
        category: cat,
        designType: dt,
        subCategory: sc,
        tags: [dt, sc, "mock"],
        image,
      });
    }
  }
  return items;
})();

function HorizontalSlider({ items, onShare, copiedId }: {
  items: CatalogItem[];
  onShare: (item: CatalogItem) => void;
  copiedId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  function scrollBy(dir: 1 | -1) {
    const node = containerRef.current;
    if (!node) return;
    const amount = Math.floor(node.clientWidth * 0.9) * dir;
    node.scrollBy({ left: amount, behavior: "smooth" });
  }
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Geri"
        onClick={() => scrollBy(-1)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur hover:bg-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <div
        ref={containerRef}
        className="flex gap-0 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 min-w-0"
      >
        {items.map((item) => (
          <article key={item.id} className="snap-start shrink-0 w-full min-w-full sm:w-auto sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] xl:min-w-[340px] 2xl:min-w-[360px] sm:max-w-[420px] relative overflow-hidden rounded-2xl border-2 border-slate-200/60 bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="aspect-[4/3] relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute left-3 top-3 flex gap-2">
                <div className="inline-flex items-center rounded-lg bg-black/60 px-2 py-1 text-xs text-white">
                  {DESIGN_TYPE_LABEL[item.designType]}
                </div>
                {item.isFromInternet && (
                  <div className="inline-flex items-center gap-1 rounded-lg bg-blue-600/80 px-2 py-1 text-xs text-white">
                    <Globe className="h-3 w-3" />
                    Web
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  {/* Title - Max 2 lines with ellipsis */}
                  <h3 
                    className="text-base md:text-lg font-semibold tracking-tight line-clamp-2" 
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Description - Max 2 lines with ellipsis */}
                  <p 
                    className="mt-1 text-sm text-slate-700 leading-relaxed line-clamp-2" 
                    title={item.description}
                  >
                    {item.description}
                  </p>
                  
                  {/* Photographer - Truncate if too long */}
                  {item.photographer && (
                    <p className="mt-1 text-xs text-slate-500 truncate">
                      Foto:{" "}
                      {item.photographerUrl ? (
                        <a 
                          href={item.photographerUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          title={item.photographer}
                        >
                          {item.photographer}
                        </a>
                      ) : (
                        <span title={item.photographer}>{item.photographer}</span>
                      )}
                    </p>
                  )}
                </div>
                <motion.button
                  onClick={() => onShare(item)}
                  className="flex-shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Paylaş"
                >
                  {copiedId === item.id ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-lg bg-slate-100 text-slate-700 px-2.5 py-1 text-xs">
                  {CATEGORIES.find((c) => c.key === item.category)?.label ?? item.category}
                </span>
                {item.tags.slice(0, 2).map((t, idx) => (
                  <span 
                    key={`${t}-${idx}`} 
                    className="inline-flex items-center rounded-lg bg-blue-50 text-blue-700 px-2.5 py-1 text-xs truncate max-w-[100px]"
                    title={t}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <button
        type="button"
        aria-label="İrəli"
        onClick={() => scrollBy(1)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur hover:bg-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
      </button>
    </div>
  );
}

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedDesignType, setSelectedDesignType] = useState<"all" | DesignType>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<"all" | string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [internetResults, setInternetResults] = useState<CatalogItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<"local" | "internet">("local");
  const [searchError, setSearchError] = useState<string | null>(null);

  const availableDesignTypes = useMemo<Exclude<CatalogItem["designType"], "">[]>(() => {
    const unique = Array.from(new Set(ITEMS.map((i) => i.designType)));
    return unique;
  }, []);

  // Internet search function
  const searchInternet = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      console.log("🔍 Arama sorgusu boş, sonuçlar temizleniyor");
      setInternetResults([]);
      return;
    }

    console.log("🔍 İnternet araması başlatılıyor:", searchQuery);
    setIsSearching(true);
    setSearchError(null);

    try {
      // Map design types to English for better search results
      const designTypeMap: Record<string, string> = {
        modern: "modern",
        minimal: "minimalist",
        klassik: "classic",
        digər: "contemporary",
      };

      const subCategoryMap: Record<string, string> = {
        "qonaq-otagi": "living room",
        "yataq-otagi": "bedroom",
        "metbex": "kitchen",
      };

      let enhancedQuery = searchQuery;
      
      // Enhance query based on selected filters
      if (selectedDesignType !== "all") {
        enhancedQuery += ` ${designTypeMap[selectedDesignType]} design`;
      }
      
      if (selectedSubCategory !== "all") {
        enhancedQuery += ` ${subCategoryMap[selectedSubCategory]}`;
      }

      // Add context based on category
      if (activeCategory === "interyer") {
        enhancedQuery += " interior design";
      } else if (activeCategory === "villa") {
        enhancedQuery += " villa home";
      } else if (activeCategory === "ofis") {
        enhancedQuery += " office design";
      } else if (activeCategory === "memarlik") {
        enhancedQuery += " architecture";
      } else {
        enhancedQuery += " interior design architecture";
      }

      console.log("📝 Geliştirilmiş arama sorgusu:", enhancedQuery);

      const apiUrl = `/api/search-images?q=${encodeURIComponent(enhancedQuery)}&per_page=30`;
      console.log("🌐 API isteği gönderiliyor:", apiUrl);

      const response = await fetch(apiUrl);

      console.log("📡 API yanıtı alındı:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API hatası:", errorText);
        throw new Error(`Axtarış uğursuz oldu (${response.status})`);
      }

      const data: {
        success: boolean;
        provider: string;
        results: Array<{
          id: string;
          title: string;
          description?: string;
          image: string;
          imageSmall?: string;
          imageThumb?: string;
          photographer?: string;
          photographerUrl?: string;
          tags?: string[];
        }>;
      } = await response.json();
      console.log("📦 API verisi:", data);

      if (!data.success) {
        console.error("❌ API başarısız:", data.error);
        throw new Error(data.error || "Axtarış uğursuz oldu");
      }

      console.log(`✅ ${data.results.length} sonuç bulundu (${data.provider} provider)`);

      // Map API results to CatalogItem format
      const mappedResults: CatalogItem[] = data.results.map((item) => ({
        id: `internet-${item.id}`,
        title: item.title,
        description: item.description || item.title,
        category: activeCategory === "all" ? "interyer" : activeCategory,
        designType: selectedDesignType === "all" ? "modern" : selectedDesignType,
        subCategory: selectedSubCategory === "all" ? "qonaq-otagi" : selectedSubCategory,
        tags: item.tags || [],
        image: item.image,
        photographer: item.photographer,
        photographerUrl: item.photographerUrl,
        isFromInternet: true,
      }));

      console.log("✅ Sonuçlar hazırlandı:", mappedResults.length, "öğe");
      setInternetResults(mappedResults);
    } catch (error: unknown) {
      console.error("❌ Internet search error:", error);
      const message = error instanceof Error ? error.message : "Axtarış zamanı xəta baş verdi";
      setSearchError(message);
      setInternetResults([]);
    } finally {
      setIsSearching(false);
      console.log("✅ Arama tamamlandı");
    }
  }, [activeCategory, selectedDesignType, selectedSubCategory]);

  // Debounced internet search
  useEffect(() => {
    if (searchMode === "internet" && query.trim()) {
      const timer = setTimeout(() => {
        searchInternet(query);
      }, 800);
      return () => clearTimeout(timer);
    } else if (searchMode === "internet" && !query.trim()) {
      setInternetResults([]);
    }
  }, [query, searchMode, searchInternet]);

  const filtered = useMemo(() => {
    // If in internet mode, return internet results
    if (searchMode === "internet") {
      return internetResults;
    }

    // Local search
    const q = query.trim().toLowerCase();
    return ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      const matchesDesign = selectedDesignType === "all" || item.designType === selectedDesignType;
      if (!matchesDesign) return false;
      const matchesSub = selectedSubCategory === "all" || item.subCategory === selectedSubCategory;
      if (!matchesSub) return false;
      if (!q) return true;
      const haystack = [
        item.title,
        item.description,
        item.category,
        item.designType,
        item.subCategory,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeCategory, selectedDesignType, selectedSubCategory, searchMode, internetResults]);

  function onSelectDesignType(next: "all" | DesignType) {
    setSelectedDesignType(next);
    setSelectedSubCategory("all");
  }

  const handleShare = async (item: CatalogItem) => {
    const shareUrl = `${window.location.origin}/catalog`;
    const shareText = `${item.title} - ${item.description}`;

    // Web Share API (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled sharing
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <main className="pt-36 pb-16 overflow-x-hidden bg-white">
      <div className="mx-auto max-w-7xl px-0 md:px-6">
        

        {/* Search */}
        <div className="flex flex-col gap-4 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Modern Search Input */}
            <div className="relative flex-1 max-w-full sm:max-w-md lg:max-w-lg xl:max-w-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-blue-500/20 to-brand/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    searchMode === "internet"
                      ? "İnternetdən axtar: construction, design, interior..."
                      : "Məs: minimal dizayn, villa, ofis..."
                  }
                  className="w-full rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-xl px-4 md:px-5 py-3 md:py-3.5 pr-12 text-sm placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-brand/40 focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300"
                  aria-label="Kataloq axtarış"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-brand/5">
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 text-brand animate-spin" />
                  ) : (
                    <Search className="h-4 w-4 text-brand" />
                  )}
                </div>
              </div>
            </div>

            {/* Modern Search Mode Toggle */}
            <div className="relative inline-flex items-center bg-slate-50/80 backdrop-blur-sm p-1 rounded-2xl border border-slate-200/50 shadow-sm">
              <button
                onClick={() => {
                  setSearchMode("local");
                  setSearchError(null);
                }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  searchMode === "local"
                    ? "bg-white text-brand shadow-md scale-105"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span className="hidden sm:inline">Lokal</span>
              </button>
              <button
                onClick={() => {
                  setSearchMode("internet");
                  setSearchError(null);
                  if (query.trim()) {
                    searchInternet(query);
                  }
                }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  searchMode === "internet"
                    ? "bg-white text-brand shadow-md scale-105"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">İnternet</span>
              </button>
            </div>
          </div>

          {/* Search Error Message */}
          {searchError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl text-sm text-red-700 shadow-sm"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="flex-1">{searchError}</span>
              <button
                onClick={() => setSearchError(null)}
                className="flex items-center justify-center w-6 h-6 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          )}

          {/* Loading state for internet search */}
          {searchMode === "internet" && isSearching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-brand/5 via-blue-500/5 to-brand/5 backdrop-blur-sm border border-brand/10 rounded-2xl text-sm text-slate-700 shadow-sm"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand/10">
                <Loader2 className="h-4 w-4 animate-spin text-brand" />
              </div>
              <span className="font-medium">İnternetdən axtarılır...</span>
            </motion.div>
          )}
        </div>

        {/* Design type selector sidebar (md+) and horizontal (mobile) + subcategories on right */}
        <div className="mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
          <aside className="md:sticky md:top-24 md:self-start">
          <div className="text-sm font-medium text-slate-700 mb-2">Dizayn tipi</div>

            {/* Design Type Selector - Full Image with Overlay Text */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-3">
              <motion.button
                layout
                onClick={() => onSelectDesignType("all")}
                className={
                  "group relative w-full h-20 rounded-2xl border-2 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md " +
                  (selectedDesignType === "all"
                    ? "border-brand shadow-lg shadow-brand/25"
                    : "border-slate-200 hover:border-slate-300 hover:scale-[1.02]")
                }
              >
                <div className="relative w-full h-full">
                  <Image src="/portfolio/vl2.png" alt="Hamısı" fill className="object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
                    selectedDesignType === "all"
                      ? "from-brand/80 to-brand/40"
                      : "from-black/60 to-black/20 group-hover:from-black/50 group-hover:to-black/10"
                  }`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm md:text-base font-semibold transition-all duration-300 ${
                      selectedDesignType === "all"
                        ? "text-white"
                        : "text-white group-hover:text-slate-100"
                    }`}>
                      Hamısı
                    </span>
                  </div>
                </div>
              </motion.button>

              {availableDesignTypes.map((dt) => (
                <motion.button
                  key={dt}
                  layout
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectDesignType(dt)}
                  className={
                    "group relative w-full h-20 rounded-2xl border-2 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md " +
                    (selectedDesignType === dt
                      ? "border-brand shadow-lg shadow-brand/25"
                      : "border-slate-200 hover:border-slate-300 hover:scale-[1.02]")
                  }
                >
                  <div className="relative w-full h-full">
                    <Image src={DESIGN_TYPE_THUMBS[dt]} alt={DESIGN_TYPE_LABEL[dt]} fill className="object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
                      selectedDesignType === dt
                        ? "from-brand/80 to-brand/40"
                        : "from-black/60 to-black/20 group-hover:from-black/50 group-hover:to-black/10"
                    }`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm md:text-base font-semibold transition-all duration-300 ${
                        selectedDesignType === dt
                          ? "text-white"
                          : "text-white group-hover:text-slate-100"
                      }`}>
                        {DESIGN_TYPE_LABEL[dt]}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </aside>

          {/* Subcategories + Results on the right */}
          <div className="min-w-0">
          <AnimatePresence initial={false}>
            {selectedDesignType !== "all" && (
              <motion.div
                  key={`subs-${selectedDesignType}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                  <div className="text-xs text-slate-600 mb-2">
                  Alt kateqoriya — {DESIGN_TYPE_LABEL[selectedDesignType]}
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {DESIGN_SUBCATEGORIES[selectedDesignType].map((sc) => (
                    <motion.button
                      key={sc.key}
                      layout
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSubCategory(sc.key)}
                      className={
                        "px-4 py-2.5 rounded-full text-sm transition-all duration-300 whitespace-nowrap shadow-sm focus:outline-none focus:ring-2 font-medium " +
                        (selectedSubCategory === sc.key
                          ? "bg-gradient-to-r from-brand to-blue-700 text-white focus:ring-brand/40 shadow-lg scale-105"
                          : "bg-white/80 backdrop-blur-md text-slate-700 border-2 border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-md hover:scale-105 focus:ring-brand/30")
                      }
                    >
                      {sc.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

            {/* Animated Results within right column */}
            <div className="mt-4">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`content-${selectedDesignType}-${selectedSubCategory}-${activeCategory}-${query}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {selectedDesignType === "all" ? (
                    <div className="space-y-10">
                      {/* Show internet results when in internet mode */}
                      {searchMode === "internet" ? (
                        filtered.length > 0 ? (
                          <section>
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Globe className="h-6 w-6 text-blue-600" />
                                <h2 className="text-lg md:text-xl font-semibold">İnternet Nəticələri</h2>
                                <span className="text-sm text-slate-500">({filtered.length} nəticə)</span>
                              </div>
                            </div>
                            <HorizontalSlider items={filtered} onShare={handleShare} copiedId={copiedId} />
                          </section>
                        ) : !isSearching && query.trim() ? (
                          <div className="rounded-2xl border-2 border-slate-200/60 bg-white/80 backdrop-blur-md p-8 text-center text-slate-700 shadow-lg">
                            <div className="mb-4">
                              <Globe className="mx-auto h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">İnternetdə nəticə tapılmadı</h3>
                            <p className="text-slate-600">Başqa açar sözlər yoxlayın. İngilis dildə axtarış daha yaxşı nəticələr verir.</p>
                          </div>
                        ) : null
                      ) : (
                        /* Show local results by design type */
                        availableDesignTypes.map((dt) => {
                          const items = ITEMS.filter((i) => i.designType === dt).filter((i) => {
                            const matchesCategory = activeCategory === "all" || i.category === activeCategory;
                            if (!matchesCategory) return false;
                            const q = query.trim().toLowerCase();
                            if (!q) return true;
                            const hay = [i.title, i.description, i.category, i.designType, i.subCategory, ...i.tags].join(" ").toLowerCase();
                            return hay.includes(q);
                          });
                          if (items.length === 0) return null;
                          return (
                            <section key={dt}>
                              <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-12 relative rounded-lg overflow-hidden border border-black/10">
                                    <Image src={DESIGN_TYPE_THUMBS[dt]} alt={DESIGN_TYPE_LABEL[dt]} fill className="object-cover" />
                                  </div>
                                  <h2 className="text-lg md:text-xl font-semibold">{DESIGN_TYPE_LABEL[dt]}</h2>
                                </div>
                              </div>
                              <HorizontalSlider items={items} onShare={handleShare} copiedId={copiedId} />
                            </section>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    <>
                      {filtered.length > 0 ? (
                        <HorizontalSlider items={filtered} onShare={handleShare} copiedId={copiedId} />
                      ) : (
                        <div className="rounded-2xl border-2 border-slate-200/60 bg-white/80 backdrop-blur-md p-8 text-center text-slate-700 shadow-lg">
                          <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 19.128A9.959 9.959 0 0112 20c-2.98 0-5.69-1.307-7.59-3.41" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Heç nə tapılmadı</h3>
                          <p className="text-slate-600">Başqa açar sözlər yoxlayın və ya filtr kriteriyalarını dəyişin.</p>
                        </div>
          )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


