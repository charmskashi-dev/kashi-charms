import Container from "@/components/Container";

const HelpPage = () => {
  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-10">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-darkColor">
            Help Center
          </h1>

          <p className="text-lightColor text-lg leading-8">
            Need assistance? We're here to make your
            shopping experience smooth and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#faf7f2] border rounded-3xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Order Support
            </h2>

            <p className="text-lightColor leading-8">
              Need help with tracking, delivery,
              or order updates?
            </p>

            <p className="font-medium text-darkColor">
              support@kashicharms.com
            </p>
          </div>

          <div className="bg-[#faf7f2] border rounded-3xl p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-darkColor">
              Product Questions
            </h2>

            <p className="text-lightColor leading-8">
              Have questions about materials,
              sizing, or customization?
            </p>

            <p className="font-medium text-darkColor">
              We're happy to help anytime ✨
            </p>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default HelpPage;