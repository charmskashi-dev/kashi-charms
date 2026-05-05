"use client";

import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import OrderDetailDialog from "./OrderDetailDialog";
import toast from "react-hot-toast";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERY_RESULT }) => {
  const [selectedOrder, setSelectedOrder] =
    useState<MY_ORDERS_QUERY_RESULT[number] | null>(null);

  const handleDelete = () => {
    toast.error("Delete is only for admin (future feature)");
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order?._id}>
              <TooltipTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => setSelectedOrder(order)}
                >
                  {/* Order Number */}
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-8) ?? "N/A"}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate &&
                      format(new Date(order.orderDate), "dd/MM/yyyy")}
                  </TableCell>

                  {/* Customer */}
                  <TableCell>{order.customerName}</TableCell>

                  {/* Email */}
                  <TableCell className="hidden sm:table-cell">
                    {order.email}
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <PriceFormatter
                      amount={order?.totalPrice}
                      className="text-black font-medium"
                    />
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    )}
                  </TableCell>

                  {/* Delete button */}
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                    className="flex items-center justify-center group"
                  >
                    <X
                      size={18}
                      className="group-hover:text-red-500 transition"
                    />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>

              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>

      {/* Dialog */}
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;