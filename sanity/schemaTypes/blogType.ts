import { DocumentTextIcon } from "@sanity/icons";

import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const blogType = defineType({
  name: "blog",

  title: "Blog",

  type: "document",

  icon: DocumentTextIcon,

  fields: [
    // =========================
    // TITLE
    // =========================

    defineField({
      name: "title",

      title: "Title",

      type: "string",

      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(120),
    }),

    // =========================
    // EXCERPT
    // =========================

    defineField({
      name: "excerpt",

      title: "Excerpt",

      type: "text",

      rows: 3,

      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(180),
    }),

    // =========================
    // SLUG
    // =========================

    defineField({
      name: "slug",

      title: "Slug",

      type: "slug",

      options: {
        source: "title",

        maxLength: 96,
      },

      validation: (Rule) =>
        Rule.required(),
    }),

    // =========================
    // AUTHOR
    // =========================

    defineField({
      name: "author",

      title: "Author",

      type: "reference",

      to: [{ type: "author" }],

      validation: (Rule) =>
        Rule.required(),
    }),

    // =========================
    // MAIN IMAGE
    // =========================

    defineField({
      name: "mainImage",

      title: "Main Image",

      type: "image",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",

          title: "Alt Text",

          type: "string",
        }),
      ],

      validation: (Rule) =>
        Rule.required(),
    }),

    // =========================
    // CATEGORIES
    // =========================

    defineField({
      name: "blogcategories",

      title: "Blog Categories",

      type: "array",

      of: [
        defineArrayMember({
          type: "reference",

          to: [
            {
              type: "blogcategory",
            },
          ],
        }),
      ],

      validation: (Rule) =>
        Rule.required().min(1),
    }),

    // =========================
    // PUBLISHED DATE
    // =========================

    defineField({
      name: "publishedAt",

      title: "Published At",

      type: "datetime",

      validation: (Rule) =>
        Rule.required(),
    }),

    // =========================
    // FEATURED / LATEST
    // =========================

    defineField({
      name: "isLatest",

      title: "Latest Blog",

      type: "boolean",

      description:
        "Toggle latest blog on or off",

      initialValue: true,
    }),

    // =========================
    // BODY CONTENT
    // =========================

    defineField({
      name: "body",

      title: "Blog Content",

      type: "blockContent",

      validation: (Rule) =>
        Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",

      author: "author.name",

      media: "mainImage",

      isLatest: "isLatest",
    },

    prepare(selection) {
      const {
        author,
        isLatest,
      } = selection;

      return {
        ...selection,

        subtitle: `${
          isLatest
            ? "🔥 Latest | "
            : ""
        }By ${
          author ||
          "Unknown Author"
        }`,
      };
    },
  },
});