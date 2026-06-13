import { backendClient } from "@/sanity/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const { code, cartTotal } = await req.json();

  if (!code) {
    return NextResponse.json({ valid: false, message: "No coupon code provided" });
  }

  // ── Fetch coupon from Sanity ─────────────────────────────────────────────
  const coupon = await backendClient.fetch(
    `*[_type == "coupon" && code == $code && isActive == true][0]`,
    { code: code.trim().toUpperCase() }
  );

  if (!coupon) {
    return NextResponse.json({ valid: false, message: "Invalid or inactive coupon code" });
  }

  // ── Expiry check ─────────────────────────────────────────────────────────
  if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
    return NextResponse.json({ valid: false, message: "This coupon has expired" });
  }

  // ── Usage limit check ────────────────────────────────────────────────────
  if (coupon.maxUsageLimit && coupon.usageCount >= coupon.maxUsageLimit) {
    return NextResponse.json({ valid: false, message: "This coupon has reached its usage limit" });
  }

  // ── Minimum cart value check ─────────────────────────────────────────────
  if (coupon.minCartValue && cartTotal < coupon.minCartValue) {
    return NextResponse.json({
      valid: false,
      message: `Minimum cart value of ₹${coupon.minCartValue} required for this coupon`,
    });
  }

  // ── First order check ────────────────────────────────────────────────────
  if (coupon.type === "first_order") {
    if (!userId) {
      return NextResponse.json({ valid: false, message: "Please sign in to use this coupon" });
    }

    const orderCount = await backendClient.fetch(
      `count(*[_type == "order" && clerkUserId == $userId])`,
      { userId }
    );

    if (orderCount > 0) {
      return NextResponse.json({ valid: false, message: "This coupon is only valid on your first order" });
    }
  }

  // ── Calculate discount ───────────────────────────────────────────────────
  let discountAmount = 0;

  if (coupon.type === "percentage" || coupon.type === "first_order") {
    discountAmount = (cartTotal * coupon.value) / 100;
  } else if (coupon.type === "flat") {
    discountAmount = Math.min(coupon.value, cartTotal);
  }

  return NextResponse.json({
    valid: true,
    discountAmount: Math.round(discountAmount),
    couponType: coupon.type,
    couponValue: coupon.value,
    message: `Coupon applied! You saved ₹${Math.round(discountAmount)} ✨`,
  });
}