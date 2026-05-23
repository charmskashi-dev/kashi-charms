import Container from "@/components/Container";

const ShippingPolicyPage = () => {
  return (
    <div className="bg-[#f8f5f0] min-h-screen">
      <Container className="max-w-4xl py-12 md:py-20">
        
        {/* TOP SECTION */}

        <div className="text-center mb-14">
          <p
            className="
            uppercase
            tracking-[0.3em]
            text-xs
            text-amber-600
            font-medium
            mb-4
          "
          >
            Kashi Charms
          </p>

          <h1
            className="
            text-4xl
            md:text-6xl
            font-semibold
            tracking-tight
            text-darkColor
          "
          >
            Shipping Policy
          </h1>

          <p
            className="
            mt-5
            text-gray-600
            max-w-2xl
            mx-auto
            leading-8
          "
          >
            Every Kashi Charms order is packed carefully
            with elegance, protection, and love ✨
          </p>
        </div>

        {/* POLICY CARD */}

        <div
          className="
          bg-white/85
          backdrop-blur-xl
          rounded-[32px]
          border
          border-black/5
          shadow-[0_10px_60px_rgba(0,0,0,0.05)]
          p-6
          md:p-10
          space-y-10
        "
        >
          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-4">
              Processing Time
            </h2>

            <p className="text-gray-600 leading-8">
              Orders are usually processed within
              1–3 business days after successful order confirmation.
            </p>
          </div>

          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-4">
              Delivery Timeline
            </h2>

            <p className="text-gray-600 leading-8">
              Most orders across India are delivered within
              4–7 business days. Delivery timelines may vary
              slightly during festive seasons, high order volume,
              or courier delays.
            </p>
          </div>

          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-4">
              Shipping Charges
            </h2>

            <p className="text-gray-600 leading-8">
              Shipping charges are calculated during checkout.
              Free shipping may apply on selected orders or
              promotional offers.
            </p>
          </div>

          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-4">
              Tracking Orders
            </h2>

            <p className="text-gray-600 leading-8">
              Once your order is shipped, tracking details
              will be shared with you through email or SMS.
            </p>
          </div>

          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-4">
              Delivery Issues
            </h2>

            <p className="text-gray-600 leading-8">
              If your order appears delayed, damaged,
              or incorrectly marked as delivered,
              please contact us and we’ll help resolve
              the issue as quickly as possible.
            </p>
          </div>

          {/* SECTION */}

          <div>
            <h2 className="text-2xl font-semibold text-darkColor mb-4">
              Contact
            </h2>

            <p className="text-gray-600 leading-8">
              For shipping-related questions,
              please contact the Kashi Charms support team.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShippingPolicyPage;