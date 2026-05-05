"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/ui/button";
import toast from "react-hot-toast";
import { markOrderAsPaid } from "@/actions/createCheckoutSession";

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  totalPrice: number;
  status: string;
  orderDate: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const data = await client.fetch(
      `*[_type == "order"] | order(orderDate desc)`
    );
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkAsPaid = async (orderNumber: string) => {
    setLoading(true);
    try {
      await markOrderAsPaid(orderNumber, "manual-payment");
      toast.success("Order marked as paid!");
      fetchOrders(); // refresh
    } catch (err) {
      toast.error("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                #{order.orderNumber}
              </p>
              <p>{order.customerName}</p>
              <p className="text-sm text-gray-500">{order.email}</p>
              <p className="mt-1">₹{order.totalPrice}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    order.status === "paid"
                      ? "text-green-600"
                      : "text-orange-500"
                  }
                >
                  {order.status}
                </span>
              </p>
            </div>

            {order.status !== "paid" && (
              <Button
                onClick={() =>
                  handleMarkAsPaid(order.orderNumber)
                }
                disabled={loading}
              >
                Mark as Paid
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}