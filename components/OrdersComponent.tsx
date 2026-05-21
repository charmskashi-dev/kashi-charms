"use client";

import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";

import PriceFormatter from "./PriceFormatter";

import { format } from "date-fns";

import { useState } from "react";

import OrderDetailDialog from "./OrderDetailDialog";

import {
  PackageCheck,
  Truck,
  Clock3,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

const OrdersComponent = ({
  orders,
}: {
  orders: MY_ORDERS_QUERY_RESULT;
}) => {
  const [
    selectedOrder,
    setSelectedOrder,
  ] =
    useState<MY_ORDERS_QUERY_RESULT[number] | null>(
      null
    );

  // =========================
  // STATUS UI
  // =========================

  const getStatusUI = (
    status: string
  ) => {
    switch (status) {
      case "delivered":
        return {
          icon: (
            <PackageCheck size={16} />
          ),
          color:
            "bg-green-100 text-green-700 border-green-200",
          text: "Delivered",
        };

      case "processing":
        return {
          icon: <Truck size={16} />,
          color:
            "bg-blue-100 text-blue-700 border-blue-200",
          text: "Processing",
        };

      case "cancelled":
        return {
          icon: <XCircle size={16} />,
          color:
            "bg-red-100 text-red-700 border-red-200",
          text: "Cancelled",
        };

      default:
        return {
          icon: <Clock3 size={16} />,
          color:
            "bg-amber-100 text-amber-700 border-amber-200",
          text: "Pending",
        };
    }
  };

  return (
    <>
      <div className="space-y-6">
        {orders.map((order, index) => {
          const statusUI =
            getStatusUI(
              order?.status || ""
            );

          return (
            <motion.div
              key={order?._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              onClick={() =>
                setSelectedOrder(order)
              }
              className="
              bg-white
              rounded-[32px]
              p-6
              md:p-8
              border
              border-black/5
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
              cursor-pointer
              group
            "
            >
              {/* TOP SECTION */}

              <div
                className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
              "
              >
                {/* LEFT */}

                <div>
                  <div className="flex items-center gap-2 text-amber-600 mb-2">
                    <Sparkles size={15} />

                    <span className="text-xs uppercase tracking-[0.2em] font-medium">
                      Kashi Charms
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight">
                    Order #
                    {order?.orderNumber?.slice(
                      -8
                    )}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    {order?.orderDate &&
                      format(
                        new Date(
                          order.orderDate
                        ),
                        "dd MMM yyyy"
                      )}
                  </p>
                </div>

                {/* RIGHT */}

                <div className="flex flex-wrap items-center gap-3">
                  {/* STATUS */}

                  <div
                    className={`
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    border
                    font-medium
                    ${statusUI.color}
                  `}
                  >
                    {statusUI.icon}

                    {statusUI.text}
                  </div>

                  {/* TOTAL */}

                  <div
                    className="
                    bg-black
                    text-white
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                  "
                  >
                    <PriceFormatter
                      amount={
                        order?.totalPrice
                      }
                      className="text-white"
                    />
                  </div>
                </div>
              </div>

              {/* PRODUCTS PREVIEW */}

              <div className="mt-7">
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {order?.products
                    ?.slice(0, 4)
                    ?.map(
                      (
                        item,
                        index
                      ) => {
                        const image =
                          item?.product
                            ?.images?.[0];

                        return (
                          <div
                            key={index}
                            className="
                            min-w-[85px]
                            text-center
                          "
                          >
                            {/* IMAGE */}

                            <div
                              className="
                              relative
                              w-[85px]
                              h-[85px]
                              rounded-2xl
                              overflow-hidden
                              border
                              border-gray-100
                              bg-[#faf7f2]
                            "
                            >
                              {image && (
                                <Image
                                  src={urlFor(
                                    image
                                  ).url()}
                                  alt={
                                    item
                                      ?.product
                                      ?.name ||
                                    "product"
                                  }
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>

                            {/* QTY */}

                            <p className="text-xs text-gray-500 mt-2">
                              Qty:{" "}
                              {
                                item.quantity
                              }
                            </p>
                          </div>
                        );
                      }
                    )}

                  {/* EXTRA ITEMS */}

                  {(order?.products
                    ?.length || 0) >
                    4 && (
                    <div
                      className="
                      min-w-[85px]
                      h-[85px]
                      rounded-2xl
                      bg-[#faf7f2]
                      border
                      border-gray-100
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-medium
                    "
                    >
                      +
                      {(order?.products
                        ?.length ||
                        0) - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM */}

              <div
                className="
                mt-7
                pt-5
                border-t
                border-gray-100
                flex
                items-center
                justify-between
              "
              >
                <div>
                  <p className="text-sm text-gray-500">
                    Customer
                  </p>

                  <p className="font-medium mt-1">
                    {
                      order?.customerName
                    }
                  </p>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-black
                  group-hover:translate-x-1
                  transition-transform
                "
                >
                  View Details

                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* DIALOG */}

      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
      />
    </>
  );
};

export default OrdersComponent;