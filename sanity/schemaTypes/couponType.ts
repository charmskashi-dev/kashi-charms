import { defineField, defineType } from "sanity";

export const couponType = defineType({
  name: "coupon",
  title: "Coupons",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Coupon Code",
      type: "string",
      description: "e.g. FIRSTKASHI, SAVE50, WELCOME10",
      validation: (Rule) => Rule.required().uppercase(),
    }),
    defineField({
      name: "type",
      title: "Discount Type",
      type: "string",
      options: {
        list: [
          { title: "Percentage Off", value: "percentage" },
          { title: "Flat Amount Off", value: "flat" },
          { title: "First Order Only", value: "first_order" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Discount Value",
      type: "number",
      description: "For percentage: enter 10 for 10%. For flat: enter 50 for ₹50 off. For first order: enter 50 for 50%.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "minCartValue",
      title: "Minimum Cart Value (₹)",
      type: "number",
      description: "Coupon only applies if cart total is above this amount. Leave 0 for no minimum.",
      initialValue: 0,
    }),
    defineField({
      name: "maxUsageLimit",
      title: "Max Total Uses",
      type: "number",
      description: "Maximum number of times this coupon can be used across all users. Leave blank for unlimited.",
    }),
    defineField({
      name: "usageCount",
      title: "Times Used",
      type: "number",
      description: "Auto-incremented. Do not edit manually.",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      type: "datetime",
      description: "Leave blank for no expiry.",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Toggle to enable or disable this coupon instantly.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "code",
      subtitle: "type",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title: `${title} ${isActive ? "✅" : "❌"}`,
        subtitle: subtitle,
      };
    },
  },
});