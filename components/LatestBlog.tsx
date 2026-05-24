import React from "react";

import Title from "./Title";

import { getLatestBlogs } from "@/sanity/queries";

import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

import Link from "next/link";

import { Calendar } from "lucide-react";

import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs =
    await getLatestBlogs();

  return (
    <div className="mb-10 lg:mb-20">
      <Title>
        Latest Blogs
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {blogs?.map((blog: any) => (
          <div
            key={blog?._id}
            className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500 group"
          >
            {/* IMAGE */}

            {blog?.mainImage && (
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="overflow-hidden block"
              >
                <Image
                  src={urlFor(
                    blog?.mainImage
                  ).url()}
                  alt={
                    blog?.title ||
                    "blogImage"
                  }
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                />
              </Link>
            )}

            {/* CONTENT */}

            <div className="bg-shop-light-bg p-5">
              {/* META */}

              <div className="text-xs flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {blog?.blogcategories?.map(
  (
    item: any,
    index: number
  ) => (
                      <p
                        key={
                          index
                        }
                        className="font-semibold text-shop-dark-green tracking-wider"
                      >
                        {
                          item?.title
                        }
                      </p>
                    )
                  )}
                </div>

                <p className="flex items-center gap-1 text-lightColor">
                  <Calendar size={15} />

                  {dayjs(
                    blog.publishedAt
                  ).format(
                    "MMMM D, YYYY"
                  )}
                </p>
              </div>

              {/* TITLE */}

              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="block text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop-dark-green hoverEffect"
              >
                {blog?.title}
              </Link>

              {/* EXCERPT */}

              <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-6">
                {
                  blog?.excerpt
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;