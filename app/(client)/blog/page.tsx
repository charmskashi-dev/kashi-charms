import Container from "@/components/Container";
import Title from "@/components/Title";

import { urlFor } from "@/sanity/lib/image";

import { getAllBlogs } from "@/sanity/queries";

import dayjs from "dayjs";

import { Calendar } from "lucide-react";

import Image from "next/image";

import Link from "next/link";

import React from "react";

const BlogPage = async () => {
  const blogs =
    await getAllBlogs(6);

  return (
    <div className="py-10">
      <Container>
        <Title>
          Latest Blogs
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {blogs?.map((blog: any) => (
            <div
              key={blog?._id}
              className="rounded-2xl overflow-hidden group bg-white shadow-sm hover:shadow-xl transition duration-500"
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
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-700"
                  />
                </Link>
              )}

              {/* CONTENT */}

              <div className="p-5">
                {/* META */}

                <div className="flex items-center gap-5 text-xs">
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
                  className="block text-lg font-bold tracking-wide mt-5 line-clamp-2 hover:text-shop-dark-green hoverEffect"
                >
                  {blog?.title}
                </Link>

                {/* EXCERPT */}

                <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-6">
                  {
                    blog?.excerpt
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;