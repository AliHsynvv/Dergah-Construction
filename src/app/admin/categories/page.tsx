"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Save,
  Folder,
  Hash,
  Palette,
  Layers
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  color: string;
  icon: string;
  date: string;
}

interface DesignType {
  id: number;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  date: string;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  parentCategory: string;
  date: string;
}

const colorOptions = [
  { value: "blue", label: "Mavi", class: "bg-blue-500" },
  { value: "purple", label: "Bənövşəyi", class: "bg-purple-500" },
  { value: "green", label: "Yaşıl", class: "bg-green-500" },
  { value: "orange", label: "Narıncı", class: "bg-orange-500" },
  { value: "red", label: "Qırmızı", class: "bg-red-500" },
  { value: "pink", label: "Çəhrayı", class: "bg-pink-500" },
  { value: "yellow", label: "Sarı", class: "bg-yellow-500" },
  { value: "indigo", label: "İndiqo", class: "bg-indigo-500" },
];

export default function CategoriesAdmin() {
  const [activeTab, setActiveTab] = useState<"categories" | "designTypes" | "subCategories">("categories");

  // Categories State
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Villa",
      slug: "villa",
      description: "Lüks villa layihələri və dizaynları",
      itemCount: 15,
      color: "blue",
      icon: "🏡",
      date: "15 Okt 2024"
    },
    {
      id: 2,
      name: "Ofis",
      slug: "ofis",
      description: "Modern ofis inşaatı və interyeri",
      itemCount: 8,
      color: "purple",
      icon: "🏢",
      date: "12 Okt 2024"
    },
    {
      id: 3,
      name: "Material",
      slug: "material",
      description: "Tikinti materialları və avadanlıqlar",
      itemCount: 45,
      color: "green",
      icon: "🧱",
      date: "10 Okt 2024"
    },
  ]);

  // Design Types State
  const [designTypes, setDesignTypes] = useState<DesignType[]>([
    {
      id: 1,
      name: "Minimal",
      slug: "minimal",
      description: "Sadə və təmiz xətlər, minimal dekorativ elementlər",
      itemCount: 28,
      date: "15 Okt 2024"
    },
    {
      id: 2,
      name: "Modern",
      slug: "modern",
      description: "Müasir dizayn elementləri və innovativ həllər",
      itemCount: 35,
      date: "14 Okt 2024"
    },
    {
      id: 3,
      name: "Klassik",
      slug: "klassik",
      description: "Ənənəvi dizayn və zərif detallar",
      itemCount: 22,
      date: "12 Okt 2024"
    },
  ]);

  // Sub Categories State
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    {
      id: 1,
      name: "Qonaq Otağı",
      slug: "qonaq-otagi",
      description: "Qonaq otağı üçün dizayn və mebel həlləri",
      itemCount: 18,
      parentCategory: "Villa",
      date: "15 Okt 2024"
    },
    {
      id: 2,
      name: "Yataq Otağı",
      slug: "yataq-otagi",
      description: "Yataq otağı interyeri və mebel seçimləri",
      itemCount: 15,
      parentCategory: "Villa",
      date: "14 Okt 2024"
    },
    {
      id: 3,
      name: "Mətbəx",
      slug: "metbex",
      description: "Modern və funksional mətbəx dizaynı",
      itemCount: 12,
      parentCategory: "Villa",
      date: "13 Okt 2024"
    },
    {
      id: 4,
      name: "Vanna Otağı",
      slug: "vanna-otagi",
      description: "Vanna otağı və santexnika həlləri",
      itemCount: 10,
      parentCategory: "Villa",
      date: "12 Okt 2024"
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"category" | "designType" | "subCategory">("category");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingDesignType, setEditingDesignType] = useState<DesignType | null>(null);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    color: "blue",
    icon: "📁"
  });

  const [designTypeForm, setDesignTypeForm] = useState({
    name: "",
    slug: "",
    description: ""
  });

  const [subCategoryForm, setSubCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    parentCategory: ""
  });

  // Category Handlers
  const handleCreateCategory = () => {
    setModalType("category");
    setEditingCategory(null);
    setCategoryForm({ name: "", slug: "", description: "", color: "blue", icon: "📁" });
    setShowModal(true);
  };

  const handleEditCategory = (item: Category) => {
    setModalType("category");
    setEditingCategory(item);
    setCategoryForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      color: item.color,
      icon: item.icon
    });
    setShowModal(true);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm("Bu əsas kateqoriyanı silmək istədiyinizdən əminsiniz?")) {
      setCategories(categories.filter(item => item.id !== id));
    }
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(item =>
        item.id === editingCategory.id
          ? { ...item, ...categoryForm, date: new Date().toLocaleDateString('az-AZ') }
          : item
      ));
    } else {
      const newItem: Category = {
        id: Math.max(...categories.map(i => i.id), 0) + 1,
        ...categoryForm,
        itemCount: 0,
        date: new Date().toLocaleDateString('az-AZ')
      };
      setCategories([newItem, ...categories]);
    }
    setShowModal(false);
  };

  // Design Type Handlers
  const handleCreateDesignType = () => {
    setModalType("designType");
    setEditingDesignType(null);
    setDesignTypeForm({ name: "", slug: "", description: "" });
    setShowModal(true);
  };

  const handleEditDesignType = (item: DesignType) => {
    setModalType("designType");
    setEditingDesignType(item);
    setDesignTypeForm({
      name: item.name,
      slug: item.slug,
      description: item.description
    });
    setShowModal(true);
  };

  const handleDeleteDesignType = (id: number) => {
    if (confirm("Bu dizayn tipini silmək istədiyinizdən əminsiniz?")) {
      setDesignTypes(designTypes.filter(item => item.id !== id));
    }
  };

  const handleSaveDesignType = () => {
    if (editingDesignType) {
      setDesignTypes(designTypes.map(item =>
        item.id === editingDesignType.id
          ? { ...item, ...designTypeForm, date: new Date().toLocaleDateString('az-AZ') }
          : item
      ));
    } else {
      const newItem: DesignType = {
        id: Math.max(...designTypes.map(i => i.id), 0) + 1,
        ...designTypeForm,
        itemCount: 0,
        date: new Date().toLocaleDateString('az-AZ')
      };
      setDesignTypes([newItem, ...designTypes]);
    }
    setShowModal(false);
  };

  // Sub Category Handlers
  const handleCreateSubCategory = () => {
    setModalType("subCategory");
    setEditingSubCategory(null);
    setSubCategoryForm({ name: "", slug: "", description: "", parentCategory: "" });
    setShowModal(true);
  };

  const handleEditSubCategory = (item: SubCategory) => {
    setModalType("subCategory");
    setEditingSubCategory(item);
    setSubCategoryForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      parentCategory: item.parentCategory
    });
    setShowModal(true);
  };

  const handleDeleteSubCategory = (id: number) => {
    if (confirm("Bu alt kateqoriyanı silmək istədiyinizdən əminsiniz?")) {
      setSubCategories(subCategories.filter(item => item.id !== id));
    }
  };

  const handleSaveSubCategory = () => {
    if (editingSubCategory) {
      setSubCategories(subCategories.map(item =>
        item.id === editingSubCategory.id
          ? { ...item, ...subCategoryForm, date: new Date().toLocaleDateString('az-AZ') }
          : item
      ));
    } else {
      const newItem: SubCategory = {
        id: Math.max(...subCategories.map(i => i.id), 0) + 1,
        ...subCategoryForm,
        itemCount: 0,
        date: new Date().toLocaleDateString('az-AZ')
      };
      setSubCategories([newItem, ...subCategories]);
    }
    setShowModal(false);
  };

  const handleNameChange = (name: string, type: "category" | "designType" | "subCategory") => {
    const slug = name.toLowerCase()
      .replace(/ə/g, 'e')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ğ/g, 'g')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    if (type === "category") {
      setCategoryForm({ ...categoryForm, name, slug });
    } else if (type === "designType") {
      setDesignTypeForm({ ...designTypeForm, name, slug });
    } else {
      setSubCategoryForm({ ...subCategoryForm, name, slug });
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600",
      pink: "from-pink-500 to-pink-600",
      yellow: "from-yellow-500 to-yellow-600",
      indigo: "from-indigo-500 to-indigo-600",
    };
    return colorMap[color] || colorMap.blue;
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDesignTypes = designTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubCategories = subCategories.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kateqoriya İdarəetməsi</h1>
          <p className="text-slate-600 mt-1">Əsas kateqoriyalar, dizayn tipləri və alt kateqoriyalar</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === "categories"
                ? "bg-gradient-to-r from-brand to-orange-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Folder className="w-5 h-5" />
            Əsas Kateqoriyalar
          </button>
          <button
            onClick={() => setActiveTab("designTypes")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === "designTypes"
                ? "bg-gradient-to-r from-brand to-orange-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Palette className="w-5 h-5" />
            Dizayn Tipləri
          </button>
          <button
            onClick={() => setActiveTab("subCategories")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === "subCategories"
                ? "bg-gradient-to-r from-brand to-orange-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100"
              }`}
          >
            <Layers className="w-5 h-5" />
            Alt Kateqoriyalar
          </button>
        </div>
      </div>

      {/* Search and Action Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`${activeTab === "categories" ? "Əsas kateqoriya" :
                  activeTab === "designTypes" ? "Dizayn tipi" :
                    "Alt kateqoriya"
                } axtar...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (activeTab === "categories") handleCreateCategory();
            else if (activeTab === "designTypes") handleCreateDesignType();
            else handleCreateSubCategory();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-orange-600 text-white font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Yeni Əlavə Et
        </button>
      </div>

      {/* Categories Tab Content */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-br ${getColorClass(category.color)} relative`}>
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="text-5xl">{category.icon}</div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-xl">{category.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-sm font-semibold">
                    {category.itemCount}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {category.slug}
                  </span>
                  <span>{category.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Design Types Tab Content */}
      {activeTab === "designTypes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesignTypes.map((designType) => (
            <div
              key={designType.id}
              className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEditDesignType(designType)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDesignType(designType.id)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Palette className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-xl">{designType.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-sm font-semibold">
                    {designType.itemCount}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{designType.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {designType.slug}
                  </span>
                  <span>{designType.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub Categories Tab Content */}
      {activeTab === "subCategories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubCategories.map((subCategory) => (
            <div
              key={subCategory.id}
              className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 relative">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEditSubCategory(subCategory)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSubCategory(subCategory.id)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Layers className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-semibold">
                    {subCategory.parentCategory}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-xl">{subCategory.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-sm font-semibold">
                    {subCategory.itemCount}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{subCategory.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {subCategory.slug}
                  </span>
                  <span>{subCategory.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {modalType === "category"
                  ? (editingCategory ? "Kateqoriya Redaktə Et" : "Yeni Kateqoriya")
                  : modalType === "designType"
                    ? (editingDesignType ? "Dizayn Tipi Redaktə Et" : "Yeni Dizayn Tipi")
                    : (editingSubCategory ? "Alt Kateqoriya Redaktə Et" : "Yeni Alt Kateqoriya")
                }
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Category Form */}
              {modalType === "category" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Kateqoriya Adı
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => handleNameChange(e.target.value, "category")}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                      placeholder="Kateqoriya adı"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-slate-50"
                      placeholder="kateqoriya-slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Təsvir
                    </label>
                    <textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                      placeholder="Kateqoriya haqqında qısa məlumat"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Rəng
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() => setCategoryForm({ ...categoryForm, color: color.value })}
                            className={`h-12 rounded-lg ${color.class} transition-all duration-200 ${categoryForm.color === color.value
                                ? "ring-4 ring-slate-900 ring-offset-2 scale-110"
                                : "hover:scale-105"
                              }`}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        İkon (Emoji)
                      </label>
                      <input
                        type="text"
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-center text-3xl"
                        placeholder="📁"
                        maxLength={2}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Önizləmə
                    </label>
                    <div className={`h-32 rounded-xl bg-gradient-to-br ${getColorClass(categoryForm.color)} relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.3) 2px, transparent 2px)",
                          backgroundSize: "30px 30px",
                        }}
                      />
                      <div className="absolute bottom-4 left-4">
                        <div className="text-5xl">{categoryForm.icon}</div>
                      </div>
                      <div className="absolute top-4 left-4 text-white">
                        <p className="font-bold text-lg">{categoryForm.name || "Kateqoriya adı"}</p>
                        <p className="text-sm opacity-90">{categoryForm.slug || "slug"}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Design Type Form */}
              {modalType === "designType" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Dizayn Tipi Adı
                    </label>
                    <input
                      type="text"
                      value={designTypeForm.name}
                      onChange={(e) => handleNameChange(e.target.value, "designType")}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                      placeholder="Məsələn: Minimal, Modern, Klassik"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={designTypeForm.slug}
                      onChange={(e) => setDesignTypeForm({ ...designTypeForm, slug: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-slate-50"
                      placeholder="dizayn-tipi-slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Təsvir
                    </label>
                    <textarea
                      value={designTypeForm.description}
                      onChange={(e) => setDesignTypeForm({ ...designTypeForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                      placeholder="Dizayn tipi haqqında qısa məlumat"
                    />
                  </div>
                </>
              )}

              {/* Sub Category Form */}
              {modalType === "subCategory" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Alt Kateqoriya Adı
                    </label>
                    <input
                      type="text"
                      value={subCategoryForm.name}
                      onChange={(e) => handleNameChange(e.target.value, "subCategory")}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                      placeholder="Məsələn: Qonaq Otağı, Yataq Otağı"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={subCategoryForm.slug}
                      onChange={(e) => setSubCategoryForm({ ...subCategoryForm, slug: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-slate-50"
                      placeholder="alt-kateqoriya-slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Əsas Kateqoriya
                    </label>
                    <select
                      value={subCategoryForm.parentCategory}
                      onChange={(e) => setSubCategoryForm({ ...subCategoryForm, parentCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                    >
                      <option value="">Əsas kateqoriya seçin</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Təsvir
                    </label>
                    <textarea
                      value={subCategoryForm.description}
                      onChange={(e) => setSubCategoryForm({ ...subCategoryForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                      placeholder="Alt kateqoriya haqqında qısa məlumat"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
              >
                Ləğv et
              </button>
              <button
                onClick={() => {
                  if (modalType === "category") handleSaveCategory();
                  else if (modalType === "designType") handleSaveDesignType();
                  else handleSaveSubCategory();
                }}
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
