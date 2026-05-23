import Container from "@/components/Container";

const TermsPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-darkColor">
            Terms & Conditions
          </h1>

          <p className="text-lightColor text-lg leading-8">
            By using the Kashi Charms website and placing orders with us,
            you agree to the following terms and conditions.
          </p>
        </div>

        <div className="space-y-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Products & Availability
            </h2>

            <p className="text-lightColor leading-8">
              All products are subject to availability. Since our jewellery
              is handmade, slight variations may occur in color, texture,
              or design.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Pricing
            </h2>

            <p className="text-lightColor leading-8">
              Prices listed on the website are in INR and may change
              without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Order Acceptance
            </h2>

            <p className="text-lightColor leading-8">
              We reserve the right to cancel or refuse any order at our
              discretion, including cases involving pricing errors,
              suspicious activity, or product unavailability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Intellectual Property
            </h2>

            <p className="text-lightColor leading-8">
              All images, branding, product designs, and content on
              Kashi Charms are protected and may not be copied or reused
              without permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Contact
            </h2>

            <p className="text-lightColor leading-8">
              For any questions related to these terms, contact us at:
            </p>

            <p className="font-medium text-darkColor">
              support@kashicharms.com
            </p>
          </section>

        </div>
      </div>
    </Container>
  );
};

export default TermsPage;