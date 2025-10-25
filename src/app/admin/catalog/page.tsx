"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X,
  Upload,
  Save,
  Filter,
  Grid,
  List
} from "lucide-react";
import Image from "next/image";

interface CatalogItemRow {
  id: string;
  image_url: string;
  created_at: string;
  design_type?: { id: string; name: string };
  room_type?: { id: string; name: string };
  images?: { image_url: string; position: number }[];
}

export default function CatalogAdmin() {
  const [loading, setLoading] = useState(false);
  const [catalogItems, setCatalogItems] = useState<CatalogItemRow[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItemRow | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignType, setSelectedDesignType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [formData, setFormData] = useState({
    designTypeId: "",
    roomTypeId: "",
    imageUrl: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [initialImageUrls, setInitialImageUrls] = useState<string[]>([]);
  const [designTypes, setDesignTypes] = useState<{ id: string; name: string }[]>([]);
  const [roomTypes, setRoomTypes] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        const [typesRes, roomRes, itemsRes] = await Promise.all([
          fetch("/api/catalog/design-types").then(r => r.json()),
          fetch("/api/catalog/room-types").then(r => r.json()),
          fetch("/api/catalog/items").then(r => r.json()),
        ]);
        if (typesRes.success) setDesignTypes(typesRes.designTypes);
        if (roomRes.success) setRoomTypes(roomRes.roomTypes);
        if (itemsRes.success) setCatalogItems(itemsRes.items);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ designTypeId: "", roomTypeId: "", imageUrl: "" });
    setImageUrls([]);
    setInitialImageUrls([]);
    setShowModal(true);
  };

  const handleEdit = (item: CatalogItemRow) => {
    setEditingItem(item);
    setFormData({
      designTypeId: item.design_type?.id || "",
      roomTypeId: item.room_type?.id || "",
      imageUrl: item.image_url,
    });
    // If API includes images, map them; otherwise, seed with cover
    const imgs = item.images?.map((i) => i.image_url) || (item.image_url ? [item.image_url] : []);
    setImageUrls(imgs);
    setInitialImageUrls(imgs);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu məhsulu silmək istədiyinizdən əminsiniz?")) return;
    try {
      const res = await fetch(`/api/catalog/items?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      }).then(r => r.json());
      if (res.success) {
        setCatalogItems(catalogItems.filter(item => item.id !== id));
      } else {
        alert(res.error || "Silinmə zamanı xəta baş verdi");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Silinmə zamanı xəta baş verdi";
      alert(msg);
    }
  };

  const handleSave = async () => {
    if (editingItem) {
      // Editing: append only NEW images, do not create a new item
      const originalSet = new Set(initialImageUrls);
      const newOnly = imageUrls.filter((u) => !originalSet.has(u));
      if (newOnly.length === 0) {
        setShowModal(false);
        return;
      }
      const res = await fetch("/api/catalog/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: editingItem.id, image_urls: newOnly })
      }).then(r => r.json());
      if (res.success) {
        setCatalogItems(catalogItems.map(it => it.id === editingItem.id ? res.item : it));
        setShowModal(false);
        setEditingItem(null);
        setInitialImageUrls([]);
        setImageUrls([]);
      }
      return;
    }

    // Creating new item
    if (!formData.designTypeId || !formData.roomTypeId || (imageUrls.length === 0 && !formData.imageUrl)) return;
    const payload: { design_type_id: string; room_type_id: string; image_url?: string; image_urls?: string[] } = { 
      design_type_id: formData.designTypeId, 
      room_type_id: formData.roomTypeId 
    };
    if (imageUrls.length > 0) payload.image_urls = imageUrls;
    else payload.image_url = formData.imageUrl;
    const res = await fetch("/api/catalog/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(r => r.json());
    if (res.success) {
      setCatalogItems([res.item, ...catalogItems]);
      setShowModal(false);
    }
  };

  const filteredItems = catalogItems.filter(item => {
    const dt = item.design_type?.name || "";
    const room = item.room_type?.name || "";
    const matchesSearch = room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDT = selectedDesignType === "all" || dt === selectedDesignType;
    return matchesSearch && matchesDT;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kataloq İdarəetməsi</h1>
          <p className="text-slate-600 mt-1">Məhsul və materialları idarə edin</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-blue-700 text-white font-semibold hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Yeni Məhsul
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Kataloqda axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={selectedDesignType}
              onChange={(e) => setSelectedDesignType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand transition-colors"
            >
              <option value="all">Bütün Dizayn Tipləri</option>
              {designTypes.map(type => (
                <option key={type.id} value={type.name}>{type.name}</option>
              ))}
            </select>

            <div className="flex gap-1 border border-slate-200 rounded-lg p-1 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid" ? "bg-gradient-to-r from-brand to-blue-700 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list" ? "bg-gradient-to-r from-brand to-blue-700 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-brand to-blue-700 text-white shadow-sm">
          <p className="text-sm opacity-90">Toplam Resim</p>
          <p className="text-3xl font-bold mt-1">{catalogItems.reduce((acc, it) => acc + (it.images ? it.images.length : (it.image_url ? 1 : 0)), 0)}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-600">Dizayn Tipləri</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{designTypes.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-600">Room Types</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{roomTypes.length}</p>
        </div>
      </div>

      {/* Catalog Items */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 bg-slate-100">
                <Image
                  src={item.images?.[0]?.image_url || item.image_url}
                  alt={item.room_type?.name || "Kataloq"}
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
                {item.images && item.images.length > 1 && (
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {item.images.slice(0,5).map((img, idx) => (
                      <span key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.room_type?.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-semibold">
                    {item.design_type?.name}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold">
                    {item.room_type?.name}
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString('az-AZ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Şəkil</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Ad</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Dizayn Tipi</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Alt Kateqoriya</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Tarix</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                      <Image src={item.images?.[0]?.image_url || item.image_url} alt={item.room_type?.name || "Kataloq"} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{item.room_type?.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      {item.design_type?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {item.room_type?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{new Date(item.created_at).toLocaleDateString('az-AZ')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-700 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingItem ? "Məhsul Redaktə Et" : "Yeni Məhsul"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* No product name/description for now; only mapping to design type, room type and image */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Dizayn Tipi
                  </label>
                  <select
                    value={formData.designTypeId}
                    onChange={async (e) => setFormData({...formData, designTypeId: e.target.value, roomTypeId: ""})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-white text-slate-900"
                  >
                    <option value="">Dizayn tipi seçin</option>
                    {designTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Room Type
                  </label>
                  <select
                    value={formData.roomTypeId}
                    onChange={(e) => setFormData({...formData, roomTypeId: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-white text-slate-900"
                  >
                    <option value="">Room type seçin</option>
                    {roomTypes.map(rt => (
                      <option key={rt.id} value={rt.id}>{rt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Şəkillər
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData.imageUrl.trim()) {
                          setImageUrls([...imageUrls, formData.imageUrl.trim()]);
                          setFormData({...formData, imageUrl: ""});
                        }
                      }}
                      className="flex-1 px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-white text-slate-900 placeholder:text-slate-500"
                      placeholder="https://... (Enter ilə əlavə et)"
                    />
                    <label className="px-4 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-slate-600" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length === 0) return;
                          const uploaded: string[] = [];
                          for (const file of files) {
                            const fd = new FormData();
                            fd.append("file", file);
                            const res = await fetch("/api/upload", { method: "POST", body: fd }).then(r => r.json());
                            if (res.success) uploaded.push(res.url);
                          }
                          if (uploaded.length > 0) setImageUrls([...imageUrls, ...uploaded]);
                        }}
                      />
                    </label>
                  </div>
                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {imageUrls.map((url, i) => (
                        <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 bg-white/80 hover:bg-white text-slate-700 rounded px-2 py-0.5 text-xs"
                          >
                            Sil
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-brand to-blue-700 text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-[0.99]"
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

