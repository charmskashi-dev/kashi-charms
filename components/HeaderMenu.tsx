"use client";

import { headerData } from "@/constants/data";

import Link from "next/link";

import { usePathname } from "next/navigation";

import React from "react";

import { useAuth } from "@clerk/nextjs";

const HeaderMenu = () => {
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <div
      className="
      hidden
      md:inline-flex
      w-1/3
      items-center
      gap-7
      text-sm
      capitalize
      font-semibold
      text-lightColor
    "
    >
      {/* MAIN NAV LINKS */}

      {headerData?.map((item) => {
        const isActive =
          pathname === item?.href;

        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`
              hover:text-shop-light-green
              hoverEffect
              relative
              group
              ${
                isActive
                  ? "text-shop-light-green"
                  : ""
              }
            `}
          >
            {item?.title}

            {/* LEFT LINE */}

            <span
              className={`
                absolute
                -bottom-0.5
                left-1/2
                w-0
                h-0.5
                bg-shop-light-green
                group-hover:w-1/2
                hoverEffect
                group-hover:left-0
                ${
                  isActive
                    ? "w-1/2"
                    : ""
                }
              `}
            />

            {/* RIGHT LINE */}

            <span
              className={`
                absolute
                -bottom-0.5
                right-1/2
                w-0
                h-0.5
                bg-shop-light-green
                group-hover:w-1/2
                hoverEffect
                group-hover:right-0
                ${
                  isActive
                    ? "w-1/2"
                    : ""
                }
              `}
            />
          </Link>
        );
      })}

      {/* ORDERS BUTTON */}

      {userId && (
        <Link
          href="/orders"
          className={`
            hover:text-shop-light-green
            hoverEffect
            relative
            group
            ${
              pathname === "/orders"
                ? "text-shop-light-green"
                : ""
            }
          `}
        >
          Orders

          {/* LEFT LINE */}

          <span
            className={`
              absolute
              -bottom-0.5
              left-1/2
              w-0
              h-0.5
              bg-shop-light-green
              group-hover:w-1/2
              hoverEffect
              group-hover:left-0
              ${
                pathname === "/orders"
                  ? "w-1/2"
                  : ""
              }
            `}
          />

          {/* RIGHT LINE */}

          <span
            className={`
              absolute
              -bottom-0.5
              right-1/2
              w-0
              h-0.5
              bg-shop-light-green
              group-hover:w-1/2
              hoverEffect
              group-hover:right-0
              ${
                pathname === "/orders"
                  ? "w-1/2"
                  : ""
              }
            `}
          />
        </Link>
      )}
    </div>
  );
};

export default HeaderMenu;