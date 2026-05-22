import { MY_ORDERS_QUERY_RESULT } from "@/sanity.types";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/ui/table";

import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

import PriceFormatter from "./PriceFormatter";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERY_RESULT[number] | null;

  isOpen: boolean;

  onClose: () => void;
}

const OrderDetailDialog: React.FC<
  OrderDetailsDialogProps
> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent
        className="
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
      "
      >
        {/* HEADER */}

        <DialogHeader>
          <DialogTitle
            className="
            text-2xl
            font-semibold
            tracking-tight
          "
          >
            Order Details
          </DialogTitle>
        </DialogHeader>

        {/* ORDER INFO */}

        <div
          className="
          mt-4
          grid
          md:grid-cols-2
          gap-4
        "
        >
          {/* ORDER NUMBER */}

          <div
            className="
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
          "
          >
            <p className="text-sm text-gray-500">
              Order Number
            </p>

            <p className="font-semibold mt-1">
              {order.orderNumber}
            </p>
          </div>

          {/* INVOICE NUMBER */}

          <div
            className="
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
          "
          >
            <p className="text-sm text-gray-500">
              Invoice Number
            </p>

            <p className="font-semibold mt-1">
              {order.invoiceNumber ??
                "Not Generated"}
            </p>
          </div>

          {/* CUSTOMER */}

          <div
            className="
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
          "
          >
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-semibold mt-1">
              {order.customerName}
            </p>
          </div>

          {/* EMAIL */}

          <div
            className="
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
          "
          >
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold mt-1 break-all">
              {order.email}
            </p>
          </div>

          {/* PAYMENT */}

          <div
            className="
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
          "
          >
            <p className="text-sm text-gray-500">
              Payment Method
            </p>

            <p className="font-semibold mt-1 capitalize">
              {order.paymentMethod}
            </p>
          </div>

          {/* STATUS */}

          <div
            className="
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
          "
          >
            <p className="text-sm text-gray-500">
              Order Status
            </p>

            <p
              className="
              font-semibold
              mt-1
              capitalize
              text-green-600
            "
            >
              {order.status}
            </p>
          </div>
        </div>

        {/* DATE */}

        <div className="mt-5">
          <p className="text-sm text-gray-500">
            Order Date
          </p>

          <p className="font-medium mt-1">
            {order.orderDate &&
              new Date(
                order.orderDate
              ).toLocaleDateString()}
          </p>
        </div>

        {/* PRODUCTS */}

        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Product
                </TableHead>

                <TableHead>
                  Quantity
                </TableHead>

                <TableHead>
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.products?.map(
                (
                  product,
                  index
                ) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-3">
                      {product?.product
                        ?.images?.[0] && (
                        <Image
                          src={urlFor(
                            product
                              ?.product
                              ?.images[0]
                          ).url()}
                          alt="product"
                          width={55}
                          height={55}
                          className="
                            rounded-xl
                            border
                          "
                        />
                      )}

                      <span className="font-medium">
                        {
                          product
                            ?.product
                            ?.name
                        }
                      </span>
                    </TableCell>

                    <TableCell>
                      {
                        product?.quantity
                      }
                    </TableCell>

                    <TableCell>
                      <PriceFormatter
                        amount={
                          product
                            ?.product
                            ?.price ?? 0
                        }
                        className="
                          text-black
                          font-medium
                        "
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>

        {/* TOTALS */}

        <div
          className="
          mt-8
          flex
          justify-end
        "
        >
          <div
            className="
            w-full
            max-w-xs
            bg-[#faf7f2]
            rounded-2xl
            p-5
            border
            space-y-3
          "
          >
            {/* SUBTOTAL */}

            <div className="flex justify-between">
              <span>
                Subtotal
              </span>

              <PriceFormatter
                amount={
                  order.subtotal ?? 0
                }
              />
            </div>

            {/* SHIPPING */}

            <div className="flex justify-between">
              <span>
                Shipping
              </span>

              <PriceFormatter
                amount={
                  order.shippingAmount ??
                  0
                }
              />
            </div>

            {/* DISCOUNT */}

            {(order.amountDiscount ??
              0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>
                  Discount
                </span>

                <PriceFormatter
                  amount={
                    order.amountDiscount ??
                    0
                  }
                />
              </div>
            )}

            {/* TOTAL */}

            <div
              className="
              border-t
              pt-3
              flex
              justify-between
              font-semibold
              text-lg
            "
            >
              <span>Total</span>

              <PriceFormatter
                amount={
                  order.totalPrice ?? 0
                }
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;