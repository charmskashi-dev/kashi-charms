"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";

export default async function createCheckoutSession(
  items: any[],
  metadata: any
) {
  try {
    // =========================
    // PRODUCT SUBTOTAL
    // =========================

    const subtotal = items.reduce(
      (acc, item) => {
        return (
          acc +
          (item.product.price || 0) *
            item.quantity
        );
      },
      0
    );

    // =========================
    // SHIPPING
    // =========================

    const SHIPPING_CHARGE = 60;

    const FREE_SHIPPING_THRESHOLD = 499;

    const shippingAmount =
      subtotal >=
      FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_CHARGE;

    // =========================
    // FIRST ORDER CHECK
    // =========================

    let discountAmount = 0;

    let couponCode = "";

    if (
      metadata.couponCode ===
        "FIRSTKASHI" &&
      metadata.clerkUserId
    ) {
      const existingOrders =
        await backendClient.fetch(
          `count(*[_type == "order" && clerkUserId == $userId])`,
          {
            userId:
              metadata.clerkUserId,
          }
        );

      // ONLY FIRST ORDER
      if (existingOrders === 0) {
        discountAmount = subtotal * 0.5;

        couponCode =
          "FIRSTKASHI";
      }
    }

    // =========================
    // FINAL TOTAL
    // =========================

    const totalAmount =
      subtotal +
      shippingAmount -
      discountAmount;

    // =========================
    // ORDER NUMBER
    // =========================

    const orderNumber = `KC-${Date.now()
      .toString()
      .slice(-8)}`;

    // =========================
    // INVOICE NUMBER
    // =========================

    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(
      100000 +
        Math.random() * 900000
    )}`;

    // =========================
    // PRODUCTS
    // =========================

    const products = items.map(
      (item) => ({
        _key:
          crypto.randomUUID(),

        product: {
          _type: "reference",

          _ref:
            item.product._id,
        },

        quantity:
          item.quantity,
      })
    );

    // =========================
    // ORDER DOCUMENT
    // =========================

    const orderDoc = {
      _type: "order",

      orderNumber,

      invoiceNumber,

      customerName:
        metadata.customerName,

      email:
        metadata.customerEmail,

      clerkUserId:
        metadata.clerkUserId ||
        "",

      address:
        metadata.address ||
        null,

      products,

      subtotal,

      shippingAmount,

      amountDiscount:
        discountAmount,

      couponCode,

      totalPrice:
        totalAmount,

      currency: "INR",

      status:
        metadata.paymentMethod ===
        "COD"
          ? "confirmed"
          : "pending",

      paymentMethod:
        metadata.paymentMethod ||
        "COD",

      orderDate:
        new Date().toISOString(),
    };

    // =========================
    // CREATE ORDER
    // =========================

    const createdOrder =
      await backendClient.create(
        orderDoc
      );

    // =========================
    // SEND EMAIL
    // =========================

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-order-email`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            customerEmail:
              metadata.customerEmail,

            customerName:
              metadata.customerName,

            orderNumber,

            invoiceNumber,

            totalAmount,
          }),
        }
      );
    } catch (emailError) {
      console.error(
        "EMAIL ERROR:",
        emailError
      );
    }

    // =========================
    // RETURN
    // =========================

    return {
      success: true,

      orderId:
        createdOrder._id,

      orderNumber,

      invoiceNumber,

      subtotal,

      shippingAmount,

      discountAmount,

      totalPrice:
        totalAmount,

      redirectUrl:
        "/payment-success",
    };
  } catch (error) {
    console.error(
      "CHECKOUT ERROR:",
      error
    );

    return {
      success: false,
    };
  }
}

export const markOrderAsPaid =
  async (
    orderId: string,
    paymentMethod?: string
  ) => {
    try {
      await backendClient
        .patch(orderId)
        .set({
          status:
            "processing",

          paymentMethod:
            paymentMethod ||
            "online",
        })
        .commit();

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
      };
    }
  };