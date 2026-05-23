import Container from "@/components/Container";

const CancellationPolicyPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-8">
        <div>
          <p className="text-shop-light-green font-semibold uppercase tracking-widest">
            Kashi Charms
          </p>

          <h1 className="text-4xl font-bold mt-2 text-darkColor">
            Cancellation Policy
          </h1>

          <p className="text-gray-500 mt-3">
            Last updated: May 2026
          </p>
        </div>

        <div className="space-y-6 text-lightColor leading-8">
          <p>
            Orders can only be cancelled before they are packed or shipped.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Cancellation Window
            </h2>

            <p>
              Customers must request cancellation within 12 hours
              of placing the order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              How To Cancel
            </h2>

            <p>
              To cancel your order, contact us through email or Instagram
              with your order number.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Refund For Cancelled Orders
            </h2>

            <p>
              If the cancellation is approved, refunds will be processed
              within 5-7 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-2">
              Non-Cancellable Orders
            </h2>

            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Orders already shipped</li>
              <li>Customized jewellery orders</li>
              <li>Made-to-order products</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CancellationPolicyPage;