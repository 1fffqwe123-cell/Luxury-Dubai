import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, Heart, Phone, MessageCircle, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/property/PropertyCard";
import { useTranslation } from "@/contexts/LanguageContext";

const FEATURES = {
  en: ["Private Parking (2 spaces)", "Infinity Pool Access", "24-hour Concierge", "Gym & Wellness Center", "Private Balcony / Terrace", "Smart Home System", "Maid's Room", "Storage Room"],
  ar: ["موقف سيارات خاص (مكانان)", "مسبح لا نهاية له", "خدمة كونسيرج 24 ساعة", "صالة ألعاب رياضية", "شرفة / تراس خاص", "نظام المنزل الذكي", "غرفة خادمة", "غرفة تخزين"],
};

export default function PropertyDetail() {
  const [, params] = useRoute("/properties/:id");
  const { t, language } = useTranslation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeImg, setActiveImg] = useState(0);
  const [isFav, setIsFav] = useState(false);

  const property = properties.find((p) => p.id === params?.id);

  if (!property) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
        <h1 className="font-serif text-2xl font-bold">{language === "ar" ? "العقار غير موجود" : "Property Not Found"}</h1>
        <Link href="/properties" className="text-[hsl(43,74%,49%)] hover:underline">
          {language === "ar" ? "العودة للعقارات" : "Back to Properties"}
        </Link>
      </div>
    );
  }

  const title = language === "ar" ? property.titleAr : property.titleEn;
  const description = language === "ar" ? property.descriptionAr : property.descriptionEn;
  const loc = language === "ar" ? property.locationAr : property.location;
  const price = language === "ar" ? property.priceAr : property.price;
  const badge = language === "ar" ? property.badgeAr : property.badge;
  const features = language === "ar" ? FEATURES.ar : FEATURES.en;

  const similar = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const toggleFav = (id: string) => {
    setFavorites((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const prevImg = () => setActiveImg((i) => (i - 1 + property.images.length) % property.images.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % property.images.length);

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <Link href="/properties" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[hsl(43,74%,49%)] transition-colors">
          <ArrowLeft size={14} />
          {language === "ar" ? "العودة للعقارات" : "Back to Properties"}
        </Link>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Main image */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden aspect-video group cursor-pointer">
            <motion.img
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={property.images[activeImg]}
              alt={title}
              className="w-full h-full object-cover"
            />
            <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {property.images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i + 1)}
                className={`rounded-xl overflow-hidden aspect-video border-2 transition-colors ${activeImg === i + 1 ? "border-[hsl(43,74%,49%)]" : "border-transparent"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title + price */}
            <div>
              <div className="flex items-start gap-3 flex-wrap mb-2">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${property.status === "buy" ? "bg-[hsl(43,74%,49%)] text-white" : "bg-[hsl(220,40%,18%)] text-white"}`}>
                  {property.status === "buy" ? (language === "ar" ? "للبيع" : "For Sale") : (language === "ar" ? "للإيجار" : "For Rent")}
                </span>
                {badge && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-muted text-foreground">{badge}</span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="text-property-title">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-5">
                <MapPin size={15} className="text-[hsl(43,74%,49%)]" />
                <span className="text-sm">{loc}</span>
              </div>
              <div className="font-serif text-3xl font-bold text-[hsl(220,40%,18%)]" data-testid="text-detail-price">
                {price}
              </div>
            </div>

            {/* Specs strip */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { Icon: Bed, value: `${property.bedrooms} ${t("common.beds")}` },
                { Icon: Bath, value: `${property.bathrooms} ${t("common.baths")}` },
                { Icon: Maximize2, value: `${property.area.toLocaleString()} ${t("common.sqft")}` },
              ].map(({ Icon, value }, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-muted rounded-xl py-5">
                  <Icon size={20} className="text-[hsl(43,74%,49%)]" />
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-xl font-bold mb-3">{t("detail.description")}</h2>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-serif text-xl font-bold mb-4">{t("detail.features")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-[hsl(43,74%,49%)]/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[hsl(43,74%,49%)]" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 className="font-serif text-xl font-bold mb-4">{language === "ar" ? "الموقع" : "Location"}</h2>
              <div className="w-full h-56 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm border border-border">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto mb-2 text-[hsl(43,74%,49%)]" />
                  {loc}, Dubai, UAE
                </div>
              </div>
            </div>
          </div>

          {/* Right — agent card */}
          <div className="space-y-5">
            {/* Favorite */}
            <button
              onClick={() => setIsFav(!isFav)}
              className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                isFav
                  ? "border-red-400 text-red-500 bg-red-50"
                  : "border-border text-foreground hover:border-[hsl(43,74%,49%)]"
              }`}
              data-testid="btn-favorite-detail"
            >
              <Heart size={16} className={isFav ? "fill-red-500" : ""} />
              {isFav ? t("detail.favorited") : t("detail.favorite")}
            </button>

            {/* Agent card */}
            <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">{t("detail.agent")}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[hsl(220,40%,18%)] flex items-center justify-center text-white font-bold font-serif text-lg flex-shrink-0">
                  {property.agent.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{property.agent.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{language === "ar" ? "وكيل عقاري مرخّص" : "Licensed Real Estate Agent"}</div>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3 bg-[hsl(220,40%,18%)] text-white text-sm font-semibold rounded-xl hover:bg-[hsl(220,40%,14%)] transition-colors"
                  data-testid="btn-call-agent"
                >
                  <Phone size={15} />
                  {t("detail.call")}
                </a>
                <a
                  href={`https://wa.me/${property.agent.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 bg-[hsl(142,71%,45%)] text-white text-sm font-semibold rounded-xl hover:bg-[hsl(142,71%,40%)] transition-colors"
                  data-testid="btn-whatsapp-agent"
                >
                  <MessageCircle size={15} />
                  {t("detail.whatsapp")}
                </a>
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-[hsl(220,40%,18%)] rounded-xl p-6 text-white">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">{language === "ar" ? "ملخص العقار" : "Property Summary"}</p>
              <dl className="space-y-3 text-sm">
                {[
                  { label: language === "ar" ? "النوع" : "Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                  { label: language === "ar" ? "الحالة" : "Status", value: property.status === "buy" ? (language === "ar" ? "للبيع" : "For Sale") : (language === "ar" ? "للإيجار" : "For Rent") },
                  { label: language === "ar" ? "المنطقة" : "Area", value: `${property.area.toLocaleString()} sqft` },
                  { label: language === "ar" ? "غرف النوم" : "Bedrooms", value: property.bedrooms.toString() },
                  { label: language === "ar" ? "الحمامات" : "Bathrooms", value: property.bathrooms.toString() },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-white/50">{label}</dt>
                    <dd className="font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl font-bold mb-8">{t("detail.similar")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p, i) => (
                <PropertyCard key={p.id} property={p} favorites={favorites} onToggleFavorite={toggleFav} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
