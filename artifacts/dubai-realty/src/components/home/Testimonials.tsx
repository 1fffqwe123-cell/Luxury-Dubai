import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const testimonials = [
  {
    nameEn: "James Whitfield",
    nameAr: "جيمس ويتفيلد",
    locationEn: "London, UK",
    locationAr: "لندن، المملكة المتحدة",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    quoteEn: "Luxe Dubai found us our dream penthouse on Palm Jumeirah in under two weeks. The level of service and attention to detail was unlike anything I've experienced in 20 years of property investment.",
    quoteAr: "لقد وجد فريق لوكس دبي لنا بنتهاوس أحلامنا في نخلة جميرا في أقل من أسبوعين. مستوى الخدمة والاهتمام بالتفاصيل لم أختبر مثله في 20 عامًا من الاستثمار العقاري.",
  },
  {
    nameEn: "Ranya Al-Ahmadi",
    nameAr: "رانيا الأحمدي",
    locationEn: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    quoteEn: "The team understood exactly what we needed — a spacious family villa close to the best schools. They went above and beyond to ensure a seamless transaction from first viewing to handover.",
    quoteAr: "فهم الفريق تمامًا ما نحتاجه — فيلا عائلية فسيحة بالقرب من أفضل المدارس. بذلوا جهدًا استثنائيًا لضمان معاملة سلسة.",
  },
  {
    nameEn: "Thomas Berger",
    nameAr: "توماس بيرجر",
    locationEn: "Zurich, Switzerland",
    locationAr: "زيورخ، سويسرا",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    quoteEn: "Outstanding investment advisory. They identified the right DIFC unit at the right moment in the market cycle. Already seeing 18% appreciation on the asset within the first year.",
    quoteAr: "استشارات استثمارية رائعة. حددوا الوحدة المناسبة في الوقت المناسب. نشهد بالفعل ارتفاعًا بنسبة 18% في قيمة الأصل خلال السنة الأولى.",
  },
];

export default function Testimonials() {
  const { t, language } = useTranslation();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">
              Client Stories
            </span>
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.nameEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card border border-card-border rounded-xl p-8 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[hsl(43,74%,49%)] stroke-[hsl(43,74%,49%)]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                "{language === "ar" ? item.quoteAr : item.quoteEn}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <img
                  src={item.avatarUrl}
                  alt={item.nameEn}
                  className="w-11 h-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {language === "ar" ? item.nameAr : item.nameEn}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {language === "ar" ? item.locationAr : item.locationEn}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
