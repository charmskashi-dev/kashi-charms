import Container from "@/components/Container";

const PrivacyPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <div>
          <p className="text-shop-light-green font-semibold uppercase tracking-widest">
            Kashi Charms
          </p>

          <h1 className="text-4xl font-bold mt-2 text-darkColor">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-6 text-lightColor leading-8">
          <p>
            Kashi Charms values your privacy and protects your personal information.
          </p>

          <p>
            We collect information such as your name, email, phone number,
            and shipping address only for order processing and customer support.
          </p>

          <p>
            Your payment details are securely processed through trusted payment providers.
            We do not store card or banking information.
          </p>

          <p>
            Your data is never sold or shared with third parties except when required
            for shipping, payment processing, or legal compliance.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPage;