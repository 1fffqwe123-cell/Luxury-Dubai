import { motion } from "framer-motion";
import { useTranslation } from "@/contexts/LanguageContext";
import SearchWidget from "./SearchWidget";

export default function Hero() {
  const { t } = useTranslation();

  const words = t("hero.title").split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=90"
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,10%)]/70 via-[hsl(220,40%,10%)]/50 to-[hsl(220,40%,10%)]/80" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full pt-32 pb-56">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <div className="h-px w-10 bg-[hsl(43,74%,49%)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[hsl(43,74%,49%)] font-medium">
            Dubai Premier Real Estate
          </span>
          <div className="h-px w-10 bg-[hsl(43,74%,49%)]" />
        </motion.div>

        {/* Title with staggered reveal */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-10 sm:gap-16"
        >
          {[
            { value: "2,400+", label: "Properties" },
            { value: "AED 1B+", label: "Portfolio Value" },
            { value: "15 Yrs", label: "Experience" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[hsl(43,74%,49%)]">{value}</div>
              <div className="text-xs text-white/50 mt-0.5 tracking-wide">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Search widget — overlapping bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 w-full px-4 sm:px-6 -mt-32"
      >
        <SearchWidget />
      </motion.div>
    </section>
  );
}
