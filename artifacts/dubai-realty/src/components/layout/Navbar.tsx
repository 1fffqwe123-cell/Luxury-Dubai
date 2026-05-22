import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, language, setLanguage, isRtl } = useTranslation();
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navBg = isHome
    ? scrolled
      ? "bg-white/95 backdrop-blur-md shadow-md"
      : "bg-transparent"
    : "bg-white shadow-sm";

  const textColor = isHome && !scrolled ? "text-white" : "text-[hsl(220,20%,10%)]";
  const logoColor = isHome && !scrolled ? "text-white" : "text-[hsl(220,40%,18%)]";
  const goldColor = "text-[hsl(43,74%,49%)]";

  const links = [
    { href: "/properties", label: t("nav.properties") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded bg-[hsl(43,74%,49%)] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm tracking-wider">LD</span>
              </div>
              <div className={`transition-colors duration-300 ${logoColor}`}>
                <div className="font-serif font-bold text-xl leading-none tracking-wide">LUXE DUBAI</div>
                <div className={`text-[10px] tracking-[0.25em] uppercase font-medium mt-0.5 ${isHome && !scrolled ? "text-white/70" : "text-[hsl(43,74%,49%)]"}`}>
                  {t("nav.tagline")}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className={`hidden md:flex items-center gap-8 ${textColor}`}>
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[hsl(43,74%,49%)] ${location === href ? goldColor : ""}`}
                  data-testid={`nav-link-${href.replace("/", "")}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors hover:text-[hsl(43,74%,49%)] ${textColor}`}
                data-testid="language-switcher"
              >
                <span className={language === "en" ? goldColor : ""}>EN</span>
                <span className={`opacity-40 ${textColor}`}>|</span>
                <span className={language === "ar" ? goldColor : ""}>العربية</span>
              </button>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[hsl(43,74%,49%)] text-white text-sm font-semibold rounded tracking-wide hover:bg-[hsl(43,74%,42%)] transition-colors duration-200"
                data-testid="nav-book-btn"
              >
                {t("nav.book")}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 rounded transition-colors ${textColor}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="nav-mobile-toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-white shadow-xl border-t border-gray-100 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-[hsl(220,20%,10%)] hover:text-[hsl(43,74%,49%)] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => { setLanguage(language === "en" ? "ar" : "en"); setMobileOpen(false); }}
                  className="text-sm font-medium text-[hsl(220,20%,10%)] hover:text-[hsl(43,74%,49%)]"
                >
                  {language === "en" ? "العربية" : "English"}
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-2.5 bg-[hsl(43,74%,49%)] text-white text-sm font-semibold rounded tracking-wide"
                >
                  {t("nav.book")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
