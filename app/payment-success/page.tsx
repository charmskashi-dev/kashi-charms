import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";

export default function PaymentSuccessPage() {
  return (
    <div
      className="
        min-h-screen
        bg-[#faf7f2]
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-8
          md:p-10
        "
      >
        <div className="text-center mb-8">
          <div
            className="
              w-20
              h-20
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              mx-auto
              mb-5
            "
          >
            <span className="text-4xl">
              ✨
            </span>
          </div>

          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-darkColor
            "
          >
            Payment Successful
          </h1>

          <p
            className="
              mt-4
              text-lightColor
              text-base
              leading-7
            "
          >
            Your order has been placed successfully.
            <br />
            A confirmation email with your order details
            will be sent shortly.
          </p>
        </div>

        {/* EMAIL PREVIEW */}

        <div className="border rounded-3xl overflow-hidden">
          <OrderConfirmationEmail
            customerName="Harshita"
            orderNumber="KC-47821972"
            invoiceNumber="INV-2026-305919"
            totalAmount="₹999"
          />
        </div>
      </div>
    </div>
  );
}