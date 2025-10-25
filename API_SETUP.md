# İnternet Arama API Kurulumu

Bu proje, katalog sayfasında Pinterest tarzı internet araması için **Unsplash** ve **Pexels** API'lerini kullanır.

## Adım 1: API Anahtarı Alma

### Unsplash API (Önerilen)

1. [Unsplash Developers](https://unsplash.com/developers) sayfasına gidin
2. Hesap oluşturun veya giriş yapın
3. "New Application" butonuna tıklayın
4. Uygulama bilgilerini doldurun:
   - Application name: `Dargah Group Website`
   - Description: `Interior design and architecture catalog`
5. Terms & Conditions'ı kabul edin
6. **Access Key**'i kopyalayın

**Limitler (Ücretsiz):**
- 50 istek/saat
- Yüksek kaliteli tasarım görselleri
- Mimarlık, iç mekan, tasarım kategorilerinde zengin içerik

### Pexels API (Alternatif - Sınırsız)

1. [Pexels API](https://www.pexels.com/api/) sayfasına gidin
2. Hesap oluşturun veya giriş yapın
3. API key'inizi kopyalayın

**Limitler (Ücretsiz):**
- Sınırsız istek (rate limit: 200 istek/saat)
- Yüksek kaliteli stok fotoğraflar

## Adım 2: Environment Dosyası Oluşturma

1. Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
# .env.local dosyasını oluştur
touch .env.local
```

2. Aşağıdaki içeriği ekleyin:

```env
# Unsplash API Key  
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Alternatif: Pexels API (opsiyonel)
# NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key_here
```

3. `your_unsplash_access_key_here` kısmını gerçek API anahtarınızla değiştirin

## Adım 3: Geliştirme Sunucusunu Yeniden Başlatma

```bash
npm run dev
```

## Kullanım

1. `/catalog` sayfasına gidin
2. Arama kutusunun yanındaki **"İnternet"** butonuna tıklayın
3. İngilizce arama yapın (örnek: "modern interior", "minimalist bedroom", "luxury villa")
4. Otomatik olarak Unsplash/Pexels'den yüksek kaliteli görseller gelecek

## Arama İpuçları

İnternet araması için en iyi sonuçlar almak için:

- **İngilizce anahtar kelimeler kullanın:**
  - ✅ `modern living room`
  - ✅ `minimalist kitchen design`
  - ✅ `luxury villa architecture`
  - ✅ `contemporary office interior`
  
- **Kategori filtrelerini kullanın:**
  - Sol taraftan "Modern", "Minimal", "Klassik" seçin
  - Alt kategorilerden "Qonaq otağı", "Yataq otağı", "Mətbəx" seçin
  - Sistem otomatik olarak filtrelerinize uygun aramayı geliştirir

## Sorun Giderme

### "Unsplash API key not configured" hatası

- `.env.local` dosyasının proje kök dizininde olduğundan emin olun
- API anahtarının doğru kopyalandığından emin olun
- Geliştirme sunucusunu yeniden başlatın (`npm run dev`)

### "Axtarış uğursuz oldu" hatası

- İnternet bağlantınızı kontrol edin
- API limitine ulaşmış olabilirsiniz (Unsplash: 50 istek/saat)
- Pexels API'yi alternatif olarak kullanabilirsiniz

### Görseller yüklenmiyor

- `next.config.ts` dosyasında domain'lerin ekli olduğundan emin olun
- Tarayıcı console'unu kontrol edin
- Adblocker gibi eklentileri geçici olarak devre dışı bırakın

## API Değiştirme

Varsayılan olarak **Unsplash** kullanılır. **Pexels**'e geçmek için:

1. `.env.local` dosyasına Pexels API key ekleyin
2. Arama URL'sinde `provider` parametresini değiştirin:

```typescript
// src/app/catalog/page.tsx içinde
const response = await fetch(
  `/api/search-images?q=${encodeURIComponent(enhancedQuery)}&per_page=30&provider=pexels`
);
```

## Güvenlik Notu

- ⚠️ `.env.local` dosyasını **asla** Git'e commit etmeyin
- `.env.local` dosyası `.gitignore`'da olmalı
- API anahtarlarını kimseyle paylaşmayın
- Production'da environment variable'ları hosting platformunuzdan ayarlayın (Vercel, Netlify, vb.)

## Özellikler

✅ Pinterest tarzı görsel arama  
✅ Otomatik filtre entegrasyonu  
✅ Debounced arama (800ms)  
✅ Loading indicator  
✅ Hata yönetimi  
✅ Photographer kredisi  
✅ İki API seçeneği (Unsplash & Pexels)  
✅ Responsive tasarım  
✅ Local/Internet arama toggle  

## Destek

Herhangi bir sorun yaşarsanız:
1. API anahtarlarının geçerli olduğunu kontrol edin
2. Console loglarını inceleyin
3. Network tab'inde API isteklerini kontrol edin

