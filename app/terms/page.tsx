import Container from "@/components/Container";

const TermsPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <div>
          <p className="text-shop-light-green font-semibold uppercase tracking-widest">
            Kashi Charms
          </p>

          <h1 className="text-4xl font-bold mt-2 text-darkColor">
            Terms & Conditions
          </h1>
        </div>

        <div className="space-y-6 text-lightColor leading-8">
          <p>
            By using Kashi Charms, you agree to our policies and terms.
          </p>

          <p>
            All products are subject to availability.
            Prices and product details may change without prior notice.
          </p>

          <p>
            Handmade products may have slight variations in color,
            texture, or design.
          </p>

          <p>
            Fraudulent activity, misuse of the website,
            or unauthorized copying of content is prohibited.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default TermsPage;