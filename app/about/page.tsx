import Container from "@/components/Container";

const AboutPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-darkColor">
          About Kashi Charms
        </h1>

        <p className="text-lightColor leading-8">
          Kashi Charms is a handmade jewellery brand focused on elegant,
          affordable, and aesthetic accessories crafted with creativity and love.
        </p>

        <p className="text-lightColor leading-8">
          Our mission is to create jewellery that feels personal,
          expressive, and unique for every customer.
        </p>
      </div>
    </Container>
  );
};

export default AboutPage;