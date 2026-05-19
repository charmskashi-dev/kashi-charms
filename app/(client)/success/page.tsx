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
      py-16
    "
    >
      {/* BACKGROUND GLOWS */}

      <div
        className="
        absolute
        -top-30
        -left-30
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
        -right-30
        w-87.5
        h-87.5
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
        top-20
        left-10
        text-amber-400
      "
      >
        <Sparkles size={26} />
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
        bottom-24
        right-10
        text-rose-400
      "
      >
        <Sparkles size={22} />
      </motion.div>

      <Container className="max-w-2xl relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          bg-white/75
          backdrop-blur-2xl
          rounded-[40px]
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
              className="
              w-full
              h-80
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
              bg-linear-to-t
              from-black/20
              to-transparent
            "
            />
          </div>

          {/* CONTENT */}

          <div className="p-8 md:p-10 text-center">
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
              <Sparkles size={18} />

              <span
                className="
                uppercase
                tracking-[0.25em]
                text-xs
                font-medium
              "
              >
                Kashi Charms
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="
              text-4xl
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
              mt-5
              text-gray-600
              text-base
              md:text-lg
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

            <div className="grid md:grid-cols-2 gap-4 mt-10">
              {/* DELIVERY */}

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
                  <div
                    className="
                    bg-black
                    text-white
                    p-2.5
                    rounded-xl
                  "
                  >
                    <PackageCheck size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Estimated Delivery
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
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
                p-5
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
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      Secure Checkout
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
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