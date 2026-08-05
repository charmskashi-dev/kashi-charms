import Container from "@/components/Container";
import Title from "@/components/Title";

import { SINGLE_BLOG_QUERY_RESULT } from "@/sanity.types";

import { urlFor } from "@/sanity/lib/image";

import {
  getBlogCategories,
  getOthersBlog,
  getSingleBlog,
} from "@/sanity/queries";

import dayjs from "dayjs";

import {
  Calendar,
  ChevronLeftIcon,
  Pencil,
} from "lucide-react";

import { PortableText } from "next-sanity";
import type { PortableTextComponents } from "next-sanity";

import Image from "next/image";

import Link from "next/link";

import { notFound } from "next/navigation";

import React from "react";

// =========================
// TYPES
// =========================

type CategoryType = {
  title: string | null;

  count?: number | null;
};

type BlogType = {
  title: string | null;

  slug: {
    current?: string;
  } | null;

  mainImage?: any;
};

// =========================
// SEO METADATA
// =========================

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const blog = await getSingleBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Kashi Charms`,

    description:
      "Read the latest handcrafted jewellery stories and style guides from Kashi Charms.",
  };
}

// =========================
// PAGE
// =========================

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-5 text-base/8">{children}</p>
    ),

    h2: ({ children }) => (
      <h2 className="my-8 text-3xl font-semibold text-darkColor">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="my-6 text-2xl font-medium text-darkColor">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-shop-dark-green bg-shop-light-bg p-5 italic rounded-r-xl">
        {children}
      </blockquote>
    ),
  },

  types: {
    image: ({ value }) => (
      <Image
        alt={value?.alt || ""}
        src={urlFor(value).width(2000).url()}
        width={1400}
        height={1000}
        className="w-full rounded-2xl my-8"
      />
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-5 space-y-2">{children}</ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-5 space-y-2">{children}</ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-darkColor">{children}</strong>
    ),

    link: ({ value, children }) => (
      <Link
        href={value?.href || "#"}
        className="underline underline-offset-4 text-shop-dark-green"
      >
        {children}
      </Link>
    ),
  },
};

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;

  const blog: SINGLE_BLOG_QUERY_RESULT =
    await getSingleBlog(slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* MAIN CONTENT */}

        <div className="lg:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(
                blog.mainImage
              ).url()}
              alt={
                blog?.title ||
                "Blog Image"
              }
              width={1200}
              height={800}
              priority
              className="w-full rounded-2xl object-cover"
            />
          )}

          {/* META INFO */}

          <div className="flex flex-wrap items-center gap-5 text-xs my-7">
            {/* CATEGORY */}

            <div className="flex items-center gap-2 flex-wrap">
              {blog?.blogcategories?.map(
                (
                  item: any,
                  index: number
                ) => (
                  <p
                    key={index}
                    className="font-semibold text-shop-dark-green tracking-wider"
                  >
                    {item?.title ||
                      "Uncategorized"}
                  </p>
                )
              )}
            </div>

            {/* AUTHOR */}

            <p className="flex items-center gap-1 text-lightColor">
              <Pencil size={15} />

              {blog?.author?.name ||
                "Unknown"}
            </p>

            {/* DATE */}

            <p className="flex items-center gap-1 text-lightColor">
              <Calendar size={15} />

              {blog?.publishedAt
                ? dayjs(
                    blog.publishedAt
                  ).format(
                    "MMMM D, YYYY"
                  )
                : "No Date"}
            </p>
          </div>

          {/* TITLE */}

          <h1 className="text-3xl md:text-4xl font-bold text-darkColor leading-tight">
            {blog?.title}
          </h1>

          {/* CONTENT */}

          <div className="mt-10 text-lightColor">
            {blog?.body && (
              <PortableText
                value={blog.body}
                components={portableTextComponents}
              />
            )}

            {/* BACK BUTTON */}

            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold hover:text-shop-dark-green hoverEffect"
              >
                <ChevronLeftIcon className="size-5" />

                Back to blog
              </Link>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}

        <BlogLeft slug={slug} />
      </Container>
    </div>
  );
};

// =========================
// SIDEBAR
// =========================

const BlogLeft = async ({
  slug,
}: {
  slug: string;
}) => {
  const [categories, blogs] =
    await Promise.all([
      getBlogCategories(),

      getOthersBlog(slug, 5),
    ]);

  return (
    <div>
      {/* CATEGORIES */}

      <div className="border border-lightColor p-5 rounded-2xl">
        <Title className="text-base">
          Blog Categories
        </Title>

        <div className="space-y-3 mt-4">
          {categories?.map(
            (
              item: CategoryType,
              index: number
            ) => (
              <div
                key={index}
                className="flex justify-between text-sm text-lightColor"
              >
                <p>
                  {item?.title}
                </p>

                <p className="font-semibold text-darkColor">
                  ({
                    item?.count ||
                    0
                  })
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* LATEST BLOGS */}

      <div className="border border-lightColor p-5 rounded-2xl mt-10">
        <Title className="text-base">
          Latest Blogs
        </Title>

        <div className="space-y-4 mt-5">
          {blogs?.map(
            (
              blog: BlogType,
              index: number
            ) => (
              <Link
                href={`/blog/${blog?.slug?.current}`}
                key={index}
                className="flex items-center gap-3 group"
              >
                {blog?.mainImage && (
                  <Image
                    src={urlFor(
                      blog.mainImage
                    ).url()}
                    alt="blogImage"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover border group-hover:border-shop-dark-green"
                  />
                )}

                <p className="line-clamp-2 text-sm text-lightColor group-hover:text-shop-dark-green hoverEffect">
                  {
                    blog?.title
                  }
                </p>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;