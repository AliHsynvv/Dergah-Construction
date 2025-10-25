"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  X,
  Upload,
  Image as ImageIcon,
  Save
} from "lucide-react";
import Image from "next/image";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  status: "active" | "draft";
}

export default function PortfolioAdmin() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "Villa Layihəsi - Bilgəh",
      category: "Villa",
      description: "Lüks villa inşaatı və dizaynı",
      image: "/portfolio/vl1.png",
      date: "15 Okt 2024",
      status: "active"
    },
    {
      id: 2,
      title: "Ofis İnteryer - Nizami",
      category: "Ofis",
      description: "Modern ofis interyeri",
      image: "/portfolio/p1.png",
      date: "12 Okt 2024",
      status: "active"
    },
    {
      id: 3,
      title: "Ev Təmiri - Yasamal",
      category: "Ev",
      description: "Tam təmir və renovasiya",
      image: "/portfolio/pr2.png",
      date: "10 Okt 2024",
      status: "draft"
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    status: "active" as "active" | "draft"
  });

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
      status: "active"
    });
    setShowModal(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      status: item.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu portfolioni silmək istədiyinizdən əminsiniz?")) {
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing
      setPortfolioItems(portfolioItems.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, date: new Date().toLocaleDateString('az-AZ') }
          : item
      ));
    } else {
      // Create new
      const newItem: PortfolioItem = {
        id: Math.max(...portfolioItems.map(i => i.id), 0) + 1,
        ...formData,
        date: new Date().toLocaleDateString('az-AZ')
      };
      setPortfolioItems([newItem, ...portfolioItems]);
    }
    setShowModal(false);
  };

  const filteredItems = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portfolio İdarəetməsi</h1>
          <p className="text-slate-600 mt-1">Layihələri əlavə edin, redaktə edin və ya silin</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-orange-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Yeni Portfolio
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Portfolio axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48 bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === "active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {item.status === "active" ? "Aktiv" : "Draft"}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand">{item.category}</span>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingItem ? "Portfolio Redaktə Et" : "Yeni Portfolio"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Başlıq
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                  placeholder="Layihə başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Kateqoriya
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                >
                  <option value="">Kateqoriya seçin</option>
                  <option value="Villa">Villa</option>
                  <option value="Ofis">Ofis</option>
                  <option value="Ev">Ev</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Ticarət">Ticarət</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Təsvir
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                  placeholder="Layihə haqqında qısa məlumat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Şəkil URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                    placeholder="/portfolio/image.png"
                  />
                  <button className="px-4 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                    <Upload className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "draft"})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                >
                  <option value="active">Aktiv</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                Ləğv et
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-brand to-orange-600 text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

