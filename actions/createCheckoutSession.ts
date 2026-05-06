"use server";

import { backendClient } from "@/sanity/lib/backendClient";

// ✅ CREATE ORDER
export default async function createCheckoutSession(
  items: any[],
  metadata: any
) {
  try {
    const totalPrice = items.reduce((acc, item) => {
      return acc + (item.product.price || 0) * item.quantity;
    }, 0);

    const products = items.map((item) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: item.product._id,
      },
      quantity: item.quantity,
    }));

    const orderDoc = {
      _type: "order",
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      email: metadata.customerEmail,
      clerkUserId: metadata.clerkUserId || "",
      products,
      totalPrice,
      currency: "INR",
      status: "pending",
      paymentMethod: "unpaid", // ✅ added for consistency
      orderDate: new Date().toISOString(),
    };

    const createdOrder = await backendClient.create(orderDoc);

    return {
      success: true,
      orderId: createdOrder._id,
      totalPrice,
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// ✅ FIXED FUNCTION (NOW ACCEPTS 2 ARGS)
export const markOrderAsPaid = async (
  orderId: string,
  paymentMethod?: string
) => {
  try {
    await backendClient
      .patch(orderId)
      .set({
        status: "paid",
        paymentMethod: paymentMethod || "manual-payment", // ✅ supports your call
      })
      .commit();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};