import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function CTABanner() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=85"
          alt="Dubai luxury villa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(220,40%,10%)]/85" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[hsl(43,74%,49%)] font-semibold">
              Get Started
            </span>
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
            {t("cta.title")}
          </h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            {t("cta.subtitle")}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[hsl(43,74%,49%)] text-white font-semibold text-sm rounded-lg hover:bg-[hsl(43,74%,42%)] transition-colors duration-200 tracking-wide group"
            data-testid="btn-cta"
          >
            {t("cta.button")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
