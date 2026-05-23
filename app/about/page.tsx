import Container from "@/components/Container";

const AboutPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-darkColor">
            About Kashi Charms
          </h1>

          <p className="text-lightColor text-lg leading-8">
            Kashi Charms was created with a simple dream —
            to make handmade jewellery feel personal, elegant,
            and meaningful.
          </p>
        </div>

        <div className="space-y-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Our Story
            </h2>

            <p className="text-lightColor leading-8">
              Every charm, necklace, bracelet, and resin piece
              is thoughtfully handcrafted with love and creativity.
              We believe jewellery should not just complete an outfit —
              it should tell a story.
            </p>

            <p className="text-lightColor leading-8">
              From minimalist everyday pieces to festive statement designs,
              Kashi Charms blends elegance with individuality.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Handmade With Care
            </h2>

            <p className="text-lightColor leading-8">
              Since our products are handmade, each piece carries
              its own unique details and charm. We focus on quality,
              aesthetics, and creating jewellery that feels special
              to every customer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Our Vision
            </h2>

            <p className="text-lightColor leading-8">
              Kashi Charms aims to become a trusted destination
              for modern handmade jewellery — where creativity,
              beauty, and authenticity come together.
            </p>
          </section>

        </div>
      </div>
    </Container>
  );
};

export default AboutPage;