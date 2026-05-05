"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import useStore from "@/store";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const resetCart = useStore((state) => state.resetCart);

  // ✅ CLEAR CART ON LOAD
  useEffect(() => {
    resetCart();
  }, []);

  return (
    <div className="min-h-screen bg-shop-light-bg flex items-center justify-center">
      <Container className="max-w-lg">

        <div className="bg-white rounded-2xl shadow-md p-8 text-center space-y-6">

          {/* ICON */}
          <CheckCircle className="mx-auto text-green-500" size={60} />

          {/* TITLE */}
          <h1 className="text-2xl font-semibold text-darkColor">
            Order Placed Successfully 🎉
          </h1>

          {/* MESSAGE */}
          <p className="text-gray-500 text-sm">
            Thank you for shopping with us! Your order has been received and
            will be processed shortly.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3 mt-6">

            <Link
              href="/orders"
              className="w-full bg-black text-white py-3 rounded-lg hoverEffect"
            >
              View My Orders
            </Link>

            <Link
              href="/shop"
              className="w-full border border-black/10 py-3 rounded-lg hover:bg-gray-100"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </Container>
    </div>
  );
}