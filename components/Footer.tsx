"use client";

import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/ui/input";
import { Button } from "./ui/ui/button";
import { SubText, SubTitle } from "./ui/ui/text";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>

        <FooterTop />

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* BRAND */}
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover curated handmade jewelry at Kashi Charms, crafted with
              elegance and love ✨
            </SubText>

            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop-light-green hover:text-shop-light-green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          {/* QUICK LINKS */}
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop-light-green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="hover:text-shop-light-green hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Subscribe to get updates and exclusive offers ✨
            </SubText>

            <form className="space-y-3">
              <Input placeholder="Enter your email" type="email" required />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>

        </div>

        {/* 🔥 PAYU COMPLIANCE BLOCK */}
        <div className="py-6 border-t text-xs text-gray-500 space-y-1">
          <p className="font-medium text-gray-700">
            Business Information (For Verification)
          </p>

          <p>
            PAN Holder Name: <span className="font-medium">GEETA SHARMA</span>
          </p>

          <p>
            Address:{" "}
            <span className="font-medium">
              SH-15/78, NEW ASHOK VIHAR COLONY, SHIVPUR BYPASS ROAD, SHIVPUR, VARANASI, UTTAR PRADESH, INDIA, 221003
            </span>
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} <Logo className="text-sm inline-block" />. All
          rights reserved.
        </div>

      </Container>
    </footer>
  );
};

export default Footer;