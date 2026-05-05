import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function GET() {
  try {
    const orders = await backendClient.fetch(`
      *[_type=="order"] | order(orderDate desc){
        _id,
        orderNumber,
        customerName,
        email,
        totalPrice,
        status,
        orderDate,
        address,
        products[]{
          quantity,
          product->{
            name,
            price
          }
        }
      }
    `);

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}