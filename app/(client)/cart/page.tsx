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
import { ShoppingBag, Trash } from "lucide-react";
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

  const groupedItems = useStore((state) => state.getGroupedItems());

  const { user } = useUser();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "online"
  >("cod");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // FETCH ADDRESSES ONLY IF USER LOGGED IN
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

  // SAVE ADDRESS
  const handleSaveAddress = async () => {
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    if (!form.name || !form.address || !form.city) {
      toast.error("Fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/create-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkUserId: user.id,
          ...form,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

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
      toast.error("Failed to save address ❌");
    }
  };

  // RESET CART
  const handleResetCart = () => {
    if (window.confirm("Reset cart?")) {
      resetCart();
      toast.success("Cart reset!");
    }
  };

  // FINAL CHECKOUT
  const handleCheckout = async () => {
    if (!groupedItems.length) {
      toast.error("Cart empty");
      return;
    }

    // LOGIN ONLY WHEN CHECKING OUT
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select address");
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
        customerName: user.fullName || "Guest",
        customerEmail:
          user.emailAddresses[0]?.emailAddress || "",
        clerkUserId: user.id,
        address: selectedAddress,
      });

      if (!res?.success) {
        throw new Error();
      }

      // COD FLOW
      if (paymentMethod === "cod") {
        toast.success("Order placed successfully 🎉");

        resetCart();

        window.location.href = "/success";

        return;
      }

      // ONLINE PAYMENT
const payuRes = await fetch("/api/payu/initiate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: res.totalPrice.toString(),
    firstname: user.fullName || "Customer",
    email:
      user.emailAddresses[0]?.emailAddress ||
      "",
    phone:
      user.phoneNumbers?.[0]?.phoneNumber ||
      "9999999999",
    productinfo: "Kashi Charms Order",
  }),
});

const data = await payuRes.json();

if (data.error) {
  throw new Error(data.error);
}

const paymentForm = document.createElement("form");

paymentForm.method = "POST";

paymentForm.action =
  "https://secure.payu.in/_payment";

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
    <div className="bg-gray-50 pb-20">
      <Container>
        {groupedItems?.length ? (
          <>
            <div className="flex items-center gap-2 py-5">
              <ShoppingBag />
              <Title>Shopping Cart</Title>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* LEFT */}
              <div className="lg:col-span-2 bg-white p-4 rounded-md">
                {groupedItems.map(({ product }) => {
                  const count = getItemCount(product._id);

                  return (
                    <div
                      key={product._id}
                      className="flex justify-between border-b py-3"
                    >
                      <div className="flex gap-3">
                        {product?.images?.[0] && (
                          <Image
                            src={urlFor(product.images[0]).url()}
                            alt="product"
                            width={100}
                            height={100}
                            className="rounded"
                          />
                        )}

                        <div>
                          <p className="font-semibold">
                            {product.name}
                          </p>

                          <Trash
                            onClick={() =>
                              deleteCartProduct(product._id)
                            }
                            className="cursor-pointer text-red-500 mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <PriceFormatter
                          amount={(product.price || 0) * count}
                        />

                        <QuantityButton product={product} />
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={handleResetCart}
                  className="mt-5 border px-4 py-2 rounded text-red-500 border-red-500 hover:bg-red-50"
                >
                  Reset Cart
                </button>
              </div>

              {/* RIGHT */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="font-semibold">
                      Total: ₹{getTotalPrice()}
                    </p>

                    {/* PAYMENT */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() =>
                          setPaymentMethod("cod")
                        }
                        className={`flex-1 py-2 rounded ${
                          paymentMethod === "cod"
                            ? "bg-black text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        COD
                      </button>

                      <button
                        onClick={() =>
                          setPaymentMethod("online")
                        }
                        className={`flex-1 py-2 rounded ${
                          paymentMethod === "online"
                            ? "bg-black text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        Pay Online
                      </button>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full mt-4 bg-black text-white p-3 rounded"
                    >
                      {loading
                        ? "Processing..."
                        : paymentMethod === "cod"
                        ? "Place Order (COD)"
                        : "Pay Now"}
                    </button>
                  </CardContent>
                </Card>

                {/* ADDRESS SECTION */}
                {user && (
                  <Card className="mt-5">
                    <CardHeader>
                      <CardTitle>
                        Delivery Address
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      {addresses.length > 0 ? (
                        addresses.map((addr) => (
                          <div
                            key={addr._id}
                            onClick={() =>
                              setSelectedAddress(addr)
                            }
                            className={`p-2 cursor-pointer mb-2 rounded ${
                              selectedAddress?._id ===
                              addr._id
                                ? "bg-green-100"
                                : "bg-gray-50"
                            }`}
                          >
                            <p>{addr.name}</p>

                            <p>
                              {addr.address}, {addr.city}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          No address found
                        </p>
                      )}

                      <button
                        onClick={() =>
                          setShowForm(!showForm)
                        }
                        className="mt-3 bg-black text-white px-3 py-2 rounded"
                      >
                        + Add Address
                      </button>

                      {showForm && (
                        <div className="mt-4 space-y-2">
                          <input
                            placeholder="Name"
                            className="w-full border p-2 rounded"
                            value={form.name}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                name: e.target.value,
                              })
                            }
                          />

                          <input
                            placeholder="Address"
                            className="w-full border p-2 rounded"
                            value={form.address}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                address: e.target.value,
                              })
                            }
                          />

                          <input
                            placeholder="City"
                            className="w-full border p-2 rounded"
                            value={form.city}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                city: e.target.value,
                              })
                            }
                          />

                          <button
                            onClick={handleSaveAddress}
                            className="bg-green-600 text-white px-3 py-2 rounded w-full"
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