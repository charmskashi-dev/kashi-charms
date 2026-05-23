import Container from "@/components/Container";

const PrivacyPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-darkColor">
            Privacy Policy
          </h1>

          <p className="text-lightColor text-lg leading-8">
            Your privacy matters to us. Kashi Charms is committed to protecting
            your personal information and ensuring a safe shopping experience.
          </p>
        </div>

        <div className="space-y-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Information We Collect
            </h2>

            <p className="text-lightColor leading-8">
              We may collect your name, email address, phone number,
              shipping address, and payment details when you place an order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              How Your Information Is Used
            </h2>

            <ul className="list-disc pl-6 text-lightColor leading-8 space-y-2">
              <li>To process and deliver your orders</li>
              <li>To provide customer support</li>
              <li>To improve our products and services</li>
              <li>To send updates, offers, and important notifications</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Data Protection
            </h2>

            <p className="text-lightColor leading-8">
              We do not sell or share your personal information with third
              parties except where required for payment processing,
              shipping, or legal compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Contact
            </h2>

            <p className="text-lightColor leading-8">
              If you have any questions regarding this Privacy Policy,
              you may contact us at:
            </p>

            <p className="font-medium text-darkColor">
              kashicharmsofficial@gmail.com
            </p>
          </section>

        </div>
      </div>
    </Container>
  );
};

export default PrivacyPage;