export const translations = {
  en: {
    // Nav
    "nav.properties": "Properties",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.book": "Book a Viewing",
    "nav.tagline": "Premier Real Estate",
    
    // Home - Hero
    "hero.title": "Discover Dubai's Most Exclusive Real Estate",
    "hero.subtitle": "Unrivaled luxury, breathtaking views, and unparalleled service. Your gateway to extraordinary living.",
    
    // Search
    "search.buy": "Buy",
    "search.rent": "Rent",
    "search.location": "Location",
    "search.type": "Property Type",
    "search.bedrooms": "Bedrooms",
    "search.button": "Search",
    "search.any": "Any",
    
    // Featured
    "featured.title": "Featured Properties",
    "featured.viewAll": "View All Properties",
    
    // Neighborhoods
    "neighborhoods.title": "Explore Dubai's Finest Neighborhoods",
    
    // Stats
    "stats.properties": "Properties",
    "stats.clients": "Happy Clients",
    "stats.experience": "Years Experience",
    "stats.satisfaction": "Client Satisfaction",
    
    // Testimonials
    "testimonials.title": "What Our Clients Say",
    
    // CTA
    "cta.title": "Find Your Dream Home Today",
    "cta.subtitle": "Let our experts guide you to the perfect property in Dubai.",
    "cta.button": "Contact Our Advisors",
    
    // Footer
    "footer.desc": "Dubai's premier luxury real estate brokerage, offering exclusive access to the world's most sought-after properties.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact Us",
    "footer.rights": "© 2024 Luxe Dubai Real Estate. All rights reserved.",
    
    // Properties Page
    "properties.title": "Luxury Properties",
    "properties.found": "properties found",
    "filter.price": "Price Range",
    "filter.min": "Min",
    "filter.max": "Max",
    "sort.newest": "Newest",
    "sort.priceAsc": "Price: Low to High",
    "sort.priceDesc": "Price: High to Low",
    "sort.popular": "Most Popular",
    
    // Details
    "detail.features": "Key Features",
    "detail.description": "Property Description",
    "detail.similar": "Similar Properties",
    "detail.agent": "Listing Agent",
    "detail.call": "Call Agent",
    "detail.whatsapp": "WhatsApp",
    "detail.favorite": "Add to Favorites",
    "detail.favorited": "Saved to Favorites",
    
    // Common
    "common.beds": "Beds",
    "common.baths": "Baths",
    "common.sqft": "sqft",
    "common.month": "/month",
  },
  ar: {
    // Nav
    "nav.properties": "العقارات",
    "nav.about": "معلومات عنا",
    "nav.contact": "اتصل بنا",
    "nav.book": "حجز موعد",
    "nav.tagline": "عقارات فاخرة",
    
    // Home - Hero
    "hero.title": "اكتشف أفخم العقارات في دبي",
    "hero.subtitle": "فخامة لا تضاهى، مناظر خلابة، وخدمة استثنائية. بوابتك لحياة غير عادية.",
    
    // Search
    "search.buy": "شراء",
    "search.rent": "إيجار",
    "search.location": "الموقع",
    "search.type": "نوع العقار",
    "search.bedrooms": "غرف النوم",
    "search.button": "بحث",
    "search.any": "أي",
    
    // Featured
    "featured.title": "عقارات مميزة",
    "featured.viewAll": "عرض جميع العقارات",
    
    // Neighborhoods
    "neighborhoods.title": "استكشف أرقى أحياء دبي",
    
    // Stats
    "stats.properties": "عقار",
    "stats.clients": "عميل سعيد",
    "stats.experience": "سنوات خبرة",
    "stats.satisfaction": "رضا العملاء",
    
    // Testimonials
    "testimonials.title": "ماذا يقول عملاؤنا",
    
    // CTA
    "cta.title": "ابحث عن منزل أحلامك اليوم",
    "cta.subtitle": "دع خبرائنا يرشدونك إلى العقار المثالي في دبي.",
    "cta.button": "اتصل بمستشارينا",
    
    // Footer
    "footer.desc": "الوسيط العقاري الفاخر الأول في دبي، يوفر وصولاً حصرياً إلى العقارات الأكثر طلباً في العالم.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.rights": "© 2024 لوكس دبي للعقارات. جميع الحقوق محفوظة.",
    
    // Properties Page
    "properties.title": "عقارات فاخرة",
    "properties.found": "عقار متاح",
    "filter.price": "نطاق السعر",
    "filter.min": "الحد الأدنى",
    "filter.max": "الحد الأقصى",
    "sort.newest": "الأحدث",
    "sort.priceAsc": "السعر: من الأقل للأعلى",
    "sort.priceDesc": "السعر: من الأعلى للأقل",
    "sort.popular": "الأكثر شعبية",
    
    // Details
    "detail.features": "الميزات الرئيسية",
    "detail.description": "وصف العقار",
    "detail.similar": "عقارات مشابهة",
    "detail.agent": "الوكيل العقاري",
    "detail.call": "اتصال بالوكيل",
    "detail.whatsapp": "واتساب",
    "detail.favorite": "أضف للمفضلة",
    "detail.favorited": "تم الحفظ في المفضلة",
    
    // Common
    "common.beds": "غرف",
    "common.baths": "حمامات",
    "common.sqft": "قدم مربع",
    "common.month": "/شهر",
  }
};

export type Language = "en" | "ar";
export type TranslationKey = keyof typeof translations.en;
