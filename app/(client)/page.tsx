import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";

import AnnouncementBar from "@/components/home/AnnouncementBar";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import WhyKashiCharms from "@/components/home/WhyKashiCharms";
import ReviewsSection from "@/components/home/ReviewsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Announcement Strip */}
      <AnnouncementBar />

      <Container className="space-y-16 py-4 md:py-6">
        {/* Hero Banner */}
        <HomeBanner />

        {/* Shop by Collection */}
        <CollectionsGrid />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Best Sellers Slider */}

        {/* Brand Trust Section */}
        <WhyKashiCharms />

        {/* Founders */}

        {/* Customer Reviews */}
        <ReviewsSection />
      </Container>
    </main>
  );
}