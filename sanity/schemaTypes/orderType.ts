import { BasketIcon } from "@sanity/icons";

import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const orderType = defineType({
  name: "order",

  title: "Order",

  type: "document",

  icon: BasketIcon,

  fields: [
    // =========================
    // ORDER INFO
    // =========================

    defineField({
      name: "orderNumber",

      title: "Order Number",

      type: "string",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "clerkUserId",

      title: "User ID",

      type: "string",
    }),

    defineField({
      name: "customerName",

      title: "Customer Name",

      type: "string",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "email",

      title: "Customer Email",

      type: "string",

      validation: (Rule) =>
        Rule.required().email(),
    }),

    // =========================
    // PRODUCTS
    // =========================

    defineField({
      name: "products",

      title: "Products",

      type: "array",

      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "product",

              title: "Product",

              type: "reference",

              to: [
                {
                  type: "product",
                },
              ],
            }),

            defineField({
              name: "quantity",

              title: "Quantity",

              type: "number",

              validation: (
                Rule
              ) =>
                Rule.required().min(
                  1
                ),
            }),
          ],

          preview: {
            select: {
              product:
                "product.name",

              quantity:
                "quantity",
            },

            prepare({
              product,
              quantity,
            }) {
              return {
                title: `${product} x ${quantity}`,
              };
            },
          },
        }),
      ],
    }),

    // =========================
    // PRICING
    // =========================

    defineField({
      name: "subtotal",

      title: "Subtotal",

      type: "number",

      initialValue: 0,

      validation: (Rule) =>
        Rule.required().min(0),
    }),

    defineField({
      name: "shippingAmount",

      title: "Shipping Amount",

      type: "number",

      initialValue: 0,

      validation: (Rule) =>
        Rule.required().min(0),
    }),

    defineField({
      name: "amountDiscount",

      title: "Discount Amount",

      type: "number",

      initialValue: 0,

      validation: (Rule) =>
        Rule.min(0),
    }),

    defineField({
      name: "couponCode",

      title: "Coupon Code",

      type: "string",
    }),

    defineField({
      name: "totalPrice",

      title: "Final Total",

      type: "number",

      validation: (Rule) =>
        Rule.required().min(0),
    }),

    defineField({
      name: "currency",

      title: "Currency",

      type: "string",

      initialValue: "INR",
    }),

    // =========================
    // PAYMENT
    // =========================

    defineField({
      name: "paymentMethod",

      title: "Payment Method",

      type: "string",

      options: {
        list: [
          {
            title:
              "Cash On Delivery",

            value: "cod",
          },

          {
            title:
              "Pay Online",

            value: "online",
          },

          {
            title:
              "Unpaid",

            value: "unpaid",
          },
        ],
      },

      initialValue: "unpaid",
    }),

    // =========================
    // ADDRESS
    // =========================

    defineField({
      name: "address",

      title: "Shipping Address",

      type: "object",

      fields: [
        {
          name: "name",

          title: "Full Name",

          type: "string",
        },

        {
          name: "address",

          title: "Address",

          type: "string",
        },

        {
          name: "city",

          title: "City",

          type: "string",
        },

        {
          name: "state",

          title: "State",

          type: "string",
        },

        {
          name: "zip",

          title: "ZIP Code",

          type: "string",
        },
      ],
    }),

    // =========================
    // ORDER STATUS
    // =========================

    defineField({
      name: "status",

      title: "Order Status",

      type: "string",

      options: {
        list: [
          {
            title: "Pending",

            value: "pending",
          },

          {
            title:
              "Processing",

            value:
              "processing",
          },

          {
            title: "Shipped",

            value: "shipped",
          },

          {
            title:
              "Delivered",

            value:
              "delivered",
          },

          {
            title:
              "Cancelled",

            value:
              "cancelled",
          },
        ],
      },

      initialValue: "pending",
    }),

    // =========================
    // DATE
    // =========================

    defineField({
      name: "orderDate",

      title: "Order Date",

      type: "datetime",

      validation: (Rule) =>
        Rule.required(),
    }),
  ],

  // =========================
  // PREVIEW
  // =========================

  preview: {
    select: {
      name: "customerName",

      amount: "totalPrice",

      currency: "currency",

      orderId:
        "orderNumber",

      email: "email",

      status: "status",
    },

    prepare({
      name,
      amount,
      currency,
      orderId,
      email,
      status,
    }) {
      const shortId = `${orderId?.slice(
        0,
        5
      )}...${orderId?.slice(-5)}`;

      return {
        title: `${name} (${shortId})`,

        subtitle: `${
          currency || "₹"
        } ${amount} • ${status} • ${email}`,

        media: BasketIcon,
      };
    },
  },
});