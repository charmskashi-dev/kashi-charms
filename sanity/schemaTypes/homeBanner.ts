import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeBanner",
  title: "Home Banner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Label",
      type: "string",
      description: "Just for you to identify this banner in the studio — not shown on the site.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bannerType",
      title: "Banner Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      description: "Designed in Canva. Recommended size: 1600 x 500px (16:5 ratio).",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "For accessibility / SEO — describe what the banner says.",
        },
      ],
      hidden: ({ document }) => document?.bannerType !== "image",
    }),
    defineField({
      name: "video",
      title: "Banner Video",
      type: "file",
      options: { accept: "video/mp4" },
      hidden: ({ document }) => document?.bannerType !== "video",
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      description: "Where should the whole banner link to? e.g. /shop or /product/some-slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Turn off to hide this banner without deleting it.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "bannerType",
    },
  },
});