import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Contact() {
  const { language } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const offices = [
    {
      cityEn: "Dubai (HQ)", cityAr: "دبي (المقر الرئيسي)",
      addrEn: "Gate Village 3, Level 5\nDIFC, Dubai, UAE",
      addrAr: "قرية البوابة 3، الطابق 5\nمركز دبي المالي",
      phone: "+971 4 300 0000",
      email: "dubai@luxedubai.ae",
    },
    {
      cityEn: "Abu Dhabi", cityAr: "أبوظبي",
      addrEn: "Al Maryah Island\nAbu Dhabi, UAE",
      addrAr: "جزيرة الماريا\nأبوظبي، الإمارات",
      phone: "+971 2 400 0000",
      email: "abudhabi@luxedubai.ae",
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Header */}
      <div className="bg-[hsl(220,40%,18%)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[hsl(43,74%,49%)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[hsl(43,74%,49%)] font-semibold">Contact</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            {language === "ar" ? "تواصل معنا" : "Get In Touch"}
          </h1>
          <p className="text-white/60 text-sm max-w-lg">
            {language === "ar"
              ? "فريقنا من المختصين في العقارات الفاخرة مستعد للمساعدة في إيجاد عقار أحلامك."
              : "Our team of luxury real estate specialists is ready to help you find your perfect property."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left — form */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-serif text-2xl font-bold mb-8">
              {language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-lg">{language === "ar" ? "شكرًا لك!" : "Thank You!"}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {language === "ar"
                    ? "تلقينا رسالتك وسيتواصل معك أحد مستشارينا خلال 24 ساعة."
                    : "We've received your message and one of our advisors will contact you within 24 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={language === "ar" ? "اسمك الكامل" : "Your full name"}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-[hsl(43,74%,49%)] transition-colors placeholder:text-muted-foreground"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                      {language === "ar" ? "رقم الهاتف" : "Phone Number"} *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+971 50 000 0000"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-[hsl(43,74%,49%)] transition-colors placeholder:text-muted-foreground"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder={language === "ar" ? "بريدك الإلكتروني" : "your@email.com"}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-[hsl(43,74%,49%)] transition-colors placeholder:text-muted-foreground"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                    {language === "ar" ? "الرسالة" : "Message"}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={language === "ar" ? "أخبرنا عن متطلباتك..." : "Tell us about your requirements..."}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-[hsl(43,74%,49%)] transition-colors placeholder:text-muted-foreground resize-none"
                    data-testid="input-message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[hsl(43,74%,49%)] text-white font-semibold text-sm rounded-xl hover:bg-[hsl(43,74%,42%)] transition-colors duration-200"
                  data-testid="btn-submit-contact"
                >
                  <Send size={15} />
                  {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — offices */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-8">
            {/* Hours */}
            <div className="bg-card border border-card-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[hsl(43,74%,49%)]/15 flex items-center justify-center">
                  <Clock size={16} className="text-[hsl(43,74%,49%)]" />
                </div>
                <h3 className="font-semibold">{language === "ar" ? "ساعات العمل" : "Working Hours"}</h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>{language === "ar" ? "الإثنين — الجمعة" : "Monday — Friday"}</span>
                  <span className="font-medium text-foreground">9:00 — 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "ar" ? "السبت" : "Saturday"}</span>
                  <span className="font-medium text-foreground">10:00 — 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "ar" ? "الأحد" : "Sunday"}</span>
                  <span className="font-medium text-foreground">{language === "ar" ? "مغلق" : "Closed"}</span>
                </div>
              </div>
            </div>

            {/* Office cards */}
            {offices.map((office, i) => (
              <div key={i} className="bg-card border border-card-border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold font-serif text-lg">{language === "ar" ? office.cityAr : office.cityEn}</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin size={15} className="text-[hsl(43,74%,49%)] flex-shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line">{language === "ar" ? office.addrAr : office.addrEn}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Phone size={15} className="text-[hsl(43,74%,49%)] flex-shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-foreground transition-colors">{office.phone}</a>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Mail size={15} className="text-[hsl(43,74%,49%)] flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-foreground transition-colors">{office.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
