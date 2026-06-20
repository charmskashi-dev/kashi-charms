import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import MysteryJars from "@/components/home/MysteryJars";
import { ShopByVibe, FindYourStyle } from "@/components/home/CollectionsGrid";
import WhyKashiCharms from "@/components/home/WhyKashiCharms";
import ReviewsSection from "@/components/home/ReviewsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ScrollReveal from "@/components/home/ScrollReveal";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Always-on sticky announcement bar */}
      <AnnouncementBar />

      <Container className="space-y-4 py-4 md:py-6">

        {/* Hero Banner — no reveal, loads instantly */}
        <HomeBanner />

        {/* Mystery Jewelry Jars — launched before collections, top billing */}
        <ScrollReveal>
          <MysteryJars />
        </ScrollReveal>

        {/* Shop By Vibe */}
        <ScrollReveal>
          <ShopByVibe />
        </ScrollReveal>

        {/* Featured Products */}
        <ScrollReveal delay={100}>
          <FeaturedProducts />
        </ScrollReveal>

        {/* Find Your Style */}
        <ScrollReveal delay={100}>
          <FindYourStyle />
        </ScrollReveal>

        {/* Why Kashi Charms */}
        <ScrollReveal delay={100}>
          <WhyKashiCharms />
        </ScrollReveal>

        {/* Reviews */}
        <ScrollReveal delay={100}>
          <ReviewsSection />
        </ScrollReveal>

      </Container>
    </main>
  );
}