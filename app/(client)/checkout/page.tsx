"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import createCheckoutSession from "@/actions/createCheckoutSession";

import useStore from "@/store";

import { useUser } from "@clerk/nextjs";

import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] =
    useState<"cod" | "online">("cod");

  const [loading, setLoading] =
    useState(false);

  const { user } = useUser();

  const groupedItems = useStore((state) =>
    state.getGroupedItems()
  );

  const resetCart = useStore(
    (state) => state.resetCart
  );

  const totalPrice = groupedItems.reduce(
    (acc, item) =>
      acc +
      (item.product.price || 0) *
        item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!groupedItems.length) {
      toast.error("Cart is empty");

      return;
    }

    if (!user) {
      toast.error("Please login first");

      return;
    }

    try {
      setLoading(true);

      const items = groupedItems.map(
        (item) => ({
          product: item.product,

          quantity: item.quantity,
        })
      );

      // =========================
      // CREATE ORDER
      // =========================

      const res =
        await createCheckoutSession(
          items,
          {
            orderNumber:
              "ORD-" + Date.now(),

            customerName:
              user.fullName || "Guest",

            customerEmail:
              user.emailAddresses[0]
                ?.emailAddress || "",

            clerkUserId: user.id,

            paymentMethod:
              paymentMethod === "cod"
                ? "COD"
                : "ONLINE",
          }
        );

      if (!res?.success) {
        throw new Error(
          "Order failed"
        );
      }

      // =========================
      // COD FLOW
      // =========================

      if (paymentMethod === "cod") {
        toast.success(
          "Order placed successfully 🎉"
        );

        resetCart();

        router.push(
          `/payment-success?orderNumber=${res.orderNumber}`
        );

        return;
      }

      // =========================
      // PAYU FLOW
      // =========================

      const payuRes = await fetch(
        "/api/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount: res.totalPrice,

            name: user.fullName,

            email:
              user.emailAddresses[0]
                ?.emailAddress,

            phone:
              user.phoneNumbers[0]
                ?.phoneNumber ||
              "9999999999",
          }),
        }
      );

      const data =
        await payuRes.json();

      const form =
        document.createElement(
          "form"
        );

      form.method = "POST";

      form.action =
        "https://secure.payu.in/_payment";

      Object.keys(data).forEach(
        (key) => {
          const input =
            document.createElement(
              "input"
            );

          input.name = key;

          input.value = data[key];

          form.appendChild(input);
        }
      );

      document.body.appendChild(
        form
      );

      form.submit();
    } catch (err) {
      console.error(err);

      toast.error(
        "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-shop-light-bg">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Checkout
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() =>
              setPaymentMethod(
                "cod"
              )
            }
            className={`flex-1 py-2 rounded-lg ${
              paymentMethod ===
              "cod"
                ? "bg-shop-dark-green text-white"
                : "bg-gray-100"
            }`}
          >
            COD
          </button>

          <button
            onClick={() =>
              setPaymentMethod(
                "online"
              )
            }
            className={`flex-1 py-2 rounded-lg ${
              paymentMethod ===
              "online"
                ? "bg-shop-dark-green text-white"
                : "bg-gray-100"
            }`}
          >
            Pay Online
          </button>
        </div>

        <div className="text-center text-lg font-medium">
          Total: ₹{totalPrice}
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          {loading
            ? "Processing..."
            : "Place Order"}
        </button>
      </div>
    </div>
  );
}