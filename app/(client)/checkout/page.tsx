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

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = groupedItems.reduce(
    (acc, item) =>
      acc +
      (item.product.price || 0) *
        item.quantity,
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
  // FINAL TOTAL
  // =========================

  const totalPrice =
    subtotal + shippingAmount;

  // =========================
  // PLACE ORDER
  // =========================

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
      // CREATE ORDER IN SANITY
      // =========================

      const res =
        await createCheckoutSession(
          items,
          {
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
          "Order placed successfully ✨"
        );

        // CLEAR CART
        resetCart();

        // REDIRECT TO YOUR BEAUTIFUL SUCCESS PAGE
        router.push(
          `/success?orderNumber=${res.orderNumber}`
        );

        return;
      }

      // =========================
      // ONLINE PAYMENT FLOW
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

            name:
              user.fullName ||
              "Guest",

            email:
              user.emailAddresses[0]
                ?.emailAddress || "",

            phone:
              user.phoneNumbers[0]
                ?.phoneNumber ||
              "9999999999",
          }),
        }
      );

      const data =
        await payuRes.json();

      // =========================
      // ERROR CHECK
      // =========================

      if (data.error) {
        throw new Error(data.error);
      }

      // =========================
      // PAYU FORM
      // =========================

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

          input.type = "hidden";

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
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        p-6
        bg-shop-light-bg
      "
    >
      <div
        className="
          bg-white
          p-6
          rounded-2xl
          shadow-md
          w-full
          max-w-md
          space-y-6
        "
      >
        <h1
          className="
            text-2xl
            font-semibold
            text-center
          "
        >
          Checkout
        </h1>

        {/* PAYMENT METHOD */}

        <div className="flex gap-3">
          <button
            onClick={() =>
              setPaymentMethod(
                "cod"
              )
            }
            className={`flex-1 py-2 rounded-lg transition-all ${
              paymentMethod ===
              "cod"
                ? "bg-shop-dark-green text-white"
                : "bg-gray-100"
            }`}
          >
            Cash on Delivery
          </button>

          <button
            onClick={() =>
              setPaymentMethod(
                "online"
              )
            }
            className={`flex-1 py-2 rounded-lg transition-all ${
              paymentMethod ===
              "online"
                ? "bg-shop-dark-green text-white"
                : "bg-gray-100"
            }`}
          >
            Pay Online
          </button>
        </div>

        {/* PRICE DETAILS */}

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              ₹{subtotal}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>

            <span>
              {shippingAmount === 0
                ? "FREE"
                : `₹${shippingAmount}`}
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold text-base">
            <span>Total</span>

            <span>
              ₹{totalPrice}
            </span>
          </div>
        </div>

        {/* BUTTON */}

        <button
          onClick={placeOrder}
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
            hover:opacity-90
            transition-all
            disabled:opacity-50
          "
        >
          {loading
            ? "Processing..."
            : paymentMethod ===
              "cod"
            ? "Place COD Order"
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}