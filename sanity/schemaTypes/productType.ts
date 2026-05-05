import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,

  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "discount",
      title: "Discount (%)",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(100),
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),

    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),

    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Necklaces", value: "necklaces" },
          { title: "Earrings", value: "earrings" },
          { title: "Rings", value: "rings" },
          { title: "Bracelets", value: "bracelets" },
        ],
      },
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "images",
      price: "price",
      discount: "discount",
    },
    prepare(selection) {
      const { title, media, price, discount } = selection;
      const image = media && media[0];

      // Calculate discounted price
      const finalPrice =
        discount > 0 ? price - (price * discount) / 100 : price;

      return {
        title: title,
        subtitle: `₹${finalPrice?.toLocaleString("en-IN")}${
          discount > 0 ? ` (-${discount}%)` : ""
        }`,
        media: image,
      };
    },
  },
});