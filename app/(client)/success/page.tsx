"use client";

import { useEffect } from "react";

import Link from "next/link";

import Container from "@/components/Container";

import useStore from "@/store";

import {
  CheckCircle2,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function SuccessPage() {
  const resetCart = useStore(
    (state) => state.resetCart
  );

  // =========================
  // CLEAR CART
  // =========================

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  return (
    <div
      className="
      min-h-screen
      bg-[#f8f5f0]
      relative
      overflow-hidden
      flex
      items-center
      justify-center
      py-16
    "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        -top-25
        -left-25
        w-87.5
        h-87.5
        bg-amber-200/30
        blur-3xl
        rounded-full
      "
      />

      <div
        className="
        absolute
        -bottom-30
        -right-25
        w-87.5
        h-87.5
        bg-rose-200/30
        blur-3xl
        rounded-full
      "
      />

      <Container className="max-w-2xl relative z-10">
        <div
          className="
          bg-white/90
          backdrop-blur-xl
          rounded-[36px]
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          border
          border-white/40
          p-8
          md:p-12
          text-center
        "
        >
          {/* SUCCESS ICON */}

          <div className="relative w-fit mx-auto">
            <div
              className="
              absolute
              inset-0
              bg-green-400/30
              blur-2xl
              rounded-full
            "
            />

            <div
              className="
              relative
              bg-green-100
              p-5
              rounded-full
              border
              border-green-200
            "
            >
              <CheckCircle2
                size={70}
                className="text-green-600"
              />
            </div>
          </div>

          {/* TITLE */}

          <div className="mt-8">
            <div
              className="
              flex
              items-center
              justify-center
              gap-2
              text-amber-600
              mb-3
            "
            >
              <Sparkles size={18} />

              <span className="text-sm font-medium tracking-wide uppercase">
                Kashi Charms
              </span>
            </div>

            <h1
              className="
              text-3xl
              md:text-5xl
              font-semibold
              tracking-tight
              text-neutral-900
              leading-tight
            "
            >
              Order Confirmed ✨
            </h1>

            <p
              className="
              mt-5
              text-gray-600
              text-base
              md:text-lg
              leading-relaxed
              max-w-xl
              mx-auto
            "
            >
              Your handcrafted jewellery is
              now being prepared with care
              and elegance. Thank you for
              choosing Kashi Charms.
            </p>
          </div>

          {/* PREMIUM INFO CARDS */}

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            <div
              className="
              bg-[#faf7f2]
              border
              border-black/5
              rounded-3xl
              p-5
              text-left
            "
            >
              <div className="flex items-center gap-3">
                <div className="bg-black text-white p-2 rounded-xl">
                  <PackageCheck size={18} />
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    Estimated Delivery
                  </p>

                  <p className="text-gray-500 text-sm">
                    Within 4-7 business days
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
              bg-[#faf7f2]
              border
              border-black/5
              rounded-3xl
              p-5
              text-left
            "
            >
              <div className="flex items-center gap-3">
                <div className="bg-black text-white p-2 rounded-xl">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    Secure Checkout
                  </p>

                  <p className="text-gray-500 text-sm">
                    Payment verified safely
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGE */}

          <div
            className="
            mt-8
            bg-linear-to-r
            from-amber-50
            to-rose-50
            border
            border-amber-100
            rounded-3xl
            p-5
          "
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              You’ll receive order updates
              and shipping confirmation soon.
              We’re excited for your Kashi
              Charms piece to reach you 💖
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <Link
              href="/orders"
              className="
              flex-1
              bg-black
              text-white
              py-4
              rounded-2xl
              font-medium
              hover:opacity-90
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
            "
            >
              View My Orders

              <ArrowRight size={18} />
            </Link>

            <Link
              href="/shop"
              className="
              flex-1
              bg-white
              border
              border-black/10
              py-4
              rounded-2xl
              font-medium
              hover:bg-gray-50
              transition-all
              duration-300
            "
            >
              Continue Shopping
            </Link>
          </div>

          {/* FOOTER */}

          <p
            className="
            mt-8
            text-xs
            tracking-wide
            uppercase
            text-gray-400
          "
          >
            Handcrafted with elegance •
            Kashi Charms
          </p>
        </div>
      </Container>
    </div>
  );
}