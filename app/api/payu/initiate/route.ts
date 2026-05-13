import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      firstname,
      email,
      phone,
      productinfo,
    } = body;

    // FORMAT AMOUNT PROPERLY
    const formattedAmount = Number(amount).toFixed(2);

    const key = process.env.PAYU_MERCHANT_KEY!;
    const salt = process.env.PAYU_MERCHANT_SALT!;

    // UNIQUE TRANSACTION ID
    const txnid = `txn_${Date.now()}`;

    // SUCCESS & FAILURE URLS
    const surl = `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`;
    const furl = `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failure`;

    // PAYU HASH STRING
    const hashString = `${key}|${txnid}|${formattedAmount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

    // GENERATE SHA512 HASH
    const hash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    // RETURN PAYU FORM DATA
    return NextResponse.json({
      key,
      txnid,
      amount: formattedAmount,
      productinfo,
      firstname,
      email,
      phone,
      surl,
      furl,
      hash,
      service_provider: "payu_paisa",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Payment initiation failed",
      },
      {
        status: 500,
      }
    );
  }
}