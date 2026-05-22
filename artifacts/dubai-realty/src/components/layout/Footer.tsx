import { Link } from "wouter";
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, isRtl } = useTranslation();

  return (
    <footer className="bg-[hsl(220,40%,12%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded bg-[hsl(43,74%,49%)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">LD</span>
              </div>
              <div>
                <div className="font-serif font-bold text-xl leading-none">LUXE DUBAI</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] mt-0.5">{t("nav.tagline")}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t("footer.desc")}
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-[hsl(43,74%,49%)] hover:border-[hsl(43,74%,49%)] transition-colors duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-[hsl(43,74%,49%)] mb-5">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/properties", label: t("nav.properties") },
                { href: "/about", label: t("nav.about") },
                { href: "/contact", label: t("nav.contact") },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-[hsl(43,74%,49%)] mb-5">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[hsl(43,74%,49%)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">Gate Village, DIFC<br />Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[hsl(43,74%,49%)] flex-shrink-0" />
                <a href="tel:+97143000000" className="text-sm text-white/60 hover:text-white transition-colors">
                  +971 4 300 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[hsl(43,74%,49%)] flex-shrink-0" />
                <a href="mailto:hello@luxedubai.ae" className="text-sm text-white/60 hover:text-white transition-colors">
                  hello@luxedubai.ae
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{t("footer.rights")}</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
