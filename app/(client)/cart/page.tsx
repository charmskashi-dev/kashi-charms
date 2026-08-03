"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButton from "@/components/QuantityButton";
import Title from "@/components/Title";
import CouponDrawer from "@/components/CouponDrawer";

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
  MapPin,
  AlertCircle,
  X,
} from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import createCheckoutSession from "@/actions/createCheckoutSession";

type Address = NonNullable<Order["address"]> & { _id: string };

// ── Address Missing Modal ────────────────────────────────────────────────────
function AddressModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-amber-50 p-4 rounded-full">
            <MapPin size={32} className="text-amber-500" />
          </div>

          <h3 className="text-xl font-semibold text-darkColor">
            No Delivery Address
          </h3>

          <p className="text-gray-500 text-sm">
            Please add a delivery address before placing your order. We need
            to know where to send your jewellery! ✨
          </p>

          <button
            onClick={() => {
              onClose();
              onAdd();
            }}
            className="w-full bg-black text-white py-3 rounded-2xl font-medium hover:opacity-90 transition"
          >
            + Add Address
          </button>

          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            Go back to cart
          </button>
        </div>
      </div>
    </div>
  );
}

const CartPage = () => {
  const { deleteCartProduct, getTotalPrice, getItemCount, resetCart } =
    useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { user } = useUser();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [showForm, setShowForm] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // ── Coupon ───────────────────────────────────────────────────────────────
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(
    null
  );

  const handleCouponApply = (
    code: string,
    discount: number,
    message: string
  ) => {
    setDiscountAmount(discount);
    setCouponApplied(true);
    setCouponMessage(message);
    setAppliedCouponCode(code);
  };

  // ── Address form ─────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // ── Pricing ──────────────────────────────────────────────────────────────
  const subtotal = getTotalPrice();
  const SHIPPING_CHARGE = 60;
  const FREE_SHIPPING_THRESHOLD = 499;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const total = subtotal + shipping - discountAmount;

  // ── Fetch addresses ──────────────────────────────────────────────────────
  const fetchAddresses = async () => {
    if (!user?.id) return;
    try {
      const data = await writeClient.fetch(
        `*[_type=="address" && clerkUserId==$id]`,
        { id: user.id }
      );
      setAddresses(data || []);
      if (data?.length > 0) setSelectedAddress(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchAddresses();
  }, [user?.id]);

  // ── Save address ─────────────────────────────────────────────────────────
  const handleSaveAddress = async () => {
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    try {
      const res = await fetch("/api/create-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user.id, ...form }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      toast.success("Address added ✅");
      setShowForm(false);
      setForm({ name: "", phone: "", address: "", city: "", state: "", zip: "" });
      await fetchAddresses();
      setSelectedAddress(data.address);
    } catch {
      toast.error("Failed to save address ❌");
    }
  };

  // ── Reset cart ───────────────────────────────────────────────────────────
  const handleResetCart = () => {
    if (window.confirm("Reset cart?")) {
      resetCart();
      toast.success("Cart reset!");
    }
  };

  // ── Checkout ─────────────────────────────────────────────────────────────
  const handleCheckout = async () => {
    if (!groupedItems.length) {
      toast.error("Cart is empty");
      return;
    }
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }
    if (!selectedAddress) {
      setShowAddressModal(true);
      return;
    }

    setLoading(true);

    try {
      const items = groupedItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));

      const res = await createCheckoutSession(items, {
        orderNumber: "ORD-" + Date.now(),
        customerName: selectedAddress.name || user.fullName || "Guest",
        customerEmail: user.emailAddresses[0]?.emailAddress || "",
        phone: selectedAddress.phone || "",
        clerkUserId: user.id,
        address: selectedAddress,
        shippingAmount: shipping,
        totalAmount: total,
        discountAmount,
        couponCode: couponApplied ? appliedCouponCode : null,
        paymentMethod,
      });

      if (!res?.success) throw new Error();

      if (paymentMethod === "cod") {
        toast.success("Order placed successfully 🎉");
        resetCart();
        window.location.href = "/success";
        return;
      }

      // ── PayU ─────────────────────────────────────────────────────────
      const payuRes = await fetch("/api/payu/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total.toString(),
          firstname: selectedAddress.name || user.fullName || "Customer",
          email: user.emailAddresses[0]?.emailAddress || "",
          phone: selectedAddress.phone || "9999999999",
          productinfo: "Kashi Charms Order",
        }),
      });

      const data = await payuRes.json();
      if (data.error) throw new Error(data.error);

      const paymentForm = document.createElement("form");
      paymentForm.method = "POST";
      paymentForm.action = "https://secure.payu.in/_payment";

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        paymentForm.appendChild(input);
      });

      document.body.appendChild(paymentForm);
      paymentForm.submit();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen pb-20">
      {/* Address missing modal */}
      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onAdd={() => {
            setShowAddressModal(false);
            setShowForm(true);
            setTimeout(() => {
              document
                .getElementById("address-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        />
      )}

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
                  <Title>Shopping Cart</Title>
                  <p className="text-sm text-gray-500 mt-1">
                    Curated handmade jewellery crafted with elegance ✨
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* LEFT — cart items */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
                <div className="space-y-4">
                  {groupedItems.map(({ product }) => {
                    const count = getItemCount(product._id);
                    return (
                      <div
                        key={product._id}
                        className="flex justify-between gap-4 border-b border-gray-100 py-5 hover:bg-gray-50 transition-all duration-300 rounded-2xl px-2"
                      >
                        <div className="flex gap-4">
                          {product?.images?.[0] && (
                            <Image
                              src={urlFor(product.images[0]).url()}
                              alt="product"
                              width={110}
                              height={110}
                              className="rounded-2xl object-cover border border-gray-100"
                            />
                          )}
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="font-semibold text-lg">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Premium handmade jewellery
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                deleteCartProduct(product._id)
                              }
                              className="flex items-center gap-2 text-red-500 text-sm hover:text-red-600 transition"
                            >
                              <Trash size={15} /> Remove
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <p className="text-lg font-bold">
                            <PriceFormatter
                              amount={(product.price || 0) * count}
                            />
                          </p>
                          <QuantityButton product={product} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleResetCart}
                  className="mt-8 border border-red-200 text-red-500 px-5 py-3 rounded-2xl hover:bg-red-50 transition-all"
                >
                  Reset Cart
                </button>
              </div>

              {/* RIGHT — summary + address */}
              <div className="space-y-5">
                <Card className="border-0 shadow-2xl rounded-3xl bg-white/90 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                      Order Summary
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-5">
                      {/* Subtotal */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium">
                          <PriceFormatter amount={subtotal} />
                        </span>
                      </div>

                      {/* Shipping */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2">
                          <Truck size={16} /> Shipping
                        </span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600 font-semibold">
                              FREE
                            </span>
                          ) : (
                            <PriceFormatter amount={shipping} />
                          )}
                        </span>
                      </div>

                      {/* Shipping messages */}
                      {shipping > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <p className="text-sm text-amber-700">
                            Add{" "}
                            <span className="font-semibold">
                              ₹{FREE_SHIPPING_THRESHOLD - subtotal}
                            </span>{" "}
                            more to unlock FREE delivery ✨
                          </p>
                        </div>
                      )}
                      {shipping === 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                          <p className="text-sm text-green-700 font-medium">
                            🎉 You unlocked FREE shipping
                          </p>
                        </div>
                      )}

                      {/* Coupon Drawer */}
                      <div className="border-t pt-5">
                        <CouponDrawer
                          cartTotal={subtotal}
                          onApply={handleCouponApply}
                          appliedCode={appliedCouponCode}
                        />

                        {couponApplied && (
                          <div className="mt-3 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">
                            <p className="text-sm text-green-700 font-medium">
                              ✨ {couponMessage}
                            </p>
                            <button
                              onClick={() => {
                                setDiscountAmount(0);
                                setCouponApplied(false);
                                setCouponMessage("");
                                setAppliedCouponCode(null);
                              }}
                              className="text-xs text-red-400 hover:text-red-600 transition ml-3 shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Discount */}
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Discount</span>
                          <span className="text-green-600 font-semibold">
                            − <PriceFormatter amount={discountAmount} />
                          </span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="border-t pt-5 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold">
                          <PriceFormatter amount={total} />
                        </span>
                      </div>

                      {/* Payment method */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {(["cod", "online"] as const).map((method) => (
                          <button
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className={`py-3 rounded-2xl font-medium transition-all ${
                              paymentMethod === method
                                ? "bg-black text-white shadow-lg"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            {method === "cod" ? "COD" : "Pay Online"}
                          </button>
                        ))}
                      </div>

                      {/* Checkout button */}
                      <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full mt-2 bg-black text-white p-4 rounded-2xl font-medium tracking-wide hover:opacity-90 transition-all duration-300 shadow-lg disabled:opacity-60"
                      >
                        {loading
                          ? "Processing..."
                          : paymentMethod === "cod"
                          ? "Place Order (COD)"
                          : "Pay Now"}
                      </button>

                      {/* Trust badges */}
                      <div className="pt-4 border-t text-sm text-gray-500 space-y-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={16} /> Secure payments
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck size={16} /> Fast & reliable delivery
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ADDRESS SECTION */}
                {user && (
                  <Card
                    id="address-section"
                    className="rounded-3xl border-0 shadow-xl"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin size={20} /> Delivery Address
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      {addresses.length > 0 ? (
                        <div className="space-y-3">
                          {addresses.map((addr) => (
                            <div
                              key={addr._id}
                              onClick={() => setSelectedAddress(addr)}
                              className={`p-4 cursor-pointer rounded-2xl border transition-all ${
                                selectedAddress?._id === addr._id
                                  ? "bg-black text-white border-black"
                                  : "bg-gray-50 border-gray-100 hover:border-gray-300"
                              }`}
                            >
                              <p className="font-medium">{addr.name}</p>
                              <p className="text-sm mt-1 opacity-80">
                                {addr.address}, {addr.city}
                              </p>
                              <p className="text-sm opacity-80">
                                📞 {addr.phone}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                          <AlertCircle
                            size={18}
                            className="text-amber-500 shrink-0"
                          />
                          <p className="text-sm text-amber-700">
                            No address found. Add one before placing your
                            order.
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => setShowForm(!showForm)}
                        className="mt-5 bg-black text-white px-4 py-3 rounded-2xl w-full hover:opacity-90 transition"
                      >
                        + Add New Address
                      </button>

                      {showForm && (
                        <div className="mt-5 space-y-3">
                          {[
                            { key: "name", placeholder: "Full Name", type: "text" },
                            {
                              key: "phone",
                              placeholder: "Phone Number (for delivery)",
                              type: "tel",
                            },
                            { key: "address", placeholder: "Address", type: "text" },
                            { key: "city", placeholder: "City", type: "text" },
                            { key: "state", placeholder: "State", type: "text" },
                            { key: "zip", placeholder: "PIN Code", type: "text" },
                          ].map(({ key, placeholder, type }) => (
                            <input
                              key={key}
                              type={type}
                              placeholder={placeholder}
                              className="w-full border border-gray-200 p-3 rounded-2xl outline-none focus:border-black text-sm"
                              value={form[key as keyof typeof form]}
                              onChange={(e) =>
                                setForm({ ...form, [key]: e.target.value })
                              }
                            />
                          ))}
                          <button
                            onClick={handleSaveAddress}
                            className="bg-black text-white px-4 py-3 rounded-2xl w-full hover:opacity-90 transition"
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