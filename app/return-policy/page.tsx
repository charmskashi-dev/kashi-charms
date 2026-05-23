import Container from "@/components/Container";

const ReturnPolicyPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-darkColor">
            Return & Refund Policy
          </h1>

          <p className="text-lightColor text-lg leading-8">
            At Kashi Charms, every piece is handmade with care, intention,
            and attention to detail. Because our jewellery is handcrafted,
            we currently accept returns only under specific conditions.
          </p>
        </div>

        <div className="space-y-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Eligibility for Returns
            </h2>

            <p className="text-lightColor leading-8">
              Returns are accepted only if the product arrives damaged,
              defective, or incorrect.
            </p>

            <p className="text-lightColor leading-8">
              To request a return, please contact us within 48 hours of
              delivery with clear photos and your order number.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Non-Returnable Items
            </h2>

            <ul className="list-disc pl-6 text-lightColor leading-8 space-y-2">
              <li>Custom or personalized jewellery</li>
              <li>Products damaged after use</li>
              <li>Items returned without original packaging</li>
              <li>Sale or discounted products</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Refund Process
            </h2>

            <p className="text-lightColor leading-8">
              Once your return request is approved and the item is received,
              refunds are processed to the original payment method within
              5–7 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Need Assistance?
            </h2>

            <p className="text-lightColor leading-8">
              For any concerns regarding your order, feel free to contact
              our support team anytime at:
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

export default ReturnPolicyPage;