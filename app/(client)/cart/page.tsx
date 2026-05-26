"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButton from "@/components/QuantityButton";
import Title from "@/components/Title";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui/card";

import { Order } from "@/sanity.types";

import { writeClient } from "@/sanity/lib/writeClient";

import { urlFor } from "@/sanity/lib/image";

import useStore from "@/store";

import { useUser } from "@clerk/nextjs";

import {
  ShoppingBag,
  Trash,
  Truck,
  ShieldCheck,
  Tag,
} from "lucide-react";

import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import createCheckoutSession from "@/actions/createCheckoutSession";

type Address =
  NonNullable<
    Order["address"]
  > & {
    _id: string;
  };

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    resetCart,
  } = useStore();

  const groupedItems = useStore(
    (state) =>
      state.getGroupedItems()
  );

  const { user } = useUser();

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState<Address | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState<
    "cod" | "online"
  >("cod");

  const [showForm, setShowForm] =
    useState(false);

  // =========================
  // COUPON STATES
  // =========================

  const [couponCode, setCouponCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [
    couponApplied,
    setCouponApplied,
  ] = useState(false);

  // =========================
  // ADDRESS FORM
  // =========================

  const [form, setForm] =
    useState({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });

  // =========================
  // PRICING
  // =========================

  const subtotal =
    getTotalPrice();

  const SHIPPING_CHARGE = 60;

  const FREE_SHIPPING_THRESHOLD =
    499;

  const shipping =
    subtotal >=
    FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_CHARGE;

  const total =
    subtotal +
    shipping -
    discount;

  // =========================
  // APPLY COUPON
  // =========================

  const handleApplyCoupon =
    async () => {
      const normalized =
        couponCode
          .trim()
          .toUpperCase();

      // USER CHECK

      if (!user) {
        toast.error(
          "Please sign in first"
        );

        return;
      }

      // INVALID CODE

      if (
        normalized !==
        "FIRSTKASHI"
      ) {
        setDiscount(0);

        setCouponApplied(false);

        toast.error(
          "Invalid coupon code"
        );

        return;
      }

      try {
        // CHECK PREVIOUS ORDERS

        const existingOrders =
          await writeClient.fetch(
            `count(*[_type == "order" && clerkUserId == $userId])`,
            {
              userId: user.id,
            }
          );

        // ALREADY ORDERED

        if (existingOrders > 0) {
          setDiscount(0);

          setCouponApplied(false);

          toast.error(
            "FIRSTKASHI is only valid for first order"
          );

          return;
        }

        // APPLY DISCOUNT

        const discountAmount =
          Math.min(
            subtotal * 0.5,
            150
          );

        setDiscount(
          discountAmount
        );

        setCouponApplied(true);

        toast.success(
          "FIRSTKASHI applied ✨"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to verify coupon"
        );
      }
    };

  // =========================
  // FETCH ADDRESSES
  // =========================

  const fetchAddresses =
    async () => {
      if (!user?.id) return;

      try {
        const data =
          await writeClient.fetch(
            `*[_type=="address" && clerkUserId==$id]`,
            {
              id: user.id,
            }
          );

        setAddresses(data || []);

        if (
          data?.length > 0
        ) {
          setSelectedAddress(
            data[0]
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  // =========================
  // SAVE ADDRESS
  // =========================

  const handleSaveAddress =
    async () => {
      if (!user) {
        window.location.href =
          "/sign-in";

        return;
      }

      if (
        !form.name ||
        !form.address ||
        !form.city
      ) {
        toast.error(
          "Fill all required fields"
        );

        return;
      }

      try {
        const res = await fetch(
          "/api/create-address",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              clerkUserId:
                user.id,
              ...form,
            }),
          }
        );

        const data =
          await res.json();

        if (!data.success) {
          throw new Error();
        }

        toast.success(
          "Address added ✅"
        );

        setShowForm(false);

        setForm({
          name: "",
          address: "",
          city: "",
          state: "",
          zip: "",
        });

        await fetchAddresses();

        setSelectedAddress(
          data.address
        );
      } catch {
        toast.error(
          "Failed to save address ❌"
        );
      }
    };

  // =========================
  // RESET CART
  // =========================

  const handleResetCart =
    () => {
      if (
        window.confirm(
          "Reset cart?"
        )
      ) {
        resetCart();

        toast.success(
          "Cart reset!"
        );
      }
    };

  // =========================
  // CHECKOUT
  // =========================

  const handleCheckout =
    async () => {
      if (
        !groupedItems.length
      ) {
        toast.error(
          "Cart empty"
        );

        return;
      }

      if (!user) {
        window.location.href =
          "/sign-in";

        return;
      }

      if (!selectedAddress) {
        toast.error(
          "Please select address"
        );

        return;
      }

      setLoading(true);

      try {
        const items =
          groupedItems.map(
            (item) => ({
              product:
                item.product,
              quantity:
                item.quantity,
            })
          );

        const res =
          await createCheckoutSession(
            items,
            {
              orderNumber:
                "ORD-" +
                Date.now(),

              customerName:
                user.fullName ||
                "Guest",

              customerEmail:
                user
                  .emailAddresses[0]
                  ?.emailAddress ||
                "",

              clerkUserId:
                user.id,

              address:
                selectedAddress,

              shippingAmount:
                shipping,

              totalAmount:
                total,

              discountAmount:
                discount,

              couponCode:
                couponApplied
                  ? "FIRSTKASHI"
                  : null,

              paymentMethod,
            }
          );

        if (
          !res?.success
        ) {
          throw new Error();
        }

        // COD

        if (
          paymentMethod ===
          "cod"
        ) {
          toast.success(
            "Order placed successfully 🎉"
          );

          resetCart();

          window.location.href =
            "/success";

          return;
        }

        // PAYU

        const payuRes =
          await fetch(
            "/api/payu/initiate",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  amount:
                    total.toString(),

                  firstname:
                    user.fullName ||
                    "Customer",

                  email:
                    user
                      .emailAddresses[0]
                      ?.emailAddress ||
                    "",

                  phone:
                    user
                      .phoneNumbers?.[0]
                      ?.phoneNumber ||
                    "9999999999",

                  productinfo:
                    "Kashi Charms Order",
                }
              ),
            }
          );

        const data =
          await payuRes.json();

        if (data.error) {
          throw new Error(
            data.error
          );
        }

        const paymentForm =
          document.createElement(
            "form"
          );

        paymentForm.method =
          "POST";

        paymentForm.action =
          "https://secure.payu.in/_payment";

        Object.entries(
          data
        ).forEach(
          ([key, value]) => {
            const input =
              document.createElement(
                "input"
              );

            input.type =
              "hidden";

            input.name =
              key;

            input.value =
              String(value);

            paymentForm.appendChild(
              input
            );
          }
        );

        document.body.appendChild(
          paymentForm
        );

        paymentForm.submit();
      } catch (err) {
        console.error(err);

        toast.error(
          "Checkout failed ❌"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-[#faf7f2] min-h-screen pb-20">
      <Container>
        {groupedItems?.length ? (
          <div className="py-10">
            <Title>
              Shopping Cart
            </Title>

            {/* YOUR EXISTING JSX UI BELOW REMAINS SAME */}

          </div>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartPage;