import Container from "@/components/Container";
import Title from "@/components/Title";
import { SINGLE_BLOG_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getOthersBlog,
  getSingleBlog,
} from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Blog = {
  title: string;
  slug: { current: string };
  mainImage?: any;
};

const SingleBlogPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;

  const blog: SINGLE_BLOG_QUERYResult = await getSingleBlog(slug);
  if (!blog) return notFound();

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="md:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog.mainImage).url()}
              alt={blog.title || "Blog Image"}
              width={800}
              height={800}
              className="w-full max-h-125 object-cover rounded-lg"
            />
          )}

          <div>
            {/* Meta Info */}
            <div className="text-xs flex items-center gap-5 my-7">
              <div className="flex items-center relative group cursor-pointer">
                {blog?.blogcategories?.map((item, index) => (
              <p 
                key={index} 
                className="font-semibold text-shop-dark-green tracking-wider"
              >
              {item?.title || "Uncategorized"}
              </p>
              ))}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-0.5 group-hover:bg-shop-dark-green hoverEffect" />
              </div>

              <p className="flex items-center gap-1 text-lightColor group hover:text-shop-dark-green hoverEffect">
                <Pencil size={15} /> {blog?.author?.name || "Unknown"}
              </p>

              <p className="flex items-center gap-1 text-lightColor group hover:text-shop-dark-green hoverEffect">
                <Calendar size={15} />
                {blog?.publishedAt
                  ? dayjs(blog.publishedAt).format("MMMM D, YYYY")
                  : "No Date"}
              </p>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold my-5">
              {blog?.title}
            </h2>

            {/* Content */}
            <div className="text-lightColor">
              {blog?.body && (
                <PortableText
                  value={blog.body}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="my-5 text-base/8">{children}</p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="my-5 text-2xl font-medium text-gray-950">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="my-5 text-xl font-medium text-gray-950">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-5 border-l-2 border-gray-300 pl-6 text-gray-950">
                          {children}
                        </blockquote>
                      ),
                    },

                    types: {
                      image: ({ value }) => (
                        <Image
                          alt={value?.alt || ""}
                          src={urlFor(value).width(2000).url()}
                          className="w-full rounded-2xl"
                          width={1400}
                          height={1000}
                        />
                      ),
                      separator: ({ value }) => {
                        if (value?.style === "line") {
                          return (
                            <hr className="my-5 border-gray-200" />
                          );
                        }
                        if (value?.style === "space") {
                          return <div className="my-5" />;
                        }
                        return null;
                      },
                    },

                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc pl-4">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal pl-4">
                          {children}
                        </ol>
                      ),
                    },

                    listItem: {
                      bullet: ({ children }) => (
                        <li className="my-2 pl-2">{children}</li>
                      ),
                      number: ({ children }) => (
                        <li className="my-2 pl-2">{children}</li>
                      ),
                    },

                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-semibold text-gray-950">
                          {children}
                        </strong>
                      ),
                      code: ({ children }) => (
                        <code className="font-semibold text-gray-950">
                          {children}
                        </code>
                      ),
                      link: ({ value, children }) => (
                        <Link
                          href={value?.href || "#"}
                          className="underline underline-offset-4"
                        >
                          {children}
                        </Link>
                      ),
                    },
                  }}
                />
              )}

              {/* Back Button */}
              <div className="mt-10">
                <Link href="/blog" className="flex items-center gap-1">
                  <ChevronLeftIcon className="size-5" />
                  <span className="text-sm font-semibold">
                    Back to blog
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <BlogLeft slug={slug} />
      </Container>
    </div>
  );
};

const BlogLeft = async ({ slug }: { slug: string }) => {
  const [categories, blogs] = await Promise.all([
    getBlogCategories(),
    getOthersBlog(slug, 5),
  ]);

  return (
    <div>
      {/* Categories */}
      <div className="border border-lightColor p-5 rounded-md">
        <Title className="text-base">Blog Categories</Title>

        <div className="space-y-2 mt-2">
          {categories?.map(({ blogcategories }, index) => (
            <div
              key={index}
              className="flex justify-between text-sm text-lightColor"
            >
              <p>
                {blogcategories?.[0]?.title || "No Category"}
              </p>
              <p className="font-semibold text-darkColor">(1)</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="border border-lightColor p-5 rounded-md mt-10">
        <Title className="text-base">Latest Blogs</Title>

        <div className="space-y-4 mt-4">
{blogs?.map((blog, index) => (
            <Link
              href={`/blog/${blog?.slug?.current}`}
              key={index}
              className="flex items-center gap-2 group"
            >
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt="blogImage"
                  width={100}
                  height={100}
                  className="w-16 h-16 rounded-full object-cover border group-hover:border-shop-dark-greengreen"
                />
              )}

              <p className="line-clamp-2 text-sm text-lightColor group-hover:text-shop-dark-green hoverEffect">
                {blog?.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;