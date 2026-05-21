"use client";

import { useEffect } from "react";

import Link from "next/link";

import Container from "@/components/Container";

import useStore from "@/store";

import { motion } from "framer-motion";

import {
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
      py-8
      md:py-16
      px-4
    "
    >
      {/* BACKGROUND GLOWS */}

      <div
        className="
        absolute
        -top-28
        -left-28
        w-[280px]
        md:w-[350px]
        h-[280px]
        md:h-[350px]
        bg-amber-200/30
        blur-3xl
        rounded-full
      "
      />

      <div
        className="
        absolute
        -bottom-28
        -right-28
        w-[280px]
        md:w-[350px]
        h-[280px]
        md:h-[350px]
        bg-rose-200/30
        blur-3xl
        rounded-full
      "
      />

      {/* FLOATING SPARKLES */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
        absolute
        top-14
        left-5
        text-amber-400
      "
      >
        <Sparkles size={22} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
        absolute
        bottom-20
        right-5
        text-rose-400
      "
      >
        <Sparkles size={20} />
      </motion.div>

      <Container className="max-w-md md:max-w-2xl relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          bg-white/85
          backdrop-blur-2xl
          rounded-[32px]
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          border
          border-white/40
          overflow-hidden
        "
        >
          {/* VIDEO SECTION */}

          <div className="relative">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="
              w-full
              h-[260px]
              md:h-[340px]
              object-cover
            "
            >
              <source
                src="/videos/success-video.mp4"
                type="video/mp4"
              />
            </video>

            {/* OVERLAY */}

            <div
              className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/30
              via-transparent
              to-transparent
            "
            />

            {/* EXTRA CINEMATIC SHADE */}

            <div
              className="
              absolute
              inset-0
              bg-black/10
            "
            />
          </div>

          {/* CONTENT */}

          <div className="p-6 md:p-9 text-center">
            {/* BRAND */}

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
              <Sparkles size={16} />

              <span
                className="
                uppercase
                tracking-[0.25em]
                text-[11px]
                font-medium
              "
              >
                Kashi Charms
              </span>
            </div>

            {/* TITLE */}

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

            {/* MESSAGE */}

            <p
              className="
              mt-4
              text-gray-600
              text-sm
              md:text-base
              leading-relaxed
              max-w-xl
              mx-auto
            "
            >
              Your handcrafted jewellery
              is now being prepared with
              elegance, care, and detail.
            </p>

            {/* INFO CARDS */}

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {/* DELIVERY */}

              <div
                className="
                bg-[#faf7f2]
                border
                border-black/5
                rounded-3xl
                p-4
                text-left
              "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                    bg-black
                    text-white
                    p-2.5
                    rounded-xl
                  "
                  >
                    <PackageCheck size={16} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Estimated Delivery
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                      Arriving within
                      4–7 business days
                    </p>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}

              <div
                className="
                bg-[#faf7f2]
                border
                border-black/5
                rounded-3xl
                p-4
                text-left
              "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                    bg-black
                    text-white
                    p-2.5
                    rounded-xl
                  "
                  >
                    <ShieldCheck size={16} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Secure Checkout
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                      Payment verified
                      successfully
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PREMIUM MESSAGE */}

            <div
              className="
              mt-6
              bg-linear-to-r
              from-amber-50
              to-rose-50
              border
              border-amber-100
              rounded-3xl
              p-4
            "
            >
              <p
                className="
                text-sm
                text-gray-700
                leading-relaxed
              "
              >
                We’re excited for your
                Kashi Charms piece to
                reach you 💖
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <Link
                href="/orders"
                className="
                flex-1
                bg-black
                text-white
                py-3.5
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
                py-3.5
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
              mt-6
              text-[10px]
              tracking-[0.2em]
              uppercase
              text-gray-400
            "
            >
              Handcrafted with elegance
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}