import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function GET() {
  try {
    const orders = await backendClient.fetch(`
      *[_type == "order"] | order(orderDate desc) {
        _id,
        orderNumber,
        customerName,
        email,
        totalPrice,
        status,
        orderDate
      }
    `);

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      { success: false, orders: [] },
      { status: 500 }
    );
  }
}