import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Neighborhoods from "@/components/home/Neighborhoods";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="mt-20">
        <FeaturedProperties />
      </div>
      <Neighborhoods />
      <Stats />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
