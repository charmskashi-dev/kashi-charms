import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, name, email, phone } = body;

    if (!amount || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔐 ENV VARIABLES
    const key = process.env.PAYU_KEY!;
    const salt = process.env.PAYU_SALT!;

    const txnid = "txn_" + Date.now();

    const productinfo = "KashiCharms Order";

    // 🔥 IMPORTANT: success & failure URLs
    const surl = `${process.env.NEXT_PUBLIC_BASE_URL}/success`;
    const furl = `${process.env.NEXT_PUBLIC_BASE_URL}/failure`;

    // 🔐 HASH GENERATION
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|||||||||||${salt}`;

    const hash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    return NextResponse.json({
      key,
      txnid,
      amount,
      productinfo,
      firstname: name,
      email,
      phone,
      surl,
      furl,
      hash,
    });
  } catch (error) {
    console.error("PayU Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}