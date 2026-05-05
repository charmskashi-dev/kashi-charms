import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json();

    await backendClient
      .patch(orderId)
      .set({ status })
      .commit();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}