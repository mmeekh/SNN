# 🗡️ Sword Nest - Yapay Zeka Çözümleri Portfolio

**Dinamik & Yaratıcı** AI çözümleri sunan Sword Nest'in interaktif portfolio websitesi. Benzersiz kılıç animasyonu ve spotlight efektleri ile modern web deneyimi.

## 🚀 Özellikler

- **🗡️ İnteraktif Kılıç Animasyonu** - 120 frame ile scroll-based rotasyon
- **✨ Spotlight Efekti** - Mouse takip eden içerik açığa çıkarma sistemi
- **🎬 4 Demo Video Showcase** - YouTube entegrasyon hazır portfolio
- **📱 Responsive Tasarım** - Mobile-first yaklaşım
- **⚡ Performance Optimized** - Lazy loading, image preloading, throttled events
- **🎨 Modern UI/UX** - Glassmorphism, gradient efektleri, smooth animasyonlar
- **♿ Accessibility** - WCAG AA compliance, keyboard navigation
- **📊 Analytics Ready** - Google Analytics 4 entegrasyon hazır

## 📁 Proje Yapısı

```
sword-nest-portfolio/
├── index.html                    # Ana sayfa
├── assets/
│   ├── images/
│   │   ├── sword-rotation/       # 0001.png - 0120.png (Kılıç animasyon frame'leri)
│   │   ├── backgrounds/          # Arka plan görselleri
│   │   └── icons/                # UI iconları, favicon
│   ├── videos/                   # Video dosyaları (backup)
│   └── fonts/                    # Custom fontlar
├── src/
│   ├── styles/
│   │   └── main.css              # Ana CSS dosyası (CSS Variables, responsive)
│   ├── scripts/
│   │   ├── sword-animation.js    # Kılıç rotasyon sistemi
│   │   ├── spotlight.js          # Mouse spotlight efektleri
│   │   └── main.js               # Ana uygulama kontrolcüsü
│   └── components/
│       ├── hero.html             # Hero section component
│       ├── portfolio.html        # Portfolio demo section
│       └── contact.html          # İletişim formu component
├── docs/
│   ├── design-brief.md           # Tasarım dokümantasyonu
│   └── color-palette.md          # Renk rehberi
└── README.md                     # Bu dosya
```

## 🛠️ Kurulum

