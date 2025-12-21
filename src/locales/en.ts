import { Translations } from './az';

export const en: Translations = {
  // Navbar
  nav: {
    home: "Home",
    catalog: "Catalog",
    portfolio: "Portfolio",
    services: "Services",
    about: "About Us",
    contact: "Contact",
  },

  // Home Page
  home: {
    badge: "Premium construction services",
    hero: {
      title1: "Architecture and",
      title2: "construction solutions",
      rotatingWords: ["modern", "reliable"],
      description: "Dargah Construction provides advanced planning, innovative design and high-quality construction services for residential and commercial projects.",
      projectsBtn: "Our Projects",
      contactBtn: "Contact Us",
      experience: "years of experience",
      projects: "completed projects",
      featuredProjectLabel: "Featured Project",
      featuredProjectTitle: "Sahil Project",
      cards: [
        { title: "Villa Project" },
        { title: "Interior Design" },
        { title: "Facade Renovation" },
        { title: "Office Renovation" },
        { title: "Project Management" },
      ],
    },
    portfolio: {
      title: "Our Latest Projects",
      subtitle: "Premium projects completed in various categories",
      viewAll: "View All",
    },
    whyUs: {
      badge: "Why Dargah Construction?",
      title1: "Your reliable partner",
      title2: "from planning to delivery",
      description: "With over 10 years of experience, we have successfully completed hundreds of projects. We offer a personalized approach and premium quality for each of our clients.",
      features: {
        team: {
          title: "Professional Team",
          desc: "Your projects are in safe hands with experienced architects and craftsmen.",
        },
        delivery: {
          title: "On-Time Delivery",
          desc: "With precise planning, work is completed on time and efficiently.",
        },
        quality: {
          title: "High Quality",
          desc: "We are committed to premium standards in materials and execution.",
        },
        budget: {
          title: "Transparent Budget",
          desc: "Clear estimates and costs — a process without surprises.",
        },
      },
      learnMore: "Learn More",
    },
  },

  // Catalog
  catalog: {
    all: "All",
    catalog: "Catalog",
    description: "Clean lines, minimal ornament, glass/metal/wood balance.",
    showMore: "Show More",
    showLess: "Show Less",
    showMoreShort: "Less",
    showMoreCount: (count: number) => `Show More (${count})`,
    showMoreCountShort: (count: number) => `+${count}`,
    // Design Types translations
    designTypes: {
      "Modern": "Modern",
      "Minimal": "Minimal",
      "Klassik": "Classic",
      "Digər": "Other",
      "Üslub": "Style",
    },
    // Room Types translations
    roomTypes: {
      "Qonaq otağı": "Living Room",
      "Yataq otağı": "Bedroom",
      "Mətbəx": "Kitchen",
      "Hamam": "Bathroom",
      "Vanna otağı": "Bathroom",
      "Koridor": "Hallway",
      "Ofis": "Office",
      "Kabinet": "Study Room",
      "Uşaq otağı": "Kids Room",
      "Qonaq yataq otağı": "Guest Bedroom",
      "Balkon": "Balcony",
      "Terras": "Terrace",
    },
  },

  // Portfolio
  portfolio: {
    badge: "Portfolio",
    title1: "Our Successful",
    title2: "Projects",
    description: "Explore residential and commercial projects we have completed with our commitment to excellence.",
    all: "All",
    learnMore: "Learn More",
    // Categories
    categories: {
      "Villa": "Villa",
      "Ofis": "Office",
      "Mənzil": "Apartment",
      "İnteryer": "Interior",
      "Memarlıq": "Architecture",
      "Tikinti": "Construction",
    },
    // Projects
    projects: {
      "Modern Villa Kompleksi": {
        title: "Modern Villa Complex",
        desc: "Luxury villa design and construction",
      },
      "Klasik Villa": {
        title: "Classic Villa",
        desc: "Traditional architecture with modern comfort",
      },
      "Ofis Kompleksi": {
        title: "Office Complex",
        desc: "Professional design for workspaces",
      },
    },
  },

  // Services
  services: {
    badge: "Our Services",
    title1: "Wide range of services",
    title2: "we are with you",
    description: "We offer comprehensive solutions from architecture to construction, from design to technical services.",
    serviceCount: (count: number) => `${count} services`,
    showMore: (count: number) => `Show More (${count}+)`,
    showLess: "Show Less",
    premium: "Premium",
    cta: {
      title: "Let's discuss your project",
      description: "Our professional team is ready to provide the best solutions for your project.",
      button: "Free Consultation",
    },
  },

  // About
  about: {
    badge: "About Us",
    title1: "Professional team",
    title2: "with excellence",
    description: "Dargah Construction is a professional team providing modern architecture and construction solutions. Quality, reliability and timely delivery are our core values.",
    keyPoints: {
      quality: "Quality Guarantee",
      onTime: "On-Time Delivery",
      transparent: "Transparent Pricing",
      certified: "Certified Team",
    },
    stats: {
      experience: "Years of Experience",
      projects: "Projects",
      clients: "Happy Clients",
    },
    timeline: {
      title: "Our Journey",
      subtitle: "The success story and growth stages of Dargah Construction",
      milestones: [
        { year: "2015", title: "Foundation Laid", desc: "Our company started operations in the construction sector" },
        { year: "2018", title: "First Major Project", desc: "Premium residential complex successfully completed" },
        { year: "2021", title: "Commercial Expansion", desc: "Office and shopping center portfolio expanded" },
        { year: "2024", title: "Full Service Spectrum", desc: "Interior design and project services added" },
      ],
    },
    values: {
      title: "Mission, Vision and Values",
      subtitle: "Our company's core principles and outlook for the future",
      mission: {
        title: "Mission",
        text: "To provide our clients with high-quality, reliable and aesthetic construction solutions. To execute each project according to unique needs.",
      },
      vision: {
        title: "Vision",
        text: "To be the most reliable and innovative construction partner in the region. To be recognized as a leading company that sets industry standards.",
      },
      coreValues: {
        title: "Values",
        text: "Transparency, responsibility, teamwork and sustainability. We believe in building long-term partnerships with our clients and contributing to the development of the sector.",
      },
    },
    statsSection: {
      title: "Dargah in Numbers",
      subtitle: "Our successes and achievements in numbers",
    },
  },

  // Contact
  contact: {
    badge: "Contact",
    title1: "Get in touch",
    title2: "with us",
    description: "Take advantage of our professional consulting and consultation services for your projects. We would be happy to work with you.",
    quickActions: {
      call: "Call Us",
      email: "Send Email",
      whatsapp: "WhatsApp",
    },
    info: {
      address: "Address",
      phone: "Phone",
      email: "Email",
      workHours: "Working Hours",
      workHoursValue: "Mon–Fri: 09:00–18:00, Sat: 10:00–16:00",
    },
    form: {
      title: "Send a Message",
      subtitle: "Fill out the form and we'll get back to you soon",
      name: "Full Name",
      namePlaceholder: "Your Name",
      email: "Email",
      emailPlaceholder: "youremail@mail.com",
      subject: "Subject",
      subjectPlaceholder: "Project subject",
      message: "Message",
      messagePlaceholder: "Brief information about your project...",
      submit: "Send",
      submitting: "Sending...",
      successMessage: "Your message has been sent. We will contact you soon.",
    },
  },

  // Footer
  footer: {
    tagline: "Premium construction solutions",
    description: "We provide advanced planning, innovative design and high-quality construction services for your residential and commercial projects with modern architecture and construction solutions.",
    contact: "Contact Information",
    location: "Location",
    workHours: "Working Hours",
    workHoursDetails: {
      weekdays: "Mon – Fri: 09:00 – 18:00",
      saturday: "Saturday: 10:00 – 16:00",
      sunday: "Sunday: Closed",
    },
    address: "Baku, Azerbaijan",
    phone: "+994 70 299 99 98",
    email: "info@dargah.az",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      support: "Support",
    },
    copyright: "All rights reserved.",
  },

  // Common
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
  },
};


