import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, Heart } from "lucide-react";
import { Property } from "@/lib/properties";
import { useTranslation } from "@/contexts/LanguageContext";

interface PropertyCardProps {
  property: Property;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  index?: number;
}

export default function PropertyCard({ property, favorites, onToggleFavorite, index = 0 }: PropertyCardProps) {
  const { t, language } = useTranslation();
  const isFav = favorites.has(property.id);
  const [imgLoaded, setImgLoaded] = useState(false);

  const title = language === "ar" ? property.titleAr : property.titleEn;
  const location = language === "ar" ? property.locationAr : property.location;
  const price = language === "ar" ? property.priceAr : property.price;
  const badge = language === "ar" ? property.badgeAr : property.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden border border-card-border shadow-sm hover:shadow-xl transition-shadow duration-300"
      data-testid={`card-property-${property.id}`}
    >
      <Link href={`/properties/${property.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={property.imageUrl}
            alt={title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />

          {/* Status badge */}
          <div className={`absolute top-3 ${language === "ar" ? "right-3" : "left-3"}`}>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide ${
                property.status === "buy"
                  ? "bg-[hsl(43,74%,49%)] text-white"
                  : "bg-[hsl(220,40%,18%)] text-white"
              }`}
            >
              {property.status === "buy" ? (language === "ar" ? "للبيع" : "For Sale") : (language === "ar" ? "للإيجار" : "For Rent")}
            </span>
          </div>

          {/* Optional badge */}
          {badge && (
            <div className={`absolute top-3 ${language === "ar" ? "left-3" : "right-12"}`}>
              <span className="text-xs font-semibold px-2.5 py-1.5 rounded-full bg-white/90 text-[hsl(220,20%,10%)] tracking-wide">
                {badge}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/properties/${property.id}`} className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-base leading-snug line-clamp-2 hover:text-[hsl(43,74%,49%)] transition-colors duration-200">
              {title}
            </h3>
          </Link>
          <button
            onClick={() => onToggleFavorite(property.id)}
            className="flex-shrink-0 p-1.5 rounded-full hover:bg-muted transition-colors duration-200"
            data-testid={`btn-favorite-${property.id}`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <motion.div
              animate={isFav ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={18}
                className={isFav ? "fill-red-500 stroke-red-500" : "stroke-muted-foreground"}
              />
            </motion.div>
          </button>
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
          <MapPin size={13} className="flex-shrink-0 text-[hsl(43,74%,49%)]" />
          <span className="text-xs truncate">{location}</span>
        </div>

        <div className="mt-3">
          <span className="text-lg font-bold text-[hsl(220,40%,18%)] font-serif" data-testid={`text-price-${property.id}`}>
            {price}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed size={13} />
            <span data-testid={`text-beds-${property.id}`}>{property.bedrooms} {t("common.beds")}</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <Bath size={13} />
            <span>{property.bathrooms} {t("common.baths")}</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1">
            <Maximize2 size={13} />
            <span>{property.area.toLocaleString()} {t("common.sqft")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
