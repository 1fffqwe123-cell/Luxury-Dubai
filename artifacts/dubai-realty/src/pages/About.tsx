import { motion } from "framer-motion";
import { Award, Users, TrendingUp, Globe } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const team = [
  { nameEn: "Khalid Al-Rashid", nameAr: "خالد الراشد", roleEn: "Founder & CEO", roleAr: "المؤسس والرئيس التنفيذي", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
  { nameEn: "Sophia Chen", nameAr: "صوفيا تشن", roleEn: "Head of Luxury Sales", roleAr: "رئيسة مبيعات الفاخرة", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80" },
  { nameEn: "Marcus Webb", nameAr: "ماركوس ويب", roleEn: "Investment Director", roleAr: "مدير الاستثمار", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
  { nameEn: "Layla Hassan", nameAr: "ليلى حسن", roleEn: "Client Relations", roleAr: "العلاقات مع العملاء", img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=300&q=80" },
];

export default function About() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85" alt="Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(220,40%,10%)]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[hsl(43,74%,49%)] font-semibold">Our Story</span>
              <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              {language === "ar" ? "شركة رائدة في عقارات دبي الفاخرة" : "Dubai's Premier Luxury Real Estate Firm"}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              {language === "ar"
                ? "منذ تأسيسنا عام 2009، نحن نقدم الوصول الحصري إلى أفضل العقارات في دبي للمشترين والمستثمرين العالميين."
                : "Since our founding in 2009, we have provided exclusive access to Dubai's finest properties for discerning buyers and global investors."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">Mission</span>
            </div>
            <h2 className="font-serif text-3xl font-bold mb-6">
              {language === "ar" ? "رؤيتنا وقيمنا" : "Our Vision & Values"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {language === "ar"
                ? "نؤمن بأن العقار الصحيح يغير الحياة. مهمتنا ليست فقط بيع العقارات — بل بناء شراكات طويلة الأمد مع عملائنا من خلال الثقة والشفافية والتميز."
                : "We believe the right property changes lives. Our mission is not simply to sell real estate — it is to build enduring partnerships with our clients through trust, transparency, and excellence."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {language === "ar"
                ? "كل معاملة تمر بيدينا تُعامَل بأعلى درجات الاهتمام والتكتم والخبرة المهنية. عملاؤنا يأتون من 40 دولة، ويثقون بنا لتوجيههم في واحد من أكثر أسواق العقارات ديناميكية في العالم."
                : "Every transaction that passes through our hands is treated with the highest level of care, discretion, and professional expertise. Our clients come from 40 countries and trust us to guide them in one of the world's most dynamic property markets."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { Icon: Award, titleEn: "Award-Winning", titleAr: "حائز على جوائز", descEn: "Best Luxury Brokerage in Dubai 2023", descAr: "أفضل وسيط فاخر في دبي 2023" },
                { Icon: Users, titleEn: "1,200+ Clients", titleAr: "+1,200 عميل", descEn: "Satisfied buyers and investors globally", descAr: "مشترون ومستثمرون راضون حول العالم" },
                { Icon: TrendingUp, titleEn: "AED 1B+ Sold", titleAr: "+مليار درهم مبيعات", descEn: "Total portfolio value transacted", descAr: "إجمالي قيمة المحفظة المُنجزة" },
                { Icon: Globe, titleEn: "40+ Countries", titleAr: "+40 دولة", descEn: "International client base served", descAr: "قاعدة عملاء دولية متنوعة" },
              ].map(({ Icon, titleEn, titleAr, descEn, descAr }) => (
                <div key={titleEn} className="bg-card border border-card-border rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(43,74%,49%)]/15 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[hsl(43,74%,49%)]" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{language === "ar" ? titleAr : titleEn}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{language === "ar" ? descAr : descEn}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">Team</span>
              <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            </div>
            <h2 className="font-serif text-3xl font-bold">
              {language === "ar" ? "فريق الخبراء لدينا" : "Meet Our Experts"}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.nameEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="relative mb-4 rounded-xl overflow-hidden aspect-square">
                  <img src={m.img} alt={m.nameEn} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[hsl(220,40%,18%)]/0 group-hover:bg-[hsl(220,40%,18%)]/30 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-sm">{language === "ar" ? m.nameAr : m.nameEn}</h3>
                <p className="text-xs text-muted-foreground mt-1">{language === "ar" ? m.roleAr : m.roleEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
