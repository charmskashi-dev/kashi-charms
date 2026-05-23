import Container from "@/components/Container";

const ReturnPolicyPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <div>
          <p className="text-shop-light-green font-semibold uppercase tracking-widest">
            Kashi Charms
          </p>

          <h1 className="text-4xl font-bold mt-2 text-darkColor">
            Return & Refund Policy
          </h1>

          <p className="text-gray-500 mt-3">
            Last updated: May 2026
          </p>
        </div>

        <div className="space-y-6 text-lightColor leading-8">
          <p>
            At Kashi Charms, every piece is handmade with love and care.
            Since our products are handcrafted and hygienic in nature,
            returns are accepted only in specific cases.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Eligible Returns
            </h2>

            <p>
              Returns are accepted only if:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>You received a damaged product</li>
              <li>You received the wrong item</li>
              <li>The product arrived broken during shipping</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Return Request Timeline
            </h2>

            <p>
              Customers must contact us within 48 hours of delivery
              with proper unboxing proof and images/videos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Non-Returnable Items
            </h2>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Customized jewellery</li>
              <li>Used products</li>
              <li>Products damaged after use</li>
              <li>Orders without unboxing proof</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Refund Process
            </h2>

            <p>
              Approved refunds are processed within 5-7 business days
              to the original payment method.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReturnPolicyPage;