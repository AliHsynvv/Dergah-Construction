# 🔍 İnternet Arama Testi

## Hızlı Test Adımları

### 1. Sunucuyu Başlatın

```bash
npm run dev
```

### 2. Katalog Sayfasına Gidin

Tarayıcıda şu adresi açın:
```
http://localhost:3000/catalog
```

### 3. İnternet Modunu Aktive Edin

- Arama kutusunun yanındaki **"İnternet"** butonuna tıklayın
- Mavi bilgi kutusu görünecek

### 4. Arama Yapın

Arama kutusuna şunlardan birini yazın:
```
modern interior
minimalist kitchen
luxury villa
contemporary office
bedroom design
```

### 5. Sonuçları Bekleyin

- Loading indicator (dönen icon) görünecek
- 800ms sonra arama başlayacak
- Sonuçlar geldiğinde görseller görüntülenecek

## 🐛 Debug: Console Loglarını Kontrol Edin

1. **Tarayıcıda F12 tuşuna basın** (Developer Tools)
2. **Console** sekmesine gidin
3. Şu logları göreceksiniz:

```
🔍 İnternet araması başlatılıyor: modern interior
📝 Geliştirilmiş arama sorgusu: modern interior interior design architecture
🌐 API isteği gönderiliyor: /api/search-images?q=...
📡 API yanıtı alındı: 200 OK
📦 API verisi: {success: true, results: [...], ...}
✅ 5 sonuç bulundu (demo provider)  ← DEMO MODE
✅ Sonuçlar hazırlandı: 5 öğe
✅ Arama tamamlandı
```

### Demo Mode (API Anahtarı Yoksa)

API anahtarı yapılandırılmadıysa:
```
⚠️ API key not configured, using demo mode
✅ Found 5 images
```

- 5 demo görsel gösterilir
- Görsellerde **"Web"** badge'i olacak
- Photographer: "Demo"

### Gerçek API (API Anahtarı Varsa)

API anahtarı yapılandırıldıysa:
```
✅ Found 30 images
```

- Unsplash/Pexels'den gerçek görseller
- Photographer bilgisi gerçek
- 30 sonuç (veya arama sonucu kadar)

## ❌ Hata Durumları

### Hata 1: Hiç Sonuç Gelmiyor

**Console'da kontrol edin:**

```javascript
// Şu logları görmüyorsanız:
🔍 İnternet araması başlatılıyor...
```

**Çözüm:**
- "İnternet" butonuna tıkladınız mı?
- Arama kutusuna bir şey yazdınız mı?
- 800ms bekleyin (debounce)

### Hata 2: API Hatası

**Console'da göreceksiniz:**
```
❌ API hatası: ...
```

**Çözüm:**
1. Sunucuyu yeniden başlatın: `Ctrl+C` → `npm run dev`
2. `.env.local` dosyası varsa kontrol edin
3. Demo mode çalışıyorsa sorun yok!

### Hata 3: Görseller Yüklenmiyor

**Console'da göreceksiniz:**
```
Failed to load image: ...
```

**Çözüm:**
1. İnternet bağlantınızı kontrol edin
2. Adblocker'ı devre dışı bırakın
3. `next.config.ts` dosyasında domain'ler ekli mi kontrol edin

## ✅ Başarılı Test Sonucu

Başarılı bir test şu şekilde görünür:

1. ✅ "İnternet" butonu tıklanabilir
2. ✅ Mavi bilgi kutusu görünür
3. ✅ Arama yazdığınızda loading indicator görünür
4. ✅ Console'da loglar görünür
5. ✅ 5 demo görsel veya 30 gerçek görsel gelir
6. ✅ Görsellerde "Web" badge'i var
7. ✅ Photographer bilgisi görünür

## 🎯 Test Senaryoları

### Test 1: Basit Arama
```
1. İnternet moduna geç
2. "modern" yaz
3. Bekle
4. ✅ Sonuçlar geldi mi?
```

### Test 2: Filtreli Arama
```
1. Sol taraftan "Minimal" seç
2. "Qonaq otağı" seç
3. İnternet moduna geç
4. "white" yaz
5. ✅ "white minimalist living room interior design" araması yapıldı mı?
```

### Test 3: Mod Değiştirme
```
1. İnternet modunda "modern" ara
2. "Lokal" moduna geç
3. ✅ Local sonuçlar geldi mi?
4. Tekrar "İnternet" moduna geç
5. ✅ İnternet sonuçları tekrar geldi mi?
```

### Test 4: Hızlı Yazma (Debounce)
```
1. İnternet moduna geç
2. Hızlıca "m", "o", "d", "e", "r", "n" yaz
3. ✅ Sadece 1 API çağrısı yapıldı mı? (800ms sonra)
```

## 📊 Beklenen Davranışlar

| Durum | Beklenen |
|-------|----------|
| API anahtarı YOK | Demo mode, 5 görsel |
| API anahtarı VAR | Gerçek görseller, 30+ sonuç |
| Arama boş | Sonuçlar temizlenir |
| Arama çok kısa | 800ms bekler |
| İnternet yok | Hata mesajı görünür |
| API limiti doldu | Hata mesajı görünür |

## 🔧 Terminal Log Kontrolü

Sunucunun çalıştığı terminal'de şunları göreceksiniz:

```
🔍 Image search request: query="modern interior design architecture", provider="unsplash"
⚠️ API key not configured, using demo mode
✅ Found 5 images
```

veya

```
🔍 Image search request: query="modern interior design architecture", provider="unsplash"
✅ Found 30 images
```

## 📞 Sorun Çözüm Checklist

- [ ] Sunucu çalışıyor mu? (`npm run dev`)
- [ ] `/catalog` sayfasındasınız?
- [ ] "İnternet" butonuna tıkladınız mı?
- [ ] Arama kutusuna bir şey yazdınız mı?
- [ ] F12 → Console açık mı?
- [ ] Console'da loglar görünüyor mu?
- [ ] 800ms beklediniz mi?
- [ ] İnternet bağlantınız var mı?

## 🎉 Demo Mode Test

API anahtarı olmadan test etmek için:

1. `.env.local` dosyası olmasın veya API anahtarı yanlış olsun
2. Sunucuyu başlatın
3. İnternet modunda arama yapın
4. ✅ Demo görseller gelecek!

Bu sayede hemen test edebilirsiniz! 🚀

