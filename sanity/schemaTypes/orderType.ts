import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,

  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),

    // 🛒 Products
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
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
            },
            prepare({ product, quantity }) {
              return {
                title: `${product} x ${quantity}`,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    // 💰 Currency (you kept it 👌)
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "INR",
    }),

    // 🎁 Discount (you kept it 👌)
    defineField({
      name: "amountDiscount",
      title: "Discount Amount",
      type: "number",
      initialValue: 0,
    }),

    // 📍 Address
    defineField({
      name: "address",
      title: "Shipping Address",
      type: "object",
      fields: [
        { name: "name", type: "string" },
        { name: "address", type: "string" },
        { name: "city", type: "string" },
        { name: "state", type: "string" },
        { name: "zip", type: "string" },
      ],
    }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),

    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare({ name, amount, currency, orderId, email }) {
      const shortId = `${orderId?.slice(0, 5)}...${orderId?.slice(-5)}`;
      return {
        title: `${name} (${shortId})`,
        subtitle: `${currency || "₹"} ${amount} • ${email}`,
        media: BasketIcon,
      };
    },
  },
});