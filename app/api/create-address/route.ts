import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { clerkUserId, name, phone, address, city, state, zip } = body;

    if (!clerkUserId || !name || !phone || !address || !city) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Basic phone sanity check — accepts 10-15 digits, optional +, spaces, hyphens
    if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const newAddress = await writeClient.create({
      _type: "address",
      clerkUserId,
      name,
      phone,
      address,
      city,
      state,
      zip,
    });

    return NextResponse.json({
      success: true,
      address: newAddress,
    });
  } catch (error) {
    console.error("❌ ADDRESS API ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to create address" },
      { status: 500 }
    );
  }
}