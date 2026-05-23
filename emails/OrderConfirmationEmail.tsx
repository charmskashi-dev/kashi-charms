interface Props {
  customerName: string;
  orderNumber: string;
  invoiceNumber: string;
  totalAmount: string;
}

const OrderConfirmationEmail = ({
  customerName,
  orderNumber,
  invoiceNumber,
  totalAmount,
}: Props) => {
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#faf7f2",
        padding: "40px",
        color: "#26234f",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          border: "1px solid #eee",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "10px",
          }}
        >
          ✨ Order Confirmed
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "28px",
            color: "#555",
          }}
        >
          Hi {customerName},
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "28px",
            color: "#555",
          }}
        >
          Thank you for shopping with Kashi Charms 💖
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fcf0e4",
            borderRadius: "16px",
          }}
        >
          <p>
            <strong>Order Number:</strong> {orderNumber}
          </p>

          <p>
            <strong>Invoice Number:</strong> {invoiceNumber}
          </p>

          <p>
            <strong>Total:</strong> {totalAmount}
          </p>

          <p>
            <strong>Status:</strong> Confirmed
          </p>
        </div>

        <a
          href="https://www.kashicharms.com/orders"
          style={{
            display: "inline-block",
            marginTop: "30px",
            background: "#063d28",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          View My Orders
        </a>
      </div>
    </div>
  );
};

export default OrderConfirmationEmail;