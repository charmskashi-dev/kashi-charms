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
      py-6
      md:py-10
      px-4
    "
    >
      {/* BACKGROUND GLOWS */}

      <div
        className="
        absolute
        -top-24
        -left-24
        w-[250px]
        h-[250px]
        bg-amber-200/30
        blur-3xl
        rounded-full
      "
      />

      <div
        className="
        absolute
        -bottom-24
        -right-24
        w-[250px]
        h-[250px]
        bg-rose-200/30
        blur-3xl
        rounded-full
      "
      />

      {/* FLOATING SPARKLES */}

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
        absolute
        top-12
        left-5
        text-amber-400
      "
      >
        <Sparkles size={20} />
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
        <Sparkles size={18} />
      </motion.div>

      {/* MAIN CARD */}

      <Container className="max-w-md md:max-w-xl relative z-10">
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
          backdrop-blur-xl
          rounded-[32px]
          shadow-[0_20px_80px_rgba(0,0,0,0.08)]
          border
          border-white/40
          overflow-hidden
        "
        >
          {/* VIDEO SECTION */}

          <div
            className="
            relative
            flex
            items-center
            justify-center
            bg-[#f8f5f0]
            px-4
            pt-5
          "
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="
              w-auto
              h-auto
              max-h-[180px]
              md:max-h-[240px]
              rounded-2xl
              object-contain
            "
            >
              <source
                src="/videos/success-video.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* CONTENT */}

          <div className="px-6 pb-6 md:px-8 md:pb-8 text-center">
            {/* BRAND */}

            <div
              className="
              flex
              items-center
              justify-center
              gap-2
              text-amber-600
              mt-2
              mb-3
            "
            >
              <Sparkles size={15} />

              <span
                className="
                uppercase
                tracking-[0.25em]
                text-[10px]
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
              md:text-4xl
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
              max-w-md
              mx-auto
            "
            >
              Your handcrafted jewellery
              is now being prepared with
              elegance, care, and detail.
            </p>

            {/* INFO CARDS */}

            <div className="grid gap-3 mt-7">
              {/* DELIVERY */}

              <div
                className="
                bg-[#faf7f2]
                border
                border-black/5
                rounded-2xl
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
                    <PackageCheck size={15} />
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
                rounded-2xl
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
                    <ShieldCheck size={15} />
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

            {/* MESSAGE BOX */}

            <div
              className="
              mt-6
              bg-gradient-to-r
              from-amber-50
              to-rose-50
              border
              border-amber-100
              rounded-2xl
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

            <div className="flex flex-col gap-3 mt-7">
              <Link
                href="/orders"
                className="
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

                <ArrowRight size={17} />
              </Link>

              <Link
                href="/shop"
                className="
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