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

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import createCheckoutSession from "@/actions/createCheckoutSession";

type Address = NonNullable<Order["address"]> & {
  _id: string;
};

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    resetCart,
  } = useStore();

  const groupedItems = useStore((state) =>
    state.getGroupedItems()
  );

  const { user } = useUser();

  const [addresses, setAddresses] = useState<
    Address[]
  >([]);

  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<"cod" | "online">("cod");

  const [showForm, setShowForm] = useState(false);

  // =========================
  // COUPON STATES
  // =========================

  const [couponCode, setCouponCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [couponApplied, setCouponApplied] =
    useState(false);

  // =========================
  // ADDRESS FORM
  // =========================

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // =========================
  // PRICING LOGIC
  // =========================

  const subtotal = getTotalPrice();

  const SHIPPING_CHARGE = 60;

  const FREE_SHIPPING_THRESHOLD = 499;

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_CHARGE;

  // =========================
  // DISCOUNT LOGIC
  // =========================

  const calculatedDiscount =
    couponApplied
      ? Math.min(
          subtotal * 0.5,
          150
        )
      : 0;

  const finalDiscount =
    discount || calculatedDiscount;

  // =========================
  // TOTAL
  // =========================

  const total =
    subtotal +
    shipping -
    finalDiscount;

  // =========================
  // APPLY COUPON
  // =========================

  const handleApplyCoupon = () => {
    const normalized =
      couponCode.trim().toUpperCase();

    if (normalized === "FIRSTKASHI") {
      const discountAmount =
        Math.min(
          subtotal * 0.5,
          150
        );

      setDiscount(discountAmount);

      setCouponApplied(true);

      toast.success(
        "FIRSTKASHI applied ✨"
      );
    } else {
      setDiscount(0);

      setCouponApplied(false);

      toast.error(
        "Invalid coupon code"
      );
    }
  };

  // =========================
  // FETCH ADDRESSES
  // =========================

  const fetchAddresses = async () => {
    if (!user?.id) return;

    try {
      const data = await writeClient.fetch(
        `*[_type=="address" && clerkUserId==$id]`,
        { id: user.id }
      );

      setAddresses(data || []);

      if (data?.length > 0) {
        setSelectedAddress(data[0]);
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

  const handleSaveAddress = async () => {
    if (!user) {
      window.location.href = "/sign-in";
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
            clerkUserId: user.id,
            ...form,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error();
      }

      toast.success("Address added ✅");

      setShowForm(false);

      setForm({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
      });

      await fetchAddresses();

      setSelectedAddress(data.address);
    } catch {
      toast.error(
        "Failed to save address ❌"
      );
    }
  };

  // =========================
  // RESET CART
  // =========================

  const handleResetCart = () => {
    if (window.confirm("Reset cart?")) {
      resetCart();

      toast.success("Cart reset!");
    }
  };

  // =========================
  // CHECKOUT
  // =========================

  const handleCheckout = async () => {
    if (!groupedItems.length) {
      toast.error("Cart empty");

      return;
    }

    if (!user) {
      window.location.href = "/sign-in";

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
      const items = groupedItems.map(
        (item) => ({
          product: item.product,
          quantity: item.quantity,
        })
      );

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

            address: selectedAddress,

            shippingAmount:
              shipping,

            totalAmount: total,

            discountAmount:
              finalDiscount,

            couponCode:
              couponApplied
                ? couponCode
                : null,

            paymentMethod,
          }
        );

      if (!res?.success) {
        throw new Error();
      }

      // =========================
      // COD
      // =========================

      if (paymentMethod === "cod") {
        toast.success(
          "Order placed successfully 🎉"
        );

        resetCart();

        window.location.href =
          "/success";

        return;
      }

      // =========================
      // PAYU
      // =========================

      const payuRes = await fetch(
        "/api/payu/initiate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount: total.toString(),

            firstname:
              user.fullName ||
              "Customer",

            email:
              user.emailAddresses[0]
                ?.emailAddress || "",

            phone:
              user.phoneNumbers?.[0]
                ?.phoneNumber ||
              "9999999999",

            productinfo:
              "Kashi Charms Order",
          }),
        }
      );

      const data = await payuRes.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const paymentForm =
        document.createElement("form");

      paymentForm.method = "POST";

      paymentForm.action =
        "https://secure.payu.in/_payment";

      Object.entries(data).forEach(
        ([key, value]) => {
          const input =
            document.createElement(
              "input"
            );

          input.type = "hidden";

          input.name = key;

          input.value = String(value);

          paymentForm.appendChild(input);
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
          <>
            {/* HEADER */}

            <div className="py-8">
              <div className="flex items-center gap-3">
                <div className="bg-black text-white p-3 rounded-2xl">
                  <ShoppingBag size={20} />
                </div>

                <div>
                  <Title>
                    Shopping Cart
                  </Title>

                  <p className="text-sm text-gray-500 mt-1">
                    Curated handmade
                    jewellery crafted
                    with elegance ✨
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* LEFT SIDE */}

              <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
                <div className="space-y-4">
                  {groupedItems.map(
                    ({ product }) => {
                      const count =
                        getItemCount(
                          product._id
                        );

                      return (
                        <div
                          key={product._id}
                          className="
                          flex
                          justify-between
                          gap-4
                          border-b
                          border-gray-100
                          py-5
                          hover:bg-gray-50
                          transition-all
                          duration-300
                          rounded-2xl
                          px-2
                        "
                        >
                          {/* LEFT */}

                          <div className="flex gap-4">
                            {product
                              ?.images?.[0] && (
                              <Image
                                src={urlFor(
                                  product.images[0]
                                ).url()}
                                alt="product"
                                width={110}
                                height={110}
                                className="
                                rounded-2xl
                                object-cover
                                border
                                border-gray-100
                              "
                              />
                            )}

                            <div className="flex flex-col justify-between">
                              <div>
                                <p className="font-semibold text-lg">
                                  {
                                    product.name
                                  }
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                  Premium handmade
                                  jewellery
                                </p>
                              </div>

                              <button
                                onClick={() =>
                                  deleteCartProduct(
                                    product._id
                                  )
                                }
                                className="
                                flex
                                items-center
                                gap-2
                                text-red-500
                                text-sm
                                hover:text-red-600
                                transition
                              "
                              >
                                <Trash size={15} />
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* RIGHT */}

                          <div className="flex flex-col items-end justify-between">
                            <p className="text-lg font-bold">
                              <PriceFormatter
                                amount={
                                  (product.price ||
                                    0) *
                                  count
                                }
                              />
                            </p>

                            <QuantityButton
                              product={
                                product
                              }
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* RESET */}

                <button
                  onClick={
                    handleResetCart
                  }
                  className="
                  mt-8
                  border
                  border-red-200
                  text-red-500
                  px-5
                  py-3
                  rounded-2xl
                  hover:bg-red-50
                  transition-all
                "
                >
                  Reset Cart
                </button>
              </div>

              {/* RIGHT SIDE */}

              <div className="space-y-5">
                {/* ORDER SUMMARY */}

                <Card
                  className="
                  border-0
                  shadow-2xl
                  rounded-3xl
                  bg-white/90
                  backdrop-blur
                "
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                      Order Summary
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-5">
                      {/* SUBTOTAL */}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Subtotal
                        </span>

                        <span className="font-medium">
                          <PriceFormatter
                            amount={
                              subtotal
                            }
                          />
                        </span>
                      </div>

                      {/* SHIPPING */}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Truck size={16} />
                          Shipping
                        </span>

                        <span className="font-medium">
                          {shipping ===
                          0 ? (
                            <span className="text-green-600 font-semibold">
                              FREE
                            </span>
                          ) : (
                            <PriceFormatter
                              amount={
                                shipping
                              }
                            />
                          )}
                        </span>
                      </div>

                      {/* FREE SHIPPING MESSAGE */}

                      {shipping > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <p className="text-sm text-amber-700">
                            Add{" "}
                            <span className="font-semibold">
                              ₹
                              {FREE_SHIPPING_THRESHOLD -
                                subtotal}
                            </span>{" "}
                            more to unlock
                            FREE delivery ✨
                          </p>
                        </div>
                      )}

                      {shipping ===
                        0 && (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                          <p className="text-sm text-green-700 font-medium">
                            🎉 You unlocked
                            FREE shipping
                          </p>
                        </div>
                      )}

                      {/* COUPON SECTION */}

                      <div className="space-y-3 border-t pt-5">
                        <div className="flex items-center gap-2">
                          <Tag size={16} />

                          <p className="text-sm font-medium">
                            Apply Coupon
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="FIRSTKASHI"
                            value={
                              couponCode
                            }
                            onChange={(
                              e
                            ) =>
                              setCouponCode(
                                e.target
                                  .value
                              )
                            }
                            className="
                            flex-1
                            border
                            border-gray-200
                            rounded-2xl
                            px-4
                            py-3
                            outline-none
                            focus:border-black
                            text-sm
                          "
                          />

                          <button
                            onClick={
                              handleApplyCoupon
                            }
                            className="
                            bg-black
                            text-white
                            px-5
                            rounded-2xl
                            hover:opacity-90
                            transition
                            text-sm
                            font-medium
                          "
                          >
                            Apply
                          </button>
                        </div>

                        {couponApplied && (
                          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                            <p className="text-sm text-green-700 font-medium">
                              ✨ FIRSTKASHI
                              applied —
                              You saved{" "}
                              <PriceFormatter
                                amount={
                                  finalDiscount
                                }
                              />
                            </p>
                          </div>
                        )}
                      </div>

                      {/* DISCOUNT */}

                      {finalDiscount >
                        0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Discount
                          </span>

                          <span className="text-green-600 font-semibold">
                            -₹
                            {finalDiscount.toFixed(
                              2
                            )}
                          </span>
                        </div>
                      )}

                      {/* TOTAL */}

                      <div className="border-t pt-5 flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          Total
                        </span>

                        <span className="text-2xl font-bold">
                          <PriceFormatter
                            amount={
                              total
                            }
                          />
                        </span>
                      </div>

                      {/* PAYMENT */}

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={() =>
                            setPaymentMethod(
                              "cod"
                            )
                          }
                          className={`
                          py-3
                          rounded-2xl
                          font-medium
                          transition-all
                          ${
                            paymentMethod ===
                            "cod"
                              ? "bg-black text-white shadow-lg"
                              : "bg-gray-100 hover:bg-gray-200"
                          }
                        `}
                        >
                          COD
                        </button>

                        <button
                          onClick={() =>
                            setPaymentMethod(
                              "online"
                            )
                          }
                          className={`
                          py-3
                          rounded-2xl
                          font-medium
                          transition-all
                          ${
                            paymentMethod ===
                            "online"
                              ? "bg-black text-white shadow-lg"
                              : "bg-gray-100 hover:bg-gray-200"
                          }
                        `}
                        >
                          Pay Online
                        </button>
                      </div>

                      {/* CHECKOUT */}

                      <button
                        onClick={
                          handleCheckout
                        }
                        disabled={
                          loading
                        }
                        className="
                        w-full
                        mt-2
                        bg-black
                        text-white
                        p-4
                        rounded-2xl
                        font-medium
                        tracking-wide
                        hover:opacity-90
                        transition-all
                        duration-300
                        shadow-lg
                      "
                      >
                        {loading
                          ? "Processing..."
                          : paymentMethod ===
                            "cod"
                          ? "Place Order (COD)"
                          : "Pay Now"}
                      </button>

                      {/* TRUST BADGES */}

                      <div className="pt-4 border-t text-sm text-gray-500 space-y-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck
                            size={16}
                          />
                          Secure payments
                        </div>

                        <div className="flex items-center gap-2">
                          <Truck
                            size={16}
                          />
                          Fast & reliable
                          delivery
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ADDRESS SECTION */}

                {user && (
                  <Card className="rounded-3xl border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Delivery
                        Address
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      {addresses.length >
                      0 ? (
                        <div className="space-y-3">
                          {addresses.map(
                            (addr) => (
                              <div
                                key={
                                  addr._id
                                }
                                onClick={() =>
                                  setSelectedAddress(
                                    addr
                                  )
                                }
                                className={`
                                p-4
                                cursor-pointer
                                rounded-2xl
                                border
                                transition-all
                                ${
                                  selectedAddress?._id ===
                                  addr._id
                                    ? "bg-black text-white border-black"
                                    : "bg-gray-50 border-gray-100 hover:border-gray-300"
                                }
                              `}
                              >
                                <p className="font-medium">
                                  {
                                    addr.name
                                  }
                                </p>

                                <p className="text-sm mt-1 opacity-80">
                                  {
                                    addr.address
                                  }
                                  ,{" "}
                                  {
                                    addr.city
                                  }
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          No address
                          found
                        </p>
                      )}

                      {/* ADD ADDRESS */}

                      <button
                        onClick={() =>
                          setShowForm(
                            !showForm
                          )
                        }
                        className="
                        mt-5
                        bg-black
                        text-white
                        px-4
                        py-3
                        rounded-2xl
                        w-full
                        hover:opacity-90
                        transition
                      "
                      >
                        + Add Address
                      </button>

                      {/* FORM */}

                      {showForm && (
                        <div className="mt-5 space-y-3">
                          <input
                            placeholder="Full Name"
                            className="w-full border border-gray-200 p-3 rounded-2xl outline-none focus:border-black"
                            value={
                              form.name
                            }
                            onChange={(
                              e
                            ) =>
                              setForm({
                                ...form,
                                name: e
                                  .target
                                  .value,
                              })
                            }
                          />

                          <input
                            placeholder="Address"
                            className="w-full border border-gray-200 p-3 rounded-2xl outline-none focus:border-black"
                            value={
                              form.address
                            }
                            onChange={(
                              e
                            ) =>
                              setForm({
                                ...form,
                                address:
                                  e
                                    .target
                                    .value,
                              })
                            }
                          />

                          <input
                            placeholder="City"
                            className="w-full border border-gray-200 p-3 rounded-2xl outline-none focus:border-black"
                            value={
                              form.city
                            }
                            onChange={(
                              e
                            ) =>
                              setForm({
                                ...form,
                                city: e
                                  .target
                                  .value,
                              })
                            }
                          />

                          <button
                            onClick={
                              handleSaveAddress
                            }
                            className="
                            bg-black
                            text-white
                            px-4
                            py-3
                            rounded-2xl
                            w-full
                            hover:opacity-90
                            transition
                          "
                          >
                            Save Address
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartPage;