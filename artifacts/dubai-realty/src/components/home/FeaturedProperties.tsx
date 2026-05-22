import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/property/PropertyCard";
import { useTranslation } from "@/contexts/LanguageContext";

export default function FeaturedProperties() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const featured = properties.filter((p) => p.featured);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">
                Handpicked
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {t("featured.title")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/properties"
              className="flex items-center gap-2 text-sm font-semibold text-[hsl(43,74%,49%)] hover:text-[hsl(43,74%,42%)] transition-colors group"
              data-testid="link-view-all"
            >
              {t("featured.viewAll")}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((p, i) => (
            <PropertyCard
              key={p.id}
              property={p}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
