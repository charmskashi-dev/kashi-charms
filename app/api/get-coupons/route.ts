import { backendClient } from "@/sanity/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const { cartTotal } = await req.json();

  // ── Fetch all active coupons ─────────────────────────────────────────────
  const coupons = await backendClient.fetch(
    `*[_type == "coupon" && isActive == true] | order(value desc) {
      _id,
      code,
      type,
      value,
      minCartValue,
      maxUsageLimit,
      usageCount,
      expiryDate,
    }`
  );

  // ── Check first order status once ────────────────────────────────────────
  let isFirstOrder = false;
  if (userId) {
    const orderCount = await backendClient.fetch(
      `count(*[_type == "order" && clerkUserId == $userId])`,
      { userId }
    );
    isFirstOrder = orderCount === 0;
  }

  // ── Evaluate each coupon ─────────────────────────────────────────────────
  const evaluated = coupons.map((coupon: any) => {
    let eligible = true;
    let reason = "";
    let discountAmount = 0;

    // Expiry
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      eligible = false;
      reason = "This coupon has expired";
    }

    // Usage limit
    else if (coupon.maxUsageLimit && coupon.usageCount >= coupon.maxUsageLimit) {
      eligible = false;
      reason = "This coupon has reached its usage limit";
    }

    // First order
    else if (coupon.type === "first_order") {
      if (!userId) {
        eligible = false;
        reason = "Sign in to use this coupon";
      } else if (!isFirstOrder) {
        eligible = false;
        reason = "Only valid on your first order";
      }
    }

    // Min cart value
    else if (coupon.minCartValue && cartTotal < coupon.minCartValue) {
      eligible = false;
      reason = `Add ₹${coupon.minCartValue - cartTotal} more to unlock`;
    }

    // Calculate discount if eligible
    if (eligible) {
      if (coupon.type === "percentage" || coupon.type === "first_order") {
        discountAmount = Math.round((cartTotal * coupon.value) / 100);
      } else if (coupon.type === "flat") {
        discountAmount = Math.min(coupon.value, cartTotal);
      }
    }

    // Build label
    let label = "";
    if (coupon.type === "percentage" || coupon.type === "first_order") {
      label = `${coupon.value}% off`;
    } else if (coupon.type === "flat") {
      label = `₹${coupon.value} off`;
    }

    return {
      _id: coupon._id,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      label,
      minCartValue: coupon.minCartValue || 0,
      eligible,
      reason,
      discountAmount,
    };
  });

  // ── Eligible first, ineligible last ──────────────────────────────────────
  evaluated.sort((a: any, b: any) => {
    if (a.eligible && !b.eligible) return -1;
    if (!a.eligible && b.eligible) return 1;
    return b.discountAmount - a.discountAmount;
  });

  return NextResponse.json({ coupons: evaluated });
}