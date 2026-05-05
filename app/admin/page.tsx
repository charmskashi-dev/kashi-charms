"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/ui/card";
import toast from "react-hot-toast";

// ✅ TYPES
type OrderStatus = "pending" | "confirmed" | "shipped";

type Order = {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  totalPrice: number;
  status: OrderStatus;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/get-orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED TYPES HERE
  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await fetch("/api/update-order-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      toast.success("Order updated ✅");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ❌");
    }
  };

  // ✅ SAFE FILTERING (no undefined crash)
  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchText) ||
      order.customerName?.toLowerCase().includes(searchText) ||
      order.email?.toLowerCase().includes(searchText);

    const matchesFilter = filter === "all" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Kashi Charms Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your orders like a pro
            </p>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border text-sm">
            📦 {orders.length} Orders
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            placeholder="Search orders, customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="flex gap-2 flex-wrap">
            {(["all", "pending", "confirmed", "shipped"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-full text-sm transition ${
                  filter === status
                    ? "bg-black text-white shadow"
                    : "bg-white border text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* ORDERS */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.map((order) => (
              <Card
                key={order._id}
                className="rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold text-lg text-gray-800">
                      {order.orderNumber}
                    </h2>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    👤 {order.customerName}
                  </p>

                  <p className="text-sm text-gray-500">
                    📧 {order.email}
                  </p>

                  <div className="mt-3 text-sm font-medium text-gray-800">
                    💰 ₹{order.totalPrice}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => updateStatus(order._id, "confirmed")}
                      className="px-3 py-1.5 bg-black text-white rounded-lg text-sm hover:opacity-90"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "shipped")}
                      className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-100"
                    >
                      Ship
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}