### Gereksinimler
- Modern web tarayıcı (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- 120 adet kılıç rotasyon görseli (PNG format, 0001.png - 0120.png)
- YouTube video linkleriniz (demo entegrasyonu için)

### Adım 1: Projeyi İndirin
```bash
git clone https://github.com/your-username/sword-nest-portfolio.git
cd sword-nest-portfolio
```

### Adım 2: Kılıç Görsellerini Yerleştirin
`assets/images/sword-rotation/` klasörüne kılıç animasyon frame'lerinizi koyun:
- Dosya adları: `0001.png`, `0002.png`, ..., `0120.png`
- Önerilen boyut: 1000x1200px
- Format: PNG (şeffaf arka plan)

### Adım 3: YouTube Videolarını Entegre Edin
`src/components/portfolio.html` dosyasında video placeholder'larını gerçek YouTube embed kodları ile değiştirin:

```html
<!-- Placeholder yerine -->
<div class="video-placeholder">...</div>

<!-- YouTube iframe ekleyin -->
<iframe 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

### Adım 4: İletişim Bilgilerini Güncelleyin
`src/components/contact.html` dosyasında:
- E-posta adresi
- Telefon numarası
- WhatsApp linki
- Sosyal medya hesapları

### Adım 5: Çalıştırın
```bash
# Basit HTTP server ile test
python -m http.server 8000
# veya
npx serve .
```

Tarayıcıda `http://localhost:8000` adresini açın.

## 🎨 Özelleştirme

### Renk Paleti
`src/styles/main.css` dosyasında CSS variables'ı düzenleyin:

```css
:root {
    --charcoal-black: #0F0F0F;    /* Ana arka plan */
    --neon-blue: #38BDF8;         /* AI vurguları, kılıç glow */
    --silver-gray: #9CA3AF;       /* İkincil metinler */
    --orange: #F97316;            /* Aksiyonlar, hareketli öğeler */
    --light-gray: #F3F4F6;        /* Ana metinler */
}
```

### Kılıç Animasyon Hızı
`src/scripts/sword-animation.js` dosyasında:

```javascript
// Daha hızlı animasyon için oranı düşürün
const scrollPercent = Math.min(window.scrollY / (document.body.scrollHeight * 0.2), 1);

// Daha yavaş animasyon için oranı artırın  
const scrollPercent = Math.min(window.scrollY / (document.body.scrollHeight * 0.5), 1);
```

### Spotlight Boyutu
`src/scripts/spotlight.js` dosyasında:

```javascript
// Spotlight boyutunu değiştir
this.spotlightSize = 400; // Varsayılan: 300
```

## 🎯 İçerik Yönetimi

### Hero Section
`src/components/hero.html` - Ana başlık ve açıklama metinleri

### Portfolio Demos
`src/components/portfolio.html` - 4 demo video açıklamaları ve teknoloji listesi

### İletişim Formu
`src/components/contact.html` - Form alanları ve FAQ bölümü

### Metin Değişiklikleri
Ana metinleri `index.html` dosyasından düzenleyebilirsiniz:
- "Dinamik & Yaratıcı" vurguları
- "Yapay Zeka" referansları
- Servis açıklamaları

## ⚡ Performance

### Optimizasyon İpuçları
1. **Görsel Optimizasyonu**: Kılıç frame'lerini WebP formatına çevirin
2. **CDN Kullanımı**: Statik dosyaları CDN'de barındırın
3. **Lazy Loading**: Büyük görseller için lazy loading aktif
4. **Caching**: Browser cache headers'ı ayarlayın

### Performance Monitoring
```javascript
// Browser console'da
app.performance(); // Performance metriklerini görüntüle
```

## 🔧 Geliştirme

### Debug Mode
Localhost'ta otomatik aktif olur veya:
```javascript
app.debugMode = true;
app.enableDebugMode();
```

### Keyboard Shortcuts
- `Home`: Hero section'a git
- `End`: Contact section'a git
- `Ctrl + ↑/↓`: Section'lar arası navigate
- `H`: Spotlight toggle
- `Ctrl + D`: Debug info

### Event Tracking
```javascript
// Custom event tracking
app.trackEvent('category', 'action', 'label', value);

// Örnek
app.trackEvent('video', 'play', 'chatbot-demo');
```

## 📱 Browser Desteği

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome  | ✅ 90+  | ✅ 90+ |
| Firefox | ✅ 88+  | ✅ 88+ |
| Safari  | ✅ 14+  | ✅ 14+ |
| Edge    | ✅ 90+  | ✅ 90+ |

### Fallbacks
- **Eski tarayıcılar**: Animasyonlar devre dışı, temel layout
- **Düşük performans**: Performance mode otomatik aktif
- **Reduced motion**: Sistem tercihi otomatik algılanır

## 🚀 Deployment

### GitHub Pages
```bash
# gh-pages branch'inde deploy
npm install -g gh-pages
gh-pages -d .
```

### Netlify
1. GitHub repo'yu Netlify'a bağlayın
2. Build command: Yok (statik site)
3. Publish directory: `/`

### Vercel
```bash
npx vercel
```

### Custom Domain
DNS kayıtlarını güncelledikten sonra:
- HTTPS sertifikası otomatik
- CDN optimizasyonu aktif
- Gzip compression

## 📊 Analytics Setup

### Google Analytics 4
`index.html` head section'ına ekleyin:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Tracked Events
- Page load ve performance metrics
- Section görüntülenme
- Form submission
- Video interactions
- Navigation events

## 🔒 Güvenlik

### Form Güvenliği
- Client-side validation
- CSRF protection (backend)
- Rate limiting önerilir
- Spam protection

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    frame-src https://www.youtube.com;
">
```

## 🐛 Sorun Giderme

### Kılıç Animasyonu Çalışmıyor
1. Görsellerin doğru yolda olduğunu kontrol edin
2. Dosya adlarının formatını kontrol edin (0001.png)
3. Console'da JavaScript hataları olup olmadığını kontrol edin

### Performance Sorunları
1. Görselleri optimize edin (TinyPNG)
2. Performance mode'u aktif edin
3. Animations'ı azaltın

### Mobile Uyumluluk
1. Viewport meta tag'i kontrol edin
2. Touch events'leri test edin
3. Responsive breakpoints'leri ayarlayın

## 📞 Destek

- **Documentation**: Bu README ve `/docs` klasörü
- **Issues**: GitHub issues'da bug report
- **Questions**: Discussions sekmesinde soru

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakın.

## 🏆 Credits

- **Tasarım**: Sword Nest Design Team
- **Geliştirme**: Sword Nest Development Team
- **Icons**: Custom emoji set
- **Inspiration**: Modern portfolio sites, gaming UI/UX

---

**🗡️ Sword Nest - Yapay Zeka Çözümleri**  
*Dinamik & Yaratıcı yaklaşımla geleceğin teknolojileri*

**Son Güncelleme**: Haziran 2025  
**Versiyon**: 1.0.0