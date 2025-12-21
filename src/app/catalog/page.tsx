"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const [selectedDesignType, setSelectedDesignType] = useState(ALL);
  const [selectedRoomType, setSelectedRoomType] = useState(ALL);
  // const [query, setQuery] = useState("");
  const [, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [designTypes, setDesignTypes] = useState<DesignType[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  // Helper function to translate category names
  const translateDesignType = (name: string) => {
    return (t.catalog.designTypes as Record<string, string>)[name] || name;
  };

  const translateRoomType = (name: string) => {
    return (t.catalog.roomTypes as Record<string, string>)[name] || name;
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    const checkDarkMode = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        setDarkMode(JSON.parse(saved));
      }
    };

    checkDarkMode();
    window.addEventListener('storage', checkDarkMode);
    window.addEventListener('darkModeChange', checkDarkMode);

    return () => {
      window.removeEventListener('storage', checkDarkMode);
      window.removeEventListener('darkModeChange', checkDarkMode);
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
    // Query logic temporarily disabled as there is no input
    // if (query.trim()) { ... }
    return result;
  }, [items, selectedDesignType, selectedRoomType]);

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
        out.push({ id: `${item.id}-${idx}`, image_url: url, design_type: item.design_type, room_type: item.room_type });
      });
    });
    return out;
  }, [filtered]);

  return (
    <main className={`min-h-screen pt-24 pb-20 relative overflow-hidden transition-colors duration-500 ${darkMode
      ? 'bg-slate-950'
      : 'bg-slate-50'
      }`}>

      {/* Premium Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${darkMode ? 'bg-blue-900/40' : 'bg-blue-200/60'}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-all duration-1000 ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-200/50'}`} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-4 ${darkMode
              ? 'bg-gradient-to-r from-white via-blue-200 to-blue-400'
              : 'bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600'
              }`}
          >
            {t.catalog.catalog}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {t.catalog.description}
          </motion.p>
        </div>

        {/* Filters Section */}
        <div className="mb-12 space-y-8">
          {/* Design Type Tabs */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
            {[{ id: ALL, name: t.catalog.all }, ...designTypes].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedDesignType(type.id === ALL ? ALL : type.name)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group ${selectedDesignType === (type.id === ALL ? ALL : type.name)
                  ? darkMode
                    ? 'text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                    : 'text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                  : darkMode
                    ? 'text-slate-400 hover:text-white bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-blue-200'
                  }`}
              >
                {selectedDesignType === (type.id === ALL ? ALL : type.name) && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 ${darkMode ? 'bg-blue-600' : 'bg-blue-600'}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {type.id === ALL ? t.catalog.all : translateDesignType(type.name)}
                </span>

                {/* Hover Glow Effect */}
                {selectedDesignType !== (type.id === ALL ? ALL : type.name) && (
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50/50'
                    }`} />
                )}
              </button>
            ))}
          </div>

          {/* Room Type Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[{ name: ALL }, ...roomTypes].map((rt) => (
              <button
                key={rt.name}
                onClick={() => setSelectedRoomType(rt.name)}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm transition-all duration-300 border ${selectedRoomType === rt.name
                  ? darkMode
                    ? 'bg-slate-800 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'bg-white border-blue-600 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
                  : darkMode
                    ? 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                    : 'bg-white/50 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
              >
                {rt.name === ALL ? t.catalog.all : translateRoomType(rt.name)}
                <span className={`ml-2 text-[10px] ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  {roomTypeCounts[rt.name] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px]">
          {expanded.map((entry) => (
            <motion.div
              layout
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${darkMode ? 'bg-slate-900' : 'bg-white'
                }`}
            >
              <Image
                src={entry.image_url}
                alt={entry.room_type?.name || t.catalog.catalog}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {entry.design_type?.name && (
                      <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-white/90 text-[10px] font-medium border border-white/20">
                        {translateDesignType(entry.design_type.name)}
                      </span>
                    )}
                    {entry.room_type?.name && (
                      <span className="px-2 py-1 rounded-md bg-blue-500/20 backdrop-blur-md text-blue-200 text-[10px] font-medium border border-blue-400/20">
                        {translateRoomType(entry.room_type.name)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {expanded.length === 0 && (
          <div className="text-center py-32">
            <p className={`text-lg ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              No images found matching your selection.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}

