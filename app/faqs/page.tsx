import Container from "@/components/Container";

const FAQsPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-darkColor">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg">
              How long does delivery take?
            </h2>

            <p className="text-lightColor mt-2">
              Orders usually arrive within 3-7 business days.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Do you offer COD?
            </h2>

            <p className="text-lightColor mt-2">
              Yes, Cash on Delivery is available on selected orders.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Are products handmade?
            </h2>

            <p className="text-lightColor mt-2">
              Yes, all Kashi Charms products are handcrafted with care.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FAQsPage;