import Container from "@/components/Container";

const CancellationPolicyPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-darkColor">
            Cancellation Policy
          </h1>

          <p className="text-lightColor text-lg leading-8">
            At Kashi Charms, we begin preparing handmade orders shortly
            after they are placed. Please review our cancellation
            guidelines below.
          </p>
        </div>

        <div className="space-y-8">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Order Cancellation
            </h2>

            <p className="text-lightColor leading-8">
              Orders may be cancelled within 12 hours of placement,
              provided the crafting or shipping process has not begun.
            </p>

            <p className="text-lightColor leading-8">
              Once an order has been processed or shipped,
              cancellations will no longer be possible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Refund for Cancelled Orders
            </h2>

            <p className="text-lightColor leading-8">
              Approved cancellations will be refunded to the original
              payment method within 5–7 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Need Help?
            </h2>

            <p className="text-lightColor leading-8">
              To request a cancellation, contact our support team with
              your order number as soon as possible.
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

export default CancellationPolicyPage;