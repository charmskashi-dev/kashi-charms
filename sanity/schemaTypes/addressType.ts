import { PinIcon } from "@sanity/icons";

import {
  defineField,
  defineType,
} from "sanity";

export const addressType = defineType({
  name: "address",

  title: "Customer Address",

  type: "document",

  icon: PinIcon,

  fields: [
    defineField({
      name: "clerkUserId",

      title: "User ID",

      type: "string",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "name",

      title: "Full Name",

      type: "string",

      validation: (Rule) =>
        Rule.required(),
    }),

    // ✅ NEW
    defineField({
      name: "phone",

      title: "Phone Number",

      type: "string",

      validation: (Rule) =>
        Rule.required().regex(
          /^[0-9+\-\s]{10,15}$/,
          {
            name: "phone",
            invert: false,
          }
        ).error(
          "Enter a valid phone number"
        ),
    }),

    defineField({
      name: "address",

      title: "Address",

      type: "string",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "city",

      title: "City",

      type: "string",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "state",

      title: "State",

      type: "string",
    }),

    defineField({
      name: "zip",

      title: "ZIP Code",

      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "name",

      subtitle: "phone",

      city: "city",
    },

    prepare({ title, subtitle, city }) {
      return {
        title,

        subtitle: `${subtitle} • ${city}`,

        media: PinIcon,
      };
    },
  },
});