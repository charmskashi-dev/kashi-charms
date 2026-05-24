import { NextResponse } from "next/server";
import { Resend } from "resend";

import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {
  try {
    console.log(
      "📨 SEND EMAIL API HIT"
    );

    const body = await req.json();

    console.log(
      "📦 BODY:",
      body
    );

    const {
      customerEmail,
      customerName,
      orderNumber,
      invoiceNumber,
      totalAmount,
    } = body;

    const data =
      await resend.emails.send({
        from:
          "Kashi Charms <orders@kashicharms.com>",

        to: customerEmail,

        subject: `Order Confirmed • ${orderNumber}`,

        react:
          OrderConfirmationEmail({
            customerName,

            orderNumber,

            invoiceNumber,

            totalAmount:
              `₹${totalAmount}`,
          }),
      });

    console.log(
      "✅ EMAIL RESPONSE:",
      data
    );

    return NextResponse.json({
      success: true,

      data,
    });
  } catch (error) {
    console.error(
      "❌ EMAIL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}