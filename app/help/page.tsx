import Container from "@/components/Container";

const HelpPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-darkColor">
          Help Center
        </h1>

        <p className="text-lightColor leading-8">
          Need help with your order, shipping, payments, or returns?
          Contact us anytime.
        </p>

        <div className="space-y-3">
          <p>Email: kashicharmsofficial@gmail.com</p>

          <p>Instagram: @kashi.charms</p>

          <p>Working Hours: Mon - Sat, 10 AM - 7 PM</p>
        </div>
      </div>
    </Container>
  );
};

export default HelpPage;