"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Globe, ChevronLeft, ChevronRight } from "lucide-react";

type DesignType = { id: string; name: string };
type RoomType = { id: string; name: string };
type CatalogItem = {
  id: string;
  image_url: string;
  created_at: string;
  design_type?: DesignType;
  room_type?: RoomType;
  images?: { image_url: string; position: number }[];
};

// Dynamic data from API
const ALL = "all";

export default function CatalogPage() {
  const [selectedDesignType, setSelectedDesignType] = useState(ALL);
  const [selectedRoomType, setSelectedRoomType] = useState(ALL);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [designTypes, setDesignTypes] = useState<DesignType[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    }

    // Listen for dark mode changes from other components
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event from same page
    const handleDarkModeChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    };
    
    window.addEventListener('darkModeChange', handleDarkModeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('darkModeChange', handleDarkModeChange);
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [typesRes, roomRes, itemsRes] = await Promise.all([
          fetch("/api/catalog/design-types").then(r => r.json()),
          fetch("/api/catalog/room-types").then(r => r.json()),
          fetch("/api/catalog/items").then(r => r.json()),
        ]);
        if (!typesRes.success) throw new Error(typesRes.error || "Failed to load design types");
        if (!roomRes.success) throw new Error(roomRes.error || "Failed to load room types");
        if (!itemsRes.success) throw new Error(itemsRes.error || "Failed to load items");
        setDesignTypes(typesRes.designTypes);
        setRoomTypes(roomRes.roomTypes);
        setItems(itemsRes.items);
        setError(null);
      } catch (e: unknown) {
        setError((e instanceof Error ? e.message : String(e)) || String(e));
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = items;
    if (selectedDesignType !== ALL) {
      result = result.filter(i => i.design_type?.name === selectedDesignType);
    }
    if (selectedRoomType !== ALL) {
      result = result.filter(i => i.room_type?.name === selectedRoomType);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(i => (i.room_type?.name || "").toLowerCase().includes(q) || (i.design_type?.name || "").toLowerCase().includes(q));
    }
    return result;
  }, [items, selectedDesignType, selectedRoomType, query]);

  // Get counts for subcategories
  const roomTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const all = [{ name: ALL }, ...roomTypes];
    all.forEach(rt => {
      if (rt.name === ALL) counts[ALL] = filtered.length;
      else counts[rt.name] = items.filter(i => i.room_type?.name === rt.name && (selectedDesignType === ALL || i.design_type?.name === selectedDesignType)).length;
    });
    return counts;
  }, [items, roomTypes, filtered.length, selectedDesignType]);

  // Expand items so each image is displayed as its own tile
  const expanded = useMemo(() => {
    const out: Array<{ id: string; image_url: string; design_type?: DesignType; room_type?: RoomType }> = [];
    filtered.forEach((item) => {
      const urls = (item.images && item.images.length > 0)
        ? item.images.map((i) => i.image_url)
        : (item.image_url ? [item.image_url] : []);
      urls.forEach((url, idx) => {
        out.push({ id: `${item.id}-${idx}` , image_url: url, design_type: item.design_type, room_type: item.room_type });
      });
    });
    return out;
  }, [filtered]);

  // Slider logic over expanded list
  const slideCount = Math.max(1, Math.ceil(expanded.length / 4));

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideCount]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const currentTypeLabel = selectedDesignType === ALL ? "Kataloq" : selectedDesignType;

  return (
    <main className={`min-h-screen pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 relative overflow-hidden transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900/95' 
        : 'bg-gradient-to-br from-blue-100/40 via-slate-50/60 to-blue-50/50'
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left - Navy Blue */}
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-600/20 via-blue-500/15 to-transparent' 
            : 'bg-gradient-to-br from-brand/10 via-blue-600/8 to-transparent'
        }`} style={{ animationDuration: '8s' }} />
        
        {/* Bottom Right - Light Blue */}
        <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl translate-x-1/2 translate-y-1/2 transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-tl from-slate-700/30 via-blue-600/10 to-transparent' 
            : 'bg-gradient-to-tl from-blue-400/12 via-blue-300/8 to-transparent'
        }`} />
        
        {/* Center - Mixed Gradient */}
        <div className={`absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-500/8 via-slate-700/10 to-blue-600/8' 
            : 'bg-gradient-to-r from-blue-300/8 via-brand/6 to-blue-400/8'
        }`} />
        
        {/* Top Right - Accent */}
        <div className={`absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-2xl transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-bl from-blue-500/12 to-transparent' 
            : 'bg-gradient-to-bl from-blue-500/8 to-transparent'
        }`} />
        
        {/* Bottom Left - Secondary Accent */}
        <div className={`absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-2xl transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-tr from-blue-600/10 to-transparent' 
            : 'bg-gradient-to-tr from-brand/8 to-transparent'
        }`} />
      </div>
      
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 relative z-10">
        
        {/* Top Design Type Selector */}
        <div className="relative mb-4 sm:mb-6 md:mb-8 group">
          {/* Fade gradients on edges - only on desktop */}
          <div className={`hidden md:block absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-slate-900/90 via-slate-800/60 to-transparent' 
              : 'bg-gradient-to-r from-blue-100/70 via-blue-50/40 to-transparent'
          }`} />
          <div className={`hidden md:block absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-l from-slate-900/90 via-slate-800/60 to-transparent' 
              : 'bg-gradient-to-l from-blue-100/70 via-blue-50/40 to-transparent'
          }`} />
          
          {/* Scrollable container with custom scrollbar */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brand/20 hover:scrollbar-thumb-brand/40 pb-2 sm:pb-3 -mx-3 px-3 sm:mx-0 sm:px-1">
            <div className="flex gap-2 sm:gap-3 min-w-max">
              {[{ id: ALL, name: "Hamısı" }, ...designTypes].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedDesignType(type.id === ALL ? ALL : type.name);
                    setCurrentSlide(0);
                  }}
                  className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedDesignType === (type.id === ALL ? ALL : type.name)
                      ? darkMode
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : "bg-gradient-to-r from-brand via-blue-700 to-blue-600 text-white shadow-lg shadow-brand/30 scale-105"
                      : darkMode
                        ? "bg-gradient-to-br from-slate-800/90 to-slate-700/80 backdrop-blur-sm text-slate-200 hover:from-slate-700 hover:to-slate-600 hover:text-white border-2 border-slate-700/50 hover:border-blue-500/30 hover:shadow-md"
                        : "bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-sm text-slate-700 hover:from-white hover:to-blue-100/50 hover:text-slate-900 border-2 border-slate-200/50 hover:border-brand/30 hover:shadow-md"
                  }`}
                >
                  {type.id === ALL ? "Hamısı" : type.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Custom scroll indicator dots - only on mobile */}
          <div className="flex md:hidden justify-center gap-1.5 mt-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-1.5 h-1.5 rounded-full bg-slate-300 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg sm:shadow-xl relative overflow-hidden transition-all duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-slate-800/95 via-slate-800/90 to-slate-700/50 border border-slate-700/30 sm:border-2 shadow-blue-500/10' 
            : 'bg-gradient-to-br from-white/95 via-white/90 to-blue-50/50 border border-brand/20 sm:border-2 shadow-brand/10'
        }`}>
          {/* Inner Decorative Gradient */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
            darkMode 
              ? 'bg-gradient-to-bl from-blue-600/8 to-transparent' 
              : 'bg-gradient-to-bl from-brand/5 to-transparent'
          }`} />
          <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
            darkMode 
              ? 'bg-gradient-to-tr from-slate-600/8 to-transparent' 
              : 'bg-gradient-to-tr from-blue-400/5 to-transparent'
          }`} />
          
          <div className="relative z-10">
          
          {/* Title Section */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0 transition-colors duration-500 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-500' 
                  : 'bg-gradient-to-br from-brand to-blue-700'
              }`}>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text truncate transition-colors duration-500 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-400 to-blue-300' 
                    : 'bg-gradient-to-r from-brand to-blue-700'
                }`}>
                  {currentTypeLabel}
                </h1>
                <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-1 transition-colors duration-500 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Təmiz xətlər, az ornament, şüşə/metal/taxta balansı.
                </p>
              </div>
                  </div>
                </div>

          {/* Slider with expanded images (4 per slide) */}
          <div className="relative mb-4 sm:mb-6 md:mb-8">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              <motion.div
                className="flex gap-2 sm:gap-3 md:gap-4"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {Array.from({ length: slideCount }).map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {expanded.slice(slideIndex * 4, slideIndex * 4 + 4).map((entry) => (
                      <motion.div
                        key={entry.id}
                        className={`group relative aspect-square sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border sm:border-2 transition-all duration-300 cursor-pointer ${
                          darkMode 
                            ? 'border-slate-700/60 hover:border-blue-500 hover:shadow-lg sm:hover:shadow-xl hover:shadow-blue-500/10 bg-slate-800' 
                            : 'border-slate-200/60 hover:border-brand hover:shadow-lg sm:hover:shadow-xl hover:shadow-brand/10 bg-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src={entry.image_url}
                          alt={entry.room_type?.name || 'Kataloq'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                            <div className="flex items-center gap-2">
                              {entry.design_type?.name && (
                                <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] sm:text-xs">
                                  {entry.design_type.name}
                                </span>
                              )}
                              {entry.room_type?.name && (
                                <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] sm:text-xs">
                                  {entry.room_type.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            {slideCount > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm border sm:border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    darkMode 
                      ? 'bg-slate-800/95 border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-blue-500/20' 
                      : 'bg-white/95 border-brand/40 text-brand hover:bg-brand hover:text-white hover:border-brand shadow-brand/20'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm border sm:border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    darkMode 
                      ? 'bg-slate-800/95 border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-blue-500/20' 
                      : 'bg-white/95 border-brand/40 text-brand hover:bg-brand hover:text-white hover:border-brand shadow-brand/20'
                  }`}
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </>
            )}
          </div>

          {/* Slide Indicators */}
          {slideCount > 1 && (
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8 mt-3 sm:mt-4">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? darkMode
                        ? "w-6 sm:w-8 bg-gradient-to-r from-blue-600 to-blue-500"
                        : "w-6 sm:w-8 bg-gradient-to-r from-brand to-blue-700"
                      : darkMode
                        ? "w-1 sm:w-1.5 bg-slate-600 hover:bg-slate-500"
                        : "w-1 sm:w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Room Type Filters */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {[{ name: ALL }, ...roomTypes].slice(0, showAllCategories ? roomTypes.length + 1 : 7).map((rt) => (
                <button
                  key={rt.name}
                  onClick={() => {
                    setSelectedRoomType(rt.name);
                    setCurrentSlide(0);
                  }}
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedRoomType === rt.name
                      ? darkMode
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-md sm:shadow-lg shadow-blue-500/20 scale-105"
                        : "bg-gradient-to-r from-brand via-blue-700 to-blue-600 text-white shadow-md sm:shadow-lg shadow-brand/20 scale-105"
                      : darkMode
                        ? "bg-gradient-to-br from-slate-800/85 to-slate-700/60 backdrop-blur-sm text-slate-200 hover:from-slate-700 hover:to-slate-600 hover:text-white border sm:border-2 border-slate-700/50 hover:border-blue-500/30 hover:shadow-md"
                        : "bg-gradient-to-br from-white/85 to-blue-50/40 backdrop-blur-sm text-slate-700 hover:from-white hover:to-blue-100/50 hover:text-slate-900 border sm:border-2 border-slate-200/50 hover:border-brand/30 hover:shadow-md"
                  }`}
                >
                  <span className="hidden sm:inline">{rt.name === ALL ? "Hamısı" : rt.name}</span>
                  <span className="sm:hidden">{rt.name === ALL ? "Hamısı" : rt.name.split(' ')[0]}</span>
                  <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs opacity-70">({roomTypeCounts[rt.name] || 0})</span>
                </button>
              ))}
              
              {/* Toggle Button */}
              {roomTypes.length + 1 > 7 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 border sm:border-2 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-200 hover:from-slate-600/80 hover:to-slate-500/80 border-slate-700/60 hover:border-blue-500/30' 
                      : 'bg-gradient-to-r from-slate-100/80 to-slate-50/80 text-slate-700 hover:from-slate-200/80 hover:to-slate-100/80 border-slate-200/60 hover:border-brand/30'
                  }`}
                >
                  <span className="text-sm sm:text-base">{showAllCategories ? '−' : '+'}</span>
                  <span className="hidden sm:inline">{showAllCategories ? 'Daha az' : `Daha fazla (${roomTypes.length + 1 - 7})`}</span>
                  <span className="sm:hidden">{showAllCategories ? 'Az' : `+${roomTypes.length + 1 - 7}`}</span>
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

