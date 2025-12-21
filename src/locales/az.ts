export const az = {
  // Navbar
  nav: {
    home: "Ana səhifə",
    catalog: "Kataloq",
    portfolio: "Portfolio",
    services: "Xidmətlər",
    about: "Haqqımızda",
    contact: "Əlaqə",
  },

  // Home Page
  home: {
    badge: "Premium inşaat xidmətləri",
    hero: {
      title1: "Memarlıq və",
      title2: "tikinti həlləri",
      rotatingWords: ["müasir", "etibarlı"],
      description: "Dargah Construction — yaşayış və kommersiya layihələri üçün qabaqcıl planlaşdırma, innovativ dizayn və yüksək keyfiyyətli inşaat xidmətləri təqdim edir.",
      projectsBtn: "Layihələrimiz",
      contactBtn: "Bizimlə əlaqə",
      experience: "il təcrübə",
      projects: "tamamlanmış layihə",
      featuredProjectLabel: "Seçilmiş Layihə",
      featuredProjectTitle: "Sahil Layihəsi",
      cards: [
        { title: "Villa layihəsi" },
        { title: "İnteryer dizayn" },
        { title: "Fasad yenilənməsi" },
        { title: "Ofis təmiri" },
        { title: "Layihə idarəetməsi" },
      ],
    },
    portfolio: {
      title: "Son layihələrimiz",
      subtitle: "Müxtəlif kateqoriyalarda tamamlanmış premium layihələr",
      viewAll: "Hamısına bax",
    },
    whyUs: {
      badge: "Niyə Dargah Construction?",
      title1: "Etibarlı tərəfdaşınız",
      title2: "planlamadan təhvilə qədər",
      description: "10+ illik təcrübəmizlə yüzlərlə uğurlu layihəni gerçəkləşdirdik. Hər bir müştərimiz üçün fərdi yanaşma və premium keyfiyyət təqdim edirik.",
      features: {
        team: {
          title: "Peşəkar komanda",
          desc: "Təcrübəli memarlar və ustalarla layihələriniz təhlükəsiz əllərdədir.",
        },
        delivery: {
          title: "Zamanında təslim",
          desc: "Dəqiq planlama ilə işlər vaxtında və səmərəli tamamlanır.",
        },
        quality: {
          title: "Yüksək keyfiyyət",
          desc: "Material və icrada premium standartlara sadiqik.",
        },
        budget: {
          title: "Şəffaf büdcə",
          desc: "Aydın smeta və xərclər — sürprizlərsiz proses.",
        },
      },
      learnMore: "Daha çox məlumat",
    },
  },

  // Footer
  footer: {
    tagline: "Premium inşaat həlləri",
    description: "Müasir memarlıq və inşaat həlləri ilə yaşayış və kommersiya layihələriniz üçün qabaqcıl planlaşdırma, innovativ dizayn və yüksək keyfiyyətli inşaat xidmətləri təqdim edirik.",
    contact: "Əlaqə məlumatları",
    location: "Yerləşmə",
    workHours: "İş saatları",
    workHoursDetails: {
      weekdays: "B.e. – Cümə: 09:00 – 18:00",
      saturday: "Şənbə: 10:00 – 16:00",
      sunday: "Bazar: Bağlı",
    },
    address: "Bakı, Azərbaycan",
    phone: "+994 70 299 99 98",
    email: "info@dargah.az",
    links: {
      privacy: "Məxfilik",
      terms: "Şərtlər",
      support: "Dəstək",
    },
    copyright: "Bütün hüquqlar qorunur.",
  },

  // Catalog
  catalog: {
    all: "Hamısı",
    catalog: "Kataloq",
    description: "Təmiz xətlər, az ornament, şüşə/metal/taxta balansı.",
    showMore: "Daha fazla",
    showLess: "Daha az",
    showMoreShort: "Az",
    showMoreCount: (count: number) => `Daha fazla (${count})`,
    showMoreCountShort: (count: number) => `+${count}`,
    // Design Types translations
    designTypes: {
      "Modern": "Modern",
      "Minimal": "Minimal",
      "Klassik": "Klassik",
      "Digər": "Digər",
      "Üslub": "Üslub",
    },
    // Room Types translations
    roomTypes: {
      "Qonaq otağı": "Qonaq otağı",
      "Yataq otağı": "Yataq otağı",
      "Mətbəx": "Mətbəx",
      "Hamam": "Hamam",
      "Vanna otağı": "Vanna otağı",
      "Koridor": "Koridor",
      "Ofis": "Ofis",
      "Kabinet": "Kabinet",
      "Uşaq otağı": "Uşaq otağı",
      "Qonaq yataq otağı": "Qonaq yataq otağı",
      "Balkon": "Balkon",
      "Terras": "Terras",
    },
  },

  // Portfolio
  portfolio: {
    badge: "Portfolio",
    title1: "Uğur dolu",
    title2: "Layihələrimiz",
    description: "Mükəmməlliyə olan bağlılığımızla həyata keçirdiyimiz yaşayış və kommersiya layihələrini kəşf edin.",
    all: "Hamısı",
    learnMore: "Daha çox məlumat",
    // Categories
    categories: {
      "Villa": "Villa",
      "Ofis": "Ofis",
      "Mənzil": "Mənzil",
      "İnteryer": "İnteryer",
      "Memarlıq": "Memarlıq",
      "Tikinti": "Tikinti",
    },
    // Projects
    projects: {
      "Modern Villa Kompleksi": {
        title: "Modern Villa Kompleksi",
        desc: "Lüks villa tasarımı və inşaatı",
      },
      "Klasik Villa": {
        title: "Klasik Villa",
        desc: "Geleneksel memarlıq ilə müasir rahatlıq",
      },
      "Ofis Kompleksi": {
        title: "Ofis Kompleksi",
        desc: "İş yerləri üçün peşəkar dizayn",
      },
    },
  },

  // Services
  services: {
    badge: "Xidmətlərimiz",
    title1: "Geniş xidmət çeşidi",
    title2: "ilə yanınızdayıq",
    description: "Memarlıqdan tikintiyə, dizayndan texniki xidmətlərə qədər kompleks həllər təqdim edirik.",
    serviceCount: (count: number) => `${count} xidmət`,
    showMore: (count: number) => `Daha çox (${count}+)`,
    showLess: "Daha az göstər",
    premium: "Premium",
    cta: {
      title: "Layihənizi müzakirə edək",
      description: "Peşəkar komandamız sizin layihəniz üçün ən yaxşı həlləri təqdim etməyə hazırdır.",
      button: "Pulsuz Konsultasiya",
    },
  },

  // About
  about: {
    badge: "Haqqımızda",
    title1: "Peşəkar komanda",
    title2: "ilə mükəmməllik",
    description: "Dargah Construction — müasir memarlıq və inşaat həllləri təqdim edən peşəkar komandadır. Keyfiyyət, etibarlılıq və vaxtında təhvil əsas dəyərlərimizdir.",
    keyPoints: {
      quality: "Keyfiyyət zəmanəti",
      onTime: "Vaxtında təhvil",
      transparent: "Şəffaf qiymətlər",
      certified: "Sertifikatlı komanda",
    },
    stats: {
      experience: "İl təcrübə",
      projects: "Layihə",
      clients: "Məmnun müştəri",
    },
    timeline: {
      title: "İnkişaf yolumuz",
      subtitle: "Dargah Construction-ın uğur hekayəsi və böyümə mərhələləri",
      milestones: [
        { year: "2015", title: "Təməl atıldı", desc: "Şirkətimiz inşaat sektorunda fəaliyyətə başladı" },
        { year: "2018", title: "İlk iri layihə", desc: "Premium yaşayış kompleksi uğurla tamamlandı" },
        { year: "2021", title: "Komersiya genişlənməsi", desc: "Ofis və ticarət mərkəzləri portfeli genişləndirildi" },
        { year: "2024", title: "Tam xidmət spektrumu", desc: "Daxili dizayn və layihələndirmə xidmətləri əlavə edildi" },
      ],
    },
    values: {
      title: "Missiya, Vizyon və Dəyərlər",
      subtitle: "Şirkətimizin əsas prinsipləri və gələcəyə baxışı",
      mission: {
        title: "Missiya",
        text: "Müştərilərimizə yüksək keyfiyyətli, etibarlı və estetik tikinti həllləri təqdim etmək. Hər bir layihəni unikal ehtiyaclara uyğun şəkildə həyata keçirmək.",
      },
      vision: {
        title: "Vizyon",
        text: "Regionda ən etibarlı və yenilikçi inşaat tərəfdaşı olmaq. Sektorun standartlarını müəyyən edən lider şirkət kimi tanınmaq.",
      },
      coreValues: {
        title: "Dəyərlər",
        text: "Şəffaflıq, məsuliyyət, komanda işi və dayanıqlılıq. Müştərilərimizlə uzunmüddətli əməkdaşlıq qurmağa və sektorun inkişafına töhfə verməyə inanırıq.",
      },
    },
    statsSection: {
      title: "Rəqəmlərlə Dargah",
      subtitle: "Uğurlarımız və nailiyyətlərimiz rəqəmlərdə",
    },
  },

  // Contact
  contact: {
    badge: "Əlaqə",
    title1: "Bizimlə əlaqə",
    title2: "saxlayın",
    description: "Layihələriniz üçün peşəkar məsləhət və konsultasiya xidmətlərimizdən istifadə edin. Sizinlə əməkdaşlıq etməkdən məmnun olarıq.",
    quickActions: {
      call: "Zəng edin",
      email: "E-poçt yazın",
      whatsapp: "WhatsApp",
    },
    info: {
      address: "Ünvan",
      phone: "Telefon",
      email: "E-poçt",
      workHours: "İş saatları",
      workHoursValue: "B.e.–Cümə: 09:00–18:00, Şənbə: 10:00–16:00",
    },
    form: {
      title: "Mesaj göndərin",
      subtitle: "Formu doldurun və tezliklə sizinlə əlaqə saxlayaq",
      name: "Ad və Soyad",
      namePlaceholder: "Adınız",
      email: "E-poçt",
      emailPlaceholder: "emailiniz@mail.com",
      subject: "Mövzu",
      subjectPlaceholder: "Layihənin mövzusu",
      message: "Mesaj",
      messagePlaceholder: "Layihəniz haqqında qısa məlumat...",
      submit: "Göndər",
      submitting: "Göndərilir...",
      successMessage: "Mesajınız göndərildi. Tezliklə əlaqə saxlayacağıq.",
    },
  },

  // Common
  common: {
    loading: "Yüklənir...",
    error: "Xəta baş verdi",
    success: "Uğurlu",
  },
};

export type Translations = typeof az;


