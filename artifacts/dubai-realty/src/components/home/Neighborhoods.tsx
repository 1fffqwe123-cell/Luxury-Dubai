import { motion } from "framer-motion";
import { Link } from "wouter";
import { neighborhoods } from "@/lib/properties";
import { useTranslation } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

export default function Neighborhoods() {
  const { t, language } = useTranslation();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">
              Locations
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            {t("neighborhoods.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {neighborhoods.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/properties?location=${encodeURIComponent(n.nameEn)}`}
                className="group relative block rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
                data-testid={`card-neighborhood-${n.id}`}
              >
                <img
                  src={n.imageUrl}
                  alt={language === "ar" ? n.nameAr : n.nameEn}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Content — default position */}
                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-0 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {language === "ar" ? n.nameAr : n.nameEn}
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        {n.count} {language === "ar" ? "عقارات" : "properties"}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[hsl(43,74%,49%)] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Description slides up on hover */}
                  <p className="text-xs text-white/70 mt-2 max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300 leading-relaxed">
                    {language === "ar" ? n.descriptionAr : n.descriptionEn}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